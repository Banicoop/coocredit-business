import Typography from '@/components/primitives/Typography'
import { Flex, GridItem } from '@/components/ui/ui-layout'
import { cn } from '@/lib/utils'
import { TrendingDown, TrendingUp } from 'lucide-react'
import React from 'react'
import { PortfolioCardProps } from '../types'

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
