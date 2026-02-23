// ── SEO Content Pages Data (SSOT) ──────────────────────────────────────────

export interface SEOPageFAQ {
  q: string;
  a: string;
}

export interface SEOPageSection {
  heading: string; // H2
  content: string; // markdown
  subsections?: { heading: string; content: string }[]; // H3
}

export interface ComparisonRow {
  aspect: string;
  option1: string;
  option2: string;
  option3?: string;
}

export interface SEOPage {
  slug: string;
  type: "pillar" | "cluster" | "comparison";
  parentSlug?: string; // for clusters/comparisons linking to pillar
  title: string; // H1
  metaTitle: string; // <60 chars
  metaDescription: string; // <155 chars
  intro: string; // opening paragraph (markdown)
  sections: SEOPageSection[];
  faqs: SEOPageFAQ[];
  comparisonTable?: { headers: string[]; rows: ComparisonRow[] };
  internalLinks: { label: string; href: string }[];
  schemaTypes: string[]; // e.g. ["Article", "FAQPage", "HowTo"]
  author: { name: string; role: string };
  publishDate: string;
  updatedDate: string;
  readingTime: string;
}

// ── AUTHOR ──
const defaultAuthor = { name: "Jan van der Berg", role: "Composiet Specialist — 18 jaar ervaring" };

