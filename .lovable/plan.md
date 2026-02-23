

# Volledige Winkelervaring: Van Product tot Bestelling

## Wat wordt er gebouwd?

Een complete winkelflow waarmee klanten producten kunnen bestellen -- van het toevoegen aan de winkelwagen tot het afronden van de bestelling met een bevestigingspagina. Geen Mollie API key nodig; de betaling wordt gesimuleerd met een "demo" modus zodat de volledige flow werkend is.

---

## Klantflow (stap voor stap)

```text
Productpagina              Winkelwagen             Afrekenen                Bevestiging
+-----------------+     +----------------+     +-------------------+     +----------------+
| Product info    |     | Overzicht items|     | Klantgegevens     |     | Bedankt!       |
| Aantal kiezen   |---->| Aantal wijzigen|---->| Adres             |---->| Ordernummer    |
| [In wagen] btn  |     | Verwijderen    |     | Betaalmethode     |     | Samenvatting   |
|                 |     | Totaalprijs    |     | [Bestelling       |     | [Verder winkelen|
|                 |     | [Afrekenen] btn|     |  plaatsen] btn    |     |  ] btn         |
+-----------------+     +----------------+     +-------------------+     +----------------+
```

---

## Onderdelen

### 1. Winkelwagen (localStorage)
- **Context Provider** (`CartContext`) die de winkelwagen beheert
- Opslaan in `localStorage` zodat het behouden blijft tussen sessies
- Functies: toevoegen, verwijderen, aantal wijzigen, leegmaken
- Winkelmand-teller op het winkelwagen-icoon in de Header

### 2. Realistische Prijzen
- Alle producten krijgen marktconforme prijzen op basis van gangbare composiet-prijzen:
  - Gevelbekleding planken: ~EUR 32-45 per stuk
  - Schuttingpanelen: ~EUR 89-249 per paneel
  - Vlonderplanken: ~EUR 29-55 per stuk
  - Aluminium systemen: ~EUR 149-349
- Prijzen zijn al redelijk realistisch; kleine aanpassingen waar nodig

### 3. Productpagina uitbreiding
- "Aantal" selector toevoegen
- "In winkelwagen" knop (vervangt huidige offerte-CTA niet, wordt erbij gezet)
- Toast-bevestiging bij toevoegen

### 4. Winkelwagenpagina (`/winkelwagen`)
- Overzicht van alle items met afbeelding, naam, prijs
- Aantal aanpassen (+/-)
- Item verwijderen
- Subtotaal, verzendkosten, totaal
- "Afrekenen" knop
- Lege-wagen weergave met link terug naar assortiment

### 5. Checkout-pagina (`/afrekenen`) -- One-pager
- **Stap 1 - Klantgegevens**: Naam, e-mail, telefoon
- **Stap 2 - Bezorgadres**: Straat, huisnummer, postcode, plaats
- **Stap 3 - Betaalmethode**: iDEAL (bankkeuze dropdown) of Creditcard (gesimuleerde velden)
- **Orderoverzicht**: Sidebar/sectie met alle items, subtotaal, verzendkosten (EUR 0 boven EUR 500, anders EUR 49,95), totaal incl. BTW
- Formuliervalidatie met `zod` + `react-hook-form`
- Bij "Bestelling plaatsen": order opslaan in `cms_orders` + `cms_order_items`, winkelwagen legen, doorsturen naar bevestigingspagina

### 6. Bevestigingspagina (`/bestelling-bevestigd/:orderId`)
- Ordernummer
- Samenvatting van bestelde items
- Geschatte levering
- "Verder winkelen" knop

### 7. Header aanpassing
- Winkelwagen-icoon toont badge met aantal items
- Klik gaat naar `/winkelwagen`

---

## Technische Details

### Nieuwe bestanden
| Bestand | Doel |
|---------|------|
| `src/contexts/CartContext.tsx` | Cart state management met localStorage |
| `src/pages/CartPage.tsx` | Winkelwagenpagina |
| `src/pages/CheckoutPage.tsx` | One-page checkout formulier |
| `src/pages/OrderConfirmationPage.tsx` | Bevestigingspagina |

### Aangepaste bestanden
| Bestand | Wijziging |
|---------|-----------|
| `src/App.tsx` | CartProvider wrappen, nieuwe routes toevoegen |
| `src/components/Header.tsx` | Winkelwagen badge met itemtelling |
| `src/pages/ProductPage.tsx` | Aantal-selector en "In winkelwagen" knop |
| `src/data/products.ts` | Prijzen controleren/aanpassen waar nodig |

### Database
- Gebruikt de bestaande `cms_orders` en `cms_order_items` tabellen (al aanwezig)
- Orders worden opgeslagen met status "pending" (geen echte betaling)
- RLS-beleid niet nodig: dit is een publieke webshop zonder gebruikersaccounts

### Geen API key nodig
- Betaling is gesimuleerd: na klik op "Bestelling plaatsen" wordt een korte laadanimatie getoond en wordt de order direct opgeslagen
- iDEAL en Creditcard zijn visueel aanwezig maar verwerken geen echte betaling
- Wanneer je later Mollie wilt koppelen, hoeft alleen de submit-functie vervangen te worden

