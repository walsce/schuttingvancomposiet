import { Link } from "react-router-dom";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  variant?: "default" | "dark";
}

const Breadcrumbs = ({ items, variant = "default" }: BreadcrumbsProps) => {
  const schemaItems = items.map((item) => ({
    name: item.label,
    url: item.href || "",
  }));

  const isDark = variant === "dark";

  return (
    <>
      <JsonLd data={breadcrumbSchema(schemaItems)} />
      <div className={isDark ? "" : "border-b border-border bg-card"}>
        <div className={`${isDark ? "" : "container"} py-3 flex items-center gap-2 text-sm ${isDark ? "text-background/60" : "text-muted-foreground"}`}>
          {items.map((item, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span>/</span>}
              {item.href ? (
                <Link to={item.href} className={`hover:text-accent transition-colors ${isDark ? "hover:text-background" : ""}`}>
                  {item.label}
                </Link>
              ) : (
                <span className={isDark ? "text-background" : "text-foreground"}>{item.label}</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default Breadcrumbs;
