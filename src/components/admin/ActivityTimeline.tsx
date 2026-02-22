import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { Phone, Mail, FileText, ArrowRightLeft, ShoppingCart } from "lucide-react";

interface Activity {
  id: string;
  type: string;
  title: string | null;
  description: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

const iconMap: Record<string, typeof Phone> = {
  call: Phone,
  email: Mail,
  note: FileText,
  status_change: ArrowRightLeft,
  order: ShoppingCart,
};

const ActivityTimeline = ({ activities }: { activities: Activity[] }) => {
  if (!activities.length) {
    return <p className="text-sm text-muted-foreground">Nog geen activiteiten.</p>;
  }

  return (
    <div className="space-y-4">
      {activities.map((a) => {
        const Icon = iconMap[a.type] || FileText;
        return (
          <div key={a.id} className="flex gap-3">
            <div className="flex-shrink-0 mt-1 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <Icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{a.title || a.type}</p>
              {a.description && <p className="text-sm text-muted-foreground">{a.description}</p>}
              <p className="text-xs text-muted-foreground mt-1">
                {format(new Date(a.created_at), "d MMM yyyy HH:mm", { locale: nl })}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ActivityTimeline;
