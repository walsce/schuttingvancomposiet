import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import { categories, products } from "@/data/products";

const AssortimentPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="container py-12 md:py-20">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">Ons Assortiment</h1>
        <p className="text-muted-foreground mb-10 max-w-lg">
          Ontdek onze complete collectie premium composiet producten
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} {...cat} />
          ))}
        </div>

        <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Alle Producten</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AssortimentPage;
