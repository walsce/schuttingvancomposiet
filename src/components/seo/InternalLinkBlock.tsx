import { Link } from "react-router-dom";

interface InternalLinksProps {
  links: { label: string; href: string }[];
  title?: string;
}

const InternalLinkBlock = ({ links, title = "Gerelateerde pagina's" }: InternalLinksProps) => (
  <nav className="bg-secondary/50 border border-border rounded-xl p-6" aria-label={title}>
    <h3 className="font-serif font-bold text-foreground mb-3">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {links.map((link) => (
        <Link
          key={link.href}
          to={link.href}
          className="inline-flex items-center text-sm bg-card border border-border rounded-lg px-3 py-1.5 text-primary hover:bg-primary/5 hover:border-primary/30 transition-colors"
        >
          {link.label} →
        </Link>
      ))}
    </div>
  </nav>
);

export default InternalLinkBlock;
