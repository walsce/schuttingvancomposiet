import { PostType, PostColor } from "./types";
import { Label } from "@/components/ui/label";

interface PostModelSelectorProps {
  postType: PostType;
  postColor: PostColor;
  onTypeChange: (type: PostType) => void;
  onColorChange: (color: PostColor) => void;
}

const postTypes: { id: PostType; label: string; svg: React.ReactNode }[] = [
  {
    id: "inground",
    label: "Ingraafpaal",
    svg: (
      <svg viewBox="0 0 40 60" className="w-8 h-12" fill="none">
        <rect x="16" y="0" width="8" height="40" fill="#374151" />
        <path d="M12 40 L28 40 L24 58 L16 58 Z" fill="#9ca3af" strokeDasharray="3 2" stroke="#6b7280" />
      </svg>
    ),
  },
  {
    id: "bolt-down",
    label: "Opschroefpaal",
    svg: (
      <svg viewBox="0 0 40 60" className="w-8 h-12" fill="none">
        <rect x="16" y="0" width="8" height="44" fill="#374151" />
        <rect x="10" y="44" width="20" height="4" rx="1" fill="#6b7280" />
        <rect x="6" y="48" width="28" height="3" rx="1" fill="#9ca3af" />
      </svg>
    ),
  },
  {
    id: "base-plate",
    label: "Voetplaat",
    svg: (
      <svg viewBox="0 0 40 60" className="w-8 h-12" fill="none">
        <rect x="16" y="0" width="8" height="44" fill="#374151" />
        <rect x="8" y="44" width="24" height="6" rx="2" fill="#6b7280" />
        <rect x="4" y="50" width="32" height="4" rx="1" fill="#d1d5db" />
      </svg>
    ),
  },
];

const postColors: { id: PostColor; label: string; hex: string }[] = [
  { id: "black", label: "Zwart", hex: "#1f2937" },
  { id: "grey", label: "Antraciet", hex: "#4b5563" },
];

const PostModelSelector = ({ postType, postColor, onTypeChange, onColorChange }: PostModelSelectorProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-xs text-muted-foreground mb-2 block">Type paalbevestiging</Label>
        <div className="grid grid-cols-3 gap-2">
          {postTypes.map((pt) => (
            <button
              key={pt.id}
              onClick={() => onTypeChange(pt.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg border-2 transition-colors ${
                postType === pt.id
                  ? "border-primary bg-primary/5"
                  : "border-border bg-background hover:border-primary/40"
              }`}
            >
              {pt.svg}
              <span className="text-[9px] font-medium text-muted-foreground leading-tight text-center">{pt.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-xs text-muted-foreground mb-2 block">Kleur</Label>
        <div className="flex gap-3">
          {postColors.map((pc) => (
            <button
              key={pc.id}
              onClick={() => onColorChange(pc.id)}
              className={`flex flex-col items-center gap-1.5 transition-all ${
                postColor === pc.id ? "scale-110" : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded border-2 ${
                  postColor === pc.id ? "border-primary ring-2 ring-primary/30" : "border-border"
                }`}
                style={{ backgroundColor: pc.hex }}
              />
              <span className="text-[10px] text-muted-foreground">{pc.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostModelSelector;
