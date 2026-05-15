import { BasicTable } from '@/components/primitives/tables/BasicTable';
import Typography from '@/components/primitives/Typography';
import React from 'react';


const data = Array.from({length: 4}, () => ({
  customerName: 'Adekunle-Oni Emmanuel',
  amount: 2000,
  status: 'submitted',
  createdAt: '12th March, 2026'
}));

const Title = () => (
    <div className="flex items-center justify-between w-full">
        <Typography weight='bold' className='text-lg'>Recent Application</Typography>
        <Typography color='active' weight='semibold' className='text-lg'>View All</Typography>
    </div>
)

const RecentApps = () => {

  const columns = [
    {
      key: 'customerName',
      title: 'Customer Name'
    },
    {
      key: 'amount',
      title: 'Amount'
    },
    {
      key: 'status',
      title: 'Status'
    },
    {
      key: 'createdAt',
      title: 'Date'
    }
  ]
  return (
    <section className='grid'>
      <BasicTable columns={columns} data={data ?? []} title={<Title/>} pagination={false}/>
    </section>
  )
}

export default RecentApps;
