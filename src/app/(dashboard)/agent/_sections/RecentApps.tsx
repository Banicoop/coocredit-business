'use client';

import { BasicTable } from '@/components/primitives/tables/BasicTable';
import Typography from '@/components/primitives/Typography';
import { formatCurrency, formatDate } from '@/helpers/funcs';
import Link from 'next/link';


const Title = () => (
    <div className="flex items-center justify-between w-full">
        <Typography weight='bold' className='text-lg'>Recent Loan Application</Typography>
        <Typography color='active' weight='semibold' className='text-lg'>
          <Link href='/agent/loans'> View All</Link>
        </Typography>
    </div>
)

const RecentApps = ({loans, error}: {loans: any[], error: string}) => {

  const columns = [
    {
      key: 'loanProfileId',
      title: 'Applicant',
      render: (val: {
        _id: string;
        firstName: string;
        lastName: string;
        businessType: string;
      }) => (
        <div>
          <Typography>
            {val.firstName} {val.lastName}
          </Typography>

          <Typography variant="small">
            {val.businessType}
          </Typography>
        </div>
      ),
    },
    {
      key: 'appliedAt',
      title: 'Date Applied',
      render: (val: string) => (
        <Typography>{formatDate(val)}</Typography>
      )
    },
    {
      key: 'amount',
      title: 'Amount',
      render: (val: number) => (
        <Typography>{formatCurrency(val)}</Typography>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      render: (val: string) => (
        <Typography
          variant="small"
          className="bg-[#CCFBF1] px-3 py-1 capitalize rounded-md"
          color={
            val === 'pending'
              ? 'pending'
              : val === 'rejected'
                ? 'destructive'
                : 'active'
          }
        >
          {val}
        </Typography>
      ),
    },
  ];

  return (
    <section className='grid'>
      <BasicTable 
        columns={columns} 
        data={loans ?? []} title={<Title/>} 
        error={error}
        pagination={false} emptyMessage='No recent loan'/>
    </section>
  )
}

export default RecentApps;
