import { Badge, Card, Dot, Field, FieldGrid, Stat, statusTone } from '@/components/primitive-ui/card-ui';
import { BackButton } from '@/components/primitives/buttons/BackButton';
import Typography from '@/components/primitives/Typography';
import DetailedSlip from '@/components/ui/DetailSlip';
import { ColItem } from '@/components/ui/PageHeader';
import { Flex, FlexCol } from '@/components/ui/ui-layout';
import { formatCurrency, formatDateTime, initials, titleCase } from '@/helpers/funcs';
import { CircleCheck, FlipVertical2 } from 'lucide-react';


const items = [
    {title: 'Requested Amount', val: '₦120,000.00'},
    {title: 'Loan Term', val: '6 Months'},
    {title: 'Interest Rate', val: '3.5% Monthly'},
    {title: 'Purpose', val: 'Fertilizer & Seeds'},
]

const items2 = [
    {title: 'Credit Score', val: '742 (High)'},
    {title: 'Debt-to-Income', val: '18%'},
    {title: 'Active Loans', val: '0'},
]

const activities = [
    {
        activity: 'KYC Documents Verified',
        time: 'Yesterday at 2:45 PM • by Compliance Dept.',
        completed: true,
    },
    {
        activity: 'Application Submitted',
        time: 'Oct 23, 2023 at 10:12 AM • by Emeka Okafor',
        completed: true,
    },
    {
        activity: 'Credit Risk Assessment',
        time: 'In progress...',
        completed: false,
    },
]

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

                <BackButton />
                <div className="flex items-start justify-between gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-lg font-semibold text-slate-400 ring-1 ring-slate-200">
                        {initials(loan.user?.firstName, loan.user?.lastName) || 'AA'}
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
                <Field label="Business ID" value={loan.businessId} mono />
                <Field label="Loan profile ID" value={loan.loanProfileId} mono />
                <Field label="Purpose" value={loan.purpose} />
                <Field label="Priority" value={titleCase(loan.priority)} />
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

        {/* <Flex className='gap-1.5'>
            <Flex className='w-13 h-13 rounded-full bg-[#D4E4F7] justify-center '>
                <Typography color='primary' weight='bold' variant='p' className='text-center'>AA</Typography>
            </Flex>
            <FlexCol>
                <Flex className='gap-1.5'>
                    <Typography weight='bold' variant='p'>Adebayo Aminu</Typography>
                    <Typography variant='small' weight='semibold' className='px-2 py-0.5 bg-[#FEF3C7] text-chart-5 rounded-sm'>PENDING APPROVAL</Typography>
                </Flex>
                <Typography weight='semibold' color='primary'>Application ID: #APP-8843 • Agric Support Loan</Typography>
            </FlexCol>
        </Flex>

        <FlexCol className='gap-4 w-full md:flex-row'>
            <DetailedSlip 
                title='LOAN SUMMARY' 
                className='flex-1 gap-2' 
                className1='mt-3 border-b py-1.5' 
                items={items}/>
            <DetailedSlip 
                title='APPLICANT CREDIT' 
                className='flex-1' 
                className1='mt-3 border-b py-1.5'
                items={items2}/>
        </FlexCol>

        <FlexCol className='mt-6 gap-3'>
            <Typography color='primary' variant='p' weight='bold'>ACTIVITY TIMELINE</Typography>
            {
                activities.map((activity, index) => (
                <Flex className='gap-1.5' key={index}>
                    {activity.completed === true ?
                    <CircleCheck size={20} className='text-primary'/>: 
                    <FlipVertical2 size={20} className='text-[#A43700] ' />}
                    <ColItem 
                        item1={activity.activity} 
                        item2={activity.time} 
                        className1='font-bold' className2={activity.completed === true ? 'text-[#546474]': 'text-primary'}/>
                </Flex>
                ))
            }
        </FlexCol> */}
    </FlexCol>
  )
}

export default LoanOverview;
