import { FenceShape } from "./types";
import { Minus, Pencil, MapPin } from "lucide-react";

interface FenceShapeSelectorProps {
  value: FenceShape;
  onChange: (shape: FenceShape) => void;
}

const shapes: { id: FenceShape; label: string; icon: React.ReactNode }[] = [
  {
    id: "straight",
    label: "Recht",
    icon: <Minus className="w-6 h-6" />,
  },
  {
    id: "l-shape",
    label: "L-vorm",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2}>
        <polyline points="4,4 4,20 20,20" />
      </svg>
    ),
  },
  {
    id: "u-shape",
    label: "U-vorm",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2}>
        <polyline points="4,4 4,20 20,20 20,4" />
      </svg>
    ),
  },
  {
    id: "custom",
    label: "Custom",
    icon: <Pencil className="w-6 h-6" />,
  },
  {
    id: "location",
    label: "Locatie",
    icon: <MapPin className="w-6 h-6" />,
  },
];

const FenceShapeSelector = ({ value, onChange }: FenceShapeSelectorProps) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {shapes.map((shape) => (
        <button
          key={shape.id}
          onClick={() => onChange(shape.id)}
          className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border-2 transition-colors ${
            value === shape.id
              ? "border-primary bg-primary/5 text-primary"
              : "border-border bg-background text-muted-foreground hover:border-primary/40"
          }`}
        >
          {shape.icon}
          <span className="text-xs font-medium">{shape.label}</span>
        </button>
      ))}
    </div>
  );
};

export default FenceShapeSelector;
