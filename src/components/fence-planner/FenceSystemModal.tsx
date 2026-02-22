import { useState } from "react";
import { SelectedProduct } from "./types";
import { products } from "@/data/products";
import { toneColorMap } from "./designerData";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const schuttingProducts = products.filter((p) => p.category === "schuttingen");

interface FenceSystemModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedProduct: SelectedProduct | null;
  onConfirm: (product: SelectedProduct) => void;
}

const FenceSystemModal = ({
  open,
  onOpenChange,
  selectedProduct: initProduct,
  onConfirm,
}: FenceSystemModalProps) => {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(initProduct?.slug || null);

  const handleConfirm = () => {
    const product = schuttingProducts.find((p) => p.slug === selectedSlug);
    if (!product) return;

    const colorHex = toneColorMap[product.tone] || "#8B4513";
    onConfirm({
      slug: product.slug,
      name: product.name,
      colorHex,
      image: product.image,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Schutting kiezen</DialogTitle>
          <DialogDescription>Kies een composiet schutting uit ons assortiment.</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
          {schuttingProducts.map((product) => {
            const isSelected = selectedSlug === product.slug;
            return (
              <button
                key={product.slug}
                onClick={() => setSelectedSlug(product.slug)}
                className={cn(
                  "relative rounded-lg border-2 overflow-hidden text-left transition-all",
                  isSelected
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-border hover:border-primary/40"
                )}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 z-10 bg-primary text-primary-foreground rounded-full p-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                )}
                <div className="aspect-[3/2] bg-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-2">
                  <p className="text-xs font-medium text-foreground leading-tight line-clamp-2">
                    {product.name}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs font-bold text-primary">{product.priceLabel}</span>
                    <div
                      className="w-4 h-4 rounded-full border border-border"
                      style={{ backgroundColor: toneColorMap[product.tone] || "#8B4513" }}
                      title={product.tone}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuleren
          </Button>
          <Button onClick={handleConfirm} disabled={!selectedSlug}>
            Product kiezen
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FenceSystemModal;
