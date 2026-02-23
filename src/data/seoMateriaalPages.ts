// ── SEO Content: Pillar 4 — Wat is Composiet (Materiaal / TOFU) ─────────────
import type { SEOPage } from "./seoPages";

const defaultAuthor = { name: "Jan van der Berg", role: "Composiet Specialist — 18 jaar ervaring" };

// ── PILLAR: Wat is composiet? ───────────────────────────────────────────────
export const materiaalPillarPage: SEOPage = {
  slug: "wat-is-composiet",
  type: "pillar",
  title: "Wat is composiet? Alles over het materiaal, samenstelling en toepassingen",
  metaTitle: "Wat is Composiet? | Samenstelling, Soorten & Toepassingen",
  metaDescription: "Wat is composiet precies? Leer alles over de samenstelling, productie, soorten, levensduur en toepassingen van composiet materiaal.",
  author: defaultAuthor,
  publishDate: "2026-01-05",
  updatedDate: "2026-02-22",
  readingTime: "12 min",
  schemaTypes: ["Article", "FAQPage"],
  intro: `**Composiet** is een samengesteld materiaal dat bestaat uit twee of meer componenten die samen betere eigenschappen leveren dan de afzonderlijke materialen. In de bouw- en tuinbranche verwijst "composiet" meestal naar **Wood Plastic Composite (WPC)**: een mengsel van houtvezels en kunststof polymeren.

Dit materiaal wordt steeds populairder voor vlonderplanken, schuttingen en gevelbekleding. In deze gids leggen we uit wat composiet precies is, hoe het gemaakt wordt, welke soorten er zijn en waarvoor je het kunt gebruiken.`,
  sections: [
    {
      heading: "Samenstelling van composiet",
      content: `Composiet voor buitentoepassingen bestaat typisch uit:

- **Houtvezels (50-70%)**: meestal gerecycled zaagsel of houtmeel van naaldhout. Deze vezels geven het materiaal zijn houtachtige uitstraling en stijfheid.
- **Kunststof polymeren (30-50%)**: polyethyleen (PE), polypropyleen (PP) of PVC. Dit maakt het materiaal waterbestendig en rotvrij.
- **Additieven (3-8%)**: UV-stabilisatoren tegen verkleuring, kleurstoffen, bindmiddelen en soms brandvertragers.

De exacte verhouding verschilt per fabrikant en product. Een hoger percentage houtvezels geeft een meer natuurlijke uitstraling; meer kunststof maakt het materiaal waterbestendiger.

### Grondstofherkomst

Veel composietproducenten gebruiken **gerecyclede grondstoffen**:
- Houtvezels uit zaagafval van de houtindustrie
- Kunststof uit gerecyclede verpakkingen (HDPE flessen, PP dozen)

Dit maakt composiet een relatief duurzame keuze vergeleken met tropisch hardhout.`,
    },
    {
      heading: "Productieproces",
      content: `Composiet wordt geproduceerd via een proces genaamd **extrusie**:

1. **Mengen**: houtvezels, kunststof granulaat en additieven worden gemengd
2. **Verwarmen**: het mengsel wordt verhit tot de kunststof smelt (160-200°C)
3. **Extruderen**: het vloeibare mengsel wordt door een matrijs (mal) geperst in de gewenste vorm
4. **Koelen**: het profiel koelt af en verhardt
5. **Afwerken**: oppervlaktebehandeling (borstelen, embossing) voor houtstructuur

### Mono-extrusie vs co-extrusie

- **Mono-extrusie**: het volledige profiel bestaat uit één laag composiet. Goede basiskwaliteit.
- **Co-extrusie**: een extra beschermende buitenlaag (cap) wordt rondom de kern aangebracht. Deze cap is gemaakt van puur kunststof met UV-stabilisatoren en biedt superieure bescherming tegen vlekken, krassen en verkleuring.

Co-extrusie is vergelijkbaar met een chocoladereep met coating — de buitenlaag beschermt de kern.`,
    },
    {
      heading: "Soorten composiet",
      content: `Er zijn verschillende soorten composiet voor buitentoepassingen:`,
      subsections: [
        {
          heading: "WPC (Wood Plastic Composite)",
          content: `De meest voorkomende vorm. Bevat houtvezels en kunststof. Verkrijgbaar als:
- Vlonderplanken
- Schuttingplanken
- Gevelbekleding
- Tuinmeubelen

WPC is de standaard waar de meeste mensen aan denken bij "composiet".`,
        },
        {
          heading: "Holle vs massieve profielen",
          content: `- **Holle profielen**: lichter, goedkoper, geschikt voor woongebruik. Hebben interne kamers die gewicht besparen.
- **Massieve profielen**: volledig gevuld, zwaarder en sterker. Geschikt voor commercieel gebruik en zware belasting.

Voor een privé-terras of schutting volstaat een hol profiel. Voor een horecaterras of openbare ruimte is massief composiet aan te raden.`,
        },
        {
          heading: "BPC (Bamboo Plastic Composite)",
          content: `Een variant die bamboevezels gebruikt in plaats van houtvezels. Bamboe groeit sneller dan hout en is daardoor nog duurzamer. De eigenschappen zijn vergelijkbaar met WPC.`,
        },
      ],
    },
    {
      heading: "Toepassingen van composiet",
      content: `Composiet wordt gebruikt voor diverse buitentoepassingen:

### Vlonderplanken / terrasplanken
De meest populaire toepassing. Composiet vlonders zijn splintervrij, onderhoudsvrij en beschikbaar in vele kleuren. Ideaal voor terrassen, balkons en zwembaddecks.

### Schuttingen / tuinschermen
Composiet schuttingen zijn rot- en schimmelbestendig. Ze worden gemonteerd op aluminium palen met een insteeksysteem.

### Gevelbekleding
Composiet gevelplanken worden als bekleding op de buitenmuur aangebracht. Ze bieden bescherming, isolatie en een esthetische upgrade zonder schilderwerk.

### Overige toepassingen
- Tuinmeubelen
- Plantenbakken
- Pergola's
- Speeltoestellen
- Geluidsschermen langs snelwegen`,
    },
    {
      heading: "Voordelen van composiet",
      content: `- **Onderhoudsvrij**: geen schilderen, beitsen, oliën of schuren
- **Lange levensduur**: 25-30+ jaar bij normaal gebruik
- **Rot- en schimmelbestendig**: neemt geen vocht op
- **Splintervrij**: veilig voor kinderen en huisdieren
- **Kleurvast**: dankzij UV-stabilisatoren (vooral co-extrusie)
- **Insectenbestendig**: geen houtworm of termieten
- **Recyclebaar**: aan het einde van de levensduur opnieuw te verwerken
- **Consistent**: elke plank heeft dezelfde kleur en structuur`,
    },
    {
      heading: "Nadelen van composiet",
      content: `- **Hogere aanschafprijs**: 30-60% duurder dan naaldhout (goedkoper over de levensduur)
- **Thermische uitzetting**: zet uit bij warmte, krimpt bij koude (oplosbaar met correcte montage)
- **Gewicht**: zwaarder dan hout
- **Geen 100% natuurlijk**: het blijft een samengesteld materiaal
- **Initiële kleurverandering**: lichte kleurwijziging in de eerste 8-12 weken

Lees meer over nadelen per toepassing:
- [Composiet schutting nadelen](/composiet-schutting-nadelen)
- [Composiet vlonderplanken nadelen](/composiet-vlonderplanken-nadelen)
- [Composiet gevelbekleding nadelen](/gevelbekleding-composiet-nadelen)`,
    },
    {
      heading: "Composiet vs andere materialen",
      content: `| Eigenschap | Composiet (WPC) | Hardhout | Naaldhout | PVC / kunststof |
|-----------|----------------|---------|----------|----------------|
| Houtvezels | Ja (50-70%) | 100% hout | 100% hout | Nee |
| Onderhoudsvrij | Ja | Nee | Nee | Ja |
| Houtlook | Goed tot zeer goed | Natuurlijk | Natuurlijk | Beperkt |
| Levensduur | 25-30 jaar | 15-25 jaar | 8-15 jaar | 15-20 jaar |
| Prijs | Gemiddeld-hoog | Hoog | Laag | Gemiddeld |
| Rotbestendig | Ja | Gedeeltelijk | Nee | Ja |
| Duurzaamheid | Goed (recyclebaar) | Wisselend | Matig | Matig |
| Sterkte | Goed | Zeer goed | Matig | Matig |`,
    },
  ],
  faqs: [
    { q: "Wat is composiet precies?", a: "Composiet is een samengesteld materiaal van houtvezels (50-70%) en kunststof polymeren (30-50%), aangevuld met UV-stabilisatoren en kleurstoffen. Het combineert de uitstraling van hout met de duurzaamheid van kunststof." },
    { q: "Is composiet hetzelfde als kunststof?", a: "Nee. Composiet bevat 50-70% houtvezels en ziet er daardoor uit als hout. Volledig kunststof (PVC/HDPE) bevat geen houtvezels en heeft een minder natuurlijke uitstraling." },
    { q: "Hoe lang gaat composiet mee?", a: "Gemiddeld 25-30 jaar bij normaal gebruik. Co-extrusie composiet gaat het langst mee dankzij de extra beschermlaag." },
    { q: "Is composiet milieuvriendelijk?", a: "Relatief ja. Veel composiet bevat gerecyclede houtvezels en kunststof. Het materiaal is aan het einde van de levensduur recyclebaar. De lange levensduur en het ontbreken van onderhoud (geen verf, beits) dragen bij aan de duurzaamheid." },
    { q: "Wat is het verschil tussen mono-extrusie en co-extrusie?", a: "Mono-extrusie is één uniforme laag composiet. Co-extrusie heeft een extra beschermende buitenlaag die beter bestand is tegen vlekken, krassen en UV-verkleuring." },
    { q: "Kan composiet recycled worden?", a: "Ja, composiet is aan het einde van de levensduur te recyclen. De houtvezels en kunststof kunnen gescheiden of gezamenlijk herverwerkt worden tot nieuw composiet." },
  ],
  internalLinks: [
    { label: "Composiet samenstelling", href: "/composiet-samenstelling" },
    { label: "Composiet duurzaamheid & milieu", href: "/composiet-duurzaamheid-milieu" },
    { label: "Composiet levensduur", href: "/composiet-levensduur" },
    { label: "Composiet garantie", href: "/composiet-garantie" },
    { label: "Co-extrusie vs composiet", href: "/co-extrusie-vs-composiet" },
    { label: "Composiet schuttingen", href: "/schutting-van-composiet" },
    { label: "Composiet vlonderplanken", href: "/composiet-vlonderplanken" },
    { label: "Composiet gevelbekleding", href: "/composiet-gevelbekleding" },
    { label: "Bekijk ons assortiment", href: "/assortiment" },
  ],
};

