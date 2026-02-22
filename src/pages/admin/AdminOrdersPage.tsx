import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

type Order = Tables<"cms_orders">;

const statusColors: Record<string, string> = {
  pending: "secondary",
  paid: "default",
  processing: "default",
  shipped: "default",
  delivered: "default",
  cancelled: "destructive",
};

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    const { data } = await supabase.from("cms_orders").select("*").order("created_at", { ascending: false });
    setOrders(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleStatusChange = async (orderId: string, status: string) => {
    const { error } = await supabase.from("cms_orders").update({ status: status as Order["status"] }).eq("id", orderId);
    if (error) { toast.error(error.message); return; }
    toast.success("Status bijgewerkt");
    fetchOrders();
  };

  return (
    <AdminLayout>
      <h1 className="font-serif text-2xl font-bold mb-6">Bestellingen</h1>
      {loading ? <p className="text-muted-foreground">Laden…</p> : orders.length === 0 ? (
        <p className="text-muted-foreground">Nog geen bestellingen</p>
      ) : (
        <div className="rounded-lg border border-border overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Klant</TableHead>
                <TableHead>Totaal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Datum</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((o) => (
                <TableRow key={o.id}>
                  <TableCell className="font-medium">{o.order_number}</TableCell>
                  <TableCell>
                    <div>{o.customer_name || "—"}</div>
                    <div className="text-xs text-muted-foreground">{o.customer_email}</div>
                  </TableCell>
                  <TableCell>€{Number(o.total).toFixed(2)}</TableCell>
                  <TableCell>
                    <Select value={o.status} onValueChange={(v) => handleStatusChange(o.id, v)}>
                      <SelectTrigger className="w-36">
                        <Badge variant={statusColors[o.status] as "default" | "secondary" | "destructive"}>
                          {o.status}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        {["pending", "paid", "processing", "shipped", "delivered", "cancelled"].map((s) => (
                          <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {new Date(o.created_at).toLocaleDateString("nl-NL")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminOrdersPage;
