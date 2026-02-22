import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PresetShape } from "./types";

interface DimensionInputsProps {
  preset: PresetShape;
  width: number;
  depth: number;
  cutWidth: number;
  cutDepth: number;
  onChange: (field: string, value: number) => void;
}

const DimensionInputs = ({ preset, width, depth, cutWidth, cutDepth, onChange }: DimensionInputsProps) => {
  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value) || 0;
    onChange(field, Math.max(0.1, Math.min(50, v)));
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="dim-w" className="text-xs">Breedte (m)</Label>
          <Input id="dim-w" type="number" step="0.1" min="0.5" max="50" value={width} onChange={handleChange("width")} />
        </div>
        <div>
          <Label htmlFor="dim-d" className="text-xs">Diepte (m)</Label>
          <Input id="dim-d" type="number" step="0.1" min="0.5" max="50" value={depth} onChange={handleChange("depth")} />
        </div>
      </div>

      {(preset === "l-shape" || preset === "l-shape-left" || preset === "l-shape-bottom-right" || preset === "l-shape-bottom-left" || preset === "u-shape" || preset === "t-shape") && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="dim-cw" className="text-xs">Uitsnede breedte (m)</Label>
            <Input id="dim-cw" type="number" step="0.1" min="0.1" max={width - 0.1} value={cutWidth} onChange={handleChange("cutWidth")} />
          </div>
          <div>
            <Label htmlFor="dim-cd" className="text-xs">Uitsnede diepte (m)</Label>
            <Input id="dim-cd" type="number" step="0.1" min="0.1" max={depth - 0.1} value={cutDepth} onChange={handleChange("cutDepth")} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DimensionInputs;
