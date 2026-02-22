import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X, Phone } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Assortiment", href: "/assortiment" },
  { label: "Gevelbekleding", href: "/categorie/gevelbekleding" },
  { label: "Schuttingen", href: "/categorie/schuttingen" },
  { label: "Vlonderplanken", href: "/categorie/vlonderplanken" },
  { label: "Vergelijken", href: "/vergelijken" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-sm py-2">
        <div className="container flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">⭐ 4.9/5 beoordeling</span>
            <span className="hidden sm:inline">🚚 Snelle levering</span>
            <span className="hidden md:inline">🛡️ 15 jaar garantie</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5" />
            <span className="font-medium">Gratis offerte aanvragen</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-serif text-xl font-bold text-foreground tracking-tight">
              Composiet<span className="text-primary">winkel</span>.nl
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

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
              <ShoppingCart className="w-4 h-4" />
              Winkelwagen
            </Button>
            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border bg-card pb-4">
            <nav className="container flex flex-col gap-2 pt-4" aria-label="Mobiele navigatie">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
