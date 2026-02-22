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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Diamond, ChevronRight, ChevronLeft, Plus, Minus, Settings2 } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { useIsMobile } from "@/hooks/use-mobile";

const DEFAULT_LENGTH = 600;

const MOBILE_STEPS = [
  { key: "shape", label: "Vorm" },
  { key: "ground", label: "Grond" },
  { key: "post", label: "Palen" },
  { key: "product", label: "Schutting" },
] as const;

const SEO_PROPS = {
  title: "SchuttingPlanner Pro | Schuttingvancomposiet.nl",
  description: "Ontwerp uw composiet schutting online met onze gratis planner.",
  canonical: "/schutting-planner",
} as const;

const FencePlannerPage = () => {
  const isMobile = useIsMobile();
  const [started, setStarted] = useState(false);
  const [designerStep, setDesignerStep] = useState(0);
  const [mobileStep, setMobileStep] = useState(0);

  const [shape, setShape] = useState<FenceShape>("straight");
  const [points, setPoints] = useState<Point[]>(getFencePoints("straight", DEFAULT_LENGTH));
  const [totalLength, setTotalLength] = useState(DEFAULT_LENGTH);
  const [groundConfigs, setGroundConfigs] = useState<GroundSegmentConfig[]>([{ segmentIndex: 0, type: "flat" }]);
  const [postType, setPostType] = useState<PostType>("inground");
  const [postColor, setPostColor] = useState<PostColor>("black");
  const [activeSegment, setActiveSegment] = useState(0);
  const [systemModalOpen, setSystemModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<SelectedProduct | null>(null);

  const segments = useMemo(() => getSegmentLabels(points), [points]);
  const computedTotalLength = useMemo(() => getTotalLength(points), [points]);

  const handleShapeChange = useCallback((newShape: FenceShape) => {
    setShape(newShape);
    setPoints(getFencePoints(newShape, totalLength));
    setActiveSegment(0);
  }, [totalLength]);

  const handlePointMove = useCallback((index: number, newPos: Point) => {
    setPoints((prev) => prev.map((p, i) => (i === index ? newPos : p)));
  }, []);

  const applyLength = useCallback((len: number) => {
    const clamped = Math.max(100, Math.min(5000, len));
    setTotalLength(clamped);
    setPoints(getFencePoints(shape, clamped));
  }, [shape]);

  const handleProductConfirm = useCallback((product: SelectedProduct) => {
    setSelectedProduct(product);
  }, []);

  if (!started) {
    return (
      <>
        <SEOHead {...SEO_PROPS} />
        <FencePlannerHero onStart={() => setStarted(true)} />
      </>
    );
  }

  if (designerStep >= 1) {
    return (
      <>
        <SEOHead {...SEO_PROPS} />
        <FenceDesignerView
          segments={segments}
          selectedProduct={selectedProduct}
          onBack={() => setDesignerStep(0)}
        />
      </>
    );
  }

  const statsRow = (
    <div className="grid grid-cols-3 gap-3">
      {[
        { value: computedTotalLength, unit: "cm totaal" },
        { value: segments.length, unit: `segment${segments.length !== 1 ? "en" : ""}` },
        { value: segments.length + 1, unit: "palen (est.)" },
      ].map(({ value, unit }) => (
        <div key={unit} className="bg-background border border-border rounded-xl px-3 py-3 text-center">
          <p className="text-xl font-bold text-foreground tabular-nums">{value}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{unit}</p>
        </div>
      ))}
    </div>
  );

  const lengthInput = (size: "sm" | "lg") => {
    const h = size === "lg" ? "h-11" : "h-9";
    const iconSize = size === "lg" ? "w-4 h-4" : "w-3.5 h-3.5";
    const textSize = size === "lg" ? "text-base" : "";
    return (
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className={`${h} w-${size === "lg" ? "11" : "9"} flex-shrink-0`}
          onClick={() => applyLength(totalLength - 50)}
        >
          <Minus className={iconSize} />
        </Button>
        <div className="relative flex-1">
          <Input
            type="number"
            value={totalLength}
            onChange={(e) => applyLength(parseInt(e.target.value) || DEFAULT_LENGTH)}
            className={`${h} ${textSize} text-center pr-8`}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
            cm
          </span>
        </div>
        <Button
          variant="outline"
          size="icon"
          className={`${h} w-${size === "lg" ? "11" : "9"} flex-shrink-0`}
          onClick={() => applyLength(totalLength + 50)}
        >
          <Plus className={iconSize} />
        </Button>
      </div>
    );
  };

  // ── MOBILE ──────────────────────────────────────────────────────────────────
  if (isMobile) {
    const stepContent = (() => {
      switch (mobileStep) {
        case 0:
          return (
            <div className="space-y-4">
              <FenceShapeSelector value={shape} onChange={handleShapeChange} />
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">Totale lengte</Label>
                {lengthInput("lg")}
              </div>
            </div>
          );
        case 1:
          return <GroundConfig segments={segments} configs={groundConfigs} onChange={setGroundConfigs} />;
        case 2:
          return (
            <PostModelSelector
              postType={postType}
              postColor={postColor}
              onTypeChange={setPostType}
              onColorChange={setPostColor}
            />
          );
        case 3:
          return (
            <div className="space-y-3">
              {selectedProduct && (
                <div className="p-3 bg-muted/40 border border-border rounded-lg flex items-center gap-3">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-16 h-12 object-cover rounded flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{selectedProduct.name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div
                        className="w-3 h-3 rounded-full border border-border"
                        style={{ backgroundColor: selectedProduct.colorHex }}
                      />
                      <span className="text-xs text-muted-foreground">geselecteerd</span>
                    </div>
                  </div>
                </div>
              )}
              {!selectedProduct && (
                <p className="text-sm text-muted-foreground py-2">
                  Nog geen schutting geselecteerd — dit is optioneel.
                </p>
              )}
              <Button
                variant="outline"
                className="w-full gap-2 h-11"
                onClick={() => setSystemModalOpen(true)}
              >
                <Settings2 className="w-4 h-4" />
                {selectedProduct ? "Schutting wijzigen" : "Schutting kiezen (optioneel)"}
              </Button>
            </div>
          );
        default:
          return null;
      }
    })();

    return (
      <>
        <SEOHead {...SEO_PROPS} />
        <div className="h-[100dvh] flex flex-col bg-background overflow-hidden">
          {/* Header */}
          <div className="border-b border-border px-4 py-3 flex-shrink-0">
            <div className="flex items-center gap-2 mb-3">
              <Diamond className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="font-serif font-bold text-sm flex-1">SchuttingPlanner Pro</span>
              <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                {computedTotalLength} cm
              </span>
            </div>
            <div className="flex gap-1.5">
              {MOBILE_STEPS.map((s, i) => (
                <button
                  key={s.key}
                  onClick={() => setMobileStep(i)}
                  className={`flex-1 py-2 rounded-lg text-[11px] font-medium transition-all leading-tight ${
                    mobileStep === i
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : i < mobileStep
                      ? "bg-primary/15 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <span className="block font-bold">{i + 1}</span>
                  <span className="block">{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Canvas preview — always visible */}
          <div className="px-4 pt-3 flex-shrink-0">
            <div className="bg-muted/20 rounded-xl border border-border h-[155px] overflow-hidden">
              <FenceCanvas
                points={points}
                activeSegment={activeSegment}
                onPointMove={handlePointMove}
                onSelectSegment={setActiveSegment}
              />
            </div>
          </div>

          {/* Step content */}
          <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2 min-h-0">
            {stepContent}
          </div>

          {/* Stats */}
          <div className="px-4 py-2 flex-shrink-0">
            {statsRow}
          </div>

          {/* Navigation */}
          <div className="px-4 pb-4 pt-2 flex gap-2 flex-shrink-0 border-t border-border bg-background">
            <Button
              variant="outline"
              className="flex-1 h-12 gap-1"
              onClick={() => {
                if (mobileStep > 0) setMobileStep(mobileStep - 1);
                else setStarted(false);
              }}
            >
              <ChevronLeft className="w-4 h-4" />
              {mobileStep === 0 ? "Terug" : "Vorige"}
            </Button>
            <Button
              className="flex-1 h-12 gap-1"
              onClick={() => {
                if (mobileStep < MOBILE_STEPS.length - 1) setMobileStep(mobileStep + 1);
                else setDesignerStep(1);
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

  // ── DESKTOP ─────────────────────────────────────────────────────────────────
  return (
    <>
      <SEOHead {...SEO_PROPS} />
      <div className="h-screen flex flex-col bg-muted/20 overflow-hidden">
        {/* App header bar */}
        <header className="h-14 border-b border-border bg-background flex items-center px-5 gap-3 flex-shrink-0 shadow-sm">
          <button
            onClick={() => setStarted(false)}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Terug
          </button>
          <div className="h-5 w-px bg-border" />
          <Diamond className="w-4 h-4 text-primary flex-shrink-0" />
          <span className="font-serif font-semibold text-base text-foreground">SchuttingPlanner Pro</span>

          <div className="ml-auto flex items-center gap-4">
            <p className="text-sm text-muted-foreground hidden md:block">
              <strong className="text-foreground font-semibold tabular-nums">{computedTotalLength}</strong> cm
              {" "}·{" "}
              <strong className="text-foreground font-semibold">{segments.length}</strong> segment{segments.length !== 1 ? "en" : ""}
            </p>
            <Button onClick={() => setDesignerStep(1)} className="gap-2 h-9 px-5">
              Panelen ontwerpen
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </header>

        {/* Body */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <aside className="w-[360px] min-w-[360px] border-r border-border bg-background overflow-y-auto flex-shrink-0">
            <div className="p-5 space-y-5">
              {/* Section 1: Shape */}
              <section className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center flex-shrink-0">
                    1
                  </span>
                  <h3 className="font-semibold text-sm text-foreground">Vorm & Afmetingen</h3>
                </div>
                <FenceShapeSelector value={shape} onChange={handleShapeChange} />
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">Totale lengte</Label>
                  {lengthInput("sm")}
                </div>
              </section>

              <div className="h-px bg-border" />

              {/* Section 2: Ground */}
              <section className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full border border-border bg-muted text-muted-foreground text-xs font-bold flex items-center justify-center flex-shrink-0">
                    2
                  </span>
                  <h3 className="font-semibold text-sm text-foreground">Ondergrond</h3>
                </div>
                <GroundConfig segments={segments} configs={groundConfigs} onChange={setGroundConfigs} />
              </section>

              <div className="h-px bg-border" />

              {/* Section 3: Posts */}
              <section className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full border border-border bg-muted text-muted-foreground text-xs font-bold flex items-center justify-center flex-shrink-0">
                    3
                  </span>
                  <h3 className="font-semibold text-sm text-foreground">Paalmodel</h3>
                </div>
                <PostModelSelector
                  postType={postType}
                  postColor={postColor}
                  onTypeChange={setPostType}
                  onColorChange={setPostColor}
                />
              </section>

              <div className="h-px bg-border" />

              {/* Section 4: Product */}
              <section className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full border border-border bg-muted text-muted-foreground text-xs font-bold flex items-center justify-center flex-shrink-0">
                    4
                  </span>
                  <h3 className="font-semibold text-sm text-foreground">Schutting systeem</h3>
                </div>

                {selectedProduct ? (
                  <div className="p-3 bg-muted/40 border border-border rounded-lg flex items-center gap-3">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-14 h-10 object-cover rounded flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{selectedProduct.name}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div
                          className="w-3 h-3 rounded-full border border-border flex-shrink-0"
                          style={{ backgroundColor: selectedProduct.colorHex }}
                        />
                        <span className="text-xs text-muted-foreground">geselecteerd</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSystemModalOpen(true)}
                      className="text-xs text-primary hover:underline flex-shrink-0 font-medium"
                    >
                      Wijzig
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setSystemModalOpen(true)}
                    className="w-full border-2 border-dashed border-border hover:border-primary/50 rounded-lg p-4 text-sm text-muted-foreground hover:text-foreground transition-all flex items-center justify-center gap-2 group"
                  >
                    <Settings2 className="w-4 h-4 group-hover:text-primary transition-colors" />
                    Schutting kiezen
                    <span className="text-xs opacity-60">(optioneel)</span>
                  </button>
                )}
              </section>
            </div>
          </aside>

          {/* Canvas area */}
          <main className="flex-1 flex flex-col items-center justify-center p-8 gap-5 overflow-hidden">
            <div className="w-full max-w-2xl flex flex-col gap-3">
              <FenceCanvas
                points={points}
                activeSegment={activeSegment}
                onPointMove={handlePointMove}
                onSelectSegment={setActiveSegment}
              />
              <p className="text-xs text-center text-muted-foreground">
                Sleep de punten om de vorm aan te passen · Klik op een segment om het te selecteren
              </p>
            </div>
            {statsRow}
          </main>
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
};

export default FencePlannerPage;
