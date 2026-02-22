import { PlacedPanel, SegmentInfo } from "./types";
import { panelStyles, POST_WIDTH_CM, PANEL_HEIGHT_CM } from "./designerData";

interface ExportOptions {
  segments: SegmentInfo[];
  placedPanels: PlacedPanel[];
  productName: string | null;
}

function escapeCsv(val: string): string {
  if (val.includes(",") || val.includes('"') || val.includes("\n")) {
    return `"${val.replace(/"/g, '""')}"`;
  }
  return val;
}

export function exportPanelConfigCsv({ segments, placedPanels, productName }: ExportOptions) {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10);
  const timeStr = now.toTimeString().slice(0, 5);

  const rows: string[][] = [];

  rows.push(["Schuttingplanner – Productieorder Export"]);
  rows.push([`Datum: ${dateStr}`, `Tijd: ${timeStr}`]);
  rows.push([`Product: ${productName || "–"}`]);
  rows.push([`Paal breedte: ${POST_WIDTH_CM} cm`, `Paneel hoogte: ${PANEL_HEIGHT_CM} cm`]);
  rows.push([]);

  rows.push([
    "Segment", "Segment lengte (cm)", "Positie", "Paneel ID",
    "Stijl", "Breedte (cm)", "Hoogte (cm)", "Kleur (hex)",
  ]);

  for (const seg of segments) {
    const segPanels = placedPanels
      .filter((p) => p.segmentIndex === segments.indexOf(seg))
      .sort((a, b) => a.position - b.position);

    if (segPanels.length === 0) {
      rows.push([seg.label, String(seg.lengthCm), "–", "–", "–", "–", "–", "–"]);
      continue;
    }

    for (const panel of segPanels) {
      const styleName = panelStyles.find((s) => s.id === panel.panelStyleId)?.name ?? panel.panelStyleId;
      rows.push([
        seg.label, String(seg.lengthCm), String(panel.position + 1),
        panel.id, styleName, String(panel.widthCm), String(PANEL_HEIGHT_CM), panel.colorHex,
      ]);
    }
  }

  rows.push([]);
  rows.push(["Samenvatting"]);
  const totalPanels = placedPanels.length;
  const totalPosts = segments.reduce((sum, _, idx) => {
    const count = placedPanels.filter((p) => p.segmentIndex === idx).length;
    return sum + (count > 0 ? count + 1 : 0);
  }, 0);
  const totalPanelWidth = placedPanels.reduce((sum, p) => sum + p.widthCm, 0);

  rows.push(["Totaal panelen", String(totalPanels)]);
  rows.push(["Totaal palen", String(totalPosts)]);
  rows.push(["Totaal paneel breedte (cm)", String(totalPanelWidth)]);
  rows.push(["Totaal paal breedte (cm)", String(totalPosts * POST_WIDTH_CM)]);
  rows.push(["Totaal lengte (cm)", String(totalPanelWidth + totalPosts * POST_WIDTH_CM)]);

  const csv = rows.map((row) => row.map(escapeCsv).join(",")).join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `schuttingplanner-order-${dateStr}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
