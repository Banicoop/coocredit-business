// // import { BackButton } from '@/components/primitives/buttons/BackButton';
// // import { FlexCol } from '@/components/ui/ui-layout';
// // import { getLoanDetails } from '@/lib/api';
// // import { IDParam } from '@/types/types';
// // import React from 'react';

// // // ---------- helpers ----------

// // const formatCurrency = (value: number) =>
// //   new Intl.NumberFormat('en-NG', {
// //     style: 'currency',
// //     currency: 'NGN',
// //     minimumFractionDigits: 2,
// //   }).format(value ?? 0);

// // const formatDateTime = (value?: string) =>
// //   value
// //     ? new Date(value).toLocaleString('en-NG', {
// //         day: '2-digit',
// //         month: 'short',
// //         year: 'numeric',
// //         hour: '2-digit',
// //         minute: '2-digit',
// //       })
// //     : '—';

// // const initials = (first?: string, last?: string) =>
// //   `${first?.[0] ?? ''}${last?.[0] ?? ''}`.toUpperCase();

// // const titleCase = (value?: string) =>
// //   value ? value.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : '—';

// // // ---------- primitive UI pieces ----------

// // type BadgeTone = 'success' | 'warning' | 'danger' | 'neutral' | 'accent';

// // const badgeTones: Record<BadgeTone, string> = {
// //   success: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
// //   warning: 'bg-amber-50 text-amber-700 ring-amber-600/20',
// //   danger: 'bg-rose-50 text-rose-700 ring-rose-600/20',
// //   neutral: 'bg-slate-100 text-slate-600 ring-slate-500/15',
// //   accent: 'bg-[#1E4FD8]/10 text-[#1E4FD8] ring-[#1E4FD8]/20',
// // };

// // const Badge = ({ tone = 'neutral', children }: { tone?: BadgeTone; children: React.ReactNode }) => (
// //   <span
// //     className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${badgeTones[tone]}`}
// //   >
// //     {children}
// //   </span>
// // );

// // const Dot = ({ tone = 'neutral' }: { tone?: BadgeTone }) => {
// //   const dotColor: Record<BadgeTone, string> = {
// //     success: 'bg-emerald-500',
// //     warning: 'bg-amber-500',
// //     danger: 'bg-rose-500',
// //     neutral: 'bg-slate-400',
// //     accent: 'bg-[#1E4FD8]',
// //   };
// //   return <span className={`h-1.5 w-1.5 rounded-full ${dotColor[tone]}`} />;
// // };

// // const Card = ({
// //   title,
// //   action,
// //   children,
// //   className = '',
// // }: {
// //   title?: string;
// //   action?: React.ReactNode;
// //   children: React.ReactNode;
// //   className?: string;
// // }) => (
// //   <section className={`rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/50 ${className}`}>
// //     {title && (
// //       <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
// //         <h2 className="text-sm font-semibold tracking-tight text-[#0B1220]">{title}</h2>
// //         {action}
// //       </div>
// //     )}
// //     <div className="p-5">{children}</div>
// //   </section>
// // );

// // const Field = ({ label, value, mono = false }: { label: string; value: React.ReactNode; mono?: boolean }) => (
// //   <div className="flex flex-col gap-1 py-2.5">
// //     <dt className="text-[11px] font-medium uppercase tracking-wide text-slate-400">{label}</dt>
// //     <dd className={`text-sm text-[#0B1220] ${mono ? 'font-mono tabular-nums' : 'font-medium'}`}>
// //       {value ?? '—'}
// //     </dd>
// //   </div>
// // );

// // const FieldGrid = ({ children }: { children: React.ReactNode }) => (
// //   <dl className="grid grid-cols-1 gap-x-6 divide-y divide-slate-50 sm:grid-cols-2 sm:divide-y-0">
// //     {children}
// //   </dl>
// // );

// // const Stat = ({ label, value }: { label: string; value: string }) => (
// //   <div className="px-5 py-4">
// //     <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">{label}</p>
// //     <p className="mt-1 font-mono text-lg font-semibold tabular-nums text-[#0B1220]">{value}</p>
// //   </div>
// // );

// // // ---------- status mapping ----------

// // const statusTone = (status: string): BadgeTone =>
// //   status === 'approved'
// //     ? 'success'
// //     : status === 'pending'
// //     ? 'warning'
// //     : status === 'rejected' || status === 'defaulted'
// //     ? 'danger'
// //     : 'neutral';

// // // ---------- timeline ----------

