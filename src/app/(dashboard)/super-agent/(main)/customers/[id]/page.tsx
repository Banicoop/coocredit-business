import { BackButton } from '@/components/primitives/buttons/BackButton';
import { PageHeader } from '@/components/ui/PageHeader';
import { Flex, FlexCol, Grid } from '@/components/ui/ui-layout';
import { Pencil, SendHorizonalIcon } from 'lucide-react';
import Typography from '@/components/primitives/Typography';
import KYCCompliance, { FinScore } from './_sections/KYCCompliance';
import { RecentLoan } from './_sections/RecentLoan';
import Image from 'next/image';

import customer from '@/assets/svgs/agent-portrait.jpg'


const Card = ({label, val}: {label: string, val: string}) => (
    <FlexCol className='p-2.5 rounded-lg bg-[#FFFFFF1A]'>
        <Typography className='text-card/60'>{label}</Typography>
        <Typography color='light' weight='semibold'>{val}</Typography>
    </FlexCol>
)

const CustomerDetails = () => {
  return (
    <Grid className='gap-4'>
        <BackButton/>
        <FlexCol className='gap-2.5 md:flex-row w-full'>
            <Image src={customer} alt='customer' width={50} height={50} className='rounded-full h-auto w-auto'/>
            <PageHeader 
                className='w-full'
                title='Orizon Real Estate' 
                description='Lagos, Nigeria • ID: ORZ-9942-LN'
                actions={[
                    {
                        label: 'Edit Profile',
                        icon: <Pencil size={18}/>,
                        variant: 'secondary'
                    },
                    {
                        label: 'Payment',
                        icon: <SendHorizonalIcon size={18}/>,
                        variant: 'primary'
                    },
                ]}
            />
        </FlexCol>

        <Grid className='grid-cols-3 gap-5'>
            <Grid className='col-span-2 grid-cols-2 gap-2.5'>
                <Grid className='p-4 col-span-2 rounded-lg bg-primary/90'>
                    <Typography className='text-card/70'>TOTAL PORTFOLIO VALUE</Typography>
                    <Typography variant='h1' className='text-card'>₦842,500,000.00</Typography>
                    <Grid className='grid-cols-3 gap-2'>
                        <Card label='Active Loans' val='₦ 124.5M'/>
                        <Card label='Available Credit' val='₦ 50.0M'/>
                        <Card label='Total Interest Earned' val='₦ 12.8M'/>
                    </Grid>
                </Grid>
                <KYCCompliance/>
                <FinScore/>
                <RecentLoan className='col-span-2'/>
            </Grid>
            <Grid>B</Grid>
        </Grid>
    </Grid>
  )
}
export default CustomerDetails;
