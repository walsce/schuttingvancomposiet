import { PostType, PostColor } from "./types";
import { cn } from "@/lib/utils";

interface PostModelSelectorProps {
  postType: PostType;
  postColor: PostColor;
  onTypeChange: (type: PostType) => void;
  onColorChange: (color: PostColor) => void;
}

const postTypes: { id: PostType; label: string; description: string; svg: React.ReactNode }[] = [
  {
    id: "inground",
    label: "Ingraafpaal",
    description: "Ingegraven in de grond",
    svg: (
      <svg viewBox="0 0 48 72" className="w-10 h-14" fill="none">
        {/* Post body */}
        <rect x="18" y="2" width="12" height="46" rx="2" fill="currentColor" opacity={0.85} />
        {/* Post cap */}
        <rect x="16" y="0" width="16" height="5" rx="2" fill="currentColor" />
        {/* Ground line */}
        <line x1="4" y1="48" x2="44" y2="48" stroke="currentColor" strokeWidth="1.5" opacity={0.4} strokeDasharray="4 3" />
        {/* Underground part with hatching */}
        <rect x="18" y="48" width="12" height="18" rx="1" fill="currentColor" opacity={0.35} />
        {/* Ground texture */}
        {[0, 5, 10].map((offset) => (
          <line key={offset} x1="8" y1={52 + offset} x2="40" y2={52 + offset} stroke="currentColor" strokeWidth="1" opacity={0.15} />
        ))}
      </svg>
    ),
  },
  {
    id: "bolt-down",
    label: "Opschroefpaal",
    description: "Bevestigd met bouten",
    svg: (
      <svg viewBox="0 0 48 72" className="w-10 h-14" fill="none">
        {/* Post body */}
        <rect x="18" y="2" width="12" height="50" rx="2" fill="currentColor" opacity={0.85} />
        {/* Post cap */}
        <rect x="16" y="0" width="16" height="5" rx="2" fill="currentColor" />
        {/* Base bracket */}
        <rect x="12" y="52" width="24" height="5" rx="1.5" fill="currentColor" opacity={0.7} />
        {/* Anchor plate */}
        <rect x="8" y="57" width="32" height="4" rx="1.5" fill="currentColor" opacity={0.5} />
        {/* Bolts */}
        <circle cx="14" cy="59" r="2" fill="currentColor" opacity={0.4} />
        <circle cx="34" cy="59" r="2" fill="currentColor" opacity={0.4} />
        <circle cx="14" cy="59" r="1" fill="currentColor" opacity={0.7} />
        <circle cx="34" cy="59" r="1" fill="currentColor" opacity={0.7} />
      </svg>
    ),
  },
  {
    id: "base-plate",
    label: "Voetplaat",
    description: "Op betonnen voetplaat",
    svg: (
      <svg viewBox="0 0 48 72" className="w-10 h-14" fill="none">
        {/* Post body */}
        <rect x="18" y="2" width="12" height="50" rx="2" fill="currentColor" opacity={0.85} />
        {/* Post cap */}
        <rect x="16" y="0" width="16" height="5" rx="2" fill="currentColor" />
        {/* Base flange */}
        <rect x="10" y="52" width="28" height="6" rx="2" fill="currentColor" opacity={0.6} />
        {/* Concrete base */}
        <rect x="4" y="58" width="40" height="10" rx="3" fill="currentColor" opacity={0.25} />
        <line x1="4" y1="64" x2="44" y2="64" stroke="currentColor" strokeWidth="0.8" opacity={0.3} />
      </svg>
    ),
  },
];

const postColors: { id: PostColor; label: string; hex: string; description: string }[] = [
  { id: "black", label: "Zwart", hex: "#1f2937", description: "RAL 9005" },
  { id: "grey", label: "Antraciet", hex: "#4b5563", description: "RAL 7016" },
];

const PostModelSelector = ({ postType, postColor, onTypeChange, onColorChange }: PostModelSelectorProps) => {
  return (
    <div className="space-y-4">
      {/* Post type */}
      <div>
        <p className="text-xs text-muted-foreground mb-2 font-medium">Bevestigingstype</p>
        <div className="grid grid-cols-3 gap-2">
          {postTypes.map((pt) => (
            <button
              key={pt.id}
              onClick={() => onTypeChange(pt.id)}
              title={pt.description}
              className={cn(
                "flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all",
                postType === pt.id
                  ? "border-primary bg-primary/8 text-primary shadow-sm"
                  : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground hover:bg-muted/30"
              )}
            >
              <div className="flex items-end justify-center h-14">
                {pt.svg}
              </div>
              <span className="text-[10px] font-semibold leading-tight text-center">{pt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Post color */}
      <div>
        <p className="text-xs text-muted-foreground mb-2 font-medium">Kleur</p>
        <div className="flex gap-2">
          {postColors.map((pc) => (
            <button
              key={pc.id}
              onClick={() => onColorChange(pc.id)}
              className={cn(
                "flex items-center gap-2.5 flex-1 p-2.5 rounded-xl border-2 transition-all text-left",
                postColor === pc.id
                  ? "border-primary bg-primary/8 shadow-sm"
                  : "border-border bg-background hover:border-primary/40"
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-lg flex-shrink-0 border-2",
                  postColor === pc.id ? "border-primary/50" : "border-border"
                )}
                style={{ backgroundColor: pc.hex }}
              />
              <div>
                <p className="text-xs font-semibold text-foreground">{pc.label}</p>
                <p className="text-[10px] text-muted-foreground">{pc.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostModelSelector;
