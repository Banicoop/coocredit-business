import { getCustomerDetails } from '@/lib/api';
import { IDParam } from '@/types/types';
import React from 'react';
import LeadActions from './LeadActions';
import { Card, EmptyState, Field, FieldGrid } from '@/components/primitive-ui/card-ui';
import { formatDate, formatDateTime, titleCase } from '@/helpers/funcs';
import { FlexCol } from '@/components/ui/ui-layout';
import { BackButton } from '@/components/primitives/buttons/BackButton';


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
  const lead = res?.data;

  if (!lead) {
    return (
      <FlexCol className='gap-4'>
        <BackButton/>
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-2 bg-[#F6F7FB] text-center">
          <p className="text-sm font-medium text-slate-500">This lead could not be found.</p>
        </div>
      </FlexCol>
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
      <div className="mx-auto mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
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
                    className="group flex items-center gap-4 rounded-xl border border-slate-200 p-3 transition hover:border-[#1E4FD8]/40 hover:bg-[#1E4FD8]/3"
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
