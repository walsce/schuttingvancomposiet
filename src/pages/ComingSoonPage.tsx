import { Badge } from "@/components/ui/badge";
import { Clock, Mail } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SEOHead from "@/components/SEOHead";

const ComingSoonPage = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <>
      <SEOHead
        title="Binnenkort beschikbaar | Composiet Buitenleven"
        description="Wij werken hard aan onze nieuwe website. Laat uw e-mailadres achter en wij houden u op de hoogte."
      />
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <div className="max-w-lg w-full text-center space-y-8">
          <Badge className="bg-primary/10 text-primary border-primary/20 text-sm px-4 py-1.5">
            <Clock className="w-3.5 h-3.5 mr-1.5" />
            Coming Soon
          </Badge>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight">
            Wij bouwen iets moois
          </h1>

          <p className="text-muted-foreground text-lg leading-relaxed max-w-md mx-auto">
            Onze nieuwe website is bijna klaar. Laat uw e-mailadres achter en wij
            laten u als eerste weten wanneer we live gaan.
          </p>

          {submitted ? (
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 space-y-2">
              <p className="text-primary font-semibold font-serif text-lg">Bedankt!</p>
              <p className="text-muted-foreground text-sm">
                We sturen u een bericht zodra de website online is.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-3 max-w-sm mx-auto">
              <Input
                type="email"
                placeholder="Uw e-mailadres"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5">
                <Mail className="w-4 h-4" />
                Verstuur
              </Button>
            </form>
          )}

          <div className="pt-8 border-t border-border">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Composiet Buitenleven. Alle rechten voorbehouden.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComingSoonPage;
