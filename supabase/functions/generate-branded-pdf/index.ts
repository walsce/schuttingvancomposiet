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
    subtitle: "De volledige Highlander composiet collectie — vlonderplanken, schuttingen, tuindeuren en accessoires met 25 jaar fabrieksgarantie.",
    sections: [
      {
        heading: "Over deze collectie",
        paragraphs: [
          "De Highlander collectie is ontwikkeld voor de Nederlandse en Belgische markt: bestand tegen extreme zon, vorst en aanhoudende regen. Elke plank, paal en deur uit deze catalogus heeft een co-extrusie beschermlaag rondom de kern en wordt geleverd met 25 jaar fabrieksgarantie tegen rotten, splinteren en kromtrekken.",
          "Alle profielen — schuttingplanken, vlonderplanken en tuindeuren — zijn beschikbaar in dezelfde kleurfamilie. Zo bouwt u een volledig op elkaar afgestemde buitenruimte zonder kleurverschillen tussen leveranciers.",
        ],
      },
      {
        heading: "Categorieen in een oogopslag",
        bullets: [
          "Vlonderplanken — standaard en naadloos massief, 5 kleurtonen, vanaf 19,95 euro per meter",
          "Schuttingen — dicht en Rhombus (horizontaal en verticaal), 5 kleurtonen, vanaf 139,95 euro per element",
          "Tuindeuren — dicht en Rhombus (horizontaal en verticaal), 4 tot 5 kleurtonen, vanaf 349 euro",
          "Accessoires — palen, paalkappen, profielen, schroefsets en kleurherstelspray",
          "Samples — bestel een fysiek sample voor 3,95 euro om kleur en voelkwaliteit te beoordelen",
        ],
      },
      {
        heading: "Vlonderplanken Highlander",
        table: {
          headers: ["Profiel", "Beschikbare kleuren", "Per meter"],
          rows: [
            ["Standaard composiet (hol)", "Walnoot, Teak, Vergrijsd Eiken, Donker Grijs, Zwart", "EUR 19,95"],
            ["Naadloos massief (premium)", "Walnoot, Teak, Vergrijsd Eiken, Donker Grijs, Zwart", "EUR 37,95"],
            ["Sample vlonderplank", "Op aanvraag, bezorgd in 5-10 werkdagen", "EUR 3,95"],
          ],
        },
      },
      {
        heading: "Schuttingen Highlander",
        table: {
          headers: ["Profiel", "Beschikbare kleuren", "Per element"],
          rows: [
            ["Composiet schutting dicht", "Eiken, Walnoot, Teak, Grijs, Zwart", "EUR 139,95"],
            ["Composiet schutting Rhombus", "Eiken, Walnoot, Grijs, Zwart", "EUR 149,95"],
            ["Composiet schutting Rhombus Teak", "Teak", "EUR 159,95"],
            ["Composiet schutting Rhombus Verticaal", "Eiken, Walnoot, Teak, Grijs, Zwart", "EUR 179,95"],
            ["Aluminium composiet paal compleet", "Op kleur, inclusief montage-set", "EUR 69,95"],
            ["Losse composiet schuttingplank", "Op kleur, voor uitbreiding/reparatie", "EUR 16,99"],
          ],
        },
      },
      {
        heading: "Tuindeuren Highlander",
        paragraphs: [
          "Onze composiet tuindeuren worden geleverd op exact dezelfde hoogte en kleur als de schutting, voor een doorlopende lijn. Standaard inclusief RVS scharnierset en cilinderslot met drie sleutels. Maatwerk tot 200 cm hoog is mogelijk binnen 3-4 weken levertijd.",
        ],
        table: {
          headers: ["Type", "Beschikbare kleuren", "Vanaf"],
          rows: [
            ["Tuindeur dicht", "Zwart, Teak, Grijs, Walnoot", "EUR 349,-"],
            ["Tuindeur Rhombus", "Zwart, Teak, Grijs, Walnoot, Eiken", "EUR 369,-"],
            ["Tuindeur Rhombus Verticaal", "Zwart, Teak, Grijs, Walnoot, Eiken", "EUR 399,-"],
            ["Tuindeur op maat", "Maatwerk tot 200 cm hoog", "Op aanvraag"],
          ],
        },
      },
      {
        heading: "Accessoires & afwerking",
        table: {
          headers: ["Onderdeel", "Toepassing", "Prijs"],
          rows: [
            ["Aluminium composiet schutting paal compleet", "Hoofdpaal + U-profiel + voetplaat", "EUR 69,95"],
            ["Aluminium Onder/Boven Profiel", "Strakke afwerking boven- en onderzijde", "Op aanvraag"],
            ["Paalkap rechthoek 60x40 mm met haak", "Afdek paal + haak voor verlichting", "Op aanvraag"],
            ["Paalkap rond 60 mm met haak", "Afdek voor ronde paal", "Op aanvraag"],
            ["Paalkap Aluminium Composiet Tuinpaal", "Strakke aluminium afwerking", "Op aanvraag"],
            ["Afdekstrip Composiet Tuinpaal", "Verbergt schroefverbindingen", "Op aanvraag"],
            ["Lakbus spray (kleurherstel)", "Bijwerken krassen en stootplekken", "EUR 14,95"],
          ],
        },
      },
      {
        heading: "Kleurpalet 2026",
        paragraphs: [
          "Alle Highlander profielen worden geproduceerd in een vaste fabriekspalet zodat schutting, vlonder en tuindeur exact op elkaar aansluiten. Onder invloed van UV vlakt de kleur in de eerste 8 tot 12 weken licht af naar de duurzame eindtint — dit is normaal en garandeert juist de kleurvastheid voor 25 jaar.",
        ],
        bullets: [
          "Teak — warme honingbruine tint, klassieke uitstraling, past bij beige gevels en terracotta",
          "Eiken — natuurlijke neutrale houttint, combineert met bijna elke tuinstijl",
          "Walnoot — diep warm donkerbruin, premium uitstraling tegen witte of lichte gevels",
          "Vergrijsd Eiken — verweerde driftwood-look, modern en kustachtig",
          "Grijs — koel modern grijs, voor strakke antraciet tuinen",
          "Donker Grijs — stoer contrastrijk, perfect bij betonlook en industriele tuinen",
          "Zwart — maximale impact, minimalistisch, blikvanger naast witte gevel",
        ],
      },
      {
        heading: "Levering & garantie",
        bullets: [
          "Standaard levertijd: 5 tot 10 werkdagen door heel Nederland en Belgie",
          "Maatwerk tuindeuren: 3 tot 4 weken productietijd",
          "Gratis levering vanaf 5.000 euro orderwaarde",
          "Onder 5.000 euro: verzendkosten op basis van postcode en gewicht",
          "25 jaar fabrieksgarantie tegen rotten, splinteren, kromtrekken en kleurverlies onder normale gebruiksomstandigheden",
          "Snelle service: bij schade leveren we waar mogelijk een vervangplank uit dezelfde productiebatch",
        ],
      },
    ],
  },
  {
    id: "prijslijst",
    title: "Prijslijst 2026",
    subtitle: "Actuele Highlander prijzen, staffelkortingen en leveringsvoorwaarden — geldig vanaf 1 januari 2026.",
    sections: [
      {
        heading: "Vlonderplanken (per strekkende meter)",
        table: {
          headers: ["Profiel", "Kleur", "Per meter"],
          rows: [
            ["Vlonderplank standaard", "Walnoot", "EUR 19,95"],
            ["Vlonderplank standaard", "Teak", "EUR 19,95"],
            ["Vlonderplank standaard", "Vergrijsd Eiken", "EUR 19,95"],
            ["Vlonderplank standaard", "Donker Grijs", "EUR 19,95"],
            ["Vlonderplank naadloos massief", "Walnoot", "EUR 37,95"],
            ["Vlonderplank naadloos massief", "Teak", "EUR 37,95"],
            ["Vlonderplank naadloos massief", "Vergrijsd Eiken", "EUR 37,95"],
            ["Vlonderplank naadloos massief", "Donker Grijs", "EUR 37,95"],
            ["Vlonderplank naadloos massief", "Zwart", "EUR 37,95"],
            ["Sample vlonderplank", "Op aanvraag", "EUR 3,95"],
          ],
        },
      },
      {
        heading: "Schuttingen (per element)",
        table: {
          headers: ["Type", "Kleur", "Per element"],
          rows: [
            ["Schutting dicht", "Eiken / Walnoot / Teak / Grijs / Zwart", "EUR 139,95"],
            ["Schutting Rhombus horizontaal", "Eiken / Walnoot / Grijs / Zwart", "EUR 149,95"],
            ["Schutting Rhombus horizontaal", "Teak", "EUR 159,95"],
            ["Schutting Rhombus verticaal", "Eiken / Walnoot / Teak / Grijs / Zwart", "EUR 179,95"],
            ["Composiet schuttingplank los", "Op kleur", "EUR 16,99"],
            ["Aluminium composiet paal compleet", "Op kleur", "EUR 69,95"],
          ],
        },
      },
      {
        heading: "Tuindeuren",
        table: {
          headers: ["Type", "Kleur", "Prijs"],
          rows: [
            ["Tuindeur dicht (100 x 180 cm)", "Zwart / Teak / Grijs / Walnoot", "EUR 349,-"],
            ["Tuindeur Rhombus (100 x 180 cm)", "Zwart / Teak / Grijs / Walnoot / Eiken", "EUR 369,-"],
            ["Tuindeur Rhombus verticaal", "Zwart / Teak / Grijs / Walnoot / Eiken", "EUR 399,-"],
            ["Tuindeur op maat tot 200 cm", "Op kleur, productietijd 3-4 weken", "Op aanvraag"],
          ],
        },
      },
      {
        heading: "Accessoires & afwerking",
        table: {
          headers: ["Onderdeel", "Specificatie", "Prijs"],
          rows: [
            ["Aluminium composiet paal compleet", "Met U-profiel en voetplaat", "EUR 69,95"],
            ["Aluminium Onder/Boven Profiel", "Strakke aluminium afwerking", "Op aanvraag"],
            ["Paalkap rechthoek 60x40 mm met haak", "Inclusief haak", "Op aanvraag"],
            ["Paalkap rond 60 mm met haak", "Inclusief haak", "Op aanvraag"],
            ["Paalkap Aluminium Tuinpaal", "Op kleur", "Op aanvraag"],
            ["Afdekstrip Composiet Tuinpaal", "Verbergt schroefverbindingen", "Op aanvraag"],
            ["Lakbus spray kleurherstel", "Per kleur, 400 ml", "EUR 14,95"],
            ["Sample schutting", "Fysiek sample, bezorgd binnen 5-10 werkdagen", "EUR 3,95"],
          ],
        },
      },
      {
        heading: "Staffelkortingen",
        bullets: [
          "Bestelling vanaf 1.000 euro: 3% korting op het netto materiaalbedrag",
          "Bestelling vanaf 2.500 euro: 5% korting op het netto materiaalbedrag",
          "Bestelling vanaf 5.000 euro: 7% korting + gratis levering door heel Nederland en Belgie",
          "Aannemers, hoveniers en tuincentra: aparte zakelijke tarieven, vraag een account aan via info@schuttingvancomposiet.nl",
        ],
      },
      {
        heading: "Leveringsvoorwaarden",
        bullets: [
          "Standaard levertijd: 5 tot 10 werkdagen na betaling",
          "Maatwerk tuindeuren: 3 tot 4 weken productietijd",
          "Bezorging door heel Nederland en Belgie met eigen vervoer of pallettransport",
          "Onder 5.000 euro: verzendkosten op basis van postcode en gewicht — exacte bijdrage zichtbaar in de checkout",
          "Schadeloos transport gegarandeerd: bij transportschade wordt direct vervangen",
          "25 jaar fabrieksgarantie op alle Highlander composiet producten onder normaal gebruik",
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
    subtitle: "Kies de juiste tint voor schutting, vlonder en tuindeur — voor een doorlopende, op elkaar afgestemde buitenruimte.",
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
          "Donkere schutting + lichte vlonder = ruimtelijk en open effect",
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

  // ─── GEVELBEKLEDING is no longer part of the catalog ─────────────────
  // (manual: composiet gevelbekleding handleiding has been deprecated)


  {
    id: "onderhoud-rhombus-profielen",
    title: "Onderhoudsgids: Rhombus profielen",
    subtitle: "Schutting en tuindeur met Rhombus profiel - jaarlijks onderhoud voor 25 jaar kleurvastheid",
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

/* ── Premium PDF builder (pdf-lib) ──────────────────────────────── */

const BRAND = {
  name: "SchuttingvanComposiet.nl",
  tagline: "Composiet vlonderplanken, schuttingen, tuindeuren & gevelbekleding",
  website: "www.schuttingvancomposiet.nl",
  email: "info@schuttingvancomposiet.nl",
  phone: "020 - 808 41 40",
  edition: "Editie 2026",
};

// Brand palette — RGB 0..1
const COL = {
  primary: rgb(0.184, 0.322, 0.2),         // #2F5233 deep forest
  primaryDeep: rgb(0.114, 0.22, 0.137),    // darker forest
  accent: rgb(0.851, 0.467, 0.149),        // warm orange
  accentSoft: rgb(0.961, 0.886, 0.792),    // sand
  cream: rgb(0.976, 0.965, 0.945),         // page cream
  paper: rgb(1, 1, 1),
  ink: rgb(0.094, 0.086, 0.078),           // near-black
  body: rgb(0.18, 0.18, 0.16),
  muted: rgb(0.46, 0.46, 0.44),
  hairline: rgb(0.82, 0.8, 0.76),
  zebra: rgb(0.972, 0.965, 0.95),
};

const PAGE_W = 595.28;   // A4 portrait
const PAGE_H = 841.89;
const MARGIN_X = 56;
const HEADER_Y = PAGE_H - 36;
const FOOTER_Y = 38;
const CONTENT_TOP = PAGE_H - 90;
const CONTENT_BOTTOM = 80;

// Public storage URL for cover images.
const COVER_BASE =
  `${Deno.env.get("SUPABASE_URL")}/storage/v1/object/public/product-images/pdf-covers`;

// Map each document id to cover image + eyebrow + optional gallery.
interface DocMeta {
  cover: string;        // path under /images/pdf-covers/
  eyebrow: string;      // small-caps label on cover
  gallery?: string[];   // optional inside gallery images
}

const META: Record<string, DocMeta> = {
  // Schutting
  "handleiding-composiet-schutting": {
    cover: "baner-ogrodzenia.jpg",
    eyebrow: "MONTAGEHANDLEIDING",
    gallery: ["ogrodzeniowa-premium-orzech.jpg", "ogrodzeniowa-classic-grafit.jpg"],
  },
  "checklist-schutting-plaatsen": {
    cover: "ogrodzenia-wizualizacja.jpg",
    eyebrow: "CHECKLIST",
  },
  "grondvoorbereiding": {
    cover: "galeria-realizacje-1.jpg",
    eyebrow: "CHECKLIST",
  },
  "vergunningen-regels": {
    cover: "galeria-4.jpg",
    eyebrow: "GIDS",
  },

  // Vlonder
  "handleiding-vlonderplanken": {
    cover: "baner-hero-deski.jpg",
    eyebrow: "MONTAGEHANDLEIDING",
    gallery: ["deska-premium-orzech.jpg", "deska-eco-grafit.jpg"],
  },
  "handleiding-aluminium-onderbalken": {
    cover: "legary-aluminiowe.jpg",
    eyebrow: "MONTAGEHANDLEIDING",
  },
  "handleiding-vlonder-accessoires": {
    cover: "montageset.jpg",
    eyebrow: "MONTAGEHANDLEIDING",
    gallery: ["legar-wpc.jpg", "legary-aluminiowe.jpg", "montageset.jpg"],
  },
  "snelstartgids-vlonder": {
    cover: "tarasy-kompozytowe.jpg",
    eyebrow: "SNELSTARTGIDS",
  },
  "onderhoud-composiet-vlonder": {
    cover: "galeria-1.jpg",
    eyebrow: "ONDERHOUDSGIDS",
  },

  // Tuindeur
  "handleiding-composiet-tuindeur": {
    cover: "wpc-oferta-schutting.jpg",
    eyebrow: "MONTAGEHANDLEIDING",
  },
  "checklist-tuindeur-op-maat": {
    cover: "galeria-3.jpg",
    eyebrow: "CHECKLIST",
  },

  // Gevelbekleding & Rhombus
  "handleiding-composiet-gevelbekleding": {
    cover: "galeria-4.jpg",
    eyebrow: "MONTAGEHANDLEIDING",
  },
  "onderhoud-rhombus-profielen": {
    cover: "ogrodzeniowa-premium-orzech.jpg",
    eyebrow: "ONDERHOUDSGIDS",
  },

  // Catalogi
  "productcatalogus": {
    cover: "baner-hero-deski.jpg",
    eyebrow: "PRODUCTCATALOGUS",
    gallery: [
      "wpc-oferta-vlonder.jpg",
      "wpc-oferta-schutting.jpg",
      "wpc-oferta-accessoires.jpg",
      "deska-premium-orzech.jpg",
      "ogrodzeniowa-classic-grafit.jpg",
      "tarasy-kompozytowe.jpg",
    ],
  },
  "prijslijst": {
    cover: "tarasy-kompozytowe.jpg",
    eyebrow: "PRIJSLIJST 2026",
  },
  "kleurengids": {
    cover: "deska-premium-orzech.jpg",
    eyebrow: "KLEURENGIDS",
  },
};

const DEFAULT_META: DocMeta = {
  cover: "baner-hero-deski.jpg",
  eyebrow: "DOCUMENTATIE",
};

// 7 tones for colour gids — RGB approximations of composite colours
const SWATCHES: { name: string; hex: [number, number, number]; sub: string }[] = [
  { name: "Teak",            hex: [0.62, 0.40, 0.22], sub: "Warm, klassiek" },
  { name: "Eiken",           hex: [0.51, 0.39, 0.27], sub: "Natuurlijk neutraal" },
  { name: "Walnoot",         hex: [0.32, 0.21, 0.14], sub: "Warm, donker" },
  { name: "Vergrijsd eiken", hex: [0.55, 0.52, 0.46], sub: "Verweerde look" },
  { name: "Grijs",           hex: [0.45, 0.46, 0.46], sub: "Modern, koel" },
  { name: "Donker grijs",    hex: [0.24, 0.25, 0.25], sub: "Stoer, contrastrijk" },
  { name: "Zwart",           hex: [0.09, 0.09, 0.09], sub: "Maximale impact" },
];

/* ── Asset cache (one fetch per cold-start) ───────────────────── */

const assetCache = new Map<string, Uint8Array>();

async function fetchBytes(url: string): Promise<Uint8Array | null> {
  if (assetCache.has(url)) return assetCache.get(url)!;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn("Asset fetch failed", url, res.status);
      return null;
    }
    const buf = new Uint8Array(await res.arrayBuffer());
    assetCache.set(url, buf);
    return buf;
  } catch (e) {
    console.warn("Asset fetch error", url, e);
    return null;
  }
}

/* ── Text helpers ─────────────────────────────────────────────── */

function wrap(text: string, font: PDFFont, size: number, maxW: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    const test = cur ? cur + " " + w : w;
    if (font.widthOfTextAtSize(test, size) <= maxW) {
      cur = test;
    } else {
      if (cur) lines.push(cur);
      // word longer than maxW — hard break
      if (font.widthOfTextAtSize(w, size) > maxW) {
        let chunk = "";
        for (const ch of w) {
          if (font.widthOfTextAtSize(chunk + ch, size) > maxW) {
            lines.push(chunk);
            chunk = ch;
          } else chunk += ch;
        }
        cur = chunk;
      } else cur = w;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

// Strip characters not in the font (avoids "WinAnsi cannot encode" errors).
// pdf-lib's Helvetica/Times/etc support WinAnsi only; embedded TTFs support full unicode.
function safeText(s: string): string {
  return s.normalize("NFC");
}

/* ── Page chrome ──────────────────────────────────────────────── */

interface Ctx {
  pdf: PDFDocument;
  page: PDFPage;
  y: number;
  pageNum: number;
  serif: PDFFont;        // Playfair regular
  serifBold: PDFFont;    // Playfair bold
  sans: PDFFont;         // Inter regular
  sansMed: PDFFont;      // Inter medium
  sansBold: PDFFont;     // Inter bold
  docTitle: string;
}

function drawHeader(ctx: Ctx) {
  const { page, sans, sansMed, sansBold, docTitle, pageNum } = ctx;
  // Brand wordmark left
  page.drawText(safeText("SCHUTTING"), {
    x: MARGIN_X, y: HEADER_Y, size: 8, font: sansBold,
    color: COL.primary, characterSpacing: 1.4,
  });
  page.drawText(safeText("VAN COMPOSIET"), {
    x: MARGIN_X + sansBold.widthOfTextAtSize("SCHUTTING", 8) + 4,
    y: HEADER_Y, size: 8, font: sans,
    color: COL.muted, characterSpacing: 1.4,
  });
  // Short doc title centered
  const short = docTitle.length > 70 ? docTitle.slice(0, 67) + "..." : docTitle;
  const w = sansMed.widthOfTextAtSize(short, 8);
  page.drawText(safeText(short), {
    x: (PAGE_W - w) / 2, y: HEADER_Y, size: 8, font: sansMed,
    color: COL.muted, characterSpacing: 0.3,
  });
  // Page number right
  const pn = `${pageNum.toString().padStart(2, "0")}`;
  const pnW = sansMed.widthOfTextAtSize(pn, 8);
  page.drawText(pn, {
    x: PAGE_W - MARGIN_X - pnW, y: HEADER_Y, size: 8, font: sansMed,
    color: COL.primary, characterSpacing: 0.8,
  });
  // Hairline rule under header
  page.drawRectangle({
    x: MARGIN_X, y: HEADER_Y - 8, width: PAGE_W - MARGIN_X * 2, height: 0.5,
    color: COL.hairline,
  });
}

function drawFooter(ctx: Ctx) {
  const { page, sans, sansMed } = ctx;
  // Orange thin rule
  page.drawRectangle({
    x: MARGIN_X, y: FOOTER_Y + 14, width: 32, height: 1.4, color: COL.accent,
  });
  // Footer text
  page.drawText(safeText(BRAND.website), {
    x: MARGIN_X, y: FOOTER_Y, size: 7.5, font: sansMed, color: COL.body,
    characterSpacing: 0.4,
  });
  page.drawText(safeText(BRAND.email), {
    x: MARGIN_X + 130, y: FOOTER_Y, size: 7.5, font: sans, color: COL.muted,
  });
  // Warranty badge right
  const badge = "25 JAAR GARANTIE";
  const w = sansMed.widthOfTextAtSize(badge, 7);
  page.drawText(badge, {
    x: PAGE_W - MARGIN_X - w, y: FOOTER_Y, size: 7, font: sansMed,
    color: COL.accent, characterSpacing: 1.6,
  });
}

function newPage(ctx: Ctx) {
  ctx.page = ctx.pdf.addPage([PAGE_W, PAGE_H]);
  ctx.pageNum += 1;
  // Cream tint background — very subtle
  ctx.page.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: PAGE_H, color: COL.paper });
  drawHeader(ctx);
  drawFooter(ctx);
  ctx.y = CONTENT_TOP;
}

function need(ctx: Ctx, h: number) {
  if (ctx.y - h < CONTENT_BOTTOM) newPage(ctx);
}

/* ── Section renderers ────────────────────────────────────────── */

function drawSectionHeading(ctx: Ctx, num: number, heading: string) {
  // Reserve generous space so the heading never lands within ~200pt of the
  // page bottom — keeps the heading together with its first table/bullet block
  // and avoids the orphan-heading / headerless-table bug.
  need(ctx, 200);
  const { page, serif, serifBold } = ctx;
  const numStr = num.toString().padStart(2, "0");
  // Large outline numeral
  page.drawText(numStr, {
    x: MARGIN_X, y: ctx.y - 28, size: 38, font: serif, color: COL.accentSoft,
  });
  // Heading text beside numeral
  const headingX = MARGIN_X + 60;
  const lines = wrap(heading, serifBold, 18, PAGE_W - headingX - MARGIN_X);
  let hy = ctx.y - 12;
  for (const ln of lines) {
    page.drawText(safeText(ln), {
      x: headingX, y: hy, size: 18, font: serifBold, color: COL.primary,
    });
    hy -= 21;
  }
  // Orange rule under
  page.drawRectangle({
    x: headingX, y: hy + 6, width: 36, height: 1.4, color: COL.accent,
  });
  ctx.y = Math.min(ctx.y - 28 - 8, hy - 4) - 16;
}

function drawParagraph(ctx: Ctx, text: string, opts?: { lead?: boolean }) {
  const size = opts?.lead ? 10.5 : 9.5;
  const lh = size * 1.5;
  const lines = wrap(text, ctx.sans, size, PAGE_W - MARGIN_X * 2);
  for (const ln of lines) {
    need(ctx, lh);
    ctx.page.drawText(safeText(ln), {
      x: MARGIN_X, y: ctx.y - size, size, font: ctx.sans, color: COL.body,
    });
    ctx.y -= lh;
  }
  ctx.y -= 4;
}

function drawBullets(ctx: Ctx, items: string[]) {
  const size = 9.5;
  const lh = size * 1.55;
  const indent = 16;
  for (const it of items) {
    const lines = wrap(it, ctx.sans, size, PAGE_W - MARGIN_X * 2 - indent);
    const blockH = lines.length * lh + 2;
    need(ctx, blockH);
    // Orange square bullet
    ctx.page.drawRectangle({
      x: MARGIN_X + 2, y: ctx.y - size + 2, width: 4, height: 4, color: COL.accent,
    });
    let by = ctx.y;
    for (const ln of lines) {
      ctx.page.drawText(safeText(ln), {
        x: MARGIN_X + indent, y: by - size, size, font: ctx.sans, color: COL.body,
      });
      by -= lh;
    }
    ctx.y -= blockH;
  }
  ctx.y -= 4;
}

function drawTable(ctx: Ctx, headers: string[], rows: string[][]) {
  const cols = headers.length;
  const tableW = PAGE_W - MARGIN_X * 2;
  // First column slightly wider, rest equal
  const firstW = tableW * 0.42;
  const restW = (tableW - firstW) / (cols - 1 || 1);
  const widths = cols === 1 ? [tableW] : [firstW, ...Array(cols - 1).fill(restW)];
  const xPos: number[] = [];
  let acc = MARGIN_X;
  for (const w of widths) { xPos.push(acc); acc += w; }

  const padX = 8;
  const headerH = 24;
  const rowSize = 8.8;
  const rowLH = rowSize * 1.45;

  // Header (reusable so we can reprint after a page break)
  const drawHeaderRow = () => {
    need(ctx, headerH + 12);
    ctx.page.drawRectangle({
      x: MARGIN_X, y: ctx.y - headerH, width: tableW, height: headerH, color: COL.primary,
    });
    for (let c = 0; c < cols; c++) {
      ctx.page.drawText(safeText(headers[c]), {
        x: xPos[c] + padX, y: ctx.y - headerH + 8, size: 8.5, font: ctx.sansBold,
        color: COL.paper, characterSpacing: 0.6,
      });
    }
    ctx.y -= headerH;
  };
  drawHeaderRow();

  // Rows
  for (let r = 0; r < rows.length; r++) {
    // Wrap each cell
    const cellLines: string[][] = rows[r].map((c, i) =>
      wrap(c ?? "", ctx.sans, rowSize, widths[i] - padX * 2)
    );
    const maxLines = Math.max(1, ...cellLines.map((l) => l.length));
    const rowH = maxLines * rowLH + 8;

    // Page break mid-table → reprint header row so users never see a headerless table
    if (ctx.y - rowH < CONTENT_BOTTOM) {
      newPage(ctx);
      drawHeaderRow();
    }

    // Zebra
    if (r % 2 === 1) {
      ctx.page.drawRectangle({
        x: MARGIN_X, y: ctx.y - rowH, width: tableW, height: rowH, color: COL.zebra,
      });
    }
    // Bottom hairline
    ctx.page.drawRectangle({
      x: MARGIN_X, y: ctx.y - rowH, width: tableW, height: 0.4, color: COL.hairline,
    });

    for (let c = 0; c < cols; c++) {
      const lines = cellLines[c];
      let cy = ctx.y - 6;
      const isNumeric = /^[€E]?\s*\d/.test((rows[r][c] || "").trim()) || c === cols - 1 && /\d/.test(rows[r][c] || "");
      for (const ln of lines) {
        const txt = ln;
        const xT = isNumeric && c > 0
          ? xPos[c] + widths[c] - padX - ctx.sansMed.widthOfTextAtSize(txt, rowSize)
          : xPos[c] + padX;
        ctx.page.drawText(safeText(txt), {
          x: xT, y: cy - rowSize, size: rowSize,
          font: c === 0 ? ctx.sansMed : ctx.sans,
          color: c === 0 ? COL.ink : COL.body,
        });
        cy -= rowLH;
      }
    }
    ctx.y -= rowH;
  }
  // Bottom orange accent rule
  ctx.page.drawRectangle({
    x: MARGIN_X, y: ctx.y - 2, width: 40, height: 1.4, color: COL.accent,
  });
  ctx.y -= 16;
}

/* ── Cover page ───────────────────────────────────────────────── */

async function drawCover(ctx: Ctx, doc: BrandedDoc, meta: DocMeta) {
  // pageNum already incremented to 1 by newPage when first called by caller
  const page = ctx.page;
  // Full-bleed photo (top 70%)
  const heroH = PAGE_H * 0.66;
  const coverBytes = await fetchBytes(`${COVER_BASE}/${meta.cover}`);
  if (coverBytes) {
    try {
      const img = await ctx.pdf.embedJpg(coverBytes);
      const dims = img.scaleToFit(PAGE_W, heroH * 1.4);
      // center
      page.drawImage(img, {
        x: (PAGE_W - dims.width) / 2,
        y: PAGE_H - heroH - (dims.height - heroH) / 2,
        width: dims.width,
        height: dims.height,
      });
    } catch (e) {
      console.warn("Cover image embed failed", e);
      page.drawRectangle({ x: 0, y: PAGE_H - heroH, width: PAGE_W, height: heroH, color: COL.primaryDeep });
    }
  } else {
    page.drawRectangle({ x: 0, y: PAGE_H - heroH, width: PAGE_W, height: heroH, color: COL.primaryDeep });
  }
  // Dark gradient overlay simulated with two stacked rectangles + opacity
  page.drawRectangle({
    x: 0, y: PAGE_H - heroH, width: PAGE_W, height: heroH,
    color: COL.ink, opacity: 0.35,
  });
  page.drawRectangle({
    x: 0, y: PAGE_H - heroH, width: PAGE_W, height: heroH * 0.55,
    color: COL.ink, opacity: 0.35,
  });

  // Top brand strip
  page.drawText("SCHUTTING", {
    x: MARGIN_X, y: PAGE_H - 50, size: 9.5, font: ctx.sansBold,
    color: COL.paper, characterSpacing: 2,
  });
  page.drawText("VAN COMPOSIET", {
    x: MARGIN_X + ctx.sansBold.widthOfTextAtSize("SCHUTTING", 9.5) + 6,
    y: PAGE_H - 50, size: 9.5, font: ctx.sans,
    color: rgb(1, 1, 1), opacity: 0.85, characterSpacing: 2,
  });
  page.drawRectangle({
    x: MARGIN_X, y: PAGE_H - 58, width: 24, height: 1.2, color: COL.accent,
  });
  // Edition right
  const edW = ctx.sansMed.widthOfTextAtSize(BRAND.edition.toUpperCase(), 8);
  page.drawText(BRAND.edition.toUpperCase(), {
    x: PAGE_W - MARGIN_X - edW, y: PAGE_H - 50, size: 8, font: ctx.sansMed,
    color: COL.paper, characterSpacing: 2,
  });

  // Eyebrow (above title, on bottom half of hero)
  const titleBoxY = PAGE_H - heroH + 40; // title block sits here
  page.drawRectangle({
    x: MARGIN_X, y: titleBoxY + 110, width: 28, height: 1.6, color: COL.accent,
  });
  page.drawText(safeText(meta.eyebrow), {
    x: MARGIN_X + 36, y: titleBoxY + 106, size: 9, font: ctx.sansBold,
    color: COL.paper, characterSpacing: 2.5,
  });

  // Big serif title (white) wrapping to 2 lines
  const titleSize = doc.title.length > 50 ? 28 : 34;
  const titleLines = wrap(doc.title, ctx.serifBold, titleSize, PAGE_W - MARGIN_X * 2 - 140);
  let ty = titleBoxY + 70;
  for (const ln of titleLines) {
    page.drawText(safeText(ln), {
      x: MARGIN_X, y: ty, size: titleSize, font: ctx.serifBold, color: COL.paper,
    });
    ty -= titleSize + 4;
  }
  // Subtitle
  const subLines = wrap(doc.subtitle, ctx.sans, 11, PAGE_W - MARGIN_X * 2 - 140);
  let sy = ty - 6;
  for (const ln of subLines) {
    page.drawText(safeText(ln), {
      x: MARGIN_X, y: sy, size: 11, font: ctx.sans,
      color: rgb(1, 1, 1), opacity: 0.88,
    });
    sy -= 16;
  }

  // 25-jaar garantie seal (vector) — bottom right of hero
  const sealCX = PAGE_W - 90;
  const sealCY = titleBoxY + 60;
  const sealR = 38;
  page.drawCircle({ x: sealCX, y: sealCY, size: sealR, color: COL.accent });
  page.drawCircle({ x: sealCX, y: sealCY, size: sealR - 4, borderColor: COL.paper, borderWidth: 0.8, color: COL.accent });
  // "25" centered
  const num = "25";
  const numW = ctx.serifBold.widthOfTextAtSize(num, 26);
  page.drawText(num, {
    x: sealCX - numW / 2, y: sealCY + 2, size: 26, font: ctx.serifBold, color: COL.paper,
  });
  // "JAAR" below
  const jaar = "JAAR";
  const jw = ctx.sansBold.widthOfTextAtSize(jaar, 7);
  page.drawText(jaar, {
    x: sealCX - jw / 2, y: sealCY - 12, size: 7, font: ctx.sansBold,
    color: COL.paper, characterSpacing: 2,
  });
  const gar = "GARANTIE";
  const gw = ctx.sansMed.widthOfTextAtSize(gar, 5.5);
  page.drawText(gar, {
    x: sealCX - gw / 2, y: sealCY - 20, size: 5.5, font: ctx.sansMed,
    color: COL.paper, characterSpacing: 1.6,
  });

  // ── Bottom cream block (34% of page) ────────────────────────
  const blockH = PAGE_H - heroH;
  page.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: blockH, color: COL.cream });

  // Three-column info strip
  const colY = blockH - 36;
  const colW = (PAGE_W - MARGIN_X * 2) / 3;
  const pillars = [
    { label: "UITGAVE", value: BRAND.edition },
    { label: "GARANTIE", value: "25 jaar fabrieksgarantie" },
    { label: "ONLINE", value: BRAND.website },
  ];
  for (let i = 0; i < pillars.length; i++) {
    const x = MARGIN_X + i * colW;
    page.drawText(pillars[i].label, {
      x, y: colY, size: 7, font: ctx.sansBold, color: COL.accent, characterSpacing: 2,
    });
    page.drawText(safeText(pillars[i].value), {
      x, y: colY - 14, size: 10, font: ctx.serifBold, color: COL.primary,
    });
    if (i < pillars.length - 1) {
      page.drawRectangle({
        x: x + colW - 12, y: colY - 18, width: 0.5, height: 28, color: COL.hairline,
      });
    }
  }

  // Tagline + contact bar at the bottom
  const tagY = 60;
  page.drawText(safeText(BRAND.tagline), {
    x: MARGIN_X, y: tagY, size: 9.5, font: ctx.sans, color: COL.body,
  });
  page.drawRectangle({
    x: MARGIN_X, y: tagY - 10, width: 28, height: 1.2, color: COL.accent,
  });

  // Footer dark bar
  page.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: 28, color: COL.primary });
  const fLine = `${BRAND.website}  ·  ${BRAND.email}  ·  ${BRAND.phone}`;
  page.drawText(safeText(fLine), {
    x: MARGIN_X, y: 10, size: 8, font: ctx.sansMed,
    color: COL.paper, characterSpacing: 0.6,
  });
  const seal2 = "25 JAAR GARANTIE";
  const s2w = ctx.sansBold.widthOfTextAtSize(seal2, 8);
  page.drawText(seal2, {
    x: PAGE_W - MARGIN_X - s2w, y: 10, size: 8, font: ctx.sansBold,
    color: COL.accent, characterSpacing: 2,
  });
}

