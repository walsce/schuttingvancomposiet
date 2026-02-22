import { useState, useMemo, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTASection from "@/components/CTASection";
import DeckCanvas from "@/components/planner/DeckCanvas";
import ShapeSelector from "@/components/planner/ShapeSelector";
import DimensionInputs from "@/components/planner/DimensionInputs";
import MaterialSelector from "@/components/planner/MaterialSelector";
import MaterialsList from "@/components/planner/MaterialsList";
import LeadCaptureModal from "@/components/planner/LeadCaptureModal";
import { PresetShape, Point } from "@/components/planner/types";
import { getPresetPoints, calcArea } from "@/components/planner/presets";
import { calcMaterials } from "@/components/planner/calcMaterials";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Ruler, Package, Mail, RotateCcw, Info } from "lucide-react";

const DeckPlannerPage = () => {
  // Shape state
  const [preset, setPreset] = useState<PresetShape>("rectangle");
  const [width, setWidth] = useState(5);
  const [depth, setDepth] = useState(3);
  const [cutWidth, setCutWidth] = useState(2);
  const [cutDepth, setCutDepth] = useState(1.5);
  const [customPoints, setCustomPoints] = useState<Point[] | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  // Lead capture
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  // Active step
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Compute shape points
  const points = useMemo(() => {
    if (customPoints) return customPoints;
    return getPresetPoints(preset, width, depth, cutWidth, cutDepth);
  }, [preset, width, depth, cutWidth, cutDepth, customPoints]);

  const areaM2 = useMemo(() => calcArea(points), [points]);

  const materialsList = useMemo(
    () => calcMaterials(areaM2, selectedProduct),
    [areaM2, selectedProduct]
  );

  const handlePresetChange = useCallback((p: PresetShape) => {
    setPreset(p);
    setCustomPoints(null);
  }, []);

  const handleDimensionChange = useCallback((field: string, value: number) => {
    setCustomPoints(null);
    switch (field) {
      case "width": setWidth(value); break;
      case "depth": setDepth(value); break;
      case "cutWidth": setCutWidth(value); break;
      case "cutDepth": setCutDepth(value); break;
    }
  }, []);

  const handlePointsChange = useCallback((pts: Point[]) => {
    setCustomPoints(pts);
  }, []);

  const handleReset = () => {
    setPreset("rectangle");
    setWidth(5);
    setDepth(3);
    setCutWidth(2);
    setCutDepth(1.5);
    setCustomPoints(null);
    setSelectedProduct(null);
    setUnlocked(false);
    setStep(1);
  };

  const handleShowResults = () => {
    if (unlocked) return;
    setShowLeadModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Vlonderplanner | Ontwerp je composiet terras | Schuttingvancomposiet.nl"
        description="Ontwerp je ideale composiet vlonder met onze gratis online planner. Kies je vorm, afmetingen en materiaal en ontvang direct een materiaallijst met prijsindicatie."
        canonical="/vlonder-planner"
      />
      <Header />
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Vlonderplanner" },
      ]} />

      <main className="flex-1">
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-4 pt-8 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <Badge variant="secondary" className="mb-2">Gratis tool</Badge>
              <h1 className="font-serif text-3xl lg:text-4xl font-bold text-foreground">
                Vlonderplanner
              </h1>
              <p className="text-muted-foreground mt-2 max-w-xl">
                Ontwerp je terras in 3 stappen: kies de vorm, stel de afmetingen in, kies je materiaal en ontvang een complete materiaallijst.
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={handleReset} className="self-start">
              <RotateCcw className="h-4 w-4 mr-1" /> Opnieuw beginnen
            </Button>
          </div>
        </section>

        {/* Steps indicator */}
        <section className="max-w-6xl mx-auto px-4 pb-6">
          <div className="flex gap-2">
            {[
              { n: 1, label: "Vorm & Afmetingen", icon: Ruler },
              { n: 2, label: "Materiaal kiezen", icon: Package },
              { n: 3, label: "Materiaallijst", icon: Mail },
            ].map(({ n, label, icon: Icon }) => (
              <button
                key={n}
                onClick={() => setStep(n as 1 | 2 | 3)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  step === n
                    ? "bg-primary text-primary-foreground"
                    : step > n
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{label}</span>
                <span className="sm:hidden">Stap {n}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Main content */}
        <section className="max-w-6xl mx-auto px-4 pb-16">
          <div className="grid lg:grid-cols-[1fr_340px] gap-8">
            {/* Canvas */}
            <div className="space-y-4">
              <DeckCanvas
                points={points}
                onPointsChange={handlePointsChange}
                editable={step === 1}
              />
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span>Versleep punten om de vorm aan te passen</span>
                </div>
                <div className="bg-secondary/60 px-3 py-1 rounded-md font-semibold text-foreground">
                  {areaM2.toFixed(1)} m²
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {step === 1 && (
                <>
                  <div>
                    <h2 className="font-serif text-lg font-bold text-foreground mb-3">Terrasvorm</h2>
                    <ShapeSelector value={preset} onChange={handlePresetChange} />
                  </div>
                  <div>
                    <h2 className="font-serif text-lg font-bold text-foreground mb-3">Afmetingen</h2>
                    <DimensionInputs
                      preset={preset}
                      width={width}
                      depth={depth}
                      cutWidth={cutWidth}
                      cutDepth={cutDepth}
                      onChange={handleDimensionChange}
                    />
                  </div>
                  <Button className="w-full" size="lg" onClick={() => setStep(2)}>
                    Verder naar materiaal
                  </Button>
                </>
              )}

              {step === 2 && (
                <>
                  <div>
                    <h2 className="font-serif text-lg font-bold text-foreground mb-3">Kies je vlonderplank</h2>
                    <MaterialSelector value={selectedProduct} onChange={setSelectedProduct} />
                  </div>
                  <Button
                    className="w-full"
                    size="lg"
                    disabled={!selectedProduct}
                    onClick={() => {
                      if (!unlocked) {
                        handleShowResults();
                      } else {
                        setStep(3);
                      }
                    }}
                  >
                    Bekijk materiaallijst
                  </Button>
                </>
              )}

              {step === 3 && unlocked && (
                <>
                  <MaterialsList lines={materialsList} areaM2={areaM2} />
                  <div className="flex flex-col gap-2">
                    <Button asChild size="lg" className="w-full">
                      <a href={`/contact?type=offerte&product=${selectedProduct}&area=${areaM2.toFixed(1)}`}>
                        Offerte aanvragen
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setStep(1)}>
                      Ontwerp aanpassen
                    </Button>
                  </div>
                </>
              )}

              {/* Info box */}
              <div className="bg-secondary/50 border border-border rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Deze planner geeft een indicatie van de benodigde materialen. Voor een exacte berekening kunt u altijd contact opnemen met onze specialisten.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </main>

      <Footer />

      <LeadCaptureModal
        open={showLeadModal}
        onClose={() => setShowLeadModal(false)}
        onSuccess={() => {
          setShowLeadModal(false);
          setUnlocked(true);
          setStep(3);
        }}
        shapePoints={points}
        selectedProduct={selectedProduct}
        areaM2={areaM2}
        materialsList={materialsList}
      />
    </div>
  );
};

export default DeckPlannerPage;
