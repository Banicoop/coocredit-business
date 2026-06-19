import Typography from '@/components/primitives/Typography'
import { Flex, FlexCol, GridItem } from '@/components/ui/ui-layout'
import { cn } from '@/lib/utils'
import { TrendingDown, TrendingUp } from 'lucide-react'
import React, { FC } from 'react'
import { SummaryCardProps } from '../types'




export const SummaryCard:FC<SummaryCardProps> = ({title, desc, others}) => {
    return(
        <FlexCol className='gap-2 py-2.5 px-4 bg-tertiary rounded-lg border'>
            <Typography color='primary' variant='small' weight='semibold'>{title}</Typography>
            <Typography variant='h3' color='primary2'>{desc}</Typography>
            <div className="">{others}</div>
        </FlexCol>
    )
}
