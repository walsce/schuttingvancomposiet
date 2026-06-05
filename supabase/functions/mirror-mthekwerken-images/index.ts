import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

function extFrom(contentType: string | null, url: string) {
  if (contentType?.includes('webp')) return 'webp'
  if (contentType?.includes('png')) return 'png'
  if (contentType?.includes('gif')) return 'gif'
  if (contentType?.includes('jpeg') || contentType?.includes('jpg')) return 'jpg'
  return url.match(/\.([a-z0-9]{3,4})(?:[?#]|$)/i)?.[1]?.toLowerCase() || 'jpg'
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const body = await req.json().catch(() => ({}))
    if (body?.confirm !== 'MIRROR-MTHEKWERKEN-IMAGES') {
      return new Response(JSON.stringify({ error: 'Confirmation required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const limit = Math.min(Math.max(Number(body?.limit || 25), 1), 60)
    const service = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    const { data: rows, error } = await service
      .from('cms_product_images')
      .select('id, product_id, image_url, sort_order')
      .like('image_url', 'https://www.mthekwerken.nl/%')
      .order('created_at', { ascending: true })
      .limit(limit)

    if (error) throw error

    let mirrored = 0
    const failures: Array<{ id: string; error: string }> = []

    for (const row of rows || []) {
      try {
        const sourceUrl = row.image_url as string
        const res = await fetch(sourceUrl)
        if (!res.ok) throw new Error(`download ${res.status}`)

        const contentType = res.headers.get('content-type') || 'image/jpeg'
        const ext = extFrom(contentType, sourceUrl)
        const key = `mthekwerken/${row.product_id}/${String(row.sort_order ?? 0).padStart(2, '0')}-${row.id}.${ext}`
        const bytes = new Uint8Array(await res.arrayBuffer())

        const { error: uploadError } = await service.storage
          .from('product-images')
          .upload(key, bytes, { contentType, upsert: true })
        if (uploadError) throw uploadError

        const { data } = service.storage.from('product-images').getPublicUrl(key)
        const { error: updateError } = await service
          .from('cms_product_images')
          .update({ image_url: data.publicUrl })
          .eq('id', row.id)
        if (updateError) throw updateError

        mirrored++
      } catch (e) {
        failures.push({ id: row.id as string, error: String(e).slice(0, 160) })
      }
    }

    const { count: remaining } = await service
      .from('cms_product_images')
      .select('id', { count: 'exact', head: true })
      .like('image_url', 'https://www.mthekwerken.nl/%')

    return new Response(JSON.stringify({ success: true, mirrored, remaining, failures }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (e) {
    console.error(e)
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})