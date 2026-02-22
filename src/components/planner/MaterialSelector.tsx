import { products } from "@/data/products";
import { useMemo } from "react";

interface MaterialSelectorProps {
  value: string | null;
  onChange: (slug: string) => void;
}

const MaterialSelector = ({ value, onChange }: MaterialSelectorProps) => {
  const deckProducts = useMemo(
    () => products.filter((p) => p.category === "vlonderplanken"),
    []
  );

  return (
    <div className="space-y-2">
      {deckProducts.map((p) => (
        <button
          key={p.slug}
          onClick={() => onChange(p.slug)}
          className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all text-left ${
            value === p.slug
              ? "border-primary bg-primary/5"
              : "border-border bg-card hover:border-primary/40"
          }`}
        >
          <img
            src={p.image}
            alt={p.name}
            className="w-14 h-14 object-contain rounded bg-muted flex-shrink-0"
          />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">{p.name}</p>
            <p className="text-xs text-muted-foreground">{p.priceLabel}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default MaterialSelector;
