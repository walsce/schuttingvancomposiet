import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

const CTASection = ({
  title = "Klaar voor jouw composiet project?",
  description = "Vraag een gratis offerte aan en ontvang persoonlijk advies over de beste oplossing voor jouw tuin of gevel.",
  primaryLabel = "Gratis Offerte Aanvragen",
  primaryHref = "/contact",
  secondaryLabel = "Bekijk Assortiment",
  secondaryHref = "/assortiment",
}: CTASectionProps) => (
  <section className="bg-primary">
    <div className="container py-16 text-center">
      <h2 className="font-serif text-3xl font-bold text-primary-foreground">{title}</h2>
      <p className="text-primary-foreground/80 mt-3 max-w-md mx-auto">{description}</p>
      <div className="flex flex-wrap gap-3 justify-center mt-8">
        <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
          <Link to={primaryHref}>
            {primaryLabel} <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
        {secondaryLabel && (
          <Button asChild variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
            <Link to={secondaryHref}>{secondaryLabel}</Link>
          </Button>
        )}
      </div>
    </div>
  </section>
);

export default CTASection;
