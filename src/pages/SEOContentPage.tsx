import { useParams, useLocation, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd, { faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import FAQSection from "@/components/FAQSection";

import AuthorBlock from "@/components/seo/AuthorBlock";
import PriceCalculator from "@/components/seo/PriceCalculator";
import InternalLinkBlock from "@/components/seo/InternalLinkBlock";
import TrustCTA from "@/components/seo/TrustCTA";
import { getSEOPageBySlug, type SEOPage } from "@/data/seoPages";
import NotFound from "@/pages/NotFound";

const SEOContentPage = () => {
  const location = useLocation();
  const slug = location.pathname.replace(/^\//, "").replace(/\/$/, "");
  const page = getSEOPageBySlug(slug);

  if (!page) return <NotFound />;

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    ...(page.parentSlug
      ? [{ label: "Composiet Schutting", href: `/${page.parentSlug}` }]
      : []),
    { label: page.title.split(":")[0].trim() },
  ];

  const jsonLdData: Record<string, unknown>[] = [
    breadcrumbSchema(
      breadcrumbItems.map((b) => ({
        name: b.label,
        url: (b as { href?: string }).href || `/${page.slug}`,
      }))
    ),
  ];

  if (page.faqs.length > 0) {
    jsonLdData.push(faqSchema(page.faqs));
  }

  if (page.schemaTypes.includes("Article")) {
    jsonLdData.push(
      articleSchema({
        title: page.title,
        excerpt: page.metaDescription,
        image: "https://schuttingvancomposiet.nl/favicon.ico",
        date: page.publishDate,
        slug: page.slug,
        author: page.author,
        updatedDate: page.updatedDate,
      })
    );
  }

  if (page.schemaTypes.includes("HowTo")) {
    const howToSection = page.sections.find((s) =>
      s.content.includes("### Stap 1")
    );
    if (howToSection) {
      jsonLdData.push({
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "Composiet schutting zelf plaatsen",
        description: "Stapsgewijze handleiding voor het plaatsen van een composiet schutting.",
        step: howToSection.content
          .split(/### Stap \d+: /)
          .filter((s) => s.trim())
          .map((s, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            name: s.split("\n")[0].trim(),
            text: s.split("\n").slice(1).join(" ").replace(/[#*\-]/g, "").trim().slice(0, 300),
          })),
      });
    }
  }

  const showCalculator = page.slug === "schutting-van-composiet" || page.slug === "composiet-schutting-prijs-per-meter";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title={page.metaTitle}
        description={page.metaDescription}
        canonical={`/${page.slug}`}
      />
      <JsonLd data={jsonLdData} />
      <Header />
      <Breadcrumbs items={breadcrumbItems} />

      <main className="flex-1">
        <article className="max-w-4xl mx-auto px-4 py-8">
          {/* H1 */}
          <h1 className="font-serif text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">
            {page.title}
          </h1>

          {/* Author / E-E-A-T block */}
          <AuthorBlock
            name={page.author.name}
            role={page.author.role}
            publishDate={page.publishDate}
            updatedDate={page.updatedDate}
            readingTime={page.readingTime}
          />

          {/* Intro */}
          <div className="prose prose-base max-w-none text-foreground prose-headings:text-foreground prose-strong:text-foreground prose-a:text-primary prose-p:leading-relaxed prose-p:mb-4 mb-8">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{page.intro}</ReactMarkdown>
          </div>

          {/* Table of Contents */}
          <nav className="bg-secondary/50 border border-border rounded-xl p-5 mb-8">
            <h2 className="font-serif font-bold text-foreground text-sm mb-3">Inhoud</h2>
            <ol className="space-y-1.5 text-sm list-decimal list-inside">
              {page.sections.map((s, i) => (
                <li key={i}>
                  <a
                    href={`#section-${i}`}
                    className="text-primary hover:underline"
                  >
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Sections */}
          {page.sections.map((section, i) => (
            <section key={i} id={`section-${i}`} className="mb-10">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4 border-b border-border pb-3">
                {section.heading}
              </h2>
              <div className="prose prose-base max-w-none text-foreground prose-headings:text-foreground prose-h3:text-xl prose-h3:font-serif prose-h3:font-bold prose-h3:mt-8 prose-h3:mb-3 prose-strong:text-foreground prose-a:text-primary prose-p:leading-relaxed prose-p:mb-4 prose-li:leading-relaxed prose-table:text-sm prose-th:bg-secondary prose-th:p-2 prose-th:text-left prose-td:p-2 prose-td:border-b prose-td:border-border">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{section.content}</ReactMarkdown>
              </div>
              {section.subsections?.map((sub, j) => (
                <div key={j} className="mt-6">
                  <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                    {sub.heading}
                  </h3>
                  <div className="prose prose-base max-w-none text-foreground prose-headings:text-foreground prose-strong:text-foreground prose-a:text-primary prose-p:leading-relaxed prose-p:mb-4 prose-li:leading-relaxed prose-table:text-sm prose-th:bg-secondary prose-th:p-2 prose-th:text-left prose-td:p-2 prose-td:border-b prose-td:border-border">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{sub.content}</ReactMarkdown>
                  </div>
                </div>
              ))}

              {/* Insert calculator after pricing section */}
              {showCalculator && section.heading.toLowerCase().includes("prijs") && (
                <div className="mt-8">
                  <PriceCalculator />
                </div>
              )}
            </section>
          ))}

          {/* Comparison table (if present) */}
          {page.comparisonTable && (
            <section className="mb-10">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4 border-b border-border pb-3">
                Vergelijkingstabel
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-secondary">
                      {page.comparisonTable.headers.map((h) => (
                        <th key={h} className="text-left p-3 font-semibold text-foreground border-b border-border">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {page.comparisonTable.rows.map((row) => (
                      <tr key={row.aspect} className="border-b border-border">
                        <td className="p-3 font-medium text-foreground">{row.aspect}</td>
                        <td className="p-3 text-foreground">{row.option1}</td>
                        <td className="p-3 text-muted-foreground">{row.option2}</td>
                        {row.option3 && <td className="p-3 text-muted-foreground">{row.option3}</td>}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Trust CTA */}
          <div className="mb-10">
            <TrustCTA />
          </div>

          {/* Internal links */}
          <div className="mb-10">
            <InternalLinkBlock links={page.internalLinks} />
          </div>
        </article>

        {/* FAQ Section */}
        {page.faqs.length > 0 && (
          <FAQSection
            faqs={page.faqs}
            title={`Veelgestelde vragen${page.type === "pillar" ? " over composiet schuttingen" : ""}`}
          />
        )}

      </main>
      <Footer />
    </div>
  );
};

export default SEOContentPage;
