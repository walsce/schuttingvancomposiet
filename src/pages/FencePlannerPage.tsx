import { useState, useCallback, useMemo } from "react";
import { FenceShape, GroundSegmentConfig, PostType, PostColor, Point, SelectedProduct } from "@/components/fence-planner/types";
import { getFencePoints, getSegmentLabels, getTotalLength } from "@/components/fence-planner/fencePresets";
import FencePlannerHero from "@/components/fence-planner/FencePlannerHero";
import FenceCanvas from "@/components/fence-planner/FenceCanvas";
import FenceShapeSelector from "@/components/fence-planner/FenceShapeSelector";
import GroundConfig from "@/components/fence-planner/GroundConfig";
import PostModelSelector from "@/components/fence-planner/PostModelSelector";
import FenceSystemModal from "@/components/fence-planner/FenceSystemModal";
import FenceDesignerView from "@/components/fence-planner/FenceDesignerView";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Diamond, ChevronRight, ChevronLeft, Settings2, Eye, EyeOff } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { useIsMobile } from "@/hooks/use-mobile";

const DEFAULT_LENGTH = 600;
const MOBILE_STEPS = [
  { key: "shape", label: "Vorm" },
  { key: "ground", label: "Grond" },
  { key: "post", label: "Paal" },
  { key: "product", label: "Product" },
] as const;

