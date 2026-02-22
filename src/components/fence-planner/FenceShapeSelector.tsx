import { FenceShape } from "./types";
import { cn } from "@/lib/utils";

interface FenceShapeSelectorProps {
  value: FenceShape;
  onChange: (shape: FenceShape) => void;
}

const StraightIcon = () => (
  <svg viewBox="0 0 60 36" className="w-full h-full" fill="none">
    <line x1="8" y1="18" x2="52" y2="18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <circle cx="8" cy="18" r="3" fill="currentColor" opacity={0.5} />
    <circle cx="52" cy="18" r="3" fill="currentColor" opacity={0.5} />
  </svg>
);

const LShapeIcon = () => (
  <svg viewBox="0 0 60 48" className="w-full h-full" fill="none">
    <polyline
      points="10,8 10,40 50,40"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="10" cy="8" r="3" fill="currentColor" opacity={0.5} />
    <circle cx="10" cy="40" r="3" fill="currentColor" opacity={0.5} />
    <circle cx="50" cy="40" r="3" fill="currentColor" opacity={0.5} />
  </svg>
);

const UShapeIcon = () => (
  <svg viewBox="0 0 60 48" className="w-full h-full" fill="none">
    <polyline
      points="10,8 10,40 50,40 50,8"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="10" cy="8" r="3" fill="currentColor" opacity={0.5} />
    <circle cx="10" cy="40" r="3" fill="currentColor" opacity={0.5} />
    <circle cx="50" cy="40" r="3" fill="currentColor" opacity={0.5} />
    <circle cx="50" cy="8" r="3" fill="currentColor" opacity={0.5} />
  </svg>
);

const shapes: {
  id: FenceShape;
  label: string;
  description: string;
  Icon: React.FC;
}[] = [
  { id: "straight", label: "Recht", description: "Één rechte lijn", Icon: StraightIcon },
  { id: "l-shape", label: "L-vorm", description: "Hoek van 90°", Icon: LShapeIcon },
  { id: "u-shape", label: "U-vorm", description: "3 zijden", Icon: UShapeIcon },
];

const FenceShapeSelector = ({ value, onChange }: FenceShapeSelectorProps) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {shapes.map((shape) => {
        const isSelected = value === shape.id;
        return (
          <button
            key={shape.id}
            onClick={() => onChange(shape.id)}
            className={cn(
              "flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all text-center",
              isSelected
                ? "border-primary bg-primary/8 text-primary shadow-sm"
                : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground hover:bg-muted/40"
            )}
          >
            <div className="w-full h-10 flex items-center justify-center">
              <shape.Icon />
            </div>
            <div>
              <p className="text-xs font-semibold leading-none">{shape.label}</p>
              <p className="text-[10px] mt-0.5 opacity-70 leading-tight">{shape.description}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default FenceShapeSelector;
