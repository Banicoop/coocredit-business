import Typography from '@/components/primitives/Typography';
import { Flex, GridItem } from '@/components/ui/ui-layout';
import { Circle, CircleCheck } from 'lucide-react';
import React from 'react'


const tasks = [
    { id: 1, description: 'Verify ID for Chidi Azikiwe', completed: true, icon: CircleCheck },
    { id: 2, description: 'Site visit: Obalende Market area', completed: false, icon: Circle },
    { id: 3, description: 'Follow up on pending KYC documents', completed: false, icon: Circle }
]

const DailyTasks = () => {
  return (
    <GridItem className='gap-4 bg-card'>
        <div className='flex justify-between w-full'>
            <Typography variant='h5' weight='semibold'>Daily Tasks</Typography>
            <Flex className='justify-center p-4 rounded-full border-4 border-primary'>
                <Typography variant='small' weight='bold'>6/9</Typography>
            </Flex>
        </div>
        {
            tasks.map((task) => {
                const Icon = task.icon
                return(
                <Typography key={task.id} startIcon={<Icon size={20} className={`${task.completed ? 'text-green-600': 'text-primary'}`}/>} weight='semibold' className={`bg-[#F8F9FF] p-3 rounded-sm ${task.completed && 'line-through'}`}>{task.description}</Typography>
            )})
        }
    </GridItem>
  )
}

export default DailyTasks;
