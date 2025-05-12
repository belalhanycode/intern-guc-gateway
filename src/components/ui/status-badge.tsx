
import { cn } from "@/lib/utils";

type StatusType = "pending" | "approved" | "rejected" | "flagged" | "draft";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig = {
  pending: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  approved: {
    label: "Approved",
    className: "bg-green-100 text-green-800 border-green-200",
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-100 text-red-800 border-red-200",
  },
  flagged: {
    label: "Flagged",
    className: "bg-orange-100 text-orange-800 border-orange-200",
  },
  draft: {
    label: "Draft",
    className: "bg-gray-100 text-gray-800 border-gray-200",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const { label, className: statusClassName } = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border",
        statusClassName,
        className
      )}
    >
      {label}
    </span>
  );
}
