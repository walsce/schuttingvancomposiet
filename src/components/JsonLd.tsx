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
  name: "Composiethekwerk.nl",
  url: "https://composiethekwerk.nl",
  logo: "https://composiethekwerk.nl/favicon.ico",
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@composiethekwerk.nl",
    contactType: "customer service",
    availableLanguage: "Dutch",
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Composiethekwerk.nl",
  url: "https://composiethekwerk.nl",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://composiethekwerk.nl/assortiment?q={search_term_string}",
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
    item: item.url.startsWith("http") ? item.url : `https://composiethekwerk.nl${item.url}`,
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
  brand: { "@type": "Brand", name: "Composiethekwerk.nl" },
  offers: {
    "@type": "Offer",
    price: product.price,
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
    url: `https://composiethekwerk.nl/product/${product.slug}`,
  },
});

export const articleSchema = (article: {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  slug: string;
  author?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: article.title,
  description: article.excerpt,
  image: article.image,
  datePublished: article.date,
  dateModified: article.date,
  author: {
    "@type": "Person",
    name: article.author || "Composiethekwerk.nl Redactie",
  },
  publisher: {
    "@type": "Organization",
    name: "Composiethekwerk.nl",
    logo: { "@type": "ImageObject", url: "https://composiethekwerk.nl/favicon.ico" },
  },
  mainEntityOfPage: `https://composiethekwerk.nl/blog/${article.slug}`,
});
