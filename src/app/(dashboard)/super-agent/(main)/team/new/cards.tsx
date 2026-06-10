import Typography from '@/components/primitives/Typography'
import { ColItem } from '@/components/ui/PageHeader'
import { Flex, FlexCol } from '@/components/ui/ui-layout'
import React from 'react'

export const OnboardingCard = ({label, val}: {label: string, val: string}) => {
  return (
    <Flex className='gap-2.5'>
        <input type="radio" className="cursor-pointer" />
        <ColItem item1={label} item2={val} className1='text-[16px] text-primary2' className2='text-ring'/>
    </Flex>
  )
}


export const GrowthCard = ({label, val, desc}: {label: string, val: number, desc: string}) => {
    return(
        <FlexCol className='py-2.5 border-b border-b-card/10'>
            <Typography variant='small' className='text-card/50 font-semibold'>{label}</Typography>
            <Flex className='justify-between'>
                <Typography variant='h3' color='light'>{val}</Typography>
                <Typography variant='h4' className='text-[#8FA7FE]'>{desc}</Typography>
            </Flex>
        </FlexCol>
    )
}