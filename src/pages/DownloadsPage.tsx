import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import DownloadModal from "@/components/DownloadModal";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { downloads, categoryLabels, type DownloadGuide } from "@/data/downloads";
import { Download } from "lucide-react";

const faqs = [
  { q: "Zijn de gidsen echt gratis?", a: "Ja, alle gidsen en checklists zijn 100% gratis. Je ontvangt ze direct in je inbox na het invullen van je e-mailadres." },
  { q: "In welk formaat ontvang ik de gids?", a: "Alle gidsen worden als PDF geleverd, zodat je ze makkelijk kunt opslaan, printen of delen." },
  { q: "Kan ik de checklists uitprinten?", a: "Absoluut! Alle checklists zijn ontworpen om uitgeprint te worden, zodat je ze bij de hand hebt tijdens je project." },
  { q: "Hoe actueel is de informatie?", a: "Onze gidsen worden regelmatig bijgewerkt. De vergunningengids bevat de meest recente Nederlandse regelgeving." },
];

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Gratis Gidsen" },
];

const DownloadsPage = () => {
  const [selectedGuide, setSelectedGuide] = useState<DownloadGuide | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleDownload = (guide: DownloadGuide) => {
    setSelectedGuide(guide);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Gratis Gidsen & Checklists | Schuttingvancomposiet.nl"
        description="Download gratis checklists, vergelijkingen en gidsen over composiet schuttingen, vlonders en gevelbekleding. Van vergunningen tot onderhoud."
        canonical="/downloads"
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Gratis Gidsen & Checklists",
          description: "Gratis downloadbare gidsen over composiet producten",
          url: "https://schuttingvancomposiet.nl/downloads",
        }}
      />
      <Header />

      <main>
        {/* Hero */}
        <section className="bg-foreground text-background">
          <div className="container py-16 md:py-20">
            <div className="mb-6 text-background/60">
              <Breadcrumbs items={breadcrumbs} />
            </div>
            <h1 className="font-serif text-3xl md:text-5xl font-bold">
              Gratis Gidsen & Checklists
            </h1>
            <p className="text-background/70 mt-4 max-w-xl text-lg">
              Praktische PDF's vol tips, regels en checklists. Download gratis en start je composiet project goed voorbereid.
            </p>
          </div>
        </section>

        {/* Download Cards */}
        <section className="container py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {downloads.map((guide) => (
              <Card key={guide.id} className="flex flex-col justify-between hover:shadow-md transition-shadow">
                <CardContent className="pt-6 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <guide.icon className="w-5 h-5 text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {categoryLabels[guide.category]}
                    </Badge>
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {guide.description}
                  </p>
                  <ul className="space-y-1.5 mb-6 flex-1">
                    {guide.bulletPoints.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm">
                        <span className="text-primary mt-0.5">✓</span>
                        <span className="text-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => handleDownload(guide)}
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Gratis
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <FAQSection faqs={faqs} />
        <CTASection />
      </main>

      <Footer />
      <DownloadModal guide={selectedGuide} open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
};

export default DownloadsPage;
