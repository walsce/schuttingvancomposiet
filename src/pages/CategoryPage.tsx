import { useParams } from "react-router-dom";
import { useCallback, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { products, categories, Product } from "@/data/products";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const categoryFaqs: Record<string, { q: string; a: string }[]> = {
  gevelbekleding: [
    { q: "Wat kost composiet gevelbekleding per m²?", a: "Composiet gevelbekleding kost gemiddeld €40,95 per m². De exacte prijs hangt af van het gekozen profiel en de kleur." },
    { q: "Hoe lang gaat composiet gevelbekleding mee?", a: "Met de Co-Extrusie beschermlaag gaat onze gevelbekleding 25+ jaar mee zonder noemenswaardig onderhoud." },
    { q: "Kan ik composiet gevelbekleding zelf monteren?", a: "Ja, met een aluminium regelwerk en de meegeleverde clips kunt u de gevelbekleding zelf monteren. Bekijk onze installatiehandleiding voor een stap-voor-stap uitleg." },
  ],
  schuttingen: [
    { q: "Wat zit er bij een composiet schuttingpakket?", a: "Een pakket bevat alle composiet planken en U-profielen voor één scherm. Aluminium palen zijn apart verkrijgbaar." },
    { q: "Hoe hoog zijn de composiet schuttingen?", a: "Onze schuttingen zijn verkrijgbaar in 180 cm en 200 cm hoogte, met een standaard breedte van 180 cm." },
    { q: "Zijn composiet schuttingen stormbestendig?", a: "Ja, mits correct gemonteerd op aluminium palen met een stevige fundering van betonpoeren of grondankers." },
  ],
  vlonderplanken: [
    { q: "Wat is het verschil tussen massieve en holle vlonderplanken?", a: "Massieve planken zijn steviger en voelen meer als echt hout. Holle profielen zijn lichter en voordeliger." },
    { q: "Zijn composiet vlonderplanken glad bij regen?", a: "Onze vlonderplanken met antislip coating bieden extra grip, ook bij nat weer. Ideaal voor terrassen bij het zwembad." },
    { q: "Hoeveel vlonderplanken heb ik nodig?", a: "Bereken uw oppervlakte in m² en tel 10% extra op voor zaagverlies. Neem contact op voor een gratis berekening." },
  ],
};

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = categories.find((c) => c.slug === slug);
  const categoryProducts = useMemo(() => products.filter((p) => p.category === slug), [slug]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(categoryProducts);

  const handleFiltered = useCallback((result: Product[]) => {
    setFilteredProducts(result);
  }, []);

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-24 text-center">
          <h1 className="font-serif text-3xl font-bold text-foreground">Categorie niet gevonden</h1>
        </div>
        <Footer />
      </div>
    );
  }

  const faqs = categoryFaqs[slug || ""] || [];
  const otherCategories = categories.filter((c) => c.slug !== slug);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${category.name} Kopen | Composietwinkel.nl`}
        description={`${category.description} Bekijk ons complete assortiment ${category.name.toLowerCase()} met 15 jaar garantie.`}
        canonical={`/categorie/${slug}`}
      />
      <Header />
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: category.name },
      ]} />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img src={category.image} alt={`${category.name} composiet producten`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-foreground/20" />
          </div>
          <div className="container relative py-20 md:py-28">
            <span className="text-accent text-sm font-medium uppercase tracking-wider">Composietwinkel.nl</span>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-card mt-2">{category.name}</h1>
            <p className="text-card/80 mt-3 max-w-lg">{category.description}</p>
          </div>
        </section>

        {/* Products grid */}
        <section className="container py-12 md:py-20">
          <ProductFilters products={categoryProducts} onFiltered={handleFiltered} />

          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              {filteredProducts.length} van {categoryProducts.length} producten
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">Geen producten gevonden met deze filters.</p>
              <p className="text-sm text-muted-foreground mt-1">Probeer andere filtercombinaties.</p>
            </div>
          )}
        </section>

        {/* Related categories */}
        <section className="bg-card border-y border-border">
          <div className="container py-12">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Bekijk ook</h2>
            <div className="flex flex-wrap gap-3">
              {otherCategories.map((cat) => (
                <Button key={cat.id} asChild variant="outline">
                  <Link to={`/categorie/${cat.slug}`}>{cat.name} <ArrowRight className="w-4 h-4 ml-1" /></Link>
                </Button>
              ))}
              <Button asChild variant="outline">
                <Link to="/vergelijken">Vergelijk categorieën</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/blog">Blog & Advies</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        {faqs.length > 0 && <FAQSection faqs={faqs} />}

        {/* CTA */}
        <CTASection
          title={`${category.name} nodig?`}
          description="Vraag een gratis offerte aan en ontvang persoonlijk advies over de beste keuze voor jouw project."
        />
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
