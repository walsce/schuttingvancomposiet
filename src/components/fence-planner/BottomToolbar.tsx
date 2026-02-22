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

const PanelThumbnail = ({
  styleId,
  selected,
  onClick,
}: {
  styleId: PanelStyleId;
  selected: boolean;
  onClick: () => void;
}) => {
  const style = panelStyles.find((ps) => ps.id === styleId);

  return (
    <button
      onClick={onClick}
      title={style?.name}
      className={cn(
        "w-10 h-10 sm:w-11 sm:h-11 rounded-lg border-2 overflow-hidden transition-all flex-shrink-0",
        selected
          ? "border-primary ring-2 ring-primary/20 scale-105 shadow-sm"
          : "border-border/70 hover:border-primary/50 hover:scale-105"
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
    <div className="border-t border-border bg-background flex-shrink-0">
      {/* Row 1: Panel styles */}
      <div className="flex items-center gap-3 px-3 sm:px-4 pt-2.5 pb-2 border-b border-border/50">
        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider flex-shrink-0 w-11">
          Stijl
        </span>
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {panelStyles.map((ps) => (
            <PanelThumbnail
              key={ps.id}
              styleId={ps.id}
              selected={selectedPanelStyle === ps.id}
              onClick={() => onPanelStyleChange(ps.id)}
            />
          ))}
        </div>
      </div>

      {/* Row 2: Colors */}
      <div className="flex items-center gap-3 px-3 sm:px-4 pt-2 pb-2.5">
        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider flex-shrink-0 w-11">
          Kleur
        </span>
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none flex-1">
          {allColors.map((c) => (
            <button
              key={c.hex}
              onClick={() => onColorChange(c.hex)}
              title={c.name}
              className={cn(
                "w-7 h-7 sm:w-8 sm:h-8 rounded-lg border-2 transition-all flex-shrink-0",
                selectedColorHex === c.hex
                  ? "border-primary ring-2 ring-primary/20 scale-110 shadow-sm"
                  : "border-border/60 hover:border-primary/50 hover:scale-105"
              )}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
        {selectedProduct && (
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0 border-l border-border pl-3 ml-1">
            <div
              className="w-3 h-3 rounded-full border border-border flex-shrink-0"
              style={{ backgroundColor: selectedProduct.colorHex }}
            />
            <span className="text-xs text-muted-foreground truncate max-w-[140px]" title={selectedProduct.name}>
              {selectedProduct.name.replace("Composiet schutting ", "")}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BottomToolbar;