const FencePlannerPage = () => {
  const isMobile = useIsMobile();
  const [started, setStarted] = useState(false);
  const [designerStep, setDesignerStep] = useState(0);

  // Mobile wizard step
  const [mobileStep, setMobileStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  // Fence state
  const [shape, setShape] = useState<FenceShape>("straight");
  const [points, setPoints] = useState<Point[]>(getFencePoints("straight", DEFAULT_LENGTH));
  const [totalLength, setTotalLength] = useState(DEFAULT_LENGTH);
  const [groundConfigs, setGroundConfigs] = useState<GroundSegmentConfig[]>([
    { segmentIndex: 0, type: "flat" },
  ]);
  const [postType, setPostType] = useState<PostType>("inground");
  const [postColor, setPostColor] = useState<PostColor>("black");
  const [activeSegment, setActiveSegment] = useState(0);

  // Product selection
  const [systemModalOpen, setSystemModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<SelectedProduct | null>(null);

  const segments = useMemo(() => getSegmentLabels(points), [points]);
  const computedTotalLength = useMemo(() => getTotalLength(points), [points]);

  const handleShapeChange = useCallback((newShape: FenceShape) => {
    setShape(newShape);
    const newPoints = getFencePoints(newShape, totalLength);
    setPoints(newPoints);
    setActiveSegment(0);
  }, [totalLength]);

  const handlePointMove = useCallback((index: number, newPos: Point) => {
    setPoints((prev) => prev.map((p, i) => (i === index ? newPos : p)));
  }, []);

  const handleTotalLengthChange = useCallback((val: string) => {
    const num = parseInt(val) || DEFAULT_LENGTH;
    setTotalLength(num);
    setPoints(getFencePoints(shape, num));
  }, [shape]);

  const handleProductConfirm = useCallback((product: SelectedProduct) => {
    setSelectedProduct(product);
  }, []);

  if (!started) {
    return (
      <>
        <SEOHead
          title="Schutting Planner | S van Composiet.nl"
          description="Ontwerp uw composiet schutting online met onze gratis planner."
          canonical="/schutting-planner"
        />
        <FencePlannerHero onStart={() => setStarted(true)} />
      </>
    );
  }

  // Designer view
  if (designerStep >= 1) {
    return (
      <>
        <SEOHead
          title="Schutting Planner | S van Composiet.nl"
          description="Ontwerp uw composiet schutting online met onze gratis planner."
          canonical="/schutting-planner"
        />
        <FenceDesignerView
          segments={segments}
          selectedProduct={selectedProduct}
          onBack={() => setDesignerStep(0)}
        />
      </>
    );
  }

  // Mobile wizard content per step
  const renderMobileStepContent = () => {
    switch (mobileStep) {
      case 0:
        return (
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-base flex items-center gap-2">
              <Diamond className="w-4 h-4 text-primary" />
              Vorm & Afmetingen
            </h3>
            <FenceShapeSelector value={shape} onChange={handleShapeChange} />
            <div>
              <Label className="text-sm text-muted-foreground">Totale lengte (cm)</Label>
              <Input
                type="number"
                value={totalLength}
                onChange={(e) => handleTotalLengthChange(e.target.value)}
                className="mt-1 h-12 text-base"
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-base flex items-center gap-2">
              <Diamond className="w-4 h-4 text-primary" />
              Grondconfiguratie
            </h3>
            <GroundConfig segments={segments} configs={groundConfigs} onChange={setGroundConfigs} />
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-base flex items-center gap-2">
              <Diamond className="w-4 h-4 text-primary" />
              Paalmodel
            </h3>
            <PostModelSelector
              postType={postType}
              postColor={postColor}
              onTypeChange={setPostType}
              onColorChange={setPostColor}
            />
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-base flex items-center gap-2">
              <Diamond className="w-4 h-4 text-primary" />
              Schutting kiezen
            </h3>
            {selectedProduct ? (
              <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg flex items-center gap-3">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-16 h-12 object-cover rounded" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{selectedProduct.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="w-4 h-4 rounded-full border border-border" style={{ backgroundColor: selectedProduct.colorHex }} />
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Nog geen schutting geselecteerd.</p>
            )}
            <Button variant="outline" className="w-full gap-2 h-12 text-base" onClick={() => setSystemModalOpen(true)}>
              <Settings2 className="w-5 h-5" />
              Schutting kiezen
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  // MOBILE LAYOUT
  if (isMobile) {
    return (
      <>
        <SEOHead
          title="Schutting Planner | S van Composiet.nl"
          description="Ontwerp uw composiet schutting online met onze gratis planner."
          canonical="/schutting-planner"
        />

        <div className="min-h-screen flex flex-col bg-muted/30">
          {/* Step indicator */}
          <div className="bg-background border-b border-border px-4 py-3">
            <div className="flex items-center gap-2 mb-3">
              <Diamond className="w-4 h-4 text-primary" />
              <span className="font-serif font-bold text-base">Schutting Planner</span>
            </div>
            <div className="flex gap-1">
              {MOBILE_STEPS.map((s, i) => (
                <button
                  key={s.key}
                  onClick={() => setMobileStep(i)}
                  className={`flex-1 text-center py-1.5 rounded-md text-xs font-medium transition-colors ${
                    mobileStep === i
                      ? "bg-primary text-primary-foreground"
                      : i < mobileStep
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Canvas preview toggle */}
          <div className="px-4 pt-3">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 text-xs text-muted-foreground"
            >
              {showPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              {showPreview ? "Verberg preview" : "Toon preview"}
            </button>
          </div>

          {showPreview && (
            <div className="px-4 pt-2">
              <div className="bg-background rounded-lg border border-border p-2 h-[200px] flex items-center justify-center">
                <FenceCanvas
                  points={points}
                  activeSegment={activeSegment}
                  onPointMove={handlePointMove}
                  onSelectSegment={setActiveSegment}
                />
              </div>
            </div>
          )}

          {/* Step content */}
          <div className="flex-1 px-4 py-4">
            {renderMobileStepContent()}
          </div>

          {/* Summary */}
          <div className="px-4 pb-2">
            <div className="p-2 bg-muted rounded-lg text-xs text-muted-foreground flex gap-4">
              <span>Lengte: <span className="font-semibold text-foreground">{computedTotalLength} cm</span></span>
              <span>Segmenten: <span className="font-semibold text-foreground">{segments.length}</span></span>
            </div>
          </div>

          {/* Navigation */}
          <div className="px-4 pb-4 pt-2 flex gap-3">
            <Button
              variant="outline"
              className="flex-1 h-12 text-base gap-1"
              onClick={() => {
                if (mobileStep > 0) setMobileStep(mobileStep - 1);
                else setStarted(false);
              }}
            >
              <ChevronLeft className="w-4 h-4" />
              Terug
            </Button>
            <Button
              className="flex-1 h-12 text-base gap-1"
              onClick={() => {
                if (mobileStep < MOBILE_STEPS.length - 1) {
                  setMobileStep(mobileStep + 1);
                } else {
                  setDesignerStep(1);
                }
              }}
            >
              {mobileStep < MOBILE_STEPS.length - 1 ? "Volgende" : "Ontwerpen"}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <FenceSystemModal
          open={systemModalOpen}
          onOpenChange={setSystemModalOpen}
          selectedProduct={selectedProduct}
          onConfirm={handleProductConfirm}
        />
      </>
    );
  }

  // DESKTOP LAYOUT
  return (
    <>
      <SEOHead
        title="Schutting Planner | S van Composiet.nl"
        description="Ontwerp uw composiet schutting online met onze gratis planner."
        canonical="/schutting-planner"
      />

      <div className="h-screen flex flex-col lg:flex-row bg-muted/30">
        {/* Sidebar */}
        <aside className="w-full lg:w-[340px] lg:min-w-[340px] bg-background border-r border-border overflow-y-auto p-4 lg:p-5 flex-shrink-0">
          <div className="flex items-center gap-2 mb-6">
            <Diamond className="w-5 h-5 text-primary" />
            <span className="font-serif font-bold text-lg text-foreground">Schutting Planner</span>
          </div>

          <Accordion type="multiple" defaultValue={["shape", "ground", "post", "system"]} className="space-y-1">
            <AccordionItem value="shape" className="border-none">
              <AccordionTrigger className="hover:no-underline py-3">
                <span className="flex items-center gap-2 font-serif font-bold text-sm">
                  <Diamond className="w-3 h-3 text-primary" />
                  Vorm & Afmetingen
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <FenceShapeSelector value={shape} onChange={handleShapeChange} />
                  <div>
                    <Label className="text-xs text-muted-foreground">Totale lengte (cm)</Label>
                    <Input
                      type="number"
                      value={totalLength}
                      onChange={(e) => handleTotalLengthChange(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="ground" className="border-none">
              <AccordionTrigger className="hover:no-underline py-3">
                <span className="flex items-center gap-2 font-serif font-bold text-sm">
                  <Diamond className="w-3 h-3 text-primary" />
                  Grondconfiguratie
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <GroundConfig segments={segments} configs={groundConfigs} onChange={setGroundConfigs} />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="post" className="border-none">
              <AccordionTrigger className="hover:no-underline py-3">
                <span className="flex items-center gap-2 font-serif font-bold text-sm">
                  <Diamond className="w-3 h-3 text-primary" />
                  Paalmodel
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <PostModelSelector
                  postType={postType}
                  postColor={postColor}
                  onTypeChange={setPostType}
                  onColorChange={setPostColor}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="system" className="border-none">
              <AccordionTrigger className="hover:no-underline py-3">
                <span className="flex items-center gap-2 font-serif font-bold text-sm">
                  <Diamond className="w-3 h-3 text-primary" />
                  Schutting
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  {selectedProduct ? (
                    <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg flex items-center gap-3">
                      <img src={selectedProduct.image} alt={selectedProduct.name} className="w-14 h-10 object-cover rounded" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{selectedProduct.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <div className="w-3 h-3 rounded-full border border-border" style={{ backgroundColor: selectedProduct.colorHex }} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Nog geen schutting geselecteerd.</p>
                  )}
                  <Button variant="outline" className="w-full gap-2" onClick={() => setSystemModalOpen(true)}>
                    <Settings2 className="w-4 h-4" />
                    Schutting kiezen
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-6 p-3 bg-muted rounded-lg text-sm space-y-1">
            <p className="text-muted-foreground">Totale lengte: <span className="font-semibold text-foreground">{computedTotalLength} cm</span></p>
            <p className="text-muted-foreground">Segmenten: <span className="font-semibold text-foreground">{segments.length}</span></p>
          </div>
        </aside>

        {/* Canvas area */}
        <main className="flex-1 flex flex-col relative">
          <div className="flex-1 p-4 lg:p-8 flex items-center justify-center">
            <FenceCanvas
              points={points}
              activeSegment={activeSegment}
              onPointMove={handlePointMove}
              onSelectSegment={setActiveSegment}
            />
          </div>

          <div className="absolute bottom-6 right-6 flex gap-3 z-50">
            <Button variant="outline" onClick={() => setStarted(false)} className="gap-1">
              <ChevronLeft className="w-4 h-4" />
              TERUG
            </Button>
            <Button onClick={() => setDesignerStep(1)} className="gap-1">
              VERDER
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </main>
      </div>

      <FenceSystemModal
        open={systemModalOpen}
        onOpenChange={setSystemModalOpen}
        selectedProduct={selectedProduct}
        onConfirm={handleProductConfirm}
      />
    </>
  );
};

export default FencePlannerPage;
