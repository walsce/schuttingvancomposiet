import { LayingPattern, LayingMethod, LayingConfig } from "./types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Minus, Plus } from "lucide-react";

interface LayingPatternSelectorProps {
  value: LayingConfig;
  onChange: (config: LayingConfig) => void;
  cornerCount: number;
}

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const directions: { id: LayingPattern; label: string; lines: { x1: number; y1: number; x2: number; y2: number }[] }[] = [
  {
    id: "horizontal",
    label: "Horizontaal",
    lines: Array.from({ length: 5 }, (_, i) => ({ x1: 2, y1: 3 + i * 2.5, x2: 18, y2: 3 + i * 2.5 })),
  },
  {
    id: "vertical",
    label: "Verticaal",
    lines: Array.from({ length: 6 }, (_, i) => ({ x1: 3 + i * 2.5, y1: 2, x2: 3 + i * 2.5, y2: 14 })),
  },
  {
    id: "diagonal",
    label: "Diagonaal ↗",
    lines: Array.from({ length: 7 }, (_, i) => ({ x1: -2 + i * 3.5, y1: 2, x2: 4 + i * 3.5, y2: 14 })),
  },
  {
    id: "diagonal-left",
    label: "Diagonaal ↖",
    lines: Array.from({ length: 7 }, (_, i) => ({ x1: 22 - i * 3.5, y1: 2, x2: 16 - i * 3.5, y2: 14 })),
  },
  {
    id: "chevron",
    label: "Visgraat",
    lines: [
      { x1: 10, y1: 2, x2: 2, y2: 8 }, { x1: 10, y1: 2, x2: 18, y2: 8 },
      { x1: 10, y1: 8, x2: 2, y2: 14 }, { x1: 10, y1: 8, x2: 18, y2: 14 },
    ],
  },
  {
    id: "mixed",
    label: "Gemengd",
    lines: [
      { x1: 2, y1: 4, x2: 10, y2: 4 }, { x1: 10, y1: 2, x2: 10, y2: 8 },
      { x1: 2, y1: 8, x2: 10, y2: 8 }, { x1: 10, y1: 8, x2: 10, y2: 14 },
      { x1: 2, y1: 12, x2: 10, y2: 12 }, { x1: 12, y1: 4, x2: 18, y2: 4 },
      { x1: 12, y1: 10, x2: 18, y2: 10 },
    ],
  },
];

const methods: { id: LayingMethod; label: string; rects: { x: number; y: number; w: number; h: number }[] }[] = [
  {
    id: "staggered",
    label: "Verspringend",
    rects: [
      { x: 1, y: 1, w: 8, h: 2.5 }, { x: 10, y: 1, w: 8, h: 2.5 },
      { x: 5, y: 4, w: 8, h: 2.5 }, { x: 14, y: 4, w: 5, h: 2.5 },
      { x: 1, y: 7, w: 8, h: 2.5 }, { x: 10, y: 7, w: 8, h: 2.5 },
      { x: 5, y: 10, w: 8, h: 2.5 }, { x: 14, y: 10, w: 5, h: 2.5 },
    ],
  },
  {
    id: "brick",
    label: "Half verband",
    rects: [
      { x: 1, y: 1, w: 9, h: 2.5 }, { x: 10.5, y: 1, w: 8.5, h: 2.5 },
      { x: 1, y: 4, w: 4.5, h: 2.5 }, { x: 6, y: 4, w: 9, h: 2.5 }, { x: 15.5, y: 4, w: 3.5, h: 2.5 },
      { x: 1, y: 7, w: 9, h: 2.5 }, { x: 10.5, y: 7, w: 8.5, h: 2.5 },
      { x: 1, y: 10, w: 4.5, h: 2.5 }, { x: 6, y: 10, w: 9, h: 2.5 }, { x: 15.5, y: 10, w: 3.5, h: 2.5 },
    ],
  },
  {
    id: "running",
    label: "Wild verband",
    rects: [
      { x: 1, y: 1, w: 6, h: 2.5 }, { x: 7.5, y: 1, w: 5, h: 2.5 }, { x: 13, y: 1, w: 6, h: 2.5 },
      { x: 1, y: 4, w: 8, h: 2.5 }, { x: 9.5, y: 4, w: 4, h: 2.5 }, { x: 14, y: 4, w: 5, h: 2.5 },
      { x: 1, y: 7, w: 5, h: 2.5 }, { x: 6.5, y: 7, w: 7, h: 2.5 }, { x: 14, y: 7, w: 5, h: 2.5 },
      { x: 1, y: 10, w: 7, h: 2.5 }, { x: 8.5, y: 10, w: 6, h: 2.5 }, { x: 15, y: 10, w: 4, h: 2.5 },
    ],
  },
];

