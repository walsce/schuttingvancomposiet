export type Tone = 'teak' | 'zwart' | 'walnoot' | 'eiken' | 'grijs';
export type Durability = 'standaard' | 'premium' | 'massief';
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
}

export const toneLabels: Record<Tone, string> = {
  teak: 'Teak',
  zwart: 'Zwart',
  walnoot: 'Walnoot',
  eiken: 'Eiken',
  grijs: 'Grijs',
};

export const durabilityLabels: Record<Durability, string> = {
  standaard: 'Standaard',
  premium: 'Premium (Co-Extrusie)',
  massief: 'Massief Naadloos',
};

export const productTypeLabels: Record<ProductType, string> = {
  plank: 'Plank / Paneel',
  paneel: 'Compleet Scherm',
  profiel: 'Profiel / Onderdeel',
};

export const products: Product[] = [
  // ─── GEVELBEKLEDING ──────────────────────────────────────────
  {
    id: 'gv-1',
    name: 'Composiet gevelbekleding Rhombus Teak',
    price: 25.95,
    priceLabel: '€25,95 per stuk',
    image: 'https://www.mthekwerken.nl/wp-content/uploads/1-Teak-3-533x355-1-300x200.png',
    category: 'gevelbekleding',
    features: ['Co-Extrusie beschermlaag', 'Eigen bezorgservice'],
    guarantee: '15 jaar garantie',
    slug: 'rhombus-teak',
    tone: 'teak',
    durability: 'premium',
    productType: 'plank',
    description: 'De composiet gevelbekleding Rhombus in de kleur Teak geeft uw gevel een warme, natuurlijke uitstraling. Dankzij de co-extrusie beschermlaag is de plank extra bestendig tegen UV-straling, krassen en vlekken. De rhombus-profilering zorgt voor een moderne, strakke look met schaduwwerking.',
    seoTitle: 'Composiet Gevelbekleding Rhombus Teak Kopen | €25,95',
    seoDescription: 'Composiet gevelbekleding Rhombus Teak met co-extrusie beschermlaag. UV-bestendig, onderhoudsvrij en 15 jaar garantie. Bestel nu bij Composiethekwerk.nl.',
    longDescription: `## Composiet gevelbekleding Rhombus Teak

Geef jouw woning, schuur of uitbouw een moderne en hoogwaardige uitstraling met onze composiet gevelbekleding in Rhombus-profiel. De planken zijn voorzien van een co-extrusie beschermlaag, waardoor ze geen vocht opnemen, kleurvast blijven en extreem lang meegaan.

### Duurzaam en onderhoudsvrij

De combinatie van gerecycled kunststof en houtvezels maakt de productie van deze gevelbekleding zeer duurzaam. Tijdens productie ontstaat geen restmateriaal. Deze materialen zorgen voor ongevoeligheid voor rot, schimmel en verkleuring. Je hoeft nooit meer te schilderen en dankzij de co-extrusie laag blijft het oppervlak kleurvast en eenvoudig te reinigen. De vochtopname is 0%.

### Flexibele montage

Of je nu kiest voor horizontale of verticale plaatsing, de planken zijn in beide richtingen eenvoudig vast te schroeven op het regelwerk. We leveren standaard schroeven mee bij elke plank. De strakke, smalle openingen tussen de stroken zorgen voor een subtiel diepte-effect en een luxe, eigentijdse look. Daarnaast kun je de planken gemakkelijk inkorten of op maat maken.

### Voordelen in één oogopslag

- Natuurlijke houtstructuur met duurzame co-extrusie beschermlaag
- Extreem duurzame productie bestaand uit 95% gerecycled materiaal
- Kleurvast, rotvrij en onderhoudsarm
- Geen schilderwerk nodig, eenvoudig te reinigen
- Perfect voor elk klimaat
- Snel en flexibel te monteren met bijpassende profielen

Met onze composiet gevelbekleding kies je voor een hoogwaardige, duurzame en stijlvolle afwerking waar je jarenlang plezier van hebt.`,
    specifications: { Lengte: '290 cm', Breedte: '20 cm', Dikte: '2,1 cm', Oppervlakte: '0,58 m² per plank', Materiaal: 'Composiet met co-extrusie toplaag', Kleur: 'Teak', Profiel: 'Rhombus' },
    images: [
      'https://www.mthekwerken.nl/wp-content/uploads/1-Teak-3-533x355-1.png',
      'https://www.mthekwerken.nl/wp-content/uploads/composiet-gevelbekleding-Teak-300x174-2.png',
      'https://www.mthekwerken.nl/wp-content/uploads/Teak-gevelbekleding-300x225-2.jpg',
    ],
    deliveryTime: 'Tussen de 2 en 15 werkdagen',
    highlights: ['Co-extrusie beschermlaag', 'UV-bestendig & kleurvast', 'Onderhoudsvrij', 'Eenvoudige montage', 'Eigen bezorgservice'],
    dimensions: { length: '290 cm', width: '20 cm', thickness: '2,1 cm', coverage: '0,58 m² per plank' },
    faq: [
      { question: 'Wat is co-extrusie?', answer: 'Co-extrusie is een extra beschermlaag die tijdens het productieproces op de composiet plank wordt aangebracht. Dit zorgt voor extra bescherming tegen UV-straling, krassen en vlekken.' },
      { question: 'Hoe monteer ik de gevelbekleding?', answer: 'De gevelbekleding wordt bevestigd op een aluminium regelwerk met behulp van RVS schroeven. We raden aan om een ventilatieopening van minimaal 25mm aan te houden.' },
      { question: 'Hoeveel planken heb ik nodig?', answer: 'Elke plank bedekt 0,58 m². Meet uw geveloppervlak en deel dit door 0,58 om het benodigde aantal planken te berekenen. Reken 5-10% extra voor zaagverlies.' },
      { question: 'Is de gevelbekleding geschikt voor elk klimaat?', answer: 'Ja, de composiet gevelbekleding is bestand tegen alle weersomstandigheden. De vochtopname is 0%, waardoor de planken niet uitzetten, krimpen of vervormen bij temperatuurwisselingen.' },
    ],
  },
  {
    id: 'gv-2',
    name: 'Composiet gevelbekleding Rhombus Teak/Zwart',
    price: 25.95,
    priceLabel: '€25,95 per stuk',
    image: 'https://www.mthekwerken.nl/wp-content/uploads/Teak-zwart-533x355-1-300x200.png',
    category: 'gevelbekleding',
    features: ['Co-Extrusie beschermlaag', 'Eigen bezorgservice'],
    guarantee: '15 jaar garantie',
    slug: 'rhombus-teak-zwart',
    tone: 'teak',
    durability: 'premium',
    productType: 'plank',
    description: 'Een unieke combinatie van Teak en Zwart. De ene zijde heeft een warme teakkleur, de andere een strak zwart. Ideaal als u twee stijlen in één plank wilt combineren.',
    seoTitle: 'Composiet Gevelbekleding Rhombus Teak/Zwart | €25,95',
    seoDescription: 'Unieke composiet gevelbekleding met twee kleuren: Teak en Zwart in één plank. Co-extrusie beschermlaag, 15 jaar garantie. Bestel bij Composiethekwerk.nl.',
    longDescription: `## Composiet gevelbekleding Rhombus Teak/Zwart

Geef jouw woning, schuur of uitbouw een moderne en hoogwaardige uitstraling met onze composiet gevelbekleding in Rhombus-profiel. De planken zijn voorzien van een co-extrusie beschermlaag, waardoor ze geen vocht opnemen, kleurvast blijven en extreem lang meegaan. Deze Teak planken met zwarte achtergrond zorgen voor een beeld van extra diepte.

### Duurzaam en onderhoudsvrij

De combinatie van gerecycled kunststof en houtvezels maakt de productie van deze gevelbekleding zeer duurzaam. Tijdens productie ontstaat geen restmateriaal. Deze materialen zorgen voor ongevoeligheid voor rot, schimmel en verkleuring. Je hoeft nooit meer te schilderen en dankzij de co-extrusie laag blijft het oppervlak kleurvast en eenvoudig te reinigen. De vochtopname is 0%.

### Flexibele montage

Of je nu kiest voor horizontale of verticale plaatsing, de planken zijn in beide richtingen eenvoudig vast te schroeven op het regelwerk. We leveren standaard schroeven mee bij elke plank. De strakke, smalle openingen tussen de stroken zorgen voor een subtiel diepte-effect en een luxe, eigentijdse look.

### Voordelen in één oogopslag

- Twee kleuren in één plank: Teak voorzijde, Zwart achterzijde
- Door de zwarte achtergrond creëer je extra diepte
- Extreem duurzame productie bestaand uit 95% gerecycled materiaal
- Kleurvast, rotvrij en onderhoudsarm
- Geen schilderwerk nodig, eenvoudig te reinigen
- Perfect voor elk klimaat
- Snel en flexibel te monteren met bijpassende profielen

Met onze composiet gevelbekleding kies je voor een hoogwaardige, duurzame en stijlvolle afwerking waar je jarenlang plezier van hebt. Nu met zwarte achtergrond voor een unieke gevelbekleding.`,
    specifications: { Lengte: '290 cm', Breedte: '20 cm', Dikte: '2,1 cm', Oppervlakte: '0,58 m² per plank', Materiaal: 'Composiet met co-extrusie toplaag', Kleur: 'Teak / Zwart', Profiel: 'Rhombus' },
    images: [
      'https://www.mthekwerken.nl/wp-content/uploads/Teak-zwart-533x355-1.png',
      'https://www.mthekwerken.nl/wp-content/uploads/gevelbekleding-rhombus-teakzwart-2.jpg',
      'https://www.mthekwerken.nl/wp-content/uploads/foto-gevel-rhombus-teakzwart-2.jpg',
      'https://www.mthekwerken.nl/wp-content/uploads/gevelbekleding-rhombus-teak-zwarte-achtergrond-2.jpg',
      'https://www.mthekwerken.nl/wp-content/uploads/teak-zwart-twee-300x200-2.png',
    ],
    deliveryTime: 'Tussen de 2 en 15 werkdagen',
    highlights: ['Twee kleuren in één plank', 'Co-extrusie beschermlaag', 'UV-bestendig', 'Onderhoudsvrij'],
    dimensions: { length: '290 cm', width: '20 cm', thickness: '2,1 cm', coverage: '0,58 m² per plank' },
    faq: [
      { question: 'Kan ik kiezen welke kant zichtbaar is?', answer: 'Ja, u bepaalt zelf welke zijde u naar buiten richt. De Teak zijde geeft een warme houtlook, de zwarte zijde een strakke moderne uitstraling. U kunt zelfs beide zijden combineren in één project.' },
      { question: 'Is de zwarte achterkant ook beschermd?', answer: 'Ja, beide zijden zijn voorzien van een co-extrusie beschermlaag. Zowel de Teak als de Zwarte zijde is UV-bestendig en kleurvast.' },
      { question: 'Hoe monteer ik de gevelbekleding?', answer: 'Bevestig de planken op een aluminium regelwerk met RVS schroeven. Houd een ventilatieopening van minimaal 25mm aan. Horizontale én verticale montage is mogelijk.' },
      { question: 'Hoeveel planken heb ik nodig?', answer: 'Elke plank bedekt 0,58 m². Meet uw geveloppervlak en deel dit door 0,58. Reken 5-10% extra voor zaagverlies.' },
    ],
  },
  {
    id: 'gv-3',
    name: 'Composiet gevelbekleding Rhombus Zwart',
    price: 25.95,
    priceLabel: '€25,95 per stuk',
    image: 'https://www.mthekwerken.nl/wp-content/uploads/Gevelbekleding-zwart-533x355-1-300x200.png',
    category: 'gevelbekleding',
    features: ['Co-Extrusie beschermlaag', 'Eigen bezorgservice'],
    guarantee: '15 jaar garantie',
    slug: 'rhombus-zwart',
    tone: 'zwart',
    durability: 'premium',
    productType: 'plank',
    description: 'Strakke zwarte composiet gevelbekleding met rhombus profiel. De donkere kleur geeft uw woning een moderne, tijdloze uitstraling. Voorzien van co-extrusie beschermlaag voor langdurige kleurvastheid.',
    seoTitle: 'Composiet Gevelbekleding Rhombus Zwart Kopen | €25,95',
    seoDescription: 'Zwarte composiet gevelbekleding met rhombus profiel en co-extrusie beschermlaag. Onderhoudsvrij, kleurvast en 15 jaar garantie. Bestel online.',
    longDescription: `## Composiet gevelbekleding Rhombus Zwart

Geef jouw woning een moderne, tijdloze uitstraling met onze zwarte composiet gevelbekleding in Rhombus-profiel. De planken zijn voorzien van een co-extrusie beschermlaag, waardoor ze geen vocht opnemen, kleurvast blijven en extreem lang meegaan.

### Duurzaam en onderhoudsvrij

De combinatie van gerecycled kunststof en houtvezels maakt deze gevelbekleding zeer duurzaam. De materialen zijn ongevoelig voor rot, schimmel en verkleuring. Je hoeft nooit meer te schilderen en dankzij de co-extrusie laag blijft het zwarte oppervlak kleurvast. De vochtopname is 0%.

### Flexibele montage

Kies voor horizontale of verticale plaatsing — de planken zijn in beide richtingen eenvoudig te monteren op het regelwerk. Standaard schroeven worden meegeleverd. De planken zijn gemakkelijk op maat te maken.

### Voordelen in één oogopslag

- Strakke, moderne zwarte uitstraling
- Duurzame co-extrusie beschermlaag
- 95% gerecycled materiaal
- Kleurvast, rotvrij en onderhoudsarm
- Geen schilderwerk nodig
- Geschikt voor horizontale én verticale montage`,
    specifications: { Lengte: '290 cm', Breedte: '20 cm', Dikte: '2,1 cm', Oppervlakte: '0,58 m² per plank', Materiaal: 'Composiet met co-extrusie toplaag', Kleur: 'Zwart', Profiel: 'Rhombus' },
    images: [
      'https://www.mthekwerken.nl/wp-content/uploads/Gevelbekleding-zwart-533x355-1.png',
      'https://www.mthekwerken.nl/wp-content/uploads/gevelbeklding-zwart-twee-300x200-2.png',
      'https://www.mthekwerken.nl/wp-content/uploads/Gevelbekleding-zwart-300x400-2.jpg',
    ],
    deliveryTime: 'Tussen de 2 en 15 werkdagen',
    highlights: ['Moderne zwarte uitstraling', 'Co-extrusie beschermlaag', 'Kleurvast', 'Onderhoudsvrij'],
    dimensions: { length: '290 cm', width: '20 cm', thickness: '2,1 cm', coverage: '0,58 m² per plank' },
    faq: [
      { question: 'Wordt de zwarte kleur niet te warm in de zon?', answer: 'Composiet kan in direct zonlicht iets warmer worden, maar de co-extrusie beschermlaag voorkomt verkleuring of vervorming. De planken zijn specifiek ontworpen om temperatuurwisselingen te weerstaan.' },
      { question: 'Hoe reinig ik zwarte gevelbekleding?', answer: 'Reinig de planken eenvoudig met lauwwarm water en een zachte borstel. Voor hardnekkig vuil kunt u een mild schoonmaakmiddel gebruiken. Gebruik nooit een hogedrukreiniger.' },
      { question: 'Hoe monteer ik de gevelbekleding?', answer: 'Bevestig de planken op een aluminium regelwerk met de meegeleverde RVS schroeven. Houd minimaal 25mm ventilatieopening aan achter de planken.' },
    ],
  },
  {
    id: 'gv-4',
    name: 'Composiet gevelbekleding Rhombus Walnoot',
    price: 25.95,
    priceLabel: '€25,95 per stuk',
    image: 'https://www.mthekwerken.nl/wp-content/uploads/Walnoot-gevelbekleding-533x355-1-300x200.png',
    category: 'gevelbekleding',
    features: ['Co-Extrusie beschermlaag', 'Eigen bezorgservice'],
    guarantee: '15 jaar garantie',
    slug: 'rhombus-walnoot',
    tone: 'walnoot',
    durability: 'premium',
    productType: 'plank',
    description: 'Warme walnoottint met natuurlijke houtnerf structuur. De composiet gevelbekleding Rhombus Walnoot biedt de luxe uitstraling van echt hout zonder het onderhoud.',
    seoTitle: 'Composiet Gevelbekleding Rhombus Walnoot | €25,95',
    seoDescription: 'Composiet gevelbekleding Rhombus Walnoot met warme houtlook en co-extrusie beschermlaag. Onderhoudsvrij, 15 jaar garantie. Bestel bij Composiethekwerk.nl.',
    longDescription: `## Composiet gevelbekleding Rhombus Walnoot

Geef jouw woning een luxe, warme uitstraling met onze composiet gevelbekleding Rhombus in de kleur Walnoot. De donkere, rijke walnoottint met natuurlijke houtnerf structuur biedt de uitstraling van echt hout zonder het onderhoud.

### Duurzaam en onderhoudsvrij

Dankzij de combinatie van gerecycled kunststof en houtvezels is deze gevelbekleding ongevoelig voor rot, schimmel en verkleuring. De co-extrusie beschermlaag zorgt voor langdurige kleurvastheid. Je hoeft nooit meer te schilderen. De vochtopname is 0%.

### Flexibele montage

Horizontale of verticale plaatsing — beide zijn mogelijk. De planken worden eenvoudig vastgeschroefd op het regelwerk. Standaard worden schroeven meegeleverd. Planken zijn gemakkelijk op maat te maken.

### Voordelen in één oogopslag

- Rijke, warme walnoottint met natuurlijke houtnerf
- Duurzame co-extrusie beschermlaag
- 95% gerecycled materiaal
- Kleurvast, rotvrij en onderhoudsarm
- Geen schilderwerk nodig
- Geschikt voor elk klimaat`,
    specifications: { Lengte: '290 cm', Breedte: '20 cm', Dikte: '2,1 cm', Oppervlakte: '0,58 m² per plank', Materiaal: 'Composiet met co-extrusie toplaag', Kleur: 'Walnoot', Profiel: 'Rhombus' },
    images: [
      'https://www.mthekwerken.nl/wp-content/uploads/Walnoot-gevelbekleding-533x355-1.png',
      'https://www.mthekwerken.nl/wp-content/uploads/walnoot-gevelbekleding-twee-300x200-2.png',
      'https://www.mthekwerken.nl/wp-content/uploads/Gevelbekleding-Walnoot-300x169-2.jpg',
    ],
    deliveryTime: 'Tussen de 2 en 15 werkdagen',
    highlights: ['Luxe walnoottint', 'Natuurlijke houtnerf', 'Co-extrusie beschermlaag', 'Onderhoudsvrij'],
    dimensions: { length: '290 cm', width: '20 cm', thickness: '2,1 cm', coverage: '0,58 m² per plank' },
    faq: [
      { question: 'Verschilt de Walnoot kleur van Teak?', answer: 'Ja, de Walnoot kleur is donkerder en rijker dan Teak. Walnoot heeft een diepbruine tint, terwijl Teak meer goudbruin is. Bestel een gratis sample om het verschil te zien.' },
      { question: 'Hoe lang gaat composiet gevelbekleding mee?', answer: 'Met de co-extrusie beschermlaag gaat onze gevelbekleding minimaal 15 jaar mee zonder onderhoud. De planken zijn bestand tegen alle weersomstandigheden.' },
      { question: 'Kan ik de planken zelf monteren?', answer: 'Ja, de montage is eenvoudig. Bevestig een aluminium regelwerk op de gevel en schroef de planken daarop vast. Met elke plank worden schroeven meegeleverd.' },
    ],
  },
  {
    id: 'gv-5',
    name: 'Composiet gevelbekleding Rhombus Eiken',
    price: 25.95,
    priceLabel: '€25,95 per stuk',
    image: 'https://www.mthekwerken.nl/wp-content/uploads/gevelbekleding-eiken-533x355-1-300x200.png',
    category: 'gevelbekleding',
    features: ['Co-Extrusie beschermlaag', 'Eigen bezorgservice'],
    guarantee: '15 jaar garantie',
    slug: 'rhombus-eiken',
    tone: 'eiken',
    durability: 'premium',
    productType: 'plank',
    description: 'De composiet gevelbekleding Rhombus Eiken heeft een lichte, warme eikenkleur die perfect past bij zowel moderne als landelijke architectuur. Voorzien van co-extrusie beschermlaag.',
    seoTitle: 'Composiet Gevelbekleding Rhombus Eiken Kopen | €25,95',
    seoDescription: 'Composiet gevelbekleding Rhombus Eiken met warme eikenkleur en co-extrusie beschermlaag. Onderhoudsvrij, 15 jaar garantie. Bestel bij Composiethekwerk.nl.',
    longDescription: `## Composiet gevelbekleding Rhombus Eiken

De composiet gevelbekleding Rhombus Eiken heeft een lichte, warme eikenkleur die perfect past bij zowel moderne als landelijke architectuur. De planken zijn voorzien van een co-extrusie beschermlaag voor langdurige bescherming.

### Duurzaam en onderhoudsvrij

Geproduceerd uit 95% gerecycled materiaal, zijn deze planken ongevoelig voor rot, schimmel en verkleuring. De vochtopname is 0% — geen schilderwerk, geen onderhoud. Gewoon reinigen met water en een zachte borstel.

### Flexibele montage

Monteer horizontaal of verticaal op een aluminium regelwerk. Schroeven worden standaard meegeleverd. De planken zijn eenvoudig op maat te maken met een cirkelzaag.

### Voordelen in één oogopslag

- Warme, lichte eikenkleur
- Co-extrusie beschermlaag voor UV-bescherming
- 95% gerecycled materiaal
- Kleurvast en rotvrij
- Past bij moderne én landelijke architectuur
- Eenvoudige montage met meegeleverde schroeven`,
    specifications: { Lengte: '290 cm', Breedte: '20 cm', Dikte: '2,1 cm', Oppervlakte: '0,58 m² per plank', Materiaal: 'Composiet met co-extrusie toplaag', Kleur: 'Eiken', Profiel: 'Rhombus' },
    images: [
      'https://www.mthekwerken.nl/wp-content/uploads/gevelbekleding-eiken-533x355-1.png',
      'https://www.mthekwerken.nl/wp-content/uploads/Oak-2-300x200-1.png',
    ],
    deliveryTime: 'Tussen de 2 en 15 werkdagen',
    highlights: ['Warme eikenkleur', 'Natuurlijke uitstraling', 'Co-extrusie beschermlaag', 'Onderhoudsvrij'],
    dimensions: { length: '290 cm', width: '20 cm', thickness: '2,1 cm', coverage: '0,58 m² per plank' },
    faq: [
      { question: 'Past de eikenkleur bij een landelijke woning?', answer: 'Absoluut. De warme, lichte eikenkleur past uitstekend bij landelijke, moderne en zelfs industriële architectuurstijlen. Combineer met houten accenten voor een harmonieus geheel.' },
      { question: 'Hoe lang blijft de kleur mooi?', answer: 'Dankzij de co-extrusie beschermlaag blijft de eikenkleur jarenlang kleurvast. De planken zijn UV-bestendig en verkleuren niet door zonlicht.' },
      { question: 'Kan ik een sample bestellen?', answer: 'Ja, u kunt een gratis sample aanvragen via onze website. Zo kunt u de kleur en kwaliteit thuis ervaren voordat u bestelt.' },
    ],
  },
  {
    id: 'gv-6',
    name: 'Composiet gevelbekleding Rhombus Grijs/Zwart',
    price: 25.95,
    priceLabel: '€25,95 per stuk',
    image: 'https://www.mthekwerken.nl/wp-content/uploads/gevelbekleding-grijszwart-300x200.png',
    category: 'gevelbekleding',
    features: ['Co-Extrusie beschermlaag', 'Eigen bezorgservice'],
    guarantee: '15 jaar garantie',
    slug: 'rhombus-grijs-zwart',
    tone: 'grijs',
    durability: 'premium',
    productType: 'plank',
    description: 'Stijlvolle combinatie van grijs en zwart in één plank. Ideaal voor een industriële of moderne gevelafwerking. Twee kleuren, één plank.',
    seoTitle: 'Composiet Gevelbekleding Rhombus Grijs/Zwart | €25,95',
    seoDescription: 'Composiet gevelbekleding met twee kleuren: Grijs en Zwart in één plank. Industriële look, co-extrusie beschermlaag, 15 jaar garantie. Bestel nu.',
    longDescription: `## Composiet gevelbekleding Rhombus Grijs/Zwart

Een stijlvolle combinatie van grijs en zwart in één plank. Ideaal voor een industriële of moderne gevelafwerking. Kies zelf welke zijde u naar buiten richt, of combineer beide voor een uniek ontwerp.

### Duurzaam en onderhoudsvrij

De planken zijn vervaardigd uit 95% gerecycled materiaal en voorzien van een co-extrusie beschermlaag. Hierdoor zijn ze ongevoelig voor rot, schimmel en verkleuring. De vochtopname is 0%.

### Flexibele montage

Monteer horizontaal of verticaal op een aluminium regelwerk. Schroeven worden meegeleverd. Planken zijn eenvoudig op maat te zagen.

### Voordelen in één oogopslag

- Twee kleuren in één plank: Grijs en Zwart
- Industriële, moderne uitstraling
- Co-extrusie beschermlaag
- 95% gerecycled materiaal
- Onderhoudsvrij en kleurvast
- Flexibele montage in twee richtingen`,
    specifications: { Lengte: '290 cm', Breedte: '20 cm', Dikte: '2,1 cm', Oppervlakte: '0,58 m² per plank', Materiaal: 'Composiet met co-extrusie toplaag', Kleur: 'Grijs / Zwart', Profiel: 'Rhombus' },
    images: [
      'https://www.mthekwerken.nl/wp-content/uploads/gevelbekleding-grijszwart.png',
    ],
    deliveryTime: 'Tussen de 2 en 15 werkdagen',
    highlights: ['Twee kleuren in één plank', 'Industriële look', 'Co-extrusie beschermlaag', 'Onderhoudsvrij'],
    dimensions: { length: '290 cm', width: '20 cm', thickness: '2,1 cm', coverage: '0,58 m² per plank' },
    faq: [
      { question: 'Wat is het verschil met de Teak/Zwart variant?', answer: 'De Grijs/Zwart variant heeft een koelere, industriële uitstraling. De Teak/Zwart combineert warmte met modern. Kies op basis van de stijl van uw woning.' },
      { question: 'Kan ik beide kanten afwisselend gebruiken?', answer: 'Ja, u kunt per plank kiezen welke zijde naar buiten wijst. Dit maakt creatieve ontwerpen mogelijk, bijvoorbeeld een patroon van afwisselend grijs en zwart.' },
      { question: 'Hoe onderhoud ik de planken?', answer: 'Praktisch geen onderhoud nodig. Reinig de planken één tot twee keer per jaar met lauwwarm water en een zachte borstel om vuil te verwijderen.' },
    ],
  },
  {
    id: 'gv-7',
    name: 'Hoekprofiel Composiet gevelbekleding Teak',
    price: 19.95,
    priceLabel: '€19,95 per stuk',
    image: 'https://www.mthekwerken.nl/wp-content/uploads/composiet-hoekprofiel-teak-533x355-1-300x200.png',
    category: 'gevelbekleding',
    features: ['Strakke afwerking', 'Eigen bezorgservice'],
    guarantee: '15 jaar garantie',
    slug: 'hoekprofiel-teak',
    tone: 'teak',
    durability: 'premium',
    productType: 'profiel',
    description: 'Het composiet hoekprofiel in Teak zorgt voor een strakke en professionele afwerking van uw gevelbekleding op hoeken en randen. Perfect passend bij de Rhombus gevelbekleding.',
    seoTitle: 'Hoekprofiel Composiet Gevelbekleding Teak | €19,95',
    seoDescription: 'Composiet hoekprofiel Teak voor een strakke hoekafwerking van uw gevelbekleding. Passend bij Rhombus gevelbekleding. Bestel bij Composiethekwerk.nl.',
    longDescription: `## Hoekprofiel Composiet gevelbekleding Teak

Het composiet hoekprofiel in Teak zorgt voor een strakke en professionele afwerking van uw gevelbekleding op hoeken en randen. Het profiel past perfect bij de Rhombus gevelbekleding in de kleur Teak.

### Waarom een hoekprofiel?

Hoeken en randen zijn het visitekaartje van een gevelafwerking. Met het composiet hoekprofiel creëert u een naadloze overgang op buitenhoeken. Het profiel wordt eenvoudig over de hoek geplaatst en vastgeschroefd.

### Voordelen

- Strakke, professionele hoekafwerking
- Perfect passend bij Rhombus gevelbekleding Teak
- Eenvoudige montage
- Zelfde co-extrusie kwaliteit als de gevelbekleding
- 290 cm lang — zelfde lengte als de gevelplanken`,
    specifications: { Lengte: '290 cm', Materiaal: 'Composiet', Kleur: 'Teak', Type: 'Hoekprofiel' },
    images: [
      'https://www.mthekwerken.nl/wp-content/uploads/composiet-hoekprofiel-teak-533x355-1-300x200.png',
    ],
    deliveryTime: 'Tussen de 2 en 15 werkdagen',
    highlights: ['Strakke hoekafwerking', 'Passend bij Rhombus gevelbekleding', 'Eenvoudige montage'],
    faq: [
      { question: 'Heb ik hoekprofielen nodig?', answer: 'Hoekprofielen zijn niet verplicht maar geven een veel strakker eindresultaat. Zonder hoekprofiel zijn de kopse kanten van de planken zichtbaar op de hoeken.' },
      { question: 'Hoeveel hoekprofielen heb ik nodig?', answer: 'U heeft één hoekprofiel per buitenhoek nodig. Meet de hoogte van de hoek en deel door 290 cm (de lengte van het profiel) om het aantal te bepalen.' },
    ],
  },
  {
    id: 'gv-8',
    name: 'Hoekprofiel Composiet gevelbekleding Zwart',
    price: 19.95,
    priceLabel: '€19,95 per stuk',
    image: 'https://www.mthekwerken.nl/wp-content/uploads/Composiet-hoekprofiel-zwart-533x355-1-300x200.png',
    category: 'gevelbekleding',
    features: ['Strakke afwerking', 'Eigen bezorgservice'],
    guarantee: '15 jaar garantie',
    slug: 'hoekprofiel-zwart',
    tone: 'zwart',
    durability: 'premium',
    productType: 'profiel',
    description: 'Het composiet hoekprofiel in Zwart voor een strakke afwerking van uw zwarte gevelbekleding. Passend bij alle zwarte Rhombus gevelbekleding varianten.',
    seoTitle: 'Hoekprofiel Composiet Gevelbekleding Zwart | €19,95',
    seoDescription: 'Composiet hoekprofiel Zwart voor strakke hoekafwerking. Passend bij alle zwarte Rhombus gevelbekleding. Bestel bij Composiethekwerk.nl.',
    longDescription: `## Hoekprofiel Composiet gevelbekleding Zwart

Het composiet hoekprofiel in Zwart zorgt voor een strakke, naadloze afwerking van uw zwarte gevelbekleding op hoeken en randen. Past bij alle zwarte Rhombus gevelbekleding varianten.

### Waarom een hoekprofiel?

Met het composiet hoekprofiel worden kopse kanten netjes afgedekt voor een professioneel eindresultaat. Het profiel wordt eenvoudig over de hoek geplaatst en vastgeschroefd.

### Voordelen

- Strakke, professionele hoekafwerking
- Passend bij alle zwarte gevelbekleding varianten
- Eenvoudige montage
- Zelfde kwaliteit als de gevelbekleding
- 290 cm lang`,
    specifications: { Lengte: '290 cm', Materiaal: 'Composiet', Kleur: 'Zwart', Type: 'Hoekprofiel' },
    images: [
      'https://www.mthekwerken.nl/wp-content/uploads/Composiet-hoekprofiel-zwart-533x355-1-300x200.png',
    ],
    deliveryTime: 'Tussen de 2 en 15 werkdagen',
    highlights: ['Strakke hoekafwerking', 'Passend bij zwarte gevelbekleding', 'Eenvoudige montage'],
    faq: [
      { question: 'Past dit hoekprofiel bij de Grijs/Zwart gevelbekleding?', answer: 'Ja, het zwarte hoekprofiel past uitstekend bij zowel de Rhombus Zwart als de Rhombus Grijs/Zwart gevelbekleding.' },
      { question: 'Hoe bevestig ik het hoekprofiel?', answer: 'Het hoekprofiel wordt met RVS schroeven op het regelwerk bevestigd, vóórdat de gevelplanken worden gemonteerd. Zo ontstaat een strakke, naadloze overgang.' },
    ],
  },

  // ─── SCHUTTINGEN ──────────────────────────────────────────────
  {
    id: 'sc-1',
    name: 'Composiet schutting Rhombus Teak',
    price: 139.95,
    priceLabel: 'Vanaf €139,95',
    image: 'https://www.mthekwerken.nl/wp-content/uploads/macom-modern-teak-product-foto-4-300x200.png',
    category: 'schuttingen',
    features: ['Extra dikke 2,5cm plank', 'Eenvoudig te monteren'],
    guarantee: '15 jaar garantie',
    slug: 'schutting-rhombus-teak',
    tone: 'teak',
    durability: 'premium',
    productType: 'paneel',
    description: 'De composiet schutting Rhombus Teak combineert privacy met een stijlvolle, moderne uitstraling. De extra dikke planken van 2,5 cm zorgen voor een robuust en stevig scherm. Het rhombus profiel creëert een schaduwwerking die de schutting extra diepte geeft.',
    seoTitle: 'Composiet Schutting Rhombus Teak Kopen | Vanaf €139,95',
    seoDescription: 'Composiet schutting Rhombus Teak met extra dikke 2,5cm planken en co-extrusie beschermlaag. Onderhoudsvrij, 15 jaar garantie. Bestel bij Composiethekwerk.nl.',
    longDescription: `## Composiet schutting Rhombus Teak

De composiet schutting Rhombus Teak combineert privacy met een stijlvolle, moderne uitstraling. De extra dikke planken van 2,5 cm zorgen voor een robuust en stevig scherm. Het rhombus profiel creëert een schaduwwerking die de schutting extra diepte en karakter geeft.

### Duurzaam en onderhoudsvrij

Vervaardigd uit gerecycled kunststof en houtvezels met een co-extrusie beschermlaag. De schutting is ongevoelig voor rot, schimmel en verkleuring. Geen schilderwerk, geen onderhoud — gewoon genieten van een mooie erfafscheiding. De vochtopname is 0%.

### Eenvoudige montage

Het schuttingsysteem werkt met aluminium palen (apart verkrijgbaar) en U-profielen. De planken schuif je eenvoudig in de palen. Geen ingewikkeld gereedschap nodig. Beschikbaar in 180 cm of 200 cm hoogte.

### Voordelen in één oogopslag

- Extra dikke 2,5 cm planken voor maximale stevigheid
- Rhombus profiel met schaduwwerking
- Co-extrusie beschermlaag voor kleurvastheid
- Onderhoudsvrij — nooit meer schilderen of beitsen
- Eenvoudig zelf te monteren
- Beschikbaar in 180 cm en 200 cm hoogte`,
    specifications: { Hoogte: '180 cm of 200 cm', Breedte: '180 cm', Plankdikte: '2,5 cm', Materiaal: 'Composiet met co-extrusie toplaag', Kleur: 'Teak', Profiel: 'Rhombus', Palen: 'Aluminium (apart verkrijgbaar)' },
    images: [
      'https://www.mthekwerken.nl/wp-content/uploads/macom-modern-teak-product-foto-4.png',
      'https://www.mthekwerken.nl/wp-content/uploads/PHOTO-2025-05-15-18-27-42.jpg',
      'https://www.mthekwerken.nl/wp-content/uploads/foto-rhombus-Teak-1.jpg',
      'https://www.mthekwerken.nl/wp-content/uploads/IMG_2101-3-4.jpg',
      'https://www.mthekwerken.nl/wp-content/uploads/IMG_5099-9.jpg',
      'https://www.mthekwerken.nl/wp-content/uploads/IMG_3952-4.jpg',
      'https://www.mthekwerken.nl/wp-content/uploads/IMG_4881-3.jpg',
      'https://www.mthekwerken.nl/wp-content/uploads/Macom-composiet-plank-modern-teak-5.png',
    ],
    deliveryTime: 'Tussen de 2 en 15 werkdagen',
    highlights: ['Extra dikke 2,5 cm planken', 'Rhombus profiel met schaduwwerking', 'Eenvoudige montage', 'Onderhoudsvrij', '15 jaar garantie'],
    options: [
      { label: 'Hoogte', values: ['180 cm', '200 cm'] },
    ],
    faq: [
      { question: 'Wat zit er bij een schuttingpakket?', answer: 'Een schuttingpakket bevat alle composiet planken en U-profielen (boven en onder) voor één scherm. Aluminium palen zijn apart verkrijgbaar.' },
      { question: 'Hoe breed is een scherm?', answer: 'Elk scherm is 180 cm breed (hart-op-hart). De planken worden tussen twee aluminium palen geplaatst.' },
      { question: 'Kan ik de schutting zelf plaatsen?', answer: 'Ja, de montage is eenvoudig. Plaats de aluminium palen in de grond (met betonvoet), schuif de U-profielen in de palen en leg de planken erin. Twee personen kunnen een scherm in minder dan een uur plaatsen.' },
      { question: 'Wat is het verschil tussen Rhombus en Houtnerf profiel?', answer: 'Het Rhombus profiel heeft schuine groeven die een schaduwwerking creëren. Het Houtnerf profiel heeft een meer traditionele houtstructuur. Beide zijn voorzien van dezelfde co-extrusie beschermlaag.' },
    ],
  },
  {
    id: 'sc-2',
    name: 'Composiet schutting Teak',
    price: 139.95,
    priceLabel: 'Vanaf €139,95',
    image: 'https://www.mthekwerken.nl/wp-content/uploads/Macom-composiet-teak-product-foto-4-300x200.png',
    category: 'schuttingen',
    features: ['Extra dikke 2,5cm plank', 'Eenvoudig te monteren'],
    guarantee: '15 jaar garantie',
    slug: 'schutting-teak',
    tone: 'teak',
    durability: 'premium',
    productType: 'paneel',
    description: 'De composiet schutting Teak met houtnerf profiel. Een warme, natuurlijke uitstraling dankzij de realistische houtnerf structuur. Extra dikke planken van 2,5 cm voor maximale stevigheid.',
    seoTitle: 'Composiet Schutting Teak Houtnerf Kopen | Vanaf €139,95',
    seoDescription: 'Composiet schutting Teak met realistisch houtnerf profiel en extra dikke 2,5cm planken. Onderhoudsvrij, 15 jaar garantie. Bestel bij Composiethekwerk.nl.',
    longDescription: `## Composiet schutting Teak met Houtnerf profiel

De composiet schutting Teak met houtnerf profiel biedt een warme, natuurlijke uitstraling dankzij de realistische houtnerf structuur. Extra dikke planken van 2,5 cm zorgen voor maximale stevigheid en een robuust gevoel.

### Duurzaam en onderhoudsvrij

Vervaardigd uit gerecycled kunststof en houtvezels met co-extrusie beschermlaag. Geen rot, geen schimmel, geen verkleuring. De vochtopname is 0% — de schutting behoudt jarenlang zijn mooie uitstraling zonder onderhoud.

### Eenvoudige montage

Het systeem werkt met aluminium palen en U-profielen. Planken schuif je eenvoudig in de palen. Beschikbaar in 180 cm of 200 cm hoogte.

### Voordelen in één oogopslag

- Realistische houtnerf structuur
- Extra dikke 2,5 cm planken
- Co-extrusie beschermlaag
- Onderhoudsvrij — nooit meer schilderen
- Eenvoudig zelf te monteren
- Beschikbaar in twee hoogtes`,
    specifications: { Hoogte: '180 cm of 200 cm', Breedte: '180 cm', Plankdikte: '2,5 cm', Materiaal: 'Composiet met co-extrusie toplaag', Kleur: 'Teak', Profiel: 'Houtnerf' },
    images: [
      'https://www.mthekwerken.nl/wp-content/uploads/Macom-composiet-teak-product-foto-4.png',
      'https://www.mthekwerken.nl/wp-content/uploads/IMG_6598-scaled.jpg',
      'https://www.mthekwerken.nl/wp-content/uploads/Houtnerf-Teak-schutting-foto.jpg',
      'https://www.mthekwerken.nl/wp-content/uploads/IMG_4236-2.jpg',
      'https://www.mthekwerken.nl/wp-content/uploads/IMG_4238-2.jpg',
      'https://www.mthekwerken.nl/wp-content/uploads/Macom-composiet-plank-teak-hout-nerf-5.png',
      'https://www.mthekwerken.nl/wp-content/uploads/Macom-composiet-plank-teak-brushed-5.png',
    ],
    deliveryTime: 'Tussen de 2 en 15 werkdagen',
    highlights: ['Realistische houtnerf', 'Extra dikke 2,5 cm planken', 'Onderhoudsvrij', 'Eenvoudige montage'],
    options: [
      { label: 'Hoogte', values: ['180 cm', '200 cm'] },
    ],
    faq: [
      { question: 'Wat is het verschil met de Rhombus Teak?', answer: 'De Houtnerf Teak heeft een traditionele houtstructuur, terwijl de Rhombus Teak schuine groeven heeft voor een moderner uiterlijk met schaduwwerking. Beide zijn voorzien van co-extrusie beschermlaag.' },
      { question: 'Heb ik speciale palen nodig?', answer: 'Ja, u heeft aluminium palen nodig die apart verkrijgbaar zijn. De palen worden in de grond geplaatst met een betonvoet en de planken schuif je erin.' },
      { question: 'Hoeveel schermen heb ik nodig?', answer: 'Meet de totale lengte van uw erfafscheiding en deel door 1,80 m (de breedte van een scherm). Vergeet niet de aluminium palen mee te tellen — u heeft altijd één paal meer nodig dan het aantal schermen.' },
    ],
  },
  {
    id: 'sc-3',
    name: 'Composiet schutting Rhombus Zwart',
    price: 139.95,
    priceLabel: 'Vanaf €139,95',
    image: 'https://www.mthekwerken.nl/wp-content/uploads/Macom-composiet-modern-zwart-product-foto-4-300x200.png',
    category: 'schuttingen',
    features: ['Extra dikke 2,5cm plank', 'Eenvoudig te monteren'],
    guarantee: '15 jaar garantie',
    slug: 'schutting-rhombus-zwart',
    tone: 'zwart',
    durability: 'premium',
    productType: 'paneel',
    description: 'Strakke zwarte composiet schutting met rhombus profiel. De donkere kleur in combinatie met het rhombus profiel creëert een moderne, tijdloze erfafscheiding.',
    seoTitle: 'Composiet Schutting Rhombus Zwart Kopen | Vanaf €139,95',
    seoDescription: 'Zwarte composiet schutting met rhombus profiel en 2,5cm dikke planken. Moderne uitstraling, onderhoudsvrij, 15 jaar garantie. Bestel online.',
    longDescription: `## Composiet schutting Rhombus Zwart

Een strakke, zwarte composiet schutting met rhombus profiel voor een moderne, tijdloze erfafscheiding. De donkere kleur in combinatie met het rhombus profiel creëert diepte en karakter.

### Duurzaam en onderhoudsvrij

De schutting is vervaardigd uit gerecycled kunststof en houtvezels met co-extrusie beschermlaag. Geen rot, geen schimmel, geen verkleuring. De vochtopname is 0%. Zwarte schuttingen blijven dankzij de beschermlaag kleurvast — ook na jaren in de zon.

### Eenvoudige montage

Aluminium palen (apart verkrijgbaar) en U-profielen maken de montage eenvoudig. Planken schuif je in de palen. Beschikbaar in 180 cm of 200 cm hoogte.

### Voordelen in één oogopslag

- Strakke, moderne zwarte uitstraling
- Rhombus profiel met schaduwwerking
- Extra dikke 2,5 cm planken
- Co-extrusie beschermlaag voor kleurvastheid
- Onderhoudsvrij
- Eenvoudig zelf te monteren`,
    specifications: { Hoogte: '180 cm of 200 cm', Breedte: '180 cm', Plankdikte: '2,5 cm', Materiaal: 'Composiet met co-extrusie toplaag', Kleur: 'Zwart', Profiel: 'Rhombus' },
    images: [
      'https://www.mthekwerken.nl/wp-content/uploads/Macom-composiet-modern-zwart-product-foto-4.png',
      'https://www.mthekwerken.nl/wp-content/uploads/IMG_2102-1-4.jpg',
      'https://www.mthekwerken.nl/wp-content/uploads/foto-Rhombus-zwart-scaled-4.jpg',
      'https://www.mthekwerken.nl/wp-content/uploads/Rhombus-zwart-met-hekwerk-scaled-3.jpg',
      'https://www.mthekwerken.nl/wp-content/uploads/Rhombus-zwart-met-staafmat-hekwerk-scaled-3.jpg',
      'https://www.mthekwerken.nl/wp-content/uploads/Macom-composiet-modern-zwart-plank-6.png',
    ],
    deliveryTime: 'Tussen de 2 en 15 werkdagen',
    highlights: ['Moderne zwarte uitstraling', 'Rhombus profiel', 'Extra dikke planken', 'Onderhoudsvrij'],
    options: [
      { label: 'Hoogte', values: ['180 cm', '200 cm'] },
    ],
    faq: [
      { question: 'Blijft de zwarte kleur mooi?', answer: 'Ja, dankzij de co-extrusie beschermlaag blijft de zwarte kleur jarenlang intens. De planken zijn UV-bestendig en verkleuren niet door zonlicht.' },
      { question: 'Kan ik de schutting combineren met hekwerk?', answer: 'Ja, onze composiet schuttingen zijn uitstekend te combineren met staafmat hekwerk of spijlen hekwerk. Veel klanten gebruiken een combinatie voor een afwisselend tuinontwerp.' },
      { question: 'Hoe plaats ik de aluminium palen?', answer: 'De aluminium palen worden in de grond geplaatst met een betonvoet. Zorg voor een goede fundering en waterpas plaatsing. De planken schuif je vervolgens in de gleuf van de palen.' },
    ],
  },
  {
    id: 'sc-4',
    name: 'Composiet schutting Zwart',
    price: 139.95,
    priceLabel: 'Vanaf €139,95',
    image: 'https://www.mthekwerken.nl/wp-content/uploads/Macom-composiet-zwart-product-foto-4-300x200.png',
    category: 'schuttingen',
    features: ['Extra dikke 2,5cm plank', 'Eenvoudig te monteren'],
    guarantee: '15 jaar garantie',
    slug: 'schutting-zwart',
    tone: 'zwart',
    durability: 'premium',
    productType: 'paneel',
    description: 'De composiet schutting Zwart met houtnerf profiel. Stijlvol en modern met een subtiele houtnerf structuur die diepte toevoegt aan het zwarte oppervlak.',
    seoTitle: 'Composiet Schutting Zwart Houtnerf Kopen | Vanaf €139,95',
    seoDescription: 'Zwarte composiet schutting met houtnerf profiel en extra dikke 2,5cm planken. Stijlvol, onderhoudsvrij, 15 jaar garantie. Bestel bij Composiethekwerk.nl.',
    longDescription: `## Composiet schutting Zwart met Houtnerf profiel

De composiet schutting Zwart met houtnerf profiel is stijlvol en modern. De subtiele houtnerf structuur voegt diepte toe aan het zwarte oppervlak voor een verfijnd resultaat.

### Duurzaam en onderhoudsvrij

Vervaardigd uit gerecycled materiaal met co-extrusie beschermlaag. Ongevoelig voor rot, schimmel en verkleuring. 0% vochtopname — de schutting vervormt niet en hoeft nooit geschilderd te worden.

### Eenvoudige montage

Aluminium palen en U-profielen maken de montage eenvoudig. Beschikbaar in 180 cm of 200 cm hoogte.

### Voordelen in één oogopslag

- Subtiele houtnerf structuur op zwart
- Extra dikke 2,5 cm planken
- Co-extrusie beschermlaag
- Onderhoudsvrij
- Eenvoudig te monteren
- Twee hoogte-opties beschikbaar`,
    specifications: { Hoogte: '180 cm of 200 cm', Breedte: '180 cm', Plankdikte: '2,5 cm', Materiaal: 'Composiet met co-extrusie toplaag', Kleur: 'Zwart', Profiel: 'Houtnerf' },
    images: [
      'https://www.mthekwerken.nl/wp-content/uploads/Macom-composiet-zwart-product-foto-4.png',
      'https://www.mthekwerken.nl/wp-content/uploads/1a56baf3-a4e2-4a52-a625-8d570949cc34-4.jpg',
      'https://www.mthekwerken.nl/wp-content/uploads/schutting-houtnerf-zwart-scaled-4.jpg',
      'https://www.mthekwerken.nl/wp-content/uploads/geborsteld-xwart-foto-3-4.jpg',
      'https://www.mthekwerken.nl/wp-content/uploads/Houtnerf-zwart-foto-bewerkt-scaled-3.jpg',
      'https://www.mthekwerken.nl/wp-content/uploads/Geborsteld-zwart-foto-scaled-3.jpg',
      'https://www.mthekwerken.nl/wp-content/uploads/IMG_2104-1-4.jpg',
      'https://www.mthekwerken.nl/wp-content/uploads/Macom-composiet-plank-zwart-hout-nerf-5.png',
      'https://www.mthekwerken.nl/wp-content/uploads/Macom-composiet-plank-zwart-geborsteld-1-5.png',
    ],
    deliveryTime: 'Tussen de 2 en 15 werkdagen',
    highlights: ['Houtnerf profiel', 'Extra dikke 2,5 cm planken', 'Onderhoudsvrij', 'Eenvoudige montage'],
    options: [
      { label: 'Hoogte', values: ['180 cm', '200 cm'] },
    ],
    faq: [
      { question: 'Wat is het verschil tussen Houtnerf en Rhombus?', answer: 'Het Houtnerf profiel heeft een traditionele houtstructuur met nerven, terwijl het Rhombus profiel schuine groeven heeft voor een modernere uitstraling met schaduwwerking.' },
      { question: 'Is de houtnerf aan beide zijden?', answer: 'Ja, beide zijden hebben een houtnerf structuur. Uw buren zien dezelfde mooie afwerking als u.' },
      { question: 'Hoe onderhoud ik de schutting?', answer: 'Praktisch geen onderhoud nodig. Reinig de schutting één tot twee keer per jaar met water en een zachte borstel. Gebruik geen hogedrukreiniger.' },
    ],
  },
  {
    id: 'sc-5',
    name: 'Composiet schutting Rhombus Walnoot',
    price: 139.95,
    priceLabel: 'Vanaf €139,95',
    image: 'https://www.mthekwerken.nl/wp-content/uploads/Product-foto-Rhombus-Walnoot-4-300x200.png',
    category: 'schuttingen',
    features: ['Extra dikke 2,5cm plank', 'Onderhoudsvrij'],
    guarantee: '15 jaar garantie',
    slug: 'schutting-rhombus-walnoot',
    tone: 'walnoot',
    durability: 'premium',
    productType: 'paneel',
    description: 'De composiet schutting Rhombus Walnoot biedt een warme, donkere houtlook. Het rhombus profiel zorgt voor een speels schaduweffect dat de schutting extra karakter geeft.',
    seoTitle: 'Composiet Schutting Rhombus Walnoot | Vanaf €139,95',
    seoDescription: 'Composiet schutting Rhombus Walnoot met warme houtlook en schaduwwerking. Extra dikke 2,5cm planken, onderhoudsvrij. Bestel bij Composiethekwerk.nl.',
    longDescription: `## Composiet schutting Rhombus Walnoot

De composiet schutting Rhombus Walnoot biedt een warme, donkere houtlook. Het rhombus profiel zorgt voor een speels schaduweffect dat de schutting extra karakter en diepte geeft.

### Duurzaam en onderhoudsvrij

Vervaardigd uit gerecycled materiaal met co-extrusie beschermlaag. De warme walnoottint blijft jarenlang kleurvast. Geen rot, geen schimmel, 0% vochtopname.

### Eenvoudige montage

Aluminium palen en U-profielen. Planken inschuiven. Beschikbaar in 180 cm of 200 cm hoogte.

### Voordelen in één oogopslag

- Warme, rijke walnoottint
- Rhombus profiel met schaduwwerking
- Extra dikke 2,5 cm planken
- Co-extrusie beschermlaag
- Onderhoudsvrij
- Eenvoudig te monteren`,
    specifications: { Hoogte: '180 cm of 200 cm', Breedte: '180 cm', Plankdikte: '2,5 cm', Materiaal: 'Composiet met co-extrusie toplaag', Kleur: 'Walnoot', Profiel: 'Rhombus' },
    images: [
      'https://www.mthekwerken.nl/wp-content/uploads/Product-foto-Rhombus-Walnoot-4.png',
      'https://www.mthekwerken.nl/wp-content/uploads/Rhombus-Walnoot-scaled-3.jpg',
      'https://www.mthekwerken.nl/wp-content/uploads/IMG_2797-1.jpg',
      'https://www.mthekwerken.nl/wp-content/uploads/IMG_4918-4.jpg',
      'https://www.mthekwerken.nl/wp-content/uploads/IMG_3857.jpg',
      'https://www.mthekwerken.nl/wp-content/uploads/foto-Rhombus-Walnoot-4.jpg',
      'https://www.mthekwerken.nl/wp-content/uploads/IMG_4919-4.jpg',
      'https://www.mthekwerken.nl/wp-content/uploads/Rhombus-Walnoot-plank-4.png',
    ],
    deliveryTime: 'Tussen de 2 en 15 werkdagen',
    highlights: ['Warme walnoottint', 'Rhombus profiel', 'Extra dikke planken', 'Onderhoudsvrij'],
    options: [
      { label: 'Hoogte', values: ['180 cm', '200 cm'] },
    ],
    faq: [
      { question: 'Past walnoot bij een groene tuin?', answer: 'Ja, de warme walnoottint past uitstekend bij groen. Het donkere hout creëert een mooi contrast met planten en bomen.' },
      { question: 'Kan ik de schutting op een helling plaatsen?', answer: 'Ja, door de schermen trapsgewijs te plaatsen kunt u de schutting ook op een schuin terrein monteren. Bespreek uw situatie met onze klantenservice voor advies op maat.' },
      { question: 'Hoeveel schermen heb ik nodig?', answer: 'Meet de totale lengte van de erfafscheiding en deel door 1,80 m. U heeft altijd één paal meer nodig dan het aantal schermen.' },
    ],
  },
  {
    id: 'sc-6',
    name: 'Composiet schutting Walnoot',
    price: 139.95,
    priceLabel: 'Vanaf €139,95',
    image: 'https://www.mthekwerken.nl/wp-content/uploads/Walnoot-Houtnerf-product-foto-4-300x200.png',
    category: 'schuttingen',
    features: ['Extra dikke 2,5cm plank', 'Onderhoudsvrij'],
    guarantee: '15 jaar garantie',
    slug: 'schutting-walnoot',
    tone: 'walnoot',
    durability: 'premium',
    productType: 'paneel',
    description: 'De composiet schutting Walnoot met houtnerf profiel. Rijke walnoottint met realistische houtstructuur voor een natuurlijke look in uw tuin.',
    seoTitle: 'Composiet Schutting Walnoot Houtnerf | Vanaf €139,95',
    seoDescription: 'Composiet schutting Walnoot met realistisch houtnerf profiel. Rijke walnoottint, onderhoudsvrij, 15 jaar garantie. Bestel bij Composiethekwerk.nl.',
    longDescription: `## Composiet schutting Walnoot met Houtnerf profiel

De composiet schutting Walnoot met houtnerf profiel biedt een rijke walnoottint met realistische houtstructuur. Perfect voor een natuurlijke, warme look in uw tuin.

### Duurzaam en onderhoudsvrij

Co-extrusie beschermlaag, gerecycled materiaal, 0% vochtopname. Geen rot, geen schimmel, geen schilderwerk. De walnoottint blijft jarenlang kleurvast.

### Eenvoudige montage

Aluminium palen en U-profielen. Planken inschuiven. 180 cm of 200 cm hoogte beschikbaar.

### Voordelen in één oogopslag

- Realistische houtnerf structuur
- Rijke walnoottint
- Extra dikke 2,5 cm planken
- Co-extrusie beschermlaag
- Onderhoudsvrij
- Twee hoogte-opties`,
    specifications: { Hoogte: '180 cm of 200 cm', Breedte: '180 cm', Plankdikte: '2,5 cm', Materiaal: 'Composiet met co-extrusie toplaag', Kleur: 'Walnoot', Profiel: 'Houtnerf' },
    images: [
      'https://www.mthekwerken.nl/wp-content/uploads/Walnoot-Houtnerf-product-foto-4.png',
      'https://www.mthekwerken.nl/wp-content/uploads/Walnoot-Geborsteld-product-foto-3.png',
      'https://www.mthekwerken.nl/wp-content/uploads/Geborsteld-Walnoot-foto-scaled-3.jpg',
      'https://www.mthekwerken.nl/wp-content/uploads/Houtnerf-walnoot-foto-1-4.jpg',
      'https://www.mthekwerken.nl/wp-content/uploads/Walnoot-Geborsteld-dichtbij-scaled-3.jpg',
      'https://www.mthekwerken.nl/wp-content/uploads/Walnoot-Houtnerf-dichtbij-scaled-3.jpg',
      'https://www.mthekwerken.nl/wp-content/uploads/Walnoot-Houtnerf-Plank-5.png',
      'https://www.mthekwerken.nl/wp-content/uploads/Walnoot-geborsteld-plank-5.png',
    ],
    deliveryTime: 'Tussen de 2 en 15 werkdagen',
    highlights: ['Realistische houtnerf', 'Warme walnoottint', 'Extra dikke planken', 'Onderhoudsvrij'],
    options: [
      { label: 'Hoogte', values: ['180 cm', '200 cm'] },
    ],
    faq: [
      { question: 'Wat is het verschil met de Rhombus Walnoot?', answer: 'De Houtnerf variant heeft een traditionele houtstructuur met nerven, terwijl de Rhombus schuine groeven heeft voor een modernere uitstraling. De kleur is hetzelfde.' },
      { question: 'Zien beide kanten er hetzelfde uit?', answer: 'Ja, beide zijden hebben dezelfde houtnerf structuur. Uw buren genieten van dezelfde mooie afwerking.' },
      { question: 'Hoe lang gaat de schutting mee?', answer: 'Met de co-extrusie beschermlaag gaat de schutting minimaal 15 jaar mee zonder onderhoud. De planken zijn bestand tegen alle weersomstandigheden.' },
    ],
  },
  {
    id: 'sc-7',
    name: 'Composiet schutting Rhombus Eiken',
    price: 139.95,
    priceLabel: 'Vanaf €139,95',
    image: 'https://www.mthekwerken.nl/wp-content/uploads/Schutting-Rhombus-Eiken-website-300x200.png',
    category: 'schuttingen',
    features: ['Extra dikke 2,5cm plank', 'Onderhoudsvrij'],
    guarantee: '15 jaar garantie',
    slug: 'schutting-rhombus-eiken',
    tone: 'eiken',
    durability: 'premium',
    productType: 'paneel',
    description: 'De composiet schutting Rhombus Eiken combineert de warme eikenkleur met het moderne rhombus profiel. Een schutting die past bij zowel klassieke als hedendaagse tuinen.',
    seoTitle: 'Composiet Schutting Rhombus Eiken Kopen | Vanaf €139,95',
    seoDescription: 'Composiet schutting Rhombus Eiken met warme eikenkleur en schaduwwerking. Extra dikke 2,5cm planken, onderhoudsvrij. Bestel bij Composiethekwerk.nl.',
    longDescription: `## Composiet schutting Rhombus Eiken

De composiet schutting Rhombus Eiken combineert de warme eikenkleur met het moderne rhombus profiel. Een schutting die past bij zowel klassieke als hedendaagse tuinen.

### Duurzaam en onderhoudsvrij

Co-extrusie beschermlaag, gerecycled materiaal, 0% vochtopname. De eikenkleur blijft jarenlang kleurvast zonder schilderwerk.

### Eenvoudige montage

Aluminium palen en U-profielen. Planken inschuiven. 180 cm of 200 cm hoogte beschikbaar.

### Voordelen in één oogopslag

- Warme, lichte eikenkleur
- Rhombus profiel met schaduwwerking
- Extra dikke 2,5 cm planken
- Co-extrusie beschermlaag
- Past bij klassieke én moderne tuinen
- Onderhoudsvrij`,
    specifications: { Hoogte: '180 cm of 200 cm', Breedte: '180 cm', Plankdikte: '2,5 cm', Materiaal: 'Composiet met co-extrusie toplaag', Kleur: 'Eiken', Profiel: 'Rhombus' },
    images: [
      'https://www.mthekwerken.nl/wp-content/uploads/Schutting-Rhombus-Eiken-website.png',
      'https://www.mthekwerken.nl/wp-content/uploads/IMG_2818-scaled.jpg',
      'https://www.mthekwerken.nl/wp-content/uploads/Plank-Rhombus-Eiken-website-1-1.png',
    ],
    deliveryTime: 'Tussen de 2 en 15 werkdagen',
    highlights: ['Warme eikenkleur', 'Rhombus profiel', 'Extra dikke planken', 'Onderhoudsvrij'],
    options: [
      { label: 'Hoogte', values: ['180 cm', '200 cm'] },
    ],
    faq: [
      { question: 'Is eiken lichter dan teak?', answer: 'Ja, de eikenkleur is lichter en heeft een meer gele ondertoon, terwijl teak warmer en goudbruin is. Bestel een gratis sample om het verschil te ervaren.' },
      { question: 'Kan ik de schutting zelf plaatsen?', answer: 'Ja, de montage is eenvoudig met aluminium palen en U-profielen. Twee personen kunnen een scherm in minder dan een uur plaatsen.' },
      { question: 'Hoe hoog is de schutting?', answer: 'U kunt kiezen uit 180 cm of 200 cm hoogte. De breedte is standaard 180 cm per scherm.' },
    ],
  },
  {
    id: 'sc-8',
    name: 'Composiet schutting Rhombus Grijs',
    price: 139.95,
    priceLabel: 'Vanaf €139,95',
    image: 'https://www.mthekwerken.nl/wp-content/uploads/Rhombus-grijs-product-foto-4-300x200.png',
    category: 'schuttingen',
    features: ['Extra dikke 2,5cm plank', 'Onderhoudsvrij'],
    guarantee: '15 jaar garantie',
    slug: 'schutting-rhombus-grijs',
    tone: 'grijs',
    durability: 'premium',
    productType: 'paneel',
    description: 'De composiet schutting Rhombus Grijs biedt een neutrale, moderne uitstraling. Het grijze rhombus profiel past perfect bij strakke, hedendaagse tuinontwerpen.',
    seoTitle: 'Composiet Schutting Rhombus Grijs Kopen | Vanaf €139,95',
    seoDescription: 'Grijze composiet schutting met rhombus profiel en extra dikke 2,5cm planken. Neutrale moderne uitstraling, onderhoudsvrij. Bestel bij Composiethekwerk.nl.',
    longDescription: `## Composiet schutting Rhombus Grijs

De composiet schutting Rhombus Grijs biedt een neutrale, moderne uitstraling. Het grijze rhombus profiel past perfect bij strakke, hedendaagse tuinontwerpen en industriële stijlen.

### Duurzaam en onderhoudsvrij

Co-extrusie beschermlaag, gerecycled materiaal, 0% vochtopname. De grijze kleur vervaagt niet en hoeft nooit geschilderd te worden.

### Eenvoudige montage

Aluminium palen en U-profielen. Planken inschuiven. 180 cm of 200 cm hoogte.

### Voordelen in één oogopslag

- Neutrale, tijdloze grijstint
- Rhombus profiel met schaduwwerking
- Extra dikke 2,5 cm planken
- Co-extrusie beschermlaag
- Past bij elke tuinstijl
- Onderhoudsvrij`,
    specifications: { Hoogte: '180 cm of 200 cm', Breedte: '180 cm', Plankdikte: '2,5 cm', Materiaal: 'Composiet met co-extrusie toplaag', Kleur: 'Grijs', Profiel: 'Rhombus' },
    images: [
      'https://www.mthekwerken.nl/wp-content/uploads/Rhombus-grijs-product-foto-4.png',
      'https://www.mthekwerken.nl/wp-content/uploads/Rhombus-grijs-dichtbij-scaled-3.jpg',
      'https://www.mthekwerken.nl/wp-content/uploads/Rhombus-Grijs-foto-scaled-3.jpg',
      'https://www.mthekwerken.nl/wp-content/uploads/Rhombus-grijs-plank-4.png',
    ],
    deliveryTime: 'Tussen de 2 en 15 werkdagen',
    highlights: ['Neutrale grijstint', 'Rhombus profiel', 'Extra dikke planken', 'Onderhoudsvrij'],
    options: [
      { label: 'Hoogte', values: ['180 cm', '200 cm'] },
    ],
    faq: [
      { question: 'Past grijs bij een groene tuin?', answer: 'Ja, grijs is een neutrale kleur die uitstekend combineert met groen. Het geeft een rustige, moderne uitstraling aan uw tuin.' },
      { question: 'Wordt grijs lichter of donkerder na verloop van tijd?', answer: 'Nee, dankzij de co-extrusie beschermlaag blijft de grijze kleur jarenlang constant. Er treedt geen verkleuring op door zon of regen.' },
      { question: 'Kan ik grijs combineren met andere kleuren?', answer: 'Ja, grijs combineert uitstekend met teak of walnoot schermen voor een afwisselend tuinontwerp. Ook combinatie met zwart hekwerk is populair.' },
    ],
  },

  // ─── VLONDERPLANKEN ──────────────────────────────────────────
  {
    id: 'vl-1',
    name: 'Composiet vlonderplank Donker Grijs',
    price: 16.95,
    priceLabel: 'Vanaf €16,95',
    image: 'https://www.mthekwerken.nl/wp-content/uploads/Vlonderplank-standaard-donker-grijs-300x369.png',
    category: 'vlonderplanken',
    features: ['Twee afwerkingen', 'Los of met clips'],
    guarantee: 'Scherp geprijsd',
    slug: 'vlonder-donker-grijs',
    tone: 'grijs',
    durability: 'standaard',
    productType: 'plank',
    description: 'De composiet vlonderplank Donker Grijs is een veelzijdige plank met twee afwerkingen: een fijne groef aan de ene zijde en een houtnerf structuur aan de andere. Kies zelf welke kant boven komt. Bevestig los met schroeven of onzichtbaar met clips.',
    seoTitle: 'Composiet Vlonderplank Donker Grijs | Vanaf €16,95',
    seoDescription: 'Composiet vlonderplank Donker Grijs met dubbelzijdige afwerking. Splintervrij, bevestig met schroeven of clips. Scherp geprijsd. Bestel nu.',
    longDescription: `## Composiet vlonderplank Donker Grijs

De composiet vlonderplank Donker Grijs is een veelzijdige plank met twee afwerkingen: een fijne groef aan de ene zijde en een houtnerf structuur aan de andere. Kies zelf welke kant boven komt voor het gewenste effect.

### Twee bevestigingsmogelijkheden

Bevestig de planken los met schroeven voor een eenvoudige montage, of gebruik onzichtbare clips voor een strak eindresultaat zonder zichtbare bevestigingen. Beide opties zijn verkrijgbaar.

### Splintervrij en comfortabel

Composiet vlonderplanken zijn 100% splintervrij — ideaal om blootsvoets over te lopen. De planken worden niet glad bij nattigheid en zijn veilig voor kinderen en huisdieren.

### Voordelen in één oogopslag

- Dubbelzijdige afwerking: groef of houtnerf
- Splintervrij — veilig blootsvoets
- Bevestiging met schroeven of onzichtbare clips
- Weerbestendig en onderhoudsarm
- Scherp geprijsd
- 300 cm lange planken`,
    specifications: { Lengte: '300 cm', Breedte: '13,8 cm', Dikte: '2,3 cm', Materiaal: 'Composiet (holle kern)', Kleur: 'Donker Grijs', Afwerking: 'Dubbelzijdig: groef / houtnerf' },
    images: [
      'https://www.mthekwerken.nl/wp-content/uploads/Vlonderplank-standaard-donker-grijs-300x369.png',
      'https://www.mthekwerken.nl/wp-content/uploads/Deck-Dark-Grey-5.png',
    ],
    deliveryTime: 'Tussen de 2 en 15 werkdagen',
    highlights: ['Twee afwerkingen in één plank', 'Keuze: schroeven of clips', 'Splintervrij', 'Scherp geprijsd'],
    dimensions: { length: '300 cm', width: '13,8 cm', thickness: '2,3 cm' },
    options: [
      { label: 'Bevestiging', values: ['Los (schroeven)', 'Met clips'] },
    ],
    videoUrl: 'https://www.youtube.com/watch?v=composiet-vlonder-montage',
    faq: [
      { question: 'Wat is het verschil tussen holle kern en massief?', answer: 'Holle kern vlonderplanken zijn lichter en goedkoper. Massieve planken zijn zwaarder, steviger en hebben een naadloos design. Voor de meeste toepassingen is holle kern voldoende.' },
      { question: 'Hoeveel planken heb ik nodig voor mijn terras?', answer: 'Meet de oppervlakte van uw terras en deel door de breedte van de plank (13,8 cm) maal de lengte (300 cm). Reken 5-10% extra voor zaagverlies.' },
      { question: 'Hoe bevestig ik de planken met clips?', answer: 'De clips worden op de onderbalk geschroefd en klemmen de vlonderplank vast. Zo krijgt u een strak terras zonder zichtbare schroeven. De clips zorgen automatisch voor de juiste tussenruimte.' },
    ],
  },
  {
    id: 'vl-2',
    name: 'Composiet vlonderplank Teak',
    price: 16.95,
    priceLabel: 'Vanaf €16,95',
    image: 'https://www.mthekwerken.nl/wp-content/uploads/Vlonderplank-standaard-Teak-1-300x372.png',
    category: 'vlonderplanken',
    features: ['Twee afwerkingen', 'Los of met clips'],
    guarantee: 'Scherp geprijsd',
    slug: 'vlonder-teak',
    tone: 'teak',
    durability: 'standaard',
    productType: 'plank',
    description: 'De composiet vlonderplank Teak brengt warmte en sfeer op uw terras. Dubbelzijdige afwerking: kies voor fijne groef of houtnerf. Eenvoudig te bevestigen met schroeven of onzichtbare clips.',
    seoTitle: 'Composiet Vlonderplank Teak Kopen | Vanaf €16,95',
    seoDescription: 'Composiet vlonderplank Teak met warme houtkleur en dubbelzijdige afwerking. Splintervrij, scherp geprijsd. Bestel bij Composiethekwerk.nl.',
    longDescription: `## Composiet vlonderplank Teak

De composiet vlonderplank Teak brengt warmte en sfeer op uw terras. Dubbelzijdige afwerking: kies voor fijne groef of houtnerf. De warme teakkleur geeft uw terras de uitstraling van tropisch hout.

### Twee bevestigingsmogelijkheden

Bevestig los met schroeven of gebruik onzichtbare clips voor een strak resultaat. De clips zorgen automatisch voor de juiste tussenruimte.

### Splintervrij en duurzaam

100% splintervrij, weerbestendig en onderhoudsarm. Ideaal om blootsvoets over te lopen.

### Voordelen in één oogopslag

- Warme teakkleur met natuurlijke uitstraling
- Dubbelzijdige afwerking: groef of houtnerf
- Splintervrij en comfortabel
- Bevestiging met schroeven of clips
- Scherp geprijsd
- 300 cm lange planken`,
    specifications: { Lengte: '300 cm', Breedte: '13,8 cm', Dikte: '2,3 cm', Materiaal: 'Composiet (holle kern)', Kleur: 'Teak', Afwerking: 'Dubbelzijdig: groef / houtnerf' },
    images: [
      'https://www.mthekwerken.nl/wp-content/uploads/Vlonderplank-standaard-Teak-1-300x372.png',
    ],
    deliveryTime: 'Tussen de 2 en 15 werkdagen',
    highlights: ['Warme teakkleur', 'Twee afwerkingen', 'Keuze: schroeven of clips', 'Splintervrij'],
    dimensions: { length: '300 cm', width: '13,8 cm', thickness: '2,3 cm' },
    options: [
      { label: 'Bevestiging', values: ['Los (schroeven)', 'Met clips'] },
    ],
    faq: [
      { question: 'Verkleurt de teakkleur door de zon?', answer: 'De vlonderplank kan in de eerste weken licht verkleuren door UV, maar stabiliseert daarna. Dit is normaal bij composiet en heeft geen invloed op de kwaliteit.' },
      { question: 'Is de plank geschikt voor rondom een zwembad?', answer: 'Ja, composiet vlonderplanken zijn uitstekend geschikt rondom zwembaden. Ze zijn splintervrij, worden niet glad en zijn bestand tegen chloorwater.' },
      { question: 'Welke onderbalk heb ik nodig?', answer: 'Gebruik aluminium of composiet onderbalken met een hart-op-hart afstand van maximaal 40 cm. Dit zorgt voor voldoende draagkracht.' },
    ],
  },
  {
    id: 'vl-3',
    name: 'Composiet vlonderplank Vergrijsd Eiken',
    price: 16.95,
    priceLabel: 'Vanaf €16,95',
    image: 'https://www.mthekwerken.nl/wp-content/uploads/Vlonderplank-standaard-vergrijst-eiken-300x350.png',
    category: 'vlonderplanken',
    features: ['Twee afwerkingen', 'Los of met clips'],
    guarantee: 'Scherp geprijsd',
    slug: 'vlonder-vergrijsd-eiken',
    tone: 'eiken',
    durability: 'standaard',
    productType: 'plank',
    description: 'De composiet vlonderplank Vergrijsd Eiken heeft een natuurlijke, verweerde uitstraling. Dubbelzijdig afgewerkt met fijne groef en houtnerf. Een populaire keuze voor een tijdloze look.',
    seoTitle: 'Composiet Vlonderplank Vergrijsd Eiken | Vanaf €16,95',
    seoDescription: 'Composiet vlonderplank Vergrijsd Eiken met verweerde houtlook. Dubbelzijdig, splintervrij, scherp geprijsd. Bestel bij Composiethekwerk.nl.',
    longDescription: `## Composiet vlonderplank Vergrijsd Eiken

De composiet vlonderplank Vergrijsd Eiken heeft een natuurlijke, verweerde uitstraling die doet denken aan verouderd hout. Dubbelzijdig afgewerkt met fijne groef en houtnerf — een populaire keuze voor een tijdloze look.

### Twee bevestigingsmogelijkheden

Bevestig met schroeven of met onzichtbare clips. De clips creëren een strak terras zonder zichtbare bevestigingen.

### Splintervrij en duurzaam

100% splintervrij, weerbestendig en onderhoudsarm. De vergrijsde eikenkleur blijft constant — geen verdere verwering.

### Voordelen in één oogopslag

- Natuurlijke verweerde eikenlook
- Dubbelzijdige afwerking
- Splintervrij en comfortabel
- Geen verder verweringsproces
- Scherp geprijsd
- 300 cm lange planken`,
    specifications: { Lengte: '300 cm', Breedte: '13,8 cm', Dikte: '2,3 cm', Materiaal: 'Composiet (holle kern)', Kleur: 'Vergrijsd Eiken', Afwerking: 'Dubbelzijdig: groef / houtnerf' },
    images: [
      'https://www.mthekwerken.nl/wp-content/uploads/Vlonderplank-standaard-vergrijst-eiken-300x350.png',
    ],
    deliveryTime: 'Tussen de 2 en 15 werkdagen',
    highlights: ['Verweerde eikenlook', 'Twee afwerkingen', 'Keuze: schroeven of clips', 'Splintervrij'],
    dimensions: { length: '300 cm', width: '13,8 cm', thickness: '2,3 cm' },
    options: [
      { label: 'Bevestiging', values: ['Los (schroeven)', 'Met clips'] },
    ],
    faq: [
      { question: 'Verweert de plank verder na plaatsing?', answer: 'Nee, de vergrijsde eikenlook is in de plank geproduceerd. De kleur blijft constant en verweert niet verder door zon of regen.' },
      { question: 'Is vergrijsd eiken lichter of donkerder dan teak?', answer: 'Vergrijsd eiken is lichter en grijzer dan teak. Het geeft een meer verweerd, natuurlijk uiterlijk, terwijl teak warmer en goudbruin is.' },
      { question: 'Kan ik de planken op maat zagen?', answer: 'Ja, composiet vlonderplanken zijn eenvoudig op maat te zagen met een cirkelzaag of handcirkelzaag. Gebruik een fijnvertand zaagblad voor een netjes resultaat.' },
    ],
  },
  {
    id: 'vl-4',
    name: 'Composiet vlonderplank Walnoot',
    price: 16.95,
    priceLabel: 'Vanaf €16,95',
    image: 'https://www.mthekwerken.nl/wp-content/uploads/Vlonderplank-standaard-walnoot-300x343.png',
    category: 'vlonderplanken',
    features: ['Twee afwerkingen', 'Los of met clips'],
    guarantee: 'Scherp geprijsd',
    slug: 'vlonder-walnoot',
    tone: 'walnoot',
    durability: 'standaard',
    productType: 'plank',
    description: 'De composiet vlonderplank Walnoot biedt een rijke, donkere houtlook. Dubbelzijdig afgewerkt zodat u kunt kiezen welke zijde u prefereert.',
    seoTitle: 'Composiet Vlonderplank Walnoot Kopen | Vanaf €16,95',
    seoDescription: 'Composiet vlonderplank Walnoot met rijke donkere houtlook. Dubbelzijdig, splintervrij, scherp geprijsd. Bestel bij Composiethekwerk.nl.',
    longDescription: `## Composiet vlonderplank Walnoot

De composiet vlonderplank Walnoot biedt een rijke, donkere houtlook die warmte en sfeer toevoegt aan uw terras. Dubbelzijdig afgewerkt met fijne groef en houtnerf.

### Twee bevestigingsmogelijkheden

Bevestig met schroeven of met onzichtbare clips voor een strak eindresultaat.

### Splintervrij en duurzaam

100% splintervrij, weerbestendig en onderhoudsarm. De donkere walnoottint geeft uw terras een luxe uitstraling.

### Voordelen in één oogopslag

- Rijke, donkere walnoottint
- Dubbelzijdige afwerking
- Splintervrij
- Bevestiging met schroeven of clips
- Scherp geprijsd
- 300 cm lange planken`,
    specifications: { Lengte: '300 cm', Breedte: '13,8 cm', Dikte: '2,3 cm', Materiaal: 'Composiet (holle kern)', Kleur: 'Walnoot', Afwerking: 'Dubbelzijdig: groef / houtnerf' },
    images: [
      'https://www.mthekwerken.nl/wp-content/uploads/Vlonderplank-standaard-walnoot-300x343.png',
    ],
    deliveryTime: 'Tussen de 2 en 15 werkdagen',
    highlights: ['Rijke walnoottint', 'Twee afwerkingen', 'Keuze: schroeven of clips', 'Splintervrij'],
    dimensions: { length: '300 cm', width: '13,8 cm', thickness: '2,3 cm' },
    options: [
      { label: 'Bevestiging', values: ['Los (schroeven)', 'Met clips'] },
    ],
    faq: [
      { question: 'Is walnoot donkerder dan teak?', answer: 'Ja, walnoot is aanzienlijk donkerder dan teak. Het heeft een diepbruine kleur, terwijl teak meer goudbruin is. Bestel een sample om het verschil te zien.' },
      { question: 'Kan ik walnoot vlonder combineren met een walnoot schutting?', answer: 'Ja, onze walnoot vlonderplanken en walnoot schuttingen zijn perfect op elkaar afgestemd qua kleur. Dit creëert een harmonieus tuinontwerp.' },
      { question: 'Wordt de plank warm in de zon?', answer: 'Composiet kan in direct zonlicht iets warmer worden dan hout. Kies voor een lichtere kleur als uw terras vol in de zon ligt, of gebruik de plank met blootsvoets in gedachten.' },
    ],
  },
  {
    id: 'vl-5',
    name: 'Composiet vlonderplank naadloos massief Donker Grijs',
    price: 24.95,
    priceLabel: 'Vanaf €24,95',
    image: 'https://www.mthekwerken.nl/wp-content/uploads/Composiet-vlonderplank-massief-naadloos-donker-grijs-300x450.png',
    category: 'vlonderplanken',
    features: ['Massief met antislip', 'Naadloos design'],
    guarantee: '15 jaar garantie',
    slug: 'vlonder-massief-grijs',
    tone: 'grijs',
    durability: 'massief',
    productType: 'plank',
    description: 'De naadloos massieve composiet vlonderplank in Donker Grijs is het topmodel uit ons assortiment. Volledig massief (geen holle kern), voorzien van een antislip coating en een naadloos ontwerp voor een strak eindresultaat.',
    seoTitle: 'Massief Composiet Vlonderplank Donker Grijs | Vanaf €24,95',
    seoDescription: 'Naadloos massieve composiet vlonderplank Donker Grijs met antislip coating. Premium kwaliteit, 15 jaar garantie. Bestel bij Composiethekwerk.nl.',
    longDescription: `## Composiet vlonderplank naadloos massief Donker Grijs

Het topmodel uit ons assortiment: de naadloos massieve composiet vlonderplank in Donker Grijs. Volledig massief (geen holle kern), voorzien van een antislip coating en een naadloos ontwerp voor een strak eindresultaat.

### 100% massief

In tegenstelling tot standaard holle kern vlonderplanken is deze plank volledig massief. Dit betekent maximale draagkracht, stevigheid en duurzaamheid. Ideaal voor intensief gebruik en commerciële toepassingen.

### Antislip coating

De plank is voorzien van een antislip coating voor maximale veiligheid, ook bij nat weer. Perfect rondom zwembaden, bij restaurants of op openbare terrassen.

### Naadloos design

Het naadloze ontwerp zorgt voor een strak, elegant eindresultaat zonder zichtbare groeven of naden. Een luxe uitstraling voor uw terras.

### Voordelen in één oogopslag

- 100% massief — maximale stevigheid
- Antislip coating voor veiligheid
- Naadloos design voor een strakke look
- 15 jaar garantie
- Premium kwaliteit`,
    specifications: { Lengte: '300 cm', Breedte: '14,5 cm', Dikte: '2,2 cm', Materiaal: 'Massief composiet', Kleur: 'Donker Grijs', Afwerking: 'Naadloos met antislip coating' },
    images: [
      'https://www.mthekwerken.nl/wp-content/uploads/Composiet-vlonderplank-massief-naadloos-donker-grijs-300x450.png',
      'https://www.mthekwerken.nl/wp-content/uploads/Massief-plank-donker-grijs-close-scaled.jpg',
      'https://www.mthekwerken.nl/wp-content/uploads/Massief-plank-donker-grijs.png',
      'https://www.mthekwerken.nl/wp-content/uploads/massief-plank-donkergrijs-met-clips-scaled.jpg',
      'https://www.mthekwerken.nl/wp-content/uploads/Vlonderplank-massief-donkergrijd-rails-en-clips-scaled.jpg',
    ],
    deliveryTime: 'Tussen de 2 en 15 werkdagen',
    highlights: ['100% massief', 'Antislip coating', 'Naadloos design', '15 jaar garantie', 'Premium kwaliteit'],
    dimensions: { length: '300 cm', width: '14,5 cm', thickness: '2,2 cm' },
    faq: [
      { question: 'Wat is het verschil tussen massief en holle kern?', answer: 'Massieve planken zijn volledig gevuld en zwaarder. Ze bieden meer draagkracht en stevigheid. Holle kern planken zijn lichter en goedkoper maar minder robuust.' },
      { question: 'Is de antislip coating permanent?', answer: 'Ja, de antislip coating is in het productieproces aangebracht en slijt niet af bij normaal gebruik. De plank blijft ook na jaren veilig bij nat weer.' },
      { question: 'Kan ik massieve planken ook met clips bevestigen?', answer: 'Ja, massieve vlonderplanken kunnen zowel met schroeven als met onzichtbare clips worden bevestigd. Clips geven het mooiste eindresultaat.' },
      { question: 'Is de massieve plank geschikt voor commercieel gebruik?', answer: 'Ja, de massieve plank is ideaal voor horeca terrassen, openbare ruimtes en andere locaties met intensief gebruik. De antislip coating biedt extra veiligheid.' },
    ],
  },
  {
    id: 'vl-6',
    name: 'Composiet vlonderplank naadloos massief Teak',
    price: 24.95,
    priceLabel: 'Vanaf €24,95',
    image: 'https://www.mthekwerken.nl/wp-content/uploads/Vlonderplank-naadloos-massief-Teak-300x450.png',
    category: 'vlonderplanken',
    features: ['Massief met antislip', 'Naadloos design'],
    guarantee: '15 jaar garantie',
    slug: 'vlonder-massief-teak',
    tone: 'teak',
    durability: 'massief',
    productType: 'plank',
    description: 'De naadloos massieve composiet vlonderplank in Teak. Volledig massief met antislip coating voor maximale veiligheid. Het naadloze ontwerp zorgt voor een strak, luxueus terras.',
    seoTitle: 'Massief Composiet Vlonderplank Teak Kopen | Vanaf €24,95',
    seoDescription: 'Naadloos massieve composiet vlonderplank Teak met antislip coating. Warme houtkleur, premium kwaliteit, 15 jaar garantie. Bestel online.',
    longDescription: `## Composiet vlonderplank naadloos massief Teak

De naadloos massieve composiet vlonderplank in Teak combineert premium kwaliteit met een warme houtuitstraling. Volledig massief met antislip coating voor maximale veiligheid.

### 100% massief

Volledig massief composiet — geen holle kern. Maximale draagkracht en stevigheid voor intensief gebruik.

### Antislip coating

Voorzien van antislip coating voor veiligheid bij nat weer. Perfect rondom zwembaden en voor openbare terrassen.

### Naadloos design

Strak, elegant eindresultaat zonder zichtbare groeven. De warme teakkleur geeft uw terras een luxe, tropische uitstraling.

### Voordelen in één oogopslag

- 100% massief — maximale stevigheid
- Warme teakkleur met luxe uitstraling
- Antislip coating voor veiligheid
- Naadloos design
- 15 jaar garantie`,
    specifications: { Lengte: '300 cm', Breedte: '14,5 cm', Dikte: '2,2 cm', Materiaal: 'Massief composiet', Kleur: 'Teak', Afwerking: 'Naadloos met antislip coating' },
    images: [
      'https://www.mthekwerken.nl/wp-content/uploads/Vlonderplank-naadloos-massief-Teak-300x450.png',
    ],
    deliveryTime: 'Tussen de 2 en 15 werkdagen',
    highlights: ['100% massief', 'Antislip coating', 'Naadloos design', 'Warme teakkleur', '15 jaar garantie'],
    dimensions: { length: '300 cm', width: '14,5 cm', thickness: '2,2 cm' },
    faq: [
      { question: 'Is de teakkleur identiek aan de standaard vlonderplank?', answer: 'De kleur is vergelijkbaar, maar de massieve plank heeft een iets intenser kleurresultaat dankzij het naadloze ontwerp. Bestel een sample om het verschil te ervaren.' },
      { question: 'Hoe zwaar is een massieve plank?', answer: 'Een massieve plank weegt circa 8 kg per stuk (300 cm). Dit is zwaarder dan een holle kern plank (circa 4 kg) maar zorgt voor extra stevigheid.' },
      { question: 'Kan ik massieve planken op een bestaand terras leggen?', answer: 'Ja, mits de onderbalk constructie stevig genoeg is. Massieve planken zijn zwaarder dan holle kern, dus controleer of de onderbouw het gewicht kan dragen.' },
    ],
  },
  {
    id: 'vl-7',
    name: 'Composiet vlonderplank naadloos massief Zwart',
    price: 24.95,
    priceLabel: 'Vanaf €24,95',
    image: 'https://www.mthekwerken.nl/wp-content/uploads/Vlonderplank-massief-naadloos-zwart-300x364.png',
    category: 'vlonderplanken',
    features: ['Massief met antislip', 'Naadloos design'],
    guarantee: '15 jaar garantie',
    slug: 'vlonder-massief-zwart',
    tone: 'zwart',
    durability: 'massief',
    productType: 'plank',
    description: 'De naadloos massieve composiet vlonderplank in Zwart. Een strakke, moderne keuze voor uw terras. Volledig massief met antislip coating.',
    seoTitle: 'Massief Composiet Vlonderplank Zwart Kopen | Vanaf €24,95',
    seoDescription: 'Naadloos massieve composiet vlonderplank Zwart met antislip coating. Strak modern design, 15 jaar garantie. Bestel bij Composiethekwerk.nl.',
    longDescription: `## Composiet vlonderplank naadloos massief Zwart

Een strakke, moderne keuze voor uw terras. De naadloos massieve composiet vlonderplank in Zwart is volledig massief met antislip coating voor maximale veiligheid.

### 100% massief

Geen holle kern — volledig massief composiet voor maximale draagkracht en duurzaamheid.

### Antislip coating

Veilig bij nat weer dankzij de ingebouwde antislip coating. Geschikt voor alle toepassingen.

### Naadloos design

Het zwarte naadloze design geeft uw terras een ultra-moderne, minimalistische uitstraling.

### Voordelen in één oogopslag

- 100% massief
- Strakke zwarte kleur
- Antislip coating
- Naadloos design
- 15 jaar garantie
- Premium kwaliteit`,
    specifications: { Lengte: '300 cm', Breedte: '14,5 cm', Dikte: '2,2 cm', Materiaal: 'Massief composiet', Kleur: 'Zwart', Afwerking: 'Naadloos met antislip coating' },
    images: [
      'https://www.mthekwerken.nl/wp-content/uploads/Vlonderplank-massief-naadloos-zwart-300x364.png',
    ],
    deliveryTime: 'Tussen de 2 en 15 werkdagen',
    highlights: ['100% massief', 'Antislip coating', 'Naadloos design', 'Moderne zwarte look', '15 jaar garantie'],
    dimensions: { length: '300 cm', width: '14,5 cm', thickness: '2,2 cm' },
    faq: [
      { question: 'Wordt zwart composiet niet te warm in de zon?', answer: 'Zwart composiet kan in direct zonlicht warmer worden dan lichtere kleuren. Overweeg dit als uw terras vol in de zon ligt. Het materiaal vervormt echter niet door de warmte.' },
      { question: 'Kan ik zwart vlonder combineren met een zwarte schutting?', answer: 'Ja, onze zwarte vlonderplanken en zwarte schuttingen zijn perfect op elkaar afgestemd. Dit creëert een doorlopend modern tuinontwerp.' },
      { question: 'Hoe reinig ik zwarte vlonderplanken?', answer: 'Reinig met lauwwarm water en een zachte borstel. Op zwarte planken zijn vlekken sneller zichtbaar, maar dankzij het naadloze oppervlak zijn ze eenvoudig te verwijderen.' },
    ],
  },
];

