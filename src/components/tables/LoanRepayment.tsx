'use client';

import { formatCurrency, formatDate } from '@/helpers/funcs';
import { BasicTable } from '../primitives/tables/BasicTable';
import Typography from '../primitives/Typography';

const RepaymentBreakdown = ({data}: {data: any[]}) => {

    const columns = [
        {
            title: 'Repayment Date',
            key: 'dueDate',
            render: (val: string) => (
                <Typography>{formatDate(val)}</Typography>
            )
        },
        {
            title: 'Amount',
            key: 'amount',
            render: (val: number) => (
                <Typography>{formatCurrency(val)}</Typography>
            )
        },
        {
            title: 'Amount Paid',
            key: 'accruedAmount',
            render: (val: number) => (
                <Typography>{formatCurrency(val)}</Typography>
            )
        },
        {
            title: 'Status',
            key: 'status',
            render: (val: string) => (
                <Typography variant='small' className='bg-accent py-1 px-3 rounded-md capitalize' color={val === 'pending' ? 'pending': 'active'}>{val}</Typography>
            )
        },
    ]
  return (
    <BasicTable columns={columns} data={data ?? []} title={<Typography>Loan Repayment  Breakdown</Typography>} emptyMessage='No Repayment History'/>
  )
}

export default RepaymentBreakdown;
