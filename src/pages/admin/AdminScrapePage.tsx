import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { AlertTriangle, Download, Upload, Loader2 } from "lucide-react";

const AdminScrapePage = () => {
  const [busy, setBusy] = useState<"scrape" | "import" | null>(null);
  const [log, setLog] = useState<string[]>([]);
  const [result, setResult] = useState<any>(null);

  const run = async (fn: "scrape-mthekwerken" | "import-mthekwerken-to-cms") => {
    setBusy(fn === "scrape-mthekwerken" ? "scrape" : "import");
    setResult(null);
    setLog((l) => [...l, `▶ ${fn} gestart…`]);
    try {
      const body = fn === "import-mthekwerken-to-cms" ? { confirm: "YES-WIPE-AND-IMPORT" } : {};
      const { data, error } = await supabase.functions.invoke(fn, { body });
      if (error) throw error;
      setResult(data);
      setLog((l) => [...l, `✓ ${fn} klaar`, ...(data?.log || [])]);
    } catch (e: any) {
      setLog((l) => [...l, `✗ ${fn}: ${e.message || String(e)}`]);
    } finally {
      setBusy(null);
    }
  };

  return (
    <AdminLayout>
      <h1 className="font-serif text-2xl font-bold mb-2">Catalogus Scrape & Import</h1>
      <p className="text-muted-foreground mb-6">
        Scrape composiet-producten van mthekwerken.nl en vervang de huidige catalogus.
      </p>

      <Alert variant="destructive" className="mb-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Destructieve actie</AlertTitle>
        <AlertDescription>
          De import wist <strong>alle</strong> huidige producten, categorieën, productafbeeldingen en FAQ's
          uit het CMS voordat de nieuwe data wordt geladen. Maak eerst een backup als je twijfelt.
          Daarnaast: 1-op-1 overnemen van teksten/foto's van mthekwerken.nl is juridisch risicovol
          (auteursrecht + duplicate content).
        </AlertDescription>
      </Alert>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <Card className="p-5">
          <h2 className="font-semibold mb-2 flex items-center gap-2"><Download className="h-4 w-4" /> Stap 1 — Scrape</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Haalt categorieën en alle productpagina's op via Firecrawl en slaat ze op in <code>scrape_staging</code>.
            Niet-destructief.
          </p>
          <Button onClick={() => run("scrape-mthekwerken")} disabled={!!busy}>
            {busy === "scrape" ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Download className="h-4 w-4 mr-2" />}
            Start scrape
          </Button>
        </Card>

        <Card className="p-5">
          <h2 className="font-semibold mb-2 flex items-center gap-2"><Upload className="h-4 w-4" /> Stap 2 — Import</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Wist huidige catalogus en zet staging om naar <code>cms_categories</code> / <code>cms_products</code> /
            <code> cms_product_images</code>. Downloadt foto's naar eigen storage.
          </p>
          <Button onClick={() => run("import-mthekwerken-to-cms")} disabled={!!busy} variant="destructive">
            {busy === "import" ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
            Wipe & import
          </Button>
        </Card>
      </div>

      {result && (
        <Card className="p-4 mb-4">
          <h3 className="font-semibold mb-2">Resultaat</h3>
          <pre className="text-xs bg-muted p-3 rounded overflow-auto">{JSON.stringify(result, null, 2)}</pre>
        </Card>
      )}

      {log.length > 0 && (
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Log</h3>
          <pre className="text-xs bg-muted p-3 rounded max-h-96 overflow-auto whitespace-pre-wrap">
            {log.join("\n")}
          </pre>
        </Card>
      )}
    </AdminLayout>
  );
};

export default AdminScrapePage;
