export type Tone = 'bruin' | 'grijs' | 'zwart' | 'wit' | 'eiken';
export type Durability = 'standaard' | 'premium' | 'co-extrusie';
export type ProductType = 'plank' | 'paneel' | 'profiel';
export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-az' | 'name-za';

export interface Product {
  id: string;
  name: string;
  price: number;
  priceLabel: string;
  image: string;
  category: 'gevelbekleding' | 'schuttingen' | 'vlonderplanken';
  features: string[];
  guarantee: string;
  slug: string;
  tone: Tone;
  durability: Durability;
  productType: ProductType;
  description: string;
  seoTitle: string;
  seoDescription: string;
  longDescription: string;
  specifications: Record<string, string>;
  images: string[];
  deliveryTime: string;
  highlights: string[];
  dimensions?: {
    length?: string;
    width?: string;
    thickness?: string;
    coverage?: string;
  };
  options?: { label: string; values: string[] }[];
  videoUrl?: string;
  faq?: { question: string; answer: string }[];
  updatedDate?: string;
}

export const toneLabels: Record<Tone, string> = {
  bruin: 'Bruin',
  grijs: 'Grijs',
  zwart: 'Zwart',
  wit: 'Wit',
  eiken: 'Eiken',
};

export const durabilityLabels: Record<Durability, string> = {
  standaard: 'Standaard (Mono-extrusie)',
  premium: 'Premium',
  'co-extrusie': 'Co-extrusie (beschermlaag)',
};

export const productTypeLabels: Record<ProductType, string> = {
  plank: 'Plank / Paneel',
  paneel: 'Compleet Scherm',
  profiel: 'Profiel / Onderdeel',
};

