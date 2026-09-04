import { Badge, Card, Dot, Field, FieldGrid, Stat, statusTone } from '@/components/primitive-ui/card-ui';
import { BackButton } from '@/components/primitives/buttons/BackButton';
import { FlexCol } from '@/components/ui/ui-layout'
import { formatCurrency, formatDateTime, initials, titleCase } from '@/helpers/funcs';
import { getLoanById, getLoanRepaymentProjection } from '@/lib/api';
import { IDParam } from '@/types/types'
import Actions from './Actions';
import { agentGuarantorInfo } from '@/lib/api.agent';


const LoanDetails = async ({params}: IDParam) => {

  const { id } = await params;
  const res = (await getLoanById(id)) as any;
  const loan = res?.data;
  
  
  if (!loan) {
    return (
      <FlexCol className="gap-4">
        <BackButton />
        <div className="flex min-h-[40vh] flex-col items-center justify-center gap-2 text-center">
          <p className="text-sm font-medium text-slate-500">This loan could not be found.</p>
        </div>
      </FlexCol>
    );
  }
  
  const guarantorRes = (await agentGuarantorInfo(loan.loanId)) as any
  console.log('loanId:', loan.loanId);
  console.log('gurantors:', guarantorRes);

  const history = [...(loan.history ?? [])].sort(
    (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // const approvals = history.filter((h: any) => h.action === 'Loan Approval').length;
  const reversions = history.filter((h: any) => h.action.includes('Reverted')).length;

  const tone = statusTone(loan.status);
  // const priorityTone: BadgeTone = loan.priority === 'high' || loan.priority === 'urgent' ? 'danger' : 'neutral';

  return (
    <FlexCol className="gap-4">
        <div className="min-h-screen bg-[#F6F7FB] pb-16">
          {/* Header */}
        <div className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-6 py-8">
            <Actions loanId={loan?.loanId} status={loan?.status}/>

            <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-lg font-semibold text-slate-400 ring-1 ring-slate-200">
                  {initials(loan.user?.firstName, loan.user?.lastName)}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h1 className="text-xl font-semibold tracking-tight text-[#0B1220]">
                      {loan.user?.firstName} {loan.user?.lastName}
                    </h1>
                    <Badge tone={tone}>
                      <Dot tone={tone} />
                      {titleCase(loan.status)}
                    </Badge>
                  </div>
                  <p className="mt-1 font-mono text-sm text-slate-400">{loan.loanId}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge tone="neutral">Priority: {titleCase(loan.priority)}</Badge>
                    <Badge tone="neutral">{loan.purpose}</Badge>
                    {reversions > 0 && (
                      <Badge tone="warning">
                        Approved &amp; reverted {reversions}× before landing on {titleCase(loan.status)}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Loan ID</p>
                <p className="font-mono text-sm font-medium text-[#0B1220]">{loan.loanId}</p>
                <p className="mt-2 text-xs text-slate-400">Applied {formatDateTime(loan.appliedAt)}</p>
              </div>
            </div>


            {/* Loan figures strip */}
            <div className="mt-8 grid grid-cols-2 divide-x divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 sm:grid-cols-4">
              <Stat label="Principal" value={formatCurrency(loan.amount)} />              
              <Stat label="Interest" value={`${formatCurrency(loan.interestAmount)} (${loan.interestRate}%)`} />
              <Stat label="Total repayment" value={formatCurrency(loan.totalRepayment)} />     <Stat label="Outstanding" value={formatCurrency(loan.outstandingAmount)} />
             </div>
           </div>
         </div>


        {/* Body */}
        <div className="mx-auto mt-8 grid grid-cols-2 gap-6">
          {/* Left column */}
          {/* <div className="flex flex-col gap-6 lg:col-span-2">
            <Card title="Approval timeline" action={<span className="text-xs text-slate-400">{history.length} events</span>}>
              <ul>
                {history.map((entry: any, i: number) => (
                  <TimelineEntry
                    key={entry._id}
                    entry={entry}
                    isFirst={i === 0}
                    isLast={i === history.length - 1}
                  />
                ))}
              </ul>
            </Card>
          </div> */}

          {/* Right column */}
          {/* <div className="flex flex-col gap-6"> */}
            <Card title="Loan details">
              <FieldGrid>
                <Field label="Business ID" value={loan.businessId} mono />
                <Field label="Applicant" value={`${loan.loanProfileId.firstName} ${loan.loanProfileId.lastName}`} mono />
                <Field label="Business Segment" value={titleCase(loan.loanProfileId.businessSegment)} mono />
                <Field label="Purpose" value={loan.purpose} />
                {/* <Field label="Priority" value={titleCase(loan.priority)} /> */}
                <Field label="Wallet name" value={loan.walletName} />
                <Field label="Wallet number" value={loan.walletNumber} mono />
              </FieldGrid>
            </Card>

            <Card title="Repayment plan">
              <FieldGrid>
                <Field label="Installment" value={formatCurrency(loan.repaymentPlan?.amount)} mono />
                <Field label="Tenure" value={`${loan.repaymentPlan?.loanTenure} cycles`} />
                <Field label="Frequency" value={`Every ${loan.repaymentPlan?.repaymentFrequency} days`} />
              </FieldGrid>
            </Card>

            {/* </Card> */}
            <Card title="People">
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Applicant</p>
                   <p className="mt-1 text-sm font-medium text-[#0B1220]">
                     {loan.user?.firstName} {loan.user?.lastName}
                   </p>
                   <p className="font-mono text-xs text-slate-400">{loan.user?.userId}</p>
                 </div>
                 <div>
                   <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Agent</p>
                   <p className="mt-1 text-sm font-medium text-[#0B1220]">
                     {loan.agent?.firstName} {loan.agent?.lastName}
                   </p>
                   <p className="font-mono text-xs text-slate-400">{loan.agent?.userId}</p>
                 </div>
                 {loan.processedBy && (
                  <div>
                     <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Processed by</p>
                    <p className="mt-1 font-mono text-xs text-slate-500">{loan.processedBy}</p>
                   </div>
                 )}
               </div>
             </Card>

             <Card title="Record meta">               
              <FieldGrid>
                 <Field label="Created" value={formatDateTime(loan.createdAt)} />
                 <Field label="Last updated" value={formatDateTime(loan.updatedAt)} />
               </FieldGrid>
             </Card>
          </div>
        </div>
    </FlexCol>
  )
}

export default LoanDetails;
