import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, ShoppingCart, FolderTree, TrendingUp, Users, BarChart3, ArrowRight } from "lucide-react";
import PipelineBadge from "@/components/admin/PipelineBadge";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ products: 0, categories: 0, orders: 0, revenue: 0, contacts: 0, newLeads: 0 });
  const [recentContacts, setRecentContacts] = useState<any[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const [products, categories, orders, contacts] = await Promise.all([
        supabase.from("cms_products").select("id", { count: "exact", head: true }),
        supabase.from("cms_categories").select("id", { count: "exact", head: true }),
        supabase.from("cms_orders").select("total, status"),
        supabase.from("crm_contacts").select("*").order("created_at", { ascending: false }).limit(5),
      ]);

      const allOrders = orders.data ?? [];
      const revenue = allOrders.filter((o) => o.status !== "cancelled").reduce((sum, o) => sum + Number(o.total), 0);
      const contactList = (contacts.data as any[]) || [];

      setStats({
        products: products.count ?? 0,
        categories: categories.count ?? 0,
        orders: allOrders.length,
        revenue,
        contacts: contactList.length,
        newLeads: contactList.filter((c) => c.pipeline_stage === "new").length,
      });
      setRecentContacts(contactList);

      const { data: recentOrd } = await supabase.from("cms_orders").select("*").order("created_at", { ascending: false }).limit(5);
      setRecentOrders(recentOrd || []);
    };
    load();
  }, []);

  const cards = [
    { label: "Producten", value: stats.products, icon: Package, href: "/admin/products" },
    { label: "Bestellingen", value: stats.orders, icon: ShoppingCart, href: "/admin/orders" },
    { label: "Omzet", value: `€${stats.revenue.toFixed(2)}`, icon: TrendingUp, href: "/admin/analytics" },
    { label: "CRM Contacten", value: stats.contacts, icon: Users, href: "/admin/crm" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-2xl font-bold">Dashboard</h1>
          <Link to="/admin/analytics">
            <Button variant="outline" size="sm"><BarChart3 className="h-4 w-4 mr-1" /> Volledige analytics</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c) => (
            <Link key={c.label} to={c.href}>
              <Card className="hover:border-primary/40 transition-colors cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{c.label}</CardTitle>
                  <c.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{c.value}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent contacts */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm">Recente contacten</CardTitle>
              <Link to="/admin/crm" className="text-xs text-primary hover:underline flex items-center gap-1">
                Bekijk alle <ArrowRight className="h-3 w-3" />
              </Link>
            </CardHeader>
            <CardContent>
              {recentContacts.length ? (
                <div className="space-y-3">
                  {recentContacts.map((c: any) => (
                    <Link key={c.id} to={`/admin/crm/${c.id}`} className="flex items-center justify-between hover:bg-muted/50 rounded-md p-2 -mx-2 transition-colors">
                      <div>
                        <p className="text-sm font-medium">{c.name || c.email}</p>
                        <p className="text-xs text-muted-foreground capitalize">{c.source}</p>
                      </div>
                      <PipelineBadge stage={c.pipeline_stage} />
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Nog geen contacten.</p>
              )}
            </CardContent>
          </Card>

          {/* Recent orders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm">Recente bestellingen</CardTitle>
              <Link to="/admin/orders" className="text-xs text-primary hover:underline flex items-center gap-1">
                Bekijk alle <ArrowRight className="h-3 w-3" />
              </Link>
            </CardHeader>
            <CardContent>
              {recentOrders.length ? (
                <div className="space-y-3">
                  {recentOrders.map((o: any) => (
                    <div key={o.id} className="flex items-center justify-between text-sm">
                      <div>
                        <span className="font-medium">#{o.order_number}</span>
                        <span className="text-muted-foreground ml-2">{o.customer_name || o.customer_email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground capitalize">{o.status}</span>
                        <span className="font-medium">€{Number(o.total).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Nog geen bestellingen.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
