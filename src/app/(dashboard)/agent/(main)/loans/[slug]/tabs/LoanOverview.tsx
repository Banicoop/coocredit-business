import Typography from '@/components/primitives/Typography';
import DetailedSlip from '@/components/ui/DetailSlip';
import { ColItem } from '@/components/ui/PageHeader';
import { Flex, FlexCol } from '@/components/ui/ui-layout';
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

const LoanOverview = () => {
  return (
    <FlexCol className='gap-4 h-full'>
        <Flex className='gap-1.5'>
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
        </FlexCol>
    </FlexCol>
  )
}

export default LoanOverview;
