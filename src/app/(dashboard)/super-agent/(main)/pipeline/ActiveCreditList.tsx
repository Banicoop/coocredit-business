'use client';

import Button from '@/components/primitives/buttons/Button';
import { BasicTable } from '@/components/primitives/tables/BasicTable';
import Typography from '@/components/primitives/Typography';
import { ColItem } from '@/components/ui/PageHeader';
import { ProgressBar } from '@/components/ui/ProgessBar';
import { Flex } from '@/components/ui/ui-layout';
import { Download } from 'lucide-react';
import React from 'react'


const data = Array.from({length: 10}, (() => ({
    user: {
        userName: 'Adekunle & Sons Ltd',
        desc: 'Agro-Processing Sector'
    },
    id: 'LN-2024-8891',
    loanAmount: '₦12,500,000',
    stage: 'UNDER REVIEW',
    riskScore: 70
})))


const Title = () => (
    <Flex className='justify-between'>
        <Typography variant='p' color='primary2'>Active Credit Applications</Typography>
        <Button size='md' variant='ghost' className='text-ink font-semibold border' startIcon={<Download size={16}/>}>Export</Button>
    </Flex>
)

const ActiveCreditList = () => {

    const columns = [
        {
            key: 'user',
            title: 'BORROWER ENTITY',
            render: (val: any) => (
                <Flex className='gap-2'>
                    <Flex className='w-10 h-10 rounded-full justify-center bg-primary text-card font-bold'>AS</Flex>
                    <ColItem 
                        item1={val.userName}
                        item2={val.desc}
                        className1='text-ink font-semibold'
                        className2='text-ring'
                    />
                </Flex>
            )
        },
        {
            key: 'id',
            title: 'APPLICATION ID'
        },
        {
            key: 'loanAmount',
            title: 'LOAN AMOUNT'
        },
        {
            key: 'stage',
            title: 'STAGE',
            render: (val: string) => (
                <Typography variant='small' className='py-1 px-2.5 rounded-md bg-accent text-chart-5'>{val}</Typography>
            )
        },
        {
            key: 'riskScore',
            title: 'RISK SCORE',
            render: (val: number) => (
                <Flex className='gap-2'>
                    <ProgressBar value={val} className='bg-chart-2' />
                    <Typography  variant='small' weight='semibold' className='text-chart-2'>{val}%</Typography>
                </Flex>
            )
        },
    ]

  return (
    <BasicTable 
        columns={columns} 
        data={data ?? []} 
        pageSize={6}
        pagination={true}
        title={<Title/>}/>
  )
}

export default ActiveCreditList;
