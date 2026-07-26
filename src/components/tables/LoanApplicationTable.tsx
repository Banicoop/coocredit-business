'use client'

import { TextField } from '@/components/primitives/inputs/TextField';
import { BasicTable } from '@/components/primitives/tables/BasicTable';
import Typography from '@/components/primitives/Typography';
import { ActionDropdown } from '@/components/ui/ActionDropDown';
import { Tabs } from '@/components/ui/Tabs';
import { Flex } from '@/components/ui/ui-layout';
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
    <Flex className='flex-col gap-4 xl:flex-row'>
        <Tabs items={tabs} defaultValue='all' className='hidden md:flex' />
        <TextField variant='secondary' placeholder='Search Loans, applicants and keywords' wrapperClassName='w-full' startIcon={<Search size={18}/>}/>
    </Flex>
)

const LoanApplicationTable = ({data, error}: {data: any, error: string}) => {

    const columns = [
        // {
        //     key: 'applicant',
        //     title: 'Applicant'
        // },
        {
            key: 'businessId',
            title: 'Business ID'
        },
        {
            key: 'amount',
            title: 'Amount'
        },
        {
            key: 'status',
            title: 'Status',
            render: (val: string) => (
                <Typography variant='small' className='bg-[#CCFBF1] px-1.5 py-1' color='active'>{val}</Typography>
            )
        },
        {
            key: 'date',
            title: 'Date'
        },
        {
            key: '',
            title: 'Actions',
            render: (val: any) => (
                <ActionDropdown 
                    actions={[
                        {
                            label: 'View Details',
                            href: '/agents/loans/slug',
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