// ── PILLAR PAGE ─────────────────────────────────────────────────────────────
export const pillarPage: SEOPage = {
  slug: "schutting-van-composiet",
  type: "pillar",
  title: "Schutting van composiet: duurzaam, onderhoudsvrij en modern",
  metaTitle: "Schutting van Composiet | Prijs, Voordelen & Advies",
  metaDescription: "Alles over composiet schuttingen: prijzen per meter, voordelen, nadelen, montage en vergelijking met hout. Onafhankelijk advies van specialisten.",
  author: defaultAuthor,
  publishDate: "2025-08-15",
  updatedDate: "2026-02-20",
  readingTime: "14 min",
  schemaTypes: ["Article", "FAQPage", "HowTo", "Product"],
  intro: `Een **schutting van composiet** is de ideale keuze als je zoekt naar een duurzame, onderhoudsvrije erfafscheiding met een moderne uitstraling. Composiet combineert de warme look van hout met de sterkte van kunststof — zonder de nadelen van traditioneel hout zoals rotten, schimmelen of jaarlijks schilderen.

In deze uitgebreide gids bespreken we alles wat je moet weten: van prijzen per strekkende meter tot montage, van voordelen en nadelen tot een eerlijke vergelijking met houten schuttingen. Als composiet specialisten met meer dan 15 jaar ervaring helpen we je een weloverwogen keuze te maken.`,
  sections: [
    {
      heading: "Wat is een schutting van composiet?",
      content: `Composiet is een materiaal dat bestaat uit een mengsel van **houtvezels** (circa 60%) en **kunststof polymeren** (circa 40%), aangevuld met UV-stabilisatoren en kleurstoffen. Dit resulteert in planken en panelen die er uitzien als hout, maar aanzienlijk langer meegaan.

Er zijn twee productietechnieken:

- **Mono-extrusie**: één laag composiet. Goede basiskwaliteit, betaalbaar.
- **Co-extrusie**: een extra beschermende buitenlaag rondom de kern. Beter bestand tegen vlekken, krassen en verkleuring.

Een composiet schutting wordt opgebouwd uit **composiet planken of panelen** die worden bevestigd aan **aluminium palen** met een insteeksysteem. Dit maakt de montage eenvoudig en het resultaat stevig.`,
    },
    {
      heading: "Voordelen van een composiet schutting",
      content: `Composiet biedt concrete voordelen ten opzichte van hout en PVC:

- **Onderhoudsvrij**: geen schilderen, beitsen of oliën nodig. Af en toe afspuiten met water volstaat.
- **Lange levensduur**: 25 tot 30+ jaar bij normaal gebruik, waar een houten schutting gemiddeld 10-15 jaar meegaat.
- **Kleurvast**: dankzij UV-stabilisatoren verkleurt composiet minimaal (vooral co-extrusie varianten).
- **Rot- en schimmelbestendig**: in tegenstelling tot hout is composiet ongevoelig voor vocht en schimmels.
- **Duurzaam**: veel composiet bevat gerecyclede houtvezels en kunststof. Aan het einde van de levensduur is het materiaal recyclebaar.
- **Geluiddempend**: de massieve structuur dempt geluid beter dan dunne houten schermen.
- **Moderne uitstraling**: verkrijgbaar in strakke, eigentijdse kleuren zoals antraciet, zwart en houtlook.
- **Insectenbestendig**: geen last van houtworm of andere aantasters.`,
    },
    {
      heading: "Nadelen van composiet — eerlijk besproken",
      content: `Transparantie is belangrijk. Composiet heeft ook nadelen:

- **Hogere aanschafprijs**: composiet is 30-60% duurder in aanschaf dan hout. Over de totale levensduur is het vaak goedkoper door het ontbreken van onderhoudskosten.
- **Uitzetting bij warmte**: composiet zet iets uit en krimpt bij temperatuurschommelingen. Een goede montage met expansieruimte voorkomt problemen.
- **Gewicht**: composiet planken zijn zwaarder dan houten planken, wat de montage iets arbeidsintensiever maakt.
- **Beperkte natuurlijke uitstraling**: hoewel de houtlook steeds beter wordt, mist composiet de 100% natuurlijke uitstraling van echt hout.
- **Initiële kleurwijziging**: in de eerste 6-12 weken kan een lichte kleurverandering optreden door UV-blootstelling. Daarna stabiliseert de kleur.

**Conclusie**: de hogere investering verdient zich terug door het ontbreken van onderhoudskosten en de langere levensduur.`,
    },
    {
      heading: "Prijs per meter inclusief plaatsing",
      content: `De kosten van een composiet schutting variëren afhankelijk van het type, de hoogte en of je zelf plaatst of laat monteren.

### Indicatieve prijzen per strekkende meter (180 cm hoog)

| Type | Materiaalkosten | Incl. plaatsing |
|------|----------------|-----------------|
| Mono-extrusie basis | €85 – €120 | €140 – €180 |
| Co-extrusie premium | €120 – €175 | €180 – €245 |
| Composiet met aluminium frame | €150 – €220 | €210 – €290 |
| Compleet scherm (paneel) | €130 – €250 | €190 – €310 |

### Wat beïnvloedt de prijs?

- **Hoogte**: een schutting van 200 cm is circa 15-20% duurder dan 180 cm
- **Type composiet**: co-extrusie is duurder maar gaat langer mee
- **Ondergrond**: plaatsing met betonpoeren is goedkoper dan in beton
- **Lengte**: bij grotere projecten (>15 m) daalt de prijs per meter
- **Afwerking**: afdekkapjes, hoekprofielen en poorten zijn extra

### Rekenvoorbeeld

Een schutting van 12 meter lang en 180 cm hoog in co-extrusie composiet:
- Materiaal: 12 × €145 = **€1.740**
- Aluminium palen (7 stuks): 7 × €65 = **€455**
- Betonpoeren: 7 × €18 = **€126**
- **Totaal materiaal: circa €2.321**
- Plaatsingskosten: circa €600-€900
- **Totaal all-in: circa €2.920 – €3.220**`,
    },
    {
      heading: "Composiet vs hout: eerlijke vergelijking",
      content: `Welk materiaal past bij jouw situatie? Hieronder een objectieve vergelijking.`,
      subsections: [
        {
          heading: "Levensduur en onderhoud",
          content: `- **Composiet**: 25-30+ jaar, geen onderhoud nodig behalve af en toe schoonmaken
- **Hardhout** (bijv. bangkirai): 15-25 jaar, jaarlijks oliën of beitsen
- **Naaldhout** (bijv. vuren): 8-15 jaar, om de 2-3 jaar schilderen/beitsen, gevoelig voor rot

Over een periode van 25 jaar besteed je aan een houten schutting gemiddeld **€800-€1.500 extra aan onderhoud** (verf, beits, arbeid).`,
        },
        {
          heading: "Kosten over 25 jaar (TCO)",
          content: `| Kostenpost | Composiet | Hardhout | Naaldhout |
|------------|-----------|----------|-----------|
| Aanschaf (12m) | €2.300 | €1.600 | €900 |
| Onderhoud (25 jaar) | €0 | €1.200 | €1.500 |
| Vervanging | €0 | €0-€800 | €900 |
| **Totaal 25 jaar** | **€2.300** | **€2.800-€3.600** | **€3.300** |

Composiet is op de lange termijn dus **goedkoper** dan hout.`,
        },
      ],
    },
    {
      heading: "Montage: composiet schutting zelf plaatsen",
      content: `Een composiet schutting plaatsen is eenvoudiger dan je denkt. Met het juiste gereedschap en deze stappen kun je het als handige doe-het-zelver zelf.

### Stap 1: Voorbereiding en uitzetten

Meet de lijn van je schutting nauwkeurig uit met piketpaaltjes en een lijn. Houd rekening met:
- Afstand tussen palen: maximaal 180 cm hart-op-hart
- Hoogte van de schutting + 50-60 cm voor ingraving/betonpoer
- Controleer erfgrenzen met je buren

### Stap 2: Palen plaatsen

Graaf gaten van 60 cm diep of gebruik betonpoeren. Plaats de aluminium palen waterpas en in lijn. Gebruik snelbeton voor een stabiele fundering. Laat minimaal 24 uur uitharden.

### Stap 3: Planken of panelen monteren

Schuif de composiet planken van onderaf in de paalprofielen. Begin altijd onderaan en werk naar boven. Laat 5 mm expansieruimte aan weerszijden voor uitzetting.

### Stap 4: Afwerking

Plaats afdekkapjes op de palen en monteer eventuele eindprofielen. Controleer alles nog een keer op waterpas.

**Gereedschap nodig**: waterpas, meetlint, schop of grondboor, eventueel een verstekzaag met hardmetalen blad voor op maat zagen.

**Tijdsindicatie**: reken op 1 dag voor circa 10 strekkende meter met twee personen.`,
    },
    {
      heading: "Levensduur en garantie",
      content: `De levensduur van composiet hangt af van de kwaliteit en het type:

- **Mono-extrusie**: gemiddeld 20-25 jaar
- **Co-extrusie**: 25-30+ jaar (door de extra beschermlaag)
- **Massief composiet**: langste levensduur, maar ook het zwaarst

### Garantie bij SchuttingvanComposiet.nl

Wij bieden op al onze composiet schuttingen:
- **15 jaar productgarantie** op structurele integriteit
- **10 jaar kleurgarantie** tegen extreme verkleuring
- **25 jaar fabrieksgarantie** op co-extrusie producten (Silvadec)

De garantie dekt:
- Structureel falen (breken, splijten, delaminatie)
- Extreme verkleuring buiten de normen
- Rot of schimmelvorming

**Niet gedekt**: mechanische schade, onjuiste montage, of verwering binnen de aangegeven normen.`,
    },
    {
      heading: "Kleuren en stijlen",
      content: `Composiet schuttingen zijn verkrijgbaar in een breed kleurenpalet:

- **Antraciet / donkergrijs**: de populairste keuze. Strak, modern en past bij elke tuinstijl.
- **Zwart**: stoer en tijdloos. Ideaal voor een industriële of minimalistische tuin.
- **Bruin / teak**: warme houtlook voor een natuurlijke uitstraling.
- **Grijs**: licht en neutraal, maakt de tuin optisch groter.
- **Eiken**: gedetailleerde houtnerf voor een authentieke look.

Alle kleuren zijn doorlopend door het materiaal — krassen zijn daardoor nauwelijks zichtbaar bij co-extrusie planken.`,
    },
  ],
  faqs: [
    { q: "Hoeveel kost een composiet schutting per meter?", a: "Reken op €85-€175 per strekkende meter voor materiaal, afhankelijk van het type. Inclusief plaatsing komt dit op €140-€290 per meter." },
    { q: "Hoe lang gaat een composiet schutting mee?", a: "Gemiddeld 25-30 jaar. Co-extrusie varianten gaan het langst mee dankzij de extra beschermlaag." },
    { q: "Is een composiet schutting onderhoudsvrij?", a: "Ja. Je hoeft niet te schilderen, beitsen of oliën. Af en toe afspuiten met water en eventueel een zachte borstel is voldoende." },
    { q: "Kan ik een composiet schutting zelf plaatsen?", a: "Ja, met basisgereedschap en het juiste systeem (insteekprofielen) is het goed te doen als klusser. Reken op 1 dag voor 10 meter met twee personen." },
    { q: "Verkleurt een composiet schutting?", a: "In de eerste 6-12 weken kan een lichte kleurwijziging optreden door UV. Daarna stabiliseert de kleur en blijft deze jarenlang constant, vooral bij co-extrusie." },
    { q: "Is composiet beter dan hout voor een schutting?", a: "Composiet is onderhoudsvrij, gaat langer mee en is op de lange termijn goedkoper. Hout heeft een lagere aanschafprijs en een meer natuurlijke uitstraling." },
    { q: "Heb ik een vergunning nodig voor een composiet schutting?", a: "In de meeste gevallen niet, zolang de schutting maximaal 2 meter hoog is en op de erfgrens staat. Bij een hoekperceel of monument gelden mogelijk andere regels. Check altijd je gemeente." },
    { q: "Kan composiet schimmelen of rotten?", a: "Nee. Composiet is volledig bestendig tegen vocht, schimmels en insecten. Dat is een van de grootste voordelen ten opzichte van hout." },
  ],
  comparisonTable: {
    headers: ["Eigenschap", "Composiet", "Hardhout", "Naaldhout"],
    rows: [
      { aspect: "Levensduur", option1: "25-30+ jaar", option2: "15-25 jaar", option3: "8-15 jaar" },
      { aspect: "Onderhoud", option1: "Geen", option2: "Jaarlijks oliën", option3: "2-3x per jaar" },
      { aspect: "Prijs per meter", option1: "€85-€175", option2: "€70-€130", option3: "€40-€75" },
      { aspect: "Kleurvast", option1: "Zeer goed", option2: "Matig", option3: "Slecht" },
      { aspect: "Rot/schimmelbestendig", option1: "100%", option2: "Goed", option3: "Slecht" },
      { aspect: "Duurzaamheid", option1: "Recyclebaar", option2: "Tropisch hout issue", option3: "Beperkt" },
      { aspect: "Montage", option1: "Eenvoudig (insteken)", option2: "Gemiddeld", option3: "Gemiddeld" },
      { aspect: "Garantie", option1: "15-25 jaar", option2: "5-10 jaar", option3: "2-5 jaar" },
    ],
  },
  internalLinks: [
    { label: "Kunststof schutting", href: "/kunststof-schutting" },
    { label: "Onderhoudsvrije schutting", href: "/onderhoudsvrije-schutting" },
    { label: "Composiet schutting nadelen", href: "/composiet-schutting-nadelen" },
    { label: "Composiet schutting prijs per meter", href: "/composiet-schutting-prijs-per-meter" },
    { label: "Composiet vs hout", href: "/composiet-vs-hout-schutting" },
    { label: "Composiet schutting met beton", href: "/composiet-schutting-met-beton" },
    { label: "Zwarte composiet schutting", href: "/zwarte-composiet-schutting" },
    { label: "Antraciet composiet schutting", href: "/antraciet-composiet-schutting" },
    { label: "Elephant schutting vergelijking", href: "/elephant-schutting" },
    { label: "Bekijk ons assortiment", href: "/categorie/schuttingen" },
    { label: "Gratis offerte aanvragen", href: "/contact" },
    { label: "Schutting planner", href: "/schutting-planner" },
  ],
};

// ── CLUSTER PAGES ───────────────────────────────────────────────────────────