/* ── Optional inside gallery (catalog/colour docs) ────────────── */

async function drawGalleryPage(ctx: Ctx, meta: DocMeta) {
  if (!meta.gallery || meta.gallery.length === 0) return;
  newPage(ctx);
  // Section heading
  ctx.page.drawText("BEELDIMPRESSIE", {
    x: MARGIN_X, y: ctx.y, size: 9, font: ctx.sansBold,
    color: COL.accent, characterSpacing: 2.5,
  });
  ctx.y -= 14;
  ctx.page.drawText("Composiet in de praktijk", {
    x: MARGIN_X, y: ctx.y - 24, size: 26, font: ctx.serifBold, color: COL.primary,
  });
  ctx.y -= 40;
  ctx.page.drawRectangle({
    x: MARGIN_X, y: ctx.y + 6, width: 40, height: 1.4, color: COL.accent,
  });
  ctx.y -= 20;

  // 2-col grid of images
  const cols = 2;
  const gap = 14;
  const tileW = (PAGE_W - MARGIN_X * 2 - gap * (cols - 1)) / cols;
  const tileH = tileW * 0.72;

  let col = 0;
  for (const g of meta.gallery) {
    if (ctx.y - tileH < CONTENT_BOTTOM) {
      newPage(ctx);
      col = 0;
    }
    const x = MARGIN_X + col * (tileW + gap);
    const bytes = await fetchBytes(`${COVER_BASE}/${g}`);
    if (bytes) {
      try {
        const img = await ctx.pdf.embedJpg(bytes);
        // Cover-fit
        const ratioImg = img.width / img.height;
        const ratioBox = tileW / tileH;
        let drawW = tileW, drawH = tileH, ix = x, iy = ctx.y - tileH;
        if (ratioImg > ratioBox) {
          drawH = tileH;
          drawW = tileH * ratioImg;
          ix = x - (drawW - tileW) / 2;
        } else {
          drawW = tileW;
          drawH = tileW / ratioImg;
          iy = ctx.y - tileH - (drawH - tileH) / 2;
        }
        // Clip via overlay-rectangles trick is not available; draw at tile size letting overflow
        ctx.page.drawImage(img, { x: ix, y: iy, width: drawW, height: drawH });
        // Frame border
        ctx.page.drawRectangle({
          x, y: ctx.y - tileH, width: tileW, height: tileH,
          borderColor: COL.hairline, borderWidth: 0.5,
        });
      } catch (e) {
        ctx.page.drawRectangle({
          x, y: ctx.y - tileH, width: tileW, height: tileH, color: COL.zebra,
        });
      }
    } else {
      ctx.page.drawRectangle({
        x, y: ctx.y - tileH, width: tileW, height: tileH, color: COL.zebra,
      });
    }
    col++;
    if (col >= cols) {
      col = 0;
      ctx.y -= tileH + gap + 4;
    }
  }
  if (col > 0) ctx.y -= tileH + gap + 4;
}

