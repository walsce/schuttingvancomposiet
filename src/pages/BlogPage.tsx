import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogArticles, categoryLabels, BlogArticle } from "@/data/blogArticles";
import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const categoryColors: Record<BlogArticle["category"], string> = {
  koopgids: "bg-primary text-primary-foreground",
  installatie: "bg-accent text-accent-foreground",
  onderhoud: "bg-secondary text-secondary-foreground",
  inspiratie: "bg-foreground text-background",
};

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState<BlogArticle["category"] | "all">("all");

  const filtered = activeCategory === "all"
    ? blogArticles
    : blogArticles.filter((a) => a.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-primary">
        <div className="container py-16 md:py-20">
          <span className="text-primary-foreground/70 text-sm uppercase tracking-wider font-medium">
            Kenniscentrum
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mt-2">
            Blog & Advies
          </h1>
          <p className="text-primary-foreground/80 mt-4 max-w-lg text-lg">
            Koopgidsen, installatietips en inspiratie voor jouw composiet project.
          </p>
        </div>
      </section>

      {/* Filters */}
      <div className="border-b border-border bg-card">
        <div className="container py-4 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === "all"
                ? "bg-foreground text-background"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            Alles
          </button>
          {(Object.keys(categoryLabels) as BlogArticle["category"][]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-foreground text-background"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* Articles grid */}
      <section className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article) => (
            <Link
              key={article.slug}
              to={`/blog/${article.slug}`}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className={`${categoryColors[article.category]} text-xs`}>
                    {categoryLabels[article.category]}
                  </Badge>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {article.readTime} min
                  </span>
                </div>
                <h2 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                  {article.title}
                </h2>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {article.excerpt}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-4">
                  Lees meer <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;
