import { Link } from "react-router-dom";
import { Award, ShieldCheck, Clock } from "lucide-react";

interface AuthorBlockProps {
  name: string;
  role: string;
  publishDate: string;
  updatedDate: string;
  readingTime: string;
}

const AuthorBlock = ({ name, role, publishDate, updatedDate, readingTime }: AuthorBlockProps) => {
  const fmtDate = (d: string) => new Date(d).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground border-b border-border pb-4 mb-6">
      <div className="flex items-center gap-1.5">
        <Award className="w-3.5 h-3.5 text-primary" />
        <span><strong className="text-foreground">{name}</strong> — {role}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Clock className="w-3.5 h-3.5 text-primary" />
        <span>{readingTime} leestijd</span>
      </div>
      <div className="flex items-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-primary" />
        <span>Bijgewerkt: {fmtDate(updatedDate)}</span>
      </div>
    </div>
  );
};

export default AuthorBlock;
