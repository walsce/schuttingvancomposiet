// ── Pillar 1 Expansion: 5 new cluster pages + 2 comparison pages ────────────
import type { SEOPage } from "./seoPages";

const author = { name: "Jan van der Berg", role: "Composiet Specialist — 18 jaar ervaring" };

const schuttingExpansionClusterPages: SEOPage[] = [
  /* ── 1. composiet-schutting-plaatsen ─────────────────────────────── */
  {
    slug: "composiet-schutting-plaatsen",
    type: "cluster",
    parentSlug: "schutting-van-composiet",
    title: "Composiet schutting plaatsen: complete handleiding in 7 stappen",
    metaTitle: "Composiet Schutting Plaatsen | Stap-voor-stap Gids",
    metaDescription: "Leer hoe je zelf een composiet schutting plaatst. Inclusief fundering, palen, planken inschuiven en afwerken. Met tijdsindicatie en gereedschapslijst.",
    author,
    publishDate: "2026-02-01",
    updatedDate: "2026-02-20",
    readingTime: "12 min",
    schemaTypes: ["HowTo", "FAQPage"],
    intro: `Een **composiet schutting plaatsen** is een klus die je als handige doe-het-zelver prima zelf kunt uitvoeren. Met het juiste gereedschap, een goede voorbereiding en een duidelijk stappenplan plaats je in één dag tot 10 strekkende meter schutting.

In deze handleiding doorlopen we het volledige proces: van fundering en palen tot het inschuiven van planken en de afwerking. We delen ook veelgemaakte fouten zodat je die kunt voorkomen.`,
    sections: [
      {
        heading: "Benodigdheden en gereedschap",
        content: `Zorg dat je het volgende klaar hebt liggen voordat je begint:

**Materialen:**
- Composiet schuttingplanken of -panelen
- Aluminium palen met insteekgleuf
- Betonpoeren of schroefankers
- Snelbeton (bij betonpoeren)
- Afdekkapjes voor palen
- Eventueel eindprofielen

**Gereedschap:**
- Waterpas (min. 60 cm)
- Meetlint en potlood
- Schep of grondboor
- Accuboormachine
- Verstekzaag met hardmetalen blad
- Rubberen hamer
- Piketpaaltjes en metselkoord
- Lijmklemmen`,
      },
      {
        heading: "Stap 1: Schuttinglijn uitzetten",
        content: `Meet de exacte positie van je schutting uit:

1. Sla piketpaaltjes op de begin- en eindpositie
2. Span metselkoord strak tussen de paaltjes
3. Markeer de posities van de tussenliggende palen (max. 180 cm hart-op-hart)
4. Controleer of de lijn recht is en check de erfgrens

**Tip:** Overleg altijd met je buren voordat je begint. Een schutting op de erfgrens is gedeeld eigendom.`,
      },
      {
        heading: "Stap 2: Fundering aanbrengen",
        content: `Je hebt twee opties voor de fundering:

### Optie A: Betonpoeren (meest gebruikt)
- Graaf gaten van 40×40×60 cm
- Vul de gaten met snelbeton
- Plaats de paalhouder in het natte beton
- Controleer of de houder waterpas staat
- Laat 24 uur uitharden

### Optie B: Schroefankers
- Draai de ankers minimaal 60 cm de grond in
- Geschikt voor stevige, ongestoorde grond
- Sneller dan betonpoeren maar minder stevig bij slappe grond

**Belangrijk:** De fundering bepaalt de stabiliteit van je hele schutting. Neem hier de tijd voor.`,
      },
      {
        heading: "Stap 3: Aluminium palen plaatsen",
        content: `Plaats de palen in de paalhouders of ankers:

- Controleer elke paal met een waterpas (zowel links-rechts als voor-achter)
- Gebruik klemmen om de paal vast te zetten tijdens het uitrichten
- Schroef de paal vast aan de paalhouder
- Meet de afstand tussen de palen: deze moet exact overeenkomen met de breedte van je planken/panelen

**Veelgemaakte fout:** Palen niet controleren op loodrecht staan. Een scheefstand van slechts 5 mm onderaan resulteert in centimeters verschil bovenaan.`,
      },
      {
        heading: "Stap 4: Planken inschuiven",
        content: `Nu het leukste deel — de planken monteren:

1. Begin onderaan met de eerste plank
2. Schuif de plank in de gleuf van beide palen
3. Tik de plank voorzichtig op zijn plaats met een rubberen hamer
4. Laat **5 mm ruimte** aan weerszijden voor thermische uitzetting
5. Stapel plank voor plank naar boven
6. Controleer elke 3 planken of alles waterpas zit

Bij panelen schuif je het complete paneel in één keer in. Dit gaat sneller maar vereist twee personen.`,
      },
      {
        heading: "Stap 5: Afwerken",
        content: `De afwerking maakt het verschil tussen een amateur en een professioneel resultaat:

- Plaats afdekkapjes op alle aluminium palen
- Monteer eventuele afdekprofielen bovenop de bovenste plank
- Breng eindprofielen aan bij vrijstaande uiteinden
- Controleer alle verbindingen en schroeven

**Resultaat:** Een strakke, professionele schutting die er jarenlang mooi uitziet.`,
      },
      {
        heading: "Tijdsindicatie en kosten besparing",
        content: `### Hoeveel tijd kost het?

| Fase | Tijd (10 meter) |
|------|----------------|
| Uitzetten en fundering | 3-4 uur |
| Palen plaatsen | 1-2 uur |
| Planken inschuiven | 1-2 uur |
| Afwerking | 30-60 min |
| **Totaal** | **6-9 uur** |

### Hoeveel bespaar je?
Door zelf te plaatsen bespaar je gemiddeld **€50-€75 per strekkende meter** aan arbeidskosten. Bij een schutting van 15 meter is dat een besparing van **€750-€1.125**.`,
      },
      {
        heading: "Veelgemaakte fouten voorkomen",
        content: `1. **Geen expansieruimte** — composiet zet uit bij warmte. Laat altijd 5 mm ruimte aan de zijkanten
2. **Fundering overslaan** — zonder goede fundering verzakt je schutting
3. **Palen niet loodrecht** — controleer dubbel met een waterpas
4. **Verkeerd zaagblad** — gebruik altijd een hardmetalen blad (HM/TCT) voor composiet
5. **Alleen werken** — sommige stappen vereisen twee personen
6. **Erfgrens niet checken** — meet nauwkeurig en overleg met buren`,
      },
    ],
    faqs: [
      { q: "Kan ik een composiet schutting zelf plaatsen?", a: "Ja, met basisgereedschap en deze handleiding kun je als handige klusser zelf een composiet schutting plaatsen. Reken op 1 dag voor circa 10 meter." },
      { q: "Welk gereedschap heb ik nodig?", a: "Een waterpas, meetlint, schep/grondboor, accuboormachine en een verstekzaag met hardmetalen blad. Een rubberen hamer helpt bij het inschuiven van planken." },
      { q: "Hoeveel bespaar ik door zelf te plaatsen?", a: "Gemiddeld €50-€75 per strekkende meter. Bij 15 meter schutting bespaar je €750-€1.125 op arbeidskosten." },
      { q: "Hoe diep moeten de palen de grond in?", a: "Minimaal 50-60 cm. Bij betonpoeren graaf je gaten van 40×40×60 cm. Bij schroefankers draai je minimaal 60 cm diep." },
    ],
    internalLinks: [
      { label: "Complete gids composiet schuttingen", href: "/schutting-van-composiet" },
      { label: "Composiet schutting zelf maken", href: "/composiet-schutting-zelf-maken" },
      { label: "Composiet schutting met beton", href: "/composiet-schutting-met-beton" },
      { label: "Composiet schutting prijs per meter", href: "/composiet-schutting-prijs-per-meter" },
      { label: "Bekijk ons assortiment", href: "/categorie/schuttingen" },
      { label: "Offerte aanvragen", href: "/contact" },
    ],
  },

  /* ── 2. composiet-schutting-zelf-maken ───────────────────────────── */
  {
    slug: "composiet-schutting-zelf-maken",
    type: "cluster",
    parentSlug: "schutting-van-composiet",
    title: "Composiet schutting zelf maken: materialen, ontwerp en besparing",
    metaTitle: "Composiet Schutting Zelf Maken | DIY Gids 2026",
    metaDescription: "Zelf een composiet schutting maken? Ontdek welke materialen je nodig hebt, hoe je ontwerpt en hoeveel je bespaart. Praktische DIY gids.",
    author,
    publishDate: "2026-02-03",
    updatedDate: "2026-02-20",
    readingTime: "10 min",
    schemaTypes: ["HowTo", "FAQPage"],
    intro: `Een **composiet schutting zelf maken** is een populaire keuze voor tuinbezitters die willen besparen op plaatsingskosten. Het modulaire systeem van composiet planken en aluminium palen maakt het ook voor minder ervaren klussers haalbaar.

In dit artikel bespreken we het volledige traject: van materiaal kiezen en ontwerpen tot bestellen en zelf bouwen. Inclusief een eerlijke inschatting van de benodigde vaardigheden en gereedschap.`,
    sections: [
      {
        heading: "Is zelf maken iets voor jou?",
        content: `Eerlijk advies: niet elke klus is geschikt voor elke klusser. Beoordeel jezelf op deze punten:

**Je kunt het zelf als je:**
- Ervaring hebt met basisgereedschap (boormachine, zaag)
- Nauwkeurig kunt meten en waterpas werken
- Een helper hebt voor het tillen van palen en panelen
- Geduld hebt voor de voorbereiding

**Laat het doen als:**
- Je geen ervaring hebt met fundering/beton
- De ondergrond ongelijk of zeer zacht is
- De schutting hoger dan 2 meter moet worden
- Je geen geschikt gereedschap hebt

**Tip:** Je kunt ook de fundering laten leggen door een professional en vervolgens de planken zelf inschuiven.`,
      },
      {
        heading: "Materialen kiezen",
        content: `### Composiet planken
Kies tussen **mono-extrusie** (budget) en **co-extrusie** (premium). Co-extrusie biedt betere kleurvastheid en vlekbestendigheid.

### Palen
Kies altijd **aluminium palen** — ze roesten niet en passen perfect bij composiet. Stalen of houten palen raden we af.

### Fundering
- **Betonpoeren**: meest stabiel, geschikt voor alle grondsoorten
- **Schroefankers**: sneller, maar alleen geschikt voor stevige grond
- **Betonnen poer met grondanker**: combinatie voor extra stabiliteit

### Accessoires
- Afdekkapjes voor palen
- Eindprofielen voor open zijkanten
- Afdekstrip voor de bovenzijde
- Eventueel een composiet poort`,
      },
      {
        heading: "Ontwerp en planning",
        content: `Een goed ontwerp voorkomt dure fouten:

1. **Meet de totale lengte** nauwkeurig op (gebruik een lang meetlint of laser)
2. **Bepaal de hoogte**: standaard is 180 cm, maar 150 of 200 cm is ook mogelijk
3. **Bereken het aantal palen**: totale lengte ÷ 180 cm + 1
4. **Bereken het aantal planken**: hoogte ÷ plankhoogte per plank
5. **Bestel 5% extra** voor zaagverlies en eventuele fouten

### Rekenvoorbeeld (15 meter, 180 cm hoog)
- Palen: 15 ÷ 1,80 + 1 = **10 stuks**
- Planken per vak: 180 ÷ 20 cm = **9 planken**
- Totaal planken: 9 × 9 vakken = **81 planken** + 5% = **85 planken**

Gebruik onze [schutting planner](/schutting-planner) voor een automatische berekening.`,
      },
      {
        heading: "Kostenvergelijking: zelf maken vs. laten plaatsen",
        content: `| Kostenpost | Zelf maken | Laten plaatsen |
|------------|-----------|----------------|
| Materiaal (15m) | €2.175 | €2.175 |
| Fundering materiaal | €200 | €200 |
| Gereedschap (huur) | €75-€150 | — |
| Arbeidskosten | €0 | €750-€1.125 |
| **Totaal** | **€2.450-€2.525** | **€3.125-€3.500** |

**Besparing: €600-€1.050** door zelf te maken.`,
      },
    ],
    faqs: [
      { q: "Hoeveel bespaar ik door een composiet schutting zelf te maken?", a: "Gemiddeld €600-€1.050 bij een schutting van 15 meter. De besparing zit volledig in de arbeidskosten." },
      { q: "Welke composiet planken zijn het makkelijkst te verwerken?", a: "Planken met een insteeksysteem op aluminium palen zijn het eenvoudigst. Je schuift ze van bovenaf in de gleuf — geen schroeven of lijm nodig." },
      { q: "Heb ik een vergunning nodig?", a: "In de meeste gevallen niet, mits de schutting maximaal 2 meter hoog is en op de erfgrens staat. Check altijd bij je gemeente." },
      { q: "Kan ik een composiet schutting op bestaande betonpoeren plaatsen?", a: "Ja, mits de betonpoeren de juiste maat paalhouders hebben. Anders kun je universele paalhouders gebruiken die op de bestaande poeren passen." },
    ],
    internalLinks: [
      { label: "Composiet schutting plaatsen handleiding", href: "/composiet-schutting-plaatsen" },
      { label: "Complete gids composiet schuttingen", href: "/schutting-van-composiet" },
      { label: "Composiet schutting prijs per meter", href: "/composiet-schutting-prijs-per-meter" },
      { label: "Schutting planner tool", href: "/schutting-planner" },
      { label: "Bekijk schuttingen assortiment", href: "/categorie/schuttingen" },
      { label: "Offerte aanvragen", href: "/contact" },
    ],
  },

  /* ── 3. composiet-schutting-levensduur ───────────────────────────── */
  {
    slug: "composiet-schutting-levensduur",
    type: "cluster",
    parentSlug: "schutting-van-composiet",
    title: "Levensduur composiet schutting: hoelang gaat het mee?",
    metaTitle: "Levensduur Composiet Schutting | 20-30 Jaar?",
    metaDescription: "Hoelang gaat een composiet schutting mee? Ontdek de levensduur per type, wat de levensduur beïnvloedt en hoe je deze maximaliseert.",
    author,
    publishDate: "2026-02-05",
    updatedDate: "2026-02-20",
    readingTime: "7 min",
    schemaTypes: ["Article", "FAQPage"],
    intro: `De **levensduur van een composiet schutting** is een van de belangrijkste redenen om voor dit materiaal te kiezen. Waar een houten schutting na 10-15 jaar aan vervanging toe is, gaat composiet gemiddeld 25-30 jaar mee — zonder onderhoud.

Maar hoelang gaat composiet *echt* mee? En wat bepaalt of je schutting 20 of 30+ jaar meegaat? In dit artikel geven we een eerlijk en onderbouwd antwoord.`,
    sections: [
      {
        heading: "Levensduur per type composiet",
        content: `Niet alle composiet is gelijk. De levensduur hangt sterk af van het productietype:

| Type | Verwachte levensduur | Garantie |
|------|---------------------|----------|
| Mono-extrusie (basis) | 20-25 jaar | 10-15 jaar |
| Co-extrusie (premium) | 25-30+ jaar | 15-25 jaar |
| Massief composiet | 30+ jaar | 20-25 jaar |

**Co-extrusie** heeft een extra beschermende buitenlaag die het materiaal beschermt tegen UV, vlekken en krassen. Dit verlengt de levensduur aanzienlijk.

**Massief composiet** (niet hol) is het zwaarst maar ook het sterkst. Het wordt minder vaak gebruikt voor schuttingen vanwege het gewicht en de hogere prijs.`,
      },
      {
        heading: "Wat beïnvloedt de levensduur?",
        content: `Diverse factoren bepalen hoelang jouw schutting meegaat:

### 1. Kwaliteit van het materiaal
Premium merken zoals Silvadec gebruiken een hoger percentage houtvezels en betere polymeren dan budgetmerken. Dit resulteert in een stabieler en duurzamer product.

### 2. Montage
Een correct geplaatste schutting gaat langer mee:
- Voldoende expansieruimte (5 mm) voorkomt vervorming
- Een stabiele fundering voorkomt scheefstand
- Aluminium palen roesten niet (stalen palen wel)

### 3. Omgevingsfactoren
- **Zonzijde**: meer UV-blootstelling, iets snellere verkleuring
- **Schaduw**: meer kans op algengroei (geen schade, maar optisch)
- **Kustgebied**: zout heeft geen invloed op composiet (wel op stalen onderdelen)

### 4. Gebruik
- Klimplanten tegen de schutting zijn prima
- Zware voorwerpen ertegenaan plaatsen kan drukpunten veroorzaken
- Hogedrukreiniger op korte afstand kan de beschermlaag beschadigen`,
      },
      {
        heading: "Composiet vs. hout: levensduur vergelijking",
        content: `| Materiaal | Levensduur | Onderhoud nodig | Kosten over 25 jaar |
|-----------|-----------|----------------|-------------------|
| Composiet (co-extrusie) | 25-30+ jaar | Nee | €2.300 |
| Hardhout (bangkirai) | 15-25 jaar | Jaarlijks | €2.800-€3.600 |
| Naaldhout (vuren) | 8-15 jaar | 2-3x/jaar | €3.300+ |
| PVC | 10-15 jaar | Nee | €2.000-€2.500 |

Composiet combineert een lange levensduur met nul onderhoud, wat het op lange termijn tot de voordeligste optie maakt.`,
      },
      {
        heading: "Hoe maximaliseer je de levensduur?",
        content: `Met deze tips haal je het maximale uit je composiet schutting:

1. **Kies co-extrusie** — de extra beschermlaag maakt een groot verschil
2. **Gebruik aluminium palen** — ze gaan net zo lang mee als de planken
3. **Monteer correct** — volg de montage-instructies nauwkeurig op
4. **Reinig jaarlijks** — spuit af met een tuinslang om vuil en algen te verwijderen
5. **Gebruik geen hogedrukreiniger** op korte afstand
6. **Zorg voor goede afwatering** — staand water kan algengroei versnellen`,
      },
    ],
    faqs: [
      { q: "Hoelang gaat een composiet schutting mee?", a: "Gemiddeld 25-30 jaar. Co-extrusie composiet gaat het langst mee dankzij de extra beschermlaag." },
      { q: "Gaat composiet langer mee dan hout?", a: "Ja. Composiet gaat 25-30+ jaar mee zonder onderhoud. Hardhout gaat 15-25 jaar mee maar vereist jaarlijks onderhoud." },
      { q: "Wat is de garantie op een composiet schutting?", a: "Bij premium merken krijg je 15-25 jaar productgarantie. Dit dekt structureel falen en extreme verkleuring." },
      { q: "Kan composiet rotten of schimmelen?", a: "Nee. Composiet is volledig bestand tegen rot, schimmels en insecten. Dit is een van de belangrijkste voordelen." },
    ],
    internalLinks: [
      { label: "Complete gids composiet schuttingen", href: "/schutting-van-composiet" },
      { label: "Composiet levensduur algemeen", href: "/composiet-levensduur" },
      { label: "Composiet schutting nadelen", href: "/composiet-schutting-nadelen" },
      { label: "Composiet vs hout schutting", href: "/composiet-vs-hout-schutting" },
      { label: "Composiet garantie", href: "/composiet-garantie" },
      { label: "Bekijk ons assortiment", href: "/categorie/schuttingen" },
    ],
  },

  /* ── 4. composiet-schutting-180-hoog ─────────────────────────────── */
  {
    slug: "composiet-schutting-180-hoog",
    type: "cluster",
    parentSlug: "schutting-van-composiet",
    title: "Composiet schutting 180 cm hoog: de standaardhoogte uitgelegd",
    metaTitle: "Composiet Schutting 180 cm Hoog | Prijs & Opties",
    metaDescription: "Composiet schutting 180 cm hoog kopen? Bekijk opties, prijzen en regelgeving. Ontdek waarom 180 cm de populairste hoogte is.",
    author,
    publishDate: "2026-02-07",
    updatedDate: "2026-02-20",
    readingTime: "6 min",
    schemaTypes: ["Article", "FAQPage"],
    intro: `Een **composiet schutting van 180 cm hoog** is de meest gekozen hoogte in Nederland. Het biedt volledige privacy, voldoet aan de regelgeving in vrijwel alle gemeenten en is beschikbaar in alle kleuren en stijlen.

In dit artikel bespreken we waarom 180 cm de standaard is, welke opties er zijn, wat het kost en waar je op moet letten bij de aankoop.`,
    sections: [
      {
        heading: "Waarom is 180 cm de standaard?",
        content: `De hoogte van 180 cm is niet willekeurig gekozen:

- **Privacy**: 180 cm biedt volledige privacy voor de meeste mensen (gemiddelde ooghoogte ~170 cm)
- **Regelgeving**: in de meeste Nederlandse gemeenten mag een schutting op de erfgrens maximaal 2 meter hoog zijn. Met 180 cm zit je daar ruim onder
- **Windbelasting**: een hogere schutting vangt meer wind. Bij 180 cm is de windbelasting beheersbaar met standaard palenafstanden
- **Prijs**: de meeste systemen zijn geoptimaliseerd voor 180 cm, waardoor de prijs-kwaliteitverhouding het beste is

### Andere beschikbare hoogtes

| Hoogte | Geschikt voor | Prijsverschil t.o.v. 180 cm |
|--------|--------------|---------------------------|
| 90 cm | Tuinafscheiding, voortuin | -40% |
| 120 cm | Halve privacy, windscherm | -25% |
| 150 cm | Gedeeltelijke privacy | -15% |
| **180 cm** | **Volledige privacy** | **Standaard** |
| 200 cm | Maximale privacy | +15-20% |`,
      },
      {
        heading: "Opties voor 180 cm composiet schuttingen",
        content: `Bij een hoogte van 180 cm heb je keuze uit diverse systemen:

**1. Plank-voor-plank systeem**
Individuele planken die je in aluminium palen schuift. Flexibel: je kiest zelf de hoogte door het aantal planken te variëren. De meest populaire keuze.

**2. Compleet paneelsysteem**
Een kant-en-klaar paneel van 180×180 cm dat je als geheel plaatst. Snellere montage, maar minder flexibel in hoogte.

**3. Combinatie-systeem**
Composiet planken met een glazen of aluminium strook bovenin. Biedt privacy met daglicht doorlaat.

**Onze aanbeveling**: het plank-voor-plank systeem biedt de meeste flexibiliteit en de strakste afwerking.`,
      },
      {
        heading: "Prijzen voor 180 cm composiet schuttingen",
        content: `| Uitvoering | Prijs per meter (materiaal) | Inclusief plaatsing |
|------------|---------------------------|-------------------|
| Mono-extrusie basis | €85-€120 | €140-€180 |
| Co-extrusie premium | €120-€175 | €180-€245 |
| Aluminium frame compleet | €150-€220 | €210-€290 |
| Paneelsysteem | €130-€250 | €190-€310 |

### Wat is inbegrepen?
- Composiet planken voor 180 cm hoogte
- Aluminium palen (lengte afgestemd op 180 cm + fundering)
- Afdekkapjes

**Niet inbegrepen**: fundering (betonpoeren ≈ €15-€20/stuk), eventuele poorten, en arbeidskosten bij zelf plaatsen.`,
      },
      {
        heading: "Regelgeving en vergunningen",
        content: `In Nederland gelden de volgende regels voor schuttingen:

- **Op de erfgrens**: maximaal **2 meter** hoog, vergunningvrij
- **Achtererf**: maximaal 2 meter, vergunningvrij
- **Voorerf**: maximaal **1 meter**, vergunningvrij
- **Hoekperceel**: de zijkant die aan de openbare weg grenst telt als voorerf

Met 180 cm zit je **onder de maximale hoogte** en heb je in vrijwel alle gevallen **geen vergunning nodig**.

**Let op:** Controleer altijd het bestemmingsplan van je gemeente. Bij monumentale panden of beschermde stadsgezichten kunnen andere regels gelden.`,
      },
    ],
    faqs: [
      { q: "Is 180 cm hoog genoeg voor privacy?", a: "Ja. De gemiddelde ooghoogte is circa 170 cm. Bij 180 cm heb je volledige privacy, tenzij buren op een verhoogd terras staan." },
      { q: "Hoeveel kost een composiet schutting van 180 cm per meter?", a: "Reken op €85-€175 per meter voor materiaal, afhankelijk van het type composiet. Inclusief plaatsing €140-€290 per meter." },
      { q: "Heb ik een vergunning nodig voor een 180 cm schutting?", a: "In de meeste gevallen niet. Een schutting tot 2 meter op de erfgrens is vergunningvrij. Check wel altijd je gemeentelijke regels." },
      { q: "Kan ik later planken toevoegen om hoger te maken?", a: "Bij een plank-voor-plank systeem kun je eenvoudig planken toevoegen, mits de palen lang genoeg zijn. Plan dit vooraf in." },
    ],
    internalLinks: [
      { label: "Complete gids composiet schuttingen", href: "/schutting-van-composiet" },
      { label: "Composiet schutting prijs per meter", href: "/composiet-schutting-prijs-per-meter" },
      { label: "Zwarte composiet schutting", href: "/zwarte-composiet-schutting" },
      { label: "Antraciet composiet schutting", href: "/antraciet-composiet-schutting" },
      { label: "Composiet schutting plaatsen", href: "/composiet-schutting-plaatsen" },
      { label: "Bekijk ons assortiment", href: "/categorie/schuttingen" },
    ],
  },

  /* ── 5. composiet-tuinscherm ────────────────────────────────────── */
  {
    slug: "composiet-tuinscherm",
    type: "cluster",
    parentSlug: "schutting-van-composiet",
    title: "Composiet tuinscherm: stijlvolle privacy in de tuin",
    metaTitle: "Composiet Tuinscherm Kopen | Stijlvol & Duurzaam",
    metaDescription: "Composiet tuinscherm kopen? Ontdek de mogelijkheden, prijzen en voordelen. Van windscherm tot volledige privacy — altijd onderhoudsvrij.",
    author,
    publishDate: "2026-02-09",
    updatedDate: "2026-02-20",
    readingTime: "7 min",
    schemaTypes: ["Article", "FAQPage"],
    intro: `Een **composiet tuinscherm** biedt dezelfde voordelen als een composiet schutting maar in een compactere vorm. Of je nu een windscherm bij je terras wilt, een afscheiding voor de vuilnisbakken of een decoratief element in je tuin — composiet tuinschermen zijn veelzijdig en onderhoudsvrij.

In dit artikel bespreken we de verschillende toepassingen, soorten, prijzen en de voordelen van composiet tuinschermen.`,
    sections: [
      {
        heading: "Wat is een composiet tuinscherm?",
        content: `Een tuinscherm is een los staand of semi-permanent scherm dat je in de tuin plaatst voor privacy, windbescherming of decoratie. In tegenstelling tot een schutting (die de volledige erfgrens afsluit) wordt een tuinscherm vaak op specifieke plekken ingezet.

**Verschil met een schutting:**
- Een schutting loopt over de hele erfgrens
- Een tuinscherm is vaak 1-3 panelen breed
- Tuinschermen worden soms vrijstaand geplaatst
- Ze hebben vaak een meer decoratieve functie

**Toepassingen:**
- Windscherm bij het terras
- Privacy-element bij de jacuzzi of loungeset
- Afscheiding voor kliko's of compostbak
- Decoratieve tuinwand met plantenbak
- Balkonscherm`,
      },
      {
        heading: "Soorten composiet tuinschermen",
        content: `### 1. Horizontale plankschermen
De klassieke variant: horizontale composiet planken in aluminium palen. Beschikbaar in diverse breedtes en hoogtes.
- **Prijsindicatie**: €120-€220 per scherm (180×180 cm)

### 2. Rhombus / schuine latschermen
Planken onder een hoek van 45° geplaatst. Modern en laat gedeeltelijk licht door.
- **Prijsindicatie**: €180-€280 per scherm

### 3. Composiet met glas
Een combinatie van composiet planken onderaan en gehard glas bovenaan. Biedt privacy met daglicht.
- **Prijsindicatie**: €250-€400 per scherm

### 4. Plantenbak met scherm
Een composiet plantenbak met geïntegreerd scherm. Staat vrij en hoeft niet in de grond.
- **Prijsindicatie**: €300-€500 per stuk`,
      },
      {
        heading: "Voordelen van composiet tuinschermen",
        content: `- **Onderhoudsvrij** — geen schilderen of beitsen
- **Weerbestendig** — bestand tegen regen, zon, vorst en wind
- **Kleurvast** — vooral bij co-extrusie uitvoeringen
- **Veelzijdig** — beschikbaar in diverse stijlen en maten
- **Duurzaam** — 25+ jaar levensduur
- **Mooie uitstraling** — strakker en moderner dan houten schermen
- **Lichtgewicht** — eenvoudig te verplaatsen bij vrijstaande modellen`,
      },
      {
        heading: "Tuinscherm vs. schutting: wanneer kies je wat?",
        content: `| Criterium | Tuinscherm | Schutting |
|-----------|-----------|----------|
| Doel | Privacy op specifieke plek | Volledige erfafscheiding |
| Lengte | 1-5 meter | 10-50+ meter |
| Plaatsing | Soms vrijstaand | Altijd in de grond |
| Vergunning | Meestal niet nodig | Check bij >2m of voortuin |
| Prijs per meter | €80-€200 | €85-€175 |
| Flexibiliteit | Verplaatsbaar (sommige) | Permanent |

**Tip:** Je kunt tuinschermen en schuttingen combineren. Gebruik bijvoorbeeld een schutting op de erfgrens en een tuinscherm als accent bij je terras.`,
      },
    ],
    faqs: [
      { q: "Wat kost een composiet tuinscherm?", a: "Een standaard tuinscherm van 180×180 cm kost €120-€280, afhankelijk van het type. Combinaties met glas of plantenbak zijn duurder." },
      { q: "Kan een tuinscherm vrijstaand geplaatst worden?", a: "Ja, met speciale voetplaten of een plantenbak-combinatie. Zwaardere uitvoeringen hebben een fundering nodig." },
      { q: "Is een vergunning nodig voor een tuinscherm?", a: "Meestal niet, zolang het scherm niet hoger is dan 2 meter. Bij plaatsing in de voortuin gelden mogelijk andere regels." },
      { q: "Hoe onderhoud ik een composiet tuinscherm?", a: "Af en toe afspuiten met water is voldoende. Bij algengroei gebruik je een mild reinigingsmiddel en een zachte borstel." },
    ],
    internalLinks: [
      { label: "Complete gids composiet schuttingen", href: "/schutting-van-composiet" },
      { label: "Composiet schutting 180 cm hoog", href: "/composiet-schutting-180-hoog" },
      { label: "Zwarte composiet schutting", href: "/zwarte-composiet-schutting" },
      { label: "Composiet schutting prijs per meter", href: "/composiet-schutting-prijs-per-meter" },
      { label: "Bekijk ons assortiment", href: "/categorie/schuttingen" },
      { label: "Offerte aanvragen", href: "/contact" },
    ],
  },
];