export const clusterPages: SEOPage[] = [
  {
    slug: "kunststof-schutting",
    type: "cluster",
    parentSlug: "schutting-van-composiet",
    title: "Kunststof schutting: soorten, prijzen en ervaringen",
    metaTitle: "Kunststof Schutting Kopen | Prijzen & Vergelijking",
    metaDescription: "Kunststof schutting kopen? Vergelijk PVC, composiet en volledig kunststof. Bekijk prijzen, voordelen en ervaringen. Eerlijk advies.",
    author: defaultAuthor,
    publishDate: "2025-09-10",
    updatedDate: "2026-02-18",
    readingTime: "8 min",
    schemaTypes: ["Article", "FAQPage"],
    intro: `Een **kunststof schutting** is een verzamelnaam voor schuttingen gemaakt van kunststof-gebaseerde materialen. Dit omvat PVC-schuttingen, volledig kunststof panelen en composiet schuttingen (een mix van hout en kunststof). Elke variant heeft unieke eigenschappen en prijspunten.

In dit artikel vergelijken we de drie soorten, bespreken we prijzen en helpen we je de juiste keuze te maken voor jouw situatie.`,
    sections: [
      {
        heading: "Soorten kunststof schuttingen",
        content: `Er zijn drie hoofdtypen:

**1. PVC schuttingen**
Volledig van polyvinylchloride (PVC). Lichtgewicht, goedkoop, maar minder stevig. Geschikt als tijdelijke oplossing.
- Prijs: €40-€70 per meter
- Levensduur: 10-15 jaar
- Uitstraling: beperkt, kunststof-achtig

**2. Composiet schuttingen**
Een mix van houtvezels en kunststof. De beste verhouding tussen uitstraling, duurzaamheid en prijs.
- Prijs: €85-€175 per meter
- Levensduur: 25-30 jaar
- Uitstraling: houtlook, modern

**3. Volledig kunststof (HDPE)**
Gemaakt van high-density polyethyleen. Zeer sterk en duurzaam, maar duurder.
- Prijs: €120-€200 per meter
- Levensduur: 25+ jaar
- Uitstraling: strak, minder houtachtig

Wij raden **composiet** aan voor de beste balans tussen prijs, uitstraling en levensduur. Lees meer in onze [pillar gids over composiet schuttingen](/schutting-van-composiet).`,
      },
      {
        heading: "Voordelen van kunststof ten opzichte van hout",
        content: `- Geen onderhoud (schilderen/beitsen) nodig
- Bestand tegen rot, schimmels en insecten
- Langere levensduur
- Kleurvast (bij composiet met co-extrusie)
- Recyclebaar en milieuvriendelijker over de levensduur

Het belangrijkste voordeel is het **ontbreken van onderhoud**. Een houten schutting kost je over 20 jaar honderden euro's aan verf, beits en arbeid. Bij kunststof of composiet valt dat volledig weg.`,
      },
      {
        heading: "Nadelen en aandachtspunten",
        content: `- Hogere aanschafprijs dan naaldhout
- PVC varianten kunnen er goedkoop uitzien
- Bij extreme hitte kan kunststof iets uitzetten
- Niet elk type heeft een natuurlijke houtlook

**Tip**: kies co-extrusie composiet als je de houtlook belangrijk vindt. Deze techniek geeft het meest realistische resultaat.`,
      },
      {
        heading: "Prijsvergelijking kunststof schuttingen",
        content: `| Type | Prijs per meter | Levensduur | Onderhoud |
|------|----------------|------------|-----------|
| PVC | €40-€70 | 10-15 jaar | Geen |
| Composiet (mono) | €85-€120 | 20-25 jaar | Geen |
| Composiet (co-extrusie) | €120-€175 | 25-30 jaar | Geen |
| HDPE kunststof | €120-€200 | 25+ jaar | Geen |
| Hardhout (ter vergelijking) | €70-€130 | 15-25 jaar | Jaarlijks |`,
      },
    ],
    faqs: [
      { q: "Wat is het verschil tussen PVC en composiet?", a: "PVC is volledig kunststof en lichter, maar minder stevig en minder natuurlijk. Composiet bevat houtvezels waardoor het steviger is en er meer als hout uitziet." },
      { q: "Is een kunststof schutting sterk genoeg?", a: "Composiet en HDPE schuttingen zijn zeer sterk, vergelijkbaar met hardhout. PVC is lichter en minder stormbestendig." },
      { q: "Kan een kunststof schutting verkleuren?", a: "Co-extrusie composiet is zeer kleurvast. Goedkopere PVC varianten kunnen sneller verkleuren door UV." },
      { q: "Is kunststof slecht voor het milieu?", a: "Composiet bevat gerecyclede materialen en gaat veel langer mee dan hout, waardoor de milieu-impact over de levensduur lager is." },
    ],
    internalLinks: [
      { label: "Alles over composiet schuttingen", href: "/schutting-van-composiet" },
      { label: "Composiet vs hout vergelijking", href: "/composiet-vs-hout-schutting" },
      { label: "Onderhoudsvrije schutting", href: "/onderhoudsvrije-schutting" },
      { label: "Bekijk composiet schuttingen", href: "/categorie/schuttingen" },
      { label: "Offerte aanvragen", href: "/contact" },
    ],
  },
  {
    slug: "onderhoudsvrije-schutting",
    type: "cluster",
    parentSlug: "schutting-van-composiet",
    title: "Onderhoudsvrije schutting: materialen, kosten en advies",
    metaTitle: "Onderhoudsvrije Schutting | Composiet, Aluminium & PVC",
    metaDescription: "Op zoek naar een onderhoudsvrije schutting? Vergelijk composiet, aluminium en PVC. Prijzen, levensduur en praktisch advies.",
    author: defaultAuthor,
    publishDate: "2025-09-20",
    updatedDate: "2026-02-15",
    readingTime: "7 min",
    schemaTypes: ["Article", "FAQPage"],
    intro: `Een **onderhoudsvrije schutting** bespaart je jarenlang werk en kosten. Geen schilderen, beitsen of repareren — alleen af en toe afspuiten. Maar welk materiaal is écht onderhoudsvrij? In dit artikel vergelijken we de opties en geven we eerlijk advies.`,
    sections: [
      {
        heading: "Welke materialen zijn onderhoudsvrij?",
        content: `Drie materialen worden als onderhoudsvrij beschouwd:

**Composiet**
De populairste keuze. Combineert houtlook met 0% onderhoud. Co-extrusie varianten zijn het meest kleurvast en krasvast.

**Aluminium**
Volledig weerbestendig en extreem lang meegaand. Strakke, moderne uitstraling. Hogere prijs maar 40+ jaar levensduur.

**PVC / kunststof**
Goedkoopste optie, maar minder stevig en minder natuurlijke uitstraling. Geschikt voor kleinere tuinen.

Hout wordt bewust niet genoemd — ook geïmpregneerd hout vereist onderhoud.`,
      },
      {
        heading: "Vergelijking onderhoudsvrije materialen",
        content: `| Eigenschap | Composiet | Aluminium | PVC |
|------------|-----------|-----------|-----|
| Onderhoud | Geen | Geen | Geen |
| Levensduur | 25-30 jaar | 40+ jaar | 10-15 jaar |
| Prijs per meter | €85-€175 | €180-€350 | €40-€70 |
| Uitstraling | Houtlook | Modern/strak | Kunststof |
| Kleurkeuze | Breed | Beperkt | Beperkt |
| Sterkte | Zeer goed | Uitstekend | Matig |
| Geluiddemping | Goed | Beperkt | Beperkt |

**Ons advies**: composiet biedt de beste balans. Je krijgt een mooie houtlook zonder onderhoud, tegen een acceptabele prijs. Lees meer in onze [uitgebreide gids over composiet schuttingen](/schutting-van-composiet).`,
      },
      {
        heading: "Kosten besparing over 20 jaar",
        content: `Een houten schutting lijkt goedkoper, maar de verborgen kosten zijn aanzienlijk:

- Schilderen om de 3 jaar: 3× €150 = **€450**
- Reparaties rot: gemiddeld **€300**
- Vervanging na 12 jaar: **€800-€1.200**
- **Totaal extra kosten hout: €1.550-€1.950**

Een composiet schutting kost in 20 jaar **€0 aan onderhoud**. De hogere aanschafprijs is na 8-10 jaar terugverdiend.`,
      },
    ],
    faqs: [
      { q: "Bestaat er echt een 100% onderhoudsvrije schutting?", a: "Composiet en aluminium schuttingen zijn 100% onderhoudsvrij. Je hoeft nooit te schilderen of beitsen. Af en toe afspuiten met water is het enige wat we aanraden." },
      { q: "Wat is de goedkoopste onderhoudsvrije schutting?", a: "PVC schuttingen zijn het goedkoopst (€40-€70/m), maar gaan korter mee. Composiet (€85-€175/m) biedt de beste prijs-kwaliteitverhouding." },
      { q: "Is aluminium beter dan composiet?", a: "Aluminium gaat langer mee (40+ jaar) maar is duurder en heeft een strakke, moderne uitstraling. Composiet biedt een warmere houtlook." },
    ],
    internalLinks: [
      { label: "Composiet schutting: de complete gids", href: "/schutting-van-composiet" },
      { label: "Kunststof schutting vergelijking", href: "/kunststof-schutting" },
      { label: "Prijs per meter berekenen", href: "/composiet-schutting-prijs-per-meter" },
      { label: "Bekijk ons assortiment", href: "/categorie/schuttingen" },
    ],
  },
  {
    slug: "composiet-schutting-nadelen",
    type: "cluster",
    parentSlug: "schutting-van-composiet",
    title: "Nadelen van een composiet schutting — eerlijk overzicht",
    metaTitle: "Composiet Schutting Nadelen | Eerlijk Overzicht 2026",
    metaDescription: "Wat zijn de nadelen van een composiet schutting? Eerlijk overzicht van minpunten, ervaringen en waar je op moet letten bij de aanschaf.",
    author: defaultAuthor,
    publishDate: "2025-10-05",
    updatedDate: "2026-02-10",
    readingTime: "6 min",
    schemaTypes: ["Article", "FAQPage"],
    intro: `Een composiet schutting heeft veel voordelen, maar het is belangrijk om ook de **nadelen** eerlijk te bespreken. Als specialisten vinden wij transparantie essentieel — alleen zo maak je een weloverwogen keuze. In dit artikel bespreken we alle minpunten en geven we aan hoe je ze kunt beperken.`,
    sections: [
      {
        heading: "De 7 nadelen van composiet schuttingen",
        content: `**1. Hogere aanschafprijs**
Composiet kost 30-60% meer dan naaldhout. Een schutting van 10 meter kost circa €1.500-€2.000 in composiet versus €800-€1.000 in vuren. Over de levensduur is composiet echter goedkoper door het ontbreken van onderhoudskosten.

**2. Thermische uitzetting**
Composiet zet uit bij warmte en krimpt bij kou. Bij planken van 180 cm kan dit 2-4 mm zijn. Oplossing: houd bij montage 5 mm expansieruimte aan weerszijden.

**3. Gewicht**
Composiet planken wegen 5-8 kg per strekkende meter, versus 2-3 kg voor vuren. Dit maakt transport en montage zwaarder. Werk bij voorkeur met twee personen.

**4. Initiële kleurverandering**
In de eerste 6-12 weken kan composiet licht verkleuren door UV-blootstelling. Dit is normaal en stabiliseert daarna volledig. Co-extrusie varianten hebben dit nauwelijks.

**5. Beperkte repareerbaarheid**
Een beschadigde composiet plank moet worden vervangen — je kunt het niet bijschuren en overschilderen zoals bij hout. Gelukkig is schade bij normaal gebruik zeer zeldzaam.

**6. Minder "authentiek" dan echt hout**
Ondanks de steeds betere houtlook mist composiet de 100% natuurlijke uitstraling van echt hout. Voor wie de look van massief eiken zoekt, is composiet een compromis.

**7. Kwaliteitsverschillen**
Er is veel variatie in kwaliteit. Goedkope composiet uit China kan snel verkleuren of buigen. Kies altijd een erkend merk met garantie.`,
      },
      {
        heading: "Hoe je de nadelen beperkt",
        content: `- **Kies co-extrusie**: de extra beschermlaag minimaliseert verkleuring en krassen
- **Monteer correct**: volg de montagehandleiding voor expansieruimte
- **Kies een erkend merk**: wij werken uitsluitend met Silvadec (25 jaar garantie)
- **Bestel een sample**: beoordeel kleur en kwaliteit thuis voordat je bestelt

Lees ook onze [complete gids over composiet schuttingen](/schutting-van-composiet) voor een volledig overzicht van voor- en nadelen.`,
      },
    ],
    faqs: [
      { q: "Is composiet echt zo slecht als sommigen beweren?", a: "Nee. De meeste klachten gaan over goedkoop composiet van onbekende merken. Kwaliteitscomposiet (co-extrusie) van merken als Silvadec heeft deze problemen niet." },
      { q: "Verbuigt een composiet schutting in de zon?", a: "Kwalitatief composiet verbuigt niet. Goedkope mono-extrusie planken kunnen in extreme hitte iets verbuigen als ze niet correct gemonteerd zijn." },
      { q: "Kan ik een beschadigde composiet plank repareren?", a: "Kleine krassen kun je met een lichte schuurbehandeling bijwerken. Bij grotere schade moet de plank vervangen worden, wat met een insteeksysteem eenvoudig is." },
    ],
    internalLinks: [
      { label: "Volledige gids composiet schuttingen", href: "/schutting-van-composiet" },
      { label: "Composiet vs hout vergelijking", href: "/composiet-vs-hout-schutting" },
      { label: "Prijs per meter overzicht", href: "/composiet-schutting-prijs-per-meter" },
      { label: "Offerte aanvragen", href: "/contact" },
    ],
  },
  {
    slug: "composiet-schutting-prijs-per-meter",
    type: "cluster",
    parentSlug: "schutting-van-composiet",
    title: "Composiet schutting prijs per meter: complete kostenopbouw",
    metaTitle: "Composiet Schutting Prijs Per Meter | Kosten 2026",
    metaDescription: "Wat kost een composiet schutting per meter? Complete kostenopbouw met materiaal, montage en rekenvoorbeelden. Actuele prijzen 2026.",
    author: defaultAuthor,
    publishDate: "2025-10-15",
    updatedDate: "2026-02-20",
    readingTime: "7 min",
    schemaTypes: ["Article", "FAQPage"],
    intro: `**Wat kost een composiet schutting per meter?** Dat is de meest gestelde vraag die we krijgen. Het antwoord hangt af van het type composiet, de hoogte en of je zelf plaatst. In dit artikel geven we een transparante kostenopbouw met actuele prijzen voor 2026.`,
    sections: [
      {
        heading: "Prijsoverzicht per meter (2026)",
        content: `| Type schutting | Materiaal per meter | Incl. plaatsing |
|----------------|--------------------|--------------------|
| Composiet basis (mono) | €85 – €120 | €140 – €180 |
| Composiet premium (co-extrusie) | €120 – €175 | €180 – €245 |
| Composiet met alu frame | €150 – €220 | €210 – €290 |
| Compleet paneel systeem | €130 – €250 | €190 – €310 |

Prijzen zijn inclusief BTW, op basis van een standaardhoogte van 180 cm.`,
      },
      {
        heading: "Kostenopbouw per component",
        content: `De prijs per meter bestaat uit meerdere componenten:

**Planken/panelen** (50-60% van de kosten)
- Composiet planken: €6-€18 per plank
- Je hebt circa 10-12 planken nodig per meter bij 180 cm hoogte

**Palen** (20-25% van de kosten)
- Aluminium palen: €45-€95 per stuk
- Eén paal per 180 cm (hart-op-hart)

**Bevestiging en fundering** (10-15%)
- Betonpoeren: €12-€25 per stuk
- Afdekkapjes: €5-€15 per paal
- Clips en schroeven: €10-€20 per sectie

**Plaatsingskosten** (optioneel, 30-40% extra)
- Professionele plaatsing: €45-€75 per strekkende meter
- Inclusief grondwerk, waterpas stellen en afwerking`,
      },
      {
        heading: "Rekenvoorbeelden",
        content: `### Voorbeeld 1: Kleine tuin (6 meter)
- 6 meter co-extrusie composiet, 180 cm hoog
- Materiaal: €1.050 – €1.350
- Plaatsing (optioneel): €350
- **Totaal: €1.050 – €1.700**

### Voorbeeld 2: Gemiddelde tuin (15 meter)
- 15 meter co-extrusie composiet, 180 cm hoog
- Materiaal: €2.400 – €3.150
- Plaatsing (optioneel): €800
- **Totaal: €2.400 – €3.950**

### Voorbeeld 3: Grote tuin (30 meter rondom)
- 30 meter co-extrusie composiet, 200 cm hoog
- Materiaal: €5.100 – €6.900
- Plaatsing (optioneel): €1.600
- **Totaal: €5.100 – €8.500**

Wil je een exacte berekening? Gebruik onze [schutting planner](/schutting-planner) of [vraag een gratis offerte aan](/contact).`,
      },
    ],
    faqs: [
      { q: "Wat kost een composiet schutting van 10 meter?", a: "Reken op €1.500-€2.500 voor materiaal en €2.000-€3.500 inclusief professionele plaatsing, afhankelijk van het type composiet." },
      { q: "Is composiet duurder dan hout?", a: "In aanschaf ja (30-60% duurder). Over de levensduur is composiet goedkoper door het ontbreken van onderhoudskosten." },
      { q: "Kan ik besparen door zelf te plaatsen?", a: "Ja, je bespaart circa €45-€75 per meter op plaatsingskosten. Met het juiste insteeksysteem is zelf plaatsen goed te doen." },
    ],
    internalLinks: [
      { label: "Complete gids composiet schuttingen", href: "/schutting-van-composiet" },
      { label: "Nadelen van composiet", href: "/composiet-schutting-nadelen" },
      { label: "Schutting planner tool", href: "/schutting-planner" },
      { label: "Offerte aanvragen", href: "/contact" },
      { label: "Bekijk ons assortiment", href: "/categorie/schuttingen" },
    ],
  },
  {
    slug: "composiet-vs-hout-schutting",
    type: "cluster",
    parentSlug: "schutting-van-composiet",
    title: "Composiet vs hout schutting: welk materiaal kies jij?",
    metaTitle: "Composiet vs Hout Schutting | Vergelijking 2026",
    metaDescription: "Composiet of hout voor je schutting? Eerlijke vergelijking op prijs, levensduur, onderhoud en uitstraling. Met TCO-berekening.",
    author: defaultAuthor,
    publishDate: "2025-11-01",
    updatedDate: "2026-02-18",
    readingTime: "8 min",
    schemaTypes: ["Article", "FAQPage"],
    intro: `**Composiet of hout** — het is de meest voorkomende twijfel bij het kiezen van een nieuwe schutting. Beide materialen hebben sterke punten. In dit artikel vergelijken we ze eerlijk op alle relevante criteria, inclusief een TCO-berekening (Total Cost of Ownership) over 25 jaar.`,
    sections: [
      {
        heading: "Vergelijkingstabel composiet vs hout",
        content: `| Criterium | Composiet | Hardhout | Naaldhout (vuren) |
|-----------|-----------|----------|-------------------|
| Aanschafprijs (per meter) | €85-€175 | €70-€130 | €40-€75 |
| Levensduur | 25-30 jaar | 15-25 jaar | 8-15 jaar |
| Onderhoud | Geen | Jaarlijks oliën | 2-3 jaar schilderen |
| Kleurvast | Zeer goed | Matig | Slecht |
| Rotbestendig | 100% | Goed | Slecht |
| Garantie | 15-25 jaar | 5-10 jaar | 2-5 jaar |
| Milieu-impact | Recyclebaar | Tropisch hout issue | Matig |
| Gewicht | Zwaar | Zwaar | Licht |
| Repareerbaarheid | Plank vervangen | Bijschuren/schilderen | Bijschuren/schilderen |`,
      },
      {
        heading: "Kosten over 25 jaar (TCO-analyse)",
        content: `De eerlijkste vergelijking is op basis van totale kosten over de levensduur:

**Composiet (12 meter schutting)**
- Aanschaf: €2.100
- Onderhoud 25 jaar: €0
- Vervanging: €0
- **Totaal: €2.100**

**Hardhout (12 meter schutting)**
- Aanschaf: €1.440
- Onderhoud (olie, 25 jaar): €1.250
- Gedeeltelijke vervanging: €400
- **Totaal: €3.090**

**Naaldhout (12 meter schutting)**
- Aanschaf: €780
- Onderhoud (verf, 25 jaar): €1.500
- Volledige vervanging (na 12 jaar): €780
- **Totaal: €3.060**

Composiet is over 25 jaar **€960-€1.000 goedkoper** dan hout. Lees meer in onze [pillar gids](/schutting-van-composiet).`,
      },
      {
        heading: "Wanneer kies je hout?",
        content: `Hout is de betere keuze als:
- Je budget beperkt is en je nu de laagste aanschafprijs wilt
- Je van klussen houdt en het onderhoud als hobby ziet
- Je een 100% natuurlijke, authentieke uitstraling wilt
- De schutting tijdelijk is (bijv. huurwoning)`,
      },
      {
        heading: "Wanneer kies je composiet?",
        content: `Composiet is de betere keuze als:
- Je geen zin hebt in onderhoud
- Je waarde hecht aan een lange levensduur
- Je een moderne, strakke uitstraling wilt
- Je op de lange termijn wilt besparen
- Je een milieubewuste keuze wilt (gerecyclede materialen)

Bekijk onze [composiet schuttingen](/categorie/schuttingen) of [vraag een gratis offerte aan](/contact).`,
      },
    ],
    faqs: [
      { q: "Is composiet echt goedkoper dan hout op de lange termijn?", a: "Ja. Over 25 jaar is composiet circa €960-€1.000 goedkoper dan hout door het ontbreken van onderhoudskosten en vervanging." },
      { q: "Welk materiaal is sterker?", a: "Composiet en hardhout zijn vergelijkbaar in sterkte. Naaldhout is het minst sterk en meest gevoelig voor rot en beschadiging." },
      { q: "Welk materiaal is beter voor het milieu?", a: "Composiet bevat gerecyclede materialen en gaat langer mee. Hardhout komt vaak uit tropische bossen. Over de levensduur is composiet milieuvriendelijker." },
    ],
    internalLinks: [
      { label: "Complete gids composiet schuttingen", href: "/schutting-van-composiet" },
      { label: "Nadelen eerlijk besproken", href: "/composiet-schutting-nadelen" },
      { label: "Prijzen per meter", href: "/composiet-schutting-prijs-per-meter" },
      { label: "Assortiment bekijken", href: "/categorie/schuttingen" },
    ],
  },
  {
    slug: "zwarte-composiet-schutting",
    type: "cluster",
    parentSlug: "schutting-van-composiet",
    title: "Zwarte composiet schutting: stoer, modern en tijdloos",
    metaTitle: "Zwarte Composiet Schutting | Prijzen & Inspiratie",
    metaDescription: "Een zwarte composiet schutting geeft je tuin een stoere, moderne uitstraling. Bekijk prijzen, kleurtinten en combinatiemogelijkheden.",
    author: defaultAuthor,
    publishDate: "2025-11-15",
    updatedDate: "2026-02-12",
    readingTime: "5 min",
    schemaTypes: ["Article", "FAQPage"],
    intro: `Een **zwarte composiet schutting** is de ultieme keuze voor een stoere, moderne tuin. Zwart is tijdloos, past bij elke tuinstijl en laat groen en bloemen extra goed uitkomen. In dit artikel bespreken we de mogelijkheden, prijzen en waar je op moet letten.`,
    sections: [
      {
        heading: "Waarom kiezen voor zwart?",
        content: `Zwart is niet zonder reden de populairste kleur voor composiet schuttingen:

- **Tijdloos**: zwart is altijd in stijl, ongeacht tuintrends
- **Contrast**: planten en bloemen komen schitterend uit tegen een zwarte achtergrond
- **Modern**: geeft een strakke, industriële uitstraling
- **Veelzijdig**: past bij zowel minimalistische als romantische tuinen
- **Warmte-absorptie**: zwart absorbeert meer warmte, maar bij composiet is dit geen probleem dankzij de materiaaleigenschappen`,
      },
      {
        heading: "Kleurtinten en afwerkingen",
        content: `Zwart is niet één kleur. Wij bieden verschillende zwarte tinten:

- **Diepzwart (RAL 9005-achtig)**: de donkerste optie, zeer strak
- **Zwart met houtnerf**: subtiele houtstructuur voor een warmere uitstraling
- **Zwart geborsteld**: matte, geborstelde afwerking
- **Antraciet zwart**: iets lichter dan diepzwart, zeer populair

Alle varianten zijn verkrijgbaar in co-extrusie voor maximale kleurvastheid. Bekijk onze [zwarte schuttingen in het assortiment](/categorie/schuttingen) of bestel een [gratis sample](/contact?type=sample).`,
      },
      {
        heading: "Prijzen zwarte composiet schutting",
        content: `| Variant | Prijs per meter |
|---------|----------------|
| Zwart mono-extrusie | €90 – €125 |
| Zwart co-extrusie | €125 – €180 |
| Zwart met aluminium frame | €160 – €230 |

De meerprijs voor zwart ten opzichte van andere kleuren is minimaal (€0-€5 per meter). Lees meer over [composiet schutting prijzen per meter](/composiet-schutting-prijs-per-meter).`,
      },
    ],
    faqs: [
      { q: "Wordt een zwarte composiet schutting heel warm in de zon?", a: "Zwart absorbeert meer warmte, maar composiet geleidt warmte slecht. De schutting wordt warm aanvoelbaar maar vervormt niet." },
      { q: "Verkleurt zwart composiet sneller?", a: "Co-extrusie composiet in zwart is zeer kleurvast. Een minimale verlichting in de eerste weken stabiliseert daarna volledig." },
      { q: "Past zwart bij een kleine tuin?", a: "Ja! Zwart geeft diepte en laat groen uitspringen. Combineer met lichte bestrating voor een ruimtelijk effect." },
    ],
    internalLinks: [
      { label: "Complete gids composiet schuttingen", href: "/schutting-van-composiet" },
      { label: "Antraciet composiet schutting", href: "/antraciet-composiet-schutting" },
      { label: "Bekijk ons assortiment", href: "/categorie/schuttingen" },
      { label: "Offerte aanvragen", href: "/contact" },
    ],
  },
  {
    slug: "antraciet-composiet-schutting",
    type: "cluster",
    parentSlug: "schutting-van-composiet",
    title: "Antraciet composiet schutting: de populairste keuze",
    metaTitle: "Antraciet Composiet Schutting | Nr. 1 Kleurkeuze",
    metaDescription: "Antraciet is de #1 kleur voor composiet schuttingen. Ontdek waarom, bekijk prijzen en bestel een gratis sample.",
    author: defaultAuthor,
    publishDate: "2025-11-20",
    updatedDate: "2026-02-12",
    readingTime: "5 min",
    schemaTypes: ["Article", "FAQPage"],
    intro: `**Antraciet** is veruit de populairste kleur voor composiet schuttingen in Nederland. De donkergrijze tint combineert de strakheid van zwart met de subtiliteit van grijs — perfect voor moderne tuinen. In dit artikel leggen we uit waarom antraciet zo populair is en wat je kunt verwachten qua prijs en kwaliteit.`,
    sections: [
      {
        heading: "Waarom is antraciet zo populair?",
        content: `Antraciet dankt zijn populariteit aan:

- **Neutrale elegantie**: donkergrijs past bij elke tuinstijl en woningtype
- **Minder opvallend dan zwart**: subtiel maar toch modern
- **Onderhoudsvriendelijk**: stof en vuil zijn minder zichtbaar dan op lichtere kleuren
- **Tijdbestendig**: antraciet veroudert mooi en blijft er jaren goed uitzien
- **Combineerbaar**: past bij hout, steen, beton en groen`,
      },
      {
        heading: "Antraciet tinten en variaties",
        content: `Antraciet is een breed spectrum. Onze varianten:

- **Antraciet mat**: klassieke matte afwerking
- **Antraciet met nerf**: subtiele houtstructuur
- **Antraciet geborsteld**: rijke, geborstelde textuur
- **Antraciet co-extrusie**: extra beschermlaag, maximale kleurvastheid

Bestel een [gratis sample](/contact?type=sample) om de exacte kleurtint thuis te beoordelen.`,
      },
    ],
    faqs: [
      { q: "Wat is het verschil tussen antraciet en zwart?", a: "Antraciet is een donkergrijs (vergelijkbaar met RAL 7016), zwart is dieper en donkerder (RAL 9005). Antraciet oogt iets subtieler en moderner." },
      { q: "Is antraciet de duurste kleur?", a: "Nee, alle kleuren zijn gelijkgeprijsd. De keuze voor antraciet heeft geen invloed op de prijs." },
    ],
    internalLinks: [
      { label: "Complete gids composiet schuttingen", href: "/schutting-van-composiet" },
      { label: "Zwarte composiet schutting", href: "/zwarte-composiet-schutting" },
      { label: "Bekijk ons assortiment", href: "/categorie/schuttingen" },
      { label: "Gratis offerte aanvragen", href: "/contact" },
    ],
  },
  {
    slug: "composiet-schutting-met-beton",
    type: "cluster",
    parentSlug: "schutting-van-composiet",
    title: "Composiet schutting met beton: fundament, plaatsing en kosten",
    metaTitle: "Composiet Schutting Met Beton | Fundament & Kosten",
    metaDescription: "Composiet schutting op beton plaatsen? Alles over betonpoeren, betonplaten en fundering. Kosten, montage en praktische tips.",
    author: defaultAuthor,
    publishDate: "2025-12-05",
    updatedDate: "2026-02-20",
    readingTime: "7 min",
    schemaTypes: ["Article", "FAQPage", "HowTo"],
    intro: `Een **composiet schutting met beton** als fundament is de meest stabiele oplossing voor een langdurige erfafscheiding. Of je kiest voor betonpoeren, een betonnen onderplaat of een volle betonplaat — de juiste fundering bepaalt hoe lang je schutting er strak en stabiel bij staat. In dit artikel bespreken we alle opties, kosten en geven we een stapsgewijze montagehandleiding.`,
    sections: [
      {
        heading: "Soorten betonfunderingen voor een composiet schutting",
        content: `Er zijn drie veelgebruikte methoden om een composiet schutting op beton te plaatsen:

**1. Betonpoeren (meest gebruikt)**
Prefab betonblokken waarin de paal wordt geplaatst. Snel, betaalbaar en geschikt voor de meeste situaties.
- Kosten: €12-€25 per poer
- Voordeel: eenvoudig te plaatsen, geen graven nodig bij grondankers
- Nadeel: minder stabiel op zeer losse grond

**2. Betonplaat als onderbouw**
Een doorlopende betonplaat (30 cm hoog) onderaan de schutting. Populair bij houten schuttingen, ook toepasbaar bij composiet.
- Kosten: €18-€35 per strekkende meter
- Voordeel: beschermt de onderkant, geeft extra hoogte
- Nadeel: zware betonuitstraling aan de onderkant

**3. Stortbeton rondom palen**
De aluminium palen worden in gegoten beton gefundeerd. De sterkste methode.
- Kosten: €20-€40 per paal (inclusief beton)
- Voordeel: maximale stabiliteit, ideaal voor windgevoelige locaties
- Nadeel: permanente plaatsing, moeilijk te verwijderen

Onze aanbeveling: **betonpoeren** bieden de beste balans tussen kosten, stabiliteit en eenvoud. Lees ook onze [complete gids over composiet schuttingen](/schutting-van-composiet) voor meer montage-informatie.`,
      },
      {
        heading: "Montage: composiet schutting op beton plaatsen",
        content: `### Stap 1: Uitzetten en markeren

Zet de lijn van je schutting uit met een spanlijn en piketpaaltjes. Markeer de posities van de palen (maximaal 180 cm hart-op-hart). Controleer de erfgrens.

### Stap 2: Betonpoeren plaatsen

Graaf een gat van circa 40 cm diep per poer-locatie. Plaats de betonpoer waterpas en vul rondom aan met zand of grind. Bij stortbeton: graaf 60 cm diep en giet beton rondom de paalhouder.

### Stap 3: Palen monteren

Plaats de aluminium palen in de betonpoeren of paalhouders. Controleer met een waterpas of elke paal perfect verticaal staat. Gebruik kilen om bij te stellen voordat het beton is uitgehard.

### Stap 4: Composiet planken plaatsen

Schuif de planken van onderaf in de profielen van de palen. Werk van onder naar boven. Houd 5 mm expansieruimte aan weerszijden.

### Stap 5: Afwerking

Monteer afdekkapjes op de palen en eventuele eindprofielen. Controleer het geheel op waterpas en stabiliteit.

**Tijdsindicatie**: met twee personen circa 1,5 dag voor 10 strekkende meter.
**Uithardtijd beton**: minimaal 24-48 uur voordat je de planken monteert.`,
      },
      {
        heading: "Kosten composiet schutting met beton",
        content: `| Component | Prijs per meter | Opmerking |
|-----------|----------------|-----------|
| Composiet planken (co-extrusie) | €120-€175 | Hoofdcomponent |
| Aluminium palen | €35-€55 | Per meter (1 paal per 1,8m) |
| Betonpoeren | €7-€14 | Per meter (1 poer per 1,8m) |
| Betonplaat (optioneel) | €18-€35 | Doorlopende onderbouw |
| Stortbeton (optioneel) | €11-€22 | Per paal, verdeeld per meter |
| **Totaal materiaal** | **€162-€266** | Afhankelijk van funderingstype |
| Plaatsingskosten | €55-€85 | Per meter, professioneel |

### Rekenvoorbeeld: 12 meter met betonpoeren
- Composiet planken (co-extrusie): 12 × €148 = **€1.776**
- Aluminium palen (7 stuks): 7 × €72 = **€504**
- Betonpoeren (7 stuks): 7 × €18 = **€126**
- Afdekkapjes en clips: **€85**
- **Totaal materiaal: circa €2.491**

Gebruik onze [prijscalculator](/composiet-schutting-prijs-per-meter) voor een persoonlijke berekening of [vraag een offerte aan](/contact).`,
      },
      {
        heading: "Betonpoeren vs stortbeton vs betonplaat",
        content: `| Criterium | Betonpoeren | Stortbeton | Betonplaat |
|-----------|-------------|------------|------------|
| Kosten | Laag | Gemiddeld | Gemiddeld |
| Stabiliteit | Goed | Uitstekend | Goed |
| Plaatsingsgemak | Eenvoudig | Complex | Gemiddeld |
| Verwijderbaarheid | Goed | Slecht | Gemiddeld |
| Geschikt voor DIY | Ja | Met ervaring | Met hulp |
| Geschikt voor klei/zand | Matig | Zeer goed | Goed |
| Vorstbestendigheid | Goed | Zeer goed | Goed |

**Voor de meeste tuinen** raden wij betonpoeren aan. Staat je schutting in een windrijke omgeving of op zeer zachte grond? Kies dan stortbeton.`,
      },
    ],
    faqs: [
      { q: "Heb ik altijd beton nodig voor een composiet schutting?", a: "Nee, maar het wordt sterk aanbevolen. Betonpoeren of stortbeton zorgen voor een stabiele, duurzame fundering. Zonder beton kan de schutting na verloop van tijd scheef gaan staan." },
      { q: "Hoeveel betonpoeren heb ik nodig?", a: "Eén betonpoer per paal. Palen worden om de 180 cm geplaatst. Voor 10 meter schutting heb je dus 7 betonpoeren nodig." },
      { q: "Kan ik een composiet schutting op een bestaande betonplaat plaatsen?", a: "Ja, met speciale voetplaten kun je aluminium palen direct op een bestaande betonplaat of -muur bevestigen." },
      { q: "Hoe diep moeten de betonpoeren?", a: "Minimaal 40 cm diep voor standaard betonpoeren. Bij stortbeton raden wij 60 cm aan voor vorstvrije fundering." },
    ],
    internalLinks: [
      { label: "Complete gids composiet schuttingen", href: "/schutting-van-composiet" },
      { label: "Prijs per meter overzicht", href: "/composiet-schutting-prijs-per-meter" },
      { label: "Composiet vs hout vergelijking", href: "/composiet-vs-hout-schutting" },
      { label: "Schutting planner tool", href: "/schutting-planner" },
      { label: "Offerte aanvragen", href: "/contact" },
    ],
  },
];

