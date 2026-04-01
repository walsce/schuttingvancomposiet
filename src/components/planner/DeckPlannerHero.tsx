import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Ruler, Settings2, FileText, Check, Shield, Award, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import AuthorBlock from "@/components/seo/AuthorBlock";
import InternalLinkBlock from "@/components/seo/InternalLinkBlock";
import TrustCTA from "@/components/seo/TrustCTA";
import JsonLd, { softwareApplicationSchema, breadcrumbSchema, faqSchema } from "@/components/JsonLd";
import ctaBg from "@/assets/cta-bg.jpg";

interface DeckPlannerHeroProps {
  onStart: () => void;
}

const steps = [
  {
    icon: Ruler,
    title: "Kies uw vorm",
    description: "Selecteer de vorm van uw terras en stel de afmetingen in.",
  },
  {
    icon: Settings2,
    title: "Kies materiaal & legpatroon",
    description: "Selecteer uw vlonderplank, legrichting en onderconstructie.",
  },
  {
    icon: FileText,
    title: "Ontvang materiaallijst",
    description: "Download direct een overzicht van alle benodigde materialen.",
  },
];

const usps = [
  "Gratis te gebruiken",
  "Geen account nodig",
  "Direct materiaallijst",
  "Inclusief onderconstructie",
];

const faqs = [
  { q: "Is de TerrasDesigner Pro gratis?", a: "Ja, de planner is volledig gratis te gebruiken. U ontvangt direct een materiaallijst met prijsindicatie, zonder verplichtingen." },
  { q: "Hoe nauwkeurig is de materiaallijst?", a: "De materiaallijst geeft een nauwkeurige indicatie op basis van uw exacte afmetingen. Voor complexe vormen raden wij aan contact op te nemen met onze specialisten voor een definitieve berekening." },
  { q: "Kan ik mijn eigen plattegrond uploaden?", a: "Ja, u kunt een foto of plattegrond van uw tuin importeren als achtergrond. Zo tekent u uw terras exact op de juiste locatie." },
  { q: "Welke vlonderplanken kan ik kiezen?", a: "U kunt kiezen uit ons volledige assortiment Gamrat WPC vlonderplanken, van de voordelige Slim-lijn tot de premium Elegance co-extrusie planken." },
  { q: "Wordt de onderconstructie meeberekend?", a: "Ja, de planner berekent automatisch de benodigde liggers, clips en bevestigingsmaterialen op basis van uw gekozen onderconstructie." },
  { q: "Kan ik een offerte aanvragen op basis van mijn ontwerp?", a: "Absoluut. Na het ontwerpen kunt u direct een offerte aanvragen. Wij nemen binnen 24 uur contact met u op met een persoonlijk aanbod." },
];

const internalLinks = [
  { label: "Vlonderplanken assortiment", href: "/categorie/vlonderplanken" },
  { label: "Composiet terras aanleggen", href: "/composiet-terras-aanleggen" },
  { label: "Vlonder onderconstructie", href: "/vlonder-onderconstructie" },
  { label: "Co-extrusie vlonderplanken", href: "/co-extrusie-vlonderplanken" },
  { label: "SchuttingPlanner Pro", href: "/schutting-planner" },
  { label: "Productadvies op maat", href: "/productadvies" },
  { label: "Contact & offerte", href: "/contact" },
];

const trustPoints = [
  { icon: Shield, title: "25 jaar garantie", description: "Op alle Gamrat WPC vlonderplanken" },
  { icon: Award, title: "500+ projecten", description: "Succesvol begeleid door heel Nederland" },
  { icon: Users, title: "Persoonlijk advies", description: "Onze specialisten helpen u graag" },
];

