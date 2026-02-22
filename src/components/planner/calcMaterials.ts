import { products } from "@/data/products";
import { MaterialLine, LayingPattern, SubstructureConfig, EdgeConfig } from "./types";

/**
 * Calculate materials list based on area, product, and configuration options.
 */
export function calcMaterials(
  areaM2: number,
  productSlug: string | null,
  layingPattern: LayingPattern = "horizontal",
  substructure: SubstructureConfig = { usage: "private", ground: "verdicht", buildHeight: 5, beam: "alu-60x40-400", jointType: "dubbele-balken", doubleBeam: false, leveling: "none", slope: false },
  edgeConfig: EdgeConfig = { wallSides: [], addEdgeBoards: false },
  edgeCount = 4,
  perimeterM = 0
): MaterialLine[] {
  if (areaM2 <= 0 || !productSlug) return [];

  const product = products.find((p) => p.slug === productSlug);
  if (!product) return [];

  const lengthM = parseFloat(product.specifications?.["Lengte"]?.replace(",", ".")) || 3.9;
  const widthMM = parseFloat(product.specifications?.["Breedte"]?.replace(",", ".")) || 145;
  const widthM = widthMM > 10 ? widthMM / 1000 : widthMM;
  const coveragePerPlank = lengthM * widthM;

  // Waste factor based on laying pattern
  const wasteFactor = layingPattern === "diagonal" ? 1.15 : 1.05;

  const planksNeeded = Math.ceil((areaM2 * wasteFactor) / coveragePerPlank);

  const lines: MaterialLine[] = [];

  // 1. Deck planks
  lines.push({
    name: product.name,
    unit: "stuks",
    quantity: planksNeeded,
    pricePerUnit: product.price,
    totalPrice: planksNeeded * product.price,
  });

  // 2. Substructure rails — spacing depends on usage type
  const railLengthM = 4;
  const railsPerM2 = substructure.usage === "commercial" ? 4 : 3;
  const totalRailMeters = areaM2 * railsPerM2;
  const railCount = Math.ceil(totalRailMeters / railLengthM);
  lines.push({
    name: "Aluminium onderregel 40x60mm (4m)",
    unit: "stuks",
    quantity: railCount,
    pricePerUnit: 18.95,
    totalPrice: railCount * 18.95,
  });

  // 3. Clips
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

  // 5. Rubber pads — more for higher build heights
  const padDensity = substructure.buildHeight > 10 ? 5 : 4;
  const padCount = Math.ceil(areaM2 * padDensity);
  lines.push({
    name: "Rubber ondersteuningspads",
    unit: "stuks",
    quantity: padCount,
    pricePerUnit: 0.75,
    totalPrice: padCount * 0.75,
  });

  // 6. Edge trim boards (if enabled)
  if (edgeConfig.addEdgeBoards && perimeterM > 0) {
    // Calculate open-side perimeter (exclude wall sides)
    let openPerimeter = 0;
    // Simple: use total perimeter minus wall sides
    // We approximate each side as perimeterM / edgeCount
    const sideLength = perimeterM / Math.max(edgeCount, 1);
    for (let i = 0; i < edgeCount; i++) {
      if (!edgeConfig.wallSides[i]) {
        openPerimeter += sideLength;
      }
    }
    if (openPerimeter > 0) {
      const trimLength = 3.9; // standard trim board length
      const trimCount = Math.ceil(openPerimeter / trimLength);
      lines.push({
        name: "Randafwerkingsplank (3.9m)",
        unit: "stuks",
        quantity: trimCount,
        pricePerUnit: 32.95,
        totalPrice: trimCount * 32.95,
      });
    }
  }

  return lines;
}
