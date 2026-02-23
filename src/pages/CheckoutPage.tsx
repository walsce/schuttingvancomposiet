import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { CreditCard, Building2, Loader2, ShieldCheck, Lock } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(2, "Vul je naam in").max(100),
  email: z.string().trim().email("Ongeldig e-mailadres").max(255),
  phone: z.string().trim().min(6, "Vul je telefoonnummer in").max(20),
  street: z.string().trim().min(2, "Vul je straatnaam in").max(200),
  houseNumber: z.string().trim().min(1, "Vul huisnummer in").max(20),
  postalCode: z.string().trim().regex(/^[1-9]\d{3}\s?[A-Za-z]{2}$/, "Ongeldige postcode (bijv. 1234 AB)"),
  city: z.string().trim().min(2, "Vul je woonplaats in").max(100),
  paymentMethod: z.enum(["ideal", "card"]),
  idealBank: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const fmt = (n: number) =>
  new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(n);

const idealBanks = [
  "ABN AMRO", "ASN Bank", "Bunq", "ING", "Knab", "Rabobank", "RegioBank", "SNS", "Triodos Bank", "Van Lanschot",
];

const CheckoutPage = () => {
  const { items, subtotal, shippingCost, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { paymentMethod: "ideal" },
  });

  const paymentMethod = watch("paymentMethod");

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">Je winkelwagen is leeg</p>
            <Button asChild><Link to="/assortiment">Bekijk assortiment</Link></Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      const shippingAddress = {
        street: data.street,
        houseNumber: data.houseNumber,
        postalCode: data.postalCode,
        city: data.city,
      };

      const orderItems = items.map((i) => ({
        product_name: i.product.name,
        product_slug: i.product.slug,
        quantity: i.quantity,
        unit_price: i.product.price,
        total_price: i.product.price * i.quantity,
        image: i.product.image,
      }));

      const { data: order, error } = await supabase
        .from("cms_orders")
        .insert({
          customer_name: data.name,
          customer_email: data.email,
          customer_phone: data.phone,
          shipping_address: shippingAddress,
          billing_address: shippingAddress,
          items: orderItems,
          subtotal,
          shipping_cost: shippingCost,
          total,
          status: "pending",
          notes: `Betaalmethode: ${data.paymentMethod === "ideal" ? `iDEAL (${data.idealBank || "n/b"})` : "Creditcard"} — Demo modus`,
        })
        .select("id, order_number")
        .single();

      if (error) throw error;

      // Insert order items
      const itemInserts = items.map((i) => ({
        order_id: order.id,
        product_name: i.product.name,
        quantity: i.quantity,
        unit_price: i.product.price,
        total_price: i.product.price * i.quantity,
      }));

      await supabase.from("cms_order_items").insert(itemInserts);

      clearCart();
      navigate(`/bestelling-bevestigd/${order.id}`);
    } catch (err: unknown) {
      console.error(err);
      toast({
        title: "Er ging iets mis",
        description: "Probeer het opnieuw of neem contact met ons op.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead title="Afrekenen | SchuttingvanComposiet.nl" description="Rond je bestelling af." canonical="/afrekenen" />
      <Header />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        <h1 className="font-serif text-2xl font-bold text-foreground mb-8">Afrekenen</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3 space-y-8">
            {/* Customer info */}
            <section className="bg-card border border-border rounded-xl p-6 space-y-4">
              <h2 className="font-serif font-bold text-foreground">1. Klantgegevens</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Label htmlFor="name">Volledige naam *</Label>
                  <Input id="name" {...register("name")} placeholder="Jan de Vries" />
                  {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <Label htmlFor="email">E-mailadres *</Label>
                  <Input id="email" type="email" {...register("email")} placeholder="jan@voorbeeld.nl" />
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="phone">Telefoonnummer *</Label>
                  <Input id="phone" type="tel" {...register("phone")} placeholder="06 12345678" />
                  {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
                </div>
              </div>
            </section>

            {/* Address */}
            <section className="bg-card border border-border rounded-xl p-6 space-y-4">
              <h2 className="font-serif font-bold text-foreground">2. Bezorgadres</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <Label htmlFor="street">Straat *</Label>
                  <Input id="street" {...register("street")} placeholder="Keizersgracht" />
                  {errors.street && <p className="text-xs text-destructive mt-1">{errors.street.message}</p>}
                </div>
                <div>
                  <Label htmlFor="houseNumber">Huisnr. *</Label>
                  <Input id="houseNumber" {...register("houseNumber")} placeholder="42" />
                  {errors.houseNumber && <p className="text-xs text-destructive mt-1">{errors.houseNumber.message}</p>}
                </div>
                <div>
                  <Label htmlFor="postalCode">Postcode *</Label>
                  <Input id="postalCode" {...register("postalCode")} placeholder="1234 AB" />
                  {errors.postalCode && <p className="text-xs text-destructive mt-1">{errors.postalCode.message}</p>}
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="city">Woonplaats *</Label>
                  <Input id="city" {...register("city")} placeholder="Amsterdam" />
                  {errors.city && <p className="text-xs text-destructive mt-1">{errors.city.message}</p>}
                </div>
              </div>
            </section>

            {/* Payment */}
            <section className="bg-card border border-border rounded-xl p-6 space-y-4">
              <h2 className="font-serif font-bold text-foreground">3. Betaalmethode</h2>
              <RadioGroup
                defaultValue="ideal"
                onValueChange={(v) => setValue("paymentMethod", v as "ideal" | "card")}
                className="space-y-3"
              >
                <label className={`flex items-center gap-3 border rounded-xl p-4 cursor-pointer transition-colors ${paymentMethod === "ideal" ? "border-primary bg-primary/5" : "border-border"}`}>
                  <RadioGroupItem value="ideal" id="pay-ideal" />
                  <Building2 className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm text-foreground">iDEAL</p>
                    <p className="text-xs text-muted-foreground">Direct betalen via je bank</p>
                  </div>
                </label>
                <label className={`flex items-center gap-3 border rounded-xl p-4 cursor-pointer transition-colors ${paymentMethod === "card" ? "border-primary bg-primary/5" : "border-border"}`}>
                  <RadioGroupItem value="card" id="pay-card" />
                  <CreditCard className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm text-foreground">Creditcard</p>
                    <p className="text-xs text-muted-foreground">Visa, Mastercard</p>
                  </div>
                </label>
              </RadioGroup>

              {paymentMethod === "ideal" && (
                <div className="pt-2">
                  <Label>Kies je bank</Label>
                  <Select onValueChange={(v) => setValue("idealBank", v)}>
                    <SelectTrigger><SelectValue placeholder="Selecteer je bank" /></SelectTrigger>
                    <SelectContent>
                      {idealBanks.map((b) => (
                        <SelectItem key={b} value={b}>{b}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {paymentMethod === "card" && (
                <div className="space-y-3 pt-2">
                  <div>
                    <Label>Kaartnummer</Label>
                    <Input placeholder="•••• •••• •••• ••••" disabled className="bg-muted/50" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Vervaldatum</Label>
                      <Input placeholder="MM / JJ" disabled className="bg-muted/50" />
                    </div>
                    <div>
                      <Label>CVC</Label>
                      <Input placeholder="•••" disabled className="bg-muted/50" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Demo modus — kaartvelden worden actief na Mollie-koppeling
                  </p>
                </div>
              )}
            </section>

            <Button type="submit" size="lg" className="w-full gap-2" disabled={submitting}>
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
              {submitting ? "Bestelling verwerken…" : `Bestelling plaatsen — ${fmt(total)}`}
            </Button>

            <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Veilige verbinding — Je gegevens worden versleuteld verzonden
            </p>
          </div>

          {/* Order summary sidebar */}
          <aside className="lg:col-span-2">
            <div className="bg-card border border-border rounded-xl p-6 space-y-4 sticky top-20">
              <h2 className="font-serif font-bold text-foreground">Besteloverzicht</h2>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex gap-3">
                    <div className="w-14 h-14 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-contain p-1" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground line-clamp-1">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{quantity}× {fmt(product.price)}</p>
                    </div>
                    <p className="text-sm font-semibold text-foreground flex-shrink-0">{fmt(product.price * quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-3 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotaal</span><span>{fmt(subtotal)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Verzendkosten</span><span>{shippingCost === 0 ? "Gratis" : fmt(shippingCost)}</span></div>
              </div>
              <div className="border-t border-border pt-3 flex justify-between font-bold text-foreground text-lg">
                <span>Totaal</span><span>{fmt(total)}</span>
              </div>
            </div>
          </aside>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
