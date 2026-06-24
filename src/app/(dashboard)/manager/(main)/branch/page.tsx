import Typography from '@/components/primitives/Typography';
import { CardWidget } from '@/components/ui/cards';
import { PageHeader } from '@/components/ui/PageHeader';
import { Flex, Grid } from '@/components/ui/ui-layout';
import { cn } from '@/lib/utils';
import { ArrowUp, BookOpenText, Plus, TrendingDown, TrendingUp } from 'lucide-react';
import React from 'react'
import RecentMovements from './_sections/RecentMove';

const BranchPage = () => {
  return (
    <Grid className='gap-7'>
      <PageHeader 
        title='Cash Transactions' 
        description='Lagos Mainland Branch • Terminal ID: CC-LGS-042' 
        actions={[
          {
            label: 'New Entry',
            icon: <Plus size={20}/>,
            variant: 'primary'
          }
        ]}
      />

      <Grid className='md:grid-cols-3 gap-5'>
          <CardWidget className={cn('px-8 py-6')} label='TOTAL INFLOW' 
            icon
            num='₦12,400,000.00' 
            info={<TrendingDown size={40} className='text-[#05966849]'/>}
            others={<Flex className='gap-1.5 mt-1.5'>
              <Typography className='py-1 px-2.5 bg-accent text-chart-2 rounded-md' startIcon={<ArrowUp size={14}/>}>12%</Typography>
              <Typography className='text-xs text-chart-2'>VS PREVIOUS DAY</Typography>
            </Flex>}
            />
          <CardWidget className={cn('px-8 py-6')} label='TOTAL OUTFLOW'
            icon
            num='₦8,900,000.00' 
            info={<TrendingUp size={40} className='text-destructive/40' />}
            others={<Flex className='gap-1.5 mt-1.5'>
              <Typography color='destructive' className='py-1 px-2.5 bg-accent rounded-md' startIcon={<ArrowUp size={14}/>}>4%</Typography>
              <Typography className='text-xs text-destructive'>VS AVERAGE</Typography>
            </Flex>}
            />
          <CardWidget className={cn('px-8 py-6')} label='NET CASH POSITION' 
            icon
            num='₦3,500,000.00' 
            info={<BookOpenText size={40} className='text-primary/40' />}
            others={<Typography variant='small' color='active'>RECONCILIATION STATUS: VERIFIED</Typography>}
            />
      </Grid>

      <RecentMovements/>
    </Grid>
  )
}

export default BranchPage;