// ── COMPARISON PAGES ────────────────────────────────────────────────────────

export const comparisonPages: SEOPage[] = [
  {
    slug: "hornbach-composiet-schutting",
    type: "comparison",
    parentSlug: "schutting-van-composiet",
    title: "Hornbach composiet schutting: assortiment, prijs en vergelijking",
    metaTitle: "Hornbach Composiet Schutting | Vergelijking 2026",
    metaDescription: "Composiet schutting bij Hornbach kopen? Vergelijk assortiment, prijzen en kwaliteit met specialisten. Onafhankelijk advies.",
    author: defaultAuthor,
    publishDate: "2025-12-01",
    updatedDate: "2026-02-15",
    readingTime: "6 min",
    schemaTypes: ["Article", "FAQPage"],
    intro: `Overweeg je een **composiet schutting bij Hornbach** te kopen? Hornbach biedt een selectie composiet schuttingsystemen aan. In dit artikel vergelijken we het assortiment, de prijzen en de kwaliteit met die van een gespecialiseerde leverancier. Zo maak je een weloverwogen keuze.`,
    sections: [
      {
        heading: "Hornbach composiet schutting assortiment",
        content: `Hornbach biedt doorgaans 3-5 composiet schuttingsystemen aan, voornamelijk van huismerken en enkele bekende merken. Het assortiment is beperkter dan bij een specialist.

**Wat je bij Hornbach vindt:**
- Basis composiet schermopzetten (180×180 cm)
- Enkele kleuropties (grijs, bruin, antraciet)
- Bijbehorende aluminium of stalen palen
- Basisaccessoires (afdekkapjes)

**Wat je bij een specialist vindt:**
- Uitgebreid kleurenpalet (8+ kleuren)
- Keuze uit mono-extrusie én co-extrusie
- Op maat advies en configuratie
- Professionele montageservice
- Uitgebreide garantie (15-25 jaar)`,
      },
      {
        heading: "Prijsvergelijking Hornbach vs specialist",
        content: `| Aspect | Hornbach | SchuttingvanComposiet.nl |
|--------|----------|--------------------------|
| Prijs per meter (basis) | €75-€120 | €85-€120 |
| Prijs per meter (premium) | €120-€160 | €120-€175 |
| Kleuropties | 3-5 | 8+ |
| Co-extrusie beschikbaar | Beperkt | Ja, volledig assortiment |
| Persoonlijk advies | Beperkt | Ja, specialist |
| Montageservice | Nee | Ja |
| Garantie | 5-10 jaar | 15-25 jaar |
| Levertijd | Direct mee | 3-5 werkdagen |

De prijzen bij Hornbach zijn vergelijkbaar voor basiskwaliteit. Het verschil zit in **advies, kwaliteitskeuze en garantie**.`,
      },
      {
        heading: "Wanneer kies je Hornbach?",
        content: `Hornbach is een goede optie als:
- Je een basiskwaliteit composiet schutting zoekt
- Je het product fysiek wilt zien in de winkel
- Je direct materiaal mee wilt nemen
- Je geen behoefte hebt aan persoonlijk advies of montageservice`,
      },
      {
        heading: "Wanneer kies je een specialist?",
        content: `Een specialist zoals SchuttingvanComposiet.nl is beter als:
- Je premium kwaliteit wilt (co-extrusie, Silvadec)
- Je persoonlijk advies en maatwerk nodig hebt
- Je professionele montage wilt
- Je een uitgebreide garantie (15-25 jaar) belangrijk vindt
- Je een specifieke kleur of afwerking zoekt

Bekijk ons [complete assortiment](/categorie/schuttingen) of lees onze [uitgebreide gids over composiet schuttingen](/schutting-van-composiet).`,
      },
    ],
    faqs: [
      { q: "Is de kwaliteit bij Hornbach minder?", a: "Niet per se. Hornbach verkoopt degelijke basisproducten. Maar het assortiment is beperkter, vooral in co-extrusie en premium afwerkingen." },
      { q: "Kan Hornbach een composiet schutting plaatsen?", a: "Hornbach biedt doorgaans geen montageservice voor schuttingen. Bij een specialist kun je vaak wel professionele plaatsing bijboeken." },
      { q: "Zijn de prijzen bij Hornbach lager?", a: "Voor basiskwaliteit zijn de prijzen vergelijkbaar. Premium composiet is bij een specialist vaak beter geprijsd door directe merkrelaties." },
    ],
    internalLinks: [
      { label: "Complete gids composiet schuttingen", href: "/schutting-van-composiet" },
      { label: "Gamma composiet schutting vergelijking", href: "/gamma-composiet-schutting" },
      { label: "Prijzen per meter", href: "/composiet-schutting-prijs-per-meter" },
      { label: "Bekijk ons assortiment", href: "/categorie/schuttingen" },
      { label: "Gratis offerte aanvragen", href: "/contact" },
    ],
  },
  {
    slug: "gamma-composiet-schutting",
    type: "comparison",
    parentSlug: "schutting-van-composiet",
    title: "Gamma composiet schutting: assortiment, prijs en vergelijking",
    metaTitle: "Gamma Composiet Schutting | Vergelijking 2026",
    metaDescription: "Composiet schutting bij Gamma kopen? Vergelijk assortiment, prijzen en kwaliteit. Onafhankelijk advies van composiet specialisten.",
    author: defaultAuthor,
    publishDate: "2025-12-10",
    updatedDate: "2026-02-15",
    readingTime: "6 min",
    schemaTypes: ["Article", "FAQPage"],
    intro: `Ben je van plan een **composiet schutting bij Gamma** te kopen? Gamma heeft een groeiend assortiment kunststof en composiet schuttingen. We vergelijken het aanbod met dat van een gespecialiseerde leverancier.`,
    sections: [
      {
        heading: "Gamma composiet schutting assortiment",
        content: `Gamma biedt een selectie composiet schutting systemen aan, vaak van eigen huismerken:

**Beschikbaar bij Gamma:**
- Basis composiet tuinschermen
- Enkele kleuropties (antraciet, grijs, bruin)
- Bijbehorende palen en bevestigingsmateriaal
- Online bestellen en afhalen in de winkel

**Voordeel Gamma:**
- Breed winkelnetwerk, makkelijk bereikbaar
- Producten fysiek bekijken
- Snel beschikbaar

**Beperking Gamma:**
- Kleiner assortiment dan specialisten
- Voornamelijk basiskwaliteit (mono-extrusie)
- Beperkt advies van verkooppersoneel
- Geen montageservice`,
      },
      {
        heading: "Prijsvergelijking",
        content: `| Aspect | Gamma | SchuttingvanComposiet.nl |
|--------|-------|--------------------------|
| Prijs per meter (basis) | €70-€110 | €85-€120 |
| Prijs per meter (premium) | €110-€150 | €120-€175 |
| Kleuropties | 3-4 | 8+ |
| Co-extrusie | Zeer beperkt | Volledig assortiment |
| Advies | Basis | Specialist |
| Montage | Nee | Ja |
| Garantie | 5-8 jaar | 15-25 jaar |

Gamma is iets goedkoper in het basissegment, maar biedt minder keuze en garantie in het premiumsegment.`,
      },
    ],
    faqs: [
      { q: "Heeft Gamma co-extrusie composiet schuttingen?", a: "Gamma heeft een beperkt aanbod co-extrusie composiet. Voor de breedste keuze in co-extrusie raden we een specialist aan." },
      { q: "Kan ik bij Gamma advies krijgen over composiet schuttingen?", a: "Gamma biedt basisadvies, maar het personeel is niet gespecialiseerd in composiet. Een specialist kan je beter helpen met maatwerk en materiaalkeuze." },
    ],
    internalLinks: [
      { label: "Composiet schutting gids", href: "/schutting-van-composiet" },
      { label: "Hornbach vergelijking", href: "/hornbach-composiet-schutting" },
      { label: "Prijzen per meter", href: "/composiet-schutting-prijs-per-meter" },
      { label: "Bekijk ons assortiment", href: "/categorie/schuttingen" },
    ],
  },
  {
    slug: "elephant-schutting",
    type: "comparison",
    parentSlug: "schutting-van-composiet",
    title: "Elephant schutting: assortiment, kwaliteit en vergelijking",
    metaTitle: "Elephant Schutting | Assortiment & Vergelijking 2026",
    metaDescription: "Elephant composiet schutting kopen? Vergelijk assortiment, prijzen en kwaliteit van Elephant met andere merken. Onafhankelijk advies.",
    author: defaultAuthor,
    publishDate: "2026-01-10",
    updatedDate: "2026-02-20",
    readingTime: "7 min",
    schemaTypes: ["Article", "FAQPage"],
    intro: `**Elephant** is een van de bekendste merken op het gebied van tuinhout en composiet in de Benelux. Ze bieden een breed assortiment composiet schuttingen aan, verkrijgbaar bij diverse bouwmarkten en dealers. In dit artikel vergelijken we het Elephant-assortiment eerlijk met alternatieven en helpen we je de juiste keuze te maken.`,
    sections: [
      {
        heading: "Elephant composiet schutting assortiment",
        content: `Elephant biedt meerdere composiet schuttingsystemen aan:

**Elephant Forte**
- Compleet composiet schuttingsysteem
- Beschikbaar in antraciet, grijs, bruin en teak
- Plankbreedte: 21×175 mm
- Systeemhoogte: 180 of 200 cm
- Prijs: circa €110-€160 per meter

**Elephant Design**
- Strak designsysteem met smalle planken
- Moderne, horizontale lijnen
- Beschikbaar in antraciet en zwart
- Prijs: circa €130-€180 per meter

**Elephant Modular**
- Modulair opbouwsysteem
- Combineerbaar met glas, hout en aluminium panelen
- Flexibel in hoogte en breedte
- Prijs: circa €150-€220 per meter

Elephant producten zijn verkrijgbaar bij bouwmarkten zoals Gamma, Praxis en bij gespecialiseerde dealers.`,
      },
      {
        heading: "Vergelijking Elephant vs Silvadec",
        content: `| Criterium | Elephant | Silvadec (SchuttingvanComposiet.nl) |
|-----------|----------|--------------------------------------|
| Type composiet | Mono- en co-extrusie | Voornamelijk co-extrusie |
| Kleuropties | 4-6 | 8+ |
| Garantie structureel | 10 jaar | 15-25 jaar |
| Garantie kleur | 5 jaar | 10 jaar |
| Herkomst | Nederland/België | Frankrijk (EU) |
| Verkoopkanaal | Bouwmarkten + dealers | Specialist (direct) |
| Persoonlijk advies | Via dealer | Direct van specialisten |
| Montageservice | Via derden | In-house |
| Prijs (co-extrusie) | €130-€180/m | €120-€175/m |

**Analyse**: Elephant biedt degelijke producten met goede beschikbaarheid. Silvadec scoort beter op garantie, kleurkeuze en persoonlijk advies.`,
      },
      {
        heading: "Kwaliteit en ervaringen",
        content: `Elephant heeft een goede reputatie in de Benelux. Aandachtspunten:

**Sterke punten Elephant:**
- Breed dealernetwerk, overal verkrijgbaar
- Goede basiskwaliteit
- Nederlandse/Belgische klantenservice
- Compleet systeemaanbod inclusief accessoires

**Aandachtspunten:**
- Garantietermijnen korter dan premium merken
- Co-extrusie assortiment beperkter
- Persoonlijk advies afhankelijk van de dealer
- Prijzen bij bouwmarkten niet altijd de scherpste

Gebruikerservaringen zijn overwegend positief, met name voor de Forte-lijn. De Design-lijn wordt geprezen om de strakke uitstraling. Bij problemen is de service via dealers wisselend.`,
      },
      {
        heading: "Wanneer kies je Elephant?",
        content: `Elephant is een goede keuze als:
- Je een product wilt dat je fysiek in de winkel kunt bekijken
- Je vertrouwt op een gevestigd Benelux-merk
- Basiskwaliteit composiet voldoende is
- Je zelf wilt monteren zonder specialistisch advies

Wil je langere garantie, meer kleurkeuze of professionele montage? Bekijk dan ons [assortiment van Silvadec composiet schuttingen](/categorie/schuttingen) of lees onze [complete gids](/schutting-van-composiet).`,
      },
    ],
    faqs: [
      { q: "Is Elephant een goed merk voor composiet schuttingen?", a: "Ja, Elephant is een gevestigd merk met degelijke producten. De basiskwaliteit is goed. Voor premium co-extrusie en langere garantie zijn er betere opties beschikbaar." },
      { q: "Waar kan ik Elephant schuttingen kopen?", a: "Elephant schuttingen zijn verkrijgbaar bij bouwmarkten zoals Gamma en Praxis, en bij gespecialiseerde tuinhoutdealers in heel Nederland en België." },
      { q: "Wat kost een Elephant composiet schutting?", a: "Reken op €110-€220 per strekkende meter, afhankelijk van het systeem (Forte, Design of Modular) en de uitvoering." },
      { q: "Hoe verhoudt Elephant zich tot Silvadec?", a: "Elephant biedt goede basiskwaliteit met brede beschikbaarheid. Silvadec scoort beter op co-extrusie kwaliteit, garantie (tot 25 jaar) en kleurkeuze." },
    ],
    internalLinks: [
      { label: "Complete gids composiet schuttingen", href: "/schutting-van-composiet" },
      { label: "Hornbach composiet schutting", href: "/hornbach-composiet-schutting" },
      { label: "Gamma composiet schutting", href: "/gamma-composiet-schutting" },
      { label: "Composiet schutting prijs per meter", href: "/composiet-schutting-prijs-per-meter" },
      { label: "Bekijk ons assortiment", href: "/categorie/schuttingen" },
      { label: "Offerte aanvragen", href: "/contact" },
    ],
  },
];

// ── IMPORTS FROM SPLIT FILES ─────────────────────────────────────────────────
import { allVlonderSEOPages } from "./seoVlonderPages";
import { allGevelSEOPages } from "./seoGevelPages";

// ── ALL PAGES COMBINED ──────────────────────────────────────────────────────
export const allSEOPages: SEOPage[] = [pillarPage, ...clusterPages, ...comparisonPages, ...allVlonderSEOPages, ...allGevelSEOPages];

export const getSEOPageBySlug = (slug: string): SEOPage | undefined =>
  allSEOPages.find((p) => p.slug === slug);
