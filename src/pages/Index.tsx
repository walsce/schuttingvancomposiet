import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import SEOHead from "@/components/SEOHead";
import JsonLd, { organizationSchema, websiteSchema } from "@/components/JsonLd";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import { categories, products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Truck, ThumbsUp, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-composite.jpg";

const usps = [
  { icon: Truck, title: "Snelle levering", desc: "Eigen bezorgservice door heel Nederland en België" },
  { icon: Shield, title: "15 jaar garantie", desc: "Op al onze composiet producten" },
  { icon: ThumbsUp, title: "Premium kwaliteit", desc: "Co-Extrusie beschermlaag voor maximale duurzaamheid" },
  { icon: Wrench, title: "Zelf te monteren", desc: "Eenvoudige doe-het-zelf montage met duidelijke handleiding" },
];

const faqs = [
  { q: "Hoe lang gaat composiet mee?", a: "Onze composiet producten gaan gemiddeld 20-25 jaar mee zonder noemenswaardig onderhoud. Ze zijn bestand tegen alle weersomstandigheden." },
  { q: "Is composiet duurder dan hout?", a: "De initiële investering is iets hoger, maar doordat composiet onderhoudsvrij is en veel langer meegaat, bespaar je op lange termijn aanzienlijk." },
  { q: "Kan ik composiet zelf monteren?", a: "Zeker! Al onze producten worden geleverd met duidelijke montage-instructies. Met standaard gereedschap kun je alles zelf installeren." },
  { q: "Wat zijn de voordelen van Co-Extrusie?", a: "De Co-Extrusie beschermlaag voorkomt wateropname en beschermt extra tegen UV-straling. Hierdoor gaat je composiet langer mee en behoudt het zijn kleur." },
];

const featuredProducts = [
  ...products.filter(p => p.category === 'gevelbekleding').slice(0, 2),
  ...products.filter(p => p.category === 'schuttingen').slice(0, 2),
  ...products.filter(p => p.category === 'vlonderplanken').slice(0, 2),
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Schuttingvancomposiet.nl | Premium Composiet voor Tuin & Gevel"
        description="Dé specialist in composiet gevelbekleding, schuttingen en vlonderplanken. Premium kwaliteit, 15 jaar garantie, eigen bezorgservice door heel Nederland."
        canonical="/"
      />
      <JsonLd data={[organizationSchema, websiteSchema]} />
      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroImage} alt="Composiet tuin met vlonderplanken en gevelbekleding" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
          </div>
          <div className="container relative py-24 md:py-36">
            <div className="max-w-xl">
              <span className="inline-block text-accent font-medium text-sm uppercase tracking-wider mb-4">
                Schuttingvancomposiet.nl
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-card leading-tight">
                Dé specialist in composiet producten
              </h1>
              <p className="text-card/80 text-lg mt-4 leading-relaxed">
                Premium composiet voor tuin en gevel. Onderhoudsvrij, duurzaam en altijd de scherpste prijzen van Nederland.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
                  <Link to="/assortiment">
                    Bekijk Assortiment <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-card text-card bg-card/10 hover:bg-card/20 backdrop-blur-sm">
                  <Link to="/contact">Gratis Offerte</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* USPs */}
        <section className="border-b border-border bg-card">
          <div className="container py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {usps.map((usp) => (
                <div key={usp.title} className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                    <usp.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-foreground">{usp.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{usp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="container py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Ons Assortiment</h2>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
              Ontdek onze complete collectie composiet producten voor tuin en gevel
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} {...cat} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link to="/vergelijken">Vergelijk alle categorieën <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>
        </section>

        {/* Featured products */}
        <section className="bg-secondary/50">
          <div className="container py-16 md:py-24">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="font-serif text-3xl font-bold text-foreground">Populaire producten</h2>
                <p className="text-muted-foreground mt-2">Onze meest gekozen composiet producten</p>
              </div>
              <Button asChild variant="ghost" className="hidden sm:flex text-primary">
                <Link to="/assortiment">Alle producten <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {featuredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>

        {/* Why composiet */}
        <section className="container py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                Waarom kiezen voor composiet?
              </h2>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                Composiet combineert de warme uitstraling van hout met de duurzaamheid van moderne materialen.
                Geen jaarlijks onderhoud, geen rotten of splinteren.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Minimaal onderhoud — afnemen met water is voldoende",
                  "UV-bestendig — behoudt jarenlang zijn kleur",
                  "Weerbestendig — geen rot, splinters of scheuren",
                  "Milieuvriendelijk — deels gemaakt van gerecyclede materialen",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <span className="text-primary mt-0.5">✓</span>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3 mt-8">
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <Link to="/assortiment">Ontdek het assortiment</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/blog/composiet-vs-hout-vergelijking">Composiet vs. hout lezen</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden">
              <img
                src="https://www.mthekwerken.nl/wp-content/uploads/Highlander-Credits-Sven-Scholten-LR-23.JPG-website-1110x840.jpg"
                alt="Composiet schutting in tuin omgeving met moderne uitstraling"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Blog teaser */}
        <section className="bg-card border-y border-border">
          <div className="container py-16">
            <div className="text-center mb-8">
              <h2 className="font-serif text-3xl font-bold text-foreground">Kenniscentrum & Blog</h2>
              <p className="text-muted-foreground mt-2">Koopgidsen, installatietips en inspiratie</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="outline">
                <Link to="/blog">Bekijk alle artikelen <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
              <Button asChild variant="ghost">
                <Link to="/blog/composiet-vlonderplanken-kiezen">Koopgids vlonderplanken</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link to="/blog/gevelbekleding-installeren-stap-voor-stap">Installatiehandleiding</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FAQSection faqs={faqs} />

        {/* CTA */}
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
