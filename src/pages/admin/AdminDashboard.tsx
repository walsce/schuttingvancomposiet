import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, FolderTree, TrendingUp } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ products: 0, categories: 0, orders: 0, revenue: 0 });

  useEffect(() => {
    const load = async () => {
      const [products, categories, orders] = await Promise.all([
        supabase.from("cms_products").select("id", { count: "exact", head: true }),
        supabase.from("cms_categories").select("id", { count: "exact", head: true }),
        supabase.from("cms_orders").select("total, status"),
      ]);

      const revenue = (orders.data ?? [])
        .filter((o) => o.status !== "cancelled")
        .reduce((sum, o) => sum + Number(o.total), 0);

      setStats({
        products: products.count ?? 0,
        categories: categories.count ?? 0,
        orders: orders.data?.length ?? 0,
        revenue,
      });
    };
    load();
  }, []);

  const cards = [
    { label: "Producten", value: stats.products, icon: Package },
    { label: "Categorieën", value: stats.categories, icon: FolderTree },
    { label: "Bestellingen", value: stats.orders, icon: ShoppingCart },
    { label: "Omzet", value: `€${stats.revenue.toFixed(2)}`, icon: TrendingUp },
  ];

  return (
    <AdminLayout>
      <h1 className="font-serif text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <Card key={c.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{c.label}</CardTitle>
              <c.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{c.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
