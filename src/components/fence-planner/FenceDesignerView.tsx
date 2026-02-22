import { useState, useCallback, useMemo, lazy, Suspense } from "react";
import { SegmentInfo, PlacedPanel, ViewMode, PanelStyleId, FenceSystem } from "./types";
import { POST_WIDTH_CM, STANDARD_PANEL_WIDTH, colorsByModel } from "./designerData";
import DesignerTopBar from "./DesignerTopBar";
import BottomToolbar from "./BottomToolbar";
import PanelDesignerCanvas from "./PanelDesignerCanvas";
import PlanViewCanvas from "./PlanViewCanvas";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2 } from "lucide-react";

const ThreeDViewCanvas = lazy(() => import("./ThreeDViewCanvas"));

interface FenceDesignerViewProps {
  segments: SegmentInfo[];
  selectedSystem: FenceSystem | null;
  selectedPanel: string | null;
  selectedColor: string | null;
  onBack: () => void;
}

const FenceDesignerView = ({
  segments,
  selectedSystem,
  selectedPanel: _,
  selectedColor: initialColor,
  onBack,
}: FenceDesignerViewProps) => {
  const [activeSegmentIndex, setActiveSegmentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>("2d");
  const [zoom, setZoom] = useState(1);
  const [placedPanels, setPlacedPanels] = useState<PlacedPanel[]>([]);
  const [model, setModel] = useState<FenceSystem | null>(selectedSystem);
  const [product, setProduct] = useState<string | null>(null);
  const [panelStyle, setPanelStyle] = useState<PanelStyleId>("horizontal-planks");
  const [colorHex, setColorHex] = useState<string>(
    initialColor || (selectedSystem ? colorsByModel[selectedSystem]?.[0]?.hex : "") || "#8B4513"
  );

  const activeSegment = segments[activeSegmentIndex] || segments[0];
  const segmentPanels = useMemo(
    () => placedPanels.filter((p) => p.segmentIndex === activeSegmentIndex),
    [placedPanels, activeSegmentIndex]
  );

  const usedLength = useMemo(() => {
    const panelsWidth = segmentPanels.reduce((sum, p) => sum + p.widthCm, 0);
    const postsCount = segmentPanels.length + 1;
    return panelsWidth + postsCount * POST_WIDTH_CM;
  }, [segmentPanels]);

  const remainingLength = activeSegment ? activeSegment.lengthCm - usedLength : 0;

  const handleAddPanel = useCallback(() => {
    if (remainingLength < POST_WIDTH_CM + 10) return;
    const panelWidth = Math.min(STANDARD_PANEL_WIDTH, remainingLength - POST_WIDTH_CM);
    if (panelWidth <= 0) return;

    const newPanel: PlacedPanel = {
      id: `panel-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      panelStyleId: panelStyle,
      colorHex,
      widthCm: panelWidth,
      segmentIndex: activeSegmentIndex,
      position: segmentPanels.length,
    };
    setPlacedPanels((prev) => [...prev, newPanel]);
  }, [remainingLength, panelStyle, colorHex, activeSegmentIndex, segmentPanels.length]);

  const handleRemovePanel = useCallback((id: string) => {
    setPlacedPanels((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <div className="h-screen flex flex-col bg-muted/30">
      <DesignerTopBar
        segments={segments}
        activeSegmentIndex={activeSegmentIndex}
        onSegmentChange={setActiveSegmentIndex}
        remainingLength={Math.max(0, remainingLength)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        zoom={zoom}
        onZoomChange={setZoom}
      />

      <div className="flex-1 flex relative overflow-hidden">
        {/* Left: back button */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
          <Button
            variant="default"
            size="sm"
            className="rounded-l-none rounded-r-md h-20 w-8 px-0"
            onClick={onBack}
            title="Terug naar configuratie"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        </div>

        {/* Canvas */}
        <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
          {viewMode === "2d" && activeSegment && (
            <PanelDesignerCanvas
              segmentLengthCm={activeSegment.lengthCm}
              segmentLabel={activeSegment.label}
              placedPanels={segmentPanels}
              onAddPanel={handleAddPanel}
              onRemovePanel={handleRemovePanel}
              zoom={zoom}
            />
          )}
          {viewMode === "plan" && activeSegment && (
            <PlanViewCanvas
              segmentLengthCm={activeSegment.lengthCm}
              segmentLabel={activeSegment.label}
              placedPanels={segmentPanels}
              zoom={zoom}
            />
          )}
          {viewMode === "3d" && activeSegment && (
            <Suspense
              fallback={
                <div className="flex flex-col items-center justify-center gap-3 text-muted-foreground">
                  <Loader2 className="w-8 h-8 animate-spin" />
                  <p className="text-sm">3D weergave laden...</p>
                </div>
              }
            >
              <ThreeDViewCanvas
                segmentLengthCm={activeSegment.lengthCm}
                segmentLabel={activeSegment.label}
                placedPanels={segmentPanels}
              />
            </Suspense>
          )}
        </div>
      </div>

      <BottomToolbar
        selectedModel={model}
        selectedProduct={product}
        selectedPanelStyle={panelStyle}
        selectedColorHex={colorHex}
        onModelChange={setModel}
        onProductChange={setProduct}
        onPanelStyleChange={setPanelStyle}
        onColorChange={setColorHex}
      />
    </div>
  );
};

export default FenceDesignerView;
