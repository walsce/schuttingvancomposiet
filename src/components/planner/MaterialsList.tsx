import { MaterialLine } from "./types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface MaterialsListProps {
  lines: MaterialLine[];
  areaM2: number;
}

const MaterialsList = ({ lines, areaM2 }: MaterialsListProps) => {
  const total = lines.reduce((s, l) => s + l.totalPrice, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg font-bold text-foreground">Materiaallijst</h3>
        <span className="text-sm text-muted-foreground">{areaM2.toFixed(1)} m²</span>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Materiaal</TableHead>
              <TableHead className="text-right">Aantal</TableHead>
              <TableHead className="text-right">Stukprijs</TableHead>
              <TableHead className="text-right">Totaal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lines.map((l, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{l.name}</TableCell>
                <TableCell className="text-right">{l.quantity} {l.unit}</TableCell>
                <TableCell className="text-right">€{l.pricePerUnit.toFixed(2)}</TableCell>
                <TableCell className="text-right font-semibold">€{l.totalPrice.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      </div>

      <div className="flex justify-between items-center pt-2 border-t border-border">
        <span className="font-semibold text-foreground">Geschatte totaalprijs</span>
        <span className="text-xl font-bold text-primary">€{total.toFixed(2)}</span>
      </div>

      <p className="text-[11px] text-muted-foreground">
        * Prijsindicatie excl. BTW. Inclusief 5% zaagverlies. Neem contact op voor een exacte offerte.
      </p>
    </div>
  );
};

export default MaterialsList;
