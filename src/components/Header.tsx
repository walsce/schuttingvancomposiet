import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X, Phone, Star, Truck, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Assortiment", href: "/assortiment" },
  { label: "Gevelbekleding", href: "/categorie/gevelbekleding" },
  { label: "Schuttingen", href: "/categorie/schuttingen" },
  { label: "Vlonderplanken", href: "/categorie/vlonderplanken" },
  { label: "Vergelijken", href: "/vergelijken" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Top bar */}
      <div className="hidden sm:block bg-primary text-primary-foreground text-sm py-2 overflow-hidden">
        <div className="container flex items-center justify-between gap-4 min-w-0">
          <div className="flex items-center gap-6 min-w-0 overflow-hidden">
            <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 fill-current" /> 4.9/5 beoordeling</span>
            <span className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5" /> Snelle levering</span>
            <span className="hidden md:flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> 15 jaar garantie</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5" />
            <span className="font-medium">Gratis offerte aanvragen</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="font-serif text-lg sm:text-xl font-bold text-foreground tracking-tight whitespace-nowrap">
              Schuttingvan<span className="text-accent">Composiet</span><span className="hidden sm:inline">.nl</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8" aria-label="Hoofdnavigatie">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
              <ShoppingCart className="w-4 h-4" />
              Winkelwagen
            </Button>
            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Menu sluiten" : "Menu openen"}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border bg-card pb-4 safe-bottom">
            <nav className="container flex flex-col gap-1 pt-3 px-4" aria-label="Mobiele navigatie">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground py-2.5 px-2 rounded-lg hover:bg-muted transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-border mt-2 pt-3">
                <Button variant="outline" size="sm" className="w-full gap-2" onClick={() => setMobileOpen(false)}>
                  <ShoppingCart className="w-4 h-4" />
                  Winkelwagen
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