const LayingPatternSelector = ({ value, onChange, cornerCount }: LayingPatternSelectorProps) => {
  return (
    <div className="space-y-5">
      {/* Laying methods */}
      <div>
        <Label className="text-xs mb-1.5 block">Legmethode</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {methods.map((m) => (
            <button
              key={m.id}
              onClick={() => onChange({ ...value, method: m.id })}
              className={`flex flex-col items-center gap-1.5 p-2 sm:p-3 rounded-xl border-2 transition-all ${
                value.method === m.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40"
              }`}
            >
              <svg viewBox="0 0 20 14" className="w-10 h-7">
                {m.rects.map((r, i) => (
                  <rect
                    key={i}
                    x={r.x} y={r.y} width={r.w} height={r.h} rx="0.3"
                    fill={value.method === m.id ? "hsl(var(--primary) / 0.2)" : "hsl(var(--muted))"}
                    stroke={value.method === m.id ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
                    strokeWidth="0.4"
                  />
                ))}
              </svg>
              <span className="text-[10px] font-medium">{m.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Laying directions */}
      <div>
        <Label className="text-xs mb-1.5 block">Legrichting</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {directions.map((p) => (
            <button
              key={p.id}
              onClick={() => onChange({ ...value, pattern: p.id })}
              className={`flex flex-col items-center gap-1.5 p-2 sm:p-3 rounded-xl border-2 transition-all ${
                value.pattern === p.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40"
              }`}
            >
              <svg viewBox="0 0 20 16" className="w-10 h-8">
                <rect x="1" y="1" width="18" height="14" rx="2" fill="none" stroke={value.pattern === p.id ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"} strokeWidth="0.8" />
                {p.lines.map((l, i) => (
                  <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                    stroke={value.pattern === p.id ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
                    strokeWidth="0.8"
                  />
                ))}
              </svg>
              <span className="text-[10px] font-medium leading-tight text-center">{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Angle */}
      <div>
        <Label className="text-xs mb-1.5 block">Hoek</Label>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 shrink-0"
            onClick={() => onChange({ ...value, angle: (value.angle ?? 0) - 5 })}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            className="text-center"
            value={value.angle ?? 0}
            onChange={(e) => onChange({ ...value, angle: parseFloat(e.target.value) || 0 })}
          />
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 shrink-0"
            onClick={() => onChange({ ...value, angle: (value.angle ?? 0) + 5 })}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Start point */}
      <div>
        <Label className="text-xs mb-1.5 block">Startpunt terrasbekleding</Label>
        <Select value={value.startPoint} onValueChange={(v) => onChange({ ...value, startPoint: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Selecteer startpunt" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: cornerCount }, (_, i) => (
              <SelectItem key={i} value={LETTERS[i]}>{`Punt ${LETTERS[i]}`}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Plank offset */}
      <div>
        <Label className="text-xs mb-1.5 block">Eerste plank positie</Label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-[10px] text-muted-foreground">Links/rechts (cm)</Label>
            <Input
              type="number"
              step="1"
              value={value.offsetX}
              onChange={(e) => onChange({ ...value, offsetX: parseFloat(e.target.value) || 0 })}
            />
          </div>
          <div>
            <Label className="text-[10px] text-muted-foreground">Boven/onder (cm)</Label>
            <Input
              type="number"
              step="1"
              value={value.offsetY}
              onChange={(e) => onChange({ ...value, offsetY: parseFloat(e.target.value) || 0 })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayingPatternSelector;
