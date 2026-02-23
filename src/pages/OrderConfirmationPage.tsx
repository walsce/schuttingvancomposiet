import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, Loader2 } from "lucide-react";

interface OrderData {
  id: string;
  order_number: number;
  customer_name: string | null;
  customer_email: string;
  total: number;
  shipping_cost: number;
  subtotal: number;
  items: { product_name: string; quantity: number; unit_price: number; image?: string }[] | null;
  created_at: string;
}

const fmt = (n: number) =>
  new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(n);

const OrderConfirmationPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;
      // Use a direct query with the order id - RLS allows insert but we stored the id
      const { data } = await supabase
        .from("cms_orders")
        .select("id, order_number, customer_name, customer_email, total, shipping_cost, subtotal, items, created_at")
        .eq("id", orderId)
        .maybeSingle();
      setOrder(data as OrderData | null);
      setLoading(false);
    };
    fetchOrder();
  }, [orderId]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead title="Bestelling bevestigd | SchuttingvanComposiet.nl" description="Je bestelling is ontvangen." canonical="/bestelling-bevestigd" />
      <Header />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : !order ? (
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">Bestelling niet gevonden</p>
            <Button asChild><Link to="/">Naar homepagina</Link></Button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Success header */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h1 className="font-serif text-2xl font-bold text-foreground">Bedankt voor je bestelling!</h1>
              <p className="text-muted-foreground">
                Bestelling <span className="font-semibold text-foreground">#{order.order_number}</span> is ontvangen.
                Een bevestiging is verzonden naar <span className="font-medium text-foreground">{order.customer_email}</span>.
              </p>
            </div>

            {/* Order details */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <h2 className="font-serif font-bold text-foreground">Besteloverzicht</h2>
              {order.items && Array.isArray(order.items) && (
                <div className="space-y-3">
                  {(order.items as { product_name: string; quantity: number; unit_price: number; image?: string }[]).map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      {item.image && (
                        <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                          <img src={item.image} alt="" className="w-full h-full object-contain p-1" />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{item.product_name}</p>
                        <p className="text-xs text-muted-foreground">{item.quantity}× {fmt(item.unit_price)}</p>
                      </div>
                      <p className="text-sm font-semibold text-foreground">{fmt(item.unit_price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              )}
              <div className="border-t border-border pt-3 space-y-1 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotaal</span><span>{fmt(order.subtotal)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Verzendkosten</span><span>{order.shipping_cost === 0 ? "Gratis" : fmt(order.shipping_cost)}</span></div>
                <div className="flex justify-between font-bold text-foreground pt-2 border-t border-border"><span>Totaal</span><span>{fmt(order.total)}</span></div>
              </div>
            </div>

            {/* Delivery info */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 flex items-start gap-3">
              <Package className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm text-foreground">Geschatte levering</p>
                <p className="text-sm text-muted-foreground">Je bestelling wordt binnen 3–5 werkdagen bezorgd. We nemen contact op om een levermoment af te spreken.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg"><Link to="/assortiment">Verder winkelen</Link></Button>
              <Button asChild variant="outline" size="lg"><Link to="/">Naar homepagina</Link></Button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default OrderConfirmationPage;
