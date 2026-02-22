import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  name: string;
  description: string;
  image: string;
  slug: string;
  productCount: number;
}

const CategoryCard = ({ name, description, image, slug, productCount }: CategoryCardProps) => (
  <Link
    to={`/categorie/${slug}`}
    className="group relative rounded-xl overflow-hidden aspect-[4/3] block"
  >
    <img
      src={image}
      alt={name}
      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 p-6">
      <span className="text-xs font-medium text-accent uppercase tracking-wider">{productCount} producten</span>
      <h3 className="font-serif text-xl font-bold text-card mt-1">{name}</h3>
      <p className="text-card/70 text-sm mt-1 line-clamp-2">{description}</p>
      <span className="inline-flex items-center gap-1 text-sm font-medium text-accent mt-3 group-hover:gap-2 transition-all">
        Bekijk collectie <ArrowRight className="w-4 h-4" />
      </span>
    </div>
  </Link>
);

export default CategoryCard;
