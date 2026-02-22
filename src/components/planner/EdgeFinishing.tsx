import { EdgeConfig } from "./types";
import { Label } from "@/components/ui/label";
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

      {/* Edge boards Ja/Nee toggle */}
      <div>
        <Label className="text-xs mb-1.5 block">Randplanken toevoegen</Label>
        <div className="grid grid-cols-2 gap-2">
          {[true, false].map((v) => (
            <button
              key={String(v)}
              onClick={() => onChange({ ...value, addEdgeBoards: v })}
              className={`px-3 py-2 rounded-lg border-2 text-xs font-medium transition-all ${
                value.addEdgeBoards === v
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40"
              }`}
            >
              {v ? "Ja" : "Nee"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EdgeFinishing;
