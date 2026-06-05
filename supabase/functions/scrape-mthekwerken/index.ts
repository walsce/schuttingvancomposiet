// Scrapes mthekwerken.nl composiet catalogus via Firecrawl into scrape_staging
import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const FC = 'https://api.firecrawl.dev/v2'
const SOURCE = 'mthekwerken.nl'
const ROOT = 'https://www.mthekwerken.nl'

const SECTIONS = [
  { kind: 'category', slug: 'composiet-schuttingen', url: `${ROOT}/composiet-schuttingen/` },
  { kind: 'category', slug: 'composiet-tuindeuren', url: `${ROOT}/composiet-schuttingen/composiet-tuindeuren/` },
  { kind: 'category', slug: 'composiet-schutting-onderdelen', url: `${ROOT}/composiet-schuttingen/composiet-schutting-onderdelen/` },
  { kind: 'category', slug: 'composiet-gevelbekleding', url: `${ROOT}/composiet-gevelbekleding/` },
]

async function fcMap(url: string, apiKey: string, search?: string) {
  const res = await fetch(`${FC}/map`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, search, limit: 500, includeSubdomains: false }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(`map ${url} ${res.status}: ${JSON.stringify(data)}`)
  return (data.links || data.data?.links || []) as Array<string | { url: string }>
}

async function fcScrape(url: string, apiKey: string) {
  const res = await fetch(`${FC}/scrape`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      url,
      formats: ['markdown', 'html', 'links'],
      onlyMainContent: true,
    }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(`scrape ${url} ${res.status}: ${JSON.stringify(data).slice(0, 300)}`)
  return data.data || data
}

function extractImages(html: string, base: string): string[] {
  if (!html) return []
  const out = new Set<string>()
  const re = /<img[^>]+src=["']([^"']+)["']/gi
  let m: RegExpExecArray | null
  while ((m = re.exec(html))) {
    let u = m[1]
    if (u.startsWith('//')) u = 'https:' + u
    else if (u.startsWith('/')) u = new URL(u, base).toString()
    if (!/\.(jpg|jpeg|png|webp|gif)(\?|$)/i.test(u)) continue
    if (/logo|icon|favicon|placeholder|sprite/i.test(u)) continue
    out.add(u)
  }
  return Array.from(out).slice(0, 8)
}

function extractPrice(md: string): { price: number | null; label: string | null } {
  if (!md) return { price: null, label: null }
  const m = md.match(/€\s*([\d.]+,\d{2}|\d+(?:[.,]\d+)?)/)
  if (!m) return { price: null, label: null }
  const num = parseFloat(m[1].replace(/\./g, '').replace(',', '.'))
  return { price: isFinite(num) ? num : null, label: `€${m[1]}` }
}

function extractMeta(html: string) {
  const title = html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() || null
  const desc = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)?.[1] || null
  return { title, description: desc }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } },
    )
    const { data: claims, error: cErr } = await supabase.auth.getClaims(authHeader.replace('Bearer ', ''))
    if (cErr || !claims?.claims) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }
    const { data: roles } = await supabase.from('user_roles').select('role').eq('user_id', claims.claims.sub)
    if (!roles?.some((r: any) => r.role === 'admin')) {
      return new Response(JSON.stringify({ error: 'Admin required' }), { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    const apiKey = Deno.env.get('FIRECRAWL_API_KEY')
    if (!apiKey) throw new Error('FIRECRAWL_API_KEY not configured')

    const service = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)

    const log: string[] = []
    const productUrls = new Set<string>()

    // 1) categories
    for (const sec of SECTIONS) {
      log.push(`Saving category ${sec.slug}`)
      const cat = await fcScrape(sec.url, apiKey).catch((e) => ({ error: String(e) }))
      await service.from('scrape_staging').upsert({
        source: SOURCE,
        source_url: sec.url,
        kind: 'category',
        category_slug: sec.slug,
        title: sec.slug,
        raw: cat,
        imported: false,
      }, { onConflict: 'source_url' })

      // 2) discover product URLs under this section
      const links = await fcMap(ROOT, apiKey, sec.slug.replace(/-/g, ' ')).catch(() => [])
      for (const l of links) {
        const u = typeof l === 'string' ? l : l.url
        if (!u) continue
        // product pages live under composiet path and end with product-like slug (not category index)
        if (!u.includes('/composiet')) continue
        if (u.replace(/\/$/, '') === sec.url.replace(/\/$/, '')) continue
        if (/winkelwagen|account|checkout|contact|over-ons/i.test(u)) continue
        productUrls.add(u.replace(/[?#].*$/, ''))
      }
      log.push(`Section ${sec.slug}: collected ${productUrls.size} urls so far`)
    }

    // 3) scrape each product
    let ok = 0, fail = 0
    const urlList = Array.from(productUrls)
    for (let i = 0; i < urlList.length; i++) {
      const url = urlList[i]
      try {
        const scraped = await fcScrape(url, apiKey)
        const html = scraped.html || ''
        const md = scraped.markdown || ''
        const meta = extractMeta(html)
        const images = extractImages(html, url)
        const { price, label } = extractPrice(md)

        // derive category from URL
        let category_slug = 'composiet-schuttingen'
        if (url.includes('tuindeuren')) category_slug = 'composiet-tuindeuren'
        else if (url.includes('onderdelen')) category_slug = 'composiet-schutting-onderdelen'
        else if (url.includes('gevelbekleding')) category_slug = 'composiet-gevelbekleding'

        const slug = url.replace(/\/$/, '').split('/').pop() || url
        await service.from('scrape_staging').upsert({
          source: SOURCE,
          source_url: url,
          kind: 'product',
          category_slug,
          title: meta.title || slug,
          raw: { meta, markdown: md, images, price, price_label: label, slug },
          imported: false,
        }, { onConflict: 'source_url' })
        ok++
      } catch (e) {
        fail++
        log.push(`FAIL ${url}: ${String(e).slice(0, 120)}`)
      }
    }

    log.push(`Done. products scraped: ok=${ok} fail=${fail} total=${urlList.length}`)
    return new Response(JSON.stringify({ success: true, categories: SECTIONS.length, products: ok, failed: fail, log }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (e) {
    console.error(e)
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }
})
