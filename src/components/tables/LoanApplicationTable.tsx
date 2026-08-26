'use client'

import { TextField } from '@/components/primitives/inputs/TextField';
import { BasicTable } from '@/components/primitives/tables/BasicTable';
import Typography from '@/components/primitives/Typography';
import { ActionDropdown } from '@/components/ui/ActionDropDown';
import { Tabs } from '@/components/ui/Tabs';
import { Flex } from '@/components/ui/ui-layout';
import { formatDateTime } from '@/helpers/funcs';
import { EyeClosedIcon, Search } from 'lucide-react';


const tabs = [
    {
        label: 'All',
        value: 'all'
    },
    {
        label: 'Pending',
        value: 'pending'
    },
    {
        label: 'Approved',
        value: 'approved'
    },
    {
        label: 'Disbursed',
        value: 'disbursed'
    },
    {
        label: 'Rejected',
        value: 'rejected'
    },
]

const Title = () => (
    <Flex className='flex-col gap-4 md:flex-row'>
        <Tabs items={tabs} defaultValue='all' className='hidden md:flex' />
        <TextField variant='secondary' placeholder='Search Loans, applicants and keywords' wrapperClassName='w-full' startIcon={<Search size={18}/>}/>
    </Flex>
)

const LoanApplicationTable = ({data, error, isAgent}: {data: any, error: string, isAgent?: boolean}) => {

    const columns = [
        {
            key: 'loanProfileId',
            title: 'Applicant',
            render: (val: any) => (
                <Typography>{`${val?.firstName} ${val?.lastName}`}</Typography>
            )
        },
        {
            key: 'appliedAt',
            title: 'Application Date',
            render: (val: string) => (
                <Typography>{formatDateTime(val)}</Typography>
            )
        },
        {
            key: 'amount',
            title: 'Amount',
            render: (val: number) => (
                <Typography>₦{val.toLocaleString()}</Typography>
            )
        },
        {
            key: 'interestAmount',
            title: 'Interest',
            render: (val: number) => (
                <Typography>₦{val.toLocaleString()}</Typography>
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
        {
            key: 'loanId',
            title: 'Actions',
            render: (id: string) => (
                <ActionDropdown 
                    actions={[
                        {
                            label: 'View Details',
                            href: isAgent ? `/agent/loans/${id}`: `/manager/portfolio/${id}`,
                            icon: EyeClosedIcon,
                            variant: 'primary'
                        }
                    ]}
                />
            )
        },
    ]
  return (
    <BasicTable 
        columns={columns} 
        data={data ?? []} 
        title={<Title/>} 
        error={error}
        emptyMessage='No Available Loan'
        pageSize={6} pagination/>
  )
}

export default LoanApplicationTable;