const DeckPlannerHero = ({ onStart }: DeckPlannerHeroProps) => {
  return (
    <>
      <JsonLd data={[
        softwareApplicationSchema({
          name: "TerrasDesigner Pro",
          description: "Gratis online composiet terras planner. Ontwerp uw vlonder, kies materialen en ontvang direct een materiaallijst.",
          url: "/vlonder-planner",
        }),
        breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "TerrasDesigner Pro", url: "/vlonder-planner" },
        ]),
        faqSchema(faqs),
      ]} />

      <Header />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <img
          src={ctaBg}
          alt="Composiet vlonder terras in een tuin"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/80" />

        <div className="relative z-10 text-center px-4 py-20 max-w-3xl mx-auto">
          <Badge className="mb-6 bg-accent text-accent-foreground border-accent text-sm px-4 py-1">
            Gratis Online Tool
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
            TerrasDesigner Pro
          </h1>
          <p className="mt-4 text-white/80 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            Ontwerp uw ideale composiet terras in enkele stappen en ontvang direct een materiaallijst met prijsindicatie.
          </p>
          <Button
            size="lg"
            className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground text-base gap-2 px-8"
            onClick={onStart}
          >
            Start de Planner
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-center text-foreground mb-12">
            Hoe werkt het?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, i) => (
              <div
                key={i}
                className="relative bg-card border border-border rounded-xl p-6 text-center space-y-4"
              >
                <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="absolute top-4 right-4 w-7 h-7 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <h3 className="font-serif font-bold text-lg text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USP bar */}
      <section className="bg-primary text-primary-foreground py-5">
        <div className="container flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {usps.map((usp) => (
            <span key={usp} className="flex items-center gap-1.5 text-sm font-medium">
              <Check className="w-4 h-4" />
              {usp}
            </span>
          ))}
        </div>
      </section>

      {/* Trust points */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-center text-foreground mb-12">
            Waarom onze planner?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {trustPoints.map((tp) => (
              <div key={tp.title} className="text-center space-y-3">
                <div className="mx-auto w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                  <tp.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-serif font-bold text-lg text-foreground">{tp.title}</h3>
                <p className="text-sm text-muted-foreground">{tp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO content block */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="container max-w-3xl mx-auto">
          <AuthorBlock
            name="SchuttingvanComposiet.nl Redactie"
            role="Composiet Specialist"
            publishDate="2025-01-15"
            updatedDate="2026-03-15"
            readingTime="4 min"
          />
          <article className="prose prose-sm sm:prose max-w-none text-muted-foreground">
            <h2 className="font-serif text-xl font-bold text-foreground">Uw composiet terras plannen: waar begint u?</h2>
            <p>
              Het aanleggen van een composiet terras begint met een goed plan. Met de TerrasDesigner Pro ontwerpt u uw vlonder volledig online — van vormkeuze en afmetingen tot materiaalberekening en onderconstructie. Of u nu een eenvoudig rechthoekig terras plant of een complexe L-vorm rond uw woning, onze planner berekent exact hoeveel vlonderplanken, liggers, clips en randafwerking u nodig heeft.
            </p>
            <h3 className="font-serif text-lg font-bold text-foreground">Waarom een composiet vlonder?</h3>
            <p>
              Composiet vlonderplanken van Gamrat WPC combineren de warme uitstraling van hout met het onderhoudsgemak van kunststof. Dankzij de samenstelling van 45% houtmeel en 45% PVC zijn de planken splintervrij, kleurvast en bestand tegen vocht en schimmel. Met een garantie van 25 jaar bent u verzekerd van jarenlang genieten zonder schuren, oliën of beitsen.
            </p>
            <h3 className="font-serif text-lg font-bold text-foreground">Van ontwerp naar realisatie</h3>
            <p>
              Na het ontwerpen van uw terras in de planner ontvangt u een complete materiaallijst. Deze kunt u direct gebruiken als basis voor een offerte. Onze specialisten controleren uw ontwerp graag en adviseren over de optimale onderconstructie voor uw situatie — of het nu gaat om een vlonder op tegels, beton of een houten frame.
            </p>
            <p>
              Met co-extrusie planken uit de Elegance-lijn kiest u voor een extra beschermlaag die de plank nog beter beschermt tegen vlekken en verkleuring. Voor wie op zoek is naar de beste prijs-kwaliteitverhouding biedt de Komorowa kamerplank een uitstekend alternatief met dezelfde 25 jaar garantie.
            </p>
          </article>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection faqs={faqs} title="Veelgestelde vragen over de TerrasDesigner" />

      {/* Trust CTA */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container max-w-3xl mx-auto">
          <TrustCTA
            title="Hulp nodig bij uw terrasontwerp?"
            primaryHref="/contact?type=advies"
            primaryLabel="Gratis adviesgesprek aanvragen"
          />
        </div>
      </section>

      {/* Internal links */}
      <section className="py-12 bg-muted/30">
        <div className="container max-w-3xl mx-auto">
          <InternalLinkBlock links={internalLinks} title="Gerelateerde pagina's" />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container text-center max-w-lg mx-auto space-y-6">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
            Klaar om te beginnen?
          </h2>
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground text-base gap-2 px-8"
            onClick={onStart}
          >
            Start de Planner
            <ArrowRight className="w-5 h-5" />
          </Button>
          <p className="text-sm text-muted-foreground">
            Geen account nodig — direct beginnen
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default DeckPlannerHero;
