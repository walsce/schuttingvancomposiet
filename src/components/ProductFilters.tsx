import { useEffect, useMemo, useState } from "react";
import { Product, Tone, Durability, ProductType, SortOption, toneLabels, durabilityLabels, productTypeLabels } from "@/data/products";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";

interface ProductFiltersProps {
  products: Product[];
  onFiltered: (filtered: Product[]) => void;
}

const toneColors: Record<Tone, string> = {
  teak: "bg-teak",
  zwart: "bg-foreground",
  walnoot: "bg-walnut",
  eiken: "bg-oak",
  grijs: "bg-muted-foreground",
};

const sortLabels: Record<SortOption, string> = {
  default: "Standaard",
  "price-asc": "Prijs oplopend",
  "price-desc": "Prijs aflopend",
  "name-az": "Naam A-Z",
  "name-za": "Naam Z-A",
};

const ProductFilters = ({ products, onFiltered }: ProductFiltersProps) => {
  const [selectedTones, setSelectedTones] = useState<Tone[]>([]);
  const [selectedDurability, setSelectedDurability] = useState<Durability[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<ProductType[]>([]);
  const [sort, setSort] = useState<SortOption>("default");
  const [showFilters, setShowFilters] = useState(true);

  // Derive available options from current category products
  const availableTones = useMemo(() => [...new Set(products.map((p) => p.tone))], [products]);
  const availableDurabilities = useMemo(() => [...new Set(products.map((p) => p.durability))], [products]);
  const availableTypes = useMemo(() => [...new Set(products.map((p) => p.productType))], [products]);

  const activeFilterCount = selectedTones.length + selectedDurability.length + selectedTypes.length;

  // Apply filters & sort
  const filtered = useMemo(() => {
    let result = [...products];

    if (selectedTones.length > 0) {
      result = result.filter((p) => selectedTones.includes(p.tone));
    }
    if (selectedDurability.length > 0) {
      result = result.filter((p) => selectedDurability.includes(p.durability));
    }
    if (selectedTypes.length > 0) {
      result = result.filter((p) => selectedTypes.includes(p.productType));
    }

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-az":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-za":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    return result;
  }, [products, selectedTones, selectedDurability, selectedTypes, sort]);

  useEffect(() => {
    onFiltered(filtered);
  }, [filtered, onFiltered]);

  const toggleTone = (t: Tone) =>
    setSelectedTones((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  const toggleDurability = (d: Durability) =>
    setSelectedDurability((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]));
  const toggleType = (t: ProductType) =>
    setSelectedTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const clearAll = () => {
    setSelectedTones([]);
    setSelectedDurability([]);
    setSelectedTypes([]);
    setSort("default");
  };

  return (
    <div className="mb-8">
      {/* Top bar: toggle + sort + clear */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
              {activeFilterCount}
            </span>
          )}
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showFilters ? "rotate-180" : ""}`} />
        </button>

        <div className="flex items-center gap-3">
          {activeFilterCount > 0 && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-3 h-3" /> Filters wissen
            </button>
          )}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="text-sm bg-card border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {Object.entries(sortLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filter panels */}
      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-card rounded-xl border border-border">
          {/* Tone / Kleur */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Kleurtint</h4>
            <div className="flex flex-wrap gap-2">
              {availableTones.map((tone) => (
                <button
                  key={tone}
                  onClick={() => toggleTone(tone)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm border transition-all ${
                    selectedTones.includes(tone)
                      ? "border-primary bg-primary/5 text-foreground font-medium"
                      : "border-border text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full ${toneColors[tone]} shrink-0`} />
                  {toneLabels[tone]}
                </button>
              ))}
            </div>
          </div>

          {/* Durability */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Kwaliteitsniveau</h4>
            <div className="flex flex-wrap gap-2">
              {availableDurabilities.map((dur) => (
                <button
                  key={dur}
                  onClick={() => toggleDurability(dur)}
                  className={`px-3 py-1.5 rounded-lg text-sm border transition-all ${
                    selectedDurability.includes(dur)
                      ? "border-primary bg-primary/5 text-foreground font-medium"
                      : "border-border text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  {durabilityLabels[dur]}
                </button>
              ))}
            </div>
          </div>

          {/* Product type */}
          {availableTypes.length > 1 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Producttype</h4>
              <div className="flex flex-wrap gap-2">
                {availableTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => toggleType(type)}
                    className={`px-3 py-1.5 rounded-lg text-sm border transition-all ${
                      selectedTypes.includes(type)
                        ? "border-primary bg-primary/5 text-foreground font-medium"
                        : "border-border text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    {productTypeLabels[type]}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductFilters;
