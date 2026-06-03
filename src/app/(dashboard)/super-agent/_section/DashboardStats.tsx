import Typography from '@/components/primitives/Typography';
import { ProgressBar } from '@/components/ui/ProgessBar';
import { Flex, FlexBox, Grid, GridItem } from '@/components/ui/ui-layout';
import { ArrowDown, DollarSignIcon, User2, UserPlus, Users } from 'lucide-react';
import React from 'react'
import TeamSnapShot from './TeamSnapShot';
import { Action, Activity } from './DashbaordActions';

interface CardProp {
    icon: React.ReactNode;
    label: string;
    status: string;
    val: string;
    desc: React.ReactNode;
}


const activities = Array.from({length: 6}, (() => ({
    info: '₦ 250,000 Commission Paid',
    time: '2 minutes ago',
    desc: 'Automated Payout'
})))

const Card = ({icon, label, status, val, desc}: CardProp) => (
    <FlexBox className='flex-col gap-1.5'>
        <Flex className='justify-between'>
            <Flex className='p-2.5 rounded-lg bg-primary/10'>
                {icon}
            </Flex>
            <Typography color='primary'>{status}</Typography>
        </Flex>
        <Typography color='primary'>{label}</Typography>
        <Typography variant='h3'>{val}</Typography>
        <div className="">
            {desc}
        </div>
    </FlexBox>
)


const DashboardStats = () => {
  return (
    <Grid className='grid-cols-3 gap-4'>
        {/* STATS & WIDGETS */}
        <Grid className='col-span-2 grid-cols-2 gap-4'>
            <Card label='Total Agents' 
                val='1,204' 
                desc={<ProgressBar value={60} className='bg-primary'/>} 
                status='VERIFIED' 
                icon={<User2 size={20} className='text-primary'/>}/>
            <Card 
                label='Total Customers' 
                val='12.5k' 
                desc={<ProgressBar value={60} className='bg-primary/20'/>} 
                status='+12%' 
                icon={<Users size={20} className='text-primary'/>}/>
            <Card 
                label='Active Loans' 
                val='₦ 18.2M' status='HEALTHY' 
                desc={<Typography color='primary' className='text-xs italic'>Total disbursed across 240 units</Typography>}
                icon={<DollarSignIcon size={20} className='text-primary'/>}/>
            <Card 
                label='Total Savings' 
                val='₦ 54.8M' status='Growth' 
                desc={<Typography color='primary' className='text-xs italic'>Customer float in digital vaults</Typography>}
                icon={<DollarSignIcon size={20} className='text-primary'/>}/>

            <TeamSnapShot className='col-span-2'/>
        </Grid>

        {/* ACTIONS */}
        <Grid className='gap-5 h-fit'>
            <Grid className='gap-2.5 bg-[#DCEAF5] rounded-sm p-5 grid-cols-2'>
                <Typography color='primary2' weight='bold' className='uppercase col-span-2 '>Quick Actions</Typography>

                <Action label='Register Agent' icon={<UserPlus size={24} className='text-primary'/>}/>
                <Action label='Disburse Loan' icon={<UserPlus size={24} className='text-primary'/>}/>
                <Action label='Generate Report' icon={<UserPlus size={24} className='text-primary'/>}/>
                <Action label='API Keys' icon={<UserPlus size={24} className='text-primary'/>}/>
            </Grid>

            <GridItem className='gap-4'>
                <Typography color='primary2' variant='small'>RECENT ACTIVITY</Typography>

                {activities.map((activity, index) => (
                    <Activity 
                        key={index}
                        label={activity.info} 
                        desc={activity.desc} 
                        time={activity.time}/>
                ))}

                <Typography variant='small' color='primary' weight='semibold' endIcon={<ArrowDown size={16}/>} className='text-center w-full justify-center cursor-pointer'>View All Activities</Typography>
            </GridItem>
        </Grid>
    </Grid>
  )
}

export default DashboardStats;