// ── CLUSTER PAGES ───────────────────────────────────────────────────────────
export const materiaalClusterPages: SEOPage[] = [
  // 1. Composiet samenstelling
  {
    slug: "composiet-samenstelling",
    type: "cluster",
    parentSlug: "wat-is-composiet",
    title: "Composiet samenstelling: waaruit bestaat het materiaal?",
    metaTitle: "Composiet Samenstelling | Houtvezels, Kunststof & Meer",
    metaDescription: "Waaruit bestaat composiet? Ontdek de exacte samenstelling: houtvezels, kunststof polymeren en additieven. Inclusief verschil per producent.",
    author: defaultAuthor,
    publishDate: "2026-01-08",
    updatedDate: "2026-02-22",
    readingTime: "6 min",
    schemaTypes: ["Article", "FAQPage"],
    intro: `Wat zit er precies in **composiet**? De samenstelling bepaalt de kwaliteit, duurzaamheid en uitstraling van het eindproduct. In dit artikel ontleden we composiet tot op de vezel — letterlijk.`,
    sections: [
      {
        heading: "De drie hoofdcomponenten",
        content: `Elk composiet product bevat drie categorieën grondstoffen:

### 1. Houtvezels (50-70%)
De ruggengraat van composiet. Deze vezels geven het materiaal zijn:
- Houtachtige uitstraling en textuur
- Stijfheid en draagkracht
- Natuurlijke warmte bij aanraking

De houtvezels zijn meestal afkomstig van **gerecycled zaagafval** (zaagsel, houtmeel) van naaldhout. Sommige producenten gebruiken bamboevezels voor extra sterkte.

**Kwaliteitsfactor**: fijner houtmeel geeft een gladder oppervlak. Grove vezels geven een meer rustieke textuur.

### 2. Kunststof polymeren (30-50%)
De bindende component die het materiaal waterbestendig maakt:
- **Polyethyleen (PE)**: meest gebruikt, goede balans tussen flexibiliteit en sterkte
- **Polypropyleen (PP)**: iets stijver dan PE, hogere warmtebestendigheid
- **PVC**: stijfst en hardst, maar minder milieuvriendelijk

Veel producenten gebruiken **gerecycled polyethyleen** (bijv. uit HDPE flessen).

### 3. Additieven (3-8%)
De "kruiden" die het recept compleet maken:
- **UV-stabilisatoren**: voorkomen verkleuring door zonlicht
- **Kleurstoffen**: geven de gewenste kleur (doorlopend door het materiaal)
- **Bindmiddelen** (coupling agents): verbeteren de hechting tussen hout en kunststof
- **Antioxidanten**: voorkomen degradatie van de kunststof
- **Brandvertragers**: bij producten met hogere brandklasse-eisen
- **Biociden**: voorkomen schimmelgroei (vooral bij goedkopere producten)`,
      },
      {
        heading: "Samenstelling per kwaliteitsniveau",
        content: `| Component | Budget composiet | Premium composiet | Co-extrusie premium |
|-----------|-----------------|-------------------|---------------------|
| Houtvezels | 60-70% | 55-65% | 55-60% (kern) |
| Kunststof | 25-35% | 30-40% | 35-40% (kern) |
| Additieven | 3-5% | 5-8% | 5-8% + cap-laag |
| Gerecycled % | 0-50% | 50-80% | 60-95% |
| Cap-laag | Nee | Nee | Ja (ASA/HDPE) |

De cap-laag bij co-extrusie is een extra omhulsel van puur kunststof (ASA of HDPE) met geconcentreerde UV-stabilisatoren. Deze laag is typisch 0,5-1 mm dik en biedt superieure bescherming.`,
      },
      {
        heading: "Invloed van samenstelling op prestaties",
        content: `De verhouding houtvezels/kunststof beïnvloedt direct de producteigenschappen:

- **Meer houtvezels** → natuurlijkere uitstraling, stijver, maar gevoeliger voor vocht bij slechte encapsulatie
- **Meer kunststof** → waterbestendiger, flexibeler, maar minder natuurlijke look
- **Betere additieven** → langere kleurvastheid, hogere brandklasse, langere levensduur

**De ideale samenstelling** voor buitentoepassingen is circa 60% houtvezels en 40% kunststof, met hoogwaardige UV-stabilisatoren. Dit geeft de beste balans tussen uitstraling en duurzaamheid.`,
      },
    ],
    faqs: [
      { q: "Bevat composiet echt hout?", a: "Ja, composiet bevat 50-70% houtvezels (zaagsel/houtmeel). Dit geeft het materiaal zijn houtachtige uitstraling en textuur." },
      { q: "Is composiet giftig?", a: "Nee. Hoogwaardig composiet bevat geen schadelijke stoffen. Het materiaal is voedselveilig-gecertificeerd bij sommige producenten en wordt ook gebruikt voor speeltoestellen." },
      { q: "Waarom verschilt composiet per merk?", a: "Elke producent hanteert een eigen recept: andere verhoudingen houtvezels/kunststof, andere polymeren (PE, PP of PVC) en verschillende additieven. Dit verklaart de prijs- en kwaliteitsverschillen." },
    ],
    internalLinks: [
      { label: "Wat is composiet?", href: "/wat-is-composiet" },
      { label: "Co-extrusie vs composiet", href: "/co-extrusie-vs-composiet" },
      { label: "Composiet duurzaamheid & milieu", href: "/composiet-duurzaamheid-milieu" },
      { label: "Composiet vs kunststof", href: "/composiet-vs-kunststof" },
      { label: "Bekijk ons assortiment", href: "/assortiment" },
    ],
  },

  // 2. Composiet duurzaamheid & milieu
  {
    slug: "composiet-duurzaamheid-milieu",
    type: "cluster",
    parentSlug: "wat-is-composiet",
    title: "Composiet duurzaamheid en milieu: hoe groen is het echt?",
    metaTitle: "Composiet Duurzaamheid & Milieu | Hoe Groen Is Het?",
    metaDescription: "Hoe duurzaam is composiet? Analyse van grondstoffen, productie, levensduur en recyclebaarheid. Eerlijke milieu-beoordeling.",
    author: defaultAuthor,
    publishDate: "2026-01-10",
    updatedDate: "2026-02-22",
    readingTime: "7 min",
    schemaTypes: ["Article", "FAQPage"],
    intro: `Is composiet echt **duurzaam**? Het antwoord is genuanceerd. Composiet scoort goed op sommige milieu-aspecten en minder op andere. In dit artikel maken we een eerlijke analyse van de duurzaamheid van composiet — van grondstof tot einde levensduur.`,
    sections: [
      {
        heading: "Grondstoffen en productie",
        content: `### Positieve aspecten
- **Gerecyclede grondstoffen**: veel composiet bevat 60-95% gerecycled materiaal (zaagafval + gerecycled plastic)
- **Geen tropisch hout**: composiet vervangt de vraag naar tropisch hardhout
- **Efficiënt grondstofgebruik**: zaagafval dat anders verbrand wordt, krijgt een tweede leven

### Aandachtspunten
- **Energieverbruik bij productie**: het extrusieproces vereist verhitting tot 160-200°C
- **Kunststofcomponent**: 30-50% van het materiaal is kunststof, afkomstig van fossiele of gerecyclede bronnen
- **Transport**: veel composiet wordt geproduceerd in Frankrijk of Azië en per vrachtwagen/schip getransporteerd`,
      },
      {
        heading: "Levenscyclusanalyse (LCA)",
        content: `De milieu-impact over de volledige levensduur vertelt het eerlijke verhaal:

| Factor | Composiet | Hardhout (tropisch) | Naaldhout (vuren) |
|--------|----------|--------------------|--------------------|
| Grondstof | Gerecycled (60-95%) | Tropische bossen | Europese bossen (FSC) |
| Productie CO₂ | Gemiddeld | Laag | Laag |
| Transport | Gemiddeld | Hoog (tropisch) | Laag (lokaal) |
| Onderhoud (25 jaar) | Geen | Oliën (5x) | Schilderen (5-8x) |
| Chemicaliën onderhoud | Geen | Olie, beits | Verf, beits, primer |
| Levensduur | 25-30 jaar | 15-25 jaar | 8-15 jaar |
| Vervangingen (50 jaar) | 1-2x | 2-3x | 3-5x |
| Einde levensduur | Recyclebaar | Composteerbaar | Composteerbaar |

**Conclusie**: composiet scoort beter over de volledige levensduur door de lange levensduur, het ontbreken van onderhoud (geen verf/beits) en het gebruik van gerecyclede grondstoffen.`,
      },
      {
        heading: "Recyclebaarheid",
        content: `Composiet is aan het einde van de levensduur **recyclebaar**:

1. **Mechanisch recyclen**: het materiaal wordt vermalen en opnieuw geëxtrudeerd tot nieuwe producten
2. **Thermisch recyclen**: energieterugwinning door verbranding (minder wenselijk)

Steeds meer producenten bieden **terugnameprogramma's** aan. Het oude composiet wordt ingezameld en verwerkt tot nieuw materiaal.

**Let op**: niet alle composiet is even goed recyclebaar. Producten met veel verschillende additieven of coatings zijn lastiger te recyclen dan pure WPC-producten.`,
      },
      {
        heading: "Milieukeurmerken",
        content: `Zoek bij de aankoop van composiet naar deze keurmerken:

- **PEFC / FSC**: certificering van de gebruikte houtvezels
- **ISO 14001**: milieumanagementsysteem van de producent
- **EPD (Environmental Product Declaration)**: gedetailleerde milieu-impactverklaring
- **Cradle to Cradle**: beoordeling van circulariteit
- **TÜV-certificering**: onafhankelijke productkeuring

Premium producenten zoals Silvadec publiceren volledige EPD's en beschikken over meerdere milieucertificeringen.`,
      },
    ],
    faqs: [
      { q: "Is composiet milieuvriendelijk?", a: "Relatief ja. Composiet bevat gerecyclede grondstoffen, gaat lang mee (25-30 jaar) en is recyclebaar. Over de levensduur is de milieu-impact lager dan bij hout dat regelmatig geschilderd moet worden." },
      { q: "Kan composiet gerecycled worden?", a: "Ja, composiet kan mechanisch gerecycled worden door het te vermalen en opnieuw te extruderen. Steeds meer producenten bieden terugnameprogramma's aan." },
      { q: "Is composiet beter voor het milieu dan hout?", a: "Het hangt af van het type hout. Composiet is beter dan tropisch hardhout (geen ontbossing) en dan naaldhout (langere levensduur, geen verf/beits). Lokaal FSC-naaldhout heeft bij korte levensduur een lagere productie-impact." },
    ],
    internalLinks: [
      { label: "Wat is composiet?", href: "/wat-is-composiet" },
      { label: "Composiet recyclen", href: "/composiet-recyclen" },
      { label: "Composiet levensduur", href: "/composiet-levensduur" },
      { label: "Composiet samenstelling", href: "/composiet-samenstelling" },
      { label: "Bekijk ons assortiment", href: "/assortiment" },
    ],
  },

  // 3. Composiet vs kunststof
  {
    slug: "composiet-vs-kunststof",
    type: "cluster",
    parentSlug: "wat-is-composiet",
    title: "Composiet vs kunststof: wat is het verschil?",
    metaTitle: "Composiet vs Kunststof | Verschil & Vergelijking",
    metaDescription: "Wat is het verschil tussen composiet en kunststof? Vergelijking van samenstelling, uitstraling, prijs en duurzaamheid.",
    author: defaultAuthor,
    publishDate: "2026-01-12",
    updatedDate: "2026-02-22",
    readingTime: "5 min",
    schemaTypes: ["Article", "FAQPage"],
    intro: `**Composiet en kunststof** worden vaak door elkaar gehaald, maar het zijn verschillende materialen. Het belangrijkste verschil: composiet bevat 50-70% houtvezels, terwijl volledig kunststof (PVC, HDPE) geen houtvezels bevat. Dit verschil heeft grote gevolgen voor uitstraling, prijs en prestaties.`,
    sections: [
      {
        heading: "Samenstelling vergeleken",
        content: `| Component | Composiet (WPC) | Kunststof (PVC/HDPE) |
|-----------|----------------|---------------------|
| Houtvezels | 50-70% | 0% |
| Kunststof | 30-50% | 95-100% |
| Additieven | 3-8% | 0-5% |
| Gewicht | Zwaarder | Lichter |
| Uitstraling | Houtlook | Kunststof-achtig |

Composiet is dus een **hybride materiaal** — half hout, half kunststof. Volledig kunststof is precies dat: 100% synthetisch.`,
      },
      {
        heading: "Uitstraling en gevoel",
        content: `Dit is het grootste verschil en vaak de doorslaggevende factor:

- **Composiet**: warme houtlook met zichtbare nerfstructuur. Voelt bij aanraking meer als hout. De houtvezels geven het materiaal een natuurlijke warmte.
- **Kunststof**: gladder, uniformer oppervlak. Voelt als kunststof. Mist de warmte en textuur van hout.

Modern co-extrusie composiet is op afstand nauwelijks van echt hout te onderscheiden. Volledig kunststof blijft er "plastic" uitzien, ongeacht de oppervlaktebewerking.`,
      },
      {
        heading: "Prestaties vergeleken",
        content: `| Eigenschap | Composiet | Kunststof |
|-----------|----------|----------|
| Stijfheid | Hoog (door houtvezels) | Gemiddeld |
| Waterdicht | Zeer goed | Uitstekend |
| UV-bestendig | Goed (met stabilisatoren) | Gemiddeld (kan vergelen) |
| Krasbestendig | Goed (co-extrusie) | Matig |
| Brandklasse | B-s1, d0 (premium) | Wisselend |
| Temperatuurbestendig | Goed | Matig (kan vervormen) |
| Kleurvast | Zeer goed | Matig (vergelen bij PVC) |`,
      },
      {
        heading: "Welk materiaal past bij jou?",
        content: `**Kies composiet als je:**
- Een natuurlijke houtlook wilt
- Waarde hecht aan uitstraling
- Bereid bent iets meer te investeren
- Een duurzaam product zoekt

**Kies kunststof als je:**
- 100% waterbestendigheid nodig hebt
- Een lager budget hebt
- De uitstraling minder belangrijk vindt
- Maximaal lichtgewicht wilt`,
      },
    ],
    faqs: [
      { q: "Is composiet hetzelfde als kunststof?", a: "Nee. Composiet bevat 50-70% houtvezels en 30-50% kunststof. Volledig kunststof (PVC/HDPE) bevat geen houtvezels." },
      { q: "Wat is beter: composiet of kunststof?", a: "Composiet biedt een betere uitstraling (houtlook) en is stijver. Kunststof is 100% waterdicht en lichter. Voor terrassen, schuttingen en gevels is composiet de populairdere keuze vanwege de natuurlijke uitstraling." },
      { q: "Is composiet duurder dan kunststof?", a: "Composiet is gemiddeld 10-30% duurder dan vergelijkbare kunststof producten, maar de uitstraling en stijfheid zijn aanzienlijk beter." },
    ],
    internalLinks: [
      { label: "Wat is composiet?", href: "/wat-is-composiet" },
      { label: "Composiet samenstelling", href: "/composiet-samenstelling" },
      { label: "Kunststof schutting", href: "/kunststof-schutting" },
      { label: "Bekijk ons assortiment", href: "/assortiment" },
    ],
  },

  // 4. Composiet recyclen
  {
    slug: "composiet-recyclen",
    type: "cluster",
    parentSlug: "wat-is-composiet",
    title: "Composiet recyclen: kan het en hoe werkt het?",
    metaTitle: "Composiet Recyclen | Kan Het & Hoe Werkt Het?",
    metaDescription: "Kan composiet gerecycled worden? Ontdek hoe composiet recycling werkt, welke mogelijkheden er zijn en wat je kunt doen met oud composiet.",
    author: defaultAuthor,
    publishDate: "2026-01-14",
    updatedDate: "2026-02-22",
    readingTime: "5 min",
    schemaTypes: ["Article", "FAQPage"],
    intro: `Kan **composiet gerecycled** worden? Ja — en steeds meer producenten investeren in circulaire programma's. In dit artikel leggen we uit hoe composiet recycling werkt, welke opties je hebt met oud composiet en hoe de industrie steeds duurzamer wordt.`,
    sections: [
      {
        heading: "Hoe wordt composiet gerecycled?",
        content: `Het recyclingproces van composiet verloopt in stappen:

1. **Inzameling**: oud composiet wordt ingezameld via terugnameprogramma's of afvalverwerkers
2. **Sorteren**: het materiaal wordt gesorteerd op type (WPC, co-extrusie, massief)
3. **Vermalen**: het composiet wordt mechanisch vermalen tot kleine korrels of poeder
4. **Zuiveren**: metaaldeeltjes, schroeven en andere verontreinigingen worden verwijderd
5. **Herextruderen**: het vermalen materiaal wordt gemengd met verse grondstoffen en opnieuw geëxtrudeerd

### Kwaliteit van gerecycled composiet

Gerecycled composiet kan worden verwerkt tot:
- Nieuwe composiet planken (vaak in combinatie met vers materiaal)
- Tuinmeubelen
- Plantenbakken
- Straatmeubilair
- Geluidsschermen

De kwaliteit van 100% gerecycled composiet is iets lager dan van nieuw materiaal. Daarom wordt het meestal gemengd: 30-50% gerecycled + 50-70% vers materiaal.`,
      },
      {
        heading: "Wat doe je met oud composiet?",
        content: `Als je composiet vervangt of zaagrestanten overhoudt:

### Optie 1: Terugnameprogramma
Sommige producenten bieden terugname aan. Het composiet wordt opgehaald en gerecycled. Informeer bij de leverancier.

### Optie 2: Milieustraat
Composiet mag bij de milieustraat worden ingeleverd als **bouw- en sloopafval**. Het wordt verwerkt door gespecialiseerde recyclers.

### Optie 3: Hergebruik
Restanten kun je gebruiken voor:
- Plantenbakken of bloembakken
- Tuinranden of borderafscheidingen
- Compostbak ommanteling
- Vogel- of insectenhuisjes

### Wat je NIET moet doen
- ❌ Composiet verbranden (geeft schadelijke stoffen af)
- ❌ In het restafval gooien
- ❌ In de natuur dumpen`,
      },
      {
        heading: "De toekomst van composiet recycling",
        content: `De composietindustrie investeert in circulariteit:

- **Closed-loop systemen**: producenten nemen oud product terug en verwerken het tot nieuw
- **Hogere recycled-content**: premium producten bevatten nu al tot 95% gerecycled materiaal
- **Chemisch recyclen**: nieuwe technologie om houtvezels en kunststof volledig te scheiden voor hoogwaardig hergebruik
- **Productpaspoorten**: digitale tracking van materialen voor optimale recycling

De ambitie van de industrie is om tegen 2030 **100% circulair** te produceren. Dat wil zeggen: alle grondstoffen uit gerecyclede of hernieuwbare bronnen, en alle producten aan het einde van de levensduur volledig recyclebaar.`,
      },
    ],
    faqs: [
      { q: "Kan composiet gerecycled worden?", a: "Ja. Composiet wordt mechanisch vermalen en opnieuw geëxtrudeerd tot nieuwe producten. Steeds meer producenten bieden terugnameprogramma's aan." },
      { q: "Waar kan ik oud composiet inleveren?", a: "Bij de milieustraat als bouw- en sloopafval, of via een terugnameprogramma van de producent. Informeer bij je leverancier naar de mogelijkheden." },
      { q: "Hoeveel gerecycled materiaal zit er in nieuw composiet?", a: "Premium composiet bevat 60-95% gerecycled materiaal. Dit betreft zowel gerecycled houtafval als gerecycled kunststof (bijv. HDPE flessen)." },
    ],
    internalLinks: [
      { label: "Wat is composiet?", href: "/wat-is-composiet" },
      { label: "Composiet duurzaamheid & milieu", href: "/composiet-duurzaamheid-milieu" },
      { label: "Composiet samenstelling", href: "/composiet-samenstelling" },
      { label: "Composiet levensduur", href: "/composiet-levensduur" },
      { label: "Bekijk ons assortiment", href: "/assortiment" },
    ],
  },

  // 5. Composiet levensduur
  {
    slug: "composiet-levensduur",
    type: "cluster",
    parentSlug: "wat-is-composiet",
    title: "Composiet levensduur: hoe lang gaat het echt mee?",
    metaTitle: "Composiet Levensduur | Hoe Lang Gaat Het Mee?",
    metaDescription: "Hoe lang gaat composiet mee? Vergelijk de levensduur per type en toepassing. Met tips om de levensduur te maximaliseren.",
    author: defaultAuthor,
    publishDate: "2026-01-16",
    updatedDate: "2026-02-22",
    readingTime: "6 min",
    schemaTypes: ["Article", "FAQPage"],
    intro: `**Hoe lang gaat composiet mee?** Gemiddeld 25-30 jaar, maar de exacte levensduur hangt af van het type composiet, de toepassing en de montage. In dit artikel geven we een eerlijk overzicht per type en toepassing, inclusief tips om de levensduur te maximaliseren.`,
    sections: [
      {
        heading: "Levensduur per type composiet",
        content: `| Type | Verwachte levensduur | Garantie (typisch) |
|------|---------------------|-------------------|
| Mono-extrusie (hol profiel) | 20-25 jaar | 10-15 jaar |
| Mono-extrusie (massief) | 25-30 jaar | 15-20 jaar |
| Co-extrusie (hol profiel) | 25-30 jaar | 15-25 jaar |
| Co-extrusie (massief) | 30-35+ jaar | 20-25 jaar |

De **cap-laag** bij co-extrusie is de belangrijkste factor. Deze extra beschermlaag voorkomt vochtindringing, UV-degradatie en vlekken — precies de factoren die de levensduur verkorten.`,
      },
      {
        heading: "Levensduur per toepassing",
        content: `De toepassing beïnvloedt de belasting en daarmee de levensduur:

### Vlonderplanken / terras
- Levensduur: 25-30 jaar
- Belasting: gemiddeld (loopverkeer, meubels, weer)
- Kritische factor: UV-blootstelling en waterafvoer

### Schuttingen
- Levensduur: 25-30+ jaar
- Belasting: laag (alleen weer en wind)
- Kritische factor: windbelasting en fundering

### Gevelbekleding
- Levensduur: 30-35+ jaar
- Belasting: laag (alleen weer)
- Kritische factor: UV-blootstelling (met name zuidgevel)

Gevelbekleding gaat het langst mee omdat het geen mechanische belasting kent (geen loopverkeer).`,
      },
      {
        heading: "Factoren die de levensduur beïnvloeden",
        content: `### Positief
- Co-extrusie beschermlaag
- Correcte montage met expansieruimte
- Goede waterafvoer (bij vlonders)
- Regelmatige reiniging

### Negatief
- Constante blootstelling aan staand water
- Montage zonder expansieruimte (vervorming)
- Zware mechanische belasting (commercieel gebruik zonder massief profiel)
- Onjuist schoonmaken (hogedrukreiniger op korte afstand)`,
      },
      {
        heading: "Tips om de levensduur te maximaliseren",
        content: `1. **Kies co-extrusie**: de extra beschermlaag verlengt de levensduur met 5-10 jaar
2. **Monteer correct**: volg de montagehandleiding nauwkeurig, met name de expansieruimte
3. **Zorg voor waterafvoer**: bij vlonders moet water vrij kunnen wegstromen, geen plassen
4. **Reinig jaarlijks**: verwijder vuil, bladeren en groene aanslag met water en een zachte borstel
5. **Voorkom mechanische schade**: gebruik beschermviltjes onder meubels, geen scherpe voorwerpen slepen
6. **Gebruik aluminium onderconstructie**: gaat even lang mee als het composiet zelf`,
      },
    ],
    faqs: [
      { q: "Hoe lang gaat composiet mee?", a: "Gemiddeld 25-30 jaar. Co-extrusie composiet gaat 30-35+ jaar mee. De exacte levensduur hangt af van het type, de toepassing en de montage." },
      { q: "Gaat composiet langer mee dan hout?", a: "Ja. Composiet gaat 25-30+ jaar mee, terwijl naaldhout 8-15 jaar meegaat en hardhout 15-25 jaar (mits onderhouden). Composiet vereist bovendien geen onderhoud." },
      { q: "Wanneer moet ik composiet vervangen?", a: "Composiet hoeft pas vervangen te worden bij structurele schade (breuken, delaminatie) of als de uitstraling niet meer voldoet. Bij correct gebruik is dit na 25-35 jaar." },
    ],
    internalLinks: [
      { label: "Wat is composiet?", href: "/wat-is-composiet" },
      { label: "Composiet garantie", href: "/composiet-garantie" },
      { label: "Composiet duurzaamheid & milieu", href: "/composiet-duurzaamheid-milieu" },
      { label: "Co-extrusie vs composiet", href: "/co-extrusie-vs-composiet" },
      { label: "Composiet vlonder onderhoud", href: "/composiet-vlonder-onderhoud" },
      { label: "Bekijk ons assortiment", href: "/assortiment" },
    ],
  },

  // 6. Composiet garantie
  {
    slug: "composiet-garantie",
    type: "cluster",
    parentSlug: "wat-is-composiet",
    title: "Composiet garantie: wat wordt gedekt en wat niet?",
    metaTitle: "Composiet Garantie | Wat Wordt Gedekt? Uitleg 2026",
    metaDescription: "Wat dekt de garantie op composiet? Overzicht van garantievoorwaarden per type product. Inclusief tips bij garantieclaims.",
    author: defaultAuthor,
    publishDate: "2026-01-18",
    updatedDate: "2026-02-22",
    readingTime: "5 min",
    schemaTypes: ["Article", "FAQPage"],
    intro: `De **garantie op composiet** kan variëren van 10 tot 25 jaar, afhankelijk van de producent en het type product. Maar wat wordt er precies gedekt? En wat niet? In dit artikel leggen we alles uit over garantievoorwaarden, claims en wat je mag verwachten.`,
    sections: [
      {
        heading: "Garantietermijnen per producttype",
        content: `| Producttype | Structurele garantie | Kleurgarantie | Fabrieksgarantie |
|-------------|---------------------|---------------|-----------------|
| Mono-extrusie schutting | 10-15 jaar | 5-10 jaar | 15 jaar |
| Co-extrusie schutting | 15-20 jaar | 10-15 jaar | 25 jaar |
| Mono-extrusie vlonder | 10-15 jaar | 5-10 jaar | 15 jaar |
| Co-extrusie vlonder | 15-20 jaar | 10-15 jaar | 25 jaar |
| Gevelbekleding | 15-20 jaar | 10-15 jaar | 25 jaar |

**Structurele garantie**: dekt breuken, splijten, delaminatie en structureel falen.
**Kleurgarantie**: dekt extreme verkleuring buiten de gestelde normen.
**Fabrieksgarantie**: overkoepelende garantie van de producent op productiefouten.`,
      },
      {
        heading: "Wat wordt WEL gedekt?",
        content: `De garantie dekt typisch:

- **Structureel falen**: het materiaal breekt, splijt of delaminateert bij normaal gebruik
- **Extreme verkleuring**: de kleur wijzigt meer dan de opgegeven norm (meestal >5 ΔE na stabilisatie)
- **Rotting of schimmelvorming**: het materiaal rot of schimmelt ondanks dat het composiet is
- **Insectenvraat**: het materiaal wordt aangetast door insecten
- **Productiefouten**: zichtbare gebreken die het gevolg zijn van het productieproces`,
      },
      {
        heading: "Wat wordt NIET gedekt?",
        content: `De meeste garanties sluiten uit:

- **Mechanische schade**: deuken, krassen of breuken door impact (gevallen voorwerpen, ladders)
- **Onjuiste montage**: schade als gevolg van montage die afwijkt van de handleiding
- **Normale verkleuring**: een lichte kleurverandering in de eerste 8-12 weken is normaal en geen garantie-issue
- **Vlekken**: vlekken door vet, olie, barbecuerook of plantenpotten
- **Gebruik van verkeerde schoonmaakmiddelen**: schade door bleek, aceton of schurende middelen
- **Verwering**: normale slijtage door jarenlang gebruik
- **Commercieel gebruik**: bij sommige producenten geldt een kortere garantie voor commerciële toepassingen

**Tip**: bewaar altijd je aankoopbewijs en de montagehandleiding. Bij een garantieclaim moet je kunnen aantonen dat het product correct gemonteerd is.`,
      },
      {
        heading: "Garantieclaim indienen",
        content: `Bij een vermoeden van een productgebrek:

1. **Documenteer** het probleem met foto's (close-up + overzicht)
2. **Verzamel** je aankoopbewijs en montagegegevens
3. **Neem contact op** met de leverancier (niet de producent)
4. **Laat een inspectie uitvoeren** indien gevraagd
5. **Wacht op beoordeling** — de producent beoordeelt of het probleem onder de garantie valt

Bij een gegronde claim wordt meestal het defecte materiaal kosteloos vervangen. Montagekosten voor vervanging zijn meestal niet gedekt.`,
      },
    ],
    faqs: [
      { q: "Hoeveel jaar garantie heb ik op composiet?", a: "Dit varieert van 10 tot 25 jaar, afhankelijk van het type composiet en de producent. Co-extrusie producten hebben doorgaans de langste garantie (tot 25 jaar)." },
      { q: "Dekt de garantie verkleuring?", a: "Extreme verkleuring (meer dan de opgegeven norm) valt onder de kleurgarantie. Lichte kleurverandering in de eerste weken is normaal en wordt niet gedekt." },
      { q: "Wat als mijn composiet breekt?", a: "Structurele breuken bij normaal gebruik vallen onder de structurele garantie. Documenteer het probleem met foto's en neem contact op met je leverancier." },
    ],
    internalLinks: [
      { label: "Wat is composiet?", href: "/wat-is-composiet" },
      { label: "Composiet levensduur", href: "/composiet-levensduur" },
      { label: "Co-extrusie vs composiet", href: "/co-extrusie-vs-composiet" },
      { label: "Contact opnemen", href: "/contact" },
      { label: "Bekijk ons assortiment", href: "/assortiment" },
    ],
  },

  // 7. Co-extrusie vs composiet
  {
    slug: "co-extrusie-vs-composiet",
    type: "cluster",
    parentSlug: "wat-is-composiet",
    title: "Co-extrusie vs composiet: wat is het verschil?",
    metaTitle: "Co-extrusie vs Composiet | Verschil & Advies",
    metaDescription: "Wat is het verschil tussen co-extrusie en gewoon composiet? Vergelijking van kwaliteit, prijs, levensduur en garantie.",
    author: defaultAuthor,
    publishDate: "2026-01-20",
    updatedDate: "2026-02-22",
    readingTime: "6 min",
    schemaTypes: ["Article", "FAQPage"],
    intro: `**Co-extrusie** is een type composiet met een extra beschermende buitenlaag. Maar wat maakt dit verschil precies uit? In dit artikel vergelijken we co-extrusie met standaard (mono-extrusie) composiet op alle relevante punten: kwaliteit, prijs, levensduur en garantie.`,
    sections: [
      {
        heading: "Het verschil uitgelegd",
        content: `### Mono-extrusie (standaard composiet)
Het volledige profiel bestaat uit één uniforme laag composiet — dezelfde samenstelling door en door.

### Co-extrusie (premium composiet)
Het profiel heeft een **kern** van standaard composiet, omhuld door een **cap-laag** van puur kunststof (ASA of HDPE) met geconcentreerde UV-stabilisatoren.

Vergelijk het met een Mars-reep: de kern is het composiet, de chocoladecoating is de cap-laag. Die buitenlaag beschermt de kern tegen:
- UV-straling (verkleuring)
- Vlekken (vet, wijn, barbecue)
- Krassen
- Vochtindringing`,
      },
      {
        heading: "Vergelijking op een rij",
        content: `| Eigenschap | Mono-extrusie | Co-extrusie |
|-----------|--------------|-------------|
| Beschermlaag | Nee | Ja (ASA/HDPE cap) |
| Kleurvastheid | Goed | Uitstekend |
| Vlekbestendigheid | Matig | Zeer goed |
| Krasbestendigheid | Matig | Goed |
| Levensduur | 20-25 jaar | 25-35 jaar |
| Garantie | 10-15 jaar | 15-25 jaar |
| Prijs | €45-€65 per m² | €65-€110 per m² |
| Initiële verkleuring | Merkbaar (6-12 weken) | Minimaal (4-8 weken) |
| Onderhoud | Geen | Geen |

Het verschil zit vooral in de **lange termijn prestatie**. Na 5-10 jaar is het verschil in uitstraling duidelijk zichtbaar: co-extrusie behoudt zijn kleur en gladheid, terwijl mono-extrusie er "verweerder" uit kan gaan zien.`,
      },
      {
        heading: "Wanneer kies je co-extrusie?",
        content: `Co-extrusie is de betere keuze als:

- **Kleurvastheid belangrijk is**: je wilt dat de kleur jarenlang hetzelfde blijft
- **Vlekken een risico zijn**: nabij een barbecue, eethoek of bomen (bladval)
- **Je lang mee wilt doen**: 25-35+ jaar in plaats van 20-25 jaar
- **Je investeert in je woning**: voor maximale waardevermeerdering
- **Donkere kleuren**: bij zwart of antraciet is verkleuring sneller zichtbaar; co-extrusie minimaliseert dit

### Wanneer volstaat mono-extrusie?

Mono-extrusie is prima als:
- Budget een belangrijke factor is
- Het een minder zichtbare toepassing betreft (achterkant schutting)
- Je de patina-ontwikkeling niet erg vindt
- Het een tijdelijke situatie betreft (huurwoning)`,
      },
      {
        heading: "Prijsverschil en terugverdientijd",
        content: `Het prijsverschil tussen mono- en co-extrusie bedraagt circa **30-50%**:

- Mono-extrusie vlonder: €49-€65 per m²
- Co-extrusie vlonder: €69-€89 per m²

**Meerprijs voor 20 m² terras**: circa €400-€480

**Wat krijg je ervoor terug?**
- 5-10 jaar extra levensduur
- 10 jaar langere garantie
- Betere kleur- en vlekbestendigheid
- Hogere woningwaarde

Per jaar extra levensduur kost de meerprijs slechts **€40-€96**. Dat maakt co-extrusie een slimme investering.`,
      },
    ],
    faqs: [
      { q: "Is co-extrusie beter dan gewoon composiet?", a: "Ja, co-extrusie biedt betere bescherming tegen verkleuring, vlekken en krassen dankzij de extra buitenlaag. De levensduur is 5-10 jaar langer en de garantie substantieel beter." },
      { q: "Hoeveel duurder is co-extrusie?", a: "Co-extrusie is circa 30-50% duurder in aanschaf. Per extra jaar levensduur kost dit slechts €40-€96, wat het een goede investering maakt." },
      { q: "Kan ik co-extrusie herkennen?", a: "Ja. Co-extrusie planken hebben een gladder, uniformer oppervlak met een subtiele glans. De cap-laag is soms als een dun randje zichtbaar op de kopse kant van de plank." },
    ],
    internalLinks: [
      { label: "Wat is composiet?", href: "/wat-is-composiet" },
      { label: "Composiet samenstelling", href: "/composiet-samenstelling" },
      { label: "Composiet levensduur", href: "/composiet-levensduur" },
      { label: "Co-extrusie vlonderplanken", href: "/co-extrusie-vlonderplanken" },
      { label: "Composiet garantie", href: "/composiet-garantie" },
      { label: "Bekijk ons assortiment", href: "/assortiment" },
    ],
  },
];

// ── ALL MATERIAAL PAGES ─────────────────────────────────────────────────────
export const allMateriaalSEOPages: SEOPage[] = [
  materiaalPillarPage,
  ...materiaalClusterPages,
];
