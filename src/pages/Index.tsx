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

const featuredSlugs = [
  'atmosphere-175-wit-ceruse',
  'open-rhombus-antraciet-grijs',
  'atmosphere-schutting-antraciet-grijs',
  'aluminium-schutting-zwart',
  'nuances-ipe-vlonderplank',
  'atmosphere-ushuaia-grijs-vlonderplank',
];
const featuredProducts = featuredSlugs
  .map(slug => products.find(p => p.slug === slug))
  .filter(Boolean) as typeof products;

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SEOHead
        title="Schuttingvancomposiet.nl | Premium Composiet voor Tuin & Gevel"
        description="Dé specialist in composiet gevelbekleding, schuttingen en vlonderplanken. Premium kwaliteit, 15 jaar garantie, eigen bezorgservice door heel Nederland."
        canonical="/"
      />
      <JsonLd data={[organizationSchema, websiteSchema]} />
      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden min-h-[70vh] sm:min-h-[80vh] flex items-center">
          {/* Video background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <img
              src={heroImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <video
              src="/videos/hero-silvadec.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/60 to-foreground/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
          </div>
          <div className="container relative py-20 sm:py-28 md:py-40 px-4 sm:px-6">
            <div className="max-w-xl">
              <span className="inline-block text-accent font-medium text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">
                Schuttingvancomposiet.nl
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-card leading-tight">
                Dé specialist in composiet producten
              </h1>
              <p className="text-card/80 text-base sm:text-lg mt-3 sm:mt-4 leading-relaxed">
                Premium composiet voor tuin en gevel. Onderhoudsvrij, duurzaam en altijd de scherpste prijzen van Nederland.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold w-full sm:w-auto">
                  <Link to="/assortiment">
                    Bekijk Assortiment <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-card text-card bg-card/10 hover:bg-card/20 backdrop-blur-sm w-full sm:w-auto">
                  <Link to="/contact">Gratis Offerte</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* USPs */}
        <section className="border-b border-border bg-card">
          <div className="container py-6 sm:py-10 px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {usps.map((usp) => (
                <div key={usp.title} className="flex items-start gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg shrink-0">
                    <usp.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xs sm:text-sm text-foreground">{usp.title}</h3>
                    <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 leading-snug">{usp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="container py-12 sm:py-16 md:py-24 px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Ons Assortiment</h2>
            <p className="text-muted-foreground mt-2 sm:mt-3 max-w-lg mx-auto text-sm sm:text-base">
              Ontdek onze complete collectie composiet producten voor tuin en gevel
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} {...cat} />
            ))}
          </div>
          <div className="text-center mt-6 sm:mt-8">
            <Button asChild variant="outline">
              <Link to="/vergelijken">Vergelijk alle categorieën <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>
        </section>

        {/* Featured products */}
        <section className="bg-secondary/50">
          <div className="container py-12 sm:py-16 md:py-24 px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-10 gap-2">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">Populaire producten</h2>
                <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">Onze meest gekozen composiet producten</p>
              </div>
              <Button asChild variant="ghost" className="hidden sm:flex text-primary">
                <Link to="/assortiment">Alle producten <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {featuredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            <div className="text-center mt-6 sm:hidden">
              <Button asChild variant="ghost" className="text-primary">
                <Link to="/assortiment">Alle producten <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Why composiet */}
        <section className="container py-12 sm:py-16 md:py-24 px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                Waarom kiezen voor composiet?
              </h2>
              <p className="text-muted-foreground mt-3 sm:mt-4 leading-relaxed text-sm sm:text-base">
                Composiet combineert de warme uitstraling van hout met de duurzaamheid van moderne materialen.
                Geen jaarlijks onderhoud, geen rotten of splinteren.
              </p>
              <ul className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
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
              <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8">
                <Button asChild className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                  <Link to="/assortiment">Ontdek het assortiment</Link>
                </Button>
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <Link to="/blog/composiet-vs-hout-vergelijking">Composiet vs. hout lezen</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden">
              <img
                src="https://en.silvadec.com/sites/default/files/styles/square/public/2024-02/silvadec_atmosphere_B0040_13.jpg?itok=v_iEy2r1"
                alt="Composiet schutting in tuin omgeving met moderne uitstraling"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Blog teaser */}
        <section className="bg-card border-y border-border">
          <div className="container py-10 sm:py-16 px-4 sm:px-6">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">Kenniscentrum & Blog</h2>
              <p className="text-muted-foreground mt-2 text-sm sm:text-base">Koopgidsen, installatietips en inspiratie</p>
            </div>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link to="/blog">Bekijk alle artikelen <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
              <Button asChild variant="ghost" className="w-full sm:w-auto">
                <Link to="/blog/composiet-vlonderplanken-kiezen">Koopgids vlonderplanken</Link>
              </Button>
              <Button asChild variant="ghost" className="w-full sm:w-auto">
                <Link to="/blog/gevelbekleding-installeren-stap-voor-stap">Installatiehandleiding</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Gratis Ontwerp Tools */}
        <section className="bg-accent/10 border-b border-border">
          <div className="container py-10 sm:py-16 px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-10">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                Gratis Ontwerp Tools
              </h2>
              <p className="text-muted-foreground mt-2 max-w-lg mx-auto text-sm sm:text-base">
                Ontwerp uw tuin online en ontvang direct een materiaallijst
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
              {/* Deck planner card */}
              <div className="bg-card border border-border rounded-xl p-6 sm:p-8 flex flex-col items-center text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif font-bold text-lg text-foreground">TerrasDesigner Pro</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Ontwerp uw composiet terras, kies materiaal en legpatroon, en ontvang een complete materiaallijst.
                </p>
                <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 w-full">
                  <Link to="/vlonder-planner">Start Terras Planner <ArrowRight className="w-4 h-4 ml-1" /></Link>
                </Button>
              </div>
              {/* Fence planner card */}
              <div className="bg-card border border-border rounded-xl p-6 sm:p-8 flex flex-col items-center text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif font-bold text-lg text-foreground">SchuttingPlanner Pro</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Configureer uw composiet schutting, kies systeem en kleur, en download de materiaallijst als CSV.
                </p>
                <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 w-full">
                  <Link to="/schutting-planner">Start SchuttingPlanner Pro <ArrowRight className="w-4 h-4 ml-1" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Downloads teaser */}
        <section className="bg-primary/5 border-b border-border">
          <div className="container py-10 sm:py-12 px-4 sm:px-6 text-center">
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
              Gratis Gidsen & Checklists
            </h2>
            <p className="text-muted-foreground mt-2 max-w-lg mx-auto text-sm sm:text-base">
              Download praktische PDF's over vergunningen, grondvoorbereiding, kleurkeuze en meer.
            </p>
            <Button asChild className="mt-5 sm:mt-6 bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto">
              <Link to="/downloads">Bekijk alle downloads <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
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
