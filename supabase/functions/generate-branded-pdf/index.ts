import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  PDFDocument,
  PDFFont,
  PDFPage,
  rgb,
  degrees,
  StandardFonts,
} from "https://esm.sh/pdf-lib@1.17.1";
import fontkit from "https://esm.sh/@pdf-lib/fontkit@1.1.1";

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

const TONES = "teak, eiken, walnoot, grijs, donker grijs, vergrijsd eiken en zwart";

const documents: BrandedDoc[] = [
  // ─── MONTAGEHANDLEIDINGEN ────────────────────────────────────────
  {
    id: "handleiding-composiet-schutting",
    title: "Montagehandleiding: composiet schutting plaatsen",
    subtitle: "Stap-voor-stap installatiegids voor onze composiet schuttingen (standaard & Rhombus)",
    sections: [
      {
        heading: "1. Benodigde materialen",
        table: {
          headers: ["Component", "Specificatie", "Opmerking"],
          rows: [
            ["Composiet schuttingplank", "21 x 150 mm, 180 cm", "Standaard of Rhombus profiel"],
            ["U-paalprofiel (alu)", "60 x 60 mm", "Voor opname planken in paal"],
            ["Composiet paal", "68 x 68 mm, 200 cm", "Per vak 1 paal"],
            ["Voetplaat of betonpoer", "—", "Afhankelijk van ondergrond"],
            ["Topafdekplank", "30 x 150 mm", "Afwerking bovenkant"],
            ["Kleuren", TONES, "Match met schutting/gevelbekleding"],
          ],
        },
      },
      {
        heading: "2. Benodigd gereedschap",
        bullets: [
          "Waterpas (minimaal 1 meter)",
          "Accuboormachine met bitset",
          "Meetlint, potlood en slagkoord",
          "Verstekzaag of handcirkelzaag met fijntandblad voor composiet",
          "Schep en grondboor (bij inbetonneren)",
          "Betontroffel en emmer",
        ],
      },
      {
        heading: "3. Fundament voorbereiden",
        paragraphs: [
          "De stabiliteit van uw schutting begint bij een goed fundament. Paalgaten moeten minimaal 60 cm diep zijn (vorstdiepte in Nederland is 60-80 cm).",
        ],
        bullets: [
          "Markeer paalposities op gelijke afstand (hart-op-hart maximaal 195 cm)",
          "Graaf paalgaten van minimaal 60 cm diep en 25 x 25 cm breed",
          "Gebruik snelbeton of C20/25 beton voor verankering",
          "Laat beton minimaal 24 uur uitharden voor montage",
          "Alternatief: gebruik voetplaten op een verharde ondergrond",
        ],
      },
      {
        heading: "4. Palen plaatsen",
        bullets: [
          "Plaats de eerste paal en controleer met waterpas in twee richtingen",
          "Span een snoer tussen eerste en laatste paal voor een rechte lijn",
          "Controleer hart-op-hart afstand (max. 195 cm)",
          "Hoekpalen en eindpalen extra verankeren - hier werkt de meeste windbelasting",
        ],
      },
      {
        heading: "5. Planken stapelen",
        bullets: [
          "Schuif planken van bovenaf in het U-profiel van de paal",
          "Begin met de onderste plank en werk omhoog",
          "Houd 5 mm dilatatie aan bij doorlopende lengtes",
          "Bij Rhombus profiel: let op de juiste richting van de schuine kant",
          "Sluit af met de topafdekplank op de bovenkant",
        ],
      },
      {
        heading: "6. Windbelasting & maximale hoogte",
        table: {
          headers: ["Hoogte", "Max paalafstand", "Windklasse"],
          rows: [
            ["120 cm", "195 cm", "Tot 120 km/u"],
            ["160 cm", "195 cm", "Tot 110 km/u"],
            ["180 cm", "180 cm", "Tot 100 km/u"],
            ["200 cm", "180 cm", "Tot 90 km/u (verankering kritisch)"],
          ],
        },
      },
    ],
  },
  {
    id: "handleiding-vlonderplanken",
    title: "Montagehandleiding: composiet vlonderplanken leggen",
    subtitle: "Complete gids voor het leggen van standaard, naadloos massief en Rhombus vlonderplanken",
    sections: [
      {
        heading: "1. Plankenoverzicht",
        table: {
          headers: ["Type", "Afmeting", "Eigenschap"],
          rows: [
            ["Standaard composiet", "23 x 140 mm, 4 m", "Holle kern, snelle montage"],
            ["Naadloos massief", "21 x 145 mm, 4 m", "100% massief, premium look"],
            ["Rhombus profiel", "21 x 145 mm, 4 m", "Gegroefd, antislip"],
            ["Kleuren", TONES, "Per kleur op voorraad"],
          ],
        },
      },
      {
        heading: "2. Onderconstructie",
        bullets: [
          "Balkafstand maximaal 40 cm hart-op-hart (35 cm bij diagonaal leggen)",
          "Gebruik aluminium leggers (4 m) of composiet onderbalken (3 m)",
          "Plaats balken op terrasdragers (25-260 mm verstelbaar) of rubberstroken",
          "Zorg voor minimaal 2% afschot voor waterafvoer",
          "Ventilatieruimte onder de planken minimaal 30 mm",
        ],
      },
      {
        heading: "3. Planken monteren met clips",
        bullets: [
          "Begin met startclip langs de gevel of randbalk",
          "Plaats RVS clip op elke balk tussen de planken",
          "Clips zorgen voor automatische voeg van 5 mm",
          "Bij Rhombus en naadloos massief: gebruik specifieke clip per type",
          "Eindplank vastzetten met eindclip of schroef in de zijkant",
        ],
      },
      {
        heading: "4. Materiaal per m2",
        table: {
          headers: ["Component", "Verbruik per m2", "Opmerking"],
          rows: [
            ["Vlonderplanken", "ca. 7,2 lm", "Bij standaard 145 mm breed"],
            ["Onderbalken", "ca. 2,5 lm", "Hart-op-hart 40 cm"],
            ["Clips", "ca. 22 stuks", "Plus 4 start/eindclips per rij"],
            ["Terrasdragers", "ca. 4 stuks", "Bij vlakke ondergrond"],
          ],
        },
      },
      {
        heading: "5. Afwerking",
        bullets: [
          "Plaats afwerkingsprofielen (vlak of L-vorm) aan de randen",
          "Reinig het oppervlak na montage met warm zeepwater",
          "Eerste 6 weken: vermijd zware belasting op nieuwe planken",
        ],
      },
    ],
  },
  {
    id: "handleiding-aluminium-onderbalken",
    title: "Montagehandleiding: aluminium onderbalken",
    subtitle: "Installatie van aluminium leggers op plots, rubberstroken of vaste ondergrond",
    sections: [
      {
        heading: "Producten",
        table: {
          headers: ["Profiel", "Afmeting", "Toepassing"],
          rows: [
            ["Alu legger laag", "36,4 x 24 mm, 4 m", "Op vlakke beton/tegels"],
            ["Alu legger hoog", "38 x 51 mm, 4 m", "Op terrasdragers"],
            ["Verbindingsstuk", "RVS", "Voor doorgaande lengtes"],
            ["Hoekbeugel", "Alu", "Voor randafwerking"],
          ],
        },
      },
      {
        heading: "Montage op plots",
        bullets: [
          "Verstelbare terrasdragers plaatsen op hart-op-hart 50 cm",
          "Hoogte instellen met waterpas - controleer 2% afschot",
          "Leggers vastzetten op de terrasdrager met meegeleverde schroef",
          "Bij grote oppervlakken: dwarsverbindingen plaatsen voor stabiliteit",
        ],
      },
      {
        heading: "Montage op rubberstroken",
        bullets: [
          "Plaats rubberstroken h.o.h. 50 cm op een vlakke ondergrond",
          "Leg de aluminium legger direct op de rubberstrook",
          "Geen schroefverbinding nodig - gewicht houdt het vast",
          "Ideaal voor balkons of dakterrassen waar boren niet kan",
        ],
      },
      {
        heading: "Dilatatie en lengtes",
        bullets: [
          "Doorgaande lengtes opbouwen met RVS verbindingsstuk",
          "Houd 5 mm dilatatie aan bij elke verbinding",
          "Maximale onbevestigde lengte: 4 meter",
          "Bij temperaturen > 30 graden extra dilatatie aanhouden",
        ],
      },
    ],
  },
  {
    id: "handleiding-vlonder-accessoires",
    title: "Montagehandleiding: vlonder accessoires & afwerking",
    subtitle: "Onderbalken, clips, afwerkingsprofielen en montagesets",
    sections: [
      {
        heading: "Accessoires overzicht",
        table: {
          headers: ["Product", "Specificatie", "Prijs vanaf"],
          rows: [
            ["WPC onderbalk", "50 x 30 mm, 3 m", "EUR 9,49/m"],
            ["Alu legger laag", "36 x 24 mm, 4 m", "EUR 12,49/m"],
            ["Alu legger hoog", "38 x 51 mm, 4 m", "EUR 16,95/m"],
            ["Montageset 2 m2", "Clips + schroeven", "EUR 19,95/set"],
            ["Montageset 10 m2", "Clips + schroeven", "EUR 94,95/set"],
            ["Afwerklijst vlak", "WPC", "EUR 6,95/m"],
            ["L-profiel composiet", "WPC", "EUR 10,95/m"],
            ["L-profiel aluminium", "Alu", "EUR 11,95/m"],
            ["Terrasdrager", "25-260 mm", "EUR 4,95/stuk"],
          ],
        },
      },
      {
        heading: "Clips & schroeven",
        bullets: [
          "RVS clips: A2 of A4 kwaliteit voor langdurige corrosiebestendigheid",
          "Per montageset zit inbussleutel en alle schroeven inbegrepen",
          "Startclip aan randbalk, eindclip aan laatste plank",
          "Tussenclips zorgen automatisch voor 5 mm voeg",
        ],
      },
      {
        heading: "Afwerkingsprofielen",
        bullets: [
          "Vlakke afwerklijst voor zijkanten en stootranden",
          "L-profiel (composiet of aluminium) voor zichtzijden",
          "Plintplanken voor verhoogde terrassen",
          "Alle profielen in dezelfde tinten als de planken (zie kleurengids)",
        ],
      },
      {
        heading: "Terrasdragers",
        bullets: [
          "Verstelbaar van 25 tot 260 mm",
          "Geschikt voor balkons, dakterrassen en oneffen ondergrond",
          "Plaats h.o.h. 50 cm onder elke balk",
          "Inclusief rubber dempervoet voor geluiddemping",
        ],
      },
    ],
  },
  {
    id: "snelstartgids-vlonder",
    title: "Snelstartgids: vlonder monteren in 4 m2/uur",
    subtitle: "De belangrijkste montagestappen in een visueel overzicht",
    sections: [
      {
        heading: "Stap 1 - Voorbereiden",
        bullets: [
          "Meet de ruimte op en bereken benodigd materiaal (ca. 7,2 lm planken per m2)",
          "Controleer dat de ondergrond vlak en stabiel is",
          "Zorg voor 2% afschot voor waterafvoer",
        ],
      },
      {
        heading: "Stap 2 - Onderconstructie",
        bullets: [
          "Plaats aluminium of WPC onderbalken h.o.h. 40 cm",
          "Gebruik terrasdragers of rubberstroken",
          "Controleer waterpas in alle richtingen",
        ],
      },
      {
        heading: "Stap 3 - Planken leggen",
        bullets: [
          "Start met startclip aan de randbalk",
          "Schuif eerste plank op de clip",
          "Plaats tussenclips op elke balk - automatische voeg van 5 mm",
          "Werk plank voor plank tot de overkant",
        ],
      },
      {
        heading: "Stap 4 - Afwerken",
        bullets: [
          "Eindclip op de laatste plank",
          "Randen afwerken met L-profiel of plintplank",
          "Schoonmaken met warm zeepwater",
        ],
      },
      {
        heading: "Tempo",
        paragraphs: [
          "Een ervaren doe-het-zelver legt ongeveer 4 m2 per uur. Een terras van 20 m2 doet u dus in een lange werkdag - mits onderconstructie en materiaal klaarliggen.",
        ],
      },
    ],
  },

  // ─── CATALOGI & GIDSEN ──────────────────────────────────────────────
  {
    id: "productcatalogus",
    title: "Productcatalogus 2026",
    subtitle: "Alle composiet vlonderplanken, schuttingen, tuindeuren, gevelbekleding en accessoires",
    sections: [
      {
        heading: "Categorieen",
        bullets: [
          "Vlonderplanken - standaard, naadloos massief en Rhombus",
          "Schuttingen - dicht en Rhombus, hoogtes 120 tot 200 cm",
          "Tuindeuren - dicht en Rhombus, standaard en op maat",
          "Gevelbekleding - Rhombus profielen voor moderne gevels",
          "Accessoires - palen, profielen, clips, onderconstructie",
        ],
      },
      {
        heading: "Vlonderplanken",
        table: {
          headers: ["Type", "Afmeting", "Vanaf prijs"],
          rows: [
            ["Standaard composiet", "23 x 140 mm, 4 m", "EUR 18,95/m"],
            ["Naadloos massief", "21 x 145 mm, 4 m", "EUR 28,95/m"],
            ["Rhombus profiel", "21 x 145 mm, 4 m", "EUR 26,95/m"],
          ],
        },
      },
      {
        heading: "Schuttingen",
        table: {
          headers: ["Type", "Afmeting", "Vanaf prijs"],
          rows: [
            ["Composiet schuttingplank", "21 x 150 mm, 180 cm", "EUR 16,95/m"],
            ["Rhombus schuttingplank", "21 x 150 mm, 180 cm", "EUR 21,95/m"],
            ["Composiet paal", "68 x 68 mm, 200 cm", "EUR 49,95/st"],
            ["U-paalprofiel alu", "60 x 60 mm", "EUR 12,95/m"],
          ],
        },
      },
      {
        heading: "Tuindeuren",
        table: {
          headers: ["Type", "Afmeting", "Vanaf prijs"],
          rows: [
            ["Dichte tuindeur", "100 x 180 cm", "EUR 549,-"],
            ["Rhombus tuindeur", "100 x 180 cm", "EUR 649,-"],
            ["Tuindeur op maat", "Maatwerk", "Op aanvraag"],
            ["Scharnier- en slotset", "RVS", "EUR 89,-/set"],
          ],
        },
      },
      {
        heading: "Gevelbekleding",
        table: {
          headers: ["Type", "Afmeting", "Vanaf prijs"],
          rows: [
            ["Rhombus gevelplank", "21 x 145 mm, 4 m", "EUR 32,95/m"],
            ["Aluminium regelwerk", "40 x 60 mm, 4 m", "EUR 11,95/m"],
            ["Hoek- en eindprofiel", "Alu, op kleur", "EUR 14,95/m"],
          ],
        },
      },
      {
        heading: "Kleuren",
        paragraphs: [
          `Alle producten leverbaar in: ${TONES}. Kleuren matchen tussen vlonder, schutting, tuindeur en gevelbekleding voor een geheel afgestemde buitenruimte.`,
        ],
      },
    ],
  },
  {
    id: "prijslijst",
    title: "Prijslijst 2026",
    subtitle: "Actuele prijzen, staffelkortingen en leveringsvoorwaarden",
    sections: [
      {
        heading: "Vlonderplanken (per strekkende meter)",
        table: {
          headers: ["Type", "Afmeting", "Per m", "Per pak (4 m)"],
          rows: [
            ["Standaard composiet", "23 x 140 mm", "EUR 18,95", "EUR 75,80"],
            ["Naadloos massief", "21 x 145 mm", "EUR 28,95", "EUR 115,80"],
            ["Rhombus profiel", "21 x 145 mm", "EUR 26,95", "EUR 107,80"],
          ],
        },
      },
      {
        heading: "Schuttingen (per strekkende meter)",
        table: {
          headers: ["Component", "Afmeting", "Per stuk/m"],
          rows: [
            ["Composiet schuttingplank", "21 x 150 mm, 180 cm", "EUR 16,95/m"],
            ["Rhombus schuttingplank", "21 x 150 mm, 180 cm", "EUR 21,95/m"],
            ["Composiet paal", "68 x 68 mm, 200 cm", "EUR 49,95/st"],
            ["U-paalprofiel alu", "60 x 60 mm", "EUR 12,95/m"],
            ["Topafdekplank", "30 x 150 mm", "EUR 9,95/m"],
          ],
        },
      },
      {
        heading: "Tuindeuren",
        table: {
          headers: ["Type", "Afmeting", "Prijs"],
          rows: [
            ["Dichte tuindeur", "100 x 180 cm", "EUR 549,-"],
            ["Rhombus tuindeur", "100 x 180 cm", "EUR 649,-"],
            ["Tuindeur op maat", "Maatwerk", "Op aanvraag"],
            ["Scharnier- en slotset", "RVS", "EUR 89,-/set"],
          ],
        },
      },
      {
        heading: "Gevelbekleding",
        table: {
          headers: ["Component", "Afmeting", "Per m"],
          rows: [
            ["Rhombus gevelplank", "21 x 145 mm, 4 m", "EUR 32,95"],
            ["Aluminium regelwerk", "40 x 60 mm, 4 m", "EUR 11,95"],
            ["Hoek- en eindprofiel", "Op kleur", "EUR 14,95"],
          ],
        },
      },
      {
        heading: "Staffelkortingen",
        bullets: [
          "Bestelling vanaf EUR 1.000: 3% korting",
          "Bestelling vanaf EUR 2.500: 5% korting",
          "Bestelling vanaf EUR 5.000: 7% korting + gratis levering",
          "Aannemers en hoveniers: aparte zakelijke tarieven op aanvraag",
        ],
      },
      {
        heading: "Leveringsvoorwaarden",
        bullets: [
          "Levertijd standaard: 5-10 werkdagen",
          "Levering door heel Nederland en Belgie",
          "Gratis levering vanaf EUR 5.000",
          "Onder EUR 5.000: verzendkosten op basis van postcode",
          "25 jaar fabrieksgarantie op alle composiet producten",
        ],
      },
    ],
  },

  // ─── ONDERHOUD ──────────────────────────────────────────────────────
  {
    id: "onderhoud-composiet-vlonder",
    title: "Onderhoudsadvies: composiet vlonderplanken",
    subtitle: "Hoe houdt u uw vlonder jarenlang strak? Reiniging, seizoenstips en kleurherstel.",
    sections: [
      {
        heading: "Basisonderhoud",
        paragraphs: [
          "Composiet vlonderplanken zijn onderhoudsarm, maar niet onderhoudsvrij. Een jaarlijkse wasbeurt voorkomt aanslag en houdt de kleur strak.",
        ],
        bullets: [
          "1x per jaar afspuiten met tuinslang en zachte borstel",
          "Hardnekkig vuil: warm water met groene zeep",
          "Geen agressieve middelen (geen chloor, geen oplosmiddelen)",
          "Bij hogedrukreiniger: maximaal 100 bar op 30 cm afstand",
        ],
      },
      {
        heading: "Seizoensschema",
        table: {
          headers: ["Seizoen", "Actie"],
          rows: [
            ["Lente", "Grondige wasbeurt na de winter, controle clips en randen"],
            ["Zomer", "Bij hitte: planken extra besproeien om dilatatie te beperken"],
            ["Herfst", "Bladeren wegvegen voor schimmelvorming voorkomt"],
            ["Winter", "Sneeuw verwijderen met kunststof schep (geen metaal)"],
          ],
        },
      },
      {
        heading: "Groene aanslag verwijderen",
        bullets: [
          "Schaduwzijdes vatbaarder voor algen en mos",
          "Reinig met groene zeep of speciaal composiet reiniger",
          "Borstel altijd in de lengterichting van de plank",
          "Naspoelen met schoon water",
        ],
      },
      {
        heading: "Kleurherstel",
        bullets: [
          "Kleine krassen: composiet kleurherstelspray in dezelfde tint",
          "Diepe krassen: lichtjes opschuren met fijn schuurpapier (korrel 240)",
          "Bij twijfel: contact opnemen voor advies of een vervangplank",
        ],
      },
    ],
  },

  // ─── CHECKLISTS ─────────────────────────────────────────────────────
  {
    id: "checklist-schutting-plaatsen",
    title: "Checklist: composiet schutting plaatsen",
    subtitle: "Doorloop deze checklist voor een vlekkeloze installatie",
    sections: [
      {
        heading: "Voorbereiding",
        bullets: [
          "Lengte en hoogte van de schutting opmeten",
          "Aantal palen, planken en U-profielen bestellen",
          "Kleur en profiel kiezen (dicht of Rhombus)",
          "Gemeentelijke regels en burenrecht checken (zie gids vergunningen)",
        ],
      },
      {
        heading: "Gereedschap",
        bullets: [
          "Waterpas, meetlint en slagkoord",
          "Accuboormachine met bits",
          "Verstekzaag met fijntandblad",
          "Grondboor of schep",
          "Beton, troffel en emmer",
        ],
      },
      {
        heading: "Tijdens montage",
        bullets: [
          "Eerste paal exact verticaal plaatsen (waterpas in 2 richtingen)",
          "Snoer spannen voor rechte lijn over de hele lengte",
          "Hart-op-hart paalafstand max. 195 cm aanhouden",
          "Bij elke plank: 5 mm dilatatie aanhouden",
          "Beton minimaal 24 uur laten uitharden voor belasting",
        ],
      },
      {
        heading: "Afwerking",
        bullets: [
          "Topafdekplank plaatsen voor strakke bovenrand",
          "Hoekpalen extra verankeren tegen windbelasting",
          "Restmateriaal en afval afvoeren",
          "Eerste reiniging met warm zeepwater",
        ],
      },
      {
        heading: "Veelgemaakte fouten",
        bullets: [
          "Te grote paalafstand - leidt tot doorbuiging en wind-trillingen",
          "Geen dilatatie - planken zetten uit bij hitte",
          "Beton niet laten uitharden - palen scheef na eerste storm",
          "Verkeerd Rhombus profiel-richting - water blijft staan",
        ],
      },
    ],
  },
  {
    id: "grondvoorbereiding",
    title: "Checklist: grondvoorbereiding voor schuttingen & vlonders",
    subtitle: "De juiste fundering begint bij de ondergrond",
    sections: [
      {
        heading: "Grondtypen herkennen",
        table: {
          headers: ["Grondtype", "Geschikt voor", "Aandachtspunt"],
          rows: [
            ["Zandgrond", "Inbetonneren of voetplaten", "Goede drainage van nature"],
            ["Kleigrond", "Inbetonneren met drainage", "Risico op verzakking, vorstgevoelig"],
            ["Veengrond", "Heipalen of ankers vereist", "Niet draagkrachtig"],
            ["Beton/tegels", "Voetplaten + chemisch ankeren", "Geen graafwerk nodig"],
          ],
        },
      },
      {
        heading: "Drainage",
        bullets: [
          "Vlonder: 2% afschot naar tuin of afvoer",
          "Schutting: paalgat met grindlaag van 10 cm onderaan",
          "Bij hoge grondwaterstand: drainagebuis aanleggen",
        ],
      },
      {
        heading: "Vorstdiepte",
        bullets: [
          "Nederland: paalgaten minimaal 60-80 cm diep",
          "Voorkomt opvriezen en scheefzakken van palen",
          "Bij twijfel altijd dieper graven dan ondieper",
        ],
      },
      {
        heading: "Hellingen",
        bullets: [
          "Schutting op helling: stapsgewijs aanpassen per paalvak",
          "Vlonder op helling: aluminium leggers met terrasdragers compenseren",
          "Maximale helling per stap: 15 cm verschil tussen twee palen",
        ],
      },
    ],
  },

  // ─── GIDSEN ─────────────────────────────────────────────────────────
  {
    id: "vergunningen-regels",
    title: "Gids: vergunningen & regels voor schuttingen",
    subtitle: "Wettelijke kaders, maximale hoogtes en burenrecht in Nederland",
    sections: [
      {
        heading: "Wanneer heb je een vergunning nodig?",
        bullets: [
          "Tot 1 meter hoog op de erfgrens: vergunningsvrij",
          "Tot 2 meter hoog mits achter de voorgevelrooilijn en op minimaal 1 m van openbare weg",
          "Boven 2 meter: altijd omgevingsvergunning aanvragen",
          "Beschermde dorpsgezichten en monumenten: extra regels gelden",
        ],
      },
      {
        heading: "Maximale hoogtes per situatie",
        table: {
          headers: ["Locatie", "Max hoogte vergunningsvrij"],
          rows: [
            ["Voortuin (voor voorgevel)", "1 meter"],
            ["Zijtuin tot voorgevelrooilijn", "1 meter"],
            ["Achtertuin en zijtuin achter voorgevel", "2 meter"],
            ["Op de erfgrens met buren", "2 meter (in overleg)"],
          ],
        },
      },
      {
        heading: "Erfgrens en burenrecht",
        bullets: [
          "Plaats schutting net binnen uw eigen erfgrens (5-10 cm)",
          "Bij gedeelde schutting: schriftelijke afspraken maken over kosten en onderhoud",
          "Burenrecht: buren mogen geen onredelijke hinder ondervinden",
          "Bij conflict: mediation via de gemeente of buurtbemiddeling",
        ],
      },
      {
        heading: "Praktische tips",
        bullets: [
          "Check altijd het bestemmingsplan op www.ruimtelijkeplannen.nl",
          "Vraag een omgevingsvergunning aan via www.omgevingsloket.nl",
          "Bij onzekerheid: gratis vooroverleg met gemeente plannen",
          "Bewaar offerte, fotos en eventuele schriftelijke buurakkoorden",
        ],
      },
    ],
  },
  {
    id: "kleurengids",
    title: "Kleurengids: het perfecte composiet voor jouw tuin",
    subtitle: "Kies de juiste tint voor schutting, vlonder, tuindeur en gevelbekleding",
    sections: [
      {
        heading: "Kleurenoverzicht",
        table: {
          headers: ["Kleur", "Karakter", "Combineert met"],
          rows: [
            ["Teak", "Warm, klassiek", "Beige gevel, terracotta tegels"],
            ["Eiken", "Natuurlijk, neutraal", "Bijna elke tuinstijl"],
            ["Walnoot", "Warm, donker", "Witte gevel, moderne tuin"],
            ["Vergrijsd eiken", "Verweerde look", "Strandhuis, landelijk"],
            ["Grijs", "Modern, koel", "Antraciet kozijnen, betonlook"],
            ["Donker grijs", "Stoer, contrastrijk", "Industriele en strakke tuin"],
            ["Zwart", "Maximale impact", "Witte gevel, minimalistische tuin"],
          ],
        },
      },
      {
        heading: "Warme vs koele tinten",
        bullets: [
          "Warme tinten (teak, walnoot, eiken): gezellige, klassieke uitstraling",
          "Koele tinten (grijs, donker grijs, zwart): modern, strak en zakelijk",
          "Vergrijsd eiken: in het midden, zowel warm als koel werkt",
        ],
      },
      {
        heading: "Combineren met de tuin",
        bullets: [
          "Donkere schutting + lichte vlonder = ruimtelijk effect",
          "Donkere gevelbekleding rondom witte kozijnen = high-end look",
          "Tuindeur in dezelfde tint als schutting = rustig en strak",
          "Tuindeur in contrasterende tint = blikvanger",
        ],
      },
      {
        heading: "UV-bestendigheid",
        paragraphs: [
          "Alle tinten zijn voorzien van een UV-stabiele co-extrusielaag. In de eerste 8-12 weken vlakt de oorspronkelijke fabriekstint iets uit naar de duurzame eindkleur. Dit is normaal en garandeert juist de kleurvastheid voor 25 jaar.",
        ],
      },
    ],
  },

  // ─── TUINDEUREN ─────────────────────────────────────────────────────
  {
    id: "handleiding-composiet-tuindeur",
    title: "Montagehandleiding: composiet tuindeur plaatsen",
    subtitle: "Inhangen, uitlijnen en monteren van dichte of Rhombus tuindeuren",
    sections: [
      {
        heading: "Inhoud van uw set",
        table: {
          headers: ["Onderdeel", "Aantal", "Opmerking"],
          rows: [
            ["Tuindeurblad (dicht of Rhombus)", "1", "Standaard 100 x 180 cm"],
            ["Scharnieren RVS", "3", "Verstelbaar in 3 richtingen"],
            ["Slotkast met klink", "1", "Met cilinder en 3 sleutels"],
            ["Sluitplaat", "1", "Voor in de paal of muur"],
            ["Bevestigingsset", "1", "Bouten, ringen, schroeven"],
          ],
        },
      },
      {
        heading: "1. Paalvoorbereiding",
        bullets: [
          "Zorg dat scharnier- en slotpaal stevig staan (extra verankering aanbevolen)",
          "Controleer dat palen exact verticaal staan (waterpas in 2 richtingen)",
          "Dagmaat tussen de palen: deurbreedte + 20 mm (10 mm speling per zijde)",
          "Bij combinatie met schutting: deur op gelijke hoogte uitlijnen",
        ],
      },
      {
        heading: "2. Scharnieren monteren",
        bullets: [
          "Boven- en onderscharnier 20 cm vanaf de deurrand plaatsen",
          "Middelste scharnier exact in het midden",
          "Voorboren met 4 mm boor, daarna RVS schroeven indraaien",
          "Scharnieren eerst aan deurblad, dan aan paal monteren",
        ],
      },
      {
        heading: "3. Deur inhangen en uitlijnen",
        bullets: [
          "Hang de deur in - tweede persoon helpt met dragen",
          "Stel de scharnieren bij: hoogte, links/rechts en diepte",
          "Controleer dat de deur soepel opent en sluit",
          "Speling rondom: 5 mm boven en zijkanten, 10 mm onder",
        ],
      },
      {
        heading: "4. Slot en sluitplaat",
        bullets: [
          "Markeer positie sluitplaat op de tegenpaal",
          "Frees of boor uitsparing voor de schoot",
          "Sluitplaat vastschroeven met meegeleverde schroeven",
          "Test de sluiting meerdere keren met de sleutel",
        ],
      },
      {
        heading: "Onderhoud bewegende delen",
        bullets: [
          "Scharnieren 1x per jaar smeren met siliconenspray (geen olie)",
          "Slot 2x per jaar met grafietpoeder of speciale slotspray",
          "Controle bevestigingsschroeven na het eerste seizoen",
          "Bij stroef sluiten: scharnieren bijstellen, niet forceren",
        ],
      },
    ],
  },
  {
    id: "checklist-tuindeur-op-maat",
    title: "Checklist: composiet tuindeur op maat bestellen",
    subtitle: "Wat moet u opmeten en bepalen voor een perfect passende tuindeur?",
    sections: [
      {
        heading: "Opmeten",
        bullets: [
          "Dagmaat: afstand tussen de palen of in de muursparing",
          "Sponningmaat: alleen relevant bij metselwerk met sponning",
          "Hoogte: standaard 180 cm, op maat tot 200 cm leverbaar",
          "Houd rekening met 10 mm speling per zijde voor scharnier en slot",
          "Meet altijd op 3 hoogtes (boven, midden, onder) - palen kunnen scheef staan",
        ],
      },
      {
        heading: "Draairichting bepalen",
        bullets: [
          "Sta voor de deur aan de zijde waar deze naartoe opent",
          "Scharnier links = linksdraaiende deur (DIN-links)",
          "Scharnier rechts = rechtsdraaiende deur (DIN-rechts)",
          "Bij twijfel: stuur een foto en wij adviseren u kosteloos",
        ],
      },
      {
        heading: "Slot- en greepkeuze",
        bullets: [
          "Standaard: insteekslot met cilinder en 3 sleutels",
          "Optioneel: gelijksluitend met uw voordeur (KeyAlike)",
          "Greep aan binnen- en buitenzijde of alleen binnen",
          "Bij dubbele tuindeur: bovenschuif voor de inactieve deur",
        ],
      },
      {
        heading: "Kleur- en profielmatch",
        bullets: [
          "Kies dezelfde tint als uw schutting voor een rustige uitstraling",
          "Of contrasterende tint voor een blikvanger",
          "Dichte deur = klassieke uitstraling",
          "Rhombus deur = moderne uitstraling, geeft licht door",
        ],
      },
      {
        heading: "Bestellen",
        bullets: [
          "Stuur de maten, draairichting en kleur naar info@schuttingvancomposiet.nl",
          "Ontvang binnen 1 werkdag een vrijblijvende offerte op maat",
          "Productietijd maatwerk: 3-4 weken",
          "Levering inclusief alle benodigde scharnieren en slotset",
        ],
      },
    ],
  },

  // ─── GEVELBEKLEDING ─────────────────────────────────────────────────
  {
    id: "handleiding-composiet-gevelbekleding",
    title: "Montagehandleiding: composiet gevelbekleding (Rhombus)",
    subtitle: "Aluminium regelwerk, ventilatie en montage van Rhombus profielen",
    sections: [
      {
        heading: "Opbouw - van binnen naar buiten",
        bullets: [
          "Bestaande gevel of waterkerende folie",
          "Aluminium regelwerk (40 x 60 mm) verticaal op h.o.h. 50 cm",
          "Ventilatieruimte 30 mm achter de bekleding",
          "Rhombus profielen horizontaal gemonteerd",
        ],
      },
      {
        heading: "1. Regelwerk plaatsen",
        bullets: [
          "Markeer verticale lijnen h.o.h. 50 cm op de gevel",
          "Aluminium profielen vastzetten met geveldoppen (chemisch ankeren bij steen)",
          "Stel met vulplaatjes uit tot een perfect vlak",
          "Controleer met waterpas of richtsnoer dat alles op een lijn ligt",
          "Onder elke profielrij: ventilatiegaas tegen ongedierte",
        ],
      },
      {
        heading: "2. Eerste rij Rhombus",
        bullets: [
          "Start onderaan met startprofiel of waterhol",
          "Plaats eerste plank met de schuine kant naar boven (Rhombus richting)",
          "Vastzetten met RVS gevelschroeven via de bovenrand (verdekt)",
          "Controleer waterpas - foutjes hier herhalen zich naar boven",
        ],
      },
      {
        heading: "3. Doorlopende rijen",
        bullets: [
          "Volgende plank schuift met onderkant over de bovenkant van de vorige",
          "Stootnaden verspringen: minimaal 60 cm uit elkaar in opvolgende rijen",
          "Op elke regel een schroef - niet meer, voor dilatatie",
          "Houd 5 mm dilatatie aan bij elke stootnaad",
        ],
      },
      {
        heading: "4. Hoek- en eindprofielen",
        bullets: [
          "Buitenhoeken: aluminium hoekprofiel in dezelfde tint",
          "Binnenhoeken: kit-naad of L-profiel",
          "Bovenkant: aflopend daktrim om water af te voeren",
          "Rondom raamkozijnen: aluminium kozijnaansluiting",
        ],
      },
      {
        heading: "Tinten combineren",
        paragraphs: [
          `Gevelbekleding leverbaar in: ${TONES}. Voor moderne projecten populair: zwart als hoofdkleur met een verticaal accent in walnoot of vergrijsd eiken.`,
        ],
      },
    ],
  },
  {
    id: "onderhoud-rhombus-profielen",
    title: "Onderhoudsgids: Rhombus profielen",
    subtitle: "Schutting, tuindeur en gevelbekleding met Rhombus profiel - jaarlijks onderhoud",
    sections: [
      {
        heading: "Waarom apart onderhoud voor Rhombus?",
        paragraphs: [
          "Rhombus profielen hebben een schuine zijde die water afvoert, maar tussen de ribbels kan vuil en mos blijven hangen. Met een eenvoudig jaarschema houdt u het profiel jarenlang strak en kleurvast.",
        ],
      },
      {
        heading: "Reinigen tussen de ribbels",
        bullets: [
          "Gebruik een lange smalle borstel of oude tandenborstel",
          "Werk in de lengterichting van de ribbel - nooit dwars",
          "Spoel daarna ruim na met de tuinslang",
          "Hardnekkig vuil: warm water met groene zeep",
          "Geen agressieve middelen, geen chloor",
        ],
      },
      {
        heading: "Mos en algen",
        bullets: [
          "Schaduwzijdes en noordkant vatbaarder voor mos",
          "Verwijderen met speciale composiet reiniger of groene zeep",
          "Bij stevige aanslag: hogedrukreiniger op max. 100 bar, 30 cm afstand",
          "Borstel altijd licht na om resten te verwijderen",
        ],
      },
      {
        heading: "Kleurherstel",
        bullets: [
          "Kleine kleurverschillen: composiet kleurherstelspray in juiste tint",
          "Spuit dun en gelijkmatig, laat drogen volgens instructies",
          "Diepere krassen: lichtjes opschuren met korrel 240, daarna sprayen",
          "Bij grote schade: contact opnemen voor vervangplank in dezelfde productiebatch",
        ],
      },
      {
        heading: "Jaarlijks controleschema",
        table: {
          headers: ["Maand", "Controle"],
          rows: [
            ["Maart", "Grondige wasbeurt na winter, controle van bevestigingen"],
            ["Juni", "Visuele check ribbels, regelwerk en hoekprofielen"],
            ["September", "Bladeren tussen ribbels verwijderen"],
            ["December", "Sneeuw losborstelen, geen metalen schep gebruiken"],
          ],
        },
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
    const { id, all, cleanup } = await req.json().catch(() => ({ id: undefined, all: false, cleanup: false }));

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    if (cleanup) {
      const valid = new Set(documents.map((d) => `branded-pdfs/${d.id}.pdf`));
      const { data: files } = await supabase.storage.from("product-images").list("branded-pdfs", { limit: 1000 });
      const orphans = (files ?? []).map((f) => `branded-pdfs/${f.name}`).filter((p) => !valid.has(p));
      if (orphans.length) await supabase.storage.from("product-images").remove(orphans);
      return new Response(JSON.stringify({ ok: true, removed: orphans }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

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