/* ── COMPARISON PAGES ───────────────────────────────────────────────── */

const schuttingExpansionComparisonPages: SEOPage[] = [
  /* ── Praxis composiet schutting ──────────────────────────────────── */
  {
    slug: "praxis-composiet-schutting",
    type: "comparison",
    parentSlug: "schutting-van-composiet",
    title: "Praxis composiet schutting: aanbod, prijzen en alternatieven",
    metaTitle: "Praxis Composiet Schutting | Eerlijke Review 2026",
    metaDescription: "Composiet schutting bij Praxis kopen? Bekijk het aanbod, vergelijk prijzen en ontdek of een specialist betere opties biedt. Onafhankelijk advies.",
    author,
    publishDate: "2026-02-10",
    updatedDate: "2026-02-20",
    readingTime: "8 min",
    schemaTypes: ["Article", "FAQPage"],
    intro: `Overweeg je een **composiet schutting bij Praxis** te kopen? Praxis is als bouwmarkt een logische eerste stop, maar is het ook de beste keuze? In dit artikel beoordelen we het aanbod, vergelijken we prijzen en kwaliteit, en bespreken we wanneer een specialist de betere optie is.`,
    sections: [
      {
        heading: "Composiet schutting aanbod bij Praxis",
        content: `Praxis biedt composiet schuttingen aan van diverse merken, waaronder:

- **Elephant**: het meest voorkomende merk bij Praxis. Beschikbaar in de Forte, Design en Modular lijnen
- **Woodvision**: budget-lijn met basiskwaliteit composiet
- **Hillhout**: beperkt composiet aanbod, vooral hout

### Beschikbare systemen
- Plank-voor-plank schermen in diverse kleuren
- Complete paneelsystemen
- Los verkrijgbare aluminium palen en accessoires

Het aanbod varieert per vestiging. Niet alle filialen hebben het volledige composiet assortiment op voorraad.`,
      },
      {
        heading: "Prijsvergelijking Praxis vs. specialist",
        content: `| Product | Praxis | Specialist (wij) | Verschil |
|---------|--------|-------------------|----------|
| Mono-extrusie plank (per m) | €90-€130 | €85-€120 | 0-10% goedkoper |
| Co-extrusie plank (per m) | €135-€190 | €120-€175 | 10-15% goedkoper |
| Aluminium paal (per stuk) | €55-€80 | €50-€70 | 5-15% goedkoper |
| Compleet scherm 180×180 | €160-€280 | €140-€250 | 10-15% goedkoper |

**Waarom zijn specialisten vaak goedkoper?**
- Directe inkoop bij fabrikanten (geen tussenhandel)
- Geen bouwmarkt-marge
- Grotere volumes in composiet
- Betere onderhandelingspositie bij premium merken`,
      },
      {
        heading: "Kwaliteitsvergelijking",
        content: `### Praxis aanbod
- Voornamelijk Elephant (goed basismerk)
- Beperkt premium co-extrusie aanbod
- Standaard kleuren (antraciet, zwart, bruin)
- Garantie via het merk (10-15 jaar)

### Specialist aanbod (SchuttingvanComposiet.nl)
- Premium merken zoals Silvadec (Frans kwaliteitsmerk)
- Uitgebreid co-extrusie assortiment
- Meer kleurkeuze (8+ kleuren)
- Langere garantie (tot 25 jaar)
- Persoonlijk advies en maatwerk mogelijk

### Advies en service
Bij een bouwmarkt ben je afhankelijk van de kennis van de medewerker. Bij een specialist krijg je:
- Persoonlijk advies op basis van je situatie
- Hulp bij het berekenen van materialen
- Montage-support of professionele installatie
- Garantieafhandeling via één aanspreekpunt`,
      },
      {
        heading: "Wanneer kies je Praxis?",
        content: `Praxis is een goede keuze als:
- Je snel een kleine hoeveelheid nodig hebt
- Je het product eerst fysiek wilt zien en voelen
- Basiskwaliteit voldoende is voor jouw situatie
- Je al bekend bent met het merk Elephant

**Kies een specialist als:**
- Je een grotere schutting (>10 meter) nodig hebt
- Je premium kwaliteit en langere garantie wilt
- Je persoonlijk advies nodig hebt
- Je de schutting wilt laten monteren
- Prijs-kwaliteitverhouding belangrijk is bij grotere projecten`,
      },
    ],
    faqs: [
      { q: "Verkoopt Praxis composiet schuttingen?", a: "Ja, Praxis verkoopt composiet schuttingen, voornamelijk van het merk Elephant. Het aanbod varieert per vestiging." },
      { q: "Is een composiet schutting bij Praxis goedkoper?", a: "Niet per se. Specialisten kopen direct in bij fabrikanten en zijn bij grotere projecten vaak 10-15% goedkoper." },
      { q: "Welk merk composiet verkoopt Praxis?", a: "Voornamelijk Elephant (Forte, Design, Modular) en enkele budget-alternatieven zoals Woodvision." },
      { q: "Kan Praxis een composiet schutting plaatsen?", a: "Praxis biedt soms montageservice via partners aan, maar dit is niet in alle vestigingen beschikbaar en vaak duurder dan bij een specialist." },
    ],
    comparisonTable: {
      headers: ["Criterium", "Praxis", "SchuttingvanComposiet.nl"],
      rows: [
        { aspect: "Merken", option1: "Elephant, Woodvision", option2: "Silvadec, premium co-extrusie" },
        { aspect: "Prijs (co-extrusie/m)", option1: "€135-€190", option2: "€120-€175" },
        { aspect: "Garantie", option1: "10-15 jaar", option2: "15-25 jaar" },
        { aspect: "Kleurkeuze", option1: "3-5 kleuren", option2: "8+ kleuren" },
        { aspect: "Persoonlijk advies", option1: "Beperkt", option2: "Uitgebreid" },
        { aspect: "Montageservice", option1: "Soms beschikbaar", option2: "Ja, professioneel" },
        { aspect: "Maatwerk", option1: "Nee", option2: "Ja" },
      ],
    },
    internalLinks: [
      { label: "Complete gids composiet schuttingen", href: "/schutting-van-composiet" },
      { label: "Hornbach composiet schutting", href: "/hornbach-composiet-schutting" },
      { label: "Gamma composiet schutting", href: "/gamma-composiet-schutting" },
      { label: "Karwei composiet schutting", href: "/karwei-composiet-schutting" },
      { label: "Composiet schutting prijs per meter", href: "/composiet-schutting-prijs-per-meter" },
      { label: "Bekijk ons assortiment", href: "/categorie/schuttingen" },
    ],
  },

  /* ── Karwei composiet schutting ──────────────────────────────────── */
  {
    slug: "karwei-composiet-schutting",
    type: "comparison",
    parentSlug: "schutting-van-composiet",
    title: "Karwei composiet schutting: aanbod, prijzen en alternatieven",
    metaTitle: "Karwei Composiet Schutting | Eerlijke Review 2026",
    metaDescription: "Composiet schutting bij Karwei kopen? Bekijk het aanbod, vergelijk prijzen met specialisten en ontdek de beste keuze. Onafhankelijk advies.",
    author,
    publishDate: "2026-02-11",
    updatedDate: "2026-02-20",
    readingTime: "8 min",
    schemaTypes: ["Article", "FAQPage"],
    intro: `Zoek je een **composiet schutting bij Karwei**? Karwei is als bouwmarkt een bekende naam, maar hoe verhoudt hun aanbod zich tot dat van een specialist? In dit artikel vergelijken we het composiet schuttingaanbod van Karwei op prijs, kwaliteit en service.`,
    sections: [
      {
        heading: "Composiet schutting aanbod bij Karwei",
        content: `Karwei biedt een selectie composiet schuttingen aan:

- **Elephant**: het belangrijkste composiet merk bij Karwei
- **Huismerk-opties**: beperkt beschikbaar, wisselend per seizoen
- **Losse planken en accessoires**: aluminium palen, afdekkapjes etc.

### Kenmerken van het Karwei aanbod
- Gericht op de doe-het-zelver
- Standaard kleuren: antraciet, zwart, bruin
- Voornamelijk mono-extrusie en basis co-extrusie
- Complete starterspakketten beschikbaar in sommige vestigingen
- Online bestelbaar met thuisbezorging

Het assortiment is vergelijkbaar met dat van Praxis (beide onderdeel van Maxeda DIY Group).`,
      },
      {
        heading: "Prijsvergelijking Karwei vs. specialist",
        content: `| Product | Karwei | Specialist (wij) | Verschil |
|---------|--------|-------------------|----------|
| Mono-extrusie plank (per m) | €90-€135 | €85-€120 | 5-10% goedkoper |
| Co-extrusie plank (per m) | €140-€195 | €120-€175 | 10-15% goedkoper |
| Aluminium paal (per stuk) | €55-€85 | €50-€70 | 10-20% goedkoper |
| Compleet scherm 180×180 | €165-€285 | €140-€250 | 10-15% goedkoper |

Karwei hanteert bouwmarktprijzen die doorgaans iets hoger liggen dan bij specialisten. Bij grotere projecten loopt het prijsverschil snel op.`,
      },
      {
        heading: "Service en advies",
        content: `### Karwei
- Advies van bouwmarktmedewerkers (wisselende expertise)
- Geen maatwerk mogelijk
- Online materiaallijst tool beschikbaar
- Retourbeleid conform bouwmarktvoorwaarden
- Montageservice via externe partners (niet altijd beschikbaar)

### Specialist (SchuttingvanComposiet.nl)
- Composiet-specifieke expertise
- Persoonlijk advies en op-maat berekeningen
- Gratis [schutting planner](/schutting-planner) tool
- Professionele montage door ervaren teams
- Eén aanspreekpunt voor advies, levering en montage
- Uitgebreide naservice en garantieafhandeling`,
      },
      {
        heading: "Wanneer kies je Karwei?",
        content: `Karwei is geschikt als:
- Je een klein project hebt (1-3 schermen)
- Je het materiaal fysiek wilt bekijken
- Basiskwaliteit voldoende is
- Je snel materiaal nodig hebt en een filiaal dichtbij hebt

**Kies een specialist als:**
- Je een groter project plant (>5 meter)
- Je waarde hecht aan premium kwaliteit
- Je professioneel advies of montage wilt
- Je de beste prijs-kwaliteitverhouding zoekt
- Langere garantie belangrijk voor je is`,
      },
    ],
    faqs: [
      { q: "Heeft Karwei composiet schuttingen?", a: "Ja, Karwei verkoopt composiet schuttingen, voornamelijk van het merk Elephant. Het aanbod is vergelijkbaar met Praxis." },
      { q: "Is Karwei goedkoper dan een specialist?", a: "Nee, specialisten zijn bij grotere projecten meestal 10-15% goedkoper door directe inkoop bij fabrikanten." },
      { q: "Kan Karwei een schutting plaatsen?", a: "Karwei biedt soms montageservice via externe partners, maar dit is niet overal beschikbaar. Een specialist biedt meer zekerheid." },
      { q: "Welke merken composiet schutting verkoopt Karwei?", a: "Voornamelijk Elephant en soms seizoensgebonden huismerk-opties. Het premium co-extrusie aanbod is beperkt." },
    ],
    comparisonTable: {
      headers: ["Criterium", "Karwei", "SchuttingvanComposiet.nl"],
      rows: [
        { aspect: "Merken", option1: "Elephant, huismerk", option2: "Silvadec, premium co-extrusie" },
        { aspect: "Prijs (co-extrusie/m)", option1: "€140-€195", option2: "€120-€175" },
        { aspect: "Garantie", option1: "10-15 jaar", option2: "15-25 jaar" },
        { aspect: "Kleurkeuze", option1: "3-4 kleuren", option2: "8+ kleuren" },
        { aspect: "Persoonlijk advies", option1: "Basis", option2: "Uitgebreid" },
        { aspect: "Montageservice", option1: "Beperkt", option2: "Ja, professioneel" },
        { aspect: "Online planner", option1: "Nee", option2: "Ja, gratis" },
      ],
    },
    internalLinks: [
      { label: "Complete gids composiet schuttingen", href: "/schutting-van-composiet" },
      { label: "Praxis composiet schutting", href: "/praxis-composiet-schutting" },
      { label: "Hornbach composiet schutting", href: "/hornbach-composiet-schutting" },
      { label: "Gamma composiet schutting", href: "/gamma-composiet-schutting" },
      { label: "Composiet schutting prijs per meter", href: "/composiet-schutting-prijs-per-meter" },
      { label: "Bekijk ons assortiment", href: "/categorie/schuttingen" },
    ],
  },
];

export const allSchuttingExpansionPages: SEOPage[] = [
  ...schuttingExpansionClusterPages,
  ...schuttingExpansionComparisonPages,
];
