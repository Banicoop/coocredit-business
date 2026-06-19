'use client';


import { TextField } from '@/components/primitives/inputs/TextField';
import { BasicTable } from '@/components/primitives/tables/BasicTable';
import Typography from '@/components/primitives/Typography';
import { ActionDropdown } from '@/components/ui/ActionDropDown';
import { Tabs } from '@/components/ui/Tabs';
import { Flex } from '@/components/ui/ui-layout';
import { Eye } from 'lucide-react';



const data = Array.from({length: 10}, (_, i) => ({
    id: `${i + 1}`,
    customer: {
        name: 'Starlight Logistics',
        business: 'Commercial Credit'
    },
    loanId: '#LN-8802-QX',
    dueDate: 'Oct 12, 2023',
    amount: '₦850,000.00',
    status: 'active'
}));


const tabs = [
    {
        label: 'All',
        value: 'all'
    },
    {
        label: 'OverDue',
        value: 'overdue'
    },
    {
        label: 'Pending',
        value: 'pending'
    },
]

const Title = () => (
    <Flex className='gap-4'>
        <Typography color='primary2' variant='h4' weight='semibold'>Repayment Schedule</Typography>
        <Tabs items={tabs} defaultValue='all'/>
        <TextField variant='primary' placeholder='Search Loan ID, etc...'/>
    </Flex>
)


const RepaymentSchedule = () => {

    const colums = [
        {
            key: 'customer',
            title: 'Customer',
            render: (customer: any) => (
                <div className='flex flex-col'>
                    <Typography weight='semibold'>{customer.name}</Typography>
                    <Typography variant='small' color='primary'>{customer.business}</Typography>
                </div>
            )
        },
        {
            key: 'loanId',
            title: 'LOAN ID'
        },
        {
            key: 'amount',
            title: 'Amount Due'
        },
        {
            key: 'dueDate',
            title: 'Due Date'
        },
        {
            key: 'status',
            title: 'Status',
            render: (status: string) => (
                <Typography className='py-1 px-2 bg-accent rounded-md text-primary capitalize'>{status}</Typography>
            )
        },
        {
            key: 'id',
            title: 'Actions',
            render: (id: string) => (
            <ActionDropdown
                actions={[
                    {
                        label: 'Loan Details',
                        variant: 'primary',
                        icon: Eye,
                        // href: `/loan-officer/portfolio/${id}`
                    }
                ]} />
            )
        },
    ]

  return (
    <BasicTable 
        columns={colums} 
        pageSize={5}
        pagination
        data={data ?? []} title={<Title/>}/>
  )
}

export default RepaymentSchedule;
