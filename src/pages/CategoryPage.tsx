import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = categories.find((c) => c.slug === slug);
  const categoryProducts = products.filter((p) => p.category === slug);

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

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
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
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-muted-foreground">{categoryProducts.length} producten</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categoryProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CategoryPage;
