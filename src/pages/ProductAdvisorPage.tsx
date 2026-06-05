import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import JsonLd, { breadcrumbSchema, faqSchema } from "@/components/JsonLd";
import AuthorBlock from "@/components/seo/AuthorBlock";
import TrustCTA from "@/components/seo/TrustCTA";
import InternalLinkBlock from "@/components/seo/InternalLinkBlock";
import AdvisorQuiz from "@/components/advisor/AdvisorQuiz";
import { Link } from "react-router-dom";
import { categories } from "@/data/products";
import { ShieldCheck, Leaf, Ruler, Palette, Award, ClipboardCheck } from "lucide-react";

/* ── FAQ ──────────────────────────────────────── */

const faqs = [
  { q: "Hoe weet ik welk composiet product bij mij past?", a: "Gebruik onze keuzehulp hierboven. Op basis van uw project, budget en stijlvoorkeur adviseren wij het juiste product uit ons assortiment composiet vlonders, schuttingen, tuindeuren en gevelbekleding." },
  { q: "Kan ik composiet zelf monteren?", a: "Ja! Alle producten worden geleverd met uitgebreide montage-instructies. Met standaard gereedschap (accuboormachine, verstekzaag, waterpas) kunt u alles zelf installeren. Voor grotere projecten raden wij professionele plaatsing aan." },
  { q: "Wat is het verschil tussen standaard en naadloos massief?", a: "Standaard composiet wordt met clips gemonteerd waardoor een fijne voeg zichtbaar blijft. Naadloos massieve planken sluiten naadloos op elkaar aan en geven een strakker, eigentijds beeld — ideaal voor woonkamerterrassen en zwembaden." },
  { q: "Kan ik een gratis offerte aanvragen?", a: "Absoluut! Neem contact met ons op via de contactpagina of gebruik de TerrasDesigner of SchuttingPlanner om een gedetailleerde materiaallijst te genereren. Wij sturen u binnen 24 uur een vrijblijvende offerte." },
  { q: "Hoe lang gaat composiet mee?", a: "Onze WPC-composietproducten gaan minimaal 25 jaar mee bij normaal gebruik. Alle producten worden geleverd met 25 jaar productgarantie. Door de samenstelling van ~45% hout en ~45% PVC is het materiaal bestand tegen rot, schimmel en insecten." },
  { q: "Wat kost composiet per vierkante meter?", a: "Prijzen variëren per categorie en uitvoering. Vraag een persoonlijke offerte aan via de keuzehulp of contactpagina voor een actuele prijsindicatie op uw project." },
  { q: "Is composiet onderhoudsvrij?", a: "Composiet is nagenoeg onderhoudsvrij. U hoeft niet te schuren, oliën of beitsen zoals bij hout. Een jaarlijkse reiniging met water en een zachte borstel is voldoende om het materiaal er als nieuw uit te laten zien." },
  { q: "Welke kleuropties zijn beschikbaar?", a: "Het volledige assortiment is beschikbaar in zeven tinten: teak, eiken, walnoot, grijs, donker grijs, vergrijsd eiken en zwart. De Rhombus uitvoering geeft een extra moderne uitstraling." },
];

/* ── Internal links ──────────────────────────── */

const internalLinks = [
  { label: "Composiet vlonderplanken", href: "/categorie/vlonderplanken" },
  { label: "Composiet schuttingen", href: "/categorie/schuttingen" },
  { label: "TerrasDesigner", href: "/terras-designer" },
  { label: "SchuttingPlanner", href: "/schutting-planner" },
  { label: "Composiet schutting kopen", href: "/composiet-schutting" },
  { label: "Composiet vlonderplanken vergelijken", href: "/composiet-vlonderplanken" },
  { label: "Montagehandleidingen downloaden", href: "/downloads" },
  { label: "Blog & inspiratie", href: "/blog" },
  { label: "Contact & offerte", href: "/contact" },
];

/* ── Methodology steps ───────────────────────── */

