import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import JsonLd, { organizationSchema } from "@/components/JsonLd";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, Clock, Package } from "lucide-react";
import { products } from "@/data/products";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const contactFaqs = [
  { q: "Hoe snel ontvang ik een offerte?", a: "Wij streven ernaar om binnen 24 uur een vrijblijvende offerte te versturen na ontvangst van uw aanvraag." },
  { q: "Leveren jullie ook in België?", a: "Ja, wij leveren door heel Nederland en België met onze eigen bezorgservice." },
  { q: "Kan ik een sample aanvragen?", a: "Zeker! Neem contact met ons op en wij sturen u graag een gratis sample van het gewenste product." },
  { q: "Wat zijn de levertijden?", a: "De levertijd is gemiddeld 2 tot 15 werkdagen, afhankelijk van het product en de beschikbaarheid." },
];

const ContactPage = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const productSlug = searchParams.get("product");
  const product = productSlug ? products.find((p) => p.slug === productSlug) : null;

  const isSample = type === "sample";
  const isOfferte = type === "offerte";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isSample && product) {
      setMessage(`Sample aanvraag voor: ${product.name}\n\nGraag ontvang ik een gratis sample van dit product om de kleur en kwaliteit te beoordelen.`);
    } else if (isOfferte && product) {
      setMessage(`Offerte aanvraag voor: ${product.name}\n\nGraag ontvang ik een vrijblijvende offerte voor dit product.`);
    }
  }, [isSample, isOfferte, product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { toast.error("E-mailadres is verplicht"); return; }
    setSubmitting(true);

    const fullName = [firstName, lastName].filter(Boolean).join(" ") || null;

    // Upsert into CRM contacts
    const { error } = await supabase.from("crm_contacts").upsert({
      email,
      name: fullName,
      phone: phone || null,
      source: "contact_form",
    }, { onConflict: "email" } as any);

    if (!error) {
      // Log activity
      const { data: contact } = await supabase.from("crm_contacts").select("id").eq("email", email).single();
      if (contact) {
        await supabase.from("crm_activities").insert({
          contact_id: contact.id,
          type: "email" as any,
          title: isSample ? "Sample aanvraag" : isOfferte ? "Offerte aanvraag" : "Contactformulier",
          description: message,
          metadata: { product: product?.name || null, type: type || "general" },
        });
      }
    }

    setSubmitting(false);
    if (error) {
      toast.error("Er ging iets mis. Probeer het opnieuw.");
    } else {
      toast.success("Bericht verstuurd! Wij nemen zo snel mogelijk contact op.");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Contact & Offerte Aanvragen | Schuttingvancomposiet.nl"
        description="Neem contact op voor een vrijblijvende offerte of persoonlijk advies over composiet gevelbekleding, schuttingen en vlonderplanken."
        canonical="/contact"
      />
      <JsonLd data={organizationSchema} />
      <Header />
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Contact" },
      ]} />

      <main>
        <section className="container py-8 sm:py-12 md:py-20 px-4 sm:px-6">
          {(isSample || isOfferte) && product && (
            <div className="mb-8 rounded-xl border border-primary/30 bg-primary/5 p-4 flex items-start gap-3">
              <Package className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground">
                  {isSample ? "U vraagt een gratis sample aan voor:" : "U vraagt een offerte aan voor:"}
                </p>
                <p className="text-sm text-muted-foreground mt-0.5">{product.name}</p>
                <Link to={`/product/${product.slug}`} className="text-xs text-primary hover:underline mt-1 inline-block">
                  ← Terug naar product
                </Link>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                {isSample ? "Sample Aanvragen" : isOfferte ? "Offerte Aanvragen" : "Contact & Offerte"}
              </h1>
              <p className="text-muted-foreground mt-3 leading-relaxed">
                {isSample
                  ? "Vraag een gratis sample aan en ervaar de kleur en kwaliteit van ons composiet thuis."
                  : "Heeft u vragen over onze composiet producten of wilt u een vrijblijvende offerte? Neem contact met ons op!"}
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg"><Mail className="w-5 h-5 text-primary" /></div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">E-mail</p>
                    <p className="text-sm text-muted-foreground">info@schuttingvancomposiet.nl</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg"><Phone className="w-5 h-5 text-primary" /></div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Telefoon</p>
                    <p className="text-sm text-muted-foreground">Neem contact op voor persoonlijk advies</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg"><Clock className="w-5 h-5 text-primary" /></div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Openingstijden</p>
                    <p className="text-sm text-muted-foreground">Ma - Vr: 08:00 - 17:00</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-sm font-semibold text-foreground mb-3">Bekijk ons assortiment</p>
                <div className="flex flex-wrap gap-2">
                  <Link to="/categorie/gevelbekleding" className="text-sm text-primary hover:underline">Gevelbekleding</Link>
                  <span className="text-muted-foreground">·</span>
                  <Link to="/categorie/schuttingen" className="text-sm text-primary hover:underline">Schuttingen</Link>
                  <span className="text-muted-foreground">·</span>
                  <Link to="/categorie/vlonderplanken" className="text-sm text-primary hover:underline">Vlonderplanken</Link>
                  <span className="text-muted-foreground">·</span>
                  <Link to="/vergelijken" className="text-sm text-primary hover:underline">Vergelijken</Link>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-5 sm:p-6 md:p-8">
              <h2 className="font-serif text-xl font-bold text-foreground mb-6">
                {isSample ? "Sample aanvraagformulier" : "Stuur ons een bericht"}
              </h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Voornaam" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  <Input placeholder="Achternaam" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <Input type="email" placeholder="E-mailadres" required value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input type="tel" placeholder="Telefoonnummer" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <Textarea
                  placeholder="Uw bericht of offerte aanvraag..."
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={submitting}>
                  {submitting ? "Versturen…" : isSample ? "Sample aanvragen" : "Verstuur bericht"}
                </Button>
              </form>
            </div>
          </div>
        </section>

        <FAQSection faqs={contactFaqs} title="Veelgestelde vragen over bestellen" />
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
