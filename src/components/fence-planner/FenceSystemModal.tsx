import { useState } from "react";
import { FenceSystem } from "./types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface FenceSystemModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedSystem: FenceSystem | null;
  selectedPanel: string | null;
  selectedColor: string | null;
  onConfirm: (system: FenceSystem, panel: string, color: string) => void;
}

const systems: { id: FenceSystem; name: string }[] = [
  { id: "wpc", name: "WPC" },
  { id: "alu", name: "ALU" },
  { id: "combo", name: "Combo" },
  { id: "decor", name: "Decor" },
];

const panelsBySystem: Record<FenceSystem, { id: string; name: string }[]> = {
  wpc: [
    { id: "opale-premium", name: "Opale Premium" },
    { id: "opale-modern", name: "Opale Modern" },
    { id: "rhombus-premium", name: "Rhombus Premium" },
    { id: "classic-standard", name: "Classic Standard" },
  ],
  alu: [
    { id: "alu-modern", name: "Modern" },
    { id: "alu-premium", name: "Premium" },
    { id: "alu-classic", name: "Classic" },
    { id: "alu-slim", name: "Slim" },
  ],
  combo: [
    { id: "combo-mix", name: "Mix" },
    { id: "combo-natural", name: "Natural" },
    { id: "combo-urban", name: "Urban" },
    { id: "combo-elegance", name: "Elegance" },
  ],
  decor: [
    { id: "decor-wave", name: "Wave" },
    { id: "decor-block", name: "Block" },
    { id: "decor-line", name: "Line" },
    { id: "decor-art", name: "Art" },
  ],
};

const colorsBySystem: Record<FenceSystem, { id: string; name: string; hex: string }[]> = {
  wpc: [
    { id: "cedar", name: "Cedar", hex: "#8B5E3C" },
    { id: "teak", name: "Teak", hex: "#A0785A" },
    { id: "ipe", name: "Ipé", hex: "#5C3A1E" },
    { id: "lichtgrijs", name: "Lichtgrijs", hex: "#b0b0b0" },
    { id: "donkergrijs", name: "Donkergrijs", hex: "#555555" },
    { id: "ebony-black", name: "Ebony Black", hex: "#1a1a1a" },
  ],
  alu: [
    { id: "alu-donkergrijs", name: "Donkergrijs", hex: "#444444" },
    { id: "alu-zwart", name: "Zwart", hex: "#111111" },
  ],
  combo: [
    { id: "combo-natural", name: "Natural", hex: "#9a7b5a" },
    { id: "combo-grey", name: "Grijs", hex: "#777777" },
    { id: "combo-dark", name: "Donker", hex: "#333333" },
  ],
  decor: [
    { id: "decor-white", name: "Wit", hex: "#e8e8e8" },
    { id: "decor-anthracite", name: "Antraciet", hex: "#3a3a3a" },
    { id: "decor-corten", name: "Cortenstaal", hex: "#8B4513" },
  ],
};

const FenceSystemModal = ({
  open,
  onOpenChange,
  selectedSystem: initSystem,
  selectedPanel: initPanel,
  selectedColor: initColor,
  onConfirm,
}: FenceSystemModalProps) => {
  const [system, setSystem] = useState<FenceSystem>(initSystem || "wpc");
  const [panel, setPanel] = useState<string>(initPanel || "");
  const [color, setColor] = useState<string>(initColor || "");

  const panels = panelsBySystem[system];
  const colors = colorsBySystem[system];

  const progress = (system ? 33 : 0) + (panel ? 33 : 0) + (color ? 34 : 0);

  const handleConfirm = () => {
    if (system && panel && color) {
      onConfirm(system, panel, color);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Schuttingsysteem selecteren</DialogTitle>
          <DialogDescription>Kies een systeem, paneel en kleur voor uw schutting.</DialogDescription>
        </DialogHeader>

        <Progress value={progress} className="h-2 mb-4" />

        {/* System selector */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-foreground">Systeem</h4>
          <div className="grid grid-cols-4 gap-2">
            {systems.map((s) => (
              <button
                key={s.id}
                onClick={() => { setSystem(s.id); setPanel(""); setColor(""); }}
                className={`p-4 rounded-lg border-2 text-center font-medium transition-colors ${
                  system === s.id
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border bg-muted/30 text-muted-foreground hover:border-primary/40"
                }`}
              >
                <div className="w-full aspect-square bg-muted rounded mb-2 flex items-center justify-center text-2xl font-bold text-muted-foreground/40">
                  {s.name[0]}
                </div>
                {s.name}
              </button>
            ))}
          </div>
        </div>

        {/* Panel selector */}
        <div className="space-y-2 pt-2">
          <h4 className="text-sm font-semibold text-foreground">Paneel type</h4>
          <div className="grid grid-cols-4 gap-2">
            {panels.map((p) => (
              <button
                key={p.id}
                onClick={() => { setPanel(p.id); setColor(""); }}
                className={`p-3 rounded-lg border-2 text-center text-sm transition-colors ${
                  panel === p.id
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border bg-muted/30 text-muted-foreground hover:border-primary/40"
                }`}
              >
                <div className="w-full aspect-[4/3] bg-muted rounded mb-1.5" />
                <span className="text-xs font-medium">{p.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Color selector */}
        <div className="space-y-2 pt-2">
          <h4 className="text-sm font-semibold text-foreground">Kleur</h4>
          <div className="flex flex-wrap gap-3">
            {colors.map((c) => (
              <button
                key={c.id}
                onClick={() => setColor(c.id)}
                className="flex flex-col items-center gap-1"
              >
                <div
                  className={`w-10 h-10 rounded border-2 transition-all ${
                    color === c.id
                      ? "border-primary ring-2 ring-primary/30 scale-110"
                      : "border-border"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
                <span className="text-[10px] text-muted-foreground">{c.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            TERUG NAAR CONFIGURATIE
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!system || !panel || !color}
          >
            OVERNEMEN
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FenceSystemModal;
