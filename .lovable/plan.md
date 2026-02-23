
# Top Bar Restyling: Wit met Oranje Letters + Google Logo

## Wat verandert er?

De bovenste balk van de header (boven de navigatie) wordt aangepast naar een **witte achtergrond** met **oranje tekst** (accent kleur), vergelijkbaar met het referentiebeeld. Daarnaast wordt het Google "G"-logo als SVG inline gerenderd naast de review-score, in de officiële Google-kleuren.

## Wijzigingen

### `src/components/Header.tsx`

**Top bar styling aanpassen:**
- Achtergrondkleur: `bg-primary` wordt `bg-white` met een subtiele `border-b border-border`
- Tekstkleur: `text-primary-foreground` wordt `text-accent` (oranje)
- De sterren-icoon wordt vervangen door een inline SVG van het Google "G"-logo in de officiële kleuren (blauw, rood, geel, groen)
- De reviewtekst wordt: Google logo + oranje sterren (unicode of lucide) + "4.9/5 (220)"
- Overige USP-items (Snelle levering, 15 jaar garantie, Gratis offerte) blijven, maar in oranje tekst op witte achtergrond

**Technische details:**
- Het Google "G"-logo wordt als inline SVG component direct in de Header gerenderd (geen externe afbeelding nodig)
- De 5 sterren worden getoond als oranje gevulde Star-iconen uit lucide-react
- Geen nieuwe bestanden of dependencies nodig

### Bestanden

| Bestand | Wijziging |
|---------|-----------|
| `src/components/Header.tsx` | Top bar: witte achtergrond, oranje tekst, Google G-logo SVG, oranje sterren |
