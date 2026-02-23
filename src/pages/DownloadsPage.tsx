import { useState } from "react";
import downloadsHero from "@/assets/downloads-hero.jpg";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import DownloadModal from "@/components/DownloadModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { downloads, categoryLabels, type DownloadGuide, type DownloadCategory } from "@/data/downloads";
import { Download, Play, FileText, Filter } from "lucide-react";

const faqs = [
  { q: "Zijn de handleidingen gratis?", a: "Ja, alle montagehandleidingen en gidsen zijn 100% gratis te downloaden of te bekijken." },
  { q: "In welk formaat zijn de handleidingen?", a: "Alle montagehandleidingen worden als PDF geleverd. Video's kun je direct op de pagina bekijken." },
  { q: "Kan ik de handleidingen uitprinten?", a: "Absoluut! Alle PDF's zijn ontworpen om uitgeprint te worden, zodat je ze bij de hand hebt tijdens je project." },
  { q: "Hoe actueel is de informatie?", a: "Onze handleidingen worden regelmatig bijgewerkt met de nieuwste installatietechnieken en productinformatie." },
];

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Documentatie & Handleidingen" },
];

const categoryFilters: { key: DownloadCategory | "all"; label: string }[] = [
  { key: "all", label: "Alles" },
  { key: "handleiding", label: "Montagehandleidingen" },
  { key: "onderhoud", label: "Onderhoud" },
  { key: "video", label: "Video's" },
  { key: "checklist", label: "Checklists" },
  { key: "gids", label: "Gidsen" },
];

const DownloadsPage = () => {
  const [selectedGuide, setSelectedGuide] = useState<DownloadGuide | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<DownloadCategory | "all">("all");

  const handleDownload = (guide: DownloadGuide) => {
    if (guide.pdfPath) {
      window.open(guide.pdfPath, "_blank");
      return;
    }
    if (guide.videoId) {
      window.open(`https://www.youtube.com/watch?v=${guide.videoId}`, "_blank");
      return;
    }
    setSelectedGuide(guide);
    setModalOpen(true);
  };

  const filtered = activeFilter === "all"
    ? downloads
    : downloads.filter((d) => d.category === activeFilter);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Documentatie & handleidingen | SchuttingenvanComposiet.nl"
        description="Download gratis montagehandleidingen, bekijk installatievideo's en lees onderhoudsgidsen voor composiet schuttingen, vlonders en gevelbekleding."
        canonical="/downloads"
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Documentatie & handleidingen",
          description: "Gratis montagehandleidingen, installatievideo's en onderhoudsgidsen voor composiet producten",
          url: "https://schuttingvancomposiet.nl/downloads",
        }}
      />
      <Header />

      <main>
        {/* Hero */}
        <section className="relative text-background overflow-hidden">
          <img src={downloadsHero} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/80 to-foreground/50" />
          <div className="container py-16 md:py-20 relative z-10">
            <div className="mb-6">
              <Breadcrumbs items={breadcrumbs} variant="dark" />
            </div>
            <h1 className="font-serif text-3xl md:text-5xl font-bold">
              Documentatie & handleidingen
            </h1>
            <p className="text-background/70 mt-4 max-w-xl text-lg">
              Montagehandleidingen, installatievideo's en onderhoudstips. Alles wat je nodig hebt voor een perfect composiet project.
            </p>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="container pt-10 pb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-muted-foreground mr-1" />
            {categoryFilters.map((f) => (
              <Button
                key={f.key}
                variant={activeFilter === f.key ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(f.key)}
                className="text-xs"
              >
                {f.label}
              </Button>
            ))}
          </div>
        </section>

        {/* Download Cards */}
        <section className="container pb-16 md:pb-24 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((guide) => (
              <div
                key={guide.id}
                className="group rounded-xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                {/* Image / Video thumbnail */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={guide.image}
                    alt={guide.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                  {guide.videoId && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-accent/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-accent-foreground ml-0.5" />
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <Badge variant="secondary" className="text-xs mb-2 bg-background/20 text-background border-none backdrop-blur-sm">
                      {categoryLabels[guide.category]}
                    </Badge>
                    <h3 className="font-serif text-lg font-bold text-background leading-snug">
                      {guide.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
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
                    {guide.pdfPath ? (
                      <>
                        <FileText className="w-4 h-4 mr-2" />
                        Download PDF
                      </>
                    ) : guide.videoId ? (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Bekijk Video
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Download Gratis
                      </>
                    )}
                  </Button>
                </div>
              </div>
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
