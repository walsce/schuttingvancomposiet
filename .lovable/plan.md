
# Kleur- en Maatvarianten toevoegen aan Producten

## Wat wordt er gedaan?

Producten die tot dezelfde productlijn behoren (bijv. alle "Atmosphere Schuttingplanken" in verschillende kleuren, of "Elegance vlonderplanken" in verschillende breedtes en afwerkingen) worden aan elkaar gekoppeld. Op de productpagina verschijnen dan kleur-swatches en/of maatselectoren waarmee de bezoeker direct naar de juiste variant navigeert, zoals op Silvadec.com.

---

## Silvadec Portfolio-afstemming

Op basis van het daadwerkelijke Silvadec-assortiment worden de volgende uitbreidingen gemaakt:

### Schuttingplanken (Afsluiting)
Silvadec biedt de Atmosphere schermplank in 5 kleuren: Antraciet Grijs, Licht Grijs, Wild Grijs, Zonnig Bruin, Licht Eiken. **Reeds aanwezig** -- deze worden nu gegroepeerd als varianten.

Aluminium schermplanken in 3 kleuren: Antraciet Grijs, Metaal Grijs, Zwart. **Reeds aanwezig** -- worden gegroepeerd.

### Vlonderplanken (Terras)
Silvadec biedt meerdere breedtes per kleur:
- **Atmosphere**: 138 mm en 180 mm breed
- **Elegance**: 138 mm gegroefde, 138 mm glad, 180 mm glad

Momenteel bestaan alleen 138 mm varianten. **Er worden 180 mm brede varianten toegevoegd** voor de belangrijkste kleuren, plus gladde Elegance varianten naast de gegroefde.

### Gevelbekleding
Atmosphere 175 bestaat al in Wit, Zonnig Bruin, Donker Bruin. **Antraciet Grijs** wordt toegevoegd als variant (ontbreekt, maar Silvadec biedt dit wel).

---

## Technische Aanpak

### 1. Nieuw veld: `variantGroup` op het Product-model

Producten die tot dezelfde productlijn behoren krijgen hetzelfde `variantGroup`-ID. Dit wordt puur in de front-end data gebruikt (geen databasewijziging nodig).

```text
Product Interface uitbreiding:
  variantGroup?: string    // bijv. "atmosphere-schutting", "elegance-vlonder"
  variantLabel?: string    // korte label: "Antraciet Grijs" of "180 mm breed"
```

### 2. Variant Selector component

Een nieuw component `VariantSelector` dat op de productpagina verschijnt:

- **Kleurvarianten**: Ronde kleur-swatches met tooltip en link naar de andere kleurvariant
- **Maatvarianten**: Knoppen met de afmeting (bijv. "138 mm" / "180 mm")
- Klikken navigeert naar de andere productpagina (ze zijn afzonderlijke producten met eigen slug)

### 3. Productdata uitbreiding

#### Nieuwe producten toevoegen (~8 stuks):
| Product | Kleur | Breedte | Prijs |
|---------|-------|---------|-------|
| Atmosphere Ushuaia Grijs 180mm | Grijs | 180 mm | EUR 89/m2 |
| Atmosphere Cayenne Grijs 180mm | Grijs | 180 mm | EUR 89/m2 |
| Atmosphere Lima Bruin 180mm | Bruin | 180 mm | EUR 89/m2 |
| Atmosphere Sao Paulo Bruin 180mm | Bruin | 180 mm | EUR 89/m2 |
| Elegance Colorado Bruin Glad | Bruin | 138 mm | EUR 59/m2 |
| Elegance Iroise Grijs Glad | Grijs | 138 mm | EUR 59/m2 |
| Atmosphere 175 Antraciet Grijs (gevel) | Grijs | 175 mm | EUR 34,95 |
| Elegance Antraciet Grijs Gegroefde | Grijs | 138 mm | EUR 59/m2 |

#### Bestaande producten updaten:
- `variantGroup` en `variantLabel` toekennen aan alle producten die bij dezelfde lijn horen

### 4. VariantSelector groepering

```text
Groepen:
  "atmosphere-schutting"     -> sc-1, sc-2, sc-3, sc-4, sc-5 (5 kleuren)
  "aluminium-schutting"      -> sc-6, sc-7, sc-8 (3 kleuren)
  "atmosphere-175-gevel"     -> cl-1, cl-2, cl-3, cl-nieuw (4 kleuren)
  "open-rhombus-gevel"       -> cl-4, cl-5, cl-6 (3 kleuren)
  "nuances-vlonder"          -> vl-1, vl-2 (2 kleuren)
  "atmosphere-vlonder-138"   -> vl-3..vl-8 (6 kleuren, 138mm)
  "atmosphere-vlonder-180"   -> nieuwe 180mm varianten
  "elegance-gegroefde"       -> vl-9, vl-10, + nieuw
  "elegance-glad"            -> nieuwe gladde varianten
  "emotion-vlonder"          -> vl-11, vl-12
```

Vlonderplanken met zowel 138mm als 180mm varianten tonen beide selectors: kleur EN breedte.

---

## Bestanden

### Nieuw
| Bestand | Doel |
|---------|------|
| `src/components/VariantSelector.tsx` | Kleur-swatches + maatknoppen component |

### Aangepast
| Bestand | Wijziging |
|---------|-----------|
| `src/data/products.ts` | `variantGroup` en `variantLabel` toevoegen aan Product interface; ~8 nieuwe 180mm/gladde producten toevoegen; Antraciet Grijs gevel toevoegen |
| `src/pages/ProductPage.tsx` | `VariantSelector` integreren boven de "In winkelwagen" knop |

### Geen database-wijzigingen nodig
De variant-koppeling is puur front-end (de `options` en `dimensions` kolommen in `cms_products` kunnen dit al opslaan als JSON). De statische data in `products.ts` wordt direct uitgebreid.