/* ── Colour swatch page (kleurengids) ─────────────────────────── */

function drawColourSwatchPage(ctx: Ctx) {
  newPage(ctx);
  ctx.page.drawText("TINTENPALET", {
    x: MARGIN_X, y: ctx.y, size: 9, font: ctx.sansBold,
    color: COL.accent, characterSpacing: 2.5,
  });
  ctx.y -= 14;
  ctx.page.drawText("De 7 collectiekleuren", {
    x: MARGIN_X, y: ctx.y - 24, size: 26, font: ctx.serifBold, color: COL.primary,
  });
  ctx.y -= 40;
  ctx.page.drawRectangle({ x: MARGIN_X, y: ctx.y + 6, width: 40, height: 1.4, color: COL.accent });
  ctx.y -= 20;

  // 2 cols of swatches
  const cols = 2;
  const gap = 14;
  const tileW = (PAGE_W - MARGIN_X * 2 - gap * (cols - 1)) / cols;
  const tileH = 64;
  let col = 0;
  for (const t of SWATCHES) {
    if (ctx.y - tileH < CONTENT_BOTTOM) { newPage(ctx); col = 0; }
    const x = MARGIN_X + col * (tileW + gap);
    const y = ctx.y - tileH;
    // Swatch
    ctx.page.drawRectangle({
      x, y, width: tileW * 0.45, height: tileH,
      color: rgb(t.hex[0], t.hex[1], t.hex[2]),
    });
    // Info
    const ix = x + tileW * 0.45 + 12;
    ctx.page.drawText(safeText(t.name), {
      x: ix, y: y + tileH - 22, size: 14, font: ctx.serifBold, color: COL.primary,
    });
    ctx.page.drawText(safeText(t.sub), {
      x: ix, y: y + tileH - 38, size: 8.5, font: ctx.sans, color: COL.muted,
    });
    ctx.page.drawText("LEVERBAAR IN ALLE PROFIELEN", {
      x: ix, y: y + 8, size: 6.5, font: ctx.sansBold, color: COL.accent, characterSpacing: 1.4,
    });
    col++;
    if (col >= cols) { col = 0; ctx.y -= tileH + gap; }
  }
  if (col > 0) ctx.y -= tileH + gap;
}

/* ── Closing CTA page ─────────────────────────────────────────── */

function drawClosingPage(ctx: Ctx) {
  newPage(ctx);
  // Full cream wash already drawn by newPage (paper). Lay a sand panel.
  ctx.page.drawRectangle({
    x: 0, y: 0, width: PAGE_W, height: PAGE_H, color: COL.cream,
  });
  // Re-draw header & footer over wash
  drawHeader(ctx);
  drawFooter(ctx);

  // Centered title
  const eyeb = "TOT SLOT";
  const ew = ctx.sansBold.widthOfTextAtSize(eyeb, 9);
  ctx.page.drawText(eyeb, {
    x: (PAGE_W - ew) / 2, y: PAGE_H * 0.66, size: 9, font: ctx.sansBold,
    color: COL.accent, characterSpacing: 3,
  });
  const title = "Klaar om te starten?";
  const tw = ctx.serifBold.widthOfTextAtSize(title, 32);
  ctx.page.drawText(safeText(title), {
    x: (PAGE_W - tw) / 2, y: PAGE_H * 0.60, size: 32, font: ctx.serifBold, color: COL.primary,
  });
  const sub = "Vraag een gratis offerte op maat of bestel direct online.";
  const sw = ctx.sans.widthOfTextAtSize(sub, 11);
  ctx.page.drawText(safeText(sub), {
    x: (PAGE_W - sw) / 2, y: PAGE_H * 0.56, size: 11, font: ctx.sans, color: COL.body,
  });

  // Three contact tiles
  const tiles = [
    { label: "BEL ONS", value: BRAND.phone },
    { label: "MAIL", value: BRAND.email },
    { label: "WEB", value: BRAND.website },
  ];
  const tileY = PAGE_H * 0.40;
  const tileW = (PAGE_W - MARGIN_X * 2 - 24) / 3;
  for (let i = 0; i < 3; i++) {
    const x = MARGIN_X + i * (tileW + 12);
    ctx.page.drawRectangle({
      x, y: tileY, width: tileW, height: 90, color: COL.paper,
      borderColor: COL.hairline, borderWidth: 0.5,
    });
    // Circle icon
    ctx.page.drawCircle({ x: x + tileW / 2, y: tileY + 64, size: 14, color: COL.primary });
    const initial = tiles[i].label[0];
    const iw = ctx.serifBold.widthOfTextAtSize(initial, 14);
    ctx.page.drawText(initial, {
      x: x + tileW / 2 - iw / 2, y: tileY + 60, size: 14, font: ctx.serifBold, color: COL.paper,
    });
    const lw = ctx.sansBold.widthOfTextAtSize(tiles[i].label, 7);
    ctx.page.drawText(tiles[i].label, {
      x: x + tileW / 2 - lw / 2, y: tileY + 36, size: 7, font: ctx.sansBold,
      color: COL.accent, characterSpacing: 2,
    });
    const vw = ctx.sansMed.widthOfTextAtSize(tiles[i].value, 9);
    ctx.page.drawText(safeText(tiles[i].value), {
      x: x + tileW / 2 - vw / 2, y: tileY + 20, size: 9, font: ctx.sansMed, color: COL.ink,
    });
  }

  // Big CTA button
  const btnW = 280;
  const btnH = 44;
  const btnX = (PAGE_W - btnW) / 2;
  const btnY = PAGE_H * 0.22;
  ctx.page.drawRectangle({
    x: btnX, y: btnY, width: btnW, height: btnH, color: COL.accent,
  });
  const cta = "Vraag gratis advies aan";
  const cw = ctx.sansBold.widthOfTextAtSize(cta, 12);
  ctx.page.drawText(safeText(cta), {
    x: btnX + (btnW - cw) / 2, y: btnY + 16, size: 12, font: ctx.sansBold,
    color: COL.paper, characterSpacing: 0.8,
  });
  const urlS = BRAND.website;
  const uw = ctx.sansMed.widthOfTextAtSize(urlS, 8);
  ctx.page.drawText(urlS, {
    x: (PAGE_W - uw) / 2, y: btnY - 14, size: 8, font: ctx.sansMed,
    color: COL.muted, characterSpacing: 1.2,
  });

  // Small seal at bottom
  const sealCX = PAGE_W / 2;
  const sealCY = PAGE_H * 0.12;
  ctx.page.drawCircle({ x: sealCX, y: sealCY, size: 26, color: COL.primary });
  ctx.page.drawCircle({ x: sealCX, y: sealCY, size: 22, borderColor: COL.paper, borderWidth: 0.6, color: COL.primary });
  const num = "25";
  const nw = ctx.serifBold.widthOfTextAtSize(num, 18);
  ctx.page.drawText(num, {
    x: sealCX - nw / 2, y: sealCY + 1, size: 18, font: ctx.serifBold, color: COL.paper,
  });
  const jw = ctx.sansBold.widthOfTextAtSize("JAAR GARANTIE", 5);
  ctx.page.drawText("JAAR GARANTIE", {
    x: sealCX - jw / 2, y: sealCY - 13, size: 5, font: ctx.sansBold, color: COL.paper, characterSpacing: 1.4,
  });
}

