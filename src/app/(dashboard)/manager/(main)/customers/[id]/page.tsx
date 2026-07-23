import { getCustomerDetails } from '@/lib/api';
import { IDParam } from '@/types/types';
import Image from 'next/image';
import React from 'react';

// ---------- helpers ----------

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
  }).format(value ?? 0);

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

const initials = (first?: string, last?: string) =>
  `${first?.[0] ?? ''}${last?.[0] ?? ''}`.toUpperCase();

const titleCase = (value?: string) =>
  value ? value.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : '—';

// ---------- primitive UI pieces ----------

type BadgeTone = 'success' | 'warning' | 'danger' | 'neutral' | 'accent';

const badgeTones: Record<BadgeTone, string> = {
  success: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  warning: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  danger: 'bg-rose-50 text-rose-700 ring-rose-600/20',
  neutral: 'bg-slate-100 text-slate-600 ring-slate-500/15',
  accent: 'bg-[#1E4FD8]/10 text-[#1E4FD8] ring-[#1E4FD8]/20',
};

const Badge = ({ tone = 'neutral', children }: { tone?: BadgeTone; children: React.ReactNode }) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${badgeTones[tone]}`}
  >
    {children}
  </span>
);

const Dot = ({ tone = 'neutral' }: { tone?: BadgeTone }) => {
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

const Field = ({ label, value, mono = false }: { label: string; value: React.ReactNode; mono?: boolean }) => (
  <div className="flex flex-col gap-1 py-2.5">
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

// ---------- page ----------

const CustomerDetails = async ({ params }: IDParam) => {
  const { id } = await params;
  const res = (await getCustomerDetails(id)) as any;
  const data = res?.data;

  if (!data) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-2 bg-[#F6F7FB] text-center">
        <p className="text-sm font-medium text-slate-500">This customer record could not be found.</p>
      </div>
    );
  }

  const business = data.businesses?.[0];
  const kycTone: BadgeTone = data.kycLevel === 'Level2' ? 'success' : 'warning';
  const riskTone: BadgeTone =
    data.identityDescription === 'low_risk'
      ? 'success'
      : data.identityDescription === 'high_risk'
      ? 'danger'
      : 'warning';
  const verificationTone: BadgeTone =
    data.verification?.verificationStatus === 'success' ? 'success' : 'warning';

  const ledgerItems = [
    { label: 'Booked balance', value: data.bookedBalance },
    { label: 'Available balance', value: data.availableBalance },
    { label: 'Credit lien', value: data.creditLienBalance },
    { label: 'Debit lien', value: data.debitLienBalance },
  ];

  return (
    <div className="min-h-screen bg-[#F6F7FB] pb-16">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-200">
                {data.profileImage ? (
                  <Image
                    src={data.profileImage}
                    alt={`${data.firstName} ${data.lastName}`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-slate-400">
                    {initials(data.firstName, data.lastName)}
                  </div>
                )}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-xl font-semibold tracking-tight text-[#0B1220]">
                    {data.firstName} {data.lastName}
                  </h1>
                  <Badge tone={data.disabled ? 'danger' : 'success'}>
                    <Dot tone={data.disabled ? 'danger' : 'success'} />
                    {data.disabled ? 'Disabled' : 'Active'}
                  </Badge>
                </div>
                <p className="mt-1 font-mono text-sm text-slate-400">@{data.username}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge tone="neutral">{titleCase(data.role)}</Badge>
                  <Badge tone={kycTone}>KYC {data.kycLevel}</Badge>
                  <Badge tone={riskTone}>{titleCase(data.identityDescription)}</Badge>
                  <Badge tone={data.phoneVerified ? 'success' : 'neutral'}>
                    {data.phoneVerified ? 'Phone verified' : 'Phone unverified'}
                  </Badge>
                  <Badge tone={data.emailVerified ? 'success' : 'neutral'}>
                    {data.emailVerified ? 'Email verified' : 'Email unverified'}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                Customer reference
              </p>
              <p className="font-mono text-sm font-medium text-[#0B1220]">{data.customerReference}</p>
              <p className="mt-2 text-xs text-slate-400">Customer since {formatDate(data.dateCreated)}</p>
            </div>
          </div>

          {/* Ledger strip — signature element */}
          <div className="mt-8 grid grid-cols-2 divide-x divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 sm:grid-cols-4">
            {ledgerItems.map((item) => (
              <div key={item.label} className="px-5 py-4">
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  {item.label}
                </p>
                <p className="mt-1 font-mono text-lg font-semibold tabular-nums text-[#0B1220]">
                  {formatCurrency(item.value)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-6 px-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Card title="Personal information">
            <FieldGrid>
              <Field label="Phone number" value={data.phoneNumber} mono />
              <Field label="BVN phone number" value={data.bvnPhoneNumber} mono />
              <Field label="Date of birth" value={formatDate(data.dateOfBirth)} />
              <Field label="Gender" value={data.gender} />
              <Field label="Country" value={data.country} />
              <Field label="NIN" value={data.nin} mono />
              <Field label="OTP preference" value={titleCase(data.otpPreference)} />
              <Field label="PIN created" value={data.pinCreated ? 'Yes' : 'No'} />
            </FieldGrid>
          </Card>

          {business && (
            <Card title="Business information">
              <FieldGrid>
                <Field label="Business name" value={business.businessName} />
                <Field label="Business ID" value={business.businessId} mono />
                <Field label="Category" value={business.type} />
                <Field label="Business type" value={titleCase(business.businessType)} />
                <Field label="Registration number" value={business.registrationNumber} mono />
                <Field label="Estimated profit" value={formatCurrency(business.estimatedProfit)} />
              </FieldGrid>
              {business.verificationDocuments?.length === 0 && (
                <p className="mt-2 rounded-lg bg-slate-50 px-4 py-3 text-xs text-slate-400">
                  No business verification documents uploaded yet.
                </p>
              )}
            </Card>
          )}

          <Card title="Disbursement bank accounts">
            <div className="flex flex-col divide-y divide-slate-100">
              {data.disbursementBankAccounts?.map((account: any) => (
                <div key={account._id} className="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-0 last:pb-0">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-[#0B1220]">{account.accountName}</p>
                      {account.isPrimary && <Badge tone="accent">Primary</Badge>}
                    </div>
                    <p className="mt-0.5 font-mono text-sm text-slate-500">
                      {account.accountNumber} · {account.name}
                    </p>
                  </div>
                  <p className="text-xs text-slate-400">Verified {formatDate(account.verifiedAt)}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card title="KYC documents">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {data.kycDocuments?.map((doc: any) => (
                <a
                  key={doc.id}
                  href={doc.documentURL}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-xl border border-slate-200 p-3 transition hover:border-[#1E4FD8]/40 hover:bg-[#1E4FD8]/[0.03]"
                >
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                    <Image
                      src={doc.documentURL}
                      alt={doc.type}
                      width={56}
                      height={56}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#0B1220]">{titleCase(doc.type)}</p>
                    <p className="text-xs text-slate-400">{titleCase(doc.category)}</p>
                    {doc.issuedDate && (
                      <p className="mt-0.5 text-xs text-slate-400">Issued {formatDate(doc.issuedDate)}</p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </Card>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          <Card title="Wallet & account">
            <FieldGrid>
              <Field label="Wallet name" value={data.walletName} />
              <Field label="Wallet number" value={data.walletNumber} mono />
              <Field label="Wallet ID" value={data.walletId} mono />
              <Field label="Account name" value={data.accountName} />
              <Field label="Account number" value={data.accountNumber} mono />
              <Field label="Bank" value={`${data.bank?.name} (${data.bank?.code})`} />
              <Field label="Scheme ID" value={data.schemeId} mono />
              <Field label="User ID" value={data.userId} mono />
            </FieldGrid>
          </Card>

          <Card title="Verification & risk">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Status</span>
              <Badge tone={verificationTone}>
                <Dot tone={verificationTone} />
                {titleCase(data.verification?.verificationStatus)}
              </Badge>
            </div>
            <div className="mt-4">
              <FieldGrid>
                <Field label="Identity score" value={data.identityScore} mono />
                <Field label="Risk profile" value={titleCase(data.identityDescription)} />
                <Field label="Last attempt" value={formatDateTime(data.verification?.lastVerificationAttempt)} />
                <Field label="Verified by" value={data.verification?.verifiedBy} mono />
              </FieldGrid>
            </div>
            {data.kycWalletInfo?.requiredKycUpgradeAction && (
              <p className="mt-2 rounded-lg bg-amber-50 px-4 py-3 text-xs text-amber-700 ring-1 ring-inset ring-amber-600/20">
                This customer needs a KYC upgrade action.
              </p>
            )}
          </Card>

          <Card title="Account activity">
            <FieldGrid>
              <Field label="Onboarding stage" value={titleCase(data.onboardingStage)} />
              <Field label="Agent ID" value={data.agentId} mono />
              <Field label="Created" value={formatDateTime(data.createdAt)} />
              <Field label="Last updated" value={formatDateTime(data.updatedAt)} />
            </FieldGrid>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
