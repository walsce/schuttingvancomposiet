import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Ruler, Settings2, FileText, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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

const DeckPlannerHero = ({ onStart }: DeckPlannerHeroProps) => {
  return (
    <>
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

      {/* Final CTA */}
      <section className="py-16 lg:py-20 bg-muted/30">
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
