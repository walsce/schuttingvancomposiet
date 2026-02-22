import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Maximize, LayoutGrid, Square, Box } from "lucide-react";
import { ViewMode, SegmentInfo } from "./types";

interface DesignerTopBarProps {
  segments: SegmentInfo[];
  activeSegmentIndex: number;
  onSegmentChange: (index: number) => void;
  remainingLength: number;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  zoom: number;
  onZoomChange: (zoom: number) => void;
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
}: DesignerTopBarProps) => {
  return (
    <div className="h-12 border-b border-border bg-background flex items-center justify-between px-3 gap-3 flex-shrink-0">
      {/* Left: Segment selector */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground whitespace-nowrap">Pagina-selectie</span>
          <Select
            value={String(activeSegmentIndex)}
            onValueChange={(v) => onSegmentChange(Number(v))}
          >
            <SelectTrigger className="h-8 w-[140px] text-xs">
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
        </div>
        <div className="text-xs text-muted-foreground">
          Restlengte: <span className="font-semibold text-foreground">{remainingLength} cm</span>
        </div>
      </div>

      {/* Center: View mode */}
      <div className="flex items-center gap-1 bg-muted rounded-md p-0.5">
        <Button
          variant={viewMode === "plan" ? "default" : "ghost"}
          size="icon"
          className="h-7 w-7"
          onClick={() => onViewModeChange("plan")}
          title="Plan"
        >
          <LayoutGrid className="w-3.5 h-3.5" />
        </Button>
        <Button
          variant={viewMode === "2d" ? "default" : "ghost"}
          size="icon"
          className="h-7 w-7"
          onClick={() => onViewModeChange("2d")}
          title="2D"
        >
          <Square className="w-3.5 h-3.5" />
        </Button>
        <Button
          variant={viewMode === "3d" ? "default" : "ghost"}
          size="icon"
          className="h-7 w-7"
          onClick={() => onViewModeChange("3d")}
          title="3D"
        >
          <Box className="w-3.5 h-3.5" />
        </Button>
      </div>

      {/* Right: Zoom + status */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onZoomChange(Math.max(0.5, zoom - 0.1))}>
          <ZoomOut className="w-3.5 h-3.5" />
        </Button>
        <span className="text-xs text-muted-foreground w-10 text-center">{Math.round(zoom * 100)}%</span>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onZoomChange(Math.min(2, zoom + 0.1))}>
          <ZoomIn className="w-3.5 h-3.5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <Maximize className="w-3.5 h-3.5" />
        </Button>
        <span className="text-xs text-muted-foreground hidden md:block">Config-nr.: Niet opgeslagen</span>
      </div>
    </div>
  );
};

export default DesignerTopBar;