// // const actionIcon = (action: string) => {
// //   if (action.includes('Reverted')) {
// //     return (
// //       <svg viewBox="0 0 16 16" className="h-3 w-3 fill-none stroke-current stroke-[1.8]">
// //         <path d="M4 8h8M4 8l3-3M4 8l3 3" strokeLinecap="round" strokeLinejoin="round" />
// //       </svg>
// //     );
// //   }
// //   if (action.includes('Approval')) {
// //     return (
// //       <svg viewBox="0 0 16 16" className="h-3 w-3 fill-none stroke-current stroke-[1.8]">
// //         <path d="M3.5 8.2 6.5 11 12.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
// //       </svg>
// //     );
// //   }
// //   return (
// //     <svg viewBox="0 0 16 16" className="h-3 w-3 fill-none stroke-current stroke-[1.8]">
// //       <circle cx="8" cy="8" r="3" />
// //     </svg>
// //   );
// // };

// // const TimelineEntry = ({
// //   entry,
// //   isFirst,
// //   isLast,
// // }: {
// //   entry: { action: string; date: string; amount: number; status: string; _id: string };
// //   isFirst: boolean;
// //   isLast: boolean;
// // }) => {
// //   const tone = statusTone(entry.status);
// //   const iconColor: Record<BadgeTone, string> = {
// //     success: 'bg-emerald-500 text-white',
// //     warning: 'bg-amber-500 text-white',
// //     danger: 'bg-rose-500 text-white',
// //     neutral: 'bg-slate-300 text-white',
// //     accent: 'bg-[#1E4FD8] text-white',
// //   };

// //   return (
// //     <li className="relative flex gap-4 pb-6 last:pb-0">
// //       {!isLast && <span className="absolute left-[13px] top-6 h-full w-px bg-slate-200" />}
// //       <span
// //         className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ring-4 ring-white ${iconColor[tone]}`}
// //       >
// //         {actionIcon(entry.action)}
// //       </span>
// //       <div className="flex-1 pt-0.5">
// //         <div className="flex flex-wrap items-center gap-2">
// //           <p className="text-sm font-medium text-[#0B1220]">{entry.action}</p>
// //           {isFirst && <Badge tone="accent">Latest</Badge>}
// //         </div>
// //         <p className="mt-0.5 text-xs text-slate-400">{formatDateTime(entry.date)}</p>
// //         {entry.amount > 0 && (
// //           <p className="mt-1 font-mono text-sm tabular-nums text-[#0B1220]">
// //             {formatCurrency(entry.amount)}
// //           </p>
// //         )}
// //       </div>
// //       <Badge tone={tone}>
// //         <Dot tone={tone} />
// //         {titleCase(entry.status)}
// //       </Badge>
// //     </li>
// //   );
// // };

// // // ---------- page ----------

// // const LoanHistory = async ({ params }: IDParam) => {
// //   const { id } = await params;
// //   const res = (await getLoanDetails(id)) as any;
// //   const loan = res?.data;

// //   if (!loan) {
// //     return (
// //       <FlexCol className="gap-4">
// //         <BackButton />
// //         <div className="flex min-h-[40vh] flex-col items-center justify-center gap-2 text-center">
// //           <p className="text-sm font-medium text-slate-500">This loan could not be found.</p>
// //         </div>
// //       </FlexCol>
// //     );
// //   }

// //   const history = [...(loan.history ?? [])].sort(
// //     (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
// //   );

// //   const approvals = history.filter((h: any) => h.action === 'Loan Approval').length;
// //   const reversions = history.filter((h: any) => h.action.includes('Reverted')).length;

// //   const tone = statusTone(loan.status);
// //   const priorityTone: BadgeTone =
// //     loan.priority === 'high' || loan.priority === 'urgent' ? 'danger' : 'neutral';

// //   return (
// //     <FlexCol className="gap-6">
// //       <div className="min-h-screen bg-[#F6F7FB] pb-16">
//         {/* Header */}
//         <div className="border-b border-slate-200 bg-white">
//           <div className="mx-auto max-w-6xl px-6 py-8">
//             <BackButton />

