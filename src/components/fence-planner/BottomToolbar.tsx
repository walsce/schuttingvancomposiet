import { Diamond } from "lucide-react";
import { PanelStyleId, SelectedProduct } from "./types";
import { panelStyles, toneColorMap } from "./designerData";
import { cn } from "@/lib/utils";

interface BottomToolbarProps {
  selectedProduct: SelectedProduct | null;
  selectedPanelStyle: PanelStyleId;
  selectedColorHex: string;
  onPanelStyleChange: (style: PanelStyleId) => void;
  onColorChange: (hex: string) => void;
}

const PanelThumbnail = ({ styleId, selected, onClick }: { styleId: PanelStyleId; selected: boolean; onClick: () => void }) => {
  const patterns: Record<PanelStyleId, React.ReactNode> = {
    "horizontal-planks": (
      <svg viewBox="0 0 40 40" className="w-full h-full">
        {[0, 8, 16, 24, 32].map((y) => (
          <rect key={y} x="2" y={y + 1} width="36" height="6" rx="1" fill="currentColor" opacity={0.6 + (y % 16 === 0 ? 0.2 : 0)} />
        ))}
      </svg>
    ),
    "decorative": (
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <circle cx="20" cy="20" r="12" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
        <circle cx="20" cy="20" r="6" fill="currentColor" opacity="0.3" />
        <path d="M10 10 Q20 5 30 10 Q35 20 30 30 Q20 35 10 30 Q5 20 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      </svg>
    ),
    "mosaic": (
      <svg viewBox="0 0 40 40" className="w-full h-full">
        {[0, 10, 20, 30].map((x) =>
          [0, 10, 20, 30].map((y) => (
            <rect key={`${x}-${y}`} x={x + 1} y={y + 1} width="8" height="8" rx="1" fill="currentColor" opacity={0.3 + ((x + y) % 20 === 0 ? 0.3 : 0.1)} />
          ))
        )}
      </svg>
    ),
    "louvers": (
      <svg viewBox="0 0 40 40" className="w-full h-full">
        {[0, 6, 12, 18, 24, 30].map((y) => (
          <rect key={y} x="2" y={y + 1} width="36" height="4" rx="0.5" fill="currentColor" opacity="0.5" transform={`skewY(-2)`} />
        ))}
      </svg>
    ),
    "vertical-slats": (
      <svg viewBox="0 0 40 40" className="w-full h-full">
        {[2, 9, 16, 23, 30].map((x) => (
          <rect key={x} x={x} y="2" width="5" height="36" rx="1" fill="currentColor" opacity="0.5" />
        ))}
      </svg>
    ),
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-10 h-10 sm:w-12 sm:h-12 rounded-md border-2 p-1 text-foreground transition-colors flex-shrink-0",
        selected ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
      )}
    >
      {patterns[styleId]}
    </button>
  );
};

const BottomToolbar = ({
  selectedProduct,
  selectedPanelStyle,
  selectedColorHex,
  onPanelStyleChange,
  onColorChange,
}: BottomToolbarProps) => {
  const allColors = Object.entries(toneColorMap).map(([name, hex]) => ({ name, hex }));

  return (
    <div className="border-t border-border bg-background px-3 sm:px-4 py-2 sm:py-3 flex-shrink-0">
      <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto">
        {/* Product name */}
        {selectedProduct && (
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <Diamond className="w-3 h-3 text-primary" />
            <span className="text-xs font-semibold truncate max-w-[120px] sm:max-w-none">
              {selectedProduct.name.replace("Composiet schutting ", "")}
            </span>
          </div>
        )}

        <div className="h-6 w-px bg-border flex-shrink-0" />

        {/* Panel thumbnails */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {panelStyles.map((ps) => (
            <PanelThumbnail
              key={ps.id}
              styleId={ps.id}
              selected={selectedPanelStyle === ps.id}
              onClick={() => onPanelStyleChange(ps.id)}
            />
          ))}
        </div>

        <div className="h-6 w-px bg-border flex-shrink-0" />

        {/* Colors */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {allColors.map((c) => (
            <button
              key={c.hex}
              onClick={() => onColorChange(c.hex)}
              title={c.name}
              className={cn(
                "w-6 h-6 sm:w-7 sm:h-7 rounded-md border-2 transition-colors flex-shrink-0",
                selectedColorHex === c.hex ? "border-primary ring-2 ring-primary/30" : "border-border"
              )}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomToolbar;
