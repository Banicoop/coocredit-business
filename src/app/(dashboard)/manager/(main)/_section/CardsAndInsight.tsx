import Button from '@/components/primitives/buttons/Button';
import Typography from '@/components/primitives/Typography';
import { CardWidget } from '@/components/ui/cards';
import { PageHeader } from '@/components/ui/PageHeader';
import { ProgressBar } from '@/components/ui/ProgessBar';
import { Flex, Grid, GridItem } from '@/components/ui/ui-layout';
import { AlertTriangle, Banknote, Building2, CalendarDays, CircleSlash2, Download, Rocket, TrendingUp, UsersRound } from 'lucide-react';


export const Quality = () => {
    return(
        <Grid className='gap-6'>
            <GridItem className='gap-4'>
            <Typography>PORTFOLIO QUALITY</Typography>
            <Grid className='gap-2'>
                <Flex className='justify-between'>
                <Typography color='primary' weight='semibold' variant='small'>PAR% (30+ Days)</Typography>
                <Typography color='destructive' weight='semibold'>2.4%</Typography>
                </Flex>
                <ProgressBar className='bg-destructive' value={21}/>
            </Grid>
            <Grid className='gap-2'>
                <Flex className='justify-between'>
                <Typography color='primary' weight='semibold' variant='small'>PAR% (30+ Days)</Typography>
                <Typography weight='semibold' color='active'>2.4%</Typography>
                </Flex>
                <ProgressBar className='bg-primary' value={21}/>
            </Grid>
            </GridItem>

            <GridItem className='gap-4'>
            <Typography variant='p'>MONTHLY GROWTH</Typography>
            <Typography variant='h2' endIcon={<Typography variant='small' className='text-[12px]' color='success' startIcon={<TrendingUp size={14}/>}>4.2%</Typography>}>+₦1.2M</Typography>
            <Typography color='primary' variant='p'>Branch net growth is trending positively this month compared to previous cycle average.</Typography>
            </GridItem>
    </Grid>
    )
}


const CardsAndInsight = ({stats}: any) => {


  return (
    <Grid className='gap-6'>
        <PageHeader
            title='Dashboard Overview' 
            description='Real-time overview of Lagos Central performance metrics.'
            actions={[
            {
                label: 'Search',
                icon: <CalendarDays size={18} className='text-ring'/>,
                textClassName: 'text-ring font-semibold'
            },
            {
                label: 'Download',
                icon: <Download size={18}/>,
                variant: 'primary'
            },
            ]}
        />
        
        <Grid className='grid-cols-2 md:grid-cols-4 gap-5'>
            <CardWidget label='Total Active Customers' 
            icon={<UsersRound size={18}  className='text-primary'/>}
            num={(stats?.userStats?.activeUserStats)?.toLocaleString() || 0} 
            info={<Typography color='success' variant='small' weight='semibold' startIcon={<TrendingUp size={16}/>}>+3.4%</Typography>}/>
            <CardWidget label='Total Loan Portfolio' 
            icon={<Building2 size={18} className='text-primary'/>} 
            num={`₦${(stats?.loanStats?.disbursementStats?.totalLoanPortfolio?.toLocaleString()) || 0}`} 
            info={<Typography color='success' variant='small' weight='semibold' startIcon={<TrendingUp size={16}/>}>+{(stats?.loanStats?.disbursementStats?.percentageGrowth) || 0}%</Typography>}/>
            <CardWidget label='Total Disbursement' 
            icon={<CircleSlash2 size={18} className='text-primary'/>} 
            num={`₦${(stats?.loanStats?.disbursementStats?.totalLoanAmountDisbursed?.toLocaleString()) || 0}`}
            info={<Typography color='primary' variant='small' weight='semibold'>{stats?.loanStats?.disbursementStats?.totalLoanDisbursementsToday?.toLocaleString() || 0} loans today</Typography>}/>
            <CardWidget label='Total Loan Collections' 
            icon={<Banknote size={18} className='text-primary'/>} 
            num={`₦${(stats?.loanStats?.collectionStats?.totalLoanAmountCollected)?.toLocaleString() || 0}` } 
            info={<Typography variant='small' color='primary' weight='semibold'>{(stats?.loanStats?.collectionStats?.efficiency) || 0}% efficiency</Typography>}/>
        </Grid>

        <Flex className='justify-between bg-[#FEF2F2] border border-[#FEE2E2] rounded-lg px-4 py-1'>
            <Typography color='destructive' startIcon={<AlertTriangle size={20}/>}><strong>Fraud Alert:</strong> Unusual withdrawal patterns detected in Branch Sub-Sector A4.</Typography>
            <Button variant='light' size='lg' className='text-destructive font-semibold bg-transparent'>Investigate</Button>
        </Flex>

        <Flex className='justify-between bg-tertiary border rounded-lg px-4 py-1'>
            <Typography color='active' startIcon={<Rocket size={20}/>}><strong>Growth Insight:</strong> Portfolio has exceeded Q3 targets by 14%. Adjust disbursement limits?</Typography>
            <Button variant='light' className='text-primary font-semibold bg-transparent'>VIEW INSIGHTS</Button>
        </Flex>
    </Grid>
  )
}

export default CardsAndInsight;
