import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, LayoutGrid, Square, Box, Download, ChevronLeft, Plus } from "lucide-react";
import { ViewMode, SegmentInfo } from "./types";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface DesignerTopBarProps {
  segments: SegmentInfo[];
  activeSegmentIndex: number;
  onSegmentChange: (index: number) => void;
  remainingLength: number;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  onExportCsv?: () => void;
  onBack?: () => void;
  onAddPanel: () => void;
  canAddPanel: boolean;
}

const viewModes = [
  { id: "plan" as ViewMode, label: "Bovenaanzicht", shortLabel: "Top", Icon: LayoutGrid },
  { id: "2d" as ViewMode, label: "Aanzicht", shortLabel: "2D", Icon: Square },
  { id: "3d" as ViewMode, label: "3D weergave", shortLabel: "3D", Icon: Box },
] as const;

const DesignerTopBar = ({
  segments,
  activeSegmentIndex,
  onSegmentChange,
  remainingLength,
  viewMode,
  onViewModeChange,
  zoom,
  onZoomChange,
  onExportCsv,
  onBack,
  onAddPanel,
  canAddPanel,
}: DesignerTopBarProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="h-14 border-b border-border bg-background flex items-center px-3 gap-2 flex-shrink-0 shadow-sm">
      {/* Left: back + segment selector */}
      <div className="flex items-center gap-2 min-w-0 flex-shrink-0">
        {onBack && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 flex-shrink-0"
            onClick={onBack}
            title="Terug naar configuratie"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        )}
        <Select
          value={String(activeSegmentIndex)}
          onValueChange={(v) => onSegmentChange(Number(v))}
        >
          <SelectTrigger className="h-8 w-[130px] sm:w-[155px] text-xs font-medium">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {segments.map((seg, i) => (
              <SelectItem key={i} value={String(i)}>
                Segment {seg.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {remainingLength > 0 && (
          <span className="hidden sm:inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary whitespace-nowrap flex-shrink-0">
            {remainingLength} cm vrij
          </span>
        )}
      </div>

      {/* Center: view mode toggle */}
      <div className="flex items-center bg-muted rounded-lg p-0.5 mx-auto flex-shrink-0">
        {viewModes.map(({ id, label, shortLabel, Icon }) => {
          const isActive = viewMode === id;
          return (
            <button
              key={id}
              onClick={() => onViewModeChange(id)}
              title={label}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap",
                isActive
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="hidden md:inline">{label}</span>
              <span className="md:hidden">{shortLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Right: zoom + add panel + export */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        {!isMobile && (
          <div className="flex items-center gap-0.5 bg-muted rounded-lg p-0.5">
            <button
              className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-background transition-colors text-muted-foreground hover:text-foreground"
              onClick={() => onZoomChange(Math.max(0.5, zoom - 0.1))}
              title="Uitzoomen"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs text-muted-foreground w-10 text-center font-medium tabular-nums">
              {Math.round(zoom * 100)}%
            </span>
            <button
              className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-background transition-colors text-muted-foreground hover:text-foreground"
              onClick={() => onZoomChange(Math.min(2, zoom + 0.1))}
              title="Inzoomen"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <Button
          size="sm"
          className="h-8 gap-1.5 text-xs px-3"
          onClick={onAddPanel}
          disabled={!canAddPanel}
          title={canAddPanel ? "Paneel toevoegen aan segment" : "Geen ruimte meer voor een paneel"}
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Paneel</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-1 text-xs px-2"
          onClick={onExportCsv}
          title="Exporteer materiaallijst als CSV"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden lg:inline">CSV</span>
        </Button>
      </div>
    </div>
  );
};

export default DesignerTopBar;
