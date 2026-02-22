import { GroundType, GroundSegmentConfig, SegmentInfo } from "./types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mountain, TrendingDown, Square } from "lucide-react";

interface GroundConfigProps {
  segments: SegmentInfo[];
  configs: GroundSegmentConfig[];
  onChange: (configs: GroundSegmentConfig[]) => void;
}

const groundTypes: { id: GroundType; label: string; icon: React.ReactNode }[] = [
  { id: "flat", label: "Vlak terrein", icon: <Square className="w-5 h-5" /> },
  { id: "linear-change", label: "Lineaire wijziging", icon: <TrendingDown className="w-5 h-5" /> },
  { id: "wall", label: "Muur invoegen", icon: <Mountain className="w-5 h-5" /> },
];

const GroundConfig = ({ segments, configs, onChange }: GroundConfigProps) => {
  const activeConfig = configs[0] || { segmentIndex: 0, type: "flat" as GroundType };

  const setType = (type: GroundType) => {
    const updated = [{ ...activeConfig, type }];
    onChange(updated);
  };

  const setSegmentIndex = (val: string) => {
    const updated = [{ ...activeConfig, segmentIndex: parseInt(val) }];
    onChange(updated);
  };

  const setDiffLevel = (val: string) => {
    const updated = [{ ...activeConfig, diffLevel: parseInt(val) || 0 }];
    onChange(updated);
  };

  const setWallHeight = (val: string) => {
    const updated = [{ ...activeConfig, wallHeight: parseInt(val) || 0 }];
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        {groundTypes.map((gt) => (
          <button
            key={gt.id}
            onClick={() => setType(gt.id)}
            className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border-2 transition-colors text-center ${
              activeConfig.type === gt.id
                ? "border-primary bg-primary/5 text-primary"
                : "border-border bg-background text-muted-foreground hover:border-primary/40"
            }`}
          >
            {gt.icon}
            <span className="text-[10px] font-medium leading-tight">{gt.label}</span>
          </button>
        ))}
      </div>

      {activeConfig.type !== "flat" && segments.length > 0 && (
        <div className="space-y-3 pt-2">
          <div>
            <Label className="text-xs text-muted-foreground">Segment</Label>
            <Select value={String(activeConfig.segmentIndex)} onValueChange={setSegmentIndex}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {segments.map((seg, i) => (
                  <SelectItem key={i} value={String(i)}>
                    {seg.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {activeConfig.type === "linear-change" && (
            <div>
              <Label className="text-xs text-muted-foreground">Diff. Niveau (cm)</Label>
              <Input
                type="number"
                className="mt-1"
                value={activeConfig.diffLevel || ""}
                onChange={(e) => setDiffLevel(e.target.value)}
                placeholder="0"
              />
            </div>
          )}

          {activeConfig.type === "wall" && (
            <div>
              <Label className="text-xs text-muted-foreground">Hoogte (cm)</Label>
              <Input
                type="number"
                className="mt-1"
                value={activeConfig.wallHeight || ""}
                onChange={(e) => setWallHeight(e.target.value)}
                placeholder="0"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GroundConfig;