export const products: Product[] = [
  // ─── GEVELBEKLEDING (Cladding) ──────────────────────────────────
  {
    id: 'cl-1',
    updatedDate: '2026-02-20',
    name: 'Atmosphere 175 Wit Ceruse',
    price: 34.95,
    priceLabel: '€34,95 per stuk',
    image: 'https://en.silvadec.com/sites/default/files/styles/square/public/2022-01/Blanc_ceruse_1.jpg?itok=eUHNFBBV',
    category: 'gevelbekleding',
    features: ['Co-extrusie beschermlaag', 'Geborsteld oppervlak', '25 jaar garantie'],
    guarantee: '25 jaar fabrieksgarantie',
    slug: 'atmosphere-175-wit-ceruse',
    tone: 'wit',
    durability: 'co-extrusie',
    productType: 'plank',
    description: 'Elegante witte gevelbekleding met ceruse-afwerking. De Atmosphere 175 combineert een lichte, frisse uitstraling met de duurzaamheid van co-extrusie composiet.',
    seoTitle: 'Atmosphere 175 Wit Ceruse | Composiet Gevelbekleding',
    seoDescription: 'Witte composiet gevelbekleding Atmosphere 175 Ceruse. Co-extrusie beschermlaag, geborsteld, 25 jaar garantie. Bestel bij SchuttingenvanComposiet.nl.',
    longDescription: `## Atmosphere 175 Wit Ceruse Gevelbekleding

Geef uw woning een frisse, eigentijdse uitstraling met de Atmosphere 175 in Wit Ceruse. Deze composiet gevelbekleding combineert de warme textuur van geborsteld hout met de duurzaamheid van co-extrusie technologie.

### Co-extrusie beschermlaag

De gevorderde co-extrusie technologie omhult elke plank met een beschermende polymeerlaag. Dit garandeert:
- **0% vochtopname** — geen zwelling of krimp
- **Maximale UV-bestendigheid** — de witte kleur blijft jarenlang stralend
- **Vlekbestendigheid** — eenvoudig schoon te maken

### Duurzaam en milieuvriendelijk

Onze producten bestaan uit meer dan 95% gerecyclede materialen. Het productieproces is CO₂-neutraal en er ontstaat geen afval. De planken zijn aan het einde van hun levensduur volledig recycleerbaar.

### Montage

De Atmosphere 175 planken zijn eenvoudig te monteren op een aluminium of houten regelwerk. Zowel horizontale als verticale montage is mogelijk. De brede plank van 175 mm zorgt voor een modern, strak gevelbeeld met minder naden.

### Voordelen

- Stralend witte ceruse-afwerking
- 175 mm breed voor een ruim, modern gevoel
- Co-extrusie beschermlaag voor maximale duurzaamheid
- 25 jaar fabrieksgarantie
- Onderhoudsvrij — nooit meer schilderen
- Geschikt voor elk klimaat`,
    specifications: { Lengte: '360 cm', Breedte: '17,5 cm', Dikte: '2,1 cm', Materiaal: 'Composiet met co-extrusie toplaag', Kleur: 'Wit Ceruse', Afwerking: 'Geborsteld' },
    images: [
      'https://en.silvadec.com/sites/default/files/styles/square/public/2022-01/Blanc_ceruse_1.jpg?itok=eUHNFBBV',
      'https://en.silvadec.com/sites/default/files/styles/square/public/2022-01/Blanc_ceruse_2-001.jpg?itok=YgsC0UAa',
    ],
    deliveryTime: '5-8 werkdagen',
    highlights: ['Witte ceruse-afwerking', 'Co-extrusie beschermlaag', '175 mm breed', '25 jaar garantie', 'Onderhoudsvrij'],
    dimensions: { length: '360 cm', width: '17,5 cm', thickness: '2,1 cm' },
    faq: [
      { question: 'Vergeelt de witte kleur na verloop van tijd?', answer: 'Nee, dankzij de co-extrusie beschermlaag is de witte kleur maximaal UV-bestendig. Kleurvastheid is gegarandeerd gedurende 25 jaar.' },
      { question: 'Is witte gevelbekleding moeilijker schoon te houden?', answer: 'Nee, de co-extrusie laag maakt het oppervlak vlekbestendig. Vuil hecht nauwelijks en is eenvoudig te verwijderen met water en een zachte borstel.' },
      { question: 'Kan ik de planken zowel horizontaal als verticaal monteren?', answer: 'Ja, de Atmosphere 175 is geschikt voor zowel horizontale als verticale montage op een regelwerk.' },
    ],
  },
  {
    id: 'cl-2',
    updatedDate: '2026-02-20',
    name: 'Atmosphere 175 Zonnig Bruin',
    price: 34.95,
    priceLabel: '€34,95 per stuk',
    image: 'https://en.silvadec.com/sites/default/files/styles/square/public/2022-01/Brun_soleil_2.jpg?itok=b6kdMuxY',
    category: 'gevelbekleding',
    features: ['Co-extrusie beschermlaag', 'Geborsteld oppervlak', '25 jaar garantie'],
    guarantee: '25 jaar fabrieksgarantie',
    slug: 'atmosphere-175-zonnig-bruin',
    tone: 'bruin',
    durability: 'co-extrusie',
    productType: 'plank',
    description: 'Warme bruine gevelbekleding met zonverbrande houtlook. De Atmosphere 175 Zonnig Bruin biedt een natuurlijke, mediterrane uitstraling.',
    seoTitle: 'Atmosphere 175 Zonnig Bruin | Composiet Gevelbekleding',
    seoDescription: 'Composiet gevelbekleding Atmosphere 175 Zonnig Bruin. Warme houtlook, co-extrusie, 25 jaar garantie. Bestel bij SchuttingenvanComposiet.nl.',
    longDescription: `## Atmosphere 175 Zonnig Bruin

Breng de warmte van het zuiden naar uw gevel met de Atmosphere 175 in Zonnig Bruin. Deze composiet gevelbekleding heeft een prachtige, warme bruine tint die doet denken aan zongebleekt hout.

### Natuurlijke uitstraling

Het geborstelde oppervlak geeft een authentieke houtstructuur die nauwelijks van echt hout te onderscheiden is. De warme bruine tint past perfect bij zowel moderne als landelijke architectuur.

### Co-extrusie technologie

Elke plank is omhuld met een beschermende co-extrusie laag die zorgt voor:
- Maximale kleurvastheid
- 0% vochtopname
- Bescherming tegen krassen en vlekken

### Specificaties

De brede plank van 175 mm zorgt voor een eigentijds gevelbeeld. Met een lengte van 360 cm zijn er minder kopse naden nodig, wat het eindresultaat nog strakker maakt.`,
    specifications: { Lengte: '360 cm', Breedte: '17,5 cm', Dikte: '2,1 cm', Materiaal: 'Composiet met co-extrusie toplaag', Kleur: 'Zonnig Bruin', Afwerking: 'Geborsteld' },
    images: [
      'https://en.silvadec.com/sites/default/files/styles/square/public/2022-01/Brun_soleil_2.jpg?itok=b6kdMuxY',
    ],
    deliveryTime: '5-8 werkdagen',
    highlights: ['Warme zonnige bruintint', 'Co-extrusie beschermlaag', '175 mm breed', '25 jaar garantie'],
    dimensions: { length: '360 cm', width: '17,5 cm', thickness: '2,1 cm' },
    faq: [
      { question: 'Past Zonnig Bruin bij een moderne woning?', answer: 'Absoluut. De warme bruintint combineert prachtig met strakke architectuur, aluminium kozijnen en donkere accenten.' },
      { question: 'Wat is het verschil met Donker Bruin?', answer: 'Zonnig Bruin is lichter en warmer van tint, vergelijkbaar met zongebleekt hout. Donker Bruin is een diepere, rijkere tint.' },
    ],
  },
  {
    id: 'cl-3',
    updatedDate: '2026-02-20',
    name: 'Atmosphere 175 Donker Bruin',
    price: 34.95,
    priceLabel: '€34,95 per stuk',
    image: 'https://en.silvadec.com/sites/default/files/styles/square/public/2022-01/Brun_Rio_1.jpg?itok=dVrQk1gw',
    category: 'gevelbekleding',
    features: ['Co-extrusie beschermlaag', 'Geborsteld oppervlak', '25 jaar garantie'],
    guarantee: '25 jaar fabrieksgarantie',
    slug: 'atmosphere-175-donker-bruin',
    tone: 'bruin',
    durability: 'co-extrusie',
    productType: 'plank',
    description: 'Diepe, rijke bruine gevelbekleding met de luxe uitstraling van tropisch hardhout. De Atmosphere 175 Donker Bruin is tijdloos en elegant.',
    seoTitle: 'Atmosphere 175 Donker Bruin | Composiet Gevelbekleding',
    seoDescription: 'Composiet gevelbekleding Atmosphere 175 Donker Bruin. Luxe houtlook, co-extrusie, 25 jaar garantie. Bestel bij SchuttingenvanComposiet.nl.',
    longDescription: `## Atmosphere 175 Donker Bruin

De Atmosphere 175 Donker Bruin biedt de rijke, diepe kleur van tropisch hardhout zonder het onderhoud. Deze gevelbekleding geeft uw woning een tijdloze, luxueuze uitstraling.

### Rijke houtlook

De donkerbruine tint met geborstelde afwerking is nauwelijks te onderscheiden van echt hardhout. De kleur is diep en warm, perfect voor een klassieke of moderne gevel.

### Duurzaam zonder onderhoud

Dankzij de co-extrusie technologie hoeft u nooit meer te schilderen of te beitsen. De plank is volledig bestand tegen weer, wind en UV-straling.`,
    specifications: { Lengte: '360 cm', Breedte: '17,5 cm', Dikte: '2,1 cm', Materiaal: 'Composiet met co-extrusie toplaag', Kleur: 'Donker Bruin', Afwerking: 'Geborsteld' },
    images: [
      'https://en.silvadec.com/sites/default/files/styles/square/public/2022-01/Brun_Rio_1.jpg?itok=dVrQk1gw',
      'https://en.silvadec.com/sites/default/files/styles/square/public/2022-01/product%20varation%20image%20ou%20side%20image%20sibarlam2101%20sibarlam2121%20.png?itok=P5hqv44z',
    ],
    deliveryTime: '5-8 werkdagen',
    highlights: ['Diepe donkerbruine tint', 'Hardhout-look', 'Co-extrusie beschermlaag', '25 jaar garantie'],
    dimensions: { length: '360 cm', width: '17,5 cm', thickness: '2,1 cm' },
    faq: [
      { question: 'Wordt de donkere kleur warm in de zon?', answer: 'Donkere kleuren absorberen meer warmte, maar de co-extrusie laag voorkomt vervorming. Voor gevelbekleding is dit geen probleem aangezien er geen direct contact is.' },
      { question: 'Hoe onderhoud ik donkere gevelbekleding?', answer: 'Reinig eenvoudig met water en een zachte borstel. De co-extrusie laag maakt het oppervlak vlekbestendig.' },
    ],
  },
  {
    id: 'cl-4',
    updatedDate: '2026-02-20',
    name: 'Open Rhombus Licht Bruin',
    price: 29.95,
    priceLabel: '€29,95 per stuk',
    image: 'https://en.silvadec.com/sites/default/files/styles/square/public/2021-03/SIBARLAM1305L3%2C6_A_%283%29.JPG?itok=ih1F056c',
    category: 'gevelbekleding',
    features: ['Co-extrusie beschermlaag', 'Open rhombus profiel', '25 jaar garantie'],
    guarantee: '25 jaar fabrieksgarantie',
    slug: 'open-rhombus-licht-bruin',
    tone: 'bruin',
    durability: 'co-extrusie',
    productType: 'profiel',
    description: 'Open rhombus gevelbekleding in licht bruin. Het open profiel zorgt voor natuurlijke ventilatie en een speels licht-schaduwspel op de gevel.',
    seoTitle: 'Open Rhombus Licht Bruin | Composiet Gevelbekleding',
    seoDescription: 'Open Rhombus gevelbekleding Licht Bruin. Open profiel, co-extrusie, 25 jaar garantie. Bestel bij SchuttingenvanComposiet.nl.',
    longDescription: `## Open Rhombus Licht Bruin

De Open Rhombus gevelbekleding in Licht Bruin creëert een uniek gevelbeeld met een dynamisch licht-schaduwspel. Het open profiel zorgt voor natuurlijke ventilatie achter de planken.

### Open rhombus profiel

Het kenmerkende rhombus-profiel met open naden geeft de gevel diepte en karakter. De schuine plaatsing van de planken zorgt voor:
- Natuurlijke ventilatie
- Regenwering ondanks de openingen
- Een modern, architectonisch ontwerp

### Lichte bruintint

De lichtbruine kleur past bij vrijwel elke bouwstijl en omgeving. Van moderne nieuwbouw tot renovatie van bestaande woningen.`,
    specifications: { Lengte: '360 cm', Breedte: '7,2 cm', Dikte: '2,6 cm', Materiaal: 'Composiet met co-extrusie toplaag', Kleur: 'Licht Bruin', Profiel: 'Open Rhombus' },
    images: [
      'https://en.silvadec.com/sites/default/files/styles/square/public/2021-03/SIBARLAM1305L3%2C6_A_%283%29.JPG?itok=ih1F056c',
    ],
    deliveryTime: '5-8 werkdagen',
    highlights: ['Open rhombus profiel', 'Natuurlijke ventilatie', 'Licht bruin', 'Co-extrusie beschermlaag'],
    dimensions: { length: '360 cm', width: '7,2 cm', thickness: '2,6 cm' },
    faq: [
      { question: 'Is het open profiel waterdicht?', answer: 'Het open rhombus profiel is ontworpen als regenscherm. De schuine plaatsing leidt water af. Achter de planken moet een waterkerende folie worden aangebracht.' },
      { question: 'Hoeveel planken heb ik nodig per m²?', answer: 'Door het open profiel en de smalle breedte van 72 mm heeft u meer planken nodig dan bij gesloten gevelbekleding. Reken op circa 12-14 planken per m².' },
    ],
  },
  {
    id: 'cl-5',
    updatedDate: '2026-02-20',
    name: 'Open Rhombus Donker Bruin',
    price: 29.95,
    priceLabel: '€29,95 per stuk',
    image: 'https://en.silvadec.com/sites/default/files/styles/square/public/2023-11/SIBARLAM1303L3%2C6_P%20%281%29.jpg?itok=nlL1yJg2',
    category: 'gevelbekleding',
    features: ['Co-extrusie beschermlaag', 'Open rhombus profiel', '25 jaar garantie'],
    guarantee: '25 jaar fabrieksgarantie',
    slug: 'open-rhombus-donker-bruin',
    tone: 'bruin',
    durability: 'co-extrusie',
    productType: 'profiel',
    description: 'Open rhombus gevelbekleding in donker bruin. De diepe kleur combineert prachtig met het open profiel voor een krachtige, moderne gevel.',
    seoTitle: 'Open Rhombus Donker Bruin | Composiet Gevelbekleding',
    seoDescription: 'Open Rhombus gevelbekleding Donker Bruin. Open profiel, co-extrusie, 25 jaar garantie. Bestel bij SchuttingenvanComposiet.nl.',
    longDescription: `## Open Rhombus Donker Bruin

De donkerbruine variant van de Open Rhombus gevelbekleding biedt een krachtige, luxueuze geveloplossing. Het contrast tussen de donkere planken en de lichtinval door de openingen creëert een bijzonder architectonisch effect.

### Krachtig en elegant

De diepe bruine kleur geeft de gevel uitstraling en karakter. Het open rhombus profiel voegt dynamiek toe met zijn licht-schaduwspel.

### Ventilatie en bescherming

Het open profiel zorgt voor natuurlijke achterventilatie, wat condensvorming voorkomt en de levensduur van de onderconstructie verlengt.`,
    specifications: { Lengte: '360 cm', Breedte: '7,2 cm', Dikte: '2,6 cm', Materiaal: 'Composiet met co-extrusie toplaag', Kleur: 'Donker Bruin', Profiel: 'Open Rhombus' },
    images: [
      'https://en.silvadec.com/sites/default/files/styles/square/public/2023-11/SIBARLAM1303L3%2C6_P%20%281%29.jpg?itok=nlL1yJg2',
      'https://en.silvadec.com/sites/default/files/styles/square/public/2022-01/CVBF_ST_ANDEOL_LE_CHATEAU_%2840%29.JPG?itok=Xn2fRZFT',
    ],
    deliveryTime: '5-8 werkdagen',
    highlights: ['Open rhombus profiel', 'Donker bruin', 'Luxe uitstraling', 'Co-extrusie beschermlaag'],
    dimensions: { length: '360 cm', width: '7,2 cm', thickness: '2,6 cm' },
    faq: [
      { question: 'Kan ik open rhombus combineren met gesloten gevelbekleding?', answer: 'Ja, veel architecten combineren open rhombus met de Atmosphere 175 planken voor een afwisselend gevelbeeld.' },
    ],
  },
  {
    id: 'cl-6',
    updatedDate: '2026-02-20',
    name: 'Open Rhombus Antraciet Grijs',
    price: 29.95,
    priceLabel: '€29,95 per stuk',
    image: 'https://en.silvadec.com/sites/default/files/styles/square/public/2025-06/silvadec_atmopshere_SIBARLAM1301%20%284%29.jpg?itok=y1NneV3N',
    category: 'gevelbekleding',
    features: ['Co-extrusie beschermlaag', 'Open rhombus profiel', '25 jaar garantie'],
    guarantee: '25 jaar fabrieksgarantie',
    slug: 'open-rhombus-antraciet-grijs',
    tone: 'grijs',
    durability: 'co-extrusie',
    productType: 'profiel',
    description: 'Open rhombus gevelbekleding in antraciet grijs. De populairste kleur voor moderne architectuur, gecombineerd met het kenmerkende open profiel.',
    seoTitle: 'Open Rhombus Antraciet Grijs | Composiet Gevelbekleding',
    seoDescription: 'Open Rhombus gevelbekleding Antraciet Grijs. Open profiel, co-extrusie, 25 jaar garantie. Bestel bij SchuttingenvanComposiet.nl.',
    longDescription: `## Open Rhombus Antraciet Grijs

De antraciet grijze variant van de Open Rhombus is de populairste keuze voor moderne architectuur. De strakke grijze tint in combinatie met het open profiel geeft een eigentijds, architectonisch gevelbeeld.

### Modern en tijdloos

Antraciet grijs is dé kleur voor hedendaagse architectuur. Het combineert moeiteloos met aluminium, glas en beton. Het open rhombus profiel voegt textuur en diepte toe.

### Duurzaam en onderhoudsvrij

Net als alle composiet producten is deze gevelbekleding voorzien van een co-extrusie beschermlaag. U geniet 25 jaar van een perfect gevelbeeld zonder onderhoud.`,
    specifications: { Lengte: '360 cm', Breedte: '7,2 cm', Dikte: '2,6 cm', Materiaal: 'Composiet met co-extrusie toplaag', Kleur: 'Antraciet Grijs', Profiel: 'Open Rhombus' },
    images: [
      'https://en.silvadec.com/sites/default/files/styles/square/public/2025-06/silvadec_atmopshere_SIBARLAM1301%20%284%29.jpg?itok=y1NneV3N',
      'https://en.silvadec.com/sites/default/files/styles/square/public/2021-03/SIBARLAM1301L3%2C6_A.jpg?itok=-rexgs_K',
    ],
    deliveryTime: '5-8 werkdagen',
    highlights: ['Antraciet grijs', 'Open rhombus profiel', 'Populairste kleur', 'Co-extrusie beschermlaag'],
    dimensions: { length: '360 cm', width: '7,2 cm', thickness: '2,6 cm' },
    faq: [
      { question: 'Past antraciet grijs bij elke woning?', answer: 'Antraciet grijs is een veelzijdige kleur die past bij vrijwel elke bouwstijl. Het combineert goed met zowel lichte als donkere materialen.' },
    ],
  },

  // ─── SCHUTTINGEN (Fencing) ──────────────────────────────────────
  {
    id: 'sc-1',
    updatedDate: '2026-02-20',
    name: 'Atmosphere Schutting Antraciet Grijs',
    price: 32.95,
    priceLabel: '€32,95 per plank',
    image: 'https://en.silvadec.com/sites/default/files/styles/square/public/2024-01/silvadec_aluminium_C0039%20%281%29.png?itok=53TGCyiu',
    category: 'schuttingen',
    features: ['Co-extrusie beschermlaag', 'Dubbelzijdig: glad & reliëf', '25 jaar garantie'],
    guarantee: '25 jaar fabrieksgarantie',
    slug: 'atmosphere-schutting-antraciet-grijs',
    tone: 'grijs',
    durability: 'co-extrusie',
    productType: 'plank',
    description: 'Composiet schuttingplank in antraciet grijs met dubbelzijdige afwerking: één gladde en één gestructureerde zijde. De populairste kleur voor moderne tuinen.',
    seoTitle: 'Schutting Antraciet Grijs | Composiet Schuttingplank',
    seoDescription: 'Atmosphere composiet schuttingplank Antraciet Grijs. Dubbelzijdig, co-extrusie, 25 jaar garantie. Bestel bij SchuttingenvanComposiet.nl.',
    longDescription: `## Atmosphere Schutting Antraciet Grijs

De Atmosphere schuttingplank in Antraciet Grijs is de meest gekozen kleur voor moderne tuinafscheidingen. Dankzij de dubbelzijdige afwerking — één gladde zijde en één gestructureerde zijde — kunt u zelf kiezen welke kant u naar buiten richt.

### Dubbelzijdig design

Elke plank heeft twee verschillende afwerkingen:
- **Gladde zijde** — strak en modern
- **Reliëf zijde** — natuurlijke houtstructuur

U kiest zelf welke zijde zichtbaar is, of combineer beide voor een uniek ontwerp.

### Co-extrusie beschermlaag

De gevorderde co-extrusie technologie beschermt elke plank tegen:
- UV-straling en verkleuring
- Vochtopname (0%)
- Krassen en vlekken
- Schimmel en algen

### Eenvoudige montage

De planken schuiven eenvoudig in de aluminium paalprofielen. Geen schroeven, geen boren — gewoon inschuiven en klaar.

### 25 jaar fabrieksgarantie

25 jaar garantie op kleurvastheid en structurele integriteit. Een investering voor het leven.`,
    specifications: { Lengte: '180 cm', Breedte: '17,6 cm', Dikte: '2,1 cm', Materiaal: 'Composiet met co-extrusie toplaag', Kleur: 'Antraciet Grijs', Afwerking: 'Dubbelzijdig: glad & reliëf' },
    images: [
      'https://en.silvadec.com/sites/default/files/styles/square/public/2024-01/silvadec_aluminium_C0039%20%281%29.png?itok=53TGCyiu',
    ],
    deliveryTime: '5-8 werkdagen',
    highlights: ['Antraciet grijs', 'Dubbelzijdig design', 'Co-extrusie beschermlaag', '25 jaar garantie', 'Eenvoudige montage'],
    dimensions: { length: '180 cm', width: '17,6 cm', thickness: '2,1 cm' },
    faq: [
      { question: 'Hoeveel planken heb ik nodig per strekkende meter schutting?', answer: 'Bij een standaard schuttinghoogte van 180 cm heeft u ongeveer 10 planken per sectie nodig (17,6 cm breed per plank).' },
      { question: 'Welke palen gebruik ik?', answer: 'Er zijn bijpassende aluminium paalprofielen waarin de planken eenvoudig inschuiven. Deze palen zijn verkrijgbaar in dezelfde kleuren.' },
      { question: 'Kan ik de schutting zelf plaatsen?', answer: 'Ja, de schutting is ontworpen voor doe-het-zelf montage. Planken schuiven in de aluminium palen — geen speciaal gereedschap nodig.' },
    ],
  },
  {
    id: 'sc-2',
    updatedDate: '2026-02-20',
    name: 'Atmosphere Schutting Licht Grijs',
    price: 32.95,
    priceLabel: '€32,95 per plank',
    image: 'https://en.silvadec.com/sites/default/files/styles/square/public/2021-02/accessoires_claustra_decor_3d_decor_2_lame_gris_clair_mineral_gris_anthra_sable_HD.jpg?itok=NaiaPtfA',
    category: 'schuttingen',
    features: ['Co-extrusie beschermlaag', 'Dubbelzijdig: glad & reliëf', '25 jaar garantie'],
    guarantee: '25 jaar fabrieksgarantie',
    slug: 'atmosphere-schutting-licht-grijs',
    tone: 'grijs',
    durability: 'co-extrusie',
    productType: 'plank',
    description: 'Composiet schuttingplank in licht grijs. Een lichte, frisse kleur die de tuin optisch vergroot en mooi combineert met groen.',
    seoTitle: 'Schutting Licht Grijs | Composiet Schuttingplank',
    seoDescription: 'Atmosphere composiet schuttingplank Licht Grijs. Dubbelzijdig, co-extrusie, 25 jaar garantie. Bestel bij SchuttingenvanComposiet.nl.',
    longDescription: `## Atmosphere Schutting Licht Grijs

De lichtgrijze variant van de Atmosphere schuttingplank biedt een frisse, moderne uitstraling. De lichte kleur maakt de tuin optisch groter en combineert prachtig met groen en bloemen.

### Ruimtelijk effect

Licht grijs reflecteert meer licht dan donkere kleuren, waardoor uw tuin groter en lichter aanvoelt. Ideaal voor kleinere tuinen of schaduwrijke plekken.

### Dubbelzijdig en veelzijdig

Net als alle Atmosphere schuttingplanken heeft deze plank twee afwerkingen: glad en gestructureerd. U bepaalt zelf het eindresultaat.`,
    specifications: { Lengte: '180 cm', Breedte: '17,6 cm', Dikte: '2,1 cm', Materiaal: 'Composiet met co-extrusie toplaag', Kleur: 'Licht Grijs', Afwerking: 'Dubbelzijdig: glad & reliëf' },
    images: [
      'https://en.silvadec.com/sites/default/files/styles/square/public/2021-02/accessoires_claustra_decor_3d_decor_2_lame_gris_clair_mineral_gris_anthra_sable_HD.jpg?itok=NaiaPtfA',
    ],
    deliveryTime: '5-8 werkdagen',
    highlights: ['Licht grijs', 'Ruimtelijk effect', 'Dubbelzijdig design', 'Co-extrusie beschermlaag'],
    dimensions: { length: '180 cm', width: '17,6 cm', thickness: '2,1 cm' },
    faq: [
      { question: 'Wordt licht grijs snel vies?', answer: 'Nee, dankzij de co-extrusie beschermlaag hecht vuil nauwelijks aan het oppervlak. Een jaarlijkse reiniging met water is voldoende.' },
    ],
  },
  {
    id: 'sc-3',
    updatedDate: '2026-02-20',
    name: 'Atmosphere Schutting Wild Grijs',
    price: 34.95,
    priceLabel: '€34,95 per plank',
    image: 'https://en.silvadec.com/sites/default/files/styles/square/public/2024-05/silvadec_atmosphere_b0041_c0141-compressed_7.jpg?itok=vZvJ8zUk',
    category: 'schuttingen',
    features: ['Co-extrusie beschermlaag', 'Gegroefde & gladde zijde', '25 jaar garantie'],
    guarantee: '25 jaar fabrieksgarantie',
    slug: 'atmosphere-schutting-wild-grijs',
    tone: 'grijs',
    durability: 'co-extrusie',
    productType: 'plank',
    description: 'Composiet schuttingplank in wild grijs met een expressieve, natuurlijke houtnerf. Een gewaagde keuze voor tuinen met karakter.',
    seoTitle: 'Schutting Wild Grijs | Composiet Schuttingplank',
    seoDescription: 'Atmosphere composiet schuttingplank Wild Grijs. Expressieve houtnerf, co-extrusie, 25 jaar garantie. Bestel bij SchuttingenvanComposiet.nl.',
    longDescription: `## Atmosphere Schutting Wild Grijs

De Wild Grijs variant is de nieuwste toevoeging aan het schuttingassortiment. Met een expressieve, natuurlijke houtnerf en een levendige grijze tint is deze plank perfect voor tuinen met karakter.

### Levendig en natuurlijk

De "wild" afwerking geeft elke plank een unieke, natuurlijke uitstraling. Geen twee planken zijn precies hetzelfde, wat een authentiek houteffect creëert.

### Dubbelzijdig

Eén zijde heeft een gegroefde afwerking, de andere een gladde. Combineer naar wens voor een persoonlijk tuinontwerp.`,
    specifications: { Lengte: '180 cm', Breedte: '17,6 cm', Dikte: '2,1 cm', Materiaal: 'Composiet met co-extrusie toplaag', Kleur: 'Wild Grijs', Afwerking: 'Dubbelzijdig: gegroefde & glad' },
    images: [
      'https://en.silvadec.com/sites/default/files/styles/square/public/2024-05/silvadec_atmosphere_b0041_c0141-compressed_7.jpg?itok=vZvJ8zUk',
    ],
    deliveryTime: '5-8 werkdagen',
    highlights: ['Wild grijs', 'Expressieve houtnerf', 'Unieke look', 'Co-extrusie beschermlaag'],
    dimensions: { length: '180 cm', width: '17,6 cm', thickness: '2,1 cm' },
    faq: [
      { question: 'Wat maakt Wild Grijs anders dan gewoon grijs?', answer: 'Wild Grijs heeft een meer gevarieerde, levendige kleur met zichtbare nerf- en kleurvariaties. Het is een expressiever alternatief voor de uniforme grijstinten.' },
    ],
  },
  {
    id: 'sc-4',
    updatedDate: '2026-02-20',
    name: 'Atmosphere Schutting Zonnig Bruin',
    price: 34.95,
    priceLabel: '€34,95 per plank',
    image: 'https://en.silvadec.com/sites/default/files/styles/square/public/2024-02/silvadec_atmosphere_B0040_13.jpg?itok=v_iEy2r1',
    category: 'schuttingen',
    features: ['Co-extrusie beschermlaag', 'Gegroefde & gladde zijde', '25 jaar garantie'],
    guarantee: '25 jaar fabrieksgarantie',
    slug: 'atmosphere-schutting-zonnig-bruin',
    tone: 'bruin',
    durability: 'co-extrusie',
    productType: 'plank',
    description: 'Composiet schuttingplank in zonnig bruin. Een warme, mediterrane kleur die sfeer brengt in elke tuin.',
    seoTitle: 'Schutting Zonnig Bruin | Composiet Schuttingplank',
    seoDescription: 'Atmosphere composiet schuttingplank Zonnig Bruin. Warme houtlook, co-extrusie, 25 jaar garantie. Bestel bij SchuttingenvanComposiet.nl.',
    longDescription: `## Atmosphere Schutting Zonnig Bruin

Breng warmte en sfeer in uw tuin met de Atmosphere schuttingplank in Zonnig Bruin. Deze warme, zongebruinde tint past perfect bij groene tuinen en houten elementen.

### Warme uitstraling

De zonnig bruine kleur doet denken aan zongebleekt hout en creëert een warme, uitnodigende sfeer in uw tuin. Perfect voor een landelijke of mediterrane tuinstijl.

### Duurzaam en kleurvast

Dankzij de co-extrusie beschermlaag behoudt de warme bruintint jarenlang zijn intensiteit. Geen verkleuring, geen onderhoud.`,
    specifications: { Lengte: '180 cm', Breedte: '17,6 cm', Dikte: '2,1 cm', Materiaal: 'Composiet met co-extrusie toplaag', Kleur: 'Zonnig Bruin', Afwerking: 'Dubbelzijdig: gegroefde & glad' },
    images: [
      'https://en.silvadec.com/sites/default/files/styles/square/public/2024-02/silvadec_atmosphere_B0040_13.jpg?itok=v_iEy2r1',
    ],
    deliveryTime: '5-8 werkdagen',
    highlights: ['Zonnig bruin', 'Warme houtlook', 'Mediterrane sfeer', 'Co-extrusie beschermlaag'],
    dimensions: { length: '180 cm', width: '17,6 cm', thickness: '2,1 cm' },
    faq: [
      { question: 'Past Zonnig Bruin bij een groene tuin?', answer: 'Ja, de warme bruintint combineert prachtig met groen. Het creëert een natuurlijk, harmonieus tuinbeeld.' },
    ],
  },
  {
    id: 'sc-5',
    updatedDate: '2026-02-20',
    name: 'Atmosphere Schutting Licht Eiken',
    price: 34.95,
    priceLabel: '€34,95 per plank',
    image: 'https://en.silvadec.com/sites/default/files/styles/square/public/2026-01/Cloture_Nuances_Chene-1037207_RET-compressed.jpg?itok=j6gbrz1V',
    category: 'schuttingen',
    features: ['Co-extrusie beschermlaag', 'Geborsteld oppervlak', '25 jaar garantie'],
    guarantee: '25 jaar fabrieksgarantie',
    slug: 'atmosphere-schutting-licht-eiken',
    tone: 'eiken',
    durability: 'co-extrusie',
    productType: 'plank',
    description: 'Composiet schuttingplank in licht eiken met geborstelde afwerking. De authentieke eikenlook brengt warmte en karakter in uw tuin.',
    seoTitle: 'Schutting Licht Eiken | Composiet Schuttingplank',
    seoDescription: 'Atmosphere composiet schuttingplank Licht Eiken. Geborsteld, co-extrusie, 25 jaar garantie. Bestel bij SchuttingenvanComposiet.nl.',
    longDescription: `## Atmosphere Schutting Licht Eiken

De nieuwste toevoeging aan het schuttingassortiment: Licht Eiken met een prachtige geborstelde afwerking. Deze plank biedt de authentieke look van eikenhout zonder enig onderhoud.

### Authentiek eikenhout gevoel

Het geborstelde oppervlak geeft een tactiele, natuurlijke houtstructuur. De lichte eikenkleur is warm en veelzijdig — perfect voor zowel moderne als klassieke tuinen.

### Nuances technologie

Deze plank maakt gebruik van de nieuwste Nuances-technologie, die subtiele kleurvariaties creëert voor een nog natuurlijker eindresultaat.`,
    specifications: { Lengte: '180 cm', Breedte: '17,6 cm', Dikte: '2,1 cm', Materiaal: 'Composiet met co-extrusie toplaag', Kleur: 'Licht Eiken', Afwerking: 'Geborsteld' },
    images: [
      'https://en.silvadec.com/sites/default/files/styles/square/public/2026-01/Cloture_Nuances_Chene-1037207_RET-compressed.jpg?itok=j6gbrz1V',
      'https://en.silvadec.com/sites/default/files/styles/square/public/2025-12/nuances-chene-clair-D03737%20%281%29.jpg?itok=nJ5vw31M',
    ],
    deliveryTime: '5-8 werkdagen',
    highlights: ['Licht eiken', 'Geborstelde afwerking', 'Nuances technologie', 'Co-extrusie beschermlaag'],
    dimensions: { length: '180 cm', width: '17,6 cm', thickness: '2,1 cm' },
    faq: [
      { question: 'Wat is Nuances technologie?', answer: 'Nuances is de nieuwste productiemethode die subtiele kleurvariaties per plank creëert, voor een nog natuurlijker houteffect.' },
    ],
  },
  {
    id: 'sc-6',
    updatedDate: '2026-02-20',
    name: 'Aluminium Schutting Antraciet Grijs',
    price: 39.95,
    priceLabel: '€39,95 per plank',
    image: 'https://en.silvadec.com/sites/default/files/styles/square/public/2023-05/SICLOTALU1801_lame_ecran_aluminium_sable_gris_anthracite_HD_0.jpg?itok=GI-ZQECY',
    category: 'schuttingen',
    features: ['Aluminium', 'Geschuurd oppervlak', 'RAL 7016 mat'],
    guarantee: '25 jaar garantie',
    slug: 'aluminium-schutting-antraciet-grijs',
    tone: 'grijs',
    durability: 'premium',
    productType: 'paneel',
    description: 'Aluminium schuttingplank in antraciet grijs (RAL 7016). Ultrastrak, modern en 100% onderhoudsvrij. De ultieme keuze voor een minimalistisch tuinontwerp.',
    seoTitle: 'Aluminium Schutting Antraciet Grijs | RAL 7016',
    seoDescription: 'Aluminium schuttingplank Antraciet Grijs RAL 7016. Ultrastrak, modern, onderhoudsvrij. Bestel bij SchuttingenvanComposiet.nl.',
    longDescription: `## Aluminium Schutting Antraciet Grijs

De aluminium schutting in Antraciet Grijs (RAL 7016 mat) biedt de ultieme minimalistische tuinafscheiding. Aluminium is lichter dan composiet, roestvrij en volledig recycleerbaar.

### Ultrastrak design

Het geschuurde aluminium oppervlak geeft een perfecte, egale kleur zonder nerf of textuur. Ideaal voor moderne architectuur en strakke tuinontwerpen.

### Voordelen van aluminium

- Extreem licht — eenvoudige montage
- 100% roestvrij
- Volledig recycleerbaar
- Geen onderhoud nodig
- RAL 7016 mat — de meest gevraagde kleur voor buitengebruik`,
    specifications: { Lengte: '180 cm', Breedte: '15 cm', Dikte: '2,0 cm', Materiaal: 'Aluminium', Kleur: 'Antraciet Grijs (RAL 7016 mat)', Afwerking: 'Geschuurd' },
    images: [
      'https://en.silvadec.com/sites/default/files/styles/square/public/2023-05/SICLOTALU1801_lame_ecran_aluminium_sable_gris_anthracite_HD_0.jpg?itok=GI-ZQECY',
    ],
    deliveryTime: '5-8 werkdagen',
    highlights: ['Aluminium', 'RAL 7016 mat', 'Ultrastrak', '100% recycleerbaar', 'Roestvrij'],
    dimensions: { length: '180 cm', width: '15 cm', thickness: '2,0 cm' },
    faq: [
      { question: 'Is aluminium sterker dan composiet?', answer: 'Aluminium is lichter maar even sterk. Voor schuttingen biedt het een strakker, moderner eindresultaat.' },
      { question: 'Kan ik aluminium en composiet planken combineren?', answer: 'Ja, aluminium planken passen in dezelfde paalprofielen als de composiet planken. U kunt ze naar wens combineren.' },
    ],
  },
  {
    id: 'sc-7',
    updatedDate: '2026-02-20',
    name: 'Aluminium Schutting Metaal Grijs',
    price: 39.95,
    priceLabel: '€39,95 per plank',
    image: 'https://en.silvadec.com/sites/default/files/styles/square/public/2023-10/SICLOTALU2001_lame_cloture_aluminium_gris_metal_120_ajouree_HD-compressed_3.jpg?itok=nTQnDDuW',
    category: 'schuttingen',
    features: ['Aluminium', 'Geschuurd oppervlak', 'RAL 7042 mat'],
    guarantee: '25 jaar garantie',
    slug: 'aluminium-schutting-metaal-grijs',
    tone: 'grijs',
    durability: 'premium',
    productType: 'paneel',
    description: 'Aluminium schuttingplank in metaal grijs (RAL 7042). Een lichtere grijstint dan antraciet, voor een industriële maar warme uitstraling.',
    seoTitle: 'Aluminium Schutting Metaal Grijs | RAL 7042',
    seoDescription: 'Aluminium schuttingplank Metaal Grijs RAL 7042. Modern, licht, onderhoudsvrij. Bestel bij SchuttingenvanComposiet.nl.',
    longDescription: `## Aluminium Schutting Metaal Grijs

De Metaal Grijs variant (RAL 7042 mat) biedt een lichter alternatief voor het populaire antraciet grijs. De warme metaaltint geeft een industriële maar uitnodigende sfeer.

### Lichtere grijstint

Metaal Grijs is perfect voor wie de strakke uitstraling van aluminium wil maar een minder donkere kleur prefereert. Het reflecteert meer licht en maakt de tuin optisch groter.`,
    specifications: { Lengte: '180 cm', Breedte: '15 cm', Dikte: '2,0 cm', Materiaal: 'Aluminium', Kleur: 'Metaal Grijs (RAL 7042 mat)', Afwerking: 'Geschuurd' },
    images: [
      'https://en.silvadec.com/sites/default/files/styles/square/public/2023-10/SICLOTALU2001_lame_cloture_aluminium_gris_metal_120_ajouree_HD-compressed_3.jpg?itok=nTQnDDuW',
    ],
    deliveryTime: '5-8 werkdagen',
    highlights: ['Aluminium', 'Metaal grijs', 'RAL 7042 mat', 'Industriële look'],
    dimensions: { length: '180 cm', width: '15 cm', thickness: '2,0 cm' },
    faq: [
      { question: 'Wat is het verschil met Antraciet Grijs?', answer: 'Metaal Grijs (RAL 7042) is lichter en warmer van toon dan Antraciet Grijs (RAL 7016). Het geeft een meer industriële, minder strenge uitstraling.' },
    ],
  },
  {
    id: 'sc-8',
    updatedDate: '2026-02-20',
    name: 'Aluminium Schutting Zwart',
    price: 39.95,
    priceLabel: '€39,95 per plank',
    image: 'https://en.silvadec.com/sites/default/files/styles/square/public/2024-01/silvadec_aluminium_C0055-2%20%281%29-compressed.jpg?itok=LSY1pBVe',
    category: 'schuttingen',
    features: ['Aluminium', 'Geschuurd oppervlak', 'RAL 2100 mat'],
    guarantee: '25 jaar garantie',
    slug: 'aluminium-schutting-zwart',
    tone: 'zwart',
    durability: 'premium',
    productType: 'paneel',
    description: 'Aluminium schuttingplank in diepzwart (RAL 2100). Een krachtige, elegante keuze voor een statement in uw tuin.',
    seoTitle: 'Aluminium Schutting Zwart | RAL 2100',
    seoDescription: 'Aluminium schuttingplank Zwart RAL 2100. Krachtig, elegant, onderhoudsvrij. Bestel bij SchuttingenvanComposiet.nl.',
    longDescription: `## Aluminium Schutting Zwart

De zwarte aluminium schutting (RAL 2100 mat) maakt een krachtig statement in elke tuin. Het diepe zwart combineert luxe met minimalisme.

### Krachtig en elegant

Zwart is de ultieme kleur voor een schutting die opvalt. Het creëert een dramatisch contrast met groen en bloemen, en past perfect bij moderne architectuur.

### Premium aluminium

Net als alle aluminium schuttingen is deze plank licht, sterk, roestvrij en volledig recycleerbaar.`,
    specifications: { Lengte: '180 cm', Breedte: '15 cm', Dikte: '2,0 cm', Materiaal: 'Aluminium', Kleur: 'Zwart (RAL 2100 mat)', Afwerking: 'Geschuurd' },
    images: [
      'https://en.silvadec.com/sites/default/files/styles/square/public/2024-01/silvadec_aluminium_C0055-2%20%281%29-compressed.jpg?itok=LSY1pBVe',
    ],
    deliveryTime: '5-8 werkdagen',
    highlights: ['Diepzwart', 'Aluminium', 'RAL 2100 mat', 'Krachtig statement'],
    dimensions: { length: '180 cm', width: '15 cm', thickness: '2,0 cm' },
    faq: [
      { question: 'Wordt zwart aluminium warm in de zon?', answer: 'Aluminium geleidt warmte snel maar koelt ook snel af. Voor een schutting is dit geen probleem — er is geen direct lichaamscontact.' },
    ],
  },

  // ─── VLONDERPLANKEN (Decking) ────────────────────────────────────
  {
    id: 'vl-1',
    updatedDate: '2026-02-20',
    name: 'Nuances Ipé Vlonderplank',
    price: 89.00,
    priceLabel: 'Vanaf €89,- per m²',
    image: 'https://en.silvadec.com/sites/default/files/styles/square/public/2025-02/Silvadec_atmopshere_D0373_packshot_0.png?itok=VHdJ4VQX',
    category: 'vlonderplanken',
    features: ['Co-extrusie beschermlaag', 'Geborsteld oppervlak', '25 jaar garantie', 'Nuances technologie'],
    guarantee: '25 jaar fabrieksgarantie',
    slug: 'nuances-ipe-vlonderplank',
    tone: 'bruin',
    durability: 'co-extrusie',
    productType: 'plank',
    description: 'De Nuances Ipé vlonderplank biedt de exclusieve uitstraling van tropisch ipé hout met de voordelen van co-extrusie composiet. Subtiele kleurvariaties per plank voor een authentiek houteffect.',
    seoTitle: 'Nuances Ipé Vlonderplank | Composiet Terrasplank',
    seoDescription: 'Nuances Ipé composiet vlonderplank. Exclusieve houtlook, co-extrusie, 25 jaar garantie. Bestel bij SchuttingenvanComposiet.nl.',
    longDescription: `## Nuances Ipé Vlonderplank

De Nuances Ipé is het vlaggenschip van het vlonderassortiment. Met de revolutionaire Nuances-technologie biedt deze plank subtiele kleurvariaties die de natuurlijke schoonheid van tropisch ipé hout nabootsen.

### Nuances technologie

De gepatenteerde Nuances-technologie creëert subtiele kleurverschillen per plank. Het resultaat is een terras dat eruitziet als echt ipé hout, maar dan zonder het onderhoud. Elke plank is uniek.

### Co-extrusie beschermlaag

De geavanceerde co-extrusie technologie omhult elke plank met een beschermende polymeerlaag:
- 0% vochtopname
- Maximale UV-bestendigheid
- Vlekbestendig oppervlak
- Krasbestendig

### Specificaties

De plank is 138 mm breed en 23 mm dik — een stevig, massief profiel dat de degelijkheid van echt hout evenaart. Beschikbaar in lengtes van 400 cm.

### 25 jaar garantie

25 jaar fabrieksgarantie op kleurvastheid, structurele integriteit en prestaties. Een investering voor het leven.`,
    specifications: { Lengte: '400 cm', Breedte: '13,8 cm', Dikte: '2,3 cm', Materiaal: 'Composiet met co-extrusie toplaag', Kleur: 'Ipé', Afwerking: 'Geborsteld (Nuances)', Gewicht: '3,8 kg/m' },
    images: [
      'https://en.silvadec.com/sites/default/files/styles/square/public/2025-02/Silvadec_atmopshere_D0373_packshot_0.png?itok=VHdJ4VQX',
      'https://en.silvadec.com/sites/default/files/styles/square/public/2025-04/Silvadec_atmosphere_nuances_ipe_b0035%20%2813%29-compressed.jpg?itok=jW47BaxI',
    ],
    deliveryTime: '5-8 werkdagen',
    highlights: ['Nuances technologie', 'Ipé houtlook', 'Co-extrusie beschermlaag', '25 jaar garantie', 'Unieke kleurvariaties'],
    dimensions: { length: '400 cm', width: '13,8 cm', thickness: '2,3 cm' },
    faq: [
      { question: 'Wat is het verschil tussen Nuances en Atmosphere?', answer: 'De Nuances-lijn gebruikt een geavanceerde technologie die subtiele kleurvariaties per plank creëert. Atmosphere heeft een uniforme kleur per plank.' },
      { question: 'Is de Nuances Ipé geschikt voor rondom een zwembad?', answer: 'Ja, de co-extrusie beschermlaag maakt de plank chloor- en zoutwaterbestendig. Het geborstelde oppervlak biedt goede grip, ook als het nat is.' },
      { question: 'Hoeveel planken heb ik nodig per m²?', answer: 'Bij een plankbreedte van 138 mm en een voegbreedte van 5 mm heeft u circa 7 planken per m² nodig. Reken 10% extra voor zaagverlies.' },
    ],
  },
  {
    id: 'vl-2',
    updatedDate: '2026-02-20',
    name: 'Nuances Licht Eiken Vlonderplank',
    price: 89.00,
    priceLabel: 'Vanaf €89,- per m²',
    image: 'https://en.silvadec.com/sites/default/files/styles/square/public/2025-05/nuancier-chene%20%282%29-compressed.jpg?itok=QXARKElr',
    category: 'vlonderplanken',
    features: ['Co-extrusie beschermlaag', 'Geborsteld oppervlak', '25 jaar garantie', 'Nuances technologie'],
    guarantee: '25 jaar fabrieksgarantie',
    slug: 'nuances-licht-eiken-vlonderplank',
    tone: 'eiken',
    durability: 'co-extrusie',
    productType: 'plank',
    description: 'De Nuances Licht Eiken vlonderplank brengt de warme, natuurlijke uitstraling van eikenhout naar uw terras. Met subtiele kleurvariaties dankzij de Nuances-technologie.',
    seoTitle: 'Nuances Licht Eiken Vlonderplank | Composiet Terrasplank',
    seoDescription: 'Nuances Licht Eiken composiet vlonderplank. Authentieke eikenlook, co-extrusie, 25 jaar garantie. Bestel bij SchuttingenvanComposiet.nl.',
    longDescription: `## Nuances Licht Eiken Vlonderplank

De Nuances Licht Eiken biedt de warme, veelzijdige uitstraling van eikenhout in een onderhoudsvrij composiet formaat. De Nuances-technologie zorgt voor subtiele kleurvariaties per plank.

### Warm en veelzijdig

De lichte eikenkleur past bij vrijwel elke tuinstijl en architectuur. Van moderne stadstuin tot landelijk terras — eiken is altijd een goede keuze.

### Nuances effect

Elke plank heeft subtiele kleurverschillen die een natuurlijk, authentiek houtbeeld creëren. Het resultaat is een terras met de warmte van echt eikenhout.`,
    specifications: { Lengte: '400 cm', Breedte: '13,8 cm', Dikte: '2,3 cm', Materiaal: 'Composiet met co-extrusie toplaag', Kleur: 'Licht Eiken', Afwerking: 'Geborsteld (Nuances)' },
    images: [
      'https://en.silvadec.com/sites/default/files/styles/square/public/2025-05/nuancier-chene%20%282%29-compressed.jpg?itok=QXARKElr',
      'https://en.silvadec.com/sites/default/files/styles/square/public/2025-10/Silvadec_Nuances_Ch%C3%AAne_clair_D0373%20%2811%29.jpg?itok=MmNiiLsz',
    ],
    deliveryTime: '5-8 werkdagen',
    highlights: ['Licht eiken', 'Nuances technologie', 'Warm en veelzijdig', 'Co-extrusie beschermlaag'],
    dimensions: { length: '400 cm', width: '13,8 cm', thickness: '2,3 cm' },
    faq: [
      { question: 'Is Licht Eiken een populaire kleur?', answer: 'Ja, eiken is een tijdloze en veelzijdige kleur die bij vrijwel elke bouwstijl past. Het is een van de meest gevraagde tinten.' },
    ],
  },
  {
    id: 'vl-3',
    updatedDate: '2026-02-20',
    name: 'Atmosphere Ushuaia Grijs Vlonderplank',
    price: 79.00,
    priceLabel: 'Vanaf €79,- per m²',
    image: 'https://en.silvadec.com/sites/default/files/styles/square/public/2021-02/SILAM1609_Lame_atmosphere_Gris_Ushua%C3%AFa.jpg?itok=fjbvR3Rh',
    category: 'vlonderplanken',
    features: ['Co-extrusie beschermlaag', 'Geborsteld oppervlak', '25 jaar garantie'],
    guarantee: '25 jaar fabrieksgarantie',
    slug: 'atmosphere-ushuaia-grijs-vlonderplank',
    tone: 'grijs',
    durability: 'co-extrusie',
    productType: 'plank',
    description: 'De Atmosphere Ushuaia Grijs vlonderplank biedt een markante, diepgrijze tint met geborstelde afwerking. De donkerste grijstint in het Atmosphere assortiment.',
    seoTitle: 'Atmosphere Ushuaia Grijs | Composiet Vlonderplank',
    seoDescription: 'Atmosphere Ushuaia Grijs composiet vlonderplank. Diepgrijs, co-extrusie, 25 jaar garantie. Bestel bij SchuttingenvanComposiet.nl.',
    longDescription: `## Atmosphere Ushuaia Grijs Vlonderplank

De Ushuaia Grijs is de meest markante grijstint in het Atmosphere assortiment. Deze diepgrijze vlonderplank met geborstelde afwerking geeft uw terras een krachtige, eigentijdse uitstraling.

### Diepgrijze tint

Ushuaia Grijs is donkerder dan Cayenne en Belem, maar lichter dan antraciet. Het is een warme, levendige grijstint die prachtig combineert met moderne architectuur.

### Co-extrusie kwaliteit

Elke Atmosphere plank is voorzien van de co-extrusie beschermlaag voor maximale duurzaamheid en kleurvastheid.`,
    specifications: { Lengte: '400 cm', Breedte: '13,8 cm', Dikte: '2,3 cm', Materiaal: 'Composiet met co-extrusie toplaag', Kleur: 'Ushuaia Grijs', Afwerking: 'Geborsteld' },
    images: [
      'https://en.silvadec.com/sites/default/files/styles/square/public/2021-02/SILAM1609_Lame_atmosphere_Gris_Ushua%C3%AFa.jpg?itok=fjbvR3Rh',
      'https://en.silvadec.com/sites/default/files/styles/square/public/2021-02/SILAM_1609_atmosphere_ushuaia_A.jpg?itok=nPxxgclu',
    ],
    deliveryTime: '5-8 werkdagen',
    highlights: ['Ushuaia grijs', 'Diepgrijze tint', 'Geborsteld oppervlak', 'Co-extrusie beschermlaag'],
    dimensions: { length: '400 cm', width: '13,8 cm', thickness: '2,3 cm' },
    faq: [
      { question: 'Hoe verschilt Ushuaia Grijs van Cayenne Grijs?', answer: 'Ushuaia is een diepere, meer blauwgrijze tint. Cayenne is donkerder met een warmere ondertoon. Bestel gratis samples om het verschil te zien.' },
    ],
  },
  {
    id: 'vl-4',
    updatedDate: '2026-02-20',
    name: 'Atmosphere Cayenne Grijs Vlonderplank',
    price: 79.00,
    priceLabel: 'Vanaf €79,- per m²',
    image: 'https://en.silvadec.com/sites/default/files/styles/square/public/2021-02/SILAM1603_packshot_rendu_Lame_atmosphere_Gris_Cayenne.jpg?itok=Wi-vzGPh',
    category: 'vlonderplanken',
    features: ['Co-extrusie beschermlaag', 'Geborsteld oppervlak', '25 jaar garantie'],
    guarantee: '25 jaar fabrieksgarantie',
    slug: 'atmosphere-cayenne-grijs-vlonderplank',
    tone: 'grijs',
    durability: 'co-extrusie',
    productType: 'plank',
    description: 'De Atmosphere Cayenne Grijs vlonderplank heeft een donkere, warme grijstint. Trendy en eigentijds.',
    seoTitle: 'Atmosphere Cayenne Grijs | Composiet Vlonderplank',
    seoDescription: 'Atmosphere Cayenne Grijs composiet vlonderplank. Donkergrijs, co-extrusie, 25 jaar garantie. Bestel bij SchuttingenvanComposiet.nl.',
    longDescription: `## Atmosphere Cayenne Grijs Vlonderplank

Cayenne Grijs is een donkere, warme grijstint die uw terras een trendy, eigentijdse uitstraling geeft. Deze vlonderplank uit het Atmosphere assortiment combineert een moderne kleur met de beproefde co-extrusie technologie.

### Trendy en eigentijds

De donkergrijze tint met warme ondertoon is een van de meest gevraagde kleuren voor moderne terrassen. Het past perfect bij strakke architectuur en donkere kozijnen.`,
    specifications: { Lengte: '400 cm', Breedte: '13,8 cm', Dikte: '2,3 cm', Materiaal: 'Composiet met co-extrusie toplaag', Kleur: 'Cayenne Grijs', Afwerking: 'Geborsteld' },
    images: [
      'https://en.silvadec.com/sites/default/files/styles/square/public/2021-02/SILAM1603_packshot_rendu_Lame_atmosphere_Gris_Cayenne.jpg?itok=Wi-vzGPh',
      'https://en.silvadec.com/sites/default/files/styles/square/public/2021-02/SILAM1603_SILAM1810_atmopshere_cayenne_138_180_A_THD.jpg?itok=bdeBmG1Q',
    ],
    deliveryTime: '5-8 werkdagen',
    highlights: ['Cayenne grijs', 'Donkere warme tint', 'Trendy kleur', 'Co-extrusie beschermlaag'],
    dimensions: { length: '400 cm', width: '13,8 cm', thickness: '2,3 cm' },
    faq: [
      { question: 'Is Cayenne Grijs geschikt voor een zwembadterras?', answer: 'Ja, alle Atmosphere planken zijn chloor- en zoutwaterbestendig. Het geborstelde oppervlak biedt antislip-eigenschappen.' },
    ],
  },
  {
    id: 'vl-5',
    updatedDate: '2026-02-20',
    name: 'Atmosphere Belem Grijs Vlonderplank',
    price: 79.00,
    priceLabel: 'Vanaf €79,- per m²',
    image: 'https://en.silvadec.com/sites/default/files/styles/square/public/2021-02/SILAM1601_Lame_atmosphere_Gris_belem_0.jpg?itok=DdfYDLIU',
    category: 'vlonderplanken',
    features: ['Co-extrusie beschermlaag', 'Geborsteld oppervlak', '25 jaar garantie'],
    guarantee: '25 jaar fabrieksgarantie',
    slug: 'atmosphere-belem-grijs-vlonderplank',
    tone: 'grijs',
    durability: 'co-extrusie',
    productType: 'plank',
    description: 'De Atmosphere Belem Grijs vlonderplank is de lichtste grijstint in het assortiment. Fris, licht en ruimtelijk.',
    seoTitle: 'Atmosphere Belem Grijs | Composiet Vlonderplank',
    seoDescription: 'Atmosphere Belem Grijs composiet vlonderplank. Lichtgrijs, co-extrusie, 25 jaar garantie. Bestel bij SchuttingenvanComposiet.nl.',
    longDescription: `## Atmosphere Belem Grijs Vlonderplank

Belem Grijs is de lichtste grijstint in het Atmosphere assortiment. Deze frisse, lichte vlonderplank maakt uw terras optisch groter en lichter.

### Licht en fris

De lichte grijstint reflecteert zonlicht en zorgt voor een fris, ruimtelijk gevoel. Ideaal voor balkons, kleine terrassen en schaduwrijke tuinen.

### Minder warmte-absorptie

Lichte kleuren absorberen minder warmte dan donkere kleuren. Belem Grijs is daarmee de ideale keuze voor terrassen die veel in de zon liggen.`,
    specifications: { Lengte: '400 cm', Breedte: '13,8 cm', Dikte: '2,3 cm', Materiaal: 'Composiet met co-extrusie toplaag', Kleur: 'Belem Grijs', Afwerking: 'Geborsteld' },
    images: [
      'https://en.silvadec.com/sites/default/files/styles/square/public/2021-02/SILAM1601_Lame_atmosphere_Gris_belem_0.jpg?itok=DdfYDLIU',
      'https://en.silvadec.com/sites/default/files/styles/square/public/2024-03/09072021-FB106327.jpg?itok=Pirjab_0',
    ],
    deliveryTime: '5-8 werkdagen',
    highlights: ['Belem grijs', 'Lichtste grijstint', 'Fris en ruimtelijk', 'Minder warmte-absorptie'],
    dimensions: { length: '400 cm', width: '13,8 cm', thickness: '2,3 cm' },
    faq: [
      { question: 'Is lichtgrijs moeilijker schoon te houden?', answer: 'Nee, de co-extrusie beschermlaag maakt het oppervlak vlekbestendig. Vuil hecht niet aan de beschermlaag en is eenvoudig te verwijderen.' },
    ],
  },
  {
    id: 'vl-6',
    updatedDate: '2026-02-20',
    name: 'Atmosphere Lima Bruin Vlonderplank',
    price: 79.00,
    priceLabel: 'Vanaf €79,- per m²',
    image: 'https://en.silvadec.com/sites/default/files/styles/square/public/2021-02/SILAM1607_packshot_rendu_lame_atmosphere_Brun_Lima.jpg?itok=uAPDw6KQ',
    category: 'vlonderplanken',
    features: ['Co-extrusie beschermlaag', 'Geborsteld oppervlak', '25 jaar garantie'],
    guarantee: '25 jaar fabrieksgarantie',
    slug: 'atmosphere-lima-bruin-vlonderplank',
    tone: 'bruin',
    durability: 'co-extrusie',
    productType: 'plank',
    description: 'De Atmosphere Lima Bruin vlonderplank heeft een rijke, donkerbruine tint. Warm, luxueus en tijdloos.',
    seoTitle: 'Atmosphere Lima Bruin | Composiet Vlonderplank',
    seoDescription: 'Atmosphere Lima Bruin composiet vlonderplank. Donkerbruin, co-extrusie, 25 jaar garantie. Bestel bij SchuttingenvanComposiet.nl.',
    longDescription: `## Atmosphere Lima Bruin Vlonderplank

Lima Bruin is een rijke, donkerbruine tint die uw terras de luxueuze uitstraling van tropisch hardhout geeft. Deze Atmosphere vlonderplank combineert warmte en elegantie.

### Luxe hardhout-look

De donkerbruine kleur met geborstelde afwerking is nauwelijks te onderscheiden van echt tropisch hout. Lima Bruin is ideaal voor wie de uitstraling van hardhout wil zonder het onderhoud.`,
    specifications: { Lengte: '400 cm', Breedte: '13,8 cm', Dikte: '2,3 cm', Materiaal: 'Composiet met co-extrusie toplaag', Kleur: 'Lima Bruin', Afwerking: 'Geborsteld' },
    images: [
      'https://en.silvadec.com/sites/default/files/styles/square/public/2021-02/SILAM1607_packshot_rendu_lame_atmosphere_Brun_Lima.jpg?itok=uAPDw6KQ',
      'https://en.silvadec.com/sites/default/files/styles/square/public/2021-02/lima_fontenay_le_comte_%287%29.jpg?itok=c0JGb9di',
    ],
    deliveryTime: '5-8 werkdagen',
    highlights: ['Lima bruin', 'Donkere hardhout-look', 'Warm en luxueus', 'Co-extrusie beschermlaag'],
    dimensions: { length: '400 cm', width: '13,8 cm', thickness: '2,3 cm' },
    faq: [
      { question: 'Is Lima Bruin donkerder dan Sao Paulo Bruin?', answer: 'Ja, Lima Bruin is een donkerdere tint. Sao Paulo is iets lichter en warmer. Bestel gratis samples om het verschil te ervaren.' },
    ],
  },
  {
    id: 'vl-7',
    updatedDate: '2026-02-20',
    name: 'Atmosphere Sao Paulo Bruin Vlonderplank',
    price: 79.00,
    priceLabel: 'Vanaf €79,- per m²',
    image: 'https://en.silvadec.com/sites/default/files/styles/square/public/2022-01/SILAM1602_packshot_rendu_lame_atmosphere_brun_sao_paulo_138.jpg?itok=nlWGrwmv',
    category: 'vlonderplanken',
    features: ['Co-extrusie beschermlaag', 'Geborsteld oppervlak', '25 jaar garantie'],
    guarantee: '25 jaar fabrieksgarantie',
    slug: 'atmosphere-sao-paulo-bruin-vlonderplank',
    tone: 'bruin',
    durability: 'co-extrusie',
    productType: 'plank',
    description: 'De Atmosphere Sao Paulo Bruin vlonderplank heeft een middeldiepe bruine tint. Veelzijdig en warm.',
    seoTitle: 'Atmosphere Sao Paulo Bruin | Composiet Vlonderplank',
    seoDescription: 'Atmosphere Sao Paulo Bruin composiet vlonderplank. Middenbruin, co-extrusie, 25 jaar garantie. Bestel bij SchuttingenvanComposiet.nl.',
    longDescription: `## Atmosphere Sao Paulo Bruin Vlonderplank

Sao Paulo Bruin is een veelzijdige, middeldiepe bruine tint. Deze Atmosphere vlonderplank past bij vrijwel elke tuin en bouwstijl.

### Veelzijdige bruintint

Niet te licht, niet te donker — Sao Paulo Bruin is de gouden middenweg voor wie een warme bruine kleur zoekt die overal bij past.`,
    specifications: { Lengte: '400 cm', Breedte: '13,8 cm', Dikte: '2,3 cm', Materiaal: 'Composiet met co-extrusie toplaag', Kleur: 'Sao Paulo Bruin', Afwerking: 'Geborsteld' },
    images: [
      'https://en.silvadec.com/sites/default/files/styles/square/public/2022-01/SILAM1602_packshot_rendu_lame_atmosphere_brun_sao_paulo_138.jpg?itok=nlWGrwmv',
      'https://en.silvadec.com/sites/default/files/styles/square/public/2024-07/silvadec_atmosphere_silam1602%20%2811%29.jpg?itok=uGuw2IYp',
    ],
    deliveryTime: '5-8 werkdagen',
    highlights: ['Sao Paulo bruin', 'Veelzijdige middenbruine tint', 'Warm en natuurlijk', 'Co-extrusie beschermlaag'],
    dimensions: { length: '400 cm', width: '13,8 cm', thickness: '2,3 cm' },
    faq: [
      { question: 'Is Sao Paulo geschikt voor een poolterras?', answer: 'Ja, alle Atmosphere planken zijn bestand tegen chloor en zout. De middenbruine kleur absorbeert bovendien minder warmte dan donkere tinten.' },
    ],
  },
  {
    id: 'vl-8',
    updatedDate: '2026-02-20',
    name: 'Atmosphere Rio Bruin Vlonderplank',
    price: 79.00,
    priceLabel: 'Vanaf €79,- per m²',
    image: 'https://en.silvadec.com/sites/default/files/styles/square/public/2022-01/SILAM1812_packshot_rendu_lame_atmosphere_brun_rio_138%20-%20retouche_0.jpg?itok=CBa8dZ-4',
    category: 'vlonderplanken',
    features: ['Co-extrusie beschermlaag', 'Geborsteld oppervlak', '25 jaar garantie'],
    guarantee: '25 jaar fabrieksgarantie',
    slug: 'atmosphere-rio-bruin-vlonderplank',
    tone: 'bruin',
    durability: 'co-extrusie',
    productType: 'plank',
    description: 'De Atmosphere Rio Bruin vlonderplank heeft een warme, goudbruine tint. De lichtste bruintint in het Atmosphere assortiment.',
    seoTitle: 'Atmosphere Rio Bruin | Composiet Vlonderplank',
    seoDescription: 'Atmosphere Rio Bruin composiet vlonderplank. Goudbruin, co-extrusie, 25 jaar garantie. Bestel bij SchuttingenvanComposiet.nl.',
    longDescription: `## Atmosphere Rio Bruin Vlonderplank

Rio Bruin is de nieuwste bruine tint in het Atmosphere assortiment. Een warme, goudbruine kleur die doet denken aan zonbeschenen hout.

### Warm goudbruin

De levendige goudbruine tint voegt warmte en sfeer toe aan elk buitenproject. Perfect voor terrassen die een zonnige, uitnodigende uitstraling moeten hebben.`,
    specifications: { Lengte: '400 cm', Breedte: '13,8 cm', Dikte: '2,3 cm', Materiaal: 'Composiet met co-extrusie toplaag', Kleur: 'Rio Bruin', Afwerking: 'Geborsteld' },
    images: [
      'https://en.silvadec.com/sites/default/files/styles/square/public/2022-01/SILAM1812_packshot_rendu_lame_atmosphere_brun_rio_138%20-%20retouche_0.jpg?itok=CBa8dZ-4',
      'https://en.silvadec.com/sites/default/files/styles/square/public/2021-02/SILAM1812_france_paris_hotel_prince_de_galles_patio_restaurant_les_heures_rio_138_%285%29.jpg?itok=1axHGAdD',
    ],
    deliveryTime: '5-8 werkdagen',
    highlights: ['Rio bruin', 'Goudbruine tint', 'Zonnige uitstraling', 'Co-extrusie beschermlaag'],
    dimensions: { length: '400 cm', width: '13,8 cm', thickness: '2,3 cm' },
    faq: [
      { question: 'Is Rio Bruin een nieuwe kleur?', answer: 'Ja, Rio Bruin is een recente toevoeging aan het Atmosphere assortiment. Het vult de bruine kleurenfamilie aan met een warme, goudbruine tint.' },
    ],
  },
  {
    id: 'vl-9',
    updatedDate: '2026-02-20',
    name: 'Elegance Colorado Bruin Vlonderplank (Gegroefde)',
    price: 59.00,
    priceLabel: 'Vanaf €59,- per m²',
    image: 'https://en.silvadec.com/sites/default/files/styles/square/public/2021-02/SILAM0501_lame_elegance_brun_colorado_rainur%C3%A9e_138.jpg?itok=Ahx_UC-g',
    category: 'vlonderplanken',
    features: ['Mono-extrusie', 'Gegroefde afwerking', 'Antislip'],
    guarantee: '15 jaar garantie',
    slug: 'elegance-colorado-bruin-vlonderplank',
    tone: 'bruin',
    durability: 'standaard',
    productType: 'plank',
    description: 'De Elegance Colorado Bruin vlonderplank met gegroefde afwerking. Een bewezen klassiek design met uitstekende antislip-eigenschappen.',
    seoTitle: 'Elegance Colorado Bruin Gegroefde | Composiet Vlonderplank',
    seoDescription: 'Elegance Colorado Bruin composiet vlonderplank, gegroefde afwerking. Antislip, 15 jaar garantie. Bestel bij SchuttingenvanComposiet.nl.',
    longDescription: `## Elegance Colorado Bruin Vlonderplank (Gegroefde)

De Elegance Colorado Bruin met gegroefde afwerking is een klassiek terrasplankontwerp met uitstekende antislip-eigenschappen. De groeven in de plank bieden extra grip, vooral wanneer het oppervlak nat is.

### Mono-extrusie

De Elegance lijn gebruikt mono-extrusie technologie. Dit betekent dat de plank geen aparte beschermlaag heeft, maar uit één uniform materiaal bestaat. Het oppervlak ontwikkelt een mooie patina na verloop van tijd.

### Antislip groeven

De gegroefde afwerking biedt optimale grip, ook op natte oppervlakken. Ideaal voor terrassen rondom zwembaden of in regenrijke gebieden.`,
    specifications: { Lengte: '400 cm', Breedte: '13,8 cm', Dikte: '2,3 cm', Materiaal: 'Composiet (mono-extrusie)', Kleur: 'Colorado Bruin', Afwerking: 'Gegroefde' },
    images: [
      'https://en.silvadec.com/sites/default/files/styles/square/public/2021-02/SILAM0501_lame_elegance_brun_colorado_rainur%C3%A9e_138.jpg?itok=Ahx_UC-g',
      'https://en.silvadec.com/sites/default/files/styles/square/public/2021-02/SILAM0501_Camping_photo__BD.jpg?itok=jLSOaWe2',
    ],
    deliveryTime: '5-8 werkdagen',
    highlights: ['Colorado bruin', 'Gegroefde antislip', 'Mono-extrusie', 'Klassiek design'],
    dimensions: { length: '400 cm', width: '13,8 cm', thickness: '2,3 cm' },
    faq: [
      { question: 'Wat is het verschil tussen mono-extrusie en co-extrusie?', answer: 'Mono-extrusie planken bestaan uit één uniform materiaal. Co-extrusie planken hebben een extra beschermlaag. Co-extrusie biedt meer vlekbestendigheid en kleurvastheid.' },
      { question: 'Verandert de kleur van mono-extrusie planken?', answer: 'Ja, mono-extrusie planken kunnen in de eerste maanden licht verkleuren tot een stabiele patina. Dit is een normaal proces dat bij alle composiet zonder beschermlaag optreedt.' },
    ],
  },
  {
    id: 'vl-10',
    updatedDate: '2026-02-20',
    name: 'Elegance Iroise Grijs Vlonderplank (Gegroefde)',
    price: 59.00,
    priceLabel: 'Vanaf €59,- per m²',
    image: 'https://en.silvadec.com/sites/default/files/styles/square/public/2021-02/SILAM0502_lame_elegance_gris-iroise_rainur%C3%A9e_138.jpg?itok=MKohWFtR',
    category: 'vlonderplanken',
    features: ['Mono-extrusie', 'Gegroefde afwerking', 'Antislip'],
    guarantee: '15 jaar garantie',
    slug: 'elegance-iroise-grijs-vlonderplank',
    tone: 'grijs',
    durability: 'standaard',
    productType: 'plank',
    description: 'De Elegance Iroise Grijs vlonderplank met gegroefde afwerking. Lichtgrijs, fris en ruimtelijk met antislip-eigenschappen.',
    seoTitle: 'Elegance Iroise Grijs Gegroefde | Composiet Vlonderplank',
    seoDescription: 'Elegance Iroise Grijs composiet vlonderplank, gegroefde afwerking. Antislip, 15 jaar garantie. Bestel bij SchuttingenvanComposiet.nl.',
    longDescription: `## Elegance Iroise Grijs Vlonderplank (Gegroefde)

Iroise Grijs is een lichte, frisse grijstint uit de Elegance lijn. De gegroefde afwerking biedt uitstekende grip en een klassiek terrasdesign.

### Licht en ruimtelijk

De lichte grijstint maakt uw terras optisch groter en absorbeert minder warmte dan donkere kleuren.`,
    specifications: { Lengte: '400 cm', Breedte: '13,8 cm', Dikte: '2,3 cm', Materiaal: 'Composiet (mono-extrusie)', Kleur: 'Iroise Grijs', Afwerking: 'Gegroefde' },
    images: [
      'https://en.silvadec.com/sites/default/files/styles/square/public/2021-02/SILAM0502_lame_elegance_gris-iroise_rainur%C3%A9e_138.jpg?itok=MKohWFtR',
      'https://en.silvadec.com/sites/default/files/styles/square/public/2021-02/platelage_elegance_rainure_iroise_hotel_alicante_6_0.JPG?itok=bVzKyTm8',
    ],
    deliveryTime: '5-8 werkdagen',
    highlights: ['Iroise grijs', 'Lichte frisse tint', 'Gegroefde antislip', 'Mono-extrusie'],
    dimensions: { length: '400 cm', width: '13,8 cm', thickness: '2,3 cm' },
    faq: [
      { question: 'Is Iroise Grijs de lichtste grijstint?', answer: 'Ja, binnen de Elegance lijn is Iroise Grijs de lichtste optie. In het Atmosphere assortiment is Belem Grijs de lichtste.' },
    ],
  },
  {
    id: 'vl-11',
    updatedDate: '2026-02-20',
    name: 'Emotion Savanne Bruin Vlonderplank',
    price: 49.00,
    priceLabel: 'Vanaf €49,- per m²',
    image: 'https://en.silvadec.com/sites/default/files/styles/square/public/2021-02/SILAM0901_emotion_.jpg?itok=3dKAr4sb',
    category: 'vlonderplanken',
    features: ['Mono-extrusie', 'Glad oppervlak', 'Budget-vriendelijk'],
    guarantee: '15 jaar garantie',
    slug: 'emotion-savanne-bruin-vlonderplank',
    tone: 'bruin',
    durability: 'standaard',
    productType: 'plank',
    description: 'De Emotion Savanne Bruin vlonderplank biedt een glad, strak oppervlak tegen een aantrekkelijke prijs. Ideaal als instapmodel.',
    seoTitle: 'Emotion Savanne Bruin | Composiet Vlonderplank',
    seoDescription: 'Emotion Savanne Bruin composiet vlonderplank. Glad, budget-vriendelijk, 15 jaar garantie. Bestel bij SchuttingenvanComposiet.nl.',
    longDescription: `## Emotion Savanne Bruin Vlonderplank

De Emotion Savanne Bruin is het instapmodel in het vlonderassortiment. Met een glad oppervlak en een aantrekkelijke prijs biedt deze plank composiet kwaliteit voor elk budget.

### Glad oppervlak

Het gladde oppervlak geeft een strakke, moderne uitstraling. De Savanne bruine kleur is warm en veelzijdig.

### Budget-vriendelijk

De Emotion lijn biedt betrouwbare kwaliteit tegen een lagere prijs dan de Atmosphere en Nuances lijnen. Ideaal voor grote terrassen waar het budget een rol speelt.`,
    specifications: { Lengte: '400 cm', Breedte: '13,8 cm', Dikte: '2,3 cm', Materiaal: 'Composiet (mono-extrusie)', Kleur: 'Savanne Bruin', Afwerking: 'Glad' },
    images: [
      'https://en.silvadec.com/sites/default/files/styles/square/public/2021-02/SILAM0901_emotion_.jpg?itok=3dKAr4sb',
      'https://en.silvadec.com/sites/default/files/styles/square/public/2023-08/Silvadec_emotion_silam0901%20%281%29_1.jpg?itok=FA_2asjV',
    ],
    deliveryTime: '5-8 werkdagen',
    highlights: ['Savanne bruin', 'Glad oppervlak', 'Budget-vriendelijk', 'Composiet kwaliteit'],
    dimensions: { length: '400 cm', width: '13,8 cm', thickness: '2,3 cm' },
    faq: [
      { question: 'Is de Emotion lijn van mindere kwaliteit?', answer: 'Nee, alle planken voldoen aan dezelfde hoge kwaliteitsnormen. De Emotion lijn gebruikt mono-extrusie (zonder extra beschermlaag), waardoor de prijs lager is.' },
    ],
  },
  {
    id: 'vl-12',
    updatedDate: '2026-02-20',
    name: 'Emotion Equateur Bruin Vlonderplank',
    price: 49.00,
    priceLabel: 'Vanaf €49,- per m²',
    image: 'https://en.silvadec.com/sites/default/files/styles/square/public/2021-02/SILAM0902_emotion_equateur.jpg?itok=6VNztnGf',
    category: 'vlonderplanken',
    features: ['Mono-extrusie', 'Glad oppervlak', 'Budget-vriendelijk'],
    guarantee: '15 jaar garantie',
    slug: 'emotion-equateur-bruin-vlonderplank',
    tone: 'bruin',
    durability: 'standaard',
    productType: 'plank',
    description: 'De Emotion Equateur Bruin vlonderplank heeft een donkere, warme bruine tint met glad oppervlak. Een aantrekkelijk instapmodel.',
    seoTitle: 'Emotion Equateur Bruin | Composiet Vlonderplank',
    seoDescription: 'Emotion Equateur Bruin composiet vlonderplank. Donkerbruin, glad, budget-vriendelijk. Bestel bij SchuttingenvanComposiet.nl.',
    longDescription: `## Emotion Equateur Bruin Vlonderplank

De Equateur Bruin is de donkere variant in de Emotion lijn. Een rijke, warme bruine tint met glad oppervlak die uw terras een luxe uitstraling geeft tegen een aantrekkelijke prijs.

### Donker en warm

De diepe Equateur bruine kleur geeft een gevoel van luxe en warmte. Het gladde oppervlak versterkt de elegante uitstraling.`,
    specifications: { Lengte: '400 cm', Breedte: '13,8 cm', Dikte: '2,3 cm', Materiaal: 'Composiet (mono-extrusie)', Kleur: 'Equateur Bruin', Afwerking: 'Glad' },
    images: [
      'https://en.silvadec.com/sites/default/files/styles/square/public/2021-02/SILAM0902_emotion_equateur.jpg?itok=6VNztnGf',
      'https://en.silvadec.com/sites/default/files/styles/square/public/2021-02/equateur_%281%29.JPG?itok=OdCVQq9l',
    ],
    deliveryTime: '5-8 werkdagen',
    highlights: ['Equateur bruin', 'Donkere warme tint', 'Glad oppervlak', 'Budget-vriendelijk'],
    dimensions: { length: '400 cm', width: '13,8 cm', thickness: '2,3 cm' },
    faq: [
      { question: 'Wat is het verschil tussen Savanne en Equateur?', answer: 'Savanne is een lichtere, warmere bruine tint. Equateur is donkerder en dieper. Beide hebben een glad oppervlak en dezelfde mono-extrusie technologie.' },
    ],
  },
];

