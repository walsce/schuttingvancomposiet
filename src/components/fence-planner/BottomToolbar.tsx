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
  const style = panelStyles.find((ps) => ps.id === styleId);

  return (
    <button
      onClick={onClick}
      title={style?.name}
      className={cn(
        "w-10 h-10 sm:w-12 sm:h-12 rounded-md border-2 overflow-hidden transition-colors flex-shrink-0",
        selected ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
      )}
    >
      <img
        src={style?.image}
        alt={style?.name}
        className="w-full h-full object-cover"
        loading="lazy"
      />
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
