import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ctaBg from "@/assets/cta-bg.jpg";

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
  <section className="relative overflow-hidden">
    <img src={ctaBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0 bg-primary/85" />
    <div className="container py-10 sm:py-16 text-center relative z-10 px-4 sm:px-6">
      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary-foreground">{title}</h2>
      <p className="text-primary-foreground/80 mt-2 sm:mt-3 max-w-md mx-auto text-sm sm:text-base">{description}</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6 sm:mt-8">
        <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold w-full sm:w-auto">
          <Link to={primaryHref}>
            {primaryLabel} <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
        {secondaryLabel && (
          <Button asChild variant="outline" size="lg" className="border-primary-foreground text-primary-foreground bg-primary-foreground/15 hover:bg-primary-foreground/25 w-full sm:w-auto">
            <Link to={secondaryHref}>{secondaryLabel}</Link>
          </Button>
        )}
      </div>
    </div>
  </section>
);

export default CTASection;
