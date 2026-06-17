'use client';

import { BasicTable } from '@/components/primitives/tables/BasicTable';
import Typography from '@/components/primitives/Typography';
import { ProgressBar } from '@/components/ui/ProgessBar';
import { Flex } from '@/components/ui/ui-layout';
import React from 'react';


const data = Array.from({length: 10}, () => ({
    applicant: {
        name: 'Nova Labs Inc.',
        ID: 'ID: APP-90231'
    },
    loanType: 'Business Expansion',
    amount: '₦250,000.00',
    creditScore: 75,
    status: 'IN REVIEW',
    actions: 'ANALYZE'
}))

const HPAppsTable = () => {

    const columns = [
        {
            key: 'applicant',
            title: 'Applicant',
            render: (val: any) => (
                <Flex className='gap-1.5'>
                    <Flex className='p-2 rounded-full bg-primary'>
                        <Typography weight='semibold' color='light' className='text-center'>AH</Typography>
                    </Flex>
                    <Flex className='flex-col items-start'>
                        <Typography weight='semibold'>Nova Labs Inc.</Typography>
                        <Typography variant='small' color='primary'>ID: APP-90231</Typography>
                    </Flex>
                </Flex>
            )
        },
        {
            key: 'loanType',
            title: 'Loan Type'
        },
        {
            key: 'amount',
            title: 'Amount'
        },
        {
            key: 'creditScore',
            title: 'Credit Score',
            render: (val: number) => (
                <Flex className='gap-2'>
                    <ProgressBar value={val} className='bg-primary'/>
                    <Typography weight='semibold' color='active'>{val}</Typography>
                </Flex>
            )
        },
        {
            key: 'status',
            title: 'Status',
            render: (status: string) => (
                <Typography className='px-2 py-1 bg-accent rounded-lg'>{status}</Typography>
            )
        },
        {
            key: 'actions',
            title: 'Actions'
        },
    ]

  return (
    <BasicTable 
        columns={columns} 
        data={data ?? []} 
        title={<Typography>High Priority Application</Typography>}
        pageSize={4}
        pagination
    />
  )
}

export default HPAppsTable;
