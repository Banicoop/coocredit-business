import { getCustomerDetails } from '@/lib/api';
import { IDParam } from '@/types/types';
import React from 'react';
import LeadActions from './LeadActions';


// ---------- helpers ----------

const formatDate = (value?: string) =>
  value
    ? new Date(value).toLocaleDateString('en-NG', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : '—';

const formatDateTime = (value?: string) =>
  value
    ? new Date(value).toLocaleString('en-NG', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '—';

export const initials = (first?: string, last?: string) =>
  `${first?.[0] ?? ''}${last?.[0] ?? ''}`.toUpperCase();

export const titleCase = (value?: string) =>
  value ? value.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : '—';

// ---------- primitive UI pieces ----------

export type BadgeTone = 'success' | 'warning' | 'danger' | 'neutral' | 'accent';

const badgeTones: Record<BadgeTone, string> = {
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

const Card = ({
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

const Field = ({ label, value, className, mono = false }: { label: string; value: React.ReactNode; className?: string; mono?: boolean }) => (
  <div className={`flex flex-col gap-1 py-2.5 ${className}`}>
    <dt className="text-[11px] font-medium uppercase tracking-wide text-slate-400">{label}</dt>
    <dd className={`text-sm text-[#0B1220] ${mono ? 'font-mono tabular-nums' : 'font-medium'}`}>
      {value ?? '—'}
    </dd>
  </div>
);

const FieldGrid = ({ children }: { children: React.ReactNode }) => (
  <dl className="grid grid-cols-1 gap-x-6 divide-y divide-slate-50 sm:grid-cols-2 sm:divide-y-0">
    {children}
  </dl>
);

const EmptyState = ({ message }: { message: string }) => (
  <p className="rounded-lg bg-slate-50 px-4 py-3 text-xs text-slate-400">{message}</p>
);

// ---------- readiness checklist item ----------

const ChecklistItem = ({ label, done }: { label: string; done: boolean }) => (
  <li className="flex items-center gap-2.5 py-1.5">
    <span
      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
        done ? 'bg-emerald-500' : 'bg-slate-200'
      }`}
    >
      {done && (
        <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 fill-none stroke-white stroke-[2.2]">
          <path d="M2.5 6.2 5 8.7 9.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
    <span className={`text-sm ${done ? 'text-slate-500 line-through decoration-slate-300' : 'text-[#0B1220]'}`}>
      {label}
    </span>
  </li>
);

// ---------- page ----------

const LeadDetails = async ({ params }: IDParam) => {
  const { id } = await params;
  const res = (await getCustomerDetails(id)) as any;
  console.log('LEAD:', res);
  const lead = res?.data;

  if (!lead) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-2 bg-[#F6F7FB] text-center">
        <p className="text-sm font-medium text-slate-500">This lead could not be found.</p>
      </div>
    );
  }

  const checklist = [
    { label: 'Phone number verified', done: !!lead.phoneVerified },
    { label: 'Email address verified', done: !!lead.emailVerified },
    { label: 'Transaction PIN created', done: !!lead.pinCreated },
    { label: 'Business details added', done: (lead.businesses?.length ?? 0) > 0 },
    { label: 'Disbursement bank account added', done: (lead.disbursementBankAccounts?.length ?? 0) > 0 },
    { label: 'KYC documents uploaded', done: (lead.kycDocuments?.length ?? 0) > 0 },
  ];
  const completedCount = checklist.filter((c) => c.done).length;

  

  return (
    <div className="min-h-screen bg-[#F6F7FB] pb-16">
      {/* Header */}
      <LeadActions lead={lead}/>

      {/* Body */}
      <div className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-6 px-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Card title="Personal information">
            <FieldGrid>
              <Field label="Email" value={lead.email} mono />
              <Field label="Phone number" value={lead.phoneNumber} mono />
              <Field label="BVN phone number" value={lead.bvnPhoneNumber} mono />
              <Field label="Date of birth" value={formatDate(lead.dateOfBirth)} />
              <Field label="Gender" value={lead.gender} />
              <Field label="Country" value={lead.country} />
              <Field label="OTP preference" value={titleCase(lead.otpPreference)} />
              <Field label="Applicant type" value={lead.type} />
            </FieldGrid>
          </Card>

          <Card title="Business information">
            {lead.businesses?.length > 0 ? (
              <FieldGrid>
                {lead.businesses.map((business: any) => (
                  <React.Fragment key={business._id}>
                    <Field label="Business name" value={business.businessName} />
                    <Field label="Registration number" value={business.registrationNumber} mono />
                  </React.Fragment>
                ))}
              </FieldGrid>
            ) : (
              <EmptyState message="No business details submitted yet." />
            )}
          </Card>

          <Card title="Disbursement bank accounts">
            {lead.disbursementBankAccounts?.length > 0 ? (
              <div className="flex flex-col divide-y divide-slate-100">
                {lead.disbursementBankAccounts.map((account: any) => (
                  <div key={account._id} className="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-0 last:pb-0">
                    <div>
                      <p className="text-sm font-medium text-[#0B1220]">{account.accountName}</p>
                      <p className="mt-0.5 font-mono text-sm text-slate-500">
                        {account.accountNumber} · {account.name}
                      </p>
                    </div>
                    <p className="text-xs text-slate-400">Verified {formatDate(account.verifiedAt)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState message="No bank account has been added yet." />
            )}
          </Card>

          <Card title="KYC documents">
            {lead.kycDocuments?.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {lead.kycDocuments.map((doc: any) => (
                  <a
                    key={doc.id}
                    href={doc.documentURL}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-4 rounded-xl border border-slate-200 p-3 transition hover:border-[#1E4FD8]/40 hover:bg-[#1E4FD8]/[0.03]"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#0B1220]">{titleCase(doc.type)}</p>
                      <p className="text-xs text-slate-400">{titleCase(doc.category)}</p>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <EmptyState message="No documents have been uploaded yet." />
            )}
          </Card>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          <Card title="Readiness checklist">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">
                {completedCount} of {checklist.length} complete
              </span>
              <span className="text-xs font-semibold text-[#1E4FD8]">
                {Math.round((completedCount / checklist.length) * 100)}%
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-[#1E4FD8] transition-all"
                style={{ width: `${(completedCount / checklist.length) * 100}%` }}
              />
            </div>
            <ul className="mt-4">
              {checklist.map((item) => (
                <ChecklistItem key={item.label} label={item.label} done={item.done} />
              ))}
            </ul>
          </Card>

          <Card title="Risk & identity">
            <FieldGrid>
              <Field label="Identity score" value={lead.identityScore} mono />
              <Field label="Risk profile" value={titleCase(lead.identityDescription)} />
              <Field
                label="KYC upgrade required"
                value={lead.kycWalletInfo?.requiredKycUpgradeAction ? 'Yes' : 'No'}
              />
            </FieldGrid>
          </Card>

          <Card title="Application meta">
            <FieldGrid>
              <Field label="User ID" className='col-span-2' value={lead.userId} mono />
              <Field label="Agent ID" className='col-span-2' value={lead.agentId} mono />
              <Field label="Onboarding stage" value={titleCase(lead.onboardingStage)} />
              <Field label="Created" value={formatDateTime(lead.createdAt)} />
              <Field label="Last updated" value={formatDateTime(lead.updatedAt)} />
            </FieldGrid>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;
