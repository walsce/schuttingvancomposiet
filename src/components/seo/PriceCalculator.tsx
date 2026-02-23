import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

const PriceCalculator = () => {
  const [length, setLength] = useState(10);
  const [height, setHeight] = useState(180);
  const [type, setType] = useState<"mono" | "coex">("coex");
  const [mounting, setMounting] = useState(false);

  const pricePerMeter = type === "mono" ? 102 : 148;
  const heightFactor = height === 200 ? 1.18 : 1;
  const materialCost = length * pricePerMeter * heightFactor;
  const poles = Math.ceil(length / 1.8) + 1;
  const poleCost = poles * 72;
  const footingCost = poles * 18;
  const mountingCost = mounting ? length * 60 : 0;
  const totalMaterial = materialCost + poleCost + footingCost;
  const total = totalMaterial + mountingCost;

  const fmt = (n: number) => new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-5">
      <div className="flex items-center gap-2">
        <Calculator className="w-5 h-5 text-primary" />
        <h3 className="font-serif font-bold text-foreground text-lg">Prijsindicatie Calculator</h3>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-foreground block mb-1">Lengte (meter)</label>
          <input
            type="range" min={3} max={50} value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <span className="text-sm text-muted-foreground">{length} meter</span>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1">Hoogte</label>
          <div className="flex gap-2">
            <Button size="sm" variant={height === 180 ? "default" : "outline"} onClick={() => setHeight(180)}>180 cm</Button>
            <Button size="sm" variant={height === 200 ? "default" : "outline"} onClick={() => setHeight(200)}>200 cm</Button>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1">Type composiet</label>
          <div className="flex gap-2">
            <Button size="sm" variant={type === "mono" ? "default" : "outline"} onClick={() => setType("mono")}>Standaard</Button>
            <Button size="sm" variant={type === "coex" ? "default" : "outline"} onClick={() => setType("coex")}>Co-extrusie</Button>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1">Plaatsing</label>
          <div className="flex gap-2">
            <Button size="sm" variant={!mounting ? "default" : "outline"} onClick={() => setMounting(false)}>Zelf plaatsen</Button>
            <Button size="sm" variant={mounting ? "default" : "outline"} onClick={() => setMounting(true)}>Laten plaatsen</Button>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-4 space-y-1 text-sm">
        <div className="flex justify-between"><span className="text-muted-foreground">Materiaal ({length}m)</span><span>{fmt(materialCost)}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Palen ({poles} stuks)</span><span>{fmt(poleCost)}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Betonpoeren</span><span>{fmt(footingCost)}</span></div>
        {mounting && <div className="flex justify-between"><span className="text-muted-foreground">Plaatsing</span><span>{fmt(mountingCost)}</span></div>}
        <div className="flex justify-between font-bold text-foreground pt-2 border-t border-border text-base">
          <span>Totaal indicatie</span><span>{fmt(total)}</span>
        </div>
        <p className="text-xs text-muted-foreground">* Indicatieve prijzen inclusief BTW. Vraag een <a href="/contact" className="text-primary hover:underline">exacte offerte</a> aan voor jouw situatie.</p>
      </div>
    </div>
  );
};

export default PriceCalculator;
