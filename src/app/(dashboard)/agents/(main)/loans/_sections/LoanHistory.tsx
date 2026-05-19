'use client'

import { TextField } from '@/components/primitives/inputs/TextField';
import { BasicTable } from '@/components/primitives/tables/BasicTable';
import Typography from '@/components/primitives/Typography';
import { ActionDropdown } from '@/components/ui/ActionDropDown';
import { Tabs } from '@/components/ui/Tabs';
import { Flex } from '@/components/ui/ui-layout';
import { EyeClosedIcon, Search } from 'lucide-react';
import React from 'react';

const data = Array.from({length: 20}, (() => ({
    applicant: 'John Okonkwo',
    loanAmount: 40000,
    status: 'Approved',
    date: '5th Jun, 2026'
})))


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

const LoanHistory = () => {

    const columns = [
        {
            key: 'applicant',
            title: 'Applicant'
        },
        {
            key: 'loanAmount',
            title: 'Loan Amount'
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
                            onClick: () => console.log('Clicked!!'),
                            icon: EyeClosedIcon,
                            variant: 'primary'
                        }
                    ]}
                />
            )
        },
    ]
  return (
    <BasicTable columns={columns} data={data ?? []} title={<Title/>} pageSize={6} pagination/>
  )
}

export default LoanHistory;