//             <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
//               <div className="flex items-start gap-4">
//                 <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-lg font-semibold text-slate-400 ring-1 ring-slate-200">
//                   {initials(loan.user?.firstName, loan.user?.lastName)}
//                 </div>
//                 <div>
//                   <div className="flex flex-wrap items-center gap-2.5">
//                     <h1 className="text-xl font-semibold tracking-tight text-[#0B1220]">
//                       {loan.user?.firstName} {loan.user?.lastName}
//                     </h1>
//                     <Badge tone={tone}>
//                       <Dot tone={tone} />
//                       {titleCase(loan.status)}
//                     </Badge>
//                   </div>
//                   <p className="mt-1 font-mono text-sm text-slate-400">{loan.loanId}</p>
//                   <div className="mt-3 flex flex-wrap gap-2">
//                     <Badge tone="neutral">Priority: {titleCase(loan.priority)}</Badge>
//                     <Badge tone="neutral">{loan.purpose}</Badge>
//                     {reversions > 0 && (
//                       <Badge tone="warning">
//                         Approved &amp; reverted {reversions}× before landing on {titleCase(loan.status)}
//                       </Badge>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <div className="text-left sm:text-right">
//                 <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Loan ID</p>
//                 <p className="font-mono text-sm font-medium text-[#0B1220]">{loan.loanId}</p>
//                 <p className="mt-2 text-xs text-slate-400">Applied {formatDateTime(loan.appliedAt)}</p>
//               </div>
//             </div>

//             {/* Loan figures strip */}
//             <div className="mt-8 grid grid-cols-2 divide-x divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 sm:grid-cols-4">
//               <Stat label="Principal" value={formatCurrency(loan.amount)} />              
//               <Stat label="Interest" value={`${formatCurrency(loan.interestAmount)} (${loan.interestRate}%)`} />
//               <Stat label="Total repayment" value={formatCurrency(loan.totalRepayment)} />               <Stat label="Outstanding" value={formatCurrency(loan.outstandingAmount)} />
//              </div>
//            </div>
//          </div>

//         {/* Body */}
//         <div className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-6 px-6 lg:grid-cols-3">
//           {/* Left column */}
//           <div className="flex flex-col gap-6 lg:col-span-2">
//             <Card title="Approval timeline" action={<span className="text-xs text-slate-400">{history.length} events</span>}>
//               <ul>
//                 {history.map((entry: any, i: number) => (
//                   <TimelineEntry
//                     key={entry._id}
//                     entry={entry}
//                     isFirst={i === 0}
//                     isLast={i === history.length - 1}
//                   />
//                 ))}
//               </ul>
//             </Card>
//           </div>

//           {/* Right column */}
//           <div className="flex flex-col gap-6">
//             <Card title="Loan details">
//               <FieldGrid>
//                 <Field label="Business ID" value={loan.businessId} mono />
//                 <Field label="Loan profile ID" value={loan.loanProfileId} mono />
//                 <Field label="Purpose" value={loan.purpose} />
//                 <Field label="Priority" value={titleCase(loan.priority)} />
//                 <Field label="Wallet name" value={loan.walletName} />
//                 <Field label="Wallet number" value={loan.walletNumber} mono />
//               </FieldGrid>
//             </Card>

//             <Card title="Repayment plan">
//               <FieldGrid>
//                 <Field label="Installment" value={formatCurrency(loan.repaymentPlan?.amount)} mono />
//                 <Field label="Tenure" value={`${loan.repaymentPlan?.loanTenure} cycles`} />
//                 <Field label="Frequency" value={`Every ${loan.repaymentPlan?.repaymentFrequency} days`} />
//               </FieldGrid>
//             </Card>

// //             <Card title="People">
// //               <div className="flex flex-col gap-4">
// //                 <div>
// //                   <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Applicant</p>
// //                   <p className="mt-1 text-sm font-medium text-[#0B1220]">
// //                     {loan.user?.firstName} {loan.user?.lastName}
// //                   </p>
// //                   <p className="font-mono text-xs text-slate-400">{loan.user?.userId}</p>
// //                 </div>
// //                 <div>
// //                   <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Agent</p>
// //                   <p className="mt-1 text-sm font-medium text-[#0B1220]">
// //                     {loan.agent?.firstName} {loan.agent?.lastName}
// //                   </p>
// //                   <p className="font-mono text-xs text-slate-400">{loan.agent?.userId}</p>
// //                 </div>
// //                 {loan.processedBy && (
// //                   <div>
// //                     <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Processed by</p>
// //                     <p className="mt-1 font-mono text-xs text-slate-500">{loan.processedBy}</p>
// //                   </div>
// //                 )}
// //               </div>
// //             </Card>

// //             <Card title="Record meta">
// //               <FieldGrid>
// //                 <Field label="Created" value={formatDateTime(loan.createdAt)} />
// //                 <Field label="Last updated" value={formatDateTime(loan.updatedAt)} />
// //               </FieldGrid>
// //             </Card>
// //           </div>
// //         </div>
// //       </div>
// //     </FlexCol>
// //   );
// // };

// // export default LoanHistory;