/* ── Build a single PDF ───────────────────────────────────────── */

let cachedFontBytes: { serif: Uint8Array; sans: Uint8Array } | null = null;

async function loadFontBytes() {
  if (cachedFontBytes) return cachedFontBytes;
  const serifUrl = "https://raw.githubusercontent.com/google/fonts/main/ofl/lora/Lora%5Bwght%5D.ttf";
  const sansUrl = "https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/Manrope%5Bwght%5D.ttf";
  const [serifR, sansR] = await Promise.all([fetch(serifUrl), fetch(sansUrl)]);
  if (!serifR.ok) throw new Error(`Serif fetch: ${serifR.status}`);
  if (!sansR.ok) throw new Error(`Sans fetch: ${sansR.status}`);
  cachedFontBytes = {
    serif: new Uint8Array(await serifR.arrayBuffer()),
    sans: new Uint8Array(await sansR.arrayBuffer()),
  };
  return cachedFontBytes;
}

// Fresh byte copy — pdf-lib mutates the buffer during embed; sharing causes glyph loss.
function copyBytes(src: Uint8Array): Uint8Array {
  const out = new Uint8Array(src.length);
  out.set(src);
  return out;
}

async function buildPdf(doc: BrandedDoc): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  pdf.registerFontkit(fontkit);
  pdf.setTitle(`${doc.title} — ${BRAND.name}`);
  pdf.setAuthor(BRAND.name);
  pdf.setSubject(doc.subtitle);
  pdf.setProducer(BRAND.name);
  pdf.setCreator(BRAND.name);

  let serif: PDFFont, serifBold: PDFFont, sans: PDFFont, sansMed: PDFFont, sansBold: PDFFont;
  try {
    const f = await loadFontBytes();
    // Embed without subsetting — variable-font subsetting in fontkit drops glyphs.
    // Each embed gets its own byte copy to avoid the shared-buffer mutation bug.
    serif = await pdf.embedFont(copyBytes(f.serif));
    serifBold = await pdf.embedFont(copyBytes(f.serif));
    sans = await pdf.embedFont(copyBytes(f.sans));
    sansMed = await pdf.embedFont(copyBytes(f.sans));
    sansBold = await pdf.embedFont(copyBytes(f.sans));
  } catch (e) {
    console.warn("TTF embed failed, falling back to standard fonts", e);
    serif = await pdf.embedFont(StandardFonts.TimesRoman);
    serifBold = await pdf.embedFont(StandardFonts.TimesRomanBold);
    sans = await pdf.embedFont(StandardFonts.Helvetica);
    sansMed = await pdf.embedFont(StandardFonts.Helvetica);
    sansBold = await pdf.embedFont(StandardFonts.HelveticaBold);
  }

  const meta = META[doc.id] ?? DEFAULT_META;

  // Cover page
  const coverPage = pdf.addPage([PAGE_W, PAGE_H]);
  const ctx: Ctx = {
    pdf, page: coverPage, y: CONTENT_TOP, pageNum: 1,
    serif, serifBold, sans, sansMed, sansBold, docTitle: doc.title,
  };
  await drawCover(ctx, doc, meta);

  // Body pages — intro page with title repeat + sections
  newPage(ctx);
  // Eyebrow + lead title atop body
  ctx.page.drawText(safeText(meta.eyebrow), {
    x: MARGIN_X, y: ctx.y, size: 9, font: ctx.sansBold,
    color: COL.accent, characterSpacing: 2.5,
  });
  ctx.y -= 14;
  const tLines = wrap(doc.title, ctx.serifBold, 26, PAGE_W - MARGIN_X * 2);
  for (const ln of tLines) {
    ctx.page.drawText(safeText(ln), {
      x: MARGIN_X, y: ctx.y - 26, size: 26, font: ctx.serifBold, color: COL.primary,
    });
    ctx.y -= 30;
  }
  ctx.y -= 6;
  ctx.page.drawRectangle({ x: MARGIN_X, y: ctx.y, width: 48, height: 1.6, color: COL.accent });
  ctx.y -= 18;
  // Subtitle as a callout
  const subLines = wrap(doc.subtitle, ctx.sans, 11, PAGE_W - MARGIN_X * 2 - 16);
  ctx.page.drawRectangle({
    x: MARGIN_X, y: ctx.y - (subLines.length * 16) - 8,
    width: 2.5, height: subLines.length * 16 + 4, color: COL.accent,
  });
  for (const ln of subLines) {
    ctx.page.drawText(safeText(ln), {
      x: MARGIN_X + 14, y: ctx.y - 12, size: 11, font: ctx.sans, color: COL.body,
    });
    ctx.y -= 16;
  }
  ctx.y -= 20;

  // Sections
  for (let i = 0; i < doc.sections.length; i++) {
    const s = doc.sections[i];
    // Strip leading "N. " or "Stap N - " patterns from source headings so the
    // numbered marker doesn't double up ("04  4. Palen plaatsen").
    const cleanHeading = s.heading.replace(/^\s*(?:\d+\.\s*|Stap\s+\d+\s*[-–—]\s*)/i, "");
    drawSectionHeading(ctx, i + 1, cleanHeading);
    if (s.paragraphs) {
      for (let j = 0; j < s.paragraphs.length; j++) {
        drawParagraph(ctx, s.paragraphs[j], { lead: j === 0 });
      }
    }
    if (s.bullets && s.bullets.length) drawBullets(ctx, s.bullets);
    if (s.table) drawTable(ctx, s.table.headers, s.table.rows);
    ctx.y -= 8;
  }

  // Gallery for catalog-style docs
  if (meta.gallery && meta.gallery.length) {
    await drawGalleryPage(ctx, meta);
  }
  // Colour swatch page for kleurengids
  if (doc.id === "kleurengids") {
    drawColourSwatchPage(ctx);
  }

  // Closing CTA
  drawClosingPage(ctx);

  return await pdf.save();
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
    const failures: { id: string; error: string }[] = [];

    for (const doc of docsToGenerate) {
      try {
        const pdfBytes = await buildPdf(doc);
        const fileName = `branded-pdfs/${doc.id}.pdf`;
        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(fileName, pdfBytes, {
            contentType: "application/pdf",
            upsert: true,
          });
        if (uploadError) {
          console.error(`Upload error for ${doc.id}:`, uploadError);
          failures.push({ id: doc.id, error: uploadError.message });
          continue;
        }
        const { data: urlData } = supabase.storage
          .from("product-images")
          .getPublicUrl(fileName);
        results.push({ id: doc.id, url: urlData.publicUrl });
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        console.error(`Build error for ${doc.id}:`, msg);
        failures.push({ id: doc.id, error: msg });
      }
    }

    return new Response(
      JSON.stringify({ ok: failures.length === 0, generated: results, failures }),
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

