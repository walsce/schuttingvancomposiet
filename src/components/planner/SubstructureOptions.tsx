import { SubstructureConfig, UsageType, GroundType, JointType, LevelingType } from "./types";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Home, Building2, Warehouse } from "lucide-react";

interface SubstructureOptionsProps {
  value: SubstructureConfig;
  onChange: (config: SubstructureConfig) => void;
}

const usageOptions: { id: UsageType; label: string; icon: typeof Home }[] = [
  { id: "private", label: "Privé", icon: Home },
  { id: "commercial", label: "Commercieel", icon: Building2 },
  { id: "intensive", label: "Intensief", icon: Warehouse },
];

const beamOptions = [
  { id: "alu-60x40-400", name: "StructurAL Alu 60x40mm", length: "400cm", price: 18.95 },
  { id: "alu-40x60-400", name: "Aluminium regel 40x60mm", length: "400cm", price: 22.50 },
];

const SubstructureOptions = ({ value, onChange }: SubstructureOptionsProps) => {
  return (
    <div className="space-y-5">
      {/* Usage type with icons */}
      <div>
        <Label className="text-xs mb-1.5 block">Type terrasgebruik</Label>
        <div className="grid grid-cols-3 gap-2">
          {usageOptions.map((u) => {
            const Icon = u.icon;
            return (
              <button
                key={u.id}
                onClick={() => onChange({ ...value, usage: u.id })}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${
                  value.usage === u.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-muted-foreground hover:border-primary/40"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px] font-medium">{u.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Ground type */}
      <div>
        <Label className="text-xs mb-1.5 block">Ondergrond</Label>
        <Select value={value.ground} onValueChange={(g) => onChange({ ...value, ground: g as GroundType })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="verdicht">Bodem verdicht</SelectItem>
            <SelectItem value="beton">Ondergrond van beton</SelectItem>
            <SelectItem value="tegels">Tegels</SelectItem>
            <SelectItem value="platdak">Plat dak / dakterras met afdichtfolie</SelectItem>
            <SelectItem value="zand">Zachte grond / zand</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Build height */}
      <div>
        <Label className="text-xs mb-1.5 block">Opbouwhoogte: {value.buildHeight} cm</Label>
        <Slider
          value={[value.buildHeight]}
          onValueChange={([v]) => onChange({ ...value, buildHeight: v })}
          min={3}
          max={30}
          step={1}
        />
        <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
          <span>3 cm</span>
          <span>30 cm</span>
        </div>
      </div>

      {/* Substructure beam selector */}
      <div>
        <Label className="text-xs mb-1.5 block">Selecteer onderbouw</Label>
        <div className="space-y-2">
          {beamOptions.map((b) => (
            <button
              key={b.id}
              onClick={() => onChange({ ...value, beam: b.id })}
              className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                value.beam === b.id
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              <span className="text-xs font-medium block">{b.name}</span>
              <span className="text-[10px] text-muted-foreground">{b.length} · €{b.price.toFixed(2)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Joint construction */}
      <div>
        <Label className="text-xs mb-1.5 block">Voegconstructie</Label>
        <div className="grid grid-cols-2 gap-2">
          {([
            { id: "dubbele-balken" as JointType, label: "Dubbele balken" },
            { id: "stootbeugel" as JointType, label: "Xtend Stootbeugel" },
          ]).map((j) => (
            <button
              key={j.id}
              onClick={() => onChange({ ...value, jointType: j.id })}
              className={`p-3 rounded-lg border-2 text-xs font-medium transition-all ${
                value.jointType === j.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40"
              }`}
            >
              {j.label}
            </button>
          ))}
        </div>
      </div>

      {/* Double beam toggle */}
      <div>
        <Label className="text-xs mb-1.5 block">Dubbele balkconstructie?</Label>
        <div className="grid grid-cols-2 gap-2">
          {[true, false].map((v) => (
            <button
              key={String(v)}
              onClick={() => onChange({ ...value, doubleBeam: v })}
              className={`px-3 py-2 rounded-lg border-2 text-xs font-medium transition-all ${
                value.doubleBeam === v
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40"
              }`}
            >
              {v ? "Ja" : "Nee"}
            </button>
          ))}
        </div>
      </div>

      {/* Leveling */}
      <div>
        <Label className="text-xs mb-1.5 block">Nivellering</Label>
        <div className="grid grid-cols-2 gap-2">
          {([
            { id: "stand" as LevelingType, label: "Verstelbare voetjes" },
            { id: "fundatie" as LevelingType, label: "Fundatieschroeven" },
          ]).map((l) => (
            <button
              key={l.id}
              onClick={() => onChange({ ...value, leveling: l.id })}
              className={`p-3 rounded-lg border-2 text-xs font-medium transition-all ${
                value.leveling === l.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Slope */}
      <div>
        <Label className="text-xs mb-1.5 block">Hoogtepunten</Label>
        <div className="grid grid-cols-2 gap-2">
          {[false, true].map((v) => (
            <button
              key={String(v)}
              onClick={() => onChange({ ...value, slope: v })}
              className={`px-3 py-2 rounded-lg border-2 text-xs font-medium transition-all ${
                value.slope === v
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40"
              }`}
            >
              {v ? "Met helling" : "Zonder helling"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubstructureOptions;
