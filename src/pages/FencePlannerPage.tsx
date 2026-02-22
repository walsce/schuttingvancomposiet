import { useState, useCallback, useMemo } from "react";
import { FenceShape, GroundSegmentConfig, PostType, PostColor, FenceSystem, Point } from "@/components/fence-planner/types";
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
import { Diamond, ChevronRight, ChevronLeft, Settings2 } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const DEFAULT_LENGTH = 600;

const FencePlannerPage = () => {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);

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

  // System modal
  const [systemModalOpen, setSystemModalOpen] = useState(false);
  const [selectedSystem, setSelectedSystem] = useState<FenceSystem | null>(null);
  const [selectedPanel, setSelectedPanel] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

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

  const handleSystemConfirm = useCallback(
    (system: FenceSystem, panel: string, color: string) => {
      setSelectedSystem(system);
      setSelectedPanel(panel);
      setSelectedColor(color);
    },
    []
  );

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

  // Step 1+: Designer view
  if (step >= 1) {
    return (
      <>
        <SEOHead
          title="Schutting Planner | S van Composiet.nl"
          description="Ontwerp uw composiet schutting online met onze gratis planner."
          canonical="/schutting-planner"
        />
        <FenceDesignerView
          segments={segments}
          selectedSystem={selectedSystem}
          selectedPanel={selectedPanel}
          selectedColor={selectedColor}
          onBack={() => setStep(0)}
        />
      </>
    );
  }

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
          {/* Logo area */}
          <div className="flex items-center gap-2 mb-6">
            <Diamond className="w-5 h-5 text-primary" />
            <span className="font-serif font-bold text-lg text-foreground">Hek Planner</span>
          </div>

          <Accordion type="multiple" defaultValue={["shape", "ground", "post", "system"]} className="space-y-1">
            {/* Shape */}
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

            {/* Ground */}
            <AccordionItem value="ground" className="border-none">
              <AccordionTrigger className="hover:no-underline py-3">
                <span className="flex items-center gap-2 font-serif font-bold text-sm">
                  <Diamond className="w-3 h-3 text-primary" />
                  Grondconfiguratie
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <GroundConfig
                  segments={segments}
                  configs={groundConfigs}
                  onChange={setGroundConfigs}
                />
              </AccordionContent>
            </AccordionItem>

            {/* Post */}
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

            {/* System */}
            <AccordionItem value="system" className="border-none">
              <AccordionTrigger className="hover:no-underline py-3">
                <span className="flex items-center gap-2 font-serif font-bold text-sm">
                  <Diamond className="w-3 h-3 text-primary" />
                  Schuttingsysteem
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  {selectedSystem ? (
                    <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg text-sm space-y-1">
                      <p className="font-medium text-foreground">Systeem: <span className="uppercase">{selectedSystem}</span></p>
                      {selectedPanel && <p className="text-muted-foreground">Paneel: {selectedPanel}</p>}
                      {selectedColor && <p className="text-muted-foreground">Kleur: {selectedColor}</p>}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Nog geen systeem geselecteerd.</p>
                  )}
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => setSystemModalOpen(true)}
                  >
                    <Settings2 className="w-4 h-4" />
                    Systeem kiezen
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Summary */}
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

          {/* Navigation buttons */}
          <div className="absolute bottom-6 right-6 flex gap-3 z-50">
            <Button
              variant="outline"
              onClick={() => setStep(Math.max(0, step - 1))}
              className="gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              TERUG
            </Button>
            <Button onClick={() => setStep(step + 1)} className="gap-1">
              VERDER
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </main>
      </div>

      <FenceSystemModal
        open={systemModalOpen}
        onOpenChange={setSystemModalOpen}
        selectedSystem={selectedSystem}
        selectedPanel={selectedPanel}
        selectedColor={selectedColor}
        onConfirm={handleSystemConfirm}
      />
    </>
  );
};

export default FencePlannerPage;
