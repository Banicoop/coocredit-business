import { PageHeader } from '@/components/ui/PageHeader';
import { Flex, FlexBox, FlexCol, Grid } from '@/components/ui/ui-layout';
import Image from 'next/image';
import Typography from '@/components/primitives/Typography';
import { ProgressBar } from '@/components/ui/ProgessBar';
import React from 'react';

import user from '@/assets/svgs/agent-portrait.jpg'
import CustomersList from '../_sections/CustomersList';

interface CardProps {
    title: string;
    content: React.ReactNode;
    desc: string;
    value: number;
    className: string
}

const Card = ({title, content, desc, value, className}: CardProps) => (
    <FlexBox className='flex-col gap-2'>
        <Typography color='primary'>{title}</Typography>
        <div>{content}</div>
        <Typography variant='small' color='primary'>{desc}</Typography>
        <ProgressBar value={value} className={className}/>
    </FlexBox>
)

const TeamDetails = () => {

  return (
    <Grid className='gap-7'>
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
            <Grid className='col-span-2'>
                <CustomersList/>
            </Grid>

            {/* ACTIVITY & OTHERS */}
            <Grid>B</Grid>
        </Grid>
    </Grid>
  )
}

export default TeamDetails;
