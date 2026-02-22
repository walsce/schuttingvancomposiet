import { EdgeConfig } from "./types";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

interface EdgeFinishingProps {
  value: EdgeConfig;
  onChange: (config: EdgeConfig) => void;
  edgeCount: number;
}

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const EdgeFinishing = ({ value, onChange, edgeCount }: EdgeFinishingProps) => {
  const toggleWallSide = (i: number) => {
    const next = [...value.wallSides];
    next[i] = !next[i];
    onChange({ ...value, wallSides: next });
  };

  return (
    <div className="space-y-4">
      {/* Wall sides */}
      <div>
        <Label className="text-xs mb-2 block">Welke kanten grenzen aan een muur?</Label>
        <div className="space-y-1.5">
          {Array.from({ length: edgeCount }, (_, i) => {
            const a = LETTERS[i] || `P${i}`;
            const b = LETTERS[(i + 1) % edgeCount] || `P${(i + 1) % edgeCount}`;
            return (
              <label key={i} className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={value.wallSides[i] || false}
                  onCheckedChange={() => toggleWallSide(i)}
                />
                <span className="text-xs text-foreground">
                  Zijde {a}–{b}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Edge boards toggle */}
      <div className="flex items-center justify-between">
        <Label className="text-xs">Randplanken toevoegen</Label>
        <Switch
          checked={value.addEdgeBoards}
          onCheckedChange={(v) => onChange({ ...value, addEdgeBoards: v })}
        />
      </div>
    </div>
  );
};

export default EdgeFinishing;
