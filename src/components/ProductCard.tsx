import { Product } from "@/data/products";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => (
  <Link
    to={`/product/${product.slug}`}
    className="group bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
  >
    <div className="aspect-[3/2] overflow-hidden bg-muted">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
    </div>
    <div className="p-2.5 sm:p-4">
      <h3 className="font-sans font-semibold text-xs sm:text-sm text-foreground leading-tight mb-1.5 sm:mb-2 line-clamp-2">
        {product.name}
      </h3>
      <div className="flex flex-wrap gap-1 mb-2 sm:mb-3 hidden sm:flex">
        {product.features.map((f) => (
          <Badge key={f} variant="secondary" className="text-xs font-normal">
            {f}
          </Badge>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs sm:text-sm font-bold text-primary">{product.priceLabel}</span>
        <span className="text-[10px] sm:text-xs text-muted-foreground hidden sm:inline">{product.guarantee}</span>
      </div>
    </div>
  </Link>
);

export default ProductCard;
