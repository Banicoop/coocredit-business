'use client';

import Button from '@/components/primitives/buttons/Button';
import { BasicTable } from '@/components/primitives/tables/BasicTable';
import Typography from '@/components/primitives/Typography';
import { Grid, GridItem } from '@/components/ui/ui-layout';
import { PlusCircle } from 'lucide-react';
import React from 'react'


const data = Array.from({length: 10}, () => ({
  date: '12 Jul, 2024',
  amount: '₦82,500.00',
  balance: '₦342,100.50',
  status: 'settled'
}))

const RecentInstallment = () => {

  const colums = [
    {
      key: 'date',
      title: 'SCHEDULED DATE'
    },
    {
      key: 'amount',
      title: 'AMOUNT PAID'
    },
    {
      key: 'balance',
      title: 'BALANCE'
    },
    {
      key: 'status',
      title: 'STATUS',
      render: (status: string) => (
        <Typography className='py-1 px-2.5 rounded-md capitalize bg-accent text-chart-2'>{status}</Typography>
      )
    }
  ]

  return (
    <Grid className='grid-cols-3 gap-5'>
      <BasicTable 
        className='col-span-2'
        columns={colums} 
        pageSize={5}
        pagination
        data={data ?? []} 
        title={<Typography color='primary2'>Recent Installment</Typography>} />

      <GridItem className='gap-4 h-fit'>
        <Typography weight='semibold' color='primary2'>Recent Notes</Typography>
        <Grid className='border-l-2 border-l-primary p-2.5'>
          <Typography color='primary' variant='small'>15 Jul - David Chen</Typography>
          <Typography color='primary2'>Borrower requested early repayment option for Sept installment.</Typography>
        </Grid>

          <Button startIcon={<PlusCircle size={16}/>} className='mt-4'>Add Note</Button>
      </GridItem>
    </Grid>
  )
}

export default RecentInstallment;
