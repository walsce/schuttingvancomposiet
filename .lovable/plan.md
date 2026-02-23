
# Visuele Upgrade: 4 Homepage Secties met Achtergrondbeelden

## Probleem
De vier secties (Blog, Ontwerp Tools, Downloads, FAQ) zijn platte, tekstgebaseerde strips zonder visueel onderscheid -- saai en repetitief.

## Oplossing
Elke sectie krijgt een unieke visuele behandeling met achtergrondbeelden, overlays en/of kaarten met foto's, zodat ze er premium en onderscheidend uitzien terwijl alle content behouden blijft.

### 1. Kenniscentrum & Blog
- Achtergrondafbeelding van een tuin/terras setting met een donkere overlay
- Witte tekst bovenop, vergelijkbaar met de CTA-sectie stijl
- Knoppen worden licht/transparant gestyled tegen de donkere achtergrond

### 2. Gratis Ontwerp Tools
- De twee kaarten krijgen elk een grote achtergrondafbeelding (terras foto voor TerrasDesigner, schutting foto voor SchuttingPlanner)
- Gradient overlay van onder naar boven zodat tekst leesbaar blijft
- Tekst en knoppen worden wit, gepositioneerd onderaan de kaart
- Kaarten worden hoger (aspect-ratio) zodat de foto's impact hebben

### 3. Gidsen & Checklists (Downloads)
- Split layout: links een grote sfeervolle afbeelding (composiet close-up), rechts de tekst en CTA
- Geeft de sectie meer gewicht en visuele aantrekkingskracht in plaats van gecentreerde tekst

### 4. Veelgestelde Vragen (FAQ)
- Subtiele achtergrondafbeelding met sterke lichte overlay zodat de FAQ-kaarten eroverheen zweven
- Geeft diepte zonder de leesbaarheid te compromitteren

## Technische details

### Bestanden

| Bestand | Wijziging |
|---------|-----------|
| `src/pages/Index.tsx` | Blog sectie: achtergrondafbeelding + overlay + witte tekst. Ontwerp Tools: kaarten met achtergrondafbeeldingen + gradient overlay + witte tekst. Downloads: split layout met afbeelding links. |
| `src/components/FAQSection.tsx` | Subtiele achtergrondafbeelding met lichte overlay |

Alle afbeeldingen worden via externe URLs geladen (Silvadec/Unsplash composiet-gerelateerde beelden) -- consistent met het bestaande patroon in de "Waarom composiet" sectie.
