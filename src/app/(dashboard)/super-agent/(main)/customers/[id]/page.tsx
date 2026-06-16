import { BackButton } from '@/components/primitives/buttons/BackButton';
import { PageHeader } from '@/components/ui/PageHeader';
import { FlexCol, Grid } from '@/components/ui/ui-layout';
import { Pencil, SendHorizonalIcon } from 'lucide-react';
import Typography from '@/components/primitives/Typography';
import KYCCompliance, { FinScore } from './_sections/KYCCompliance';
import { RecentLoan } from './_sections/RecentLoan';
import Image from 'next/image';
import { FinActions, RelatManager } from './_sections/FinInfo';
import DetailedSlip from '@/components/ui/DetailSlip';
import { CapitalAllocationCard } from './_sections/cards';

import { Images } from '@/assets/constant/images'

const Card = ({label, val}: {label: string, val: string}) => (
    <FlexCol className='p-2.5 rounded-lg bg-[#FFFFFF1A]'>
        <Typography className='text-card/60'>{label}</Typography>
        <Typography color='light' weight='semibold'>{val}</Typography>
    </FlexCol>
)

const CustomerDetails = () => {
  return (
    <Grid className='gap-7'>
        <BackButton/>
        <FlexCol className='gap-4 md:flex-row w-full'>
            <Image src={Images.agent} alt='customer' width={50} height={50} className='rounded-lg h-auto w-auto'/>
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

        <Grid className='grid-cols-3 gap-7'>
            {/* MAIN */}
            <Grid className='col-span-2 grid-cols-2 gap-6'>
                <Grid className='p-6 col-span-2 rounded-lg gap-4 bg-primary/90'>
                    <Typography className='text-card/70'>TOTAL PORTFOLIO VALUE</Typography>
                    <Typography variant='h1' className='text-card'>₦842,500,000.00</Typography>
                    <Grid className='grid-cols-3 gap-4'>
                        <Card label='Active Loans' val='₦ 124.5M'/>
                        <Card label='Available Credit' val='₦ 50.0M'/>
                        <Card label='Total Interest Earned' val='₦ 12.8M'/>
                    </Grid>
                </Grid>
                <KYCCompliance/>
                <FinScore/>
                <RecentLoan className='col-span-2'/>
            </Grid>
             {/* RIGHT */}
            <Grid className='gap-6 h-fit'>
                <RelatManager/>
                <DetailedSlip 
                    className='bg-primary2 p-6 rounded-lg gap-2.5'
                    className1='flex-col items-start mt-3'
                    title='BUSINESS CONTACT'
                    titleTextClass='text-card'
                    textClass1='text-card/40'
                    textClass2='text-card'
                    items={[{title: 'PRIMARY EMAIL', val: 'finance@orizonrealestate.com.ng'}, 
                        {title: 'PHONE NUMBER', val: '+234 802 000 1234'}, 
                        {title: 'REGISTERED ADDRESS', val: '45 Marina Street, Lagos Island, Lagos State, Nigeria.'}]}
                    />
                <FinActions/>
                <CapitalAllocationCard 
                    title='CAPITAL ALLOCATION'
                    items={[
                        {label: 'Commercial Realty', val: 65, className:'bg-[#1D3989]'},
                        {label: 'Residential Dev', val: 25, className:'bg-primary'},
                        {label: 'Asset Mgmt', val: 10, className:'bg-primary/60'},
                    ]}
                />
            </Grid>
        </Grid>
    </Grid>
  )
}

export default CustomerDetails;
