import { Badge, BadgeTone, Dot, statusTone } from "@/components/primitive-ui/card-ui";
import { formatCurrency, formatDateTime, titleCase } from "@/helpers/funcs";


export const actionIcon = (action: string) => {
  if (action.includes('Reverted')) {
    return (
      <svg viewBox="0 0 16 16" className="h-3 w-3 fill-none stroke-current stroke-[1.8]">
        <path d="M4 8h8M4 8l3-3M4 8l3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (action.includes('Approval')) {
    return (
      <svg viewBox="0 0 16 16" className="h-3 w-3 fill-none stroke-current stroke-[1.8]">
        <path d="M3.5 8.2 6.5 11 12.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 16 16" className="h-3 w-3 fill-none stroke-current stroke-[1.8]">
      <circle cx="8" cy="8" r="3" />
    </svg>
  );
};


export const TimelineEntry = ({
  entry,
  isFirst,
  isLast,
}: {
  entry: { action: string; date: string; amount: number; status: string; _id: string };
  isFirst: boolean;
  isLast: boolean;
}) => {
  const tone = statusTone(entry.status);
  const iconColor: Record<BadgeTone, string> = {
    success: 'bg-emerald-500 text-white',
    warning: 'bg-amber-500 text-white',
    danger: 'bg-rose-500 text-white',
    neutral: 'bg-slate-300 text-white',
    accent: 'bg-[#1E4FD8] text-white',
  };

  return (
    <li className="relative flex gap-4 pb-6 last:pb-0">
      {!isLast && <span className="absolute left-[13px] top-6 h-full w-px bg-slate-200" />}
      <span
        className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ring-4 ring-white ${iconColor[tone]}`}
      >
        {actionIcon(entry.action)}
      </span>
      <div className="flex-1 pt-0.5">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-medium text-[#0B1220]">{entry.action}</p>
          {isFirst && <Badge tone="accent">Latest</Badge>}
        </div>
        <p className="mt-0.5 text-xs text-slate-400">{formatDateTime(entry.date)}</p>
        {entry.amount > 0 && (
          <p className="mt-1 font-mono text-sm tabular-nums text-[#0B1220]">
            {formatCurrency(entry.amount)}
          </p>
        )}
      </div>
      <Badge tone={tone}>
        <Dot tone={tone} />
        {titleCase(entry.status)}
      </Badge>
    </li>
  );
};