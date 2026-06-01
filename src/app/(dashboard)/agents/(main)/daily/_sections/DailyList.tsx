import { Grid } from '@/components/ui/ui-layout';
import React from 'react'
import DailyCard from './DailyCard';
import { Tabs } from '@/components/ui/Tabs';
import { TextField } from '@/components/primitives/inputs/TextField';
import { Search } from 'lucide-react';


const tabs = [
    {
        label: 'All',
        value: 'all',
        count: 6
    },
    {
        label: 'Scheduled',
        value: '1',
        count: 2
    },
    {
        label: 'Follow-Ups',
        value: '2',
        count: 2
    },
    {
        label: 'KYC Pending',
        value: '3',
        count: 2
    },
]

const DailyList = () => {
  return (
    <Grid className='gap-4'>
        
        <Tabs items={tabs} defaultValue='all' className='hidden md:flex'/>

        <TextField variant='primary' startIcon={<Search size={20} />} placeholder='Search tasks, customers...' wrapperClassName='md:hidden'/>

        <Grid className='grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <DailyCard
                type="scheduled"
                name="Adewale Johnson"
                subtitle="Visit Type: Business Verification"
                time="09:00 AM"
                address="42 Balogun St, Lagos Island Market, Lagos"
            />

            <DailyCard
                type="followUp"
                name="Fatima Yusuf"
                badge="TODAY"
                description="Call to confirm guarantor documents for loan #LC-8821."
            />

            <DailyCard
                type="pending"
                name="J. Akande"
                subtitle="Biometric"
                applicationId="8809"
            />
            <DailyCard
                type="scheduled"
                name="Adewale Johnson"
                subtitle="Visit Type: Business Verification"
                time="09:00 AM"
                address="42 Balogun St, Lagos Island Market, Lagos"
            />

            <DailyCard
                type="followUp"
                name="Fatima Yusuf"
                badge="TODAY"
                description="Call to confirm guarantor documents for loan #LC-8821."
            />

            <DailyCard
                type="pending"
                name="J. Akande"
                subtitle="Biometric"
                applicationId="8809"
            />
        </Grid>
    </Grid>
  )
}

export default DailyList;
