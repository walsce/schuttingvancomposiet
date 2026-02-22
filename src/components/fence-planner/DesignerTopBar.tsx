import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, LayoutGrid, Square, Box, Download, ChevronLeft } from "lucide-react";
import { ViewMode, SegmentInfo } from "./types";
import { useIsMobile } from "@/hooks/use-mobile";

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
}

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
}: DesignerTopBarProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="h-12 border-b border-border bg-background flex items-center justify-between px-2 sm:px-3 gap-2 sm:gap-3 flex-shrink-0">
      {/* Left */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        {isMobile && onBack && (
          <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0" onClick={onBack}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
        )}
        <Select
          value={String(activeSegmentIndex)}
          onValueChange={(v) => onSegmentChange(Number(v))}
        >
          <SelectTrigger className="h-8 w-[110px] sm:w-[140px] text-xs">
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
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          Rest: <span className="font-semibold text-foreground">{remainingLength} cm</span>
        </span>
      </div>

      {/* Center: View mode */}
      <div className="flex items-center gap-0.5 bg-muted rounded-md p-0.5">
        <Button variant={viewMode === "plan" ? "default" : "ghost"} size="icon" className="h-7 w-7" onClick={() => onViewModeChange("plan")} title="Plan">
          <LayoutGrid className="w-3.5 h-3.5" />
        </Button>
        <Button variant={viewMode === "2d" ? "default" : "ghost"} size="icon" className="h-7 w-7" onClick={() => onViewModeChange("2d")} title="2D">
          <Square className="w-3.5 h-3.5" />
        </Button>
        <Button variant={viewMode === "3d" ? "default" : "ghost"} size="icon" className="h-7 w-7" onClick={() => onViewModeChange("3d")} title="3D">
          <Box className="w-3.5 h-3.5" />
        </Button>
      </div>

      {/* Right: Zoom (hidden on mobile) + CSV */}
      <div className="flex items-center gap-1 sm:gap-2">
        {!isMobile && (
          <>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onZoomChange(Math.max(0.5, zoom - 0.1))}>
              <ZoomOut className="w-3.5 h-3.5" />
            </Button>
            <span className="text-xs text-muted-foreground w-10 text-center">{Math.round(zoom * 100)}%</span>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onZoomChange(Math.min(2, zoom + 0.1))}>
              <ZoomIn className="w-3.5 h-3.5" />
            </Button>
          </>
        )}
        <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs" onClick={onExportCsv} title="Exporteer als CSV">
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">CSV</span>
        </Button>
      </div>
    </div>
  );
};

export default DesignerTopBar;
