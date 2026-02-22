import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const stageConfig: Record<string, { label: string; className: string }> = {
  new: { label: "Nieuw", className: "bg-blue-100 text-blue-800 border-blue-200" },
  contacted: { label: "Gecontacteerd", className: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  qualified: { label: "Gekwalificeerd", className: "bg-purple-100 text-purple-800 border-purple-200" },
  proposal: { label: "Offerte", className: "bg-orange-100 text-orange-800 border-orange-200" },
  won: { label: "Gewonnen", className: "bg-green-100 text-green-800 border-green-200" },
  lost: { label: "Verloren", className: "bg-red-100 text-red-800 border-red-200" },
};

export const PIPELINE_STAGES = Object.keys(stageConfig);

const PipelineBadge = ({ stage }: { stage: string }) => {
  const config = stageConfig[stage] || { label: stage, className: "" };
  return (
    <Badge variant="outline" className={cn("text-xs font-medium", config.className)}>
      {config.label}
    </Badge>
  );
};

export default PipelineBadge;
