import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

/* ── Branded document definitions ──────────────────────────────── */

interface Section {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: { headers: string[]; rows: string[][] };
}

interface BrandedDoc {
  id: string;
  title: string;
  subtitle: string;
  sections: Section[];
}

const documents: BrandedDoc[] = [
  // ─── MONTAGEHANDLEIDINGEN ────────────────────────────────────────
  {
    id: "handleiding-composiet-schutting",
    title: "Montagehandleiding: composiet schutting plaatsen",
    subtitle: "Volledige stap-voor-stap handleiding voor het plaatsen van composiet schuttingen",
    sections: [
      {
        heading: "1. Benodigde materialen",
        table: {
          headers: ["Component", "Specificatie", "Opmerking"],
          rows: [
            ["Schuttingplanken", "Classic 19x150mm of Premium 19x150mm", "2 meter lengte"],
            ["Universeel profiel", "19x150mm", "Verticale structuur, 1,25 / 1,5 / 2 m"],
            ["Ceownik paalprofiel", "30x40mm WPC", "U-profiel voor planken"],
            ["Schuttingpaal", "60x60mm WPC", "2 meter, per vak 1 paal"],
            ["Voetplaat of beton", "-", "Afhankelijk van grondtype"],
          ],
        },
      },
      {
        heading: "2. Benodigd gereedschap",
        bullets: [
          "Waterpas (minimaal 1 meter)",
          "Accuboormachine met bitset",
          "Meetlint en potlood",
          "Verstekzaag of handcirkelzaag met fijntandblad",
          "Schep en grondboor (voor inbetonneren)",
          "Betontroffel en emmer",
          "Slagkoord / snoer voor rechte lijn",
        ],
      },
      {
        heading: "3. Fundament voorbereiden",
        paragraphs: [
          "De stabiliteit van uw schutting begint bij een goed fundament. De paalgaten moeten minimaal 60 cm diep zijn (vorstdiepte in Nederland is 60-80 cm).",
        ],
        bullets: [
          "Markeer de paalgaten op gelijke afstanden (max. 180 cm hart-op-hart)",
          "Graaf paalgaten van minimaal 60 cm diep en 25x25 cm breed",
          "Gebruik snelbeton of C20/25 beton voor verankering",
          "Laat beton minimaal 24 uur uitharden voor montage",
          "Alternatief: gebruik voetplaten op verharde ondergrond",
        ],
      },
      {
        heading: "4. Palen plaatsen",
        bullets: [
          "Plaats de eerste paal en controleer met waterpas in twee richtingen",
          "Span een snoer tussen eerste en laatste paal voor een rechte lijn",
          "Controleer hart-op-hart afstand (max. 180 cm)",
          "Monteer ceownik U-profielen aan de palen met meegeleverde bevestiging",
          "Hoekpalen extra verankeren — hier werkt de meeste windbelasting",
        ],
      },
      {
        heading: "5. Planken monteren",
        bullets: [
          "Begin onderaan en werk naar boven",
          "Schuif de planken horizontaal in de ceownik U-profielen",
          "Controleer regelmatig of de planken waterpas liggen",
          "Laat 5mm ruimte tussen planken voor uitzetting",
          "Zaag de bovenste plank op maat indien nodig",
          "Tip: beide zijden zijn afgewerkt — kies de gewenste structuur (Classic: geborsteld / Premium: houtnerf)",
        ],
      },
      {
        heading: "6. Afwerking & controle",
        bullets: [
          "Plaats afdekkapjes op alle palen",
          "Controleer alle verbindingen op stevigheid",
          "Verwijder beschermfolie van de planken",
          "Schutting kan windbelasting tot 100 km/u aan bij max. 2000mm hoogte",
          "Maak eventuele bouwresten schoon",
        ],
      },
      {
        heading: "Technische specificaties",
        table: {
          headers: ["Eigenschap", "Classic plank", "Premium plank"],
          rows: [
            ["Afmeting", "19 x 150 mm", "19 x 150 mm"],
            ["Lengte", "2000 mm", "2000 mm"],
            ["Afwerking", "Geborsteld", "Houtnerf 3D"],
            ["Dubbelzijdig", "Ja", "Ja"],
            ["Max. schermhoogte", "2000 mm", "2000 mm"],
            ["Windbelasting", "Tot 100 km/u", "Tot 100 km/u"],
          ],
        },
      },
    ],
  },
  {
    id: "handleiding-vlonderplanken",
    title: "Montagehandleiding: composiet vlonderplanken leggen",
    subtitle: "Van planning en lay-out tot de laatste afwerking",
    sections: [
      {
        heading: "1. Planning & lay-out",
        paragraphs: [
          "Een goede planning bespaart materiaal en tijd. Bereken het benodigde aantal planken op basis van uw terrasoppervlak en het legpatroon.",
        ],
        bullets: [
          "Meet het terras nauwkeurig op (lengte x breedte)",
          "Bereken materiaal: oppervlak / plankbreedte = aantal planken",
          "Bestel 5-10% extra voor zaagverlies en eventuele beschadigingen",
          "Kies het legpatroon: parallel, diagonaal of visgraat",
        ],
      },
      {
        heading: "2. Productlijnen en specificaties",
        table: {
          headers: ["Lijn", "Afmeting", "Constructie", "Bijzonderheid"],
          rows: [
            ["Slim", "25 x 140 mm (3m)", "Hol", "Budget instapmodel"],
            ["Eco", "25 x 140 mm (3/4m)", "Hol", "Eco-vriendelijk"],
            ["Komorowa", "25 x 160 mm (3/4m)", "Hol", "Dubbelzijdig profiel"],
            ["MAX", "20 x 185 mm (3/4m)", "Massief", "Extra breed, palletverkoop"],
            ["Classic", "20 x 160 mm (3/4m)", "Massief", "Geborsteld oppervlak"],
            ["Premium", "20 x 160 mm (3/4m)", "Massief", "Houtnerf 3D patroon"],
            ["Elegance", "25 x 140 mm (4m)", "Hol+RENOLIT", "Korund antislip, topmodel"],
          ],
        },
      },
      {
        heading: "3. Onderconstructie",
        paragraphs: [
          "De onderconstructie is cruciaal voor de levensduur en stabiliteit van uw vlonder.",
        ],
        bullets: [
          "Maximale balkafstand: 40 cm hart-op-hart",
          "Kies WPC onderbalken (50x30mm, 3m) of aluminium leggers",
          "Aluminium laag profiel (36x24mm) voor minimale opbouwhoogte",
          "Aluminium hoog profiel (38x51mm) voor grotere overspanningen",
          "Zorg voor minimaal 1% afschot voor waterafvoer (1 cm per meter)",
          "Laat minimaal 20mm ventilatie onder de constructie",
        ],
      },
      {
        heading: "4. Montage vlonderplanken",
        bullets: [
          "Begin bij een rechte referentielijn (muur of gespannen snoer)",
          "Bevestig de eerste plank met startclips",
          "Gebruik tussenclips voor onzichtbare bevestiging",
          "Laat 5-8mm expansieruimte tussen planken (gebruik spacers)",
          "Laat 10-15mm ruimte langs muren en obstakels",
          "Monteer van links naar rechts of van de muur af",
          "Tempo: circa 4 m2 per uur bij ervaren montage",
        ],
      },
      {
        heading: "5. Afwerking",
        bullets: [
          "Monteer afwerklijsten (plat of L-profiel) langs de randen",
          "Gebruik L-profielen bij treden en hoogverschillen",
          "Controleer alle clipverbindingen op stevigheid",
          "Verwijder alle beschermfolies en bouwresten",
        ],
      },
      {
        heading: "Montagesets",
        table: {
          headers: ["Set", "Dekking", "Inhoud"],
          rows: [
            ["Montageset 2m2", "2 m2", "Clips + schroeven voor 2m2"],
            ["Montageset 10m2", "10 m2", "Clips + schroeven voor 10m2 (voordeliger)"],
          ],
        },
      },
    ],
  },
  {
    id: "handleiding-aluminium-onderbalken",
    title: "Montagehandleiding: aluminium onderbalken voor vlonders",
    subtitle: "Gedetailleerde installatiehandleiding voor aluminium leggers",
    sections: [
      {
        heading: "Productoverzicht",
        table: {
          headers: ["Type", "Afmeting", "Lengte", "Toepassing"],
          rows: [
            ["Laag profiel", "36,4 x 24 mm", "4 meter", "Balkons, dakterrassen, minimale opbouwhoogte"],
            ["Hoog profiel", "38 x 51 mm", "4 meter", "Tuinterrassen, grotere overspanningen"],
          ],
        },
      },
      {
        heading: "Voordelen aluminium onderconstructie",
        bullets: [
          "100% vochtbestendig — geen rotting mogelijk",
          "Lichtgewicht en eenvoudig te verwerken",
          "Onbeperkte levensduur bij normaal gebruik",
          "Dimensioneel stabiel — geen uitzetting of krimp",
          "Recyclebaar materiaal",
        ],
      },
      {
        heading: "Montage op verstelbare terrasdragers (plots)",
        bullets: [
          "Plaats terrasdragers op hart-op-hart afstand van max. 40 cm",
          "Stel de gewenste hoogte in (25-260mm bereik)",
          "Leg de aluminium leggers in de oplegpunten",
          "Controleer waterpas en pas hoogtes aan",
          "Verbind leggers met verbindingsstukken bij langere afstanden",
          "Gebruik hoekbeugels bij hoekverbindingen",
        ],
      },
      {
        heading: "Montage op rubberstroken",
        bullets: [
          "Leg rubberstroken op de betonvloer of tegels",
          "Plaats de aluminium leggers op de rubberstroken",
          "Rubberstroken dempen geluid en voorkomen beschadiging",
          "Controleer waterpas en corrigeer met extra rubberstroken",
        ],
      },
      {
        heading: "Aandachtspunten",
        bullets: [
          "Maximale balkafstand: 40 cm hart-op-hart",
          "Minimaal 1% afschot richting de afwatering",
          "Minimaal 20mm ruimte onder de constructie voor ventilatie",
          "Gebruik alleen RVS of verzinkte schroeven (geen onbehandeld staal)",
          "Bij combinatie met WPC planken: volg de montagehandleiding van de gekozen planklijn",
        ],
      },
    ],
  },
  {
    id: "handleiding-vlonder-accessoires",
    title: "Montagehandleiding: vlonder accessoires & afwerking",
    subtitle: "Installatiehandleiding voor onderbalken, clips, profielen en randafwerking",
    sections: [
      {
        heading: "Onderbalken (leggers)",
        table: {
          headers: ["Product", "Specificatie", "Opmerking"],
          rows: [
            ["WPC onderbalk", "50 x 30 mm, 3 meter", "Standaard, composiet"],
            ["Aluminium laag", "36,4 x 24 mm, 4 meter", "Voor lage opbouwhoogte"],
            ["Aluminium hoog", "38 x 51 mm, 4 meter", "Voor grotere overspanningen"],
          ],
        },
      },
      {
        heading: "Verstelbare terrasdragers",
        paragraphs: [
          "De verstelbare terrasdrager maakt het mogelijk om een perfect waterpas vlonder te creeren op ongelijke ondergronden.",
        ],
        bullets: [
          "Hoogtebereik: 25 tot 260 mm",
          "Draagvermogen: 1000 kg per stuk",
          "Materiaal: polypropyleen (vorstbestendig)",
          "Plaats 6-9 dragers per m2 afhankelijk van balkafstand",
        ],
      },
      {
        heading: "Montagesets (clips & schroeven)",
        bullets: [
          "Montageset 2m2: voor kleine projecten en reparaties",
          "Montageset 10m2: voordeelverpakking voor grotere projecten",
          "Clips zorgen voor onzichtbare bevestiging",
          "Gebruik meegeleverde RVS schroeven",
          "Circa 20-25 clips per m2",
        ],
      },
      {
        heading: "Afwerkingsprofielen",
        table: {
          headers: ["Profiel", "Materiaal", "Toepassing"],
          rows: [
            ["Platte afwerklijst", "WPC composiet", "Rechte randen, plintafwerking"],
            ["L-profiel composiet", "WPC composiet", "Hoeken, treden, hoogverschillen"],
            ["L-profiel aluminium", "Aluminium", "Strakke moderne randafwerking"],
          ],
        },
      },
      {
        heading: "Montagetips afwerking",
        bullets: [
          "Monteer afwerklijsten na het leggen van alle vlonderplanken",
          "Gebruik voorgeboorde gaten om splitsing te voorkomen",
          "L-profielen bij treden: bevestig zowel horizontaal als verticaal",
          "Laat 5mm ruimte tussen afwerklijsten voor uitzetting",
        ],
      },
    ],
  },
  {
    id: "snelstartgids-vlonder",
    title: "Snelstartgids: vlonder monteren in 4 m2/uur",
    subtitle: "Visuele snelstartgids met de belangrijkste montagestappen",
    sections: [
      {
        heading: "Stap 1: Onderconstructie",
        bullets: [
          "Leg onderbalken op max. 40 cm hart-op-hart",
          "Zorg voor 1% afschot richting afwatering",
          "Controleer waterpas in beide richtingen",
        ],
      },
      {
        heading: "Stap 2: Eerste plank plaatsen",
        bullets: [
          "Begin bij een vaste referentielijn (muur of snoer)",
          "Bevestig startclips aan de onderbalk",
          "Klik de eerste plank in de startclips",
          "Laat 10-15mm ruimte tot de muur",
        ],
      },
      {
        heading: "Stap 3: Planken doorleggen",
        bullets: [
          "Plaats tussenclips aan de onderbalk tegen de eerste plank",
          "Klik de volgende plank in de clips",
          "Herhaal tot het terras vol ligt",
          "Gebruik spacers voor gelijkmatige voegen (5-8mm)",
        ],
      },
      {
        heading: "Stap 4: Afwerking",
        bullets: [
          "Zaag de laatste plank op maat",
          "Monteer afwerklijsten langs alle zichtbare randen",
          "Gebruik L-profielen bij hoogteverschillen en treden",
          "Verwijder alle beschermfolies",
        ],
      },
      {
        heading: "Tempo-indicatie",
        table: {
          headers: ["Ervaring", "Tempo", "Opmerking"],
          rows: [
            ["Beginner", "2-3 m2/uur", "Inclusief meten en uitlijnen"],
            ["Ervaren klusser", "4 m2/uur", "Na de eerste rij gaat het snel"],
            ["Professional", "6-8 m2/uur", "Met twee personen nog sneller"],
          ],
        },
      },
      {
        heading: "Veelgemaakte fouten",
        bullets: [
          "Geen expansieruimte laten (verbuiging bij warmte)",
          "Balkafstand te groot (doorbuiging)",
          "Geen afschot (waterophoping)",
          "Metalen schroeven direct in composiet (roestplekken)",
        ],
      },
    ],
  },

  // ─── BESTAANDE DOCUMENTEN ────────────────────────────────────────
  {
    id: "checklist-schutting-plaatsen",
    title: "Checklist: composiet schutting plaatsen",
    subtitle: "Stap-voor-stap checklist voor een succesvolle montage",
    sections: [
      {
        heading: "1. Voorbereiding",
        bullets: [
          "Controleer de erfgrens met uw buren en/of kadaster",
          "Check gemeentelijke regelgeving (vergunning nodig bij > 2 meter)",
          "Meet de totale lengte en bepaal het aantal schermen",
          "Bestel 5-10% extra materiaal voor zaagverlies",
        ],
      },
      {
        heading: "2. Benodigd gereedschap",
        bullets: [
          "Waterpas (minimaal 1 meter)",
          "Accuboormachine met bitset",
          "Meetlint en potlood",
          "Verstekzaag of handcirkelzaag",
          "Schep en grondboor (voor inbetonneren)",
          "Betontroffel en emmer",
        ],
      },
      {
        heading: "3. Grondvoorbereiding",
        bullets: [
          "Markeer de paalgaten op gelijke afstanden (max. 180 cm hart-op-hart)",
          "Graaf paalgaten van minimaal 60 cm diep",
          "Gebruik snelbeton of regulier beton voor verankering",
          "Laat beton minimaal 24 uur uitharden",
        ],
      },
      {
        heading: "4. Palen plaatsen",
        bullets: [
          "Controleer of alle palen waterpas en in lijn staan",
          "Gebruik tussenafstandhouders voor gelijke schermbreedtes",
          "Monteer voetplaten als u niet wilt inbetonneren",
          "Hoekpalen extra verankeren voor windbelasting",
        ],
      },
      {
        heading: "5. Planken monteren",
        bullets: [
          "Begin onderaan en werk naar boven",
          "Gebruik het kliksysteem voor snelle montage",
          "Controleer regelmatig of de planken waterpas liggen",
          "Zaag de laatste plank op maat indien nodig",
        ],
      },
      {
        heading: "6. Afwerking",
        bullets: [
          "Plaats afdekkapjes op alle palen",
          "Controleer alle verbindingen op stevigheid",
          "Verwijder beschermfolie van de planken",
          "Maak eventuele bouwresten schoon",
        ],
      },
    ],
  },
  {
    id: "grondvoorbereiding",
    title: "Checklist: grondvoorbereiding",
    subtitle: "De juiste fundering voor schuttingen en vlonders",
    sections: [
      {
        heading: "Grondtypen herkennen",
        table: {
          headers: ["Grondtype", "Kenmerken", "Aandachtspunten"],
          rows: [
            ["Zandgrond", "Licht, goed doorlatend", "Paalgaten kunnen invallen, gebruik bekisting"],
            ["Kleigrond", "Zwaar, houdt water vast", "Extra drainage nodig, diepere fundering"],
            ["Veengrond", "Zacht, kan zakken", "Gebruik langere palen of heipalen"],
            ["Tuinaarde", "Gemengd, variabel", "Verwijder losse grond tot vaste ondergrond"],
          ],
        },
      },
      {
        heading: "Drainage aanleggen",
        bullets: [
          "Leg drainage bij klei- of veengrond",
          "Gebruik grind of split onder funderingen",
          "Zorg voor afschot van min. 1 cm per meter (vlonders)",
          "Voorkom waterophoping bij paalgaten",
        ],
      },
      {
        heading: "Funderingsopties",
        table: {
          headers: ["Type", "Geschikt voor", "Voordeel"],
          rows: [
            ["Betonpoer", "Stevige grond", "Eenvoudig, geen graven"],
            ["Inbetonneren", "Alle grondtypen", "Zeer stabiel"],
            ["Schroefanker", "Zand/kleigrond", "Geen beton nodig"],
            ["Paaltjes op voetplaat", "Verharde ondergrond", "Direct te monteren"],
          ],
        },
      },
      {
        heading: "Vorstdiepte",
        paragraphs: [
          "In Nederland is de vorstdiepte circa 60-80 cm. Zorg dat funderingen minimaal tot deze diepte reiken om vorstschade te voorkomen.",
        ],
      },
    ],
  },
  {
    id: "vergunningen-regels",
    title: "Gids: vergunningen & regels voor schuttingen",
    subtitle: "Alles over gemeentelijke regels, erfgrenzen en burenrecht",
    sections: [
      {
        heading: "Wanneer heb je een vergunning nodig?",
        bullets: [
          "Schuttingen tot 2 meter in de achtertuin: meestal vergunningsvrij",
          "Schuttingen tot 1 meter in de voortuin: meestal vergunningsvrij",
          "Hoger dan 2 meter: altijd een omgevingsvergunning nodig",
          "In beschermd stadsgezicht: altijd contact opnemen met de gemeente",
          "Bij monumentale panden: aparte regels van toepassing",
        ],
      },
      {
        heading: "Erfgrens & burenrecht",
        paragraphs: [
          "Een schutting op de erfgrens is gezamenlijk eigendom. Beide buren moeten instemmen met plaatsing en verdelen de kosten. Plaats je de schutting volledig op eigen grond, dan ben jij de eigenaar en draag je alle kosten.",
        ],
        bullets: [
          "Op de erfgrens: toestemming buren vereist",
          "Op eigen grond: geen toestemming nodig, maar informeer buren uit beleefdheid",
          "Minimale afstand tot openbare weg: raadpleeg gemeentelijk bestemmingsplan",
        ],
      },
      {
        heading: "Maximale hoogtes",
        table: {
          headers: ["Locatie", "Max. hoogte", "Opmerking"],
          rows: [
            ["Achtertuin (achter verlengde voorgevel)", "2,00 m", "Vergunningsvrij"],
            ["Voortuin", "1,00 m", "Vergunningsvrij"],
            ["Zijtuin (grenzend aan openbaar)", "1,00 m", "Vergunningsvrij"],
            ["Hoger dan bovenstaand", "Variabel", "Omgevingsvergunning vereist"],
          ],
        },
      },
      {
        heading: "Handige links",
        bullets: [
          "Omgevingsloket online: www.omgevingsloket.nl",
          "Kadaster: www.kadaster.nl",
          "Rijksoverheid bouwregelgeving: www.rijksoverheid.nl",
        ],
      },
    ],
  },
  {
    id: "kleurengids",
    title: "Kleurengids: het perfecte composiet voor jouw tuin",
    subtitle: "Kies de ideale kleur bij jouw gevel, tuin en stijl",
    sections: [
      {
        heading: "Warme vs. koele tinten",
        paragraphs: [
          "Warme tinten (Teak, Walnoot, Eiken) passen bij een landelijke of klassieke tuinstijl. Ze creeren een sfeervolle, uitnodigende uitstraling.",
          "Koele tinten (Grijs, Zwart, Antraciet) passen bij een moderne of industriele stijl. Ze geven een strak en tijdloos resultaat.",
        ],
      },
      {
        heading: "Kleuren combineren",
        bullets: [
          "Donkere gevel + lichte schutting: mooi contrast",
          "Lichte gevel + donkere schutting: modern en strak",
          "Schutting en vlonder in dezelfde kleur: rustgevend geheel",
          "Accentkleur in decorpanelen: speels effect",
        ],
      },
      {
        heading: "Beschikbare kleuren vlonderplanken",
        table: {
          headers: ["Kleur", "Categorie", "Beschikbaar in"],
          rows: [
            ["Donker Bruin", "Warm", "Alle lijnen"],
            ["Walnoot", "Warm", "Alle lijnen"],
            ["Grafiet", "Koel", "Alle lijnen"],
            ["Grijs", "Koel", "Komorowa, Eco"],
            ["Donker Grijs", "Koel", "Komorowa, Eco"],
            ["Berg Eiken", "Warm", "Elegance"],
            ["Honing Eiken", "Warm", "Elegance"],
            ["Naturel Eiken", "Warm", "Elegance"],
          ],
        },
      },
      {
        heading: "Kleurvastheid & UV-bestendigheid",
        paragraphs: [
          "Alle composiet producten zijn UV-bestendig. In de eerste weken kan een lichte kleurverandering optreden door weathering — dit is normaal en stabiliseert zich binnen 8-12 weken. Planken met co-extrusie beschermlaag behouden hun kleur het langst.",
        ],
      },
    ],
  },
  {
    id: "onderhoud-composiet-vlonder",
    title: "Onderhoudsadvies: composiet vlonderplanken",
    subtitle: "Houd uw vlonder mooi met deze onderhoudstips",
    sections: [
      {
        heading: "Jaarlijks onderhoud",
        bullets: [
          "Was de vlonder minimaal 1x per jaar met warm zeepwater",
          "Gebruik een zachte borstel of schrobmachine",
          "Spoel na met schoon water",
          "Verwijder bladeren en vuil uit de naden",
        ],
      },
      {
        heading: "Reinigingsmethoden per vlektype",
        table: {
          headers: ["Vlektype", "Methode", "Middel"],
          rows: [
            ["Vettige vlekken (BBQ, olie)", "Droog reinigen", "Kleigebaseerd reinigingsmiddel"],
            ["Groene aanslag / mos", "Nat reinigen", "Anti-mos behandeling (zonder bleek)"],
            ["Algemeen vuil", "Nat reinigen", "Warm zeepwater + zachte borstel"],
            ["Roestplekken", "Lokaal behandelen", "Oxaalzuur oplossing"],
          ],
        },
      },
      {
        heading: "Aanbevolen apparatuur",
        bullets: [
          "Schrobmachine (bijv. Karcher PCL 4) — ideaal voor grote oppervlakken",
          "Hogedrukreiniger: maximaal 80 bar, 25 cm afstand, nooit stilhouden",
          "Zachte bezem voor regelmatig vegen",
        ],
      },
      {
        heading: "Seizoenstips",
        bullets: [
          "Voorjaar: grote schoonmaakbeurt na de winter",
          "Zomer: direct vlekken verwijderen (BBQ, ijs)",
          "Herfst: bladeren en naalden verwijderen",
          "Winter: sneeuw ruimen met kunststof schep (geen metaal)",
        ],
      },
      {
        heading: "Ventilatie",
        paragraphs: [
          "Zorg dat de ruimte tussen en onder de planken vrij blijft van vuil. Goede ventilatie voorkomt vocht en verlengt de levensduur van uw vlonder.",
        ],
      },
    ],
  },
  {
    id: "epd-vlonderplanken",
    title: "Milieuverklaring (EPD): composiet vlonderplanken",
    subtitle: "Environmental Product Declaration conform NF EN ISO 14025",
    sections: [
      {
        heading: "Wat is een EPD?",
        paragraphs: [
          "Een Environmental Product Declaration (EPD) is een gestandaardiseerd document dat de milieu-impact van een product over de gehele levenscyclus beschrijft. Het is gebaseerd op een levenscyclusanalyse (LCA) conform Europese normen.",
        ],
      },
      {
        heading: "Kerngegevens",
        table: {
          headers: ["Kenmerk", "Waarde"],
          rows: [
            ["Materiaalsamenstelling", "50% houtvezels, 45% gerecycled kunststof, 5% additieven"],
            ["Recycled content", "Tot 95% gerecycled materiaal"],
            ["Levensduur (referentie)", "25 jaar"],
            ["Recyclebaarheid", "100% recyclebaar na levensduur"],
            ["Norm", "NF EN ISO 14025 & NF EN 15804+A2"],
          ],
        },
      },
      {
        heading: "Milieu-impact per m2",
        paragraphs: [
          "De CO2-voetafdruk van composiet vlonderplanken is significant lager dan die van tropisch hardhout, mede door het gebruik van gerecycled materiaal en het ontbreken van onderhoud met chemische middelen gedurende de levensduur.",
        ],
      },
      {
        heading: "Circulaire economie",
        bullets: [
          "Productie met 95% gerecycled materiaal",
          "Geen restmateriaal bij productie — 100% benut",
          "Na levensduur volledig recyclebaar tot nieuw composiet",
          "Geen chemische behandeling nodig tijdens gebruik",
        ],
      },
    ],
  },
  {
    id: "productcatalogus",
    title: "Productcatalogus 2026: composiet vlonderplanken & schuttingen",
    subtitle: "Compleet overzicht van alle productlijnen, specificaties en kleuren",
    sections: [
      {
        heading: "Vlonderplanken overzicht",
        table: {
          headers: ["Lijn", "Type", "Afmeting (mm)", "Kleuren", "Prijs indicatie"],
          rows: [
            ["Slim", "Hol", "25x140, 3m", "3 kleuren", "Vanaf EUR 11,95/m"],
            ["Eco", "Hol", "25x140, 3/4m", "5 kleuren", "Vanaf EUR 14,95/m"],
            ["Komorowa", "Hol + co-extrusie", "25x160, 3/4m", "5 kleuren", "Vanaf EUR 18,95/m"],
            ["MAX", "Massief", "20x185, 3/4m", "3 kleuren", "Vanaf EUR 19,95/m"],
            ["Classic", "Massief + geborsteld", "20x160, 3/4m", "3 kleuren", "Vanaf EUR 26,95/m"],
            ["Premium", "Massief + houtnerf", "20x160, 3/4m", "3 kleuren", "Vanaf EUR 28,95/m"],
            ["Elegance", "RENOLIT + korund", "25x140, 4m", "3 kleuren", "Vanaf EUR 23,95/m"],
          ],
        },
      },
      {
        heading: "Schuttingplanken overzicht",
        table: {
          headers: ["Lijn", "Afmeting (mm)", "Afwerking", "Kleuren", "Prijs indicatie"],
          rows: [
            ["Classic", "19x150, 2m", "Geborsteld", "3 kleuren", "Vanaf EUR 16,49/m"],
            ["Premium", "19x150, 2m", "Houtnerf 3D", "3 kleuren", "Vanaf EUR 18,95/m"],
            ["Universeel profiel", "19x150, div.", "Classic/Premium", "3 kleuren", "Vanaf EUR 16,49/m"],
          ],
        },
      },
      {
        heading: "Accessoires overzicht",
        table: {
          headers: ["Product", "Specificatie", "Prijs indicatie"],
          rows: [
            ["WPC onderbalk", "50x30mm, 3m", "EUR 9,49/m"],
            ["Alu legger laag", "36x24mm, 4m", "EUR 12,49/m"],
            ["Alu legger hoog", "38x51mm, 4m", "EUR 16,95/m"],
            ["Montageset 2m2", "Clips+schroeven", "EUR 19,95/set"],
            ["Montageset 10m2", "Clips+schroeven", "EUR 94,95/set"],
            ["Afwerklijst plat", "WPC", "EUR 6,95/m"],
            ["L-profiel composiet", "WPC", "EUR 10,95/m"],
            ["L-profiel aluminium", "Aluminium", "EUR 11,95/m"],
            ["Terrasdrager", "25-260mm", "EUR 4,95/stuk"],
          ],
        },
      },
      {
        heading: "Garantie & kwaliteit",
        bullets: [
          "25 jaar fabrieksgarantie op alle producten",
          "Co-extrusie beschermlaag op Komorowa en Elegance",
          "100% recycleerbaar materiaal",
          "UV-bestendig en kleurvast",
          "CE-markering conform Europese normen",
        ],
      },
    ],
  },
];

