import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { products, categories } from "@/data/products";
import { blogArticles } from "@/data/blogArticles";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd, { productSchema, faqSchema } from "@/components/JsonLd";
import CTASection from "@/components/CTASection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Truck, Shield, CheckCircle, ChevronLeft, ChevronRight, ArrowRight, Info, ShieldCheck, Award, Clock, Package, MessageCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "februari 2026";
  const d = new Date(dateStr);
  return d.toLocaleDateString("nl-NL", { month: "long", year: "numeric" });
};

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find((p) => p.slug === slug);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Product niet gevonden</h1>
            <Link to="/assortiment" className="text-primary hover:underline">
              Terug naar assortiment
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const category = categories.find((c) => c.id === product.category);
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const relatedArticles = blogArticles
    .filter((a) => a.relatedProducts.includes(product.slug))
    .slice(0, 3);

  const allImages = product.images.length > 0 ? product.images : [product.image];
  const nextImage = () => setSelectedImage((i) => (i + 1) % allImages.length);
  const prevImage = () => setSelectedImage((i) => (i - 1 + allImages.length) % allImages.length);

  const jsonLdData: Record<string, unknown>[] = [
    productSchema(product),
  ];
  if (product.faq && product.faq.length > 0) {
    jsonLdData.push(faqSchema(product.faq.map(f => ({ q: f.question, a: f.answer }))));
  }

  const keySpecs = Object.entries(product.specifications).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title={product.seoTitle}
        description={product.seoDescription}
        canonical={`/product/${product.slug}`}
        ogImage={product.image}
      />
      <JsonLd data={jsonLdData} />
      <Header />
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: category?.name || "", href: `/categorie/${product.category}` },
        { label: product.name },
      ]} />

      <main className="flex-1">
        {/* Product Hero */}
        <section className="max-w-6xl mx-auto px-4 py-8 pb-12">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div className="space-y-3">
              <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
                <img
                  src={allImages[selectedImage]}
                  alt={`${product.name} - ${category?.name || "composiet"} product afbeelding`}
                  className="w-full h-full object-contain p-4"
                />
                {allImages.length > 1 && (
                  <>
                    <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm rounded-full p-2 hover:bg-card transition-colors" aria-label="Vorige afbeelding">
                      <ChevronLeft className="h-5 w-5 text-foreground" />
                    </button>
                    <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm rounded-full p-2 hover:bg-card transition-colors" aria-label="Volgende afbeelding">
                      <ChevronRight className="h-5 w-5 text-foreground" />
                    </button>
                  </>
                )}
              </div>
              {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {allImages.map((img, i) => (
                    <button key={i} onClick={() => setSelectedImage(i)} className={`flex-shrink-0 w-24 h-24 rounded-md overflow-hidden border-2 transition-colors bg-muted ${i === selectedImage ? "border-primary" : "border-border"}`}>
                      <img src={img} alt="" className="w-full h-full object-contain p-1" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">{product.name}</h1>
                <p className="text-3xl font-bold text-primary">{product.priceLabel}</p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Truck className="h-4 w-4 text-primary" />
                  <span>{product.deliveryTime}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>{product.guarantee}</span>
                </div>
              </div>

              {product.highlights.length > 0 && (
                <ul className="space-y-1.5">
                  {product.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-foreground">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              {product.options && product.options.length > 0 && (
                <div className="space-y-3">
                  {product.options.map((opt) => (
                    <div key={opt.label}>
                      <p className="text-sm font-semibold text-foreground mb-1.5">{opt.label}</p>
                      <div className="flex flex-wrap gap-2">
                        {opt.values.map((v) => (
                          <Badge key={v} variant="outline" className="text-sm py-1 px-3">{v}</Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button asChild size="lg" className="flex-1">
                  <Link to={`/contact?type=offerte&product=${product.slug}`}>Offerte Aanvragen</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="flex-1">
                  <Link to={`/contact?type=sample&product=${product.slug}`}>
                    <span className="flex items-center gap-2">
                      Sample Aanvragen
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0">Gratis</Badge>
                    </span>
                  </Link>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Ontvang een gratis sample om de kleur en kwaliteit thuis te ervaren
              </p>
            </div>
          </div>
        </section>

        {/* "In het kort" Summary Box */}
        <section className="max-w-6xl mx-auto px-4 pb-6">
          <div className="bg-secondary/50 border border-border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Info className="h-5 w-5 text-primary" />
              <h2 className="font-serif text-lg font-bold text-foreground">In het kort</h2>
            </div>
            <p className="text-sm text-foreground leading-relaxed mb-4">{product.description}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {keySpecs.map(([key, value]) => (
                <div key={key} className="bg-card rounded-lg p-3 border border-border">
                  <dt className="text-xs text-muted-foreground">{key}</dt>
                  <dd className="text-sm font-semibold text-foreground">{value}</dd>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* E-E-A-T Trust Bar */}
        <section className="max-w-6xl mx-auto px-4 pb-8">
          <div className="flex flex-wrap gap-4 sm:gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Award className="h-4 w-4 text-primary" />
              <span>Beoordeeld door composiet specialist</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>15+ jaar ervaring in composiet</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-primary" />
              <span>Bijgewerkt: {formatDate(product.updatedDate)}</span>
            </div>
          </div>
        </section>

        {/* Description - always visible for SEO */}
        <section className="max-w-6xl mx-auto px-4 pb-12">
          <div className="border-l-4 border-primary/30 pl-6 lg:pl-8">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Omschrijving</h2>
            <article className="prose prose-base max-w-3xl text-foreground prose-headings:text-foreground prose-h2:text-2xl prose-h2:font-serif prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-b prose-h2:border-border prose-h2:pb-3 prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3 prose-strong:text-foreground prose-li:text-foreground prose-p:leading-relaxed prose-p:mb-4 prose-li:leading-relaxed">
              <ReactMarkdown>{product.longDescription}</ReactMarkdown>
            </article>
          </div>
        </section>

        {/* Specifications - always visible for SEO */}
        <section className="max-w-6xl mx-auto px-4 pb-12">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Technische specificaties</h2>
          <div className="bg-card rounded-lg border border-border overflow-hidden max-w-3xl">
            <Table>
              <TableBody>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell className="font-medium text-muted-foreground w-1/3">{key}</TableCell>
                    <TableCell className="text-foreground">{value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Waarom Schuttingvancomposiet.nl? Trust Block */}
        <section className="max-w-6xl mx-auto px-4 pb-12">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
            <h2 className="font-serif text-xl font-bold text-foreground mb-4">Waarom Schuttingvancomposiet.nl?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground">Eigen bezorgservice door heel Nederland</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground">15 jaar productgarantie</span>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground">Persoonlijk advies van specialisten</span>
              </div>
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground">Gratis sample beschikbaar</span>
              </div>
            </div>
          </div>
        </section>

        {/* On-page FAQ Section */}
        {product.faq && product.faq.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 pb-16">
            <h2 className="font-serif text-xl font-bold text-foreground mb-6">Veelgestelde vragen over {product.name}</h2>
            <Accordion type="single" collapsible className="w-full">
              {product.faq.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-sm">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        )}

        {/* Internal links */}
        <section className="max-w-6xl mx-auto px-4 pb-12">
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline" size="sm">
              <Link to="/vergelijken">Vergelijk categorieën</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/blog">Blog & Advies</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to={`/categorie/${product.category}`}>Meer {category?.name}</Link>
            </Button>
          </div>
        </section>

        {/* Video */}
        {product.videoUrl && (
          <section className="max-w-6xl mx-auto px-4 pb-16">
            <h2 className="text-xl font-bold text-foreground mb-4">Montage video</h2>
            <div className="aspect-video rounded-lg overflow-hidden bg-muted">
              <iframe
                src={product.videoUrl.replace("watch?v=", "embed/")}
                title={`${product.name} montage video`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>
        )}

        {/* Related Blog Articles */}
        {relatedArticles.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 pb-12">
            <h2 className="text-xl font-bold text-foreground mb-4">Gerelateerde artikelen</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedArticles.map((a) => (
                <Link key={a.slug} to={`/blog/${a.slug}`} className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={a.image} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">{a.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{a.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 pb-16">
            <h2 className="text-xl font-bold text-foreground mb-6">Gerelateerde producten</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
