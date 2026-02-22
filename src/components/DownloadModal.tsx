import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import type { DownloadGuide } from "@/data/downloads";
import { Download } from "lucide-react";

interface DownloadModalProps {
  guide: DownloadGuide | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DownloadModal = ({ guide, open, onOpenChange }: DownloadModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      toast({
        title: "Download wordt voorbereid!",
        description: `We sturen "${guide?.title}" naar ${email}. Controleer je inbox.`,
      });
      setSubmitting(false);
      setName("");
      setEmail("");
      onOpenChange(false);
    }, 800);
  };

  if (!guide) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">{guide.title}</DialogTitle>
          <DialogDescription>
            Vul je gegevens in en ontvang de PDF gratis in je inbox.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="dl-name">Naam</Label>
            <Input
              id="dl-name"
              placeholder="Jouw naam"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dl-email">E-mailadres</Label>
            <Input
              id="dl-email"
              type="email"
              placeholder="naam@voorbeeld.nl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={submitting}>
            <Download className="w-4 h-4 mr-2" />
            {submitting ? "Bezig..." : "Download Gratis PDF"}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            We respecteren je privacy. Geen spam, alleen waardevolle content.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadModal;
