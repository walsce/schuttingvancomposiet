
# E-mail Automatisering & CRM Uitbreiding

## Overzicht

Er wordt een volledig e-mail automatiseringssysteem gebouwd met een admin-dashboard om alle geautomatiseerde e-mails te beheren. Daarnaast wordt het CRM uitgebreid zodat offerteaanvragen, contactverzoeken en bestellingen overzichtelijk op een Shopify-achtige manier zichtbaar zijn. De e-mails worden nu als placeholder gebouwd (HTML-templates, logging in de database) en zijn klaar om later met Resend of een andere provider te koppelen.

---

## Wat wordt er gebouwd?

### 1. E-mail Automations

Vier automatische e-mailflows:

| Flow | Trigger | Timing |
|------|---------|--------|
| Orderbevestiging | Nieuwe bestelling geplaatst | Direct |
| Cart abandonment #1 | Winkelwagen met items, geen checkout gestart | Na 1 uur |
| Cart abandonment #2 | Geen reactie op eerste reminder | Na 24 uur |
| Checkout abandonment #1 | Checkout gestart maar niet afgerond | Na 30 min |
| Checkout abandonment #2 | Geen reactie op eerste reminder | Na 24 uur |

### 2. Database Uitbreiding

**Nieuwe tabel: `email_automations`**
- `id`, `type` (order_confirmation, cart_abandonment_1, cart_abandonment_2, checkout_abandonment_1, checkout_abandonment_2)
- `recipient_email`, `recipient_name`
- `status` (queued, sent, failed, cancelled)
- `scheduled_for` (wanneer te versturen)
- `sent_at`, `metadata` (cart items, order details)
- `created_at`
- RLS: admin-only lezen/schrijven, insert voor iedereen (via triggers)

**Nieuwe tabel: `abandoned_carts`**
- `id`, `session_id` (localStorage-based), `email` (nullable, pas bekend bij checkout)
- `cart_data` (JSON met items), `checkout_started` (boolean)
- `recovered` (boolean), `created_at`, `updated_at`
- RLS: insert/update voor iedereen, admin-only lezen

### 3. Edge Function: `send-email`

Een backend function die:
- E-mails uit de queue pakt (`status = queued`, `scheduled_for <= now()`)
- Per e-mail de juiste HTML-template rendert (orderbevestiging, cart reminder, checkout reminder)
- **Placeholder modus**: Logt de e-mail naar `email_automations` met status `sent` (geen echte verzending)
- Later te koppelen aan Resend API door simpelweg de placeholder-log te vervangen door een API-call
- Wordt aangeroepen via een pg_cron job (elke 5 minuten)

### 4. Edge Function: `track-cart`

Ontvangt cart-data vanuit de frontend:
- Slaat winkelwagen op in `abandoned_carts`
- Wanneer een e-mailadres bekend is (checkout gestart), plant automatisch cart/checkout abandonment e-mails
- Bij succesvolle bestelling: annuleert openstaande abandonment e-mails

### 5. Frontend: Cart Tracking

In `CartContext.tsx`:
- Bij elke cart-wijziging, stuur cart-data naar `track-cart` edge function
- Genereer een `session_id` in localStorage als die er nog niet is
- Bij checkout-start: stuur e-mailadres mee (zodra klant dat invult)

In `CheckoutPage.tsx`:
- Bij het invullen van e-mail: markeer checkout als gestart en koppel e-mail aan de cart session
- Bij succesvolle bestelling: annuleer alle openstaande abandonment e-mails

### 6. Admin: E-mail Automations Dashboard

**Nieuwe pagina: `/admin/automations`**
- Overzicht van alle geplande, verzonden en geannuleerde e-mails
- Filters op type en status
- Statistieken: verzonden, open rate (placeholder), conversies
- Mogelijkheid om e-mails handmatig te annuleren
- Preview van e-mail templates

### 7. CRM Uitbreiding (Shopify-stijl)

Het bestaande CRM (`/admin/crm`) wordt uitgebreid met:
- **Bronfilter uitbreiding**: "Offerte aanvraag" en "Sample aanvraag" als aparte bronnen
- **Quick-view kaarten** bovenaan: totaal contacten, nieuwe leads deze week, openstaande offertes, totale omzet
- **Activiteiten-iconen** voor sample/offerte aanvragen
- Sidebar-navigatie krijgt een **"Automations"** item

---

## Technische Details

### Bestanden

#### Nieuw
| Bestand | Doel |
|---------|------|
| `supabase/functions/send-email/index.ts` | E-mail queue processor (placeholder) |
| `supabase/functions/track-cart/index.ts` | Cart tracking endpoint |
| `src/pages/admin/AdminAutomationsPage.tsx` | E-mail automations dashboard |
| `src/components/admin/EmailPreviewModal.tsx` | Preview van e-mail templates |

#### Aangepast
| Bestand | Wijziging |
|---------|-----------|
| `src/contexts/CartContext.tsx` | Session ID generatie + cart tracking calls |
| `src/pages/CheckoutPage.tsx` | Checkout-start tracking + e-mail koppeling + abandonment annulering bij succes |
| `src/pages/ContactPage.tsx` | Bron differentiatie: "quote_request" vs "sample_request" vs "contact_form" |
| `src/components/admin/AdminLayout.tsx` | Navigatie-item "Automations" toevoegen |
| `src/App.tsx` | Route `/admin/automations` toevoegen |
| `src/pages/admin/AdminCRMPage.tsx` | Statistiek-kaarten bovenaan, extra bronfilters |
| `supabase/config.toml` | Nieuwe edge functions registreren |

#### Database migratie
- `email_automations` tabel aanmaken met enum voor type en status
- `abandoned_carts` tabel aanmaken
- Database trigger op `cms_orders` INSERT: automatisch orderbevestiging e-mail inplannen
- pg_cron job voor `send-email` functie (elke 5 minuten)
