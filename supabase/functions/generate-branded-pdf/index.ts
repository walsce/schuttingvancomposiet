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
          "Warme tinten (Teak, Walnoot, Eiken) passen bij een landelijke of klassieke tuinstijl. Ze creëren een sfeervolle, uitnodigende uitstraling.",
          "Koele tinten (Grijs, Zwart, Antraciet) passen bij een moderne of industriële stijl. Ze geven een strak en tijdloos resultaat.",
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
        heading: "Beschikbare kleuren",
        table: {
          headers: ["Kleur", "Categorie", "Stijl"],
          rows: [
            ["Teak", "Warm", "Klassiek, landelijk"],
            ["Walnoot", "Warm", "Rijk, luxe"],
            ["Eiken", "Warm", "Natuurlijk, licht"],
            ["Donker Grijs", "Koel", "Modern, strak"],
            ["Zwart", "Koel", "Industrieel, gedurfd"],
            ["Antraciet", "Koel", "Tijdloos, elegant"],
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
    id: "onderhoud-elegance-emotion",
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
          "Schrobmachine (bijv. Kärcher PCL 4) — ideaal voor grote oppervlakken",
          "Hogedrukreiniger: maximaal 80 bar, 25 cm afstand, nooit stilhouden",
          "Zachte bezem voor regelmatig vegen",
        ],
      },
      {
        heading: "Seizoenstips",
        bullets: [
          "Voorjaar: grote schoonmaakbeurt na de winter",
          "Zomer: direct vlekken verwijderen (BBQ, ijs)",
          "Herfst: bladeren en naaldden verwijderen",
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
        heading: "Milieu-impact per m²",
        paragraphs: [
          "De CO₂-voetafdruk van composiet vlonderplanken is significant lager dan die van tropisch hardhout, mede door het gebruik van gerecycled materiaal en het ontbreken van onderhoud met chemische middelen gedurende de levensduur.",
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
];

/* ── Simple PDF builder (plain text, no external libs) ─────────── */

// We generate a minimal valid PDF with branded layout using raw PDF operators.
// This avoids needing jsPDF in Deno and keeps the function lightweight.

function buildPdf(doc: BrandedDoc): Uint8Array {
  const brandName = "SchuttingenvanComposiet.nl";
  const accentHex = "#D97706"; // amber-600
  const lines: string[] = [];
  let yPos = 750; // Start position (A4 = 595 x 842 points)
  const leftMargin = 50;
  const rightMargin = 545;
  const pageWidth = rightMargin - leftMargin;
  const lineHeight = 14;
  const objects: string[] = [];
  const pages: { contentRef: number; length: number }[] = [];
  let objCount = 0;
  let currentPageContent = "";

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
      .replace(/[^\\x20-\\x7E]/g, (ch) => {
        // Replace non-ASCII with approximation
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
          "'": "'", "’": "'", "\"": "\\\"", "”": "\\\"",
          "…": "...",
          "×": "x",
          "°": "o",
          "₂": "2",
        };
        return map[ch] || "?";
      });
  }

  function wrapText(text: string, maxWidth: number, fontSize: number): string[] {
    const charWidth = fontSize * 0.5; // approximate
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

  function newPage() {
    if (currentPageContent) {
      const streamBytes = new TextEncoder().encode(currentPageContent);
      const streamRef = addObj(
        `<< /Length ${streamBytes.length} >>\\nstream\\n${currentPageContent}\\nendstream`
      );
      pages.push({ contentRef: streamRef, length: streamBytes.length });
    }
    currentPageContent = "";
    yPos = 780;
  }

  function checkSpace(needed: number) {
    if (yPos - needed < 60) {
      newPage();
    }
  }

  function addLine(text: string, fontSize: number, bold: boolean, r: number, g: number, b: number) {
    const wrapped = wrapText(text, pageWidth, fontSize);
    for (const line of wrapped) {
      checkSpace(lineHeight + 2);
      const fontName = bold ? "/F2" : "/F1";
      currentPageContent += `BT ${fontName} ${fontSize} Tf ${r} ${g} ${b} rg ${leftMargin} ${yPos} Td (${escapePdf(line)}) Tj ET\\n`;
      yPos -= lineHeight;
    }
  }

  // Header
  currentPageContent = "";
  // Brand bar
  currentPageContent += `0.851 0.467 0.024 rg\\n${leftMargin} 800 ${pageWidth} 30 re f\\n`;
  currentPageContent += `BT /F2 11 Tf 1 1 1 rg ${leftMargin + 10} 810 Td (${escapePdf(brandName)}) Tj ET\\n`;
  yPos = 780;

  // Title
  addLine(doc.title, 18, true, 0.1, 0.1, 0.1);
  yPos -= 4;
  addLine(doc.subtitle, 11, false, 0.4, 0.4, 0.4);
  yPos -= 12;

  // Divider
  currentPageContent += `0.851 0.467 0.024 rg\\n${leftMargin} ${yPos} ${pageWidth} 2 re f\\n`;
  yPos -= 16;

  // Sections
  for (const section of doc.sections) {
    checkSpace(40);
    addLine(section.heading, 14, true, 0.1, 0.1, 0.1);
    yPos -= 4;

    if (section.paragraphs) {
      for (const p of section.paragraphs) {
        addLine(p, 10, false, 0.2, 0.2, 0.2);
        yPos -= 4;
      }
    }

    if (section.bullets) {
      for (const b of section.bullets) {
        checkSpace(lineHeight + 2);
        addLine(`  - ${b}`, 10, false, 0.2, 0.2, 0.2);
      }
      yPos -= 4;
    }

    if (section.table) {
      const { headers, rows } = section.table;
      const colCount = headers.length;
      const colWidth = pageWidth / colCount;

      checkSpace((rows.length + 1) * (lineHeight + 4) + 10);

      // Header row
      currentPageContent += `0.95 0.95 0.95 rg\\n${leftMargin} ${yPos - 2} ${pageWidth} ${lineHeight + 4} re f\\n`;
      for (let c = 0; c < colCount; c++) {
        const x = leftMargin + c * colWidth + 4;
        currentPageContent += `BT /F2 9 Tf 0.1 0.1 0.1 rg ${x} ${yPos} Td (${escapePdf(headers[c])}) Tj ET\\n`;
      }
      yPos -= lineHeight + 4;

      // Data rows
      for (const row of rows) {
        checkSpace(lineHeight + 4);
        for (let c = 0; c < colCount; c++) {
          const x = leftMargin + c * colWidth + 4;
          const cellText = row[c] || "";
          // Truncate to fit column
          const maxChars = Math.floor((colWidth - 8) / 4.5);
          const display = cellText.length > maxChars ? cellText.slice(0, maxChars - 2) + ".." : cellText;
          currentPageContent += `BT /F1 9 Tf 0.2 0.2 0.2 rg ${x} ${yPos} Td (${escapePdf(display)}) Tj ET\\n`;
        }
        yPos -= lineHeight + 2;
      }
      yPos -= 6;
    }
    yPos -= 8;
  }

  // Footer
  checkSpace(30);
  currentPageContent += `0.7 0.7 0.7 rg\\n${leftMargin} 40 ${pageWidth} 0.5 re f\\n`;
  currentPageContent += `BT /F1 8 Tf 0.5 0.5 0.5 rg ${leftMargin} 28 Td (${escapePdf(brandName + " | www.schuttingenvancomposiet.nl | info@schuttingenvancomposiet.nl")}) Tj ET\\n`;

  // Finalize last page
  newPage();

  // Build PDF structure
  // Obj 1: Catalog
  // Obj 2: Pages
  // Obj 3: Font Helvetica
  // Obj 4: Font Helvetica-Bold
  // Then page objects, then streams

  const finalObjects: string[] = [];
  let finalObjCount = 0;

  function addFinalObj(content: string): number {
    finalObjCount++;
    finalObjects.push(content);
    return finalObjCount;
  }

  const catalogRef = addFinalObj(""); // placeholder
  const pagesRef = addFinalObj(""); // placeholder
  const fontRef = addFinalObj(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>`);
  const fontBoldRef = addFinalObj(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>`);

  const pageRefs: number[] = [];
  for (const page of pages) {
    // Re-add streams
    const streamContent = objects[page.contentRef - 1];
    const streamRef = addFinalObj(streamContent);

    const pageRef = addFinalObj(
      `<< /Type /Page /Parent ${pagesRef} 0 R /MediaBox [0 0 595 842] /Contents ${streamRef} 0 R /Resources << /Font << /F1 ${fontRef} 0 R /F2 ${fontBoldRef} 0 R >> >> >>`
    );
    pageRefs.push(pageRef);
  }

  // Update catalog
  finalObjects[catalogRef - 1] = `<< /Type /Catalog /Pages ${pagesRef} 0 R >>`;
  // Update pages
  finalObjects[pagesRef - 1] = `<< /Type /Pages /Kids [${pageRefs.map((r) => `${r} 0 R`).join(" ")}] /Count ${pageRefs.length} >>`;

  // Build output
  let pdf = "%PDF-1.4\\n";
  const offsets: number[] = [];
  for (let i = 0; i < finalObjects.length; i++) {
    offsets.push(pdf.length);
    pdf += `${i + 1} 0 obj\\n${finalObjects[i]}\\nendobj\\n`;
  }

  const xrefOffset = pdf.length;
  pdf += `xref\\n0 ${finalObjects.length + 1}\\n`;
  pdf += "0000000000 65535 f \\n";
  for (const offset of offsets) {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \\n`;
  }
  pdf += `trailer\\n<< /Size ${finalObjects.length + 1} /Root ${catalogRef} 0 R >>\\nstartxref\\n${xrefOffset}\\n%%EOF`;

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

      // Upload to storage
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
