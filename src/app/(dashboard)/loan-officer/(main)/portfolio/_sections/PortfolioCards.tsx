import Typography from '@/components/primitives/Typography'
import { Flex, FlexCol, GridItem } from '@/components/ui/ui-layout'
import { cn } from '@/lib/utils'
import { TrendingDown, TrendingUp } from 'lucide-react'
import React, { FC } from 'react'
import { PortfolioCardProps, SummaryCardProps } from '../types'

export const PortfolioCard:React.FC<PortfolioCardProps> = ({icon, percent, title, amount, desc, isNegative}) => {
  return (
    <GridItem className={cn('gap-4 p-6')}>
        <Flex className='justify-between'>
            <Flex className='p-2.5 rounded-full bg-accent'>
                {icon}
            </Flex>
        <Typography 
            startIcon={isNegative ? <TrendingDown size={14}/>: <TrendingUp size={14}/>}
            color={isNegative ? 'destructive': 'success'} 
            variant='small' 
            className='py-1 px-2 rounded-lg bg-accent font-semibold'>{isNegative ? '-': '+'} {percent} %</Typography>
        </Flex>
        <Typography color='primary'>{title}</Typography>
        <Typography color='primary2' variant='h2'>{amount}</Typography>
        <Typography variant='small' color='primary'>{desc}</Typography>
    </GridItem>
  )
}


export const SummaryCard:FC<SummaryCardProps> = ({title, desc, others}) => {
    return(
        <FlexCol className='gap-2 py-2.5 px-4 bg-tertiary rounded-lg border'>
            <Typography color='primary' variant='small' weight='semibold'>{title}</Typography>
            <Typography variant='h3' color='primary2'>{desc}</Typography>
            <div className="">{others}</div>
        </FlexCol>
    )
}
