import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, X, ArrowRight, Info } from "lucide-react";
import { useState } from "react";
import { categories } from "@/data/products";

type CompareCategory = "vlonderplanken" | "schuttingen" | "accessoires";

interface ComparisonRow {
  label: string;
  tooltip?: string;
  values: Record<CompareCategory, string | boolean>;
}

const comparisonData: ComparisonRow[] = [
  { label: "Toepassing", values: { vlonderplanken: "Terras / vlonder", schuttingen: "Erfafscheiding / tuin", accessoires: "Montage & afwerking" } },
  { label: "Productlijnen", values: { vlonderplanken: "7 lijnen", schuttingen: "Classic & Premium", accessoires: "Onderbalken, clips, lijsten" } },
  { label: "Garantie", values: { vlonderplanken: "25 jaar", schuttingen: "25 jaar", accessoires: "25 jaar" } },
  { label: "Levensduur", values: { vlonderplanken: "25+ jaar", schuttingen: "25+ jaar", accessoires: "25+ jaar" } },
  { label: "Co-Extrusie beschermlaag", values: { vlonderplanken: true, schuttingen: true, accessoires: false } },
  { label: "Onderhoudsvrij", values: { vlonderplanken: true, schuttingen: true, accessoires: true } },
  { label: "UV-bestendig", values: { vlonderplanken: true, schuttingen: true, accessoires: true } },
  { label: "100% recycleerbaar", values: { vlonderplanken: true, schuttingen: true, accessoires: true } },
  { label: "Zelf te monteren", values: { vlonderplanken: true, schuttingen: true, accessoires: true } },
  { label: "Antislip (korund)", values: { vlonderplanken: "Elegance lijn", schuttingen: false, accessoires: false } },
  { label: "RENOLIT folie", values: { vlonderplanken: "Elegance lijn", schuttingen: false, accessoires: false } },
  { label: "Massieve variant", values: { vlonderplanken: "Classic, Premium, MAX", schuttingen: false, accessoires: false } },
  { label: "Holle kern variant", values: { vlonderplanken: "Komorowa", schuttingen: false, accessoires: false } },
  { label: "Dubbelzijdig profiel", values: { vlonderplanken: true, schuttingen: true, accessoires: false } },
  { label: "Houtnerf patroon", values: { vlonderplanken: "Premium lijn", schuttingen: "Premium lijn", accessoires: false } },
  { label: "Beschikbare kleuren", values: { vlonderplanken: "3-5 per lijn", schuttingen: "3 kleuren", accessoires: "Standaard" } },
  { label: "Breedste plank", values: { vlonderplanken: "185 mm (MAX)", schuttingen: "150 mm", accessoires: "n.v.t." } },
];

const categoryMeta: Record<CompareCategory, { name: string; tagline: string; slug: string }> = {
  vlonderplanken: { name: "Vlonderplanken", tagline: "Luxe terras zonder onderhoud", slug: "vlonderplanken" },
  schuttingen: { name: "Schuttingen", tagline: "Privacy & stijl voor je tuin", slug: "schuttingen" },
  accessoires: { name: "Accessoires", tagline: "Montage & afwerking", slug: "accessoires" },
};

const allCategories: CompareCategory[] = ["vlonderplanken", "schuttingen", "accessoires"];

const compareFaqs = [
  { q: "Welk composiet product is het goedkoopst?", a: "Alle prijzen zijn op aanvraag. De Slim en Eco vlonderplanken zijn de meest budget-vriendelijke opties, terwijl de Elegance lijn het premium segment bedient." },
  { q: "Welk composiet product gaat het langst mee?", a: "Al onze composiet producten hebben 25 jaar fabrieksgarantie. De Elegance lijn met RENOLIT folie en korund biedt de beste bescherming tegen slijtage." },
  { q: "Kan ik verschillende composiet producten combineren?", a: "Absoluut! Veel klanten combineren bijvoorbeeld vlonderplanken met een bijpassende schutting in dezelfde kleur voor een uniforme uitstraling." },
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
        title="Composiet Vergelijken | Schuttingvancomposiet.nl"
        description="Vergelijk composiet vlonderplanken, schuttingen en accessoires op eigenschappen en toepassingen. Vind het beste product voor jouw project."
        canonical="/vergelijken"
      />
      <Header />
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Vergelijken" },
      ]} />

      <main>
        <section className="container py-8 sm:py-12 md:py-20 px-4 sm:px-6">
          <div className="max-w-3xl mb-10">
            <span className="text-accent text-sm font-medium uppercase tracking-wider">Vergelijken</span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2">
              Welk composiet product past bij jou?
            </h1>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              Vergelijk onze drie productcategorieën op eigenschappen en toepassingen om de beste keuze te maken voor jouw project.
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
          <div className="rounded-xl border border-border overflow-x-auto bg-card -mx-4 sm:mx-0">
            <div className="grid border-b border-border min-w-[600px]" style={{ gridTemplateColumns: `160px repeat(${visibleCategories.length}, 1fr)` }}>
              <div className="p-4 bg-muted/50" />
              {visibleCategories.map((cat) => {
                const catData = categories.find((c) => c.slug === cat);
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
                className={`grid ${i % 2 === 0 ? "bg-card" : "bg-muted/30"} ${i < comparisonData.length - 1 ? "border-b border-border" : ""} min-w-[600px]`}
                style={{ gridTemplateColumns: `160px repeat(${visibleCategories.length}, 1fr)` }}
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
              className="grid border-t border-border bg-muted/50 min-w-[600px]"
              style={{ gridTemplateColumns: `160px repeat(${visibleCategories.length}, 1fr)` }}
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
            {allCategories.map((cat) => {
              const catData = categories.find((c) => c.slug === cat);
              const advice: Record<CompareCategory, { title: string; description: string }> = {
                vlonderplanken: { title: "Droomterras aanleggen?", description: "7 vlonderlijnen van budget Slim tot premium Elegance met RENOLIT folie. Splintervrij en 25 jaar garantie." },
                schuttingen: { title: "Privacy in de tuin?", description: "Classic en Premium schuttingplanken met dubbelzijdige afwerking. Eenvoudig te monteren in profielen." },
                accessoires: { title: "Montage & afwerking?", description: "Onderbalken, montagesets, afwerklijsten en verstelbare terrasdragers voor de perfecte installatie." },
              };
              return (
                <Link
                  key={cat}
                  to={`/categorie/${categoryMeta[cat].slug}`}
                  className="group rounded-xl overflow-hidden border border-border bg-card hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={catData?.image}
                      alt={advice[cat].title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="font-serif text-lg font-bold text-background leading-snug">{advice[cat].title}</h3>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{advice[cat].description}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:gap-2 transition-all mt-auto">
                      Bekijk {categoryMeta[cat].name.toLowerCase()} <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <FAQSection faqs={compareFaqs} />
        
      </main>

      <Footer />
    </div>
  );
};

export default ComparePage;
