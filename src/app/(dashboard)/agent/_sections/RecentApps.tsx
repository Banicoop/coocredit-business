'use client';

import { BasicTable } from '@/components/primitives/tables/BasicTable';
import Typography from '@/components/primitives/Typography';
import { formatCurrency } from '@/helpers/funcs';
import Link from 'next/link';
import React from 'react';


// const data = Array.from({length: 4}, () => ({
//   customerName: 'Adekunle-Oni Emmanuel',
//   amount: 2000,
//   status: 'submitted',
//   createdAt: '12th March, 2026'
// }));

const Title = () => (
    <div className="flex items-center justify-between w-full">
        <Typography weight='bold' className='text-lg'>Recent Loan Application</Typography>
        <Typography color='active' weight='semibold' className='text-lg'>
          <Link href='/agent/loans'> View All</Link>
        </Typography>
    </div>
)

const RecentApps = ({loans}: {loans: any[]}) => {

  const columns = [
    {
      key: 'loanProfileId',
      title: 'Application Date'
    },
    {
      key: 'appliedAt',
      title: 'Amount',
     
    },
    {
      key: 'amount',
      title: 'Status',
      render: (val: number) => (
        <Typography>{formatCurrency(val)}</Typography>
      )
    },
    {
        key: 'status',
        title: 'Status',
        render: (val: string) => (
            <Typography variant='small' 
                className='bg-[#CCFBF1] px-3 py-1 capitalize rounded-md' 
                color={val === 'pending' ? 'pending': val === 'rejected' ? 'destructive': 'active'}>{val}</Typography>
        )
    },
  ]
  return (
    <section className='grid'>
      <BasicTable 
        columns={columns} 
        data={loans ?? []} title={<Title/>} 
        pagination={false} emptyMessage='No recent loan'/>
    </section>
  )
}

export default RecentApps;
