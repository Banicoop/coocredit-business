'use client';

import Button from '@/components/primitives/buttons/Button';
import { BasicTable } from '@/components/primitives/tables/BasicTable';
import Typography from '@/components/primitives/Typography';
import { FlexCol } from '@/components/ui/ui-layout';
import { Download, EllipsisVertical } from 'lucide-react';
import { useState } from 'react';
import CommissionDetails from './CommissionDetails';


const data = Array.from({length: 40}, (() => ({
    date: 'Oct 12, 2023',
    customers: 'Adaeze Nwosu',
    loanProduct: 'Business Growth Loan',
    commission: '₦2,450',
    status: 'Paid'
})))

const TableTitle = () => (
    <FlexCol className='md:flex-row md:items-center md:justify-between gap-4'>
        <Typography variant='h4' weight='bold'>Commission History</Typography>
        <Button startIcon={<Download size={20} />}>Download</Button>
    </FlexCol>
)

const CommissionHistory = () => {

    const [open, setOpen] = useState(false)

    const columns = [
        {
            key: 'date',
            title:'Date'
        },
        {
            key: 'customers',
            title:'Customers'
        },
        {
            key: 'loanProduct',
            title:'Loan Product'
        },
        {
            key: 'commission',
            title:'Commission'
        },
        {
            key: 'status',
            title:'Status',
            render: (val: string) => (
                <Typography color='active' className='py-1 px-2 rounded-sm bg-[#0053CC1A] text-[10px]'>{val}</Typography>
            )
        },
        {
            key: '',
            title: 'Actions',
            render: () => (
                <EllipsisVertical size={24} 
                    className='text-primary cursor-pointer' 
                    onClick={() => setOpen(true)}/>
            )
        }
    ]

  return (
    <>
        <BasicTable columns={columns} data={data ?? []} title={<TableTitle/>} pageSize={8} pagination/>
        <CommissionDetails open={open} setOpen={setOpen}/>
    </>
  )
}

export default CommissionHistory;
