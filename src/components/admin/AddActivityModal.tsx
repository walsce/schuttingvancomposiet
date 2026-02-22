import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contactId: string;
  onSuccess: () => void;
}

const AddActivityModal = ({ open, onOpenChange, contactId, onSuccess }: Props) => {
  const [type, setType] = useState("note");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("crm_activities").insert({
      contact_id: contactId,
      type: type as any,
      title,
      description,
    });
    setLoading(false);
    if (error) {
      toast.error("Fout bij opslaan");
      return;
    }
    // Update last_contact_at
    await supabase.from("crm_contacts").update({ last_contact_at: new Date().toISOString() }).eq("id", contactId);
    toast.success("Activiteit toegevoegd");
    setTitle("");
    setDescription("");
    setType("note");
    onOpenChange(false);
    onSuccess();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Activiteit toevoegen</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="note">Notitie</SelectItem>
                <SelectItem value="call">Telefoongesprek</SelectItem>
                <SelectItem value="email">E-mail</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Titel</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <Label>Beschrijving</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Opslaan…" : "Toevoegen"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddActivityModal;
