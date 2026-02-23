import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

const fmt = (n: number) =>
  new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(n);

const CartPage = () => {
  const { items, updateQuantity, removeItem, subtotal, shippingCost, total, totalItems } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead title="Winkelwagen | SchuttingvanComposiet.nl" description="Bekijk je winkelwagen en ga verder naar afrekenen." canonical="/winkelwagen" />
      <Header />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        <h1 className="font-serif text-2xl font-bold text-foreground mb-6">Winkelwagen {totalItems > 0 && <span className="text-muted-foreground font-normal text-lg">({totalItems} {totalItems === 1 ? "item" : "items"})</span>}</h1>

        {items.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground/40" />
            <p className="text-muted-foreground">Je winkelwagen is leeg</p>
            <Button asChild><Link to="/assortiment">Bekijk assortiment</Link></Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-4 bg-card border border-border rounded-xl p-4">
                  <Link to={`/product/${product.slug}`} className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-muted">
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain p-1" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${product.slug}`} className="font-semibold text-sm text-foreground hover:text-primary transition-colors line-clamp-2">{product.name}</Link>
                    <p className="text-xs text-muted-foreground mt-0.5">{product.priceLabel}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-border rounded-lg">
                        <button onClick={() => updateQuantity(product.id, quantity - 1)} className="p-1.5 hover:bg-muted transition-colors" disabled={quantity <= 1}><Minus className="w-3.5 h-3.5" /></button>
                        <span className="px-3 text-sm font-medium min-w-[2rem] text-center">{quantity}</span>
                        <button onClick={() => updateQuantity(product.id, quantity + 1)} className="p-1.5 hover:bg-muted transition-colors"><Plus className="w-3.5 h-3.5" /></button>
                      </div>
                      <button onClick={() => removeItem(product.id)} className="text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-foreground">{fmt(product.price * quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-xl p-6 space-y-4 sticky top-20">
                <h2 className="font-serif font-bold text-foreground">Overzicht</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Subtotaal</span><span className="text-foreground">{fmt(subtotal)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Verzendkosten</span><span className="text-foreground">{shippingCost === 0 ? "Gratis" : fmt(shippingCost)}</span></div>
                  {shippingCost > 0 && <p className="text-xs text-primary">Gratis verzending vanaf €500</p>}
                </div>
                <div className="border-t border-border pt-3 flex justify-between font-bold text-foreground">
                  <span>Totaal (incl. BTW)</span><span>{fmt(total)}</span>
                </div>
                <Button asChild size="lg" className="w-full gap-2">
                  <Link to="/afrekenen">Afrekenen <ArrowRight className="w-4 h-4" /></Link>
                </Button>
                <Button asChild variant="ghost" size="sm" className="w-full">
                  <Link to="/assortiment">Verder winkelen</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
