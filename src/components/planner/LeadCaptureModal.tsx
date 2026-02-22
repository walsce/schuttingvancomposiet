import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { MaterialLine, Point } from "./types";
import { Mail, User, Phone } from "lucide-react";

interface LeadCaptureModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  shapePoints: Point[];
  selectedProduct: string | null;
  areaM2: number;
  materialsList: MaterialLine[];
}

const LeadCaptureModal = ({ open, onClose, onSuccess, shapePoints, selectedProduct, areaM2, materialsList }: LeadCaptureModalProps) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    try {
      const { error } = await supabase.from("deck_planner_leads" as any).insert({
        email: email.trim(),
        name: name.trim() || null,
        phone: phone.trim() || null,
        shape_data: { points: shapePoints },
        selected_product: selectedProduct,
        area_m2: areaM2,
        materials_list: materialsList,
      } as any);

      if (error) throw error;

      toast.success("Materiaallijst is beschikbaar!");
      onSuccess();
    } catch {
      toast.error("Er ging iets mis. Probeer het opnieuw.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif">Bekijk je materiaallijst</DialogTitle>
          <DialogDescription>
            Vul je e-mailadres in om je persoonlijke materiaallijst en prijsindicatie te bekijken.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <Label htmlFor="lead-email" className="text-sm">E-mailadres *</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="lead-email" type="email" required placeholder="uw@email.nl" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" />
            </div>
          </div>
          <div>
            <Label htmlFor="lead-name" className="text-sm">Naam (optioneel)</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="lead-name" placeholder="Uw naam" value={name} onChange={(e) => setName(e.target.value)} className="pl-10" />
            </div>
          </div>
          <div>
            <Label htmlFor="lead-phone" className="text-sm">Telefoon (optioneel)</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="lead-phone" type="tel" placeholder="06-12345678" value={phone} onChange={(e) => setPhone(e.target.value)} className="pl-10" />
            </div>
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? "Laden..." : "Materiaallijst bekijken"}
          </Button>
          <p className="text-[11px] text-muted-foreground text-center">
            We gebruiken uw gegevens alleen om u te contacteren over uw project.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LeadCaptureModal;
