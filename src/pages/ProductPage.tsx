import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { products, categories } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
import { Truck, Shield, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";

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

  const allImages = product.images.length > 0 ? product.images : [product.image];

  const nextImage = () => setSelectedImage((i) => (i + 1) % allImages.length);
  const prevImage = () => setSelectedImage((i) => (i - 1 + allImages.length) % allImages.length);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={`/categorie/${product.category}`}>{category?.name}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{product.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Product Hero */}
        <section className="max-w-6xl mx-auto px-4 pb-12">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div className="space-y-3">
              <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
                <img
                  src={allImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-contain p-4"
                />
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm rounded-full p-2 hover:bg-card transition-colors"
                      aria-label="Vorige afbeelding"
                    >
                      <ChevronLeft className="h-5 w-5 text-foreground" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm rounded-full p-2 hover:bg-card transition-colors"
                      aria-label="Volgende afbeelding"
                    >
                      <ChevronRight className="h-5 w-5 text-foreground" />
                    </button>
                  </>
                )}
              </div>
              {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                        i === selectedImage ? "border-primary" : "border-border"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                  {product.name}
                </h1>
                <p className="text-3xl font-bold text-primary">{product.priceLabel}</p>
              </div>

              {/* Delivery & Guarantee */}
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

              {/* Highlights */}
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

              {/* Options */}
              {product.options && product.options.length > 0 && (
                <div className="space-y-3">
                  {product.options.map((opt) => (
                    <div key={opt.label}>
                      <p className="text-sm font-semibold text-foreground mb-1.5">{opt.label}</p>
                      <div className="flex flex-wrap gap-2">
                        {opt.values.map((v) => (
                          <Badge key={v} variant="outline" className="text-sm py-1 px-3">
                            {v}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button asChild size="lg" className="flex-1">
                  <Link to="/contact">Offerte Aanvragen</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="flex-1">
                  <Link to="/contact">Sample Aanvragen</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs: Description / Specs / FAQ */}
        <section className="max-w-6xl mx-auto px-4 pb-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 gap-0">
              <TabsTrigger
                value="description"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3"
              >
                Omschrijving
              </TabsTrigger>
              <TabsTrigger
                value="specs"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3"
              >
                Specificaties
              </TabsTrigger>
              {product.faq && product.faq.length > 0 && (
                <TabsTrigger
                  value="faq"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3"
                >
                  Veelgestelde vragen
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="description" className="pt-6">
              <div className="prose prose-sm max-w-none text-foreground">
                <p className="text-base leading-relaxed">{product.description}</p>
              </div>
            </TabsContent>

            <TabsContent value="specs" className="pt-6">
              <div className="bg-card rounded-lg border border-border overflow-hidden">
                <Table>
                  <TableBody>
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <TableRow key={key}>
                        <TableCell className="font-medium text-muted-foreground w-1/3">
                          {key}
                        </TableCell>
                        <TableCell className="text-foreground">{value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {product.faq && product.faq.length > 0 && (
              <TabsContent value="faq" className="pt-6">
                <Accordion type="single" collapsible className="w-full">
                  {product.faq.map((item, i) => (
                    <AccordionItem key={i} value={`faq-${i}`}>
                      <AccordionTrigger className="text-left">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            )}
          </Tabs>
        </section>

        {/* Video */}
        {product.videoUrl && (
          <section className="max-w-6xl mx-auto px-4 pb-16">
            <h2 className="text-xl font-bold text-foreground mb-4">Montage video</h2>
            <div className="aspect-video rounded-lg overflow-hidden bg-muted">
              <iframe
                src={product.videoUrl.replace("watch?v=", "embed/")}
                title="Montage video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
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
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
