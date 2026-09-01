import { Badge, Card, Dot, Field, FieldGrid, Stat, statusTone } from '@/components/primitive-ui/card-ui';
import { BackButton } from '@/components/primitives/buttons/BackButton';
import { Flex, FlexCol } from '@/components/ui/ui-layout';
import { formatCurrency, formatDateTime, initials, titleCase } from '@/helpers/funcs';


const LoanOverview = ({loan}: any) => {

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

    const history = [...(loan.history ?? [])].sort(
        (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const reversions = history.filter((h: any) => h.action.includes('Reverted')).length;

    const tone = statusTone(loan.status);

  return (
    <FlexCol className='gap-4 h-full'>
         <div className="min-h-screen bg-[#F6F7FB] pb-16">
            {/* Header */}
            <div className="border-b border-slate-200 bg-white p-6">
                <div className='flex items-start justify-between gap-4'>
                    <div className="flex items-start gap-2.5">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-lg font-semibold text-slate-400 ring-1 ring-slate-200">
                            {initials(loan.profile?.firstName, loan.profile?.lastName) || 'AA'}
                        </div>
                        <div className="flex flex-col gap-1">
                            <Flex className='w-fit gap-2 bg-muted px-2.5 rounded-lg'>
                                <Dot tone={tone} />
                                {titleCase(loan.status)}
                            </Flex>
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
            <Stat label="Total repayment" value={formatCurrency(loan.totalRepayment)} />     
            <Stat label="Outstanding" value={formatCurrency(loan.outstandingAmount)} />
            </div>
        </div>

         {/* Body */}
        <div className="mx-auto mt-8 grid grid-cols-2 gap-6">
             <Card title="Loan details">
                <FieldGrid>
                <Field label="Business ID" value={loan.businessId} className='col-span-2' />
                <Field label="Business Segment" value={loan.loanProfileId.businessSegment} mono />
                <Field label="Purpose" value={loan.purpose} />
                <Field label="Priority" value={titleCase(loan.priority)} />
                {/* <Field label="Wallet name" value={loan.walletName} /> */}
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
                        {loan.loanProfileId?.firstName} {loan.loanProfileId?.lastName}
                    </p>
                    <p className="font-mono text-xs text-slate-400">{loan?.userId}</p>
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

export default LoanOverview;
