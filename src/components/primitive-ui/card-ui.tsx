export type BadgeTone = 'success' | 'warning' | 'danger' | 'neutral' | 'accent';

export const Field = ({ label, value, className, mono = false }: { label: string; value: React.ReactNode; className?: string; mono?: boolean }) => (
  <div className={`flex flex-col gap-1 py-2.5 ${className}`}>
    <dt className="text-[11px] font-medium uppercase tracking-wide text-slate-400">{label}</dt>
    <dd className={`text-sm text-[#0B1220] ${mono ? 'font-mono tabular-nums' : 'font-medium'}`}>
      {value ?? '—'}
    </dd>
  </div>
);

export const FieldGrid = ({ children }: { children: React.ReactNode }) => (
  <dl className="grid grid-cols-1 gap-x-6 divide-y divide-slate-50 sm:grid-cols-2 sm:divide-y-0">
    {children}
  </dl>
);


export const badgeTones: Record<BadgeTone, string> = {
  success: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  warning: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  danger: 'bg-rose-50 text-rose-700 ring-rose-600/20',
  neutral: 'bg-slate-100 text-slate-600 ring-slate-500/15',
  accent: 'bg-[#1E4FD8]/10 text-[#1E4FD8] ring-[#1E4FD8]/20',
};

export const Badge = ({ tone = 'neutral', children }: { tone?: BadgeTone; children: React.ReactNode }) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${badgeTones[tone]}`}
  >
    {children}
  </span>
);

export const Dot = ({ tone = 'neutral' }: { tone?: BadgeTone }) => {
  const dotColor: Record<BadgeTone, string> = {
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500',
    neutral: 'bg-slate-400',
    accent: 'bg-[#1E4FD8]',
  };
  return <span className={`h-1.5 w-1.5 rounded-full ${dotColor[tone]}`} />;
};

export const statusTone = (status: string): BadgeTone =>
  status === 'approved'
    ? 'success'
    : status === 'pending'
    ? 'warning'
    : status === 'rejected' || status === 'defaulted'
    ? 'danger'
    : 'neutral';


export const Card = ({
  title,
  action,
  children,
  className = '',
}: {
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) => (
  <section className={`rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/50 ${className}`}>
    {title && (
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <h2 className="text-sm font-semibold tracking-tight text-[#0B1220]">{title}</h2>
        {action}
      </div>
    )}
    <div className="p-5">{children}</div>
  </section>
);



export const EmptyState = ({ message }: { message: string }) => (
  <p className="rounded-lg bg-slate-50 px-4 py-3 text-xs text-slate-400">{message}</p>
);

export const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="px-5 py-4">
    <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">{label}</p>
    <p className="mt-1 font-mono text-lg font-semibold tabular-nums text-[#0B1220]">{value}</p>
  </div>
);