import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PipelineBadge, { PIPELINE_STAGES } from "@/components/admin/PipelineBadge";
import ActivityTimeline from "@/components/admin/ActivityTimeline";
import AddActivityModal from "@/components/admin/AddActivityModal";
import { ArrowLeft, Plus, Save } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";

const AdminContactDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [contact, setContact] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activityOpen, setActivityOpen] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [notes, setNotes] = useState("");

  const fetchAll = async () => {
    if (!id) return;
    const [contactRes, actRes] = await Promise.all([
      supabase.from("crm_contacts").select("*").eq("id", id).single(),
      supabase.from("crm_activities").select("*").eq("contact_id", id).order("created_at", { ascending: false }),
    ]);
    const c = contactRes.data as any;
    setContact(c);
    setActivities((actRes.data as any[]) || []);
    setNotes(c?.notes || "");

    if (c?.email) {
      const { data: orderData } = await supabase.from("cms_orders").select("*").eq("customer_email", c.email).order("created_at", { ascending: false });
      setOrders(orderData || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, [id]);

  const handleStageChange = async (stage: string) => {
    const old = contact.pipeline_stage;
    await supabase.from("crm_contacts").update({ pipeline_stage: stage as any }).eq("id", id);
    await supabase.from("crm_activities").insert({
      contact_id: id,
      type: "status_change" as any,
      title: `Pipeline: ${old} → ${stage}`,
      metadata: { old_stage: old, new_stage: stage },
    });
    fetchAll();
  };

  const saveNotes = async () => {
    await supabase.from("crm_contacts").update({ notes }).eq("id", id);
    toast.success("Notities opgeslagen");
  };

  const addTag = async () => {
    if (!tagInput.trim()) return;
    const newTags = [...(contact.tags || []), tagInput.trim()];
    await supabase.from("crm_contacts").update({ tags: newTags }).eq("id", id);
    setTagInput("");
    fetchAll();
  };

  const removeTag = async (tag: string) => {
    const newTags = (contact.tags || []).filter((t: string) => t !== tag);
    await supabase.from("crm_contacts").update({ tags: newTags }).eq("id", id);
    fetchAll();
  };

  if (loading) return <AdminLayout><p className="text-muted-foreground">Laden…</p></AdminLayout>;
  if (!contact) return <AdminLayout><p>Contact niet gevonden.</p></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Link to="/admin/crm"><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
          <h1 className="text-2xl font-bold">{contact.name || contact.email}</h1>
          <PipelineBadge stage={contact.pipeline_stage} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader><CardTitle className="text-sm">Contactgegevens</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-muted-foreground">E-mail:</span> {contact.email}</div>
                <div><span className="text-muted-foreground">Telefoon:</span> {contact.phone || "—"}</div>
                <div><span className="text-muted-foreground">Bedrijf:</span> {contact.company || "—"}</div>
                <div><span className="text-muted-foreground">Bron:</span> <span className="capitalize">{contact.source}</span></div>
                <div><span className="text-muted-foreground">Totale omzet:</span> €{(contact.total_revenue || 0).toFixed(2)}</div>
                <div><span className="text-muted-foreground">Aangemaakt:</span> {format(new Date(contact.created_at), "d MMM yyyy", { locale: nl })}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-sm">Pipeline stage</CardTitle></CardHeader>
              <CardContent>
                <Select value={contact.pipeline_stage} onValueChange={handleStageChange}>
                  <SelectTrigger className="w-[200px]"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {PIPELINE_STAGES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-sm">Tags</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-3">
                  {(contact.tags || []).map((t: string) => (
                    <Badge key={t} variant="secondary" className="cursor-pointer" onClick={() => removeTag(t)}>
                      {t} ×
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Nieuwe tag" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} />
                  <Button variant="outline" size="sm" onClick={addTag}>Toevoegen</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-sm">Notities</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} />
                <Button size="sm" onClick={saveNotes}><Save className="h-4 w-4 mr-1" /> Opslaan</Button>
              </CardContent>
            </Card>

            {orders.length > 0 && (
              <Card>
                <CardHeader><CardTitle className="text-sm">Bestellingen ({orders.length})</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {orders.map((o: any) => (
                      <div key={o.id} className="flex justify-between items-center text-sm border-b pb-2">
                        <div>
                          <span className="font-medium">#{o.order_number}</span>
                          <span className="text-muted-foreground ml-2">{format(new Date(o.created_at), "d MMM yyyy", { locale: nl })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="capitalize text-muted-foreground">{o.status}</span>
                          <span className="font-medium">€{o.total?.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right column: Activity */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Activiteiten</h2>
              <Button size="sm" variant="outline" onClick={() => setActivityOpen(true)}>
                <Plus className="h-4 w-4 mr-1" /> Toevoegen
              </Button>
            </div>
            <ActivityTimeline activities={activities} />
          </div>
        </div>
      </div>

      <AddActivityModal open={activityOpen} onOpenChange={setActivityOpen} contactId={id!} onSuccess={fetchAll} />
    </AdminLayout>
  );
};

export default AdminContactDetailPage;
