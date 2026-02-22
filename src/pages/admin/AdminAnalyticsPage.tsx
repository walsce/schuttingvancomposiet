import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { RevenueChart, OrderStatusChart, LeadSourceChart, PipelineFunnelChart, TopProductsChart } from "@/components/admin/AnalyticsCharts";
import ActivityTimeline from "@/components/admin/ActivityTimeline";
import { Users, TrendingUp, ShoppingCart, Target } from "lucide-react";
import { format, subDays } from "date-fns";

const AdminAnalyticsPage = () => {
  const [kpis, setKpis] = useState({ contacts: 0, revenue: 0, orders: 0, conversionRate: 0, avgOrder: 0 });
  const [revenueData, setRevenueData] = useState<{ date: string; revenue: number }[]>([]);
  const [orderStatusData, setOrderStatusData] = useState<{ name: string; value: number }[]>([]);
  const [leadSourceData, setLeadSourceData] = useState<{ source: string; count: number }[]>([]);
  const [funnelData, setFunnelData] = useState<{ stage: string; count: number }[]>([]);
  const [topProducts, setTopProducts] = useState<{ name: string; sold: number }[]>([]);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      const [contactsRes, ordersRes, activitiesRes, orderItemsRes] = await Promise.all([
        supabase.from("crm_contacts").select("*"),
        supabase.from("cms_orders").select("*"),
        supabase.from("crm_activities").select("*").order("created_at", { ascending: false }).limit(20),
        supabase.from("cms_order_items").select("product_name, quantity"),
      ]);

      const contacts = (contactsRes.data as any[]) || [];
      const orders = (ordersRes.data as any[]) || [];
      const activities = (activitiesRes.data as any[]) || [];
      const items = (orderItemsRes.data as any[]) || [];

      // KPIs
      const totalRevenue = orders.filter((o) => o.status !== "cancelled").reduce((s, o) => s + (o.total || 0), 0);
      const wonContacts = contacts.filter((c) => c.pipeline_stage === "won").length;
      setKpis({
        contacts: contacts.length,
        revenue: totalRevenue,
        orders: orders.length,
        conversionRate: contacts.length ? Math.round((wonContacts / contacts.length) * 100) : 0,
        avgOrder: orders.length ? totalRevenue / orders.length : 0,
      });

      // Revenue over time (last 30 days)
      const revenueMap: Record<string, number> = {};
      for (let i = 29; i >= 0; i--) {
        const d = format(subDays(new Date(), i), "yyyy-MM-dd");
        revenueMap[d] = 0;
      }
      orders.forEach((o) => {
        const d = format(new Date(o.created_at), "yyyy-MM-dd");
        if (revenueMap[d] !== undefined) revenueMap[d] += o.total || 0;
      });
      setRevenueData(Object.entries(revenueMap).map(([date, revenue]) => ({ date: format(new Date(date), "dd/MM"), revenue })));

      // Order status
      const statusCount: Record<string, number> = {};
      orders.forEach((o) => { statusCount[o.status] = (statusCount[o.status] || 0) + 1; });
      setOrderStatusData(Object.entries(statusCount).map(([name, value]) => ({ name, value })));

      // Lead sources
      const sourceCount: Record<string, number> = {};
      contacts.forEach((c) => { const s = c.source || "onbekend"; sourceCount[s] = (sourceCount[s] || 0) + 1; });
      setLeadSourceData(Object.entries(sourceCount).map(([source, count]) => ({ source, count })));

      // Pipeline funnel
      const stageOrder = ["new", "contacted", "qualified", "proposal", "won", "lost"];
      const stageLabels: Record<string, string> = { new: "Nieuw", contacted: "Gecontacteerd", qualified: "Gekwalificeerd", proposal: "Offerte", won: "Gewonnen", lost: "Verloren" };
      const stageCount: Record<string, number> = {};
      contacts.forEach((c) => { stageCount[c.pipeline_stage] = (stageCount[c.pipeline_stage] || 0) + 1; });
      setFunnelData(stageOrder.map((s) => ({ stage: stageLabels[s] || s, count: stageCount[s] || 0 })));

      // Top products
      const prodCount: Record<string, number> = {};
      items.forEach((i) => { prodCount[i.product_name] = (prodCount[i.product_name] || 0) + i.quantity; });
      setTopProducts(Object.entries(prodCount).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([name, sold]) => ({ name, sold })));

      setRecentActivities(activities);
      setLoading(false);
    };
    fetchAll();
  }, []);

  if (loading) return <AdminLayout><p className="text-muted-foreground">Laden…</p></AdminLayout>;

  const kpiCards = [
    { label: "Contacten", value: kpis.contacts, icon: Users },
    { label: "Totale omzet", value: `€${kpis.revenue.toFixed(2)}`, icon: TrendingUp },
    { label: "Bestellingen", value: kpis.orders, icon: ShoppingCart },
    { label: "Conversie", value: `${kpis.conversionRate}%`, icon: Target },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiCards.map((k) => (
            <Card key={k.label}>
              <CardContent className="flex items-center gap-3 p-4">
                <div className="p-2 rounded-md bg-muted"><k.icon className="h-5 w-5 text-muted-foreground" /></div>
                <div>
                  <p className="text-xs text-muted-foreground">{k.label}</p>
                  <p className="text-lg font-bold">{k.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart data={revenueData} />
          <OrderStatusChart data={orderStatusData} />
          <LeadSourceChart data={leadSourceData} />
          <PipelineFunnelChart data={funnelData} />
          <TopProductsChart data={topProducts} />
          <Card>
            <div className="p-4">
              <h3 className="text-sm font-semibold mb-4">Recente activiteiten</h3>
              <ActivityTimeline activities={recentActivities} />
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalyticsPage;
