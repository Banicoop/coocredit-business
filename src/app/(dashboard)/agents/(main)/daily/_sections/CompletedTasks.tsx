import Typography from '@/components/primitives/Typography';
import { Flex, GridItem } from '@/components/ui/ui-layout';
import { CircleCheck } from 'lucide-react';
import React from 'react'

const data = Array.from({length: 5}, (() => ({
    time: '08:15 AM',
    customerName: 'David Adeleke',
    task: 'Business Visit',
    status: 'success'
})))

const CompletedTasks = () => {
  return (
    <GridItem className='gap-4'>
        <Typography variant='h4' weight='bold' startIcon={<CircleCheck size={20} className='text-primary mt-1' />}>Completed Tasks (4)</Typography>

        {data.map((d) => (
            <Flex className='justify-between border-b border-b-[#F8FAFC] py-2'>
                <Flex className='gap-4'>
                    <Typography variant='small' weight='bold' color='primary'>{d.time}</Typography>
                    <Typography weight='semibold'>{d.customerName} — {d.task}</Typography>
                </Flex>
                <Typography color='success' className='bg-accent px-2 py-0.5 rounded-sm capitalize'>{d.status}</Typography>
            </Flex>
        ))}
    </GridItem>
  )
}

export default CompletedTasks;