export const categories = [
  {
    id: 'cat-gevel',
    name: 'Gevelbekleding',
    description: 'Composiet gevelbekleding voor een moderne, onderhoudsvrije gevel. Van gesloten planken tot open rhombus profielen.',
    image: 'https://cdn.silvadec.com/media/cache/product_image_full/uploads/product/Blanc_ceruse_1.jpg',
    slug: 'gevelbekleding',
    productCount: products.filter(p => p.category === 'gevelbekleding').length,
    seoTitle: 'Composiet Gevelbekleding | SchuttingenvanComposiet.nl',
    seoDescription: 'Ontdek ons assortiment composiet gevelbekleding. Atmosphere 175 en Open Rhombus profielen. Co-extrusie, 25 jaar garantie.',
    faq: [
      { question: 'Wat is het verschil tussen Atmosphere 175 en Open Rhombus?', answer: 'Atmosphere 175 is een brede, gesloten gevelplank. Open Rhombus heeft een smal, open profiel dat een licht-schaduwspel creëert.' },
      { question: 'Is composiet gevelbekleding geschikt voor elke woning?', answer: 'Ja, composiet gevelbekleding is geschikt voor nieuwbouw en renovatie. Het is licht, eenvoudig te monteren en past bij elke bouwstijl.' },
    ],
  },
  {
    id: 'cat-schut',
    name: 'Schuttingen',
    description: 'Composiet en aluminium schuttingplanken voor een duurzame, stijlvolle tuinafscheiding. Dubbelzijdige afwerking.',
    image: 'https://cdn.silvadec.com/media/cache/product_image_full/uploads/product/silvadec_aluminium_C0039.png',
    slug: 'schuttingen',
    productCount: products.filter(p => p.category === 'schuttingen').length,
    seoTitle: 'Composiet Schuttingen | SchuttingenvanComposiet.nl',
    seoDescription: 'Ontdek ons assortiment composiet en aluminium schuttingplanken. Dubbelzijdig, co-extrusie, 25 jaar garantie.',
    faq: [
      { question: 'Wat is het verschil tussen composiet en aluminium schuttingen?', answer: 'Composiet schuttingen hebben een natuurlijke houtlook. Aluminium schuttingen zijn strakker en moderner. Beide zijn onderhoudsvrij.' },
      { question: 'Kan ik composiet en aluminium planken combineren?', answer: 'Ja, alle schuttingplanken passen in dezelfde aluminium paalprofielen. U kunt ze naar wens combineren.' },
    ],
  },
  {
    id: 'cat-vlond',
    name: 'Vlonderplanken',
    description: 'Composiet vlonderplanken voor terrassen, balkons en zwembaddecks. Van budget tot premium met co-extrusie beschermlaag.',
    image: 'https://cdn.silvadec.com/media/cache/product_image_full/uploads/product/Silvadec_atmosphere_nuances_ipe.jpg',
    slug: 'vlonderplanken',
    productCount: products.filter(p => p.category === 'vlonderplanken').length,
    seoTitle: 'Composiet Vlonderplanken | SchuttingenvanComposiet.nl',
    seoDescription: 'Ontdek ons assortiment composiet vlonderplanken. Nuances, Atmosphere, Elegance en Emotion lijnen. Tot 25 jaar garantie.',
    faq: [
      { question: 'Welke lijn past bij mij?', answer: 'Nuances en Atmosphere (co-extrusie) bieden de beste kleurvastheid en vlekbestendigheid. Elegance en Emotion (mono-extrusie) zijn budget-vriendelijker.' },
      { question: 'Is composiet geschikt voor rondom een zwembad?', answer: 'Ja, met name de Atmosphere en Nuances lijnen met co-extrusie beschermlaag zijn bestand tegen chloor en zout.' },
    ],
  },
];
