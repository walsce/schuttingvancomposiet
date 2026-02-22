import { LayingPattern } from "./types";

interface LayingPatternSelectorProps {
  value: LayingPattern;
  onChange: (pattern: LayingPattern) => void;
}

const patterns: { id: LayingPattern; label: string; lines: { x1: number; y1: number; x2: number; y2: number }[] }[] = [
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
    label: "Diagonaal",
    lines: Array.from({ length: 7 }, (_, i) => ({ x1: -2 + i * 3.5, y1: 2, x2: 4 + i * 3.5, y2: 14 })),
  },
];

const LayingPatternSelector = ({ value, onChange }: LayingPatternSelectorProps) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {patterns.map((p) => (
        <button
          key={p.id}
          onClick={() => onChange(p.id)}
          className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${
            value === p.id
              ? "border-primary bg-primary/10 text-primary"
              : "border-border bg-card text-muted-foreground hover:border-primary/40"
          }`}
        >
          <svg viewBox="0 0 20 16" className="w-10 h-8">
            <rect x="1" y="1" width="18" height="14" rx="2" fill="none" stroke={value === p.id ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"} strokeWidth="0.8" />
            {p.lines.map((l, i) => (
              <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                stroke={value === p.id ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
                strokeWidth="0.8"
              />
            ))}
          </svg>
          <span className="text-[10px] font-medium">{p.label}</span>
        </button>
      ))}
    </div>
  );
};

export default LayingPatternSelector;
