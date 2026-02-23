import { useParams } from "react-router-dom";
import { useCallback, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";

import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { products, categories, Product } from "@/data/products";
import { blogArticles } from "@/data/blogArticles";
import { downloads } from "@/data/downloads";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Download } from "lucide-react";

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

  const faqs = category.faq || [];
  const otherCategories = categories.filter((c) => c.slug !== slug);

  const relatedDownloads = downloads.filter(
    (d) => d.relatedCategory === slug && d.pdfPath
  );

  // Resolve related blog articles from category data
  const relatedBlogs = blogArticles.filter((a) => a.relatedCategories.includes(slug || '')).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={category.seoTitle || `${category.name} Kopen | Schuttingvancomposiet.nl`}
        description={category.seoDescription || `${category.description} Bekijk ons complete assortiment ${category.name.toLowerCase()} met 15 jaar garantie.`}
        canonical={`/categorie/${slug}`}
      />
      <Header />
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: category.name },
      ]} />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden hero-landscape">
          <div className="absolute inset-0">
            <img src={category.image} alt={`${category.name} composiet producten`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-foreground/20" />
          </div>
          <div className="container relative py-14 sm:py-20 md:py-28 px-4 sm:px-6">
            <span className="text-accent text-xs sm:text-sm font-medium uppercase tracking-wider">Schuttingvancomposiet.nl</span>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-5xl font-bold text-card mt-2">{category.name}</h1>
            <p className="text-card/80 mt-2 sm:mt-3 max-w-lg text-sm sm:text-base">{category.description}</p>
          </div>
        </section>

        {/* Products grid */}
        <section className="container py-8 sm:py-12 md:py-20 px-4 sm:px-6">
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

        {/* Related blog articles */}
        {relatedBlogs.length > 0 && (
          <section className="bg-secondary/50">
            <div className="container py-12">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Gerelateerde artikelen</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedBlogs.map((blog) => blog && (
                  <Link
                    key={blog.slug}
                    to={`/blog/${blog.slug}`}
                    className="group flex gap-4 bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">{blog.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{blog.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Downloads & Handleidingen */}
        {relatedDownloads.length > 0 && (
          <section className="bg-secondary/30 border-y border-border">
            <div className="container py-12">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Downloads & Handleidingen
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Gratis montagehandleidingen en documentatie voor {category.name.toLowerCase()}.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {relatedDownloads.map((dl) => (
                  <a
                    key={dl.id}
                    href={dl.pdfPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3 p-4 bg-card border border-border rounded-xl hover:shadow-md hover:border-primary/30 transition-all"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Download className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                        {dl.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">PDF — Gratis download</p>
                    </div>
                  </a>
                ))}
              </div>
              <div className="mt-4">
                <Button asChild variant="outline" size="sm">
                  <Link to="/downloads">Alle downloads bekijken <ArrowRight className="w-4 h-4 ml-1" /></Link>
                </Button>
              </div>
            </div>
          </section>
        )}

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
        {faqs.length > 0 && <FAQSection faqs={faqs.map(f => ({ q: f.question, a: f.answer }))} />}

        {/* Sample CTA */}
        <section className="bg-secondary/30 border-y border-border">
          <div className="container py-10 text-center">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-2">Sample aanvragen?</h2>
            <p className="text-muted-foreground mb-4 max-w-lg mx-auto">
              Ontvang een gratis sample om de kleur en kwaliteit van onze {category.name.toLowerCase()} thuis te ervaren.
            </p>
            <Button asChild>
              <Link to={`/contact?type=sample&product=${categoryProducts[0]?.slug || ''}`}>
                Gratis sample aanvragen
              </Link>
            </Button>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
