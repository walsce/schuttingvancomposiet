import { Link } from "react-router-dom";
import { products, Product } from "@/data/products";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface VariantSelectorProps {
  product: Product;
}

const VariantSelector = ({ product }: VariantSelectorProps) => {
  if (!product.variantGroup) return null;

  const variants = products.filter(
    (p) => p.variantGroup === product.variantGroup
  );

  if (variants.length <= 1) return null;

  // Check if this group has width variants
  const widths = [...new Set(variants.map((v) => v.variantWidth).filter(Boolean))];
  const hasWidthVariants = widths.length > 1;

  // Get unique colors (by variantLabel) for current width, or all if no width variants
  const currentWidth = product.variantWidth;
  const colorVariants = hasWidthVariants
    ? variants.filter((v) => v.variantWidth === currentWidth)
    : variants;

  // Deduplicate by variantLabel for width selector
  const widthVariantsForCurrentColor = hasWidthVariants
    ? variants.filter((v) => v.variantLabel === product.variantLabel)
    : [];

  // Get unique color labels to avoid duplicate swatches
  const seenLabels = new Set<string>();
  const uniqueColorVariants = colorVariants.filter((v) => {
    if (seenLabels.has(v.variantLabel || '')) return false;
    seenLabels.add(v.variantLabel || '');
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Color swatches */}
      {uniqueColorVariants.length > 1 && (
        <div>
          <p className="text-sm font-semibold text-foreground mb-2">
            Kleur: <span className="font-normal text-muted-foreground">{product.variantLabel}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            <TooltipProvider delayDuration={200}>
              {uniqueColorVariants.map((v) => {
                const isActive = v.id === product.id;
                return (
                  <Tooltip key={v.id}>
                    <TooltipTrigger asChild>
                      <Link
                        to={`/product/${v.slug}`}
                        className={cn(
                          "w-9 h-9 rounded-full border-2 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                          isActive
                            ? "border-primary ring-2 ring-primary/30 scale-110"
                            : "border-border hover:border-primary/50"
                        )}
                        style={{ backgroundColor: v.variantColor || '#ccc' }}
                        aria-label={v.variantLabel || v.name}
                        aria-current={isActive ? "true" : undefined}
                      />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="text-xs">
                      {v.variantLabel}
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </TooltipProvider>
          </div>
        </div>
      )}

      {/* Width selector */}
      {hasWidthVariants && widthVariantsForCurrentColor.length > 1 && (
        <div>
          <p className="text-sm font-semibold text-foreground mb-2">
            Breedte: <span className="font-normal text-muted-foreground">{product.variantWidth}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {widthVariantsForCurrentColor.map((v) => {
              const isActive = v.id === product.id;
              return (
                <Link
                  key={v.id}
                  to={`/product/${v.slug}`}
                  className={cn(
                    "px-4 py-1.5 rounded-md border text-sm font-medium transition-colors",
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-accent"
                  )}
                  aria-current={isActive ? "true" : undefined}
                >
                  {v.variantWidth}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default VariantSelector;
