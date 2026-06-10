import { Tabs } from '@/components/ui/Tabs';
import { Grid } from '@/components/ui/ui-layout';

import { Card, Card2 } from './alertCards';
import Typography from '@/components/primitives/Typography';
import { ArrowUpRightSquare, Lightbulb } from 'lucide-react';
import { ColItem } from '@/components/ui/PageHeader';



const tabs = [
    {
        label: 'All Alerts',
        value: 'all'
    },
    {
        label: 'Suspicious Activity',
        value: 'Suspicious Activity'
    },
    {
        label: 'KYC Verification',
        value: 'KYC Verification'
    },
    {
        label: 'Rejections',
        value: 'Rejection'
    },
    {
        label: 'System Health',
        value: 'System Health'
    },
]

const AlertDistributionList = () => {
  return (
    <Grid className='gap-4'>
        <Tabs items={tabs} defaultValue='all' className=''/>

        <Card/>
        <Card/>
        <Card/>
        <Card/>

        <Grid className='gap-4 md:grid-cols-2'>
            <Grid className='gap-y-2.5 bg-tertiary border p-4 rounded-lg'>
                <Grid className='grid-flow-col items-center justify-between'>
                    <Typography>Flag Distribution</Typography>
                    <Typography color='active' variant='small' className='cursor-pointer' endIcon={<ArrowUpRightSquare size={20}/>}>View Full Report</Typography>
                </Grid>
                <Card2 label='Lagos' val={55}/>
                <Card2 label='Abuja' val={60}/>
                <Card2 label='Port Harcourt' className='bg-chart-5' val={80}/>
            </Grid>
            <Grid className='gap-y-2.5 bg-tertiary border p-4 rounded-lg'>
                <Typography weight='semibold' variant='h4' color='primary2'>Sovereign Intelligence</Typography>
                <Typography weight='semibold' color='primary'>AI-driven predictive analysis indicates a potential surge in KYC rejections from the 'Northern Corridor' due to recent database updates.</Typography>
                <div className="flex items-center gap-2.5 bg-card py-2.5 px-4 rounded-lg w-fit">
                    <div className="bg-accent p-2.5 rounded-full">
                        <Lightbulb className='text-primary'/>
                    </div>
                    <ColItem 
                        item1='RECOMMENDATION' 
                        item2='Pre-validate all entries against CBN-2.0' 
                        className1='text-primary font-semibold' 
                        className2='text-ring'/>
                </div>
            </Grid>
        </Grid>
    </Grid>
  )
}

export default AlertDistributionList;
