import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import PipelineBadge, { PIPELINE_STAGES } from "@/components/admin/PipelineBadge";
import { Plus, Search, Download } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

interface Contact {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  company: string | null;
  source: string | null;
  pipeline_stage: string;
  total_revenue: number | null;
  last_contact_at: string | null;
  created_at: string;
  tags: string[] | null;
}

const AdminCRMPage = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [addOpen, setAddOpen] = useState(false);
  const [newContact, setNewContact] = useState({ email: "", name: "", phone: "", company: "", source: "manual" });
  const [syncing, setSyncing] = useState(false);

  const fetchContacts = async () => {
    let query = supabase.from("crm_contacts").select("*").order("created_at", { ascending: false });
    if (stageFilter !== "all") query = query.eq("pipeline_stage", stageFilter as any);
    if (sourceFilter !== "all") query = query.eq("source", sourceFilter);
    const { data } = await query;
    setContacts((data as any[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchContacts(); }, [stageFilter, sourceFilter]);

  const filtered = contacts.filter((c) => {
    const term = search.toLowerCase();
    return !term || c.email.toLowerCase().includes(term) || c.name?.toLowerCase().includes(term) || c.company?.toLowerCase().includes(term);
  });

  const handleStageChange = async (id: string, stage: string) => {
    const contact = contacts.find((c) => c.id === id);
    const oldStage = contact?.pipeline_stage;
    await supabase.from("crm_contacts").update({ pipeline_stage: stage as any }).eq("id", id);
    // Log stage change activity
    await supabase.from("crm_activities").insert({
      contact_id: id,
      type: "status_change" as any,
      title: `Pipeline: ${oldStage} → ${stage}`,
      metadata: { old_stage: oldStage, new_stage: stage },
    });
    fetchContacts();
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("crm_contacts").insert({
      email: newContact.email,
      name: newContact.name || null,
      phone: newContact.phone || null,
      company: newContact.company || null,
      source: newContact.source,
    });
    if (error) { toast.error(error.message); return; }
    toast.success("Contact toegevoegd");
    setAddOpen(false);
    setNewContact({ email: "", name: "", phone: "", company: "", source: "manual" });
    fetchContacts();
  };

  const syncDeckLeads = async () => {
    setSyncing(true);
    const { data: leads } = await supabase.from("deck_planner_leads").select("*");
    if (!leads?.length) { toast.info("Geen leads gevonden"); setSyncing(false); return; }
    let count = 0;
    for (const lead of leads) {
      const { error } = await supabase.from("crm_contacts").upsert({
        email: lead.email,
        name: lead.name,
        phone: lead.phone,
        source: "deck_planner",
      }, { onConflict: "email" } as any);
      if (!error) count++;
    }
    toast.success(`${count} vlonder-leads gesynchroniseerd`);
    setSyncing(false);
    fetchContacts();
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">CRM Contacten</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={syncDeckLeads} disabled={syncing}>
              <Download className="h-4 w-4 mr-1" />
              {syncing ? "Syncing…" : "Import Vlonder Leads"}
            </Button>
            <Button size="sm" onClick={() => setAddOpen(true)}>
              <Plus className="h-4 w-4 mr-1" /> Nieuw contact
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Zoek op naam, e-mail…" className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Select value={stageFilter} onValueChange={setStageFilter}>
            <SelectTrigger className="w-[160px]"><SelectValue placeholder="Pipeline" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle stages</SelectItem>
              {PIPELINE_STAGES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={sourceFilter} onValueChange={setSourceFilter}>
            <SelectTrigger className="w-[160px]"><SelectValue placeholder="Bron" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle bronnen</SelectItem>
              <SelectItem value="order">Bestelling</SelectItem>
              <SelectItem value="deck_planner">Vlonder Planner</SelectItem>
              <SelectItem value="contact_form">Contactformulier</SelectItem>
              <SelectItem value="manual">Handmatig</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Laden…</p>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Naam</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Bron</TableHead>
                  <TableHead>Pipeline</TableHead>
                  <TableHead className="text-right">Omzet</TableHead>
                  <TableHead>Laatst contact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>
                      <Link to={`/admin/crm/${c.id}`} className="font-medium hover:underline">
                        {c.name || "—"}
                      </Link>
                    </TableCell>
                    <TableCell className="text-sm">{c.email}</TableCell>
                    <TableCell className="text-sm capitalize">{c.source || "—"}</TableCell>
                    <TableCell>
                      <Select value={c.pipeline_stage} onValueChange={(v) => handleStageChange(c.id, v)}>
                        <SelectTrigger className="w-[140px] h-8">
                          <PipelineBadge stage={c.pipeline_stage} />
                        </SelectTrigger>
                        <SelectContent>
                          {PIPELINE_STAGES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right text-sm">€{(c.total_revenue || 0).toFixed(2)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {c.last_contact_at ? format(new Date(c.last_contact_at), "d MMM yyyy", { locale: nl }) : "—"}
                    </TableCell>
                  </TableRow>
                ))}
                {!filtered.length && (
                  <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground">Geen contacten gevonden</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Nieuw contact</DialogTitle></DialogHeader>
          <form onSubmit={handleAdd} className="space-y-4">
            <div><Label>E-mail *</Label><Input required type="email" value={newContact.email} onChange={(e) => setNewContact({ ...newContact, email: e.target.value })} /></div>
            <div><Label>Naam</Label><Input value={newContact.name} onChange={(e) => setNewContact({ ...newContact, name: e.target.value })} /></div>
            <div><Label>Telefoon</Label><Input value={newContact.phone} onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })} /></div>
            <div><Label>Bedrijf</Label><Input value={newContact.company} onChange={(e) => setNewContact({ ...newContact, company: e.target.value })} /></div>
            <Button type="submit" className="w-full">Toevoegen</Button>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminCRMPage;
