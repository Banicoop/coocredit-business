'use client';

import Button from '@/components/primitives/buttons/Button';
import { BasicTable } from '@/components/primitives/tables/BasicTable';
import Typography from '@/components/primitives/Typography';
import { Flex, FlexCol } from '@/components/ui/ui-layout';
import { Ellipsis } from 'lucide-react';
import React from 'react'

const data = Array.from({length: 20}, (_, i) => ({
    id: `${i + 1}`,
    transactionID: '#TRX-99281',
    timestamp: {
        date: '24 Oct, 2023',
        time: '14:22:10'
    },
    type: 'Deposit',
    customer: 'Chinelo Okafor',
    amount: '150,000.00',
    status: 'COMPLETED'
}))

const Title = () => (
    <Flex className='justify-between'>
        <Typography>Recent Movements</Typography>
        <Button variant='ghost' className='border'>Export CVS</Button>
    </Flex>
)

const RecentMovements = () => {

    const columns = [
        {
            key: 'transactionID',
            title: 'TRANSACTION ID',
            render: (id: string) => (
                <Typography variant='small' weight='semibold' color='active'>{id}</Typography>
            )
        },
        {
            key: 'timestamp',
            title: 'TIMESTAMP',
            render: (timestamp: any) => (
                <FlexCol>
                    <Typography variant='small' color='primary' weight='semibold'>{timestamp.date}</Typography>
                    <Typography className='text-[10px] text-ring'>{timestamp.time}</Typography>
                </FlexCol>
            )
        },
        {
            key: 'type',
            title: 'TYPE'
        },
        {
            key: 'customer',
            title: 'CUSTOMER'
        },
        {
            key: 'amount',
            title: 'AMOUNT (₦)'
        },
        {
            key: 'status',
            title: 'STATUS',
            render: (status: string) => (
                <Typography variant='small' color='success' className='py-1 px-2.5 bg-accent font-semibold'>{status}</Typography>
            )
        },
        {
            key: 'id',
            title: 'ACTIONS',
            render: () => (
                <Ellipsis size={20} className='text-primary cursor-pointer' />
            )
        },
    ]


  return (
    <BasicTable columns={columns} data={data ?? []} title={<Title/>} pageSize={8} pagination/>
  )
}

export default RecentMovements;
