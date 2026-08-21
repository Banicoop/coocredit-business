import { BackButton } from '@/components/primitives/buttons/BackButton';
import { FlexCol } from '@/components/ui/ui-layout';
import { IDParam } from '@/types/types';
import { agentGetBusinessCustomersDetails, agentGetSupportedDocs } from '@/lib/api.agent';
import Image from 'next/image';
import { Badge, BadgeTone, Card, Dot, EmptyState, Field, FieldGrid, Stat } from '@/components/primitive-ui/card-ui';
import { formatCurrency, formatDate, formatDateTime, initials, titleCase } from '@/helpers/funcs';
import { ProgressBar } from '@/components/ui/ProgessBar';
import BusinessDocuments from '../_sections/BusinessDocuments';



const CustomerDetails = async ({ params }: IDParam) => {
  const { id } = await params;
  const res = (await agentGetBusinessCustomersDetails(id)) as any;
  const customer = res?.data;

  const documents = (await agentGetSupportedDocs()) as {
    data: {
      slug: string;
      name: string;
    }[];
  };;


  if (!customer) {
    return (
      <FlexCol className="gap-4">
        <BackButton />
        <div className="flex min-h-[40vh] flex-col items-center justify-center gap-2 text-center">
          <p className="text-sm font-medium text-slate-500">This customer record could not be found.</p>
        </div>
      </FlexCol>
    );
  }

  
  const business = customer.businesses;
  const loan = customer.loanProfile;
  const summary = customer.accountSummary;
  const currentLoan = customer.currentLoan;

  const riskTone: BadgeTone =
    customer.identityDescription === 'low_risk'
      ? 'success'
      : customer.identityDescription === 'high_risk'
      ? 'danger'
      : 'warning';
  const verificationTone: BadgeTone = customer.verification?.verificationStatus === 'success' ? 'success' : 'warning';

  const loanStatusTone: BadgeTone =
    currentLoan?.status === 'active'
      ? 'success'
      : currentLoan?.status === 'pending'
      ? 'warning'
      : currentLoan?.status === 'defaulted' || currentLoan?.status === 'rejected'
      ? 'danger'
      : 'neutral';

  const gradeTone: BadgeTone =
    loan?.grade === 'A' ? 'success' : loan?.grade === 'B' ? 'accent' : loan?.grade === 'C' ? 'warning' : 'danger';

  const ledgerItems = [
    { label: 'Booked balance', value: customer.bookedBalance },
    { label: 'Available balance', value: customer.availableBalance },
    { label: 'Credit lien', value: customer.creditLienBalance },
    { label: 'Debit lien', value: customer.debitLienBalance },
  ];

  const creditScore = Math.round(loan?.creditScore) || 0;

  return (
    <FlexCol className="gap-6">
      <div className="min-h-screen bg-[#F6F7FB] pb-16">
        {/* Header */}
        <div className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-6 py-8">
            <BackButton />

            <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-200">
                  {customer.profileImage ? (
                    <Image
                      src={customer.profileImage}
                      alt={`${customer.firstName} ${customer.lastName}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-slate-400">
                      {initials(customer.firstName, customer.lastName)}
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h1 className="text-xl font-semibold tracking-tight text-[#0B1220]">
                      {customer.firstName} {customer.lastName}
                    </h1>
                    <Badge tone={customer.disabled ? 'danger' : 'success'}>
                      <Dot tone={customer.disabled ? 'danger' : 'success'} />
                      {customer.disabled ? 'Disabled' : 'Active'}
                    </Badge>
                  </div>
                  <p className="mt-1 font-mono text-sm text-slate-400">@{customer.username}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge tone="neutral">{titleCase(customer.role)}</Badge>
                    <Badge tone="neutral">KYC {customer.kycLevel}</Badge>
                    <Badge tone={riskTone}>{titleCase(customer.identityDescription)}</Badge>
                    {loan?.verified && <Badge tone="accent">Credit verified</Badge>}
                    {loan?.grade && <Badge tone={gradeTone}>Grade {loan.grade}</Badge>}
                  </div>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  Customer reference
                </p>
                <p className="font-mono text-sm font-medium text-[#0B1220]">{customer.customerReference}</p>
                <p className="mt-2 text-xs text-slate-400">Customer since {formatDate(customer.dateCreated)}</p>
              </div>
            </div>

            {/* Balance ledger strip */}
            <div className="mt-8 grid grid-cols-2 divide-x divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 sm:grid-cols-4">
              {ledgerItems.map((item) => (
                <Stat key={item.label} label={item.label} value={formatCurrency(item.value)} />
              ))}
            </div>

            {/* Loan summary strip */}
            {summary && (
              <div className="mt-4 grid grid-cols-2 divide-x divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 sm:grid-cols-5">
                <Stat label="Total borrowed" value={formatCurrency(summary.totalBorrowed)} />
                <Stat label="Total repaid" value={formatCurrency(summary.totalRepaid)} />
                <Stat label="Outstanding" value={formatCurrency(summary.outstandingBalance)} />
                <Stat label="Active loans" value={String(summary.activeLoans ?? 0)} />
                <Stat label="Total loans" value={String(summary.totalLoans ?? 0)} />
              </div>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="mx-auto mt-8 grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left column */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <Card title="Personal information">
              <FieldGrid>
                <Field label="Phone number" value={customer.phoneNumber} mono />
                <Field label="BVN phone number" value={customer.bvnPhoneNumber} mono />
                <Field label="Date of birth" value={formatDate(customer.dateOfBirth)} />
                <Field label="Gender" value={customer.gender} />
                <Field label="Country" value={customer.country} />
                <Field label="NIN" value={customer.nin} mono />
                <Field label="OTP preference" value={titleCase(customer.otpPreference)} />
                <Field label="PIN created" value={customer.pinCreated ? 'Yes' : 'No'} />
              </FieldGrid>
            </Card>

            <BusinessDocuments business={business} documents={documents}/>

            <Card title="Disbursement bank accounts">
              {customer.disbursementBankAccounts?.length > 0 ? (
                <div className="flex flex-col divide-y divide-slate-100">
                  {customer.disbursementBankAccounts.map((account: any) => (
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
              ) : (
                <EmptyState message="No bank account has been added yet." />
              )}
            </Card>
              
              {currentLoan ?
              currentLoan.map((currentLoan: any) => (
                <Card
                  key={currentLoan.loanId}
                  title="Current loan"
                  action={currentLoan && <Badge tone={loanStatusTone}><Dot tone={loanStatusTone} />{titleCase(currentLoan.status)}</Badge>}
                    >
                      <FieldGrid key={currentLoan.loanId}>
                        <Field label="Loan ID" value={currentLoan.loanId} mono />
                        <Field label="Purpose" value={currentLoan.purpose} />
                        <Field label="Principal amount" value={formatCurrency(currentLoan.amount)} mono />
                        <Field label="Interest amount" value={formatCurrency(currentLoan.interestAmount || 0)} mono />
                        <Field label="Interest rate" value={`${currentLoan.interestRate}%`} mono />
                        <Field label="Total repayment" value={formatCurrency(currentLoan.totalRepayment)} mono />
                        <Field label="Outstanding amount" value={formatCurrency(currentLoan.outstandingAmount)} mono />
                        <Field label="Priority" value={titleCase(currentLoan.priority)} />
                      </FieldGrid>

                      {currentLoan.repaymentPlan && (
                        <div className="mt-2 rounded-xl bg-slate-50 p-4">
                          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                            Repayment plan
                          </p>
                          <p className="mt-1.5 text-sm font-medium text-[#0B1220]">
                            <span className="font-mono tabular-nums">
                              {formatCurrency(currentLoan.repaymentPlan.amount)}
                            </span>{' '}
                            every {currentLoan.repaymentPlan.repaymentFrequency} days for{' '}
                            {currentLoan.repaymentPlan.loanTenure} cycles
                          </p>
                        </div>
                      )}

                      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-xs text-slate-400">
                        <span>Applied by <span className="font-mono text-slate-500">{currentLoan.appliedBy}</span></span>
                        <span>Applied {formatDateTime(currentLoan.appliedAt)}</span>
                      </div>
                </Card>
                )): 
                 <EmptyState message="This customer has no active loan application." />
                }


            <Card title="Recent transactions">
              {customer.recentTransactions?.length > 0 ? (
                <div className="flex flex-col divide-y divide-slate-100">
                  {customer.recentTransactions.map((txn: any, i: number) => (
                    <div key={txn._id ?? i} className="flex items-center justify-between py-3">
                      <p className="text-sm text-[#0B1220]">{titleCase(txn.type)}</p>
                      <p className="font-mono text-sm tabular-nums text-[#0B1220]">
                        {formatCurrency(txn.amount)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState message="No transactions recorded yet." />
              )}
            </Card>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            <Card title="Wallet & account">
              <FieldGrid>
                <Field label="Wallet name" value={customer.walletName} />
                <Field label="Wallet number" value={customer.walletNumber} mono />
                <Field label="Wallet ID" value={customer.walletId} mono />
                <Field label="Account name" value={customer.accountName} />
                <Field label="Account number" value={customer.accountNumber} mono />
                <Field label="Bank" value={`${customer.bank?.name} (${customer.bank?.code})`} />
                <Field label="Scheme ID" value={customer.schemeId} className='col-span-2' />
                <Field label="User ID" value={customer.userId} className='col-span-2' />
              </FieldGrid>
            </Card>

            <Card title="KYC documents">
              {customer.kycDocuments?.length > 0 ? (
                <div className="grid gap-4 ">
                  {customer.kycDocuments.map((doc: any) => (
                    <a
                      key={doc.id}
                      href={doc.documentURL}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-4 rounded-xl border border-slate-200 p-3 transition hover:border-[#1E4FD8]/40 hover:bg-[#1E4FD8]/3"
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
              ) : (
                <EmptyState message="No documents have been uploaded yet." />
              )}
            </Card>

            {loan && (
              <Card title="Credit profile">
                <div className="flex flex-col">
                  <span className="text-sm text-slate-500">Credit score</span>
                  <div className="flex items-center gap-2.5">
                      <ProgressBar value={creditScore} className='bg-primary'/>
                      <span>{creditScore}%</span>
                  </div>
                </div>
                <div className="mt-4">
                  <FieldGrid>
                    <Field label="Credit limit" value={formatCurrency(loan.limit)} mono />
                    <Field label="Grade" value={loan.grade} />
                    <Field label="Access level" value={titleCase(loan.access)} />
                    <Field label="Risk" value={titleCase(loan.risk)} />
                    <Field label="Business segment" value={titleCase(loan.businessSegment)} />
                    <Field label="Consecutive repayments" value={loan.consecutiveRepayments} mono />
                  </FieldGrid>
                </div>
                <p className="mt-1 text-xs text-slate-400">
                  Last upgrade check {formatDateTime(loan.lastUpgradeCheck)}
                </p>
              </Card>
            )}

            <Card title="Verification & risk">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Status</span>
                <Badge tone={verificationTone}>
                  <Dot tone={verificationTone} />
                  {titleCase(customer.verification?.verificationStatus)}
                </Badge>
              </div>
              <div className="mt-4">
                <FieldGrid>
                  <Field label="Identity score" value={customer.identityScore} mono />
                  <Field label="Risk profile" value={titleCase(customer.identityDescription)} />
                  <Field label="Last attempt" value={formatDateTime(customer.verification?.lastVerificationAttempt)} />
                  <Field label="Verified by" value={customer.verification?.verifiedBy} className='col-span-2' />
                </FieldGrid>
              </div>
            </Card>

            <Card title="Account activity">
              <FieldGrid>
                <Field label="Onboarding stage" className='col-span-2' value={titleCase(customer.onboardingStage)} />
                <Field label="Agent ID" className='col-span-2' value={customer.agentId} />
                <Field label="Created" value={formatDateTime(customer.createdAt)} />
                <Field label="Last updated" value={formatDateTime(customer.updatedAt)} />
              </FieldGrid>
            </Card>
          </div>
        </div>
      </div>
    </FlexCol>
  );
};

export default CustomerDetails;
