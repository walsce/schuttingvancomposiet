import { Link } from "react-router-dom";
import { Truck, ShieldCheck, MessageCircle, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TrustCTAProps {
  title?: string;
  primaryHref?: string;
  primaryLabel?: string;
}

const TrustCTA = ({
  title = "Waarom SchuttingvanComposiet.nl?",
  primaryHref = "/contact",
  primaryLabel = "Gratis offerte aanvragen",
}: TrustCTAProps) => (
  <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 space-y-4">
    <h3 className="font-serif font-bold text-foreground">{title}</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="flex items-center gap-3">
        <Truck className="h-5 w-5 text-primary flex-shrink-0" />
        <span className="text-sm text-foreground">Eigen bezorgservice door heel Nederland</span>
      </div>
      <div className="flex items-center gap-3">
        <ShieldCheck className="h-5 w-5 text-primary flex-shrink-0" />
        <span className="text-sm text-foreground">15–25 jaar productgarantie</span>
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
    <Button asChild size="lg" className="w-full sm:w-auto">
      <Link to={primaryHref}>{primaryLabel}</Link>
    </Button>
  </div>
);

export default TrustCTA;
