import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, X, ArrowRight, Info } from "lucide-react";
import { useState } from "react";
import { categories } from "@/data/products";

type CompareCategory = "gevelbekleding" | "schuttingen" | "vlonderplanken";

interface ComparisonRow {
  label: string;
  tooltip?: string;
  values: Record<CompareCategory, string | boolean>;
}

const comparisonData: ComparisonRow[] = [
  { label: "Toepassing", values: { gevelbekleding: "Gevel / wand", schuttingen: "Erfafscheiding / tuin", vlonderplanken: "Terras / vlonder" } },
  { label: "Startprijs", values: { gevelbekleding: "Vanaf €25,95/stuk", schuttingen: "Vanaf €139,95/paneel", vlonderplanken: "Vanaf €16,95/plank" } },
  { label: "Prijs per m²", values: { gevelbekleding: "± €40,95", schuttingen: "± €45,00", vlonderplanken: "± €35,00" } },
  { label: "Garantie", values: { gevelbekleding: "15 jaar", schuttingen: "15 jaar", vlonderplanken: "15 jaar" } },
  { label: "Levensduur", values: { gevelbekleding: "25+ jaar", schuttingen: "20-25 jaar", vlonderplanken: "15-25 jaar" } },
  { label: "Co-Extrusie beschermlaag", values: { gevelbekleding: true, schuttingen: true, vlonderplanken: true } },
  { label: "Onderhoudsvrij", values: { gevelbekleding: true, schuttingen: true, vlonderplanken: true } },
  { label: "UV-bestendig", values: { gevelbekleding: true, schuttingen: true, vlonderplanken: true } },
  { label: "Vochtbestendig", values: { gevelbekleding: true, schuttingen: true, vlonderplanken: true } },
  { label: "Zelf te monteren", values: { gevelbekleding: true, schuttingen: true, vlonderplanken: true } },
  { label: "Antislip coating", values: { gevelbekleding: false, schuttingen: false, vlonderplanken: true } },
  { label: "Naadloze montage optie", values: { gevelbekleding: false, schuttingen: false, vlonderplanken: true } },
  { label: "Rhombus profiel", values: { gevelbekleding: true, schuttingen: true, vlonderplanken: false } },
  { label: "Verticale montage", values: { gevelbekleding: true, schuttingen: true, vlonderplanken: false } },
  { label: "Beschikbare kleuren", values: { gevelbekleding: "8 kleuren", schuttingen: "10+ kleuren", vlonderplanken: "5 kleuren" } },
  { label: "Massieve variant", values: { gevelbekleding: false, schuttingen: false, vlonderplanken: true } },
  { label: "Gewicht", values: { gevelbekleding: "Licht", schuttingen: "Middel", vlonderplanken: "Middel" } },
  { label: "Plankdikte", values: { gevelbekleding: "Standaard", schuttingen: "Extra dik (2,5cm)", vlonderplanken: "Standaard / Massief" } },
];

const categoryMeta: Record<CompareCategory, { name: string; tagline: string; slug: string }> = {
  gevelbekleding: { name: "Gevelbekleding", tagline: "Moderne uitstraling voor je gevel", slug: "gevelbekleding" },
  schuttingen: { name: "Schuttingen", tagline: "Privacy & stijl voor je tuin", slug: "schuttingen" },
  vlonderplanken: { name: "Vlonderplanken", tagline: "Luxe terras zonder onderhoud", slug: "vlonderplanken" },
};

const allCategories: CompareCategory[] = ["gevelbekleding", "schuttingen", "vlonderplanken"];

const compareFaqs = [
  { q: "Welk composiet product is het goedkoopst?", a: "Vlonderplanken zijn het meest voordelig met prijzen vanaf €16,95 per plank. Gevelbekleding begint bij €25,95 per stuk en schuttingpanelen vanaf €139,95." },
  { q: "Welk composiet product gaat het langst mee?", a: "Composiet gevelbekleding heeft de langste levensduur (25+ jaar) doordat het minder belast wordt dan een terras of schutting. Alle producten hebben 15 jaar garantie." },
  { q: "Kan ik verschillende composiet producten combineren?", a: "Absoluut! Veel klanten combineren bijvoorbeeld composiet gevelbekleding met een bijpassende schutting in dezelfde kleur voor een uniforme uitstraling." },
];

