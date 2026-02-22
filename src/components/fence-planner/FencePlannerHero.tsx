import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface FencePlannerHeroProps {
  onStart: () => void;
}

const FencePlannerHero = ({ onStart }: FencePlannerHeroProps) => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left — visual */}
      <div className="lg:w-1/2 min-h-[50vh] lg:min-h-screen relative bg-gradient-to-br from-[hsl(var(--primary)/0.85)] to-[hsl(var(--primary)/0.6)] flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 text-center p-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
            Mijn Hek
            <br />
            <span className="text-white/90">Planner</span>
          </h1>
          <p className="mt-4 text-white/80 text-lg max-w-md mx-auto">
            Ontwerp uw ideale composiet schutting in enkele stappen
          </p>
        </div>
      </div>

      {/* Right — CTA area */}
      <div className="lg:w-1/2 flex flex-col items-center justify-center p-8 lg:p-16 bg-background">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-[4/3] bg-muted rounded-lg border border-border flex items-center justify-center"
              >
                <span className="text-muted-foreground/40 text-sm font-medium">Paneel {i}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-foreground">
              Start uw project
            </h2>
            <p className="text-muted-foreground text-sm">
              Configureer uw schutting, kies materialen en ontvang direct een materiaallijst.
            </p>
          </div>

          <Button size="lg" className="w-full text-base gap-2" onClick={onStart}>
            EEN PROJECT STARTEN
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FencePlannerHero;
