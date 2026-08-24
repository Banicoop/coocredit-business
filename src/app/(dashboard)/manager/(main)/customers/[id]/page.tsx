import { FlexCol, Grid } from '@/components/ui/ui-layout';
import { BackButton } from '@/components/primitives/buttons/BackButton';
import { Badge, BadgeTone, Card, Dot, Field, FieldGrid } from '@/components/primitive-ui/card-ui';
import { getCustomerDetails } from '@/lib/api';
import { IDParam } from '@/types/types';
import Image from 'next/image';
import { formatCurrency, formatDate, formatDateTime, initials, titleCase } from '@/helpers/funcs';
import Typography from '@/components/primitives/Typography';



// ---------- page ----------

const CustomerDetails = async ({ params }: IDParam) => {
  const { id } = await params;
  const res = (await getCustomerDetails(id)) as any;
  const data = res?.data;
  // console.log('customer:', data);
  
  if (!data) {
    return (
      <FlexCol className='gap-4 bg-card'>
        <BackButton/>
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-2  text-center">
          <p className="text-sm font-medium text-slate-500">This customer record could not be found.</p>
        </div>
      </FlexCol>
    );
  }
  
  const business = data.businesses;
  console.log('docs:', business[0]?.verificationDocuments[0].type);
  const kycTone: BadgeTone = data.kycLevel === 'Level2' ? 'success' : 'warning';
  const riskTone: BadgeTone =
  data.identityDescription === 'low_risk'
  ? 'success'
  : data.identityDescription === 'high_risk'
  ? 'danger'
      : 'warning';
  const verificationTone: BadgeTone = data.verification?.verificationStatus === 'success' ? 'success' : 'warning';

  const ledgerItems = [
    { label: 'Booked balance', value: data.bookedBalance },
    { label: 'Available balance', value: data.availableBalance },
    { label: 'Credit lien', value: data.creditLienBalance },
    { label: 'Debit lien', value: data.debitLienBalance },
  ];

  return (
    <div className="min-h-screen bg-[#F6F7FB] pb-16">
      <BackButton/>
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
      <div className="mx-auto mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
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

          {business && business.map((business: any) => (
            <Card title="Business information" key={business.businessId}>
              <FieldGrid>
                <Field label="Business name" value={business.businessName} />
                <Field label="Business ID" value={business.businessId} mono />
                <Field label="Category" value={business.type} />
                <Field label="Business type" value={titleCase(business.businessType)} />
                <Field label="Registration number" value={business.registrationNumber} mono />
                <Field label="Estimated profit" value={formatCurrency(business.estimatedProfit)} />
              </FieldGrid>
              {business.verificationDocuments?.length > 0 ? (
                <FlexCol className='gap-5'>
                  <Typography variant='h4' weight='semibold' className='mt-4'>Verification Documents</Typography>
                  <hr className='h-0.5'/>
                  <Grid className="grid-cols-2 gap-6">
                   {business.verificationDocuments?.map((doc: any) => (
                      <a
                        key={doc._id}
                        href={doc.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center gap-4 rounded-xl border border-slate-200 p-3 transition hover:border-[#1E4FD8]/40 hover:bg-[#1E4FD8]/[0.03]"
                      >
                        {/* Image */}
                        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                          <Image
                            src={doc.url}
                            alt={doc.type}
                            width={56}
                            height={56}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        {/* Document information */}
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-[#0B1220]">
                            {titleCase(doc.type)}
                          </p>
                          <p className="text-xs text-slate-400">
                            {doc.mime}
                          </p>
                        </div>
                      </a>
                    ))}
                  </Grid>
                </FlexCol>
              ): (
                <p className="mt-2 rounded-lg bg-slate-50 px-4 py-3 text-xs text-slate-400">
                  No business verification documents uploaded yet.
                </p>
              )}
            </Card>
          )) 
          }

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
              <Field label="Scheme ID" value={data.schemeId} mono className='col-span-2'/>
              <Field label="User ID" className='col-span-2' value={data.userId} mono />
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
                <Field label="Verified by" className='col-span-2' value={data.verification?.verifiedBy} mono />
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
              <Field label="Created" value={formatDateTime(data.createdAt)} />
              <Field label="Last updated" value={formatDateTime(data.updatedAt)} />
              <Field label="Agent ID" className='col-span-2' value={data.agentId} mono />
            </FieldGrid>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
