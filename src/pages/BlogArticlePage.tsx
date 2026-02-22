import { useParams, Link, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd, { articleSchema, howToSchema, faqSchema } from "@/components/JsonLd";
import { blogArticles, categoryLabels } from "@/data/blogArticles";
import { products, categories } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";

const BlogArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = blogArticles.find((a) => a.slug === slug);

  if (!article) return <Navigate to="/blog" replace />;

  const related = blogArticles.filter((a) => a.slug !== slug).slice(0, 3);

  // Build JSON-LD based on schemaType
  const jsonLdData: Record<string, unknown>[] = [articleSchema(article)];
  if (article.schemaType === "HowTo") {
    jsonLdData.push(howToSchema(article));
  }

  // Resolve related products and categories from data
  const relatedProductData = article.relatedProducts
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean);
  const relatedCategoryData = article.relatedCategories
    .map((slug) => categories.find((c) => c.slug === slug))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${article.title} | Composiethekwerk.nl`}
        description={article.excerpt.slice(0, 155)}
        canonical={`/blog/${article.slug}`}
        ogImage={article.image}
        ogType="article"
      />
      <JsonLd data={jsonLdData} />
      <Header />
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Blog", href: "/blog" },
        { label: article.title },
      ]} />

      <main>
        {/* Article header */}
        <section className="container py-10 md:py-14">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <Badge variant="secondary">{categoryLabels[article.category]}</Badge>
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime} min leestijd
              </span>
              <span className="text-sm text-muted-foreground">
                {new Date(article.date).toLocaleDateString("nl-NL", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              {article.title}
            </h1>
            <p className="text-lg text-muted-foreground mt-4">{article.excerpt}</p>
            <div className="flex items-center gap-2 mt-4">
              <User className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                Door <strong className="text-foreground">{article.author.name}</strong>
                <span className="text-muted-foreground"> — {article.author.role}</span>
              </span>
            </div>
          </div>
        </section>

        {/* Hero image */}
        <div className="container max-w-4xl mb-12">
          <div className="rounded-xl overflow-hidden aspect-[2/1]">
            <img
              src={article.image}
              alt={`${article.title} - composiet ${categoryLabels[article.category].toLowerCase()}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <article className="container max-w-3xl pb-16">
          <div className="prose prose-lg max-w-none
            prose-headings:font-serif prose-headings:text-foreground
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-li:text-muted-foreground
            prose-strong:text-foreground
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-table:border-border prose-th:bg-secondary prose-th:text-foreground
            prose-td:border-border prose-th:border-border
            prose-td:text-muted-foreground prose-td:py-2 prose-td:px-3
            prose-th:py-2 prose-th:px-3
          ">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>

          {/* Auto-generated internal links from data */}
          <div className="mt-8 space-y-4">
            {relatedProductData.length > 0 && (
              <div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">Gerelateerde producten</h3>
                <div className="flex flex-wrap gap-2">
                  {relatedProductData.map((p) => p && (
                    <Button key={p.slug} asChild variant="outline" size="sm">
                      <Link to={`/product/${p.slug}`}>{p.name}</Link>
                    </Button>
                  ))}
                </div>
              </div>
            )}
            {relatedCategoryData.length > 0 && (
              <div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">Bekijk categorieën</h3>
                <div className="flex flex-wrap gap-2">
                  {relatedCategoryData.map((c) => c && (
                    <Button key={c.slug} asChild variant="outline" size="sm">
                      <Link to={`/categorie/${c.slug}`}>{c.name} <ArrowRight className="w-3.5 h-3.5 ml-1" /></Link>
                    </Button>
                  ))}
                </div>
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline" size="sm">
                <Link to="/vergelijken">Vergelijk producten</Link>
              </Button>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 bg-primary rounded-xl p-8 text-center">
            <h3 className="font-serif text-2xl font-bold text-primary-foreground">
              Klaar om te beginnen?
            </h3>
            <p className="text-primary-foreground/80 mt-2">
              Vraag een gratis offerte aan of bekijk ons assortiment.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mt-6">
              <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link to="/contact">Gratis Offerte</Link>
              </Button>
              <Button asChild variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/assortiment">Bekijk Assortiment</Link>
              </Button>
            </div>
          </div>
        </article>

        {/* Related articles */}
        <section className="bg-secondary/50">
          <div className="container py-14">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-8">Meer artikelen</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((a) => (
                <Link
                  key={a.slug}
                  to={`/blog/${a.slug}`}
                  className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={a.image}
                      alt={`${a.title} - composiet artikel`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <Badge variant="secondary" className="text-xs mb-2">
                      {categoryLabels[a.category]}
                    </Badge>
                    <h3 className="font-serif text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {a.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogArticlePage;
