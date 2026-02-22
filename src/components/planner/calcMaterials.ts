import { products } from "@/data/products";
import { MaterialLine } from "./types";

/**
 * Given area in m² and a product slug, produce a simplified materials list.
 * Uses product price + estimated substructure & accessories.
 */
export function calcMaterials(areaM2: number, productSlug: string | null): MaterialLine[] {
  if (areaM2 <= 0 || !productSlug) return [];

  const product = products.find((p) => p.slug === productSlug);
  if (!product) return [];

  // Parse plank dimensions from specifications
  const lengthM = parseFloat(product.specifications?.["Lengte"]?.replace(",", ".")) || 3.9;
  const widthMM = parseFloat(product.specifications?.["Breedte"]?.replace(",", ".")) || 145;
  const widthM = widthMM > 10 ? widthMM / 1000 : widthMM; // handle mm vs m

  // Coverage per plank in m²
  const coveragePerPlank = lengthM * widthM;

  // Number of planks needed (+5% waste)
  const planksNeeded = Math.ceil((areaM2 * 1.05) / coveragePerPlank);

  const lines: MaterialLine[] = [];

  // 1. Deck planks
  lines.push({
    name: product.name,
    unit: "stuks",
    quantity: planksNeeded,
    pricePerUnit: product.price,
    totalPrice: planksNeeded * product.price,
  });

  // 2. Substructure (aluminium rails) — roughly 3 running meters per m²
  const railLengthM = 4; // standard rail 4m
  const railsPerM2 = 3;
  const totalRailMeters = areaM2 * railsPerM2;
  const railCount = Math.ceil(totalRailMeters / railLengthM);
  lines.push({
    name: "Aluminium onderregel 40x60mm (4m)",
    unit: "stuks",
    quantity: railCount,
    pricePerUnit: 18.95,
    totalPrice: railCount * 18.95,
  });

  // 3. Clips — roughly 20 per m²
  const clipsPerM2 = 20;
  const totalClips = Math.ceil(areaM2 * clipsPerM2);
  const clipBags = Math.ceil(totalClips / 100);
  lines.push({
    name: "RVS bevestigingsclips (100 stuks)",
    unit: "zakken",
    quantity: clipBags,
    pricePerUnit: 24.95,
    totalPrice: clipBags * 24.95,
  });

  // 4. Screws
  const screwBoxes = Math.ceil(areaM2 / 10);
  lines.push({
    name: "RVS schroeven (200 stuks)",
    unit: "dozen",
    quantity: screwBoxes,
    pricePerUnit: 19.95,
    totalPrice: screwBoxes * 19.95,
  });

  // 5. Rubber pads
  const padCount = Math.ceil(areaM2 * 4);
  lines.push({
    name: "Rubber ondersteuningspads",
    unit: "stuks",
    quantity: padCount,
    pricePerUnit: 0.75,
    totalPrice: padCount * 0.75,
  });

  return lines;
}