/* ── Branded PDF builder ────────────────────────────────────────── */

function buildPdf(doc: BrandedDoc): Uint8Array {
  const brandName = "SchuttingvanComposiet.nl";
  const tagline = "Composiet vlonderplanken & schuttingen | 25 jaar garantie";
  const website = "www.schuttingvancomposiet.nl";
  const email = "info@schuttingvancomposiet.nl";

  // Brand colors (RGB 0-1) derived from site design tokens
  const C = {
    primaryR: 0.153, primaryG: 0.404, primaryB: 0.286,   // HSL 152 45% 28% — green
    accentR: 0.851, accentG: 0.467, accentB: 0.149,      // HSL 28 70% 50% — orange
    darkR: 0.094, darkG: 0.086, darkB: 0.078,             // foreground near-black
    mutedR: 0.46, mutedG: 0.46, mutedB: 0.46,             // muted text
    lightBgR: 0.965, lightBgG: 0.957, lightBgB: 0.945,    // warm off-white row
    white: 1,
    tableHeaderR: 0.153, tableHeaderG: 0.404, tableHeaderB: 0.286,
    tableAltR: 0.96, tableAltG: 0.96, tableAltB: 0.955,
  };

  const leftMargin = 50;
  const rightMargin = 545;
  const pageWidth = rightMargin - leftMargin;
  const lineHeight = 14;
  const objects: string[] = [];
  const pages: { contentRef: number; length: number }[] = [];
  let objCount = 0;
  let currentPageContent = "";
  let yPos = 750;
  let currentPageNum = 0;

  function addObj(content: string): number {
    objCount++;
    objects.push(content);
    return objCount;
  }

  function escapePdf(text: string): string {
    return text
      .replace(/\\/g, "\\\\")
      .replace(/\(/g, "\\(")
      .replace(/\)/g, "\\)")
      .replace(/[^\x20-\x7E]/g, (ch) => {
        const map: Record<string, string> = {
          "é": "e", "è": "e", "ë": "e", "ê": "e",
          "á": "a", "à": "a", "ä": "a", "â": "a",
          "ó": "o", "ò": "o", "ö": "o", "ô": "o",
          "ú": "u", "ù": "u", "ü": "u", "û": "u",
          "í": "i", "ì": "i", "ï": "i", "î": "i",
          "ñ": "n", "ç": "c",
          "²": "2", "³": "3",
          "€": "EUR",
          "–": "-", "—": "--",
          "\u2018": "'", "\u2019": "'", "\u201C": "\"", "\u201D": "\"",
          "…": "...",
          "×": "x",
          "°": "o",
          "₂": "2",
        };
        return map[ch] || "?";
      });
  }

  function wrapText(text: string, maxWidth: number, fontSize: number): string[] {
    const charWidth = fontSize * 0.48;
    const maxChars = Math.floor(maxWidth / charWidth);
    const words = text.split(" ");
    const result: string[] = [];
    let current = "";
    for (const word of words) {
      if ((current + " " + word).trim().length > maxChars) {
        if (current) result.push(current.trim());
        current = word;
      } else {
        current = current ? current + " " + word : word;
      }
    }
    if (current) result.push(current.trim());
    return result;
  }

  // ── Page chrome (header bar + footer) ──────────────────────────
  function drawPageChrome() {
    currentPageNum++;
    // Top bar — green background full width
    currentPageContent += `${C.primaryR} ${C.primaryG} ${C.primaryB} rg\n`;
    currentPageContent += `0 808 595 34 re f\n`;
    // Brand name in white on green bar
    currentPageContent += `BT /F2 11 Tf ${C.white} ${C.white} ${C.white} rg ${leftMargin} 820 Td (${escapePdf(brandName)}) Tj ET\n`;
    // Tagline right-aligned
    currentPageContent += `BT /F1 7 Tf ${C.white} ${C.white} ${C.white} rg 310 820 Td (${escapePdf(tagline)}) Tj ET\n`;

    // Orange accent stripe below header
    currentPageContent += `${C.accentR} ${C.accentG} ${C.accentB} rg\n`;
    currentPageContent += `0 805 595 3 re f\n`;

    // Footer line
    currentPageContent += `${C.primaryR} ${C.primaryG} ${C.primaryB} rg\n`;
    currentPageContent += `${leftMargin} 42 ${pageWidth} 1 re f\n`;
    // Footer text
    currentPageContent += `BT /F1 7 Tf ${C.mutedR} ${C.mutedG} ${C.mutedB} rg ${leftMargin} 30 Td (${escapePdf(brandName + "  |  " + website + "  |  " + email)}) Tj ET\n`;
    // Page number right
    currentPageContent += `BT /F1 7 Tf ${C.mutedR} ${C.mutedG} ${C.mutedB} rg 510 30 Td (Pagina ${currentPageNum}) Tj ET\n`;
    // Warranty badge
    currentPageContent += `BT /F2 7 Tf ${C.accentR} ${C.accentG} ${C.accentB} rg 440 30 Td (25 jaar garantie) Tj ET\n`;
  }

  function newPage() {
    if (currentPageContent) {
      const streamBytes = new TextEncoder().encode(currentPageContent);
      const streamRef = addObj(
        `<< /Length ${streamBytes.length} >>\nstream\n${currentPageContent}\nendstream`
      );
      pages.push({ contentRef: streamRef, length: streamBytes.length });
    }
    currentPageContent = "";
    yPos = 785;
    drawPageChrome();
    yPos = 780;
  }

  function checkSpace(needed: number) {
    if (yPos - needed < 60) {
      newPage();
    }
  }

  function addText(text: string, fontSize: number, font: string, r: number, g: number, b: number, x?: number) {
    const xPos = x ?? leftMargin;
    const maxW = rightMargin - xPos;
    const wrapped = wrapText(text, maxW, fontSize);
    for (const line of wrapped) {
      checkSpace(lineHeight + 2);
      currentPageContent += `BT ${font} ${fontSize} Tf ${r} ${g} ${b} rg ${xPos} ${yPos} Td (${escapePdf(line)}) Tj ET\n`;
      yPos -= lineHeight;
    }
  }

  // ── COVER PAGE ──────────────────────────────────────────────────
  currentPageContent = "";
  currentPageNum++;

  // Full green background top half
  currentPageContent += `${C.primaryR} ${C.primaryG} ${C.primaryB} rg\n0 520 595 322 re f\n`;
  // Orange accent band
  currentPageContent += `${C.accentR} ${C.accentG} ${C.accentB} rg\n0 516 595 8 re f\n`;

  // Brand name large, white
  currentPageContent += `BT /F2 28 Tf ${C.white} ${C.white} ${C.white} rg ${leftMargin} 740 Td (${escapePdf(brandName)}) Tj ET\n`;
  // Tagline below brand
  currentPageContent += `BT /F1 11 Tf ${C.white} ${C.white} ${C.white} rg ${leftMargin} 715 Td (${escapePdf(tagline)}) Tj ET\n`;

  // Decorative lines
  currentPageContent += `${C.white} ${C.white} ${C.white} rg\n${leftMargin} 700 200 1 re f\n`;

  // Document title — large on green
  const titleWrapped = wrapText(doc.title, pageWidth, 22);
  let titleY = 650;
  for (const line of titleWrapped) {
    currentPageContent += `BT /F2 22 Tf ${C.white} ${C.white} ${C.white} rg ${leftMargin} ${titleY} Td (${escapePdf(line)}) Tj ET\n`;
    titleY -= 28;
  }

  // Subtitle below title
  const subWrapped = wrapText(doc.subtitle, pageWidth, 12);
  let subY = titleY - 10;
  for (const line of subWrapped) {
    currentPageContent += `BT /F1 12 Tf ${C.white} ${C.white} ${C.white} rg ${leftMargin} ${subY} Td (${escapePdf(line)}) Tj ET\n`;
    subY -= 16;
  }

  // Bottom half — warm background
  currentPageContent += `${C.lightBgR} ${C.lightBgG} ${C.lightBgB} rg\n0 0 595 516 re f\n`;

  // Info box on cover
  const boxY = 440;
  currentPageContent += `${C.white} ${C.white} ${C.white} rg\n${leftMargin} ${boxY - 130} ${pageWidth} 140 re f\n`;
  // Border on info box
  currentPageContent += `${C.primaryR} ${C.primaryG} ${C.primaryB} rg\n${leftMargin} ${boxY - 130} 3 140 re f\n`;

  const infoLines = [
    "Dit document is eigendom van " + brandName,
    "Website: " + website,
    "E-mail: " + email,
    "Alle producten worden geleverd met 25 jaar fabrieksgarantie.",
    "Composiet: UV-bestendig, onderhoudsarm, 100% recyclebaar.",
  ];
  let infoY = boxY - 10;
  for (const line of infoLines) {
    currentPageContent += `BT /F1 9 Tf ${C.darkR} ${C.darkG} ${C.darkB} rg ${leftMargin + 14} ${infoY} Td (${escapePdf(line)}) Tj ET\n`;
    infoY -= 16;
  }

  // Footer on cover
  currentPageContent += `${C.primaryR} ${C.primaryG} ${C.primaryB} rg\n0 0 595 30 re f\n`;
  currentPageContent += `BT /F1 8 Tf ${C.white} ${C.white} ${C.white} rg ${leftMargin} 10 Td (${escapePdf(brandName + "  |  " + website + "  |  25 jaar garantie op alle producten")}) Tj ET\n`;

  // Close cover page
  const coverBytes = new TextEncoder().encode(currentPageContent);
  const coverRef = addObj(`<< /Length ${coverBytes.length} >>\nstream\n${currentPageContent}\nendstream`);
  pages.push({ contentRef: coverRef, length: coverBytes.length });

  // ── CONTENT PAGES ───────────────────────────────────────────────
  currentPageContent = "";
  yPos = 785;
  drawPageChrome();
  yPos = 780;

  // Document title on first content page
  addText(doc.title, 16, "/F2", C.primaryR, C.primaryG, C.primaryB);
  yPos -= 2;
  addText(doc.subtitle, 10, "/F1", C.mutedR, C.mutedG, C.mutedB);
  yPos -= 6;

  // Green divider
  currentPageContent += `${C.primaryR} ${C.primaryG} ${C.primaryB} rg\n${leftMargin} ${yPos} ${pageWidth} 2 re f\n`;
  yPos -= 16;

  // Sections
  for (const section of doc.sections) {
    checkSpace(50);

    // Section heading — green left bar + bold text
    currentPageContent += `${C.accentR} ${C.accentG} ${C.accentB} rg\n${leftMargin} ${yPos - 3} 3 16 re f\n`;
    addText(section.heading, 13, "/F2", C.primaryR, C.primaryG, C.primaryB, leftMargin + 10);
    yPos -= 6;

    if (section.paragraphs) {
      for (const p of section.paragraphs) {
        addText(p, 10, "/F1", C.darkR, C.darkG, C.darkB);
        yPos -= 4;
      }
    }

    if (section.bullets) {
      for (const b of section.bullets) {
        checkSpace(lineHeight + 4);
        // Orange bullet dot
        currentPageContent += `${C.accentR} ${C.accentG} ${C.accentB} rg\n${leftMargin + 6} ${yPos + 3} 4 4 re f\n`;
        addText(b, 10, "/F1", C.darkR, C.darkG, C.darkB, leftMargin + 16);
      }
      yPos -= 4;
    }

    if (section.table) {
      const { headers, rows } = section.table;
      const colCount = headers.length;
      const colWidth = pageWidth / colCount;

      checkSpace((rows.length + 1) * (lineHeight + 4) + 16);

      // Table header row — green background
      currentPageContent += `${C.tableHeaderR} ${C.tableHeaderG} ${C.tableHeaderB} rg\n${leftMargin} ${yPos - 4} ${pageWidth} ${lineHeight + 6} re f\n`;
      for (let c = 0; c < colCount; c++) {
        const x = leftMargin + c * colWidth + 6;
        currentPageContent += `BT /F2 8.5 Tf ${C.white} ${C.white} ${C.white} rg ${x} ${yPos} Td (${escapePdf(headers[c])}) Tj ET\n`;
      }
      yPos -= lineHeight + 6;

      // Table data rows — alternating
      for (let ri = 0; ri < rows.length; ri++) {
        checkSpace(lineHeight + 4);
        if (ri % 2 === 0) {
          currentPageContent += `${C.tableAltR} ${C.tableAltG} ${C.tableAltB} rg\n${leftMargin} ${yPos - 3} ${pageWidth} ${lineHeight + 3} re f\n`;
        }
        for (let c = 0; c < colCount; c++) {
          const x = leftMargin + c * colWidth + 6;
          const cellText = rows[ri][c] || "";
          const maxChars = Math.floor((colWidth - 12) / 4.2);
          const display = cellText.length > maxChars ? cellText.slice(0, maxChars - 2) + ".." : cellText;
          currentPageContent += `BT /F1 8.5 Tf ${C.darkR} ${C.darkG} ${C.darkB} rg ${x} ${yPos} Td (${escapePdf(display)}) Tj ET\n`;
        }
        yPos -= lineHeight + 2;
      }
      // Bottom border on table
      currentPageContent += `${C.primaryR} ${C.primaryG} ${C.primaryB} rg\n${leftMargin} ${yPos + 1} ${pageWidth} 1 re f\n`;
      yPos -= 8;
    }
    yPos -= 10;
  }

  // ── Closing page block ──────────────────────────────────────────
  checkSpace(80);
  // Green box at bottom
  currentPageContent += `${C.primaryR} ${C.primaryG} ${C.primaryB} rg\n${leftMargin} ${yPos - 55} ${pageWidth} 60 re f\n`;
  currentPageContent += `BT /F2 11 Tf ${C.white} ${C.white} ${C.white} rg ${leftMargin + 14} ${yPos - 14} Td (${escapePdf("Vragen? Neem contact op voor gratis advies!")}) Tj ET\n`;
  currentPageContent += `BT /F1 9 Tf ${C.white} ${C.white} ${C.white} rg ${leftMargin + 14} ${yPos - 32} Td (${escapePdf(website + "  |  " + email + "  |  25 jaar fabrieksgarantie")}) Tj ET\n`;

  // Finalize last page
  newPage();

  // ── Build PDF byte structure ────────────────────────────────────
  const finalObjects: string[] = [];
  let finalObjCount = 0;

  function addFinalObj(content: string): number {
    finalObjCount++;
    finalObjects.push(content);
    return finalObjCount;
  }

  const catalogRef = addFinalObj("");
  const pagesRef = addFinalObj("");
  const fontRef = addFinalObj(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>`);
  const fontBoldRef = addFinalObj(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>`);

  const pageRefs: number[] = [];
  for (const page of pages) {
    const streamContent = objects[page.contentRef - 1];
    const streamRef = addFinalObj(streamContent);

    const pageRef = addFinalObj(
      `<< /Type /Page /Parent ${pagesRef} 0 R /MediaBox [0 0 595 842] /Contents ${streamRef} 0 R /Resources << /Font << /F1 ${fontRef} 0 R /F2 ${fontBoldRef} 0 R >> >> >>`
    );
    pageRefs.push(pageRef);
  }

  finalObjects[catalogRef - 1] = `<< /Type /Catalog /Pages ${pagesRef} 0 R >>`;
  finalObjects[pagesRef - 1] = `<< /Type /Pages /Kids [${pageRefs.map((r) => `${r} 0 R`).join(" ")}] /Count ${pageRefs.length} >>`;

  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [];
  for (let i = 0; i < finalObjects.length; i++) {
    offsets.push(pdf.length);
    pdf += `${i + 1} 0 obj\n${finalObjects[i]}\nendobj\n`;
  }

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${finalObjects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (const offset of offsets) {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${finalObjects.length + 1} /Root ${catalogRef} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return new TextEncoder().encode(pdf);
}

/* ── HTTP handler ──────────────────────────────────────────────── */

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { id, all } = await req.json().catch(() => ({ id: undefined, all: false }));

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const docsToGenerate = all ? documents : documents.filter((d) => d.id === id);

    if (docsToGenerate.length === 0) {
      return new Response(
        JSON.stringify({ error: "Document not found", available: documents.map((d) => d.id) }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const results: { id: string; url: string }[] = [];

    for (const doc of docsToGenerate) {
      const pdfBytes = buildPdf(doc);
      const fileName = `branded-pdfs/${doc.id}.pdf`;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, pdfBytes, {
          contentType: "application/pdf",
          upsert: true,
        });

      if (uploadError) {
        console.error(`Upload error for ${doc.id}:`, uploadError);
        continue;
      }

      const { data: urlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName);

      results.push({ id: doc.id, url: urlData.publicUrl });
    }

    return new Response(
      JSON.stringify({ ok: true, generated: results }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return new Response(
      JSON.stringify({ error: msg }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
