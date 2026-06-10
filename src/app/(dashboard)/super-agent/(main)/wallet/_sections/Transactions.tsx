import { ColItem } from '@/components/ui/PageHeader';
import { Tabs } from '@/components/ui/Tabs';
import { Flex, Grid } from '@/components/ui/ui-layout';
import { Card } from './cards';
import Typography from '@/components/primitives/Typography';
import { ArrowRight } from 'lucide-react';


const data = Array.from({length: 5}, (() => ({
    transaction: 'Settlement from Opay Terminal',
    date: 'Oct 24, 2023',
    time: '14:22 PM',
    amount: 245000.00,
    status: 'completed',
    type: 'debit'
})))

const tabs = [
    {
        label: 'All',
        value: 'all'
    },
    {
        label: 'Inflow',
        value: 'inflow'
    },
    {
        label: 'Outflow',
        value: 'outflow'
    },
]

const Transactions = () => {
  return (
    <Grid className='gap-5 bg-tertiary p-2.5 rounded-lg border'>
        <Flex className='justify-between'>
            <ColItem 
                item1='Transaction History' 
                item2='Review your latest sovereign activity'
                className1='text-ink font-semibold'
                className2='text-ring'
            />
            <Tabs items={tabs} defaultValue='all'/>
        </Flex>

        {data.map((d, index) => (
            <Card 
                key={index}
                transaction={d.transaction} 
                amount={d.amount} 
                date={d.date} 
                time={d.time}
                status={d.status}
                type={d.type}
            />
        ))}

        <Typography color='active' weight='semibold' className='text-center flex justify-center cursor-pointer' endIcon={<ArrowRight size={20}/>}>View All</Typography>

    </Grid>
  )
}

export default Transactions;
