import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Mail, Clock, CheckCircle, XCircle, Send, Eye } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { toast } from "sonner";

interface EmailAutomation {
  id: string;
  type: string;
  recipient_email: string;
  recipient_name: string | null;
  status: string;
  scheduled_for: string;
  sent_at: string | null;
  subject: string | null;
  html_body: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

const TYPE_LABELS: Record<string, string> = {
  order_confirmation: "Orderbevestiging",
  cart_abandonment_1: "Cart Abandonment #1",
  cart_abandonment_2: "Cart Abandonment #2",
  checkout_abandonment_1: "Checkout Abandonment #1",
  checkout_abandonment_2: "Checkout Abandonment #2",
};

const STATUS_CONFIG: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  queued: { label: "Gepland", variant: "outline" },
  sent: { label: "Verzonden", variant: "default" },
  failed: { label: "Mislukt", variant: "destructive" },
  cancelled: { label: "Geannuleerd", variant: "secondary" },
};

const AdminAutomationsPage = () => {
  const [emails, setEmails] = useState<EmailAutomation[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [previewEmail, setPreviewEmail] = useState<EmailAutomation | null>(null);

  const fetchEmails = async () => {
    let query = supabase
      .from("email_automations")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);

    if (typeFilter !== "all") query = query.eq("type", typeFilter as any);
    if (statusFilter !== "all") query = query.eq("status", statusFilter as any);

    const { data } = await query;
    setEmails((data as any[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchEmails(); }, [typeFilter, statusFilter]);

  const handleCancel = async (id: string) => {
    await supabase.from("email_automations").update({ status: "cancelled" }).eq("id", id);
    toast.success("E-mail geannuleerd");
    fetchEmails();
  };

  const stats = {
    total: emails.length,
    queued: emails.filter((e) => e.status === "queued").length,
    sent: emails.filter((e) => e.status === "sent").length,
    cancelled: emails.filter((e) => e.status === "cancelled").length,
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">E-mail Automations</h1>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <Mail className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Totaal</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <Clock className="h-8 w-8 text-primary/70" />
              <div>
                <p className="text-2xl font-bold">{stats.queued}</p>
                <p className="text-xs text-muted-foreground">Gepland</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{stats.sent}</p>
                <p className="text-xs text-muted-foreground">Verzonden</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <XCircle className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{stats.cancelled}</p>
                <p className="text-xs text-muted-foreground">Geannuleerd</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[220px]"><SelectValue placeholder="Type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle types</SelectItem>
              {Object.entries(TYPE_LABELS).map(([k, v]) => (
                <SelectItem key={k} value={k}>{v}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle statussen</SelectItem>
              <SelectItem value="queued">Gepland</SelectItem>
              <SelectItem value="sent">Verzonden</SelectItem>
              <SelectItem value="failed">Mislukt</SelectItem>
              <SelectItem value="cancelled">Geannuleerd</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        {loading ? (
          <p className="text-muted-foreground">Laden…</p>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Ontvanger</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Gepland voor</TableHead>
                  <TableHead>Verzonden</TableHead>
                  <TableHead className="text-right">Acties</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {emails.map((e) => {
                  const sc = STATUS_CONFIG[e.status] || STATUS_CONFIG.queued;
                  return (
                    <TableRow key={e.id}>
                      <TableCell className="text-sm font-medium">{TYPE_LABELS[e.type] || e.type}</TableCell>
                      <TableCell className="text-sm">{e.recipient_email}</TableCell>
                      <TableCell>
                        <Badge variant={sc.variant}>{sc.label}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {format(new Date(e.scheduled_for), "d MMM HH:mm", { locale: nl })}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {e.sent_at ? format(new Date(e.sent_at), "d MMM HH:mm", { locale: nl }) : "—"}
                      </TableCell>
                      <TableCell className="text-right space-x-1">
                        {(e.html_body || e.status === "sent") && (
                          <Button variant="ghost" size="sm" onClick={() => setPreviewEmail(e)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                        {e.status === "queued" && (
                          <Button variant="ghost" size="sm" onClick={() => handleCancel(e.id)}>
                            <XCircle className="h-4 w-4 text-destructive" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
                {!emails.length && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      Geen e-mails gevonden
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Preview modal */}
      <Dialog open={!!previewEmail} onOpenChange={() => setPreviewEmail(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              {previewEmail?.subject || TYPE_LABELS[previewEmail?.type || ""] || "E-mail Preview"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 text-sm">
            <p><strong>Aan:</strong> {previewEmail?.recipient_email}</p>
            <p><strong>Type:</strong> {TYPE_LABELS[previewEmail?.type || ""] || previewEmail?.type}</p>
            <p><strong>Status:</strong> {STATUS_CONFIG[previewEmail?.status || "queued"]?.label}</p>
          </div>
          {previewEmail?.html_body ? (
            <div className="border rounded-lg p-4 mt-4" dangerouslySetInnerHTML={{ __html: previewEmail.html_body }} />
          ) : (
            <p className="text-muted-foreground mt-4">Geen preview beschikbaar (e-mail nog niet verwerkt)</p>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminAutomationsPage;
