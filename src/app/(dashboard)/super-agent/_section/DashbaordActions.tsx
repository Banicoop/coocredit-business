import Typography from '@/components/primitives/Typography'
import { Flex, FlexBox, FlexCol } from '@/components/ui/ui-layout'
import React from 'react';

interface ActivityProps {
    label: string
    desc: string;
    time: string
}

export const Action = ({icon, label}: {icon: React.ReactNode, label: string}) => {
  return (
    <FlexBox className='flex-col gap-1.5 items-center justify-center cursor-pointer'>
        <span>{icon}</span>
        <Typography variant='small' weight='bold'>{label}</Typography>
    </FlexBox>
  )
}


export const Activity = ({label, desc, time}: ActivityProps) => {
    return(
        <Flex className='gap-2.5'>
            <Flex className='p-1.5 rounded-full bg-primary/50'>
                <div className="w-2 h-2 rounded-full bg-primary"/>
            </Flex>
            <FlexCol>
                <Typography weight='semibold'>{label}</Typography>
                <Typography color='primary' variant='small'>{time} • {desc}</Typography>
            </FlexCol>
        </Flex>
    )
}
