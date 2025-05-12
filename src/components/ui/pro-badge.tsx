
import { cn } from "@/lib/utils";
import { Award } from "lucide-react";

interface ProBadgeProps {
  className?: string;
}

export function ProBadge({ className }: ProBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-guc-green px-2.5 py-0.5 text-xs font-medium text-white",
        className
      )}
    >
      <Award className="mr-1 h-3 w-3" />
      PRO
    </span>
  );
}
