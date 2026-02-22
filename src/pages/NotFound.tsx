import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="font-serif text-6xl font-bold text-primary mb-4">404</h1>
          <p className="text-xl font-semibold text-foreground mb-2">Pagina niet gevonden</p>
          <p className="text-muted-foreground mb-8">
            De pagina die u zoekt bestaat niet of is verplaatst. Bekijk onze populaire pagina's hieronder.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link to="/">Naar de homepage <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/assortiment">Bekijk assortiment</Link>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
            <Link to="/categorie/gevelbekleding" className="text-primary hover:underline">Gevelbekleding</Link>
            <span className="text-muted-foreground">·</span>
            <Link to="/categorie/schuttingen" className="text-primary hover:underline">Schuttingen</Link>
            <span className="text-muted-foreground">·</span>
            <Link to="/categorie/vlonderplanken" className="text-primary hover:underline">Vlonderplanken</Link>
            <span className="text-muted-foreground">·</span>
            <Link to="/contact" className="text-primary hover:underline">Contact</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
