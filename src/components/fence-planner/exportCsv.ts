import { PlacedPanel, SegmentInfo, FenceSystem } from "./types";
import { panelStyles, productsByModel, colorsByModel, POST_WIDTH_CM, PANEL_HEIGHT_CM } from "./designerData";

interface ExportOptions {
  segments: SegmentInfo[];
  placedPanels: PlacedPanel[];
  model: FenceSystem | null;
  product: string | null;
}

function escapeCsv(val: string): string {
  if (val.includes(",") || val.includes('"') || val.includes("\n")) {
    return `"${val.replace(/"/g, '""')}"`;
  }
  return val;
}

export function exportPanelConfigCsv({ segments, placedPanels, model, product }: ExportOptions) {
  const modelLabel = model ?? "–";
  const productLabel = product
    ? (model && productsByModel[model]?.find((p) => p.value === product)?.label) || product
    : "–";

  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10);
  const timeStr = now.toTimeString().slice(0, 5);

  const rows: string[][] = [];

  // Header rows
  rows.push(["Hekplanner – Productieorder Export"]);
  rows.push([`Datum: ${dateStr}`, `Tijd: ${timeStr}`]);
  rows.push([`Model: ${modelLabel}`, `Product: ${productLabel}`]);
  rows.push([`Paal breedte: ${POST_WIDTH_CM} cm`, `Paneel hoogte: ${PANEL_HEIGHT_CM} cm`]);
  rows.push([]);

  // Column headers
  rows.push([
    "Segment",
    "Segment lengte (cm)",
    "Positie",
    "Paneel ID",
    "Stijl",
    "Breedte (cm)",
    "Hoogte (cm)",
    "Kleur (hex)",
    "Kleur naam",
  ]);

  // Data rows per segment
  for (const seg of segments) {
    const segPanels = placedPanels
      .filter((p) => p.segmentIndex === segments.indexOf(seg))
      .sort((a, b) => a.position - b.position);

    if (segPanels.length === 0) {
      rows.push([
        seg.label,
        String(seg.lengthCm),
        "–",
        "–",
        "–",
        "–",
        "–",
        "–",
        "–",
      ]);
      continue;
    }

    for (const panel of segPanels) {
      const styleName = panelStyles.find((s) => s.id === panel.panelStyleId)?.name ?? panel.panelStyleId;
      const colorName = model
        ? colorsByModel[model]?.find((c) => c.hex === panel.colorHex)?.name ?? "–"
        : "–";

      rows.push([
        seg.label,
        String(seg.lengthCm),
        String(panel.position + 1),
        panel.id,
        styleName,
        String(panel.widthCm),
        String(PANEL_HEIGHT_CM),
        panel.colorHex,
        colorName,
      ]);
    }
  }

  // Summary
  rows.push([]);
  rows.push(["Samenvatting"]);

  const totalPanels = placedPanels.length;
  const totalPosts = segments.reduce((sum, seg, idx) => {
    const count = placedPanels.filter((p) => p.segmentIndex === idx).length;
    return sum + (count > 0 ? count + 1 : 0);
  }, 0);
  const totalPanelWidth = placedPanels.reduce((sum, p) => sum + p.widthCm, 0);

  rows.push(["Totaal panelen", String(totalPanels)]);
  rows.push(["Totaal palen", String(totalPosts)]);
  rows.push(["Totaal paneel breedte (cm)", String(totalPanelWidth)]);
  rows.push(["Totaal paal breedte (cm)", String(totalPosts * POST_WIDTH_CM)]);
  rows.push(["Totaal lengte (cm)", String(totalPanelWidth + totalPosts * POST_WIDTH_CM)]);

  // Build CSV string
  const csv = rows.map((row) => row.map(escapeCsv).join(",")).join("\n");

  // Trigger download
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `hekplanner-order-${dateStr}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
