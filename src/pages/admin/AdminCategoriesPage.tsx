import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

type Category = Tables<"cms_categories">;

const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editing, setEditing] = useState<Partial<Category> | null>(null);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    setLoading(true);
    const { data } = await supabase.from("cms_categories").select("*").order("sort_order");
    setCategories(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const generateSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleSave = async () => {
    if (!editing?.name || !editing?.slug) { toast.error("Naam en slug zijn verplicht"); return; }
    if (editing.id) {
      const { error } = await supabase.from("cms_categories").update(editing).eq("id", editing.id);
      if (error) { toast.error(error.message); return; }
    } else {
      const { error } = await supabase.from("cms_categories").insert({
        name: editing.name,
        slug: editing.slug,
        description: editing.description || null,
        seo_title: editing.seo_title || null,
        seo_description: editing.seo_description || null,
        sort_order: editing.sort_order ?? 0,
      });
      if (error) { toast.error(error.message); return; }
    }
    toast.success("Categorie opgeslagen");
    setEditing(null);
    fetch();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Categorie verwijderen?")) return;
    await supabase.from("cms_categories").delete().eq("id", id);
    fetch();
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-bold">Categorieën</h1>
        <Button onClick={() => setEditing({ name: "", slug: "", sort_order: 0 })}>
          <Plus className="h-4 w-4 mr-2" />Nieuwe categorie
        </Button>
      </div>

      {editing && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{editing.id ? "Bewerken" : "Nieuwe categorie"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Naam</Label>
                <Input value={editing.name || ""} onChange={(e) => {
                  const name = e.target.value;
                  setEditing((p) => ({ ...p, name, slug: !p?.id ? generateSlug(name) : p?.slug }));
                }} />
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input value={editing.slug || ""} onChange={(e) => setEditing((p) => ({ ...p, slug: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Beschrijving</Label>
              <Textarea rows={2} value={editing.description || ""} onChange={(e) => setEditing((p) => ({ ...p, description: e.target.value }))} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>SEO Titel</Label>
                <Input value={editing.seo_title || ""} onChange={(e) => setEditing((p) => ({ ...p, seo_title: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Sorteervolgorde</Label>
                <Input type="number" value={editing.sort_order ?? 0} onChange={(e) => setEditing((p) => ({ ...p, sort_order: parseInt(e.target.value) || 0 }))} />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave}><Save className="h-4 w-4 mr-2" />Opslaan</Button>
              <Button variant="ghost" onClick={() => setEditing(null)}><X className="h-4 w-4 mr-2" />Annuleren</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {loading ? <p className="text-muted-foreground">Laden…</p> : (
        <div className="rounded-lg border border-border overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Naam</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Volgorde</TableHead>
                <TableHead className="w-24"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell className="text-muted-foreground">{c.slug}</TableCell>
                  <TableCell>{c.sort_order}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => setEditing(c)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(c.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
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

export default AdminCategoriesPage;
