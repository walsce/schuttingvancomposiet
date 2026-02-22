import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, Upload, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

type Product = Tables<"cms_products">;
type ProductImage = Tables<"cms_product_images">;
type ProductFaq = Tables<"cms_product_faqs">;

const emptyProduct: Partial<TablesInsert<"cms_products">> = {
  name: "",
  slug: "",
  price: 0,
  category: "vlonderplanken",
  short_description: "",
  long_description: "",
  seo_title: "",
  seo_description: "",
  is_published: false,
  highlights: [],
  features: [],
  specifications: {},
  guarantee: "",
  delivery_time: "",
  video_url: "",
  price_label: "",
  tone: null,
  durability: null,
  product_type: null,
  sort_order: 0,
};

const AdminProductEditPage = () => {
  const { id } = useParams();
  const isNew = id === "new";
  const navigate = useNavigate();

  const [product, setProduct] = useState<Partial<Product>>(emptyProduct);
  const [images, setImages] = useState<ProductImage[]>([]);
  const [faqs, setFaqs] = useState<ProductFaq[]>([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Tables<"cms_categories">[]>([]);

  // New FAQ fields
  const [newFaqQ, setNewFaqQ] = useState("");
  const [newFaqA, setNewFaqA] = useState("");

  useEffect(() => {
    supabase.from("cms_categories").select("*").order("sort_order").then(({ data }) => {
      setCategories(data ?? []);
    });

    if (!isNew && id) {
      const load = async () => {
        const { data: p } = await supabase.from("cms_products").select("*").eq("id", id).single();
        if (p) setProduct(p);
        const { data: imgs } = await supabase.from("cms_product_images").select("*").eq("product_id", id).order("sort_order");
        setImages(imgs ?? []);
        const { data: fqs } = await supabase.from("cms_product_faqs").select("*").eq("product_id", id).order("sort_order");
        setFaqs(fqs ?? []);
      };
      load();
    }
  }, [id, isNew]);

  const set = (key: string, value: unknown) => setProduct((prev) => ({ ...prev, [key]: value }));

  const generateSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleSave = async () => {
    if (!product.name || !product.slug) {
      toast.error("Naam en slug zijn verplicht");
      return;
    }
    setSaving(true);
    try {
      if (isNew) {
        const { data, error } = await supabase
          .from("cms_products")
          .insert({
            ...product,
            category: product.category as Product["category"],
          } as TablesInsert<"cms_products">)
          .select()
          .single();
        if (error) throw error;
        toast.success("Product aangemaakt");
        navigate(`/admin/products/${data.id}`, { replace: true });
      } else {
        const { error } = await supabase
          .from("cms_products")
          .update(product)
          .eq("id", id!);
        if (error) throw error;
        toast.success("Product opgeslagen");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Fout bij opslaan");
    }
    setSaving(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length || !id || isNew) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const path = `${id}/${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage.from("product-images").upload(path, file);
      if (upErr) { toast.error(upErr.message); continue; }
      const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(path);
      await supabase.from("cms_product_images").insert({
        product_id: id,
        image_url: urlData.publicUrl,
        alt_text: product.name || "",
        is_primary: images.length === 0,
        sort_order: images.length,
      });
    }
    // Refresh images
    const { data: imgs } = await supabase.from("cms_product_images").select("*").eq("product_id", id).order("sort_order");
    setImages(imgs ?? []);
    setUploading(false);
  };

  const handleDeleteImage = async (imgId: string) => {
    await supabase.from("cms_product_images").delete().eq("id", imgId);
    setImages((prev) => prev.filter((i) => i.id !== imgId));
  };

  const handleAddFaq = async () => {
    if (!newFaqQ || !newFaqA || !id || isNew) return;
    const { data, error } = await supabase.from("cms_product_faqs").insert({
      product_id: id,
      question: newFaqQ,
      answer: newFaqA,
      sort_order: faqs.length,
    }).select().single();
    if (error) { toast.error(error.message); return; }
    setFaqs((prev) => [...prev, data]);
    setNewFaqQ("");
    setNewFaqA("");
  };

  const handleDeleteFaq = async (faqId: string) => {
    await supabase.from("cms_product_faqs").delete().eq("id", faqId);
    setFaqs((prev) => prev.filter((f) => f.id !== faqId));
  };

  return (
    <AdminLayout>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/products")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="font-serif text-2xl font-bold">{isNew ? "Nieuw product" : "Product bewerken"}</h1>
        <div className="ml-auto">
          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />{saving ? "Opslaan…" : "Opslaan"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle>Algemeen</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Naam *</Label>
                  <Input value={product.name || ""} onChange={(e) => {
                    set("name", e.target.value);
                    if (isNew) set("slug", generateSlug(e.target.value));
                  }} />
                </div>
                <div className="space-y-2">
                  <Label>Slug *</Label>
                  <Input value={product.slug || ""} onChange={(e) => set("slug", e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Prijs</Label>
                  <Input type="number" step="0.01" value={product.price ?? 0} onChange={(e) => set("price", parseFloat(e.target.value) || 0)} />
                </div>
                <div className="space-y-2">
                  <Label>Prijs label</Label>
                  <Input value={product.price_label || ""} onChange={(e) => set("price_label", e.target.value)} placeholder="per m²" />
                </div>
                <div className="space-y-2">
                  <Label>Categorie *</Label>
                  <Select value={product.category || ""} onValueChange={(v) => set("category", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gevelbekleding">Gevelbekleding</SelectItem>
                      <SelectItem value="schuttingen">Schuttingen</SelectItem>
                      <SelectItem value="vlonderplanken">Vlonderplanken</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Toon</Label>
                  <Select value={product.tone || ""} onValueChange={(v) => set("tone", v || null)}>
                    <SelectTrigger><SelectValue placeholder="Geen" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="warm">Warm</SelectItem>
                      <SelectItem value="neutraal">Neutraal</SelectItem>
                      <SelectItem value="koel">Koel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Duurzaamheid</Label>
                  <Select value={product.durability || ""} onValueChange={(v) => set("durability", v || null)}>
                    <SelectTrigger><SelectValue placeholder="Geen" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basis">Basis</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="ultra">Ultra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Product type</Label>
                  <Select value={product.product_type || ""} onValueChange={(v) => set("product_type", v || null)}>
                    <SelectTrigger><SelectValue placeholder="Geen" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="massief">Massief</SelectItem>
                      <SelectItem value="holle-kamer">Holle kamer</SelectItem>
                      <SelectItem value="co-extrusie">Co-extrusie</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Korte beschrijving</Label>
                <Textarea rows={2} value={product.short_description || ""} onChange={(e) => set("short_description", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Uitgebreide beschrijving (Markdown)</Label>
                <Textarea rows={8} value={product.long_description || ""} onChange={(e) => set("long_description", e.target.value)} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Garantie</Label>
                  <Input value={product.guarantee || ""} onChange={(e) => set("guarantee", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Levertijd</Label>
                  <Input value={product.delivery_time || ""} onChange={(e) => set("delivery_time", e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Video URL</Label>
                <Input value={product.video_url || ""} onChange={(e) => set("video_url", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Highlights (komma-gescheiden)</Label>
                <Input
                  value={(product.highlights ?? []).join(", ")}
                  onChange={(e) => set("highlights", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
                />
              </div>
              <div className="space-y-2">
                <Label>Features (komma-gescheiden)</Label>
                <Input
                  value={(product.features ?? []).join(", ")}
                  onChange={(e) => set("features", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
                />
              </div>
            </CardContent>
          </Card>

          {/* SEO */}
          <Card>
            <CardHeader><CardTitle>SEO</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>SEO Titel</Label>
                <Input value={product.seo_title || ""} onChange={(e) => set("seo_title", e.target.value)} maxLength={60} />
                <p className="text-xs text-muted-foreground">{(product.seo_title || "").length}/60</p>
              </div>
              <div className="space-y-2">
                <Label>SEO Beschrijving</Label>
                <Textarea rows={2} value={product.seo_description || ""} onChange={(e) => set("seo_description", e.target.value)} maxLength={160} />
                <p className="text-xs text-muted-foreground">{(product.seo_description || "").length}/160</p>
              </div>
            </CardContent>
          </Card>

          {/* FAQs */}
          {!isNew && (
            <Card>
              <CardHeader><CardTitle>Veelgestelde vragen</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.id} className="flex items-start gap-2 border border-border rounded-md p-3">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{faq.question}</p>
                      <p className="text-sm text-muted-foreground mt-1">{faq.answer}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteFaq(faq.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
                <div className="space-y-2 border-t border-border pt-4">
                  <Input placeholder="Vraag" value={newFaqQ} onChange={(e) => setNewFaqQ(e.target.value)} />
                  <Textarea placeholder="Antwoord" rows={2} value={newFaqA} onChange={(e) => setNewFaqA(e.target.value)} />
                  <Button variant="outline" size="sm" onClick={handleAddFaq} disabled={!newFaqQ || !newFaqA}>
                    <Plus className="h-4 w-4 mr-1" />FAQ toevoegen
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Status</CardTitle></CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Switch
                  checked={product.is_published ?? false}
                  onCheckedChange={(v) => set("is_published", v)}
                />
                <Label>{product.is_published ? "Gepubliceerd" : "Concept"}</Label>
              </div>
              <div className="mt-4 space-y-2">
                <Label>Sorteervolgorde</Label>
                <Input type="number" value={product.sort_order ?? 0} onChange={(e) => set("sort_order", parseInt(e.target.value) || 0)} />
              </div>
            </CardContent>
          </Card>

          {/* Category link */}
          {categories.length > 0 && (
            <Card>
              <CardHeader><CardTitle>Categorie koppeling</CardTitle></CardHeader>
              <CardContent>
                <Select value={product.category_id || ""} onValueChange={(v) => set("category_id", v || null)}>
                  <SelectTrigger><SelectValue placeholder="Selecteer categorie" /></SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          )}

          {/* Images */}
          {!isNew && (
            <Card>
              <CardHeader><CardTitle>Afbeeldingen</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  {images.map((img) => (
                    <div key={img.id} className="relative group">
                      <img
                        src={img.image_url}
                        alt={img.alt_text || ""}
                        className="w-full h-24 object-cover rounded-md border border-border"
                      />
                      {img.is_primary && (
                        <span className="absolute top-1 left-1 bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded">
                          Primair
                        </span>
                      )}
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition"
                        onClick={() => handleDeleteImage(img.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
                <label className="flex items-center gap-2 cursor-pointer text-sm text-primary hover:underline">
                  <Upload className="h-4 w-4" />
                  {uploading ? "Uploaden…" : "Afbeeldingen uploaden"}
                  <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                </label>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProductEditPage;
