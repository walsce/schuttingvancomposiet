interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

const JsonLd = ({ data }: JsonLdProps) => {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
};

export default JsonLd;

// ── Schema helpers ──

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Schuttingvancomposiet.nl",
  url: "https://schuttingvancomposiet.nl",
  logo: "https://schuttingvancomposiet.nl/favicon.ico",
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@schuttingvancomposiet.nl",
    contactType: "customer service",
    availableLanguage: "Dutch",
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Schuttingvancomposiet.nl",
  url: "https://schuttingvancomposiet.nl",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://schuttingvancomposiet.nl/assortiment?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export const breadcrumbSchema = (
  items: { name: string; url: string }[]
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: item.url.startsWith("http") ? item.url : `https://schuttingvancomposiet.nl${item.url}`,
  })),
});

export const faqSchema = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
});

export const productSchema = (product: {
  name: string;
  description: string;
  image: string;
  price: number;
  slug: string;
  category: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  description: product.description,
  image: product.image,
  brand: { "@type": "Brand", name: "Schuttingvancomposiet.nl" },
  offers: {
    "@type": "Offer",
    price: product.price,
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
    url: `https://schuttingvancomposiet.nl/product/${product.slug}`,
  },
});

export const articleSchema = (article: {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  slug: string;
  author?: { name: string; role: string } | string;
  updatedDate?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: article.title,
  description: article.excerpt,
  image: article.image,
  datePublished: article.date,
  dateModified: article.updatedDate || article.date,
  author: {
    "@type": "Person",
    name: typeof article.author === "string" ? article.author : article.author?.name || "Schuttingvancomposiet.nl Redactie",
    ...(typeof article.author === "object" && article.author?.role ? { jobTitle: article.author.role } : {}),
  },
  publisher: {
    "@type": "Organization",
    name: "Schuttingvancomposiet.nl",
    logo: { "@type": "ImageObject", url: "https://schuttingvancomposiet.nl/favicon.ico" },
  },
  mainEntityOfPage: `https://schuttingvancomposiet.nl/blog/${article.slug}`,
});

export const howToSchema = (article: {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  content: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: article.title,
  description: article.excerpt,
  image: article.image,
  datePublished: article.date,
  step: article.content
    .split(/###\s+Stap\s+\d+:\s+/)
    .filter((s) => s.trim())
    .slice(0, 10)
    .map((s, i) => {
      const lines = s.trim().split("\n");
      return {
        "@type": "HowToStep",
        position: i + 1,
        name: lines[0].replace(/^#+\s*/, "").trim(),
        text: lines.slice(1).join(" ").replace(/[#*\-]/g, "").trim().slice(0, 300),
      };
    }),
});
