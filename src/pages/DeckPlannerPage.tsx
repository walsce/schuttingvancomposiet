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
import LayingPatternSelector from "@/components/planner/LayingPatternSelector";
import FloorPlanUpload from "@/components/planner/FloorPlanUpload";
import SubstructureOptions from "@/components/planner/SubstructureOptions";
import EdgeFinishing from "@/components/planner/EdgeFinishing";
import { PresetShape, Point, SubstructureConfig, EdgeConfig, LayingConfig } from "@/components/planner/types";
import { getPresetPoints, calcArea, dist } from "@/components/planner/presets";
import { calcMaterials } from "@/components/planner/calcMaterials";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RotateCcw, Info, Pencil } from "lucide-react";

const defaultSubstructure: SubstructureConfig = {
  usage: "private",
  ground: "verdicht",
  buildHeight: 5,
  beam: "alu-60x40-400",
  jointType: "dubbele-balken",
  doubleBeam: false,
  leveling: "none",
  slope: false,
};

const defaultLayingConfig: LayingConfig = {
  pattern: "horizontal",
  method: "staggered",
  startPoint: "A",
  offsetX: 0,
  offsetY: 0,
  angle: 0,
};

const DeckPlannerPage = () => {
  const [preset, setPreset] = useState<PresetShape>("rectangle");
  const [width, setWidth] = useState(5);
  const [depth, setDepth] = useState(3);
  const [cutWidth, setCutWidth] = useState(2);
  const [cutDepth, setCutDepth] = useState(1.5);
  const [customPoints, setCustomPoints] = useState<Point[] | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [layingConfig, setLayingConfig] = useState<LayingConfig>(defaultLayingConfig);
  const [substructure, setSubstructure] = useState<SubstructureConfig>(defaultSubstructure);
  const [edgeConfig, setEdgeConfig] = useState<EdgeConfig>({
    wallSides: [],
    addEdgeBoards: false,
  });

  const [showLeadModal, setShowLeadModal] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [freehandMode, setFreehandMode] = useState(false);
  const [floorPlanUrl, setFloorPlanUrl] = useState<string | null>(null);
  const [floorPlanOpacity, setFloorPlanOpacity] = useState(0.4);
  const [floorPlanScale, setFloorPlanScale] = useState(1);
  const [floorPlanOffsetX, setFloorPlanOffsetX] = useState(0);
  const [floorPlanOffsetY, setFloorPlanOffsetY] = useState(0);

  const points = useMemo(() => {
    if (customPoints) return customPoints;
    return getPresetPoints(preset, width, depth, cutWidth, cutDepth);
  }, [preset, width, depth, cutWidth, cutDepth, customPoints]);

  const areaM2 = useMemo(() => calcArea(points), [points]);

  const perimeterM = useMemo(() => {
    let p = 0;
    for (let i = 0; i < points.length; i++) {
      p += dist(points[i], points[(i + 1) % points.length]);
    }
    return p;
  }, [points]);

  const materialsList = useMemo(
    () => calcMaterials(areaM2, selectedProduct, layingConfig.pattern, substructure, edgeConfig, points.length, perimeterM),
    [areaM2, selectedProduct, layingConfig.pattern, substructure, edgeConfig, points.length, perimeterM]
  );

  const handlePresetChange = useCallback((p: PresetShape) => {
    setPreset(p);
    setCustomPoints(null);
    setEdgeConfig((prev) => ({ ...prev, wallSides: [] }));
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

  const handleFreehandComplete = useCallback((pts: Point[]) => {
    setCustomPoints(pts);
    setPreset("custom");
    setFreehandMode(false);
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
    setLayingConfig(defaultLayingConfig);
    setSubstructure(defaultSubstructure);
    setEdgeConfig({ wallSides: [], addEdgeBoards: false });
    setFloorPlanUrl(null);
    setFloorPlanOpacity(0.4);
    setFloorPlanScale(1);
    setFloorPlanOffsetX(0);
    setFloorPlanOffsetY(0);
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
        <section className="max-w-6xl mx-auto px-4 pt-8 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <Badge variant="secondary" className="mb-2">Gratis tool</Badge>
              <h1 className="font-serif text-3xl lg:text-4xl font-bold text-foreground">
                Vlonderplanner
              </h1>
              <p className="text-muted-foreground mt-2 max-w-xl">
                Ontwerp je terras: kies de vorm, afmetingen, materiaal en ontvang een complete materiaallijst.
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={handleReset} className="self-start">
              <RotateCcw className="h-4 w-4 mr-1" /> Opnieuw
            </Button>
          </div>
        </section>

        {/* Main content */}
        <section className="max-w-6xl mx-auto px-4 pb-16">
          <div className="grid lg:grid-cols-[1fr_360px] gap-8">
            {/* Canvas */}
            <div>
              <DeckCanvas
                points={points}
                onPointsChange={handlePointsChange}
                editable={true}
                layingPattern={layingConfig.pattern}
                layingMethod={layingConfig.method}
                layingAngle={layingConfig.angle}
                selectedProduct={selectedProduct}
                areaM2={areaM2}
                floorPlan={floorPlanUrl ? {
                  imageUrl: floorPlanUrl,
                  opacity: floorPlanOpacity,
                  scale: floorPlanScale,
                  offsetX: floorPlanOffsetX,
                  offsetY: floorPlanOffsetY,
                } : null}
                freehandMode={freehandMode}
                onFreehandComplete={handleFreehandComplete}
              />
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <span>{freehandMode ? "Teken een vorm op het canvas" : "Versleep hoekpunten · Klik op middelpunten"}</span>
                </div>
                <Button
                  variant={freehandMode ? "default" : "outline"}
                  size="sm"
                  className="text-xs h-7 gap-1"
                  onClick={() => setFreehandMode(!freehandMode)}
                >
                  <Pencil className="h-3 w-3" />
                  {freehandMode ? "Tekenen aan" : "Vrij tekenen"}
                </Button>
              </div>
            </div>

            {/* Accordion sidebar */}
            <div className="space-y-4">
              <Accordion type="multiple" defaultValue={["shape"]} className="space-y-2">
                {/* 1. Shape & dimensions */}
                <AccordionItem value="shape" className="border rounded-xl px-4">
                  <AccordionTrigger className="text-sm font-bold font-serif">Terrasvorm & afmetingen</AccordionTrigger>
                  <AccordionContent className="space-y-4 pb-4">
                    <ShapeSelector value={preset} onChange={handlePresetChange} />
                    <DimensionInputs
                      preset={preset}
                      width={width}
                      depth={depth}
                      cutWidth={cutWidth}
                      cutDepth={cutDepth}
                      onChange={handleDimensionChange}
                    />
                  </AccordionContent>
                </AccordionItem>

                {/* Floor plan import */}
                <AccordionItem value="floorplan" className="border rounded-xl px-4">
                  <AccordionTrigger className="text-sm font-bold font-serif">Plattegrond importeren</AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <FloorPlanUpload
                      imageUrl={floorPlanUrl}
                      opacity={floorPlanOpacity}
                      scale={floorPlanScale}
                      offsetX={floorPlanOffsetX}
                      offsetY={floorPlanOffsetY}
                      onImageChange={setFloorPlanUrl}
                      onOpacityChange={setFloorPlanOpacity}
                      onScaleChange={setFloorPlanScale}
                      onOffsetXChange={setFloorPlanOffsetX}
                      onOffsetYChange={setFloorPlanOffsetY}
                    />
                  </AccordionContent>
                </AccordionItem>

                {/* 2. Material */}
                <AccordionItem value="material" className="border rounded-xl px-4">
                  <AccordionTrigger className="text-sm font-bold font-serif">Keuze vlonderplank</AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <MaterialSelector value={selectedProduct} onChange={setSelectedProduct} />
                  </AccordionContent>
                </AccordionItem>

                {/* 3. Laying pattern & method */}
                <AccordionItem value="pattern" className="border rounded-xl px-4">
                  <AccordionTrigger className="text-sm font-bold font-serif">Legpatroon & richting</AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <LayingPatternSelector value={layingConfig} onChange={setLayingConfig} cornerCount={points.length} />
                  </AccordionContent>
                </AccordionItem>

                {/* 4. Substructure */}
                <AccordionItem value="substructure" className="border rounded-xl px-4">
                  <AccordionTrigger className="text-sm font-bold font-serif">Onderconstructie</AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <SubstructureOptions value={substructure} onChange={setSubstructure} />
                  </AccordionContent>
                </AccordionItem>

                {/* 5. Edge finishing */}
                <AccordionItem value="edge" className="border rounded-xl px-4">
                  <AccordionTrigger className="text-sm font-bold font-serif">Randafwerking</AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <EdgeFinishing value={edgeConfig} onChange={setEdgeConfig} edgeCount={points.length} />
                  </AccordionContent>
                </AccordionItem>

                {/* 6. Results */}
                <AccordionItem value="results" className="border rounded-xl px-4">
                  <AccordionTrigger className="text-sm font-bold font-serif">Materiaallijst & resultaat</AccordionTrigger>
                  <AccordionContent className="pb-4 space-y-4">
                    {unlocked ? (
                      <>
                        <MaterialsList lines={materialsList} areaM2={areaM2} />
                        <Button asChild size="lg" className="w-full">
                          <a href={`/contact?type=offerte&product=${selectedProduct}&area=${areaM2.toFixed(1)}`}>
                            Offerte aanvragen
                          </a>
                        </Button>
                      </>
                    ) : (
                      <div className="text-center space-y-3 py-4">
                        <p className="text-sm text-muted-foreground">
                          Vul je e-mail in om de complete materiaallijst met prijzen te bekijken.
                        </p>
                        <Button
                          size="lg"
                          className="w-full"
                          disabled={!selectedProduct}
                          onClick={() => setShowLeadModal(true)}
                        >
                          Bekijk materiaallijst
                        </Button>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

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
