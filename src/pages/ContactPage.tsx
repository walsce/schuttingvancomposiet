import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, Clock } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="container py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Contact & Offerte</h1>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              Heeft u vragen over onze composiet producten of wilt u een vrijblijvende offerte? Neem contact met ons op!
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg"><Mail className="w-5 h-5 text-primary" /></div>
                <div>
                  <p className="text-sm font-semibold text-foreground">E-mail</p>
                  <p className="text-sm text-muted-foreground">info@composietwinkel.nl</p>
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
          </div>

          <div className="bg-card rounded-xl border border-border p-6 md:p-8">
            <h2 className="font-serif text-xl font-bold text-foreground mb-6">Stuur ons een bericht</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Voornaam" />
                <Input placeholder="Achternaam" />
              </div>
              <Input type="email" placeholder="E-mailadres" />
              <Input type="tel" placeholder="Telefoonnummer" />
              <Textarea placeholder="Uw bericht of offerte aanvraag..." rows={4} />
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Verstuur bericht
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
