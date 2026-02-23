import JsonLd, { faqSchema } from "@/components/JsonLd";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
  title?: string;
  className?: string;
}

const FAQSection = ({ faqs, title = "Veelgestelde vragen", className = "" }: FAQSectionProps) => (
  <section className={`bg-secondary ${className}`}>
    <JsonLd data={faqSchema(faqs)} />
    <div className="container py-14 sm:py-20 md:py-28 px-4 sm:px-6">
      <div className="text-center mb-8 sm:mb-12">
        <span className="inline-block text-accent font-medium text-xs uppercase tracking-widest mb-2">FAQ</span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">{title}</h2>
      </div>
      <div className="max-w-2xl mx-auto space-y-3 sm:space-y-4">
        {faqs.map((faq) => (
          <details key={faq.q} className="group bg-card rounded-xl border border-border shadow-sm">
            <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer font-semibold text-sm text-foreground list-none">
              {faq.q}
              <span className="text-accent group-open:rotate-45 transition-transform text-xl ml-2 shrink-0">+</span>
            </summary>
            <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-sm text-muted-foreground leading-relaxed">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </div>
  </section>
);

export default FAQSection;