const ComparePage = () => {
  const [selected, setSelected] = useState<CompareCategory[]>(allCategories);

  const toggle = (cat: CompareCategory) => {
    if (selected.includes(cat)) {
      if (selected.length > 1) setSelected(selected.filter((c) => c !== cat));
    } else {
      setSelected([...selected, cat]);
    }
  };

  const visibleCategories = allCategories.filter((c) => selected.includes(c));

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Composiet Vergelijken | Composiethekwerk.nl"
        description="Vergelijk composiet gevelbekleding, schuttingen en vlonderplanken op prijs, eigenschappen en toepassingen. Vind het beste product voor jouw project."
        canonical="/vergelijken"
      />
      <Header />
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Vergelijken" },
      ]} />

      <main>
        <section className="container py-12 md:py-20">
          <div className="max-w-3xl mb-10">
            <span className="text-accent text-sm font-medium uppercase tracking-wider">Vergelijken</span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2">
              Welk composiet product past bij jou?
            </h1>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              Vergelijk onze drie productcategorieën op prijs, eigenschappen en toepassingen om de beste keuze te maken voor jouw project.
            </p>
          </div>

          {/* Toggle filters */}
          <div className="flex flex-wrap gap-3 mb-8">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => toggle(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  selected.includes(cat)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:border-primary/40"
                }`}
              >
                {categoryMeta[cat].name}
              </button>
            ))}
          </div>

          {/* Comparison table */}
          <div className="rounded-xl border border-border overflow-hidden bg-card">
            <div className="grid border-b border-border" style={{ gridTemplateColumns: `200px repeat(${visibleCategories.length}, 1fr)` }}>
              <div className="p-4 bg-muted/50" />
              {visibleCategories.map((cat) => {
                const catData = categories.find((c) => c.id === cat);
                return (
                  <div key={cat} className="p-5 text-center border-l border-border">
                    <div className="w-full aspect-[16/9] rounded-lg overflow-hidden mb-3">
                      <img src={catData?.image} alt={`${categoryMeta[cat].name} composiet producten vergelijken`} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="font-serif font-bold text-foreground">{categoryMeta[cat].name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{categoryMeta[cat].tagline}</p>
                  </div>
                );
              })}
            </div>

            {comparisonData.map((row, i) => (
              <div
                key={row.label}
                className={`grid ${i % 2 === 0 ? "bg-card" : "bg-muted/30"} ${i < comparisonData.length - 1 ? "border-b border-border" : ""}`}
                style={{ gridTemplateColumns: `200px repeat(${visibleCategories.length}, 1fr)` }}
              >
                <div className="p-4 flex items-center gap-1.5 text-sm font-medium text-foreground">
                  {row.label}
                  {row.tooltip && <Info className="w-3.5 h-3.5 text-muted-foreground" />}
                </div>
                {visibleCategories.map((cat) => {
                  const val = row.values[cat];
                  return (
                    <div key={cat} className="p-4 text-center border-l border-border flex items-center justify-center">
                      {typeof val === "boolean" ? (
                        val ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10">
                            <Check className="w-4 h-4 text-primary" />
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-muted">
                            <X className="w-4 h-4 text-muted-foreground" />
                          </span>
                        )
                      ) : (
                        <span className="text-sm text-foreground">{val}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}

            <div
              className="grid border-t border-border bg-muted/50"
              style={{ gridTemplateColumns: `200px repeat(${visibleCategories.length}, 1fr)` }}
            >
              <div className="p-5" />
              {visibleCategories.map((cat) => (
                <div key={cat} className="p-5 text-center border-l border-border">
                  <Button asChild className="bg-primary hover:bg-primary/90">
                    <Link to={`/categorie/${categoryMeta[cat].slug}`}>
                      Bekijk producten <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Advice section */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-xl">🏠</span>
              </div>
              <h3 className="font-serif font-bold text-foreground mb-2">Gevel upgraden?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Kies gevelbekleding voor een moderne, onderhoudsvriendelijke gevel die jarenlang mooi blijft.
              </p>
              <Button asChild variant="outline" size="sm">
                <Link to="/categorie/gevelbekleding">Bekijk gevelbekleding</Link>
              </Button>
            </div>
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-xl">🌿</span>
              </div>
              <h3 className="font-serif font-bold text-foreground mb-2">Privacy in de tuin?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Composiet schuttingen bieden privacy met stijl. Extra dikke 2,5cm planken voor een robuust resultaat.
              </p>
              <Button asChild variant="outline" size="sm">
                <Link to="/categorie/schuttingen">Bekijk schuttingen</Link>
              </Button>
            </div>
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-xl">☀️</span>
              </div>
              <h3 className="font-serif font-bold text-foreground mb-2">Droomterras aanleggen?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Vlonderplanken met antislip en naadloze montage. Splintervrij en veilig voor blote voeten.
              </p>
              <Button asChild variant="outline" size="sm">
                <Link to="/categorie/vlonderplanken">Bekijk vlonderplanken</Link>
              </Button>
            </div>
          </div>
        </section>

        <FAQSection faqs={compareFaqs} />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default ComparePage;
