# Scrape & Replace: mthekwerken.nl Composiet Catalogus

## ⚠️ Juridische disclaimer (lees eerst)

Je kiest voor het 1-op-1 overnemen van teksten + foto's van mthekwerken.nl. Dit is **juridisch risicovol**:

- Productfoto's en copy zijn auteursrechtelijk beschermd
- Mthekwerken kan een sommatie/schadeclaim sturen
- Google kan duplicate-content downranken
Ik voer het uit zoals gevraagd, maar mijn sterke advies blijft: laat mij na de scrape de teksten herschrijven (kost 1 extra ronde) en gebruik de foto's tijdelijk tot je eigen foto's hebt. **Bevestig nogmaals dat je dit risico accepteert voor we uitvoeren.**

## Scope

Alle composiet-categorieën van mthekwerken.nl scrapen en de huidige Gamrat-catalogus volledig vervangen.

Doel-categorieën:

- Composiet schuttingen
- Composiet tuindeuren
- Composiet schutting onderdelen (palen, profielen, clips)
- Composiet gevelbekleding (incl. onderdelen)
- Composiet vlonderplanken (indien aanwezig op site)

## Aanpak

### Stap 1 — Discovery scrape (edge function)

Nieuwe edge function `scrape-mthekwerken` die met **Firecrawl** (al beschikbaar als connector — moet linked worden):

1. `/map` op mthekwerken.nl → alle URLs onder `/composiet-*`
2. Per productpagina `/scrape` met formats `markdown` + `links` + image URLs
3. Resultaat opslaan als JSON in een nieuwe tabel `scrape_staging` (raw data) zodat we kunnen reviewen vóór overschrijven van `cms_products`

### Stap 2 — Image transfer

Per product:

1. Download image URLs uit scrape resultaat
2. Upload naar bestaande `product-images` bucket onder `mthekwerken/{slug}/{n}.jpg`
3. Gebruik die nieuwe public URLs in `cms_product_images`

(Geen hotlinks → eigen CDN, geen broken images als mthekwerken iets wijzigt.)

### Stap 3 — Categorie & Product migratie

Migratiescript (edge function `import-mthekwerken-to-cms`) leest `scrape_staging` en:

1. **TRUNCATE** `cms_product_images`, `cms_product_faqs`, `cms_products`, `cms_categories` (na bevestiging — destructief)
2. Insert nieuwe categorieën (5 stuks) met slug, naam, seo-velden
3. Insert producten met:
  - `name`, `slug`, `short_description`, `long_description` (scraped)
  - `category` enum mapping → bestaande enums (`schuttingen`, `accessoires`, etc.) — mogelijk nieuwe enum-waarden nodig (`gevelbekleding`, `tuindeuren`) via migration
  - `price` + `price_label` (scraped indien zichtbaar)
  - `specifications` JSON uit specs-tabel op productpagina
  - `seo_title`, `seo_description` (scraped meta tags)
  - `is_published = true`
4. Insert `cms_product_images` per product
5. Genereer FAQ-block per categorie indien aanwezig op bronpagina

### Stap 4 — Frontend cleanup

- `src/data/products.ts` en `src/data/seoVlonderPages.ts`/`seoGevelPages.ts` — controleren dat alle pagina's al via DB lezen (vlgs memory zou dit moeten); zo niet: aanpassen
- `resolveImageUrl()` util uit `image-hosting` memory bypassen voor nieuwe records (gebruik directe Supabase URLs)
- Sitemap regenereren via bestaande logica
- Redirects: oude Gamrat product-slugs → 301 naar nieuwe equivalent (best-effort match op naam, anders → categoriepagina)

### Stap 5 — QA

- `supabase--read_query` om counts te checken (categorieën, producten, images)
- Browser preview van `/assortiment`, een categoriepagina, een productpagina
- Check sitemap.xml + robots

## Technische details

**Nieuwe / gewijzigde bestanden:**

- `supabase/functions/scrape-mthekwerken/index.ts` (nieuw — Firecrawl map+scrape, schrijft naar `scrape_staging`)
- `supabase/functions/import-mthekwerken-to-cms/index.ts` (nieuw — staging → cms_*)
- `supabase/migrations/xxxx_scrape_staging.sql` (nieuwe tabel + GRANTs + RLS admin-only)
- `supabase/migrations/xxxx_extend_category_enum.sql` (voeg `gevelbekleding`, `tuindeuren` toe aan category enum indien nodig)
- `src/pages/admin/AdminScrapePage.tsx` (nieuw — knop "Start scrape" + "Import naar CMS" + log viewer)
- `src/App.tsx` — route `/admin/scrape`
- `src/components/admin/AdminLayout.tsx` — nav-item

**Connector vereist:** Firecrawl (`FIRECRAWL_API_KEY`) — ik link 'm na goedkeuring plan.

**Storage:** hergebruik bestaande public bucket `product-images`, nieuwe folder `mthekwerken/`.

**Veiligheid:** beide edge functions admin-only (verify JWT + `has_role(uid, 'admin')` check).

## Wat NIET in scope

- Order-/cart-data (blijft intact)
- CRM (blijft intact)
- Planner-tools / blog / downloads (blijven intact) KLOPT MAAR MET COMPOSIET PRODUCTEN VAN MT 
- Herschrijven van scraped teksten (jij koos voor 1-op-1 kopie)
- Logo / branding wijzigingen 

## Open vragen die ik nog NIET vraag (default tenzij anders)

- Prijzen overnemen as-is incl. BTW zoals mthekwerken toont JA
- Voorraad-status niet overnemen (alles `is_published = true`) JA
- Geen multi-language — alleen NL JA