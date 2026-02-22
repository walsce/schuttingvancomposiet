import { Link } from "react-router-dom";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  const schemaItems = items.map((item) => ({
    name: item.label,
    url: item.href || "",
  }));

  return (
    <>
      <JsonLd data={breadcrumbSchema(schemaItems)} />
      <div className="border-b border-border bg-card">
        <div className="container py-3 flex items-center gap-2 text-sm text-muted-foreground">
          {items.map((item, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span>/</span>}
              {item.href ? (
                <Link to={item.href} className="hover:text-accent transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground">{item.label}</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default Breadcrumbs;
