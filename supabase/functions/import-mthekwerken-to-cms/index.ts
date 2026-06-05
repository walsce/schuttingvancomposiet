// Imports scrape_staging rows into cms_categories / cms_products / cms_product_images.
// DESTRUCTIVE: truncates existing CMS product data first.
import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

// mthekwerken category slug -> cms_products.category enum
const CAT_TO_ENUM: Record<string, string> = {
  'composiet-schuttingen': 'schuttingen',
  'composiet-tuindeuren': 'tuindeuren',
  'composiet-schutting-onderdelen': 'accessoires',
  'composiet-gevelbekleding': 'gevelbekleding',
}

function slugify(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80) || 'product'
}

function shortDesc(md: string): string {
  if (!md) return ''
  // first meaningful paragraph
  const paras = md.split(/\n\s*\n/).map((p) => p.replace(/[#*_>`\[\]()]/g, '').trim()).filter((p) => p.length > 40)
  return (paras[0] || '').slice(0, 280)
}

async function downloadAndUpload(service: any, bucket: string, key: string, url: string): Promise<string | null> {
  try {
    const r = await fetch(url)
    if (!r.ok) return null
    const buf = new Uint8Array(await r.arrayBuffer())
    const ct = r.headers.get('content-type') || 'image/jpeg'
    const { error } = await service.storage.from(bucket).upload(key, buf, { contentType: ct, upsert: true })
    if (error) return null
    const { data } = service.storage.from(bucket).getPublicUrl(key)
    return data.publicUrl
  } catch {
    return null
  }
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

    const body = await req.json().catch(() => ({}))
    const confirm = body?.confirm === 'YES-WIPE-AND-IMPORT'
    if (!confirm) {
      return new Response(JSON.stringify({ error: 'Pass { confirm: "YES-WIPE-AND-IMPORT" } to proceed' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    const service = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
    const log: string[] = []

    // 1) wipe
    await service.from('cms_product_images').delete().not('id', 'is', null)
    await service.from('cms_product_faqs').delete().not('id', 'is', null)
    await service.from('cms_products').delete().not('id', 'is', null)
    await service.from('cms_categories').delete().not('id', 'is', null)
    log.push('Wiped existing CMS product data')

    // 2) load staging
    const { data: cats } = await service.from('scrape_staging').select('*').eq('kind', 'category').eq('source', 'mthekwerken.nl')
    const { data: prods } = await service.from('scrape_staging').select('*').eq('kind', 'product').eq('source', 'mthekwerken.nl')

    // 3) categories
    const catMap = new Map<string, string>() // slug -> id
    for (let i = 0; i < (cats || []).length; i++) {
      const c = cats![i]
      const enumCat = CAT_TO_ENUM[c.category_slug as string]
      if (!enumCat) continue
      const meta = (c.raw as any)?.metadata || {}
      const name = (c.title || c.category_slug).replace(/\s*[-|–].*/, '').trim()
      const { data: ins, error } = await service.from('cms_categories').insert({
        name,
        slug: enumCat,
        description: meta.description || null,
        image_url: null,
        seo_title: meta.title || name,
        seo_description: meta.description || null,
        sort_order: i,
      }).select('id').single()
      if (error) { log.push(`cat err ${enumCat}: ${error.message}`); continue }
      catMap.set(enumCat, ins!.id)
      log.push(`Category ${enumCat} -> ${ins!.id}`)
    }

    // 4) products
    let okP = 0, failP = 0, okI = 0
    const usedSlugs = new Set<string>()
    for (let i = 0; i < (prods || []).length; i++) {
      const p = prods![i]
      const raw = p.raw as any
      const enumCat = CAT_TO_ENUM[p.category_slug as string]
      if (!enumCat) { failP++; continue }

      let slug = slugify(raw.slug || p.title || p.source_url)
      let n = 1
      while (usedSlugs.has(slug)) { n++; slug = `${slugify(raw.slug || p.title)}-${n}` }
      usedSlugs.add(slug)

      const name = (raw.meta?.title || p.title || slug).replace(/\s*[-|–]\s*M&T.*$/i, '').replace(/\s*[-|–]\s*mthekwerken.*$/i, '').trim().slice(0, 200)
      const long = raw.markdown || ''
      const short = shortDesc(long)

      const { data: prodIns, error: pErr } = await service.from('cms_products').insert({
        name,
        slug,
        price: raw.price ?? 0,
        price_label: raw.price_label || (raw.price ? `€${raw.price.toFixed(2).replace('.', ',')}` : 'Prijs op aanvraag'),
        category: enumCat as any,
        category_id: catMap.get(enumCat) || null,
        short_description: short,
        long_description: long.slice(0, 8000),
        seo_title: (raw.meta?.title || name).slice(0, 70),
        seo_description: (raw.meta?.description || short).slice(0, 160),
        is_published: true,
        sort_order: i,
        guarantee: '25 jaar garantie',
        delivery_time: '5-10 werkdagen',
      }).select('id').single()
      if (pErr) { failP++; log.push(`prod err ${slug}: ${pErr.message}`); continue }
      okP++

      // images
      const images: string[] = raw.images || []
      for (let j = 0; j < images.length; j++) {
        const src = images[j]
        const ext = (src.match(/\.(jpg|jpeg|png|webp|gif)/i)?.[1] || 'jpg').toLowerCase()
        const key = `mthekwerken/${slug}/${j}.${ext}`
        const publicUrl = await downloadAndUpload(service, 'product-images', key, src)
        if (!publicUrl) continue
        await service.from('cms_product_images').insert({
          product_id: prodIns!.id,
          image_url: publicUrl,
          alt_text: name,
          is_primary: j === 0,
          sort_order: j,
        })
        okI++
      }

      await service.from('scrape_staging').update({ imported: true }).eq('id', p.id)
    }

    log.push(`Imported: products ok=${okP} fail=${failP}, images=${okI}`)
    return new Response(JSON.stringify({ success: true, products: okP, failed: failP, images: okI, categories: catMap.size, log }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (e) {
    console.error(e)
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }
})
