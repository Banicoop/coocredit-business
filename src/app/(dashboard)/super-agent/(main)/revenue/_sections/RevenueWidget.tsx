import { ColItem, PageHeader } from '@/components/ui/PageHeader';
import { Flex, FlexCol, Grid } from '@/components/ui/ui-layout';
import { Calendar, CircleEllipsis, Timer, TrendingUp, TriangleAlert } from 'lucide-react';
import { Card } from '../../customers/page';
import Typography from '@/components/primitives/Typography';

const RevenueWidget = () => {
  return (
    <Grid className='gap-4'>
        <PageHeader
            title='Revenue & Commission' 
            description='Financial performance tracking for Q3 2024'
            actions={[
            {
                label:'Last 30 Days',
                variant: 'secondary',
                icon: <Calendar size={16}/>
            },
            {
                label:'Export Report',
                variant: 'primary',
            },
            ]}
        />

        <Grid className='grid-cols-5 gap-4'>
            <FlexCol className='bg-primary p-5 rounded-lg col-span-2 gap-2.5'>
                <ColItem 
                    className=''
                    item1='Total Commission Earned' 
                    item2='₦ 4,820,000.00' 
                    className1='text-card/70'
                    className2='text-card font-bold text-[40px]'
                    />
                
                <Flex className='gap-4'>
                    <ColItem 
                        className='border-r border-r-card/70 px-4'
                        item1='LAST MONTH' 
                        item2='₦ 1,240,000' 
                        className1='text-card/70'
                        className2='text-card font-bold '
                        />
                    <ColItem 
                        className='px-4'
                        item1='ACTIVE DEALS' 
                        item2='18 Loans' 
                        className1='text-card/70'
                        className2='text-card font-bold'
                        />
                </Flex>
            </FlexCol>
            <Grid className='col-span-3 grid-cols-2 gap-4'>
                <Card label='Growth Rate' num='Steady Ascent' 
                    icon={<TrendingUp size={20} className='text-primary'/>} 
                    info={<Typography color='success' className='py-1 px-2.5 rounded-md bg-accent font-semibold'>+12.5%</Typography>}/>
                <Card label='Platinum Tier' num='Platinum Tier' 
                    icon={<CircleEllipsis size={20} className='text-primary'/>}
                    info={<span className='text-ring text-xs'>Top 5%</span>}/>
                <Card label='Portfolio Risk' num='Minimal (2%)' 
                    icon={<TriangleAlert size={20} className='text-destructive'/>}
                    info={<span className='text-ring text-xs'>4 overdue</span>}/>
                <Card label='Avg. Payout Cycle' num='3.5 Days' 
                    icon={<Timer size={20} className='text-ink'/>}
                    />
            </Grid>
        </Grid>
    </Grid>
  )
}

export default RevenueWidget;
