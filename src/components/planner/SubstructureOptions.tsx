import { SubstructureConfig, UsageType, GroundType } from "./types";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface SubstructureOptionsProps {
  value: SubstructureConfig;
  onChange: (config: SubstructureConfig) => void;
}

const SubstructureOptions = ({ value, onChange }: SubstructureOptionsProps) => {
  return (
    <div className="space-y-4">
      {/* Usage type */}
      <div>
        <Label className="text-xs mb-1.5 block">Gebruik</Label>
        <div className="grid grid-cols-2 gap-2">
          {(["private", "commercial"] as UsageType[]).map((u) => (
            <button
              key={u}
              onClick={() => onChange({ ...value, usage: u })}
              className={`px-3 py-2 rounded-lg border-2 text-xs font-medium transition-all ${
                value.usage === u
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40"
              }`}
            >
              {u === "private" ? "Privégebruik" : "Commercieel"}
            </button>
          ))}
        </div>
      </div>

      {/* Ground type */}
      <div>
        <Label className="text-xs mb-1.5 block">Ondergrond</Label>
        <Select value={value.ground} onValueChange={(g) => onChange({ ...value, ground: g as GroundType })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="verdicht">Bodem verdicht</SelectItem>
            <SelectItem value="beton">Beton</SelectItem>
            <SelectItem value="tegels">Tegels</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Build height */}
      <div>
        <Label className="text-xs mb-1.5 block">Opbouwhoogte: {value.buildHeight} cm</Label>
        <Slider
          value={[value.buildHeight]}
          onValueChange={([v]) => onChange({ ...value, buildHeight: v })}
          min={3}
          max={30}
          step={1}
        />
        <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
          <span>3 cm</span>
          <span>30 cm</span>
        </div>
      </div>
    </div>
  );
};

export default SubstructureOptions;
