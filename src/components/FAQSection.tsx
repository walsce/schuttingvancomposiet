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
  <section className={`bg-secondary/50 ${className}`}>
    <JsonLd data={faqSchema(faqs)} />
    <div className="container py-10 sm:py-16 md:py-24 px-4 sm:px-6">
      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground text-center mb-6 sm:mb-10">{title}</h2>
      <div className="max-w-2xl mx-auto space-y-3 sm:space-y-4">
        {faqs.map((faq) => (
          <details key={faq.q} className="group bg-card rounded-lg border border-border">
            <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer font-semibold text-sm text-foreground list-none">
              {faq.q}
              <span className="text-muted-foreground group-open:rotate-45 transition-transform text-xl ml-2 shrink-0">+</span>
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
