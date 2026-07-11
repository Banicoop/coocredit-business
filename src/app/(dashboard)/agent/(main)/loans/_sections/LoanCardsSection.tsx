import { Grid } from '@/components/ui/ui-layout';
import { Columns3, Columns3Cog, FlipVertical2, SendHorizontal } from 'lucide-react';
import { ColItem } from '@/components/ui/PageHeader';
import { agentGetLoanStats } from '@/lib/api.agent';


type LProps = {
    label: string;
    val: string;
    borderColor: string;
    textColor: string;
    icon?: React.ReactNode
}

export const LoanWidget = ({label, val, borderColor, textColor, icon}: LProps) => (
    <div className={`flex items-center justify-between border-l-4 rounded-sm p-4 shadow-sm bg-card ${borderColor}`}>
        <ColItem item1={label} item2={val} className1='text-[#546474] text-sm' className2={`text-[24px] ${textColor}`}/>
        <span className='h-full flex items-center justify-center'>
            {icon}
        </span>
    </div>
)


const LoanCardsSection = async () => {

    const stats = await agentGetLoanStats() as any
    
  return (
    <Grid className='grid-cols-3 lg:grid-cols-6 gap-5'>
                                                    
        <LoanWidget label='This Month' 
        val={stats?.data?.thisMonthTotal || 0} textColor='text-[#506070]' 
        borderColor='border-[#506070]' 
        icon={<Columns3Cog size={20} className='text-[#506070]' />}/>
        <LoanWidget label='Last Month' 
        val={stats?.data?.lastMonthTotal || 0} textColor='text-[#059669]' 
        borderColor='border-[#059669]' 
        icon={<Columns3 size={20} className='text-[#059669]' />}/>
        <LoanWidget label='SUBMITTED' val='47' textColor='text-primary' borderColor='border-primary' icon={<SendHorizontal size={20} className='text-primary '/>}/>
        <LoanWidget label='Pending Approval' val='17' textColor='text-[#A43700]' borderColor='border-[#A43700]' icon={<FlipVertical2 size={20} className='text-[#A43700] ' />}/>
        <LoanWidget label='APPROVED' val='4' textColor='text-[#506070]' borderColor='border-[#506070]' icon={<Columns3Cog size={20} className='text-[#506070]' />}/>
        <LoanWidget label='DISBURSED' val='26' textColor='text-[#059669]' borderColor='border-[#059669]' icon={<Columns3 size={20} className='text-[#059669]' />}/>
    </Grid>
  )
}

export default LoanCardsSection;
