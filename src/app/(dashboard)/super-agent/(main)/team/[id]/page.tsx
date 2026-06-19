import { ColItem, PageHeader } from '@/components/ui/PageHeader';
import { Flex, FlexCol, Grid } from '@/components/ui/ui-layout';
import Image from 'next/image';
import Typography from '@/components/primitives/Typography';
import CustomersList from '../_sections/CustomersList';
import { BackButton } from '@/components/primitives/buttons/BackButton';
import user from '@/assets/svgs/agent-portrait.jpg'
import map from '@/assets/svgs/map2.svg'
import { Card } from '../_sections/cards';
import { PipeLine } from '@/components/ui/cards';
import { recentActivities } from '@/constant/data';
import { RecentActivities } from '@/components/ui/RecentActivities';


const TeamDetails = () => {

  return (
    <Grid className='gap-7'>
        <BackButton/>
        <Flex className='gap-2.5 w-full'>
        <Image src={user} alt='AGENT' width={60} height={60} className='rounded-lg'/>
        <PageHeader
            className='w-full'
            title='Chidi Eze'
            description='Lagos Mainland Operations • Agent ID: #AZ-9942'
            actions={[
                {
                    label: 'Download Report',
                },
                {
                    label: 'Modify Privileges',
                    variant: 'primary'
                },
            ]}
        />
        </Flex>

        <Grid className='grid-cols-2 md:grid-cols-4 gap-5'>
            <FlexCol className='col-span-2 p-5 bg-primary rounded-xl'>
                <Typography variant='small' className='text-card/70'>Total Active Portfolio</Typography>
                <Typography color='light' variant='h1'>₦ 12,480,000.00</Typography>
                <Flex className='gap-4 mt-4'>
                    <Typography className='text-card bg-card/20 text-xs font-bold px-2.5 py-1 rounded-md'>+12.4% vs Last Mo.</Typography>
                    <Typography className='text-card bg-card/20 text-xs font-bold px-2.5 py-1 rounded-md'>142 Loans</Typography>
                </Flex>
            </FlexCol>
            <Card
                title='RISK MONITORING' 
                content={
                <Flex className='items-baseline gap-1.5'>
                    <Typography variant='h2'>2.4%</Typography>
                    <Typography weight='bold' color='success' className='mt-2'>HEALTHY</Typography>
                </Flex>} 
                desc='Non-Performing Loan Rate' value={70} className='bg-chart-2'/>
            <Card 
                title='REPAYMENT RATE' 
                content={<Typography variant='h3'>98.2%</Typography>} 
                desc='Portfolio recovery efficiency' 
                value={70} className='bg-primary'/>
        </Grid>

        <Grid className='lg:grid-cols-3 gap-4'>
            {/* MAIN */}
            <Grid className='col-span-2 gap-6'>
                <Grid className='p-6 bg-tertiary border rounded-lg gap-4 shadow-sm'>
                    <Typography variant='h5'>Loan Cycle Overview</Typography>
                    <Flex>
                        <PipeLine 
                            label='Application' stage='24 Pending' 
                            className='bg-primary' 
                            lastClassName=''
                            numClassName='text-white' num={1}/>
                        <PipeLine 
                            label='Underwriting' stage='12 Active' 
                            className='bg-primary' 
                             lastClassName=''
                            numClassName='text-white' num={2}/>
                        <PipeLine 
                            label='Disbursement' stage='₦4.2M Today' 
                            className='border-4 border-primary' 
                             lastClassName=''
                            numClassName='text-primary' num={3}/>
                        <PipeLine 
                            label='Repayment' stage='92% On-time' 
                            className='bg-[#E5EFFF]' 
                             lastClassName=''
                            numClassName='text-[#546474]' 
                            num={4} last={true}/>
                    </Flex>
                </Grid>
                <CustomersList/>
            </Grid>

            {/* ACTIVITY & OTHERS */}
            <Grid className='h-fit gap-6'>
                <FlexCol className='bg-card shadow-sm border rounded-xl'>
                    <ColItem 
                        item1='Field Coverage' 
                        item2='Lagos Mainland & Surulere Cluster' 
                        className='p-4'
                        className1='text-xl text-primary2' className2='text-ring'/>
                    <Image src={map} alt='MAP LOCATION' className='h-60 w-full object-cover' />
                </FlexCol>
                <RecentActivities
                    activities={recentActivities}
                    // onViewAll={() => router.push('/activity-logs')}
                />;
            </Grid>
        </Grid>
    </Grid>
  )
}

export default TeamDetails;
