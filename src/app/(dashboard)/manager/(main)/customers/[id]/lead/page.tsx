import { getCustomerDetails } from '@/lib/api';
import { IDParam } from '@/types/types';
import React from 'react';
import LeadActions from './LeadActions';
import { Card, EmptyState, Field, FieldGrid } from '@/components/primitive-ui/card-ui';
import { formatCurrency, formatDate, formatDateTime, formatDocumentType, titleCase } from '@/helpers/funcs';
import { FlexCol } from '@/components/ui/ui-layout';
import { BackButton } from '@/components/primitives/buttons/BackButton';
import KycDocuments from '@/components/documents/KYCDocument';


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
        <>
          {lead.businesses.map((business: any) => (
            <React.Fragment key={business._id}>
              <FieldGrid>
                <Field label="Business name" value={business.businessName} />
                <Field label="Registration number" value={business.registrationNumber} mono/>
                <Field label="State" value={titleCase(business.location?.state)} mono />
                <Field label="LGA of Business" value={titleCase(business.location?.localGovernment)} mono/>
                <Field label="Business Type" value={titleCase(business.type)} mono />
                <Field label="Estimated Profit" value={formatCurrency(business.estimatedProfit)} mono />
              </FieldGrid>

          {/* Verification Documents */}
          <div className="mt-6 border-t border-slate-200 pt-6">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-slate-900">
                Verification Documents
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Documents submitted for business verification.
              </p>
            </div>

            {business.verificationDocuments?.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {business.verificationDocuments.map((doc: any) => {
                  const isImage = doc.mime?.startsWith('image/');
                  return (
                    <a
                      key={doc._id}
                      href={doc.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-slate-300 hover:shadow-sm"
                    >
                      {/* Preview */}
                      <div className="relative flex h-10 items-center justify-center overflow-hidden bg-slate-100">
                        {isImage ? (
                          <img
                            src={doc.url}
                            alt={formatDocumentType(doc.type)}
                            className="h-full w-full object-cover transition duration-200 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                            <span className="text-4xl">📄</span>
                            <span className="text-xs">
                              Document
                            </span>
                          </div>
                        )}
                      </div>
                      {/* Document information */}
                      <div className="flex items-center justify-between gap-3 p-4">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-900">
                            {formatDocumentType(doc.type)}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {doc.mime}
                          </p>
                          <p className="mt-1 truncate font-mono text-xs text-slate-400">
                            {doc.documentId}
                          </p>
                        </div>
                        <span className="shrink-0 text-sm font-medium text-blue-600 group-hover:text-blue-700">
                          View
                        </span>
                      </div>
                    </a>
                       );
                        })}
                      </div>
                    ) : (
                      <EmptyState message="No verification documents submitted." />
                    )}
                    </div>
                  </React.Fragment>
                ))}
              </>
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
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          <Card title="KYC documents">
            <KycDocuments documents={lead.kycDocuments} className='flex flex-col gap-4'/>
          </Card>
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
