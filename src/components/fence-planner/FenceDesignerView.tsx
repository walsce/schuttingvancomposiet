import { useState, useCallback, useMemo, lazy, Suspense } from "react";
import { SegmentInfo, PlacedPanel, ViewMode, PanelStyleId, SelectedProduct } from "./types";
import { POST_WIDTH_CM, STANDARD_PANEL_WIDTH, toneColorMap } from "./designerData";
import { exportPanelConfigCsv } from "./exportCsv";
import DesignerTopBar from "./DesignerTopBar";
import BottomToolbar from "./BottomToolbar";
import PanelDesignerCanvas from "./PanelDesignerCanvas";
import PlanViewCanvas from "./PlanViewCanvas";
import { Loader2 } from "lucide-react";

const ThreeDViewCanvas = lazy(() => import("./ThreeDViewCanvas"));

interface FenceDesignerViewProps {
  segments: SegmentInfo[];
  selectedProduct: SelectedProduct | null;
  onBack: () => void;
}

const FenceDesignerView = ({
  segments,
  selectedProduct,
  onBack,
}: FenceDesignerViewProps) => {
  const [activeSegmentIndex, setActiveSegmentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>("2d");
  const [zoom, setZoom] = useState(1);
  const [placedPanels, setPlacedPanels] = useState<PlacedPanel[]>([]);
  const [panelStyle, setPanelStyle] = useState<PanelStyleId>("horizontal-planks");
  const [colorHex, setColorHex] = useState<string>(
    selectedProduct?.colorHex || toneColorMap.teak || "#A0785A"
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
  const canAddPanel = remainingLength >= POST_WIDTH_CM + 10;

  const handleAddPanel = useCallback(() => {
    if (!canAddPanel) return;
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
  }, [canAddPanel, remainingLength, panelStyle, colorHex, activeSegmentIndex, segmentPanels.length]);

  const handleRemovePanel = useCallback((id: string) => {
    setPlacedPanels((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const handleReorderPanels = useCallback((reordered: PlacedPanel[]) => {
    setPlacedPanels((prev) => {
      const otherSegments = prev.filter((p) => p.segmentIndex !== activeSegmentIndex);
      const updated = reordered.map((p, i) => ({ ...p, position: i }));
      return [...otherSegments, ...updated];
    });
  }, [activeSegmentIndex]);

  const handleResizePanel = useCallback((id: string, newWidthCm: number) => {
    setPlacedPanels((prev) =>
      prev.map((p) => (p.id === id ? { ...p, widthCm: newWidthCm } : p))
    );
  }, []);

  const handleExportCsv = useCallback(() => {
    exportPanelConfigCsv({ segments, placedPanels, productName: selectedProduct?.name || null });
  }, [segments, placedPanels, selectedProduct]);

  return (
    <div className="h-screen flex flex-col bg-muted/20 overflow-hidden">
      <DesignerTopBar
        segments={segments}
        activeSegmentIndex={activeSegmentIndex}
        onSegmentChange={setActiveSegmentIndex}
        remainingLength={Math.max(0, remainingLength)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        zoom={zoom}
        onZoomChange={setZoom}
        onExportCsv={handleExportCsv}
        onBack={onBack}
        onAddPanel={handleAddPanel}
        canAddPanel={canAddPanel}
      />

      {/* Canvas area */}
      <div className="flex-1 flex items-center justify-center overflow-hidden p-2 sm:p-4 lg:p-6">
        {viewMode === "2d" && activeSegment && (
          <PanelDesignerCanvas
            segmentLengthCm={activeSegment.lengthCm}
            segmentLabel={activeSegment.label}
            placedPanels={segmentPanels}
            onAddPanel={handleAddPanel}
            onRemovePanel={handleRemovePanel}
            onReorderPanels={handleReorderPanels}
            onResizePanel={handleResizePanel}
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
                <p className="text-sm font-medium">3D weergave laden…</p>
              </div>
            }
          >
            <ThreeDViewCanvas
              segmentLengthCm={activeSegment.lengthCm}
              segmentLabel={activeSegment.label}
              placedPanels={segmentPanels}
              onAddPanel={handleAddPanel}
              onRemovePanel={handleRemovePanel}
              onReorderPanels={handleReorderPanels}
            />
          </Suspense>
        )}
      </div>

      <BottomToolbar
        selectedProduct={selectedProduct}
        selectedPanelStyle={panelStyle}
        selectedColorHex={colorHex}
        onPanelStyleChange={setPanelStyle}
        onColorChange={setColorHex}
      />
    </div>
  );
};

export default FenceDesignerView;
