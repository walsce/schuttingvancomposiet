import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTASection from "@/components/CTASection";
import { categories, products } from "@/data/products";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const AssortimentPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Composiet Assortiment | Alle Producten | Composiethekwerk.nl"
        description="Bekijk ons complete assortiment composiet gevelbekleding, schuttingen en vlonderplanken. Premium kwaliteit met 15 jaar garantie."
        canonical="/assortiment"
      />
      <Header />
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Assortiment" },
      ]} />

      <main>
        <section className="container py-12 md:py-20">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">Ons Assortiment</h1>
          <p className="text-muted-foreground mb-10 max-w-lg">
            Ontdek onze complete collectie premium composiet producten voor tuin en gevel. Alle producten worden geleverd met 15 jaar garantie en eigen bezorgservice.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} {...cat} />
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mb-10">
            <Button asChild variant="outline">
              <Link to="/vergelijken">Vergelijk categorieën <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/blog">Blog & Advies</Link>
            </Button>
          </div>

          <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Alle Producten</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default AssortimentPage;
