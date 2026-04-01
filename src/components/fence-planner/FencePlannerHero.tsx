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

interface FencePlannerHeroProps {
  onStart: () => void;
}

const steps = [
  {
    icon: Ruler,
    title: "Kies uw vorm",
    description: "Selecteer de vorm van uw schutting en stel de afmetingen in.",
  },
  {
    icon: Settings2,
    title: "Configureer panelen",
    description: "Kies het systeem, paneeltype en kleur die bij uw tuin past.",
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
  "Export naar CSV",
];

const faqs = [
  { q: "Is de SchuttingPlanner gratis?", a: "Ja, de planner is volledig gratis te gebruiken. U kunt direct aan de slag zonder account of registratie." },
  { q: "Hoe nauwkeurig is de materiaalberekening?", a: "De planner berekent op basis van uw exacte afmetingen hoeveel panelen, palen en accessoires u nodig heeft. Voor complexe situaties adviseren wij contact met onze specialisten." },
  { q: "Kan ik de materiaallijst exporteren?", a: "Ja, u kunt de complete materiaallijst exporteren naar CSV. Zo heeft u een handig overzicht voor uw aankoop of aannemer." },
  { q: "Welke schuttingsystemen zijn beschikbaar?", a: "U kunt kiezen uit ons volledige assortiment Gamrat WPC schuttingpanelen, inclusief de Classic en Premium lijn in diverse kleuren." },
  { q: "Kan ik ook een hoekschutting ontwerpen?", a: "Ja, de planner ondersteunt rechte schuttingen, L-vormen, U-vormen en zelfs volledig gesloten vormen. U kunt de hoekpunten vrij verslepen." },
  { q: "Hoe vraag ik een offerte aan na het ontwerpen?", a: "Na het ontwerpen kunt u direct een offerte aanvragen via onze contactpagina. Wij nemen binnen 24 uur contact met u op." },
];

const internalLinks = [
  { label: "Schuttingen assortiment", href: "/categorie/schuttingen" },
  { label: "Composiet schutting plaatsen", href: "/composiet-schutting-plaatsen" },
  { label: "Composiet schutting prijs per meter", href: "/composiet-schutting-prijs-per-meter" },
  { label: "Zwarte composiet schutting", href: "/zwarte-composiet-schutting" },
  { label: "TerrasDesigner Pro", href: "/vlonder-planner" },
  { label: "Productadvies op maat", href: "/productadvies" },
  { label: "Contact & offerte", href: "/contact" },
];

const trustPoints = [
  { icon: Shield, title: "25 jaar garantie", description: "Op alle Gamrat WPC schuttingpanelen" },
  { icon: Award, title: "500+ projecten", description: "Succesvol begeleid door heel Nederland" },
  { icon: Users, title: "Persoonlijk advies", description: "Onze specialisten helpen u graag" },
];

const FencePlannerHero = ({ onStart }: FencePlannerHeroProps) => {
  return (
    <>
      <JsonLd data={[
        softwareApplicationSchema({
          name: "SchuttingPlanner Pro",
          description: "Gratis online composiet schutting planner. Ontwerp uw schutting, kies panelen en ontvang direct een materiaallijst.",
          url: "/schutting-planner",
        }),
        breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "SchuttingPlanner Pro", url: "/schutting-planner" },
        ]),
        faqSchema(faqs),
      ]} />

      <Header />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <img
          src={ctaBg}
          alt="Composiet schutting in een tuin"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/80" />

        <div className="relative z-10 text-center px-4 py-20 max-w-3xl mx-auto">
          <Badge className="mb-6 bg-accent text-accent-foreground border-accent text-sm px-4 py-1">
            Gratis Online Tool
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
            SchuttingPlanner Pro
          </h1>
          <p className="mt-4 text-white/80 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            Ontwerp uw ideale composiet schutting in enkele stappen en ontvang direct een materiaallijst.
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
            <h2 className="font-serif text-xl font-bold text-foreground">Uw composiet schutting plannen: de eerste stap</h2>
            <p>
              Een composiet schutting biedt de perfecte combinatie van privacy, duurzaamheid en esthetiek. Met de SchuttingPlanner Pro ontwerpt u uw schutting volledig online — van vormkeuze en lengte tot paneelselectie en materiaalberekening. Of u nu een rechte erfafscheiding plant of een schutting met hoeken, onze planner berekent exact hoeveel panelen, palen en accessoires u nodig heeft.
            </p>
            <h3 className="font-serif text-lg font-bold text-foreground">Voordelen van een composiet schutting</h3>
            <p>
              Composiet schuttingpanelen van Gamrat WPC zijn gemaakt van 45% houtmeel en 45% PVC, wat resulteert in een onderhoudsvrij product dat niet rot, splintert of verkleurt. Met een garantie van 25 jaar investeert u in een schutting die generaties meegaat. Geen jaarlijks beitsen of vervangen van rotte planken meer — composiet blijft mooi zonder onderhoud.
            </p>
            <h3 className="font-serif text-lg font-bold text-foreground">Van plan naar plaatsing</h3>
            <p>
              Na het ontwerpen van uw schutting in de planner exporteert u de materiaallijst naar CSV. Gebruik deze als basis voor uw offerte-aanvraag of deel het met uw aannemer. Onze specialisten staan klaar om uw ontwerp te controleren en te adviseren over de optimale plaatsingsmethode — of het nu gaat om palen in de grond, op een betonplaat of met grondankers.
            </p>
            <p>
              Kies uit de Classic-lijn voor een geborstelde houtlook of de Premium-lijn met natuurgetrouw houtnerf patroon. Beide zijn verkrijgbaar in donkerbruin, grafiet en walnoot, zodat u de perfecte match vindt bij uw tuin en woning.
            </p>
          </article>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection faqs={faqs} title="Veelgestelde vragen over de SchuttingPlanner" />

      {/* Trust CTA */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container max-w-3xl mx-auto">
          <TrustCTA
            title="Hulp nodig bij uw schuttingontwerp?"
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

export default FencePlannerHero;
