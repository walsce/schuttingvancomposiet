import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X, Phone, Star, Truck, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

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
  const { totalItems } = useCart();

  return (
    <>
      {/* Top bar */}
      <div className="hidden sm:block bg-white border-b border-border text-accent text-sm py-2 overflow-hidden">
        <div className="container flex items-center justify-between gap-4 min-w-0">
          <div className="flex items-center gap-6 min-w-0 overflow-hidden">
            <span className="flex items-center gap-1.5">
              {/* Google G logo */}
              <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" aria-label="Google">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <Star className="w-3 h-3 fill-current" />
              <Star className="w-3 h-3 fill-current" />
              <Star className="w-3 h-3 fill-current" />
              <Star className="w-3 h-3 fill-current" />
              <Star className="w-3 h-3 fill-current" />
              <span className="font-semibold">4.9/5</span>
              <span className="text-muted-foreground">(220)</span>
            </span>
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
            <Button asChild variant="outline" size="sm" className="hidden sm:flex gap-2 relative">
              <Link to="/winkelwagen">
                <ShoppingCart className="w-4 h-4" />
                Winkelwagen
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-accent text-accent-foreground text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </Link>
            </Button>
            <Link to="/winkelwagen" className="sm:hidden p-2 text-foreground relative">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>
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
                <Button asChild variant="outline" size="sm" className="w-full gap-2" onClick={() => setMobileOpen(false)}>
                  <Link to="/winkelwagen">
                    <ShoppingCart className="w-4 h-4" />
                    Winkelwagen {totalItems > 0 && `(${totalItems})`}
                  </Link>
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