export const categories = [
  {
    id: 'gevelbekleding',
    name: 'Composiet Gevelbekleding',
    description: 'Premium composiet gevelbekleding die jarenlang mooi blijft. Weerbestendig en onderhoudsvriendelijk.',
    image: 'https://www.mthekwerken.nl/wp-content/uploads/gevelbekleding-rhombus-teakzwart-2-1110x840.jpg',
    slug: 'gevelbekleding',
    productCount: 18,
    seoTitle: 'Composiet Gevelbekleding Kopen | Composiethekwerk.nl',
    seoDescription: 'Premium composiet gevelbekleding met Co-Extrusie beschermlaag. Onderhoudsvrij, UV-bestendig en 15 jaar garantie. Bekijk ons assortiment.',
    faq: [
      { q: "Wat kost composiet gevelbekleding per m²?", a: "Composiet gevelbekleding kost gemiddeld €40,95 per m². De exacte prijs hangt af van het gekozen profiel en de kleur." },
      { q: "Hoe lang gaat composiet gevelbekleding mee?", a: "Met de Co-Extrusie beschermlaag gaat onze gevelbekleding 25+ jaar mee zonder noemenswaardig onderhoud." },
      { q: "Kan ik composiet gevelbekleding zelf monteren?", a: "Ja, met een aluminium regelwerk en de meegeleverde clips kunt u de gevelbekleding zelf monteren. Bekijk onze installatiehandleiding voor een stap-voor-stap uitleg." },
    ],
    relatedBlogSlugs: ['gevelbekleding-installeren-stap-voor-stap', 'composiet-vs-hout-vergelijking'],
  },
  {
    id: 'schuttingen',
    name: 'Composiet Schuttingen',
    description: 'Premium composiet schuttingen die jarenlang meegaan. Onderhoudsvrij en stijlvol.',
    image: 'https://www.mthekwerken.nl/wp-content/uploads/Highlander-Credits-Sven-Scholten-LR-23.JPG-website-1110x840.jpg',
    slug: 'schuttingen',
    productCount: 34,
    seoTitle: 'Composiet Schuttingen Kopen | Composiethekwerk.nl',
    seoDescription: 'Duurzame composiet schuttingen met extra dikke planken. Onderhoudsvrij, stormbestendig en 15 jaar garantie. Bestel direct online.',
    faq: [
      { q: "Wat zit er bij een composiet schuttingpakket?", a: "Een pakket bevat alle composiet planken en U-profielen voor één scherm. Aluminium palen zijn apart verkrijgbaar." },
      { q: "Hoe hoog zijn de composiet schuttingen?", a: "Onze schuttingen zijn verkrijgbaar in 180 cm en 200 cm hoogte, met een standaard breedte van 180 cm." },
      { q: "Zijn composiet schuttingen stormbestendig?", a: "Ja, mits correct gemonteerd op aluminium palen met een stevige fundering van betonpoeren of grondankers." },
    ],
    relatedBlogSlugs: ['composiet-schutting-plaatsen', 'composiet-vs-hout-vergelijking'],
  },
  {
    id: 'vlonderplanken',
    name: 'Composiet Vlonderplanken',
    description: 'Duurzame composiet vlonderplanken voor een luxe uitstraling. Splintervrij en kleurvast.',
    image: 'https://www.mthekwerken.nl/wp-content/uploads/NoGap-AntislipTeak-5-1110x840.jpg',
    slug: 'vlonderplanken',
    productCount: 10,
    seoTitle: 'Composiet Vlonderplanken Kopen | Composiethekwerk.nl',
    seoDescription: 'Premium composiet vlonderplanken: splintervrij, kleurvast en onderhoudsvrij. Massief en NoGap profielen met 15 jaar garantie.',
    faq: [
      { q: "Wat is het verschil tussen massieve en holle vlonderplanken?", a: "Massieve planken zijn steviger en voelen meer als echt hout. Holle profielen zijn lichter en voordeliger." },
      { q: "Zijn composiet vlonderplanken glad bij regen?", a: "Onze vlonderplanken met antislip coating bieden extra grip, ook bij nat weer. Ideaal voor terrassen bij het zwembad." },
      { q: "Hoeveel vlonderplanken heb ik nodig?", a: "Bereken uw oppervlakte in m² en tel 10% extra op voor zaagverlies. Neem contact op voor een gratis berekening." },
    ],
    relatedBlogSlugs: ['composiet-vlonderplanken-kiezen', 'tuin-inspiratie-composiet-terras', 'composiet-onderhouden-seizoenstips'],
  },
];
