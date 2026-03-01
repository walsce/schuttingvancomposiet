export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: "koopgids" | "installatie" | "onderhoud" | "inspiratie";
  image: string;
  readTime: number;
  date: string;
  content: string;
  author: { name: string; role: string };
  updatedDate: string;
  relatedProducts: string[];
  relatedCategories: string[];
  schemaType: "Article" | "HowTo" | "FAQPage";
}

export const categoryLabels: Record<BlogArticle["category"], string> = {
  koopgids: "Koopgids",
  installatie: "Installatietips",
  onderhoud: "Onderhoud",
  inspiratie: "Inspiratie",
};

import { blogArticlesExpansion } from "./blogArticlesExpansion";

const blogArticlesBase: BlogArticle[] = [
  {
    slug: "composiet-vlonderplanken-kiezen",
    title: "De ultieme koopgids: composiet vlonderplanken kiezen",
    excerpt: "Alles wat je moet weten over het kiezen van de juiste composiet vlonderplanken voor jouw tuin. Van materiaal tot kleur en afmetingen.",
    category: "koopgids",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    readTime: 8,
    date: "2026-02-10",
    author: { name: "Mark de Vries", role: "Composiet specialist" },
    updatedDate: "2026-02-15",
    relatedProducts: ["gamrat-classic-donkerbruin", "gamrat-premium-grafiet", "gamrat-elegance-gorski-dab"],
    relatedCategories: ["vlonderplanken"],
    schemaType: "Article",
    content: `## Waarom composiet vlonderplanken?

Composiet vlonderplanken combineren de warme, natuurlijke uitstraling van hout met de duurzaamheid van moderne kunststoffen. Ze zijn ideaal voor terrassen, balkons en tuinpaden.

### Voordelen ten opzichte van hout

- **Onderhoudsvrij** — geen jaarlijks schuren, oliën of beitsen
- **Splintervrij** — veilig voor kinderen en huisdieren
- **Kleurvast** — UV-bestendige beschermlaag
- **Weerbestendig** — geen rot, schimmel of insectenvraat

## Waar moet je op letten?

### 1. Massief vs. Komorowa (hol)

**Massief planken** (Classic, Premium) zijn volledig gevuld en bieden maximale sterkte. **Komorowa (holle) planken** zijn lichter en betaalbaarder, ideaal voor privégebruik.

### 2. Afwerking

Kies tussen geborsteld, fijn gegroefde of houtnerf-structuur. De Premium lijn biedt de meest natuurlijke houtlook, de Classic lijn een geborstelde afwerking.

### 3. Afmetingen

Standaard lengtes zijn 3 en 4 meter. De breedte varieert van 140 mm (Eco, Elegance) tot 185 mm (MAX). Bereken altijd je benodigde oppervlakte plus 10% extra voor zaagverlies.

### 4. Kleurkeuze

Gamrat WPC vlonderplanken zijn beschikbaar in vijf basiskleuren:
- **Donkerbruin** — klassieke warme houtlook
- **Grafiet** — modern en strak
- **Orzech (walnoot)** — rijke middenbruine tint
- **Szary (grijs)** — neutraal en tijdloos
- **Donkergrijs** — diep antraciet

De Elegance lijn biedt exclusieve eiken-tinten met RENOLIT folie.

## Prijsindicatie

Neem contact op voor actuele prijzen. Gamrat WPC biedt 25 jaar garantie op alle producten.

## Conclusie

Investeer in kwaliteit en kies voor de juiste plank voor jouw situatie. Je geniet jarenlang van een prachtig terras zonder gedoe.`,
  },
  {
    slug: "composiet-schutting-plaatsen",
    title: "Composiet schutting plaatsen: tips van de expert",
    excerpt: "Ontdek hoe je een duurzame composiet schutting plaatst die jarenlang mooi blijft. Inclusief tips voor palen, fundering en afwerking.",
    category: "installatie",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80",
    readTime: 10,
    date: "2026-01-28",
    author: { name: "Jan Bakker", role: "Montage expert" },
    updatedDate: "2026-02-01",
    relatedProducts: ["gamrat-schutting-classic-donkerbruin", "gamrat-schutting-premium-grafiet", "gamrat-paal-donkerbruin"],
    relatedCategories: ["schuttingen"],
    schemaType: "HowTo",
    content: `## De juiste fundering

Een composiet schutting begint bij een stevige fundering. Zonder goede basis verzakt je schutting binnen een paar jaar.

### Optie 1: Betonpoeren

Betonpoeren zijn de meest gebruikte methode. Graaf gaten van 40×40×60 cm en vul deze met beton. Plaats de paalhouders terwijl het beton nog nat is.

### Optie 2: Grondankers

Schroefankers zijn sneller te plaatsen en geschikt voor stevige grond. Draai ze minimaal 60 cm de grond in.

## WPC palen plaatsen

Gebruik altijd WPC of aluminium palen voor composiet schuttingen. Ze roesten niet en gaan net zo lang mee als de planken.

- Plaats de palen op maximaal 1,80 m tussenafstand
- Controleer of elke paal loodrecht staat
- Gebruik een waterpas en klamp de palen vast tijdens het uitharden

## Planken inschuiven

Composiet schuttingplanken schuif je eenvoudig in de gleuf van de palen. Begin onderaan en werk naar boven.

### Let op:
- Houd 5 mm speling aan weerszijden voor uitzetting
- Gebruik een rubberen hamer om de planken op hun plaats te tikken
- Controleer na elke 3 planken of alles waterpas zit

## Afdekken en afwerken

Plaats afdekkapjes op de palen en breng eventueel een afdekkap aan op de bovenste plank. Dit geeft een strakke, professionele uitstraling.

## Onderhoud

Je composiet schutting heeft nauwelijks onderhoud nodig:
- Spuit 2x per jaar af met een tuinslang
- Verwijder groene aanslag met een mild schoonmaakmiddel
- Gebruik geen hogedrukreiniger op korte afstand`,
  },
  {
    slug: "composiet-vs-hout-vergelijking",
    title: "Composiet vs. hout: een eerlijke vergelijking",
    excerpt: "Is composiet echt beter dan hout? We vergelijken prijs, duurzaamheid, onderhoud en uitstraling zodat jij de beste keuze maakt.",
    category: "koopgids",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
    readTime: 6,
    date: "2026-01-20",
    author: { name: "Mark de Vries", role: "Composiet specialist" },
    updatedDate: "2026-01-25",
    relatedProducts: ["gamrat-premium-donkerbruin", "gamrat-classic-orzech"],
    relatedCategories: ["vlonderplanken", "schuttingen"],
    schemaType: "Article",
    content: `## De grote vraag

"Is composiet beter dan hout?" Het antwoord hangt af van je prioriteiten. Laten we de feiten op een rij zetten.

## Prijs

| | Composiet | Hardhout | Zachthout |
|---|---|---|---|
| Aanschafprijs per m² | €49–€89 | €50–€100 | €15–€30 |
| Onderhoudskosten (10 jaar) | €0 | €200–€400 | €300–€500 |
| **Totaalkosten (10 jaar)** | **€49–€89** | **€250–€500** | **€315–€530** |

Composiet is op lange termijn bijna altijd goedkoper.

## Duurzaamheid

- **Composiet**: 25+ jaar, geen rot of splinteren
- **Hardhout**: 15–25 jaar mits goed onderhouden
- **Zachthout**: 5–10 jaar, gevoelig voor rot

## Onderhoud

Composiet wint hier met grote voorsprong. Waar hout jaarlijks geschuurd en behandeld moet worden, hoef je composiet alleen af en toe af te spoelen.

## Uitstraling

Modern composiet is nauwelijks te onderscheiden van echt hout. Gamrat WPC Premium planken hebben een realistische houtnerf-structuur.

## Milieu-impact

Gamrat WPC composiet is 100% recycleerbaar en wordt geproduceerd door een Poolse fabrikant met duurzame productiemethoden. Het materiaal bestaat uit houtvezels en PVC.

## Ons advies

Kies composiet als je:
- Minimaal onderhoud wilt
- Waarde hecht aan duurzaamheid
- Op lange termijn wilt besparen
- Een veilig, splintervrij oppervlak wilt

Kies hout als je:
- Het onderhoud niet erg vindt
- Houdt van de geur en het gevoel van echt hout
- Een beperkt budget hebt (zachthout)`,
  },
  {
    slug: "composiet-onderhouden-seizoenstips",
    title: "Composiet onderhouden: tips per seizoen",
    excerpt: "Hoewel composiet onderhoudsvrij is, helpen deze seizoenstips om je terras en schutting er jarenlang als nieuw uit te laten zien.",
    category: "onderhoud",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80",
    readTime: 5,
    date: "2026-01-15",
    author: { name: "Lisa Jansen", role: "Onderhoud adviseur" },
    updatedDate: "2026-02-01",
    relatedProducts: ["gamrat-classic-grafiet", "gamrat-schutting-classic-grafiet"],
    relatedCategories: ["vlonderplanken", "schuttingen"],
    schemaType: "Article",
    content: `## Voorjaar: grote schoonmaak

Na de winter is het tijd voor een grondige reiniging:

1. Veeg bladeren en vuil weg met een bezem
2. Spoel het oppervlak af met een tuinslang
3. Gebruik een mild reinigingsmiddel voor hardnekkige vlekken
4. Laat goed drogen

### Groene aanslag verwijderen

Gebruik een speciaal composiet-reinigingsmiddel. Vermijd bleek of agressieve chemicaliën — deze kunnen het oppervlak beschadigen.

## Zomer: genieten en beschermen

- Plaats beschermviltjes onder tuinmeubels
- Gebruik een tuinkleed onder de barbecue
- Veeg gemorste drankjes direct op

## Herfst: voorbereiden op de winter

- Verwijder regelmatig bladeren (voorkomt vlekken)
- Controleer de afwatering — water moet vrij kunnen wegstromen
- Ruim tuinmeubels op of dek ze af

## Winter: minimale aandacht

- Gebruik geen ijskrabber of scherpe voorwerpen
- Strooi geen zout — dit kan vlekken veroorzaken
- Gebruik zand of grind voor grip bij gladheid

## Wat je NIET moet doen

❌ Hogedrukreiniger op korte afstand (<30 cm) gebruiken
❌ Schurende middelen of staalwol gebruiken
❌ Zware voorwerpen over het oppervlak slepen
❌ Verf of lak aanbrengen

## Professionele tip

Composiet van Gamrat WPC is ontworpen om extreme temperaturen te weerstaan en heeft geen extra beschermlaag nodig.`,
  },
  {
    slug: "tuin-inspiratie-composiet-terras",
    title: "5 inspirerende tuinontwerpen met composiet terrassen",
    excerpt: "Van strak en modern tot landelijk en gezellig — ontdek vijf prachtige tuinontwerpen met composiet terrassen als middelpunt.",
    category: "inspiratie",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    readTime: 4,
    date: "2026-01-08",
    author: { name: "Sophie van Dijk", role: "Tuin & design specialist" },
    updatedDate: "2026-01-20",
    relatedProducts: ["gamrat-premium-donkerbruin", "gamrat-classic-grafiet", "gamrat-elegance-miodowy-dab"],
    relatedCategories: ["vlonderplanken"],
    schemaType: "Article",
    content: `## 1. Het minimalistische stadsterras

Een strak terras in grafiet composiet, gecombineerd met witte plantenbakken en siergrassen. Perfect voor kleine stadstuinen waar elke vierkante meter telt.

**Tip:** Kies smalle planken (140 mm) voor een moderne uitstraling en leg ze in de lengterichting om de tuin groter te laten lijken.

## 2. Het familievriendelijke tuinterras

Een ruim terras in warm donkerbruin composiet met een ingebouwde zandbak en speelhoek. Splintervrij en veilig voor de kleintjes.

**Tip:** Combineer verschillende niveaus voor een speels effect. Gebruik trapprofielen voor veilige overgangen.

## 3. De mediterrane loungehoek

Lichte eiken composiet vlonders (Gamrat Elegance) gecombineerd met een pergola, klimplanten en comfortabele loungesets. Breng de vakantiesfeer naar je eigen tuin.

**Tip:** Combineer composiet met natuursteen randen voor een luxe mediterraans gevoel.

## 4. Het verhoogde terras

Een verhoogd platform in donkerbruin composiet, bereikbaar via brede treden. Ideaal voor tuinen met hoogteverschillen of als uitbreiding van de woonkamer.

**Tip:** Integreer LED-stripverlichting in de traptreden voor sfeervolle avondverlichting.

## 5. De all-weather buitenkeuken

Een robuust composiet terras als basis voor een complete buitenkeuken met barbecue, werkblad en bar. Composiet is vlekbestendig en makkelijk schoon te houden.

**Tip:** Kies een donkere kleur rondom de kookzone — dit is het meest praktisch en geeft een professionele uitstraling.`,
  },
];

export const blogArticles: BlogArticle[] = [...blogArticlesBase, ...blogArticlesExpansion];