const methodologySteps = [
  { icon: ClipboardCheck, title: "Projecttype bepalen", desc: "Vlonder, schutting of combinatie — elk project vraagt om andere materiaaleigenschappen." },
  { icon: Ruler, title: "Budget & afmetingen", desc: "Uw budget bepaalt welke productlijnen in aanmerking komen. Van instap tot premium." },
  { icon: Palette, title: "Uitstraling & kleur", desc: "Modern strak of warm natuurlijk — de juiste kleur en textuur maken het verschil." },
  { icon: ShieldCheck, title: "Gebruiksintensiteit", desc: "Gezinstuin, horeca of zwembad — elk gebruik vraagt om specifieke eigenschappen." },
];

/* ── Component ───────────────────────────────── */

const ProductAdvisorPage = () => {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Productadvies", url: "/productadvies" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Productadvies Composiet | Welk WPC past bij jou? | SchuttingvanComposiet.nl"
        description="Beantwoord 4 vragen en ontvang persoonlijk productadvies van composiet-specialisten. Gebaseerd op 500+ projecten. Gratis keuzehulp voor vlonderplanken & schuttingen."
        canonical="/productadvies"
      />
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          faqSchema(faqs),
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Composiet Productadviseur",
            description: "Interactieve keuzehulp voor WPC composiet vlonderplanken en schuttingen",
            url: "https://schuttingvancomposiet.nl/productadvies",
            applicationCategory: "DesignApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "EUR",
            },
            provider: {
              "@type": "Organization",
              name: "SchuttingvanComposiet.nl",
            },
          },
        ]}
      />
      <Header />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Productadvies" },
        ]}
      />

      <main>
        {/* ── Hero + Intro ── */}
        <section className="container py-8 sm:py-12 md:py-16 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-6">
              <span className="text-accent text-sm font-medium uppercase tracking-wider">
                Keuzehulp
              </span>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2">
                Welk composiet past bij jouw project?
              </h1>
              <p className="text-muted-foreground mt-3 leading-relaxed max-w-2xl mx-auto">
                Niet elk composiet is hetzelfde. De juiste keuze hangt af van uw project, budget, gewenste uitstraling en gebruiksintensiteit. Onze keuzehulp helpt u in 4 stappen naar het perfecte product.
              </p>
            </div>

            <AuthorBlock
              name="Daan Vermeulen"
              role="Composiet specialist · 12+ jaar ervaring"
              publishDate="2025-01-15"
              updatedDate="2026-03-20"
              readingTime="3 min"
            />
          </div>
        </section>

        {/* ── Expert context section ── */}
        <section className="bg-secondary/30">
          <div className="container py-10 sm:py-14 px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                Waarom een productadviseur gebruiken?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Met composiet vlonders, schuttingen, tuindeuren en gevelbekleding in zeven tinten en meerdere profielen is de juiste keuze niet altijd eenvoudig. Onze adviseur is gebaseerd op honderden afgeronde projecten in Nederland en België. We koppelen uw wensen aan de technische specificaties — van standaard composiet en naadloos massief tot het moderne Rhombus profiel.
              </p>

              <h3 className="font-serif text-xl font-bold text-foreground mb-4">
                Onze adviesmethodiek in 4 stappen
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {methodologySteps.map((step) => (
                  <div
                    key={step.title}
                    className="flex gap-3 p-4 bg-card rounded-xl border border-border"
                  >
                    <step.icon className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground text-sm">{step.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Quiz ── */}
        <section className="container py-10 sm:py-14 px-4 sm:px-6" id="keuzehulp">
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl font-bold text-foreground">
              Start de keuzehulp
            </h2>
            <p className="text-muted-foreground mt-2">
              Beantwoord de vragen en ontvang direct een persoonlijk productadvies.
            </p>
          </div>
          <AdvisorQuiz />
        </section>

        {/* ── Product lines overview ── */}
        <section className="bg-secondary/30">
          <div className="container py-10 sm:py-14 px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                Overzicht assortiment
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Alle composiet producten worden vervaardigd uit een combinatie van ~45% hout en ~45% PVC, aangevuld met UV-stabilisatoren en kleurpigmenten. Het verschil zit in de afwerking, het profiel en het toepassingsgebied.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 font-medium text-foreground">Categorie</th>
                      <th className="text-left py-3 px-2 font-medium text-foreground">Profiel</th>
                      <th className="text-left py-3 px-2 font-medium text-foreground">Geschikt voor</th>
                      <th className="text-left py-3 px-2 font-medium text-foreground">Tinten</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2.5 px-2 font-medium text-foreground">Vlonderplanken</td>
                      <td className="py-2.5 px-2">Standaard composiet</td>
                      <td className="py-2.5 px-2">Terrassen, balkons</td>
                      <td className="py-2.5 px-2">7 tinten</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2.5 px-2 font-medium text-foreground">Vlonderplanken</td>
                      <td className="py-2.5 px-2">Naadloos massief</td>
                      <td className="py-2.5 px-2">Luxe terras, zwembad</td>
                      <td className="py-2.5 px-2">5 tinten</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2.5 px-2 font-medium text-foreground">Schuttingen</td>
                      <td className="py-2.5 px-2">Dichte planken</td>
                      <td className="py-2.5 px-2">Privacy & windkering</td>
                      <td className="py-2.5 px-2">5 tinten</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2.5 px-2 font-medium text-foreground">Schuttingen</td>
                      <td className="py-2.5 px-2">Rhombus (horizontaal/verticaal)</td>
                      <td className="py-2.5 px-2">Modern, design</td>
                      <td className="py-2.5 px-2">5 tinten + combinaties</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2.5 px-2 font-medium text-foreground">Tuindeuren</td>
                      <td className="py-2.5 px-2">Dicht of Rhombus</td>
                      <td className="py-2.5 px-2">Doorgang in schutting</td>
                      <td className="py-2.5 px-2">5 tinten</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2.5 px-2 font-medium text-foreground">Gevelbekleding</td>
                      <td className="py-2.5 px-2">Rhombus profiel</td>
                      <td className="py-2.5 px-2">Bijgebouwen, gevels</td>
                      <td className="py-2.5 px-2">5 tinten + combinaties</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-2 font-medium text-foreground">Accessoires</td>
                      <td className="py-2.5 px-2">Profielen, palen, paalkappen</td>
                      <td className="py-2.5 px-2">Afwerking & bevestiging</td>
                      <td className="py-2.5 px-2">Aluminium / composiet</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ── Trust signals ── */}
        <section className="container py-10 sm:py-14 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="grid sm:grid-cols-3 gap-4 text-center">
              <div className="p-5 bg-card rounded-xl border border-border">
                <Award className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="font-medium text-foreground text-sm">25 jaar garantie</p>
                <p className="text-xs text-muted-foreground mt-1">Op alle productlijnen</p>
              </div>
              <div className="p-5 bg-card rounded-xl border border-border">
                <Leaf className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="font-medium text-foreground text-sm">100% recyclebaar</p>
                <p className="text-xs text-muted-foreground mt-1">Circulaire productie</p>
              </div>
              <div className="p-5 bg-card rounded-xl border border-border">
                <ShieldCheck className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="font-medium text-foreground text-sm">500+ projecten</p>
                <p className="text-xs text-muted-foreground mt-1">Ervaring in NL & BE</p>
              </div>
            </div>

            <TrustCTA
              title="Persoonlijk advies nodig?"
              primaryHref="/contact"
              primaryLabel="Gratis offerte aanvragen"
            />
          </div>
        </section>

        {/* ── Category cards ── */}
        <section className="bg-secondary/50">
          <div className="container py-12 sm:py-16 px-4 sm:px-6">
            <h2 className="font-serif text-2xl font-bold text-foreground text-center mb-8">
              Of bekijk direct per categorie
            </h2>
            <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/categorie/${cat.slug}`}
                  className="group rounded-xl overflow-hidden border border-border bg-card hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-serif font-bold text-background">{cat.name}</h3>
                      <p className="text-xs text-background/70 mt-0.5">{cat.productCount} producten</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Internal links ── */}
        <section className="container py-10 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <InternalLinkBlock links={internalLinks} title="Meer ontdekken" />
          </div>
        </section>

        {/* ── FAQ ── */}
        <FAQSection faqs={faqs} />
      </main>

      <Footer />
    </div>
  );
};

export default ProductAdvisorPage;
