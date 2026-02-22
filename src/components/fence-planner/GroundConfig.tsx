import { GroundType, GroundSegmentConfig, SegmentInfo } from "./types";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface GroundConfigProps {
  segments: SegmentInfo[];
  configs: GroundSegmentConfig[];
  onChange: (configs: GroundSegmentConfig[]) => void;
}

const groundTypes: {
  id: GroundType;
  label: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "flat",
    label: "Vlak",
    description: "Gelijk terrein",
    icon: (
      <svg viewBox="0 0 32 20" className="w-8 h-5" fill="none">
        <line x1="2" y1="15" x2="30" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <rect x="6" y="5" width="20" height="10" rx="1" fill="currentColor" opacity={0.15} />
        <line x1="6" y1="5" x2="26" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "linear-change",
    label: "Helling",
    description: "Hellend terrein",
    icon: (
      <svg viewBox="0 0 32 20" className="w-8 h-5" fill="none">
        <line x1="2" y1="18" x2="30" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <polygon points="6,18 26,7 26,13 6,18" fill="currentColor" opacity={0.12} />
        <line x1="6" y1="4" x2="26" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity={0.5} />
        <line x1="6" y1="18" x2="6" y2="4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 2" opacity={0.4} />
      </svg>
    ),
  },
  {
    id: "wall",
    label: "Muur",
    description: "Naast een muur",
    icon: (
      <svg viewBox="0 0 32 20" className="w-8 h-5" fill="none">
        <rect x="2" y="4" width="6" height="14" rx="1" fill="currentColor" opacity={0.3} />
        <line x1="8" y1="18" x2="30" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <rect x="10" y="6" width="18" height="12" rx="1" fill="currentColor" opacity={0.12} />
        <line x1="10" y1="6" x2="28" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

const GroundConfig = ({ segments, configs, onChange }: GroundConfigProps) => {
  const activeConfig = configs[0] || { segmentIndex: 0, type: "flat" as GroundType };

  const update = (patch: Partial<GroundSegmentConfig>) => {
    onChange([{ ...activeConfig, ...patch }]);
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {groundTypes.map((gt) => (
          <button
            key={gt.id}
            onClick={() => update({ type: gt.id })}
            title={gt.description}
            className={cn(
              "flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all text-center",
              activeConfig.type === gt.id
                ? "border-primary bg-primary/8 text-primary shadow-sm"
                : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground hover:bg-muted/30"
            )}
          >
            <div className="flex items-center justify-center">{gt.icon}</div>
            <div>
              <p className="text-[10px] font-semibold leading-none">{gt.label}</p>
              <p className="text-[9px] mt-0.5 opacity-70 leading-tight">{gt.description}</p>
            </div>
          </button>
        ))}
      </div>

      {activeConfig.type === "linear-change" && (
        <div className="bg-muted/40 rounded-lg p-3 space-y-1.5">
          <p className="text-xs font-medium text-foreground">Hoogteverschil</p>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              className="h-8 text-sm"
              value={activeConfig.diffLevel ?? ""}
              onChange={(e) => update({ diffLevel: parseInt(e.target.value) || 0 })}
              placeholder="0"
            />
            <span className="text-xs text-muted-foreground flex-shrink-0">cm</span>
          </div>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            Verschil in hoogte van begin tot einde van het segment.
          </p>
        </div>
      )}

      {activeConfig.type === "wall" && segments.length > 0 && (
        <div className="bg-muted/40 rounded-lg p-3 space-y-1.5">
          <p className="text-xs font-medium text-foreground">Muurhoogte</p>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              className="h-8 text-sm"
              value={activeConfig.wallHeight ?? ""}
              onChange={(e) => update({ wallHeight: parseInt(e.target.value) || 0 })}
              placeholder="0"
            />
            <span className="text-xs text-muted-foreground flex-shrink-0">cm</span>
          </div>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            Hoogte van de aangrenzende muur of hek.
          </p>
        </div>
      )}
    </div>
  );
};

export default GroundConfig;
