import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save } from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

type FeedSettings = Tables<"google_feed_settings">;

const AdminFeedPage = () => {
  const [settings, setSettings] = useState<Partial<FeedSettings>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("google_feed_settings").select("*").limit(1).maybeSingle();
      if (data) setSettings(data);
      setLoading(false);
    };
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    if (settings.id) {
      const { error } = await supabase.from("google_feed_settings").update(settings).eq("id", settings.id);
      if (error) toast.error(error.message);
      else toast.success("Instellingen opgeslagen");
    } else {
      const { error } = await supabase.from("google_feed_settings").insert({
        store_name: settings.store_name || "",
        store_url: settings.store_url || "",
        brand_name: settings.brand_name || "",
        currency: settings.currency || "EUR",
        shipping_country: settings.shipping_country || "NL",
        shipping_price: settings.shipping_price ?? 0,
      });
      if (error) toast.error(error.message);
      else toast.success("Instellingen aangemaakt");
    }
    setSaving(false);
  };

  const set = (key: string, value: unknown) => setSettings((prev) => ({ ...prev, [key]: value }));

  const feedUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/google-shopping-feed`;

  if (loading) return <AdminLayout><p className="text-muted-foreground">Laden…</p></AdminLayout>;

  return (
    <AdminLayout>
      <h1 className="font-serif text-2xl font-bold mb-6">Google Shopping Feed</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Feed Instellingen</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Winkelnaam</Label>
              <Input value={settings.store_name || ""} onChange={(e) => set("store_name", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Winkel URL</Label>
              <Input value={settings.store_url || ""} onChange={(e) => set("store_url", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Merknaam</Label>
              <Input value={settings.brand_name || ""} onChange={(e) => set("brand_name", e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Valuta</Label>
                <Input value={settings.currency || "EUR"} onChange={(e) => set("currency", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Verzendkosten</Label>
                <Input type="number" step="0.01" value={settings.shipping_price ?? 0} onChange={(e) => set("shipping_price", parseFloat(e.target.value) || 0)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Verzendland</Label>
              <Input value={settings.shipping_country || "NL"} onChange={(e) => set("shipping_country", e.target.value)} />
            </div>
            <Button onClick={handleSave} disabled={saving}>
              <Save className="h-4 w-4 mr-2" />{saving ? "Opslaan…" : "Opslaan"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Feed URL</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">Gebruik deze URL in Google Merchant Center:</p>
            <code className="block p-3 bg-muted rounded-md text-sm break-all">{feedUrl}</code>
            <Button variant="outline" onClick={() => { navigator.clipboard.writeText(feedUrl); toast.success("URL gekopieerd"); }}>
              Kopieer URL
            </Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminFeedPage;
