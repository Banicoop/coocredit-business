'use client';

import { BasicTable } from '@/components/primitives/tables/BasicTable';
import { ColItem } from '@/components/ui/PageHeader';
import { Flex } from '@/components/ui/ui-layout';
import { Download, FilterIcon } from 'lucide-react';
import Image from 'next/image';
import Typography from '@/components/primitives/Typography';
import React from 'react';

import user from '@/assets/images/user.png';


const data = Array.from({length: 10}, (() => ({
    user: 'Maduka Divine',
    loanType: 'SME Credit Line',
    date: 'Oct 12, 2024',
    loanAmount: '₦ 850,000',
    commission: '1.5%',
    payout: '12,750',
    status: 'settled'
})))

const Title = () => (
    <Flex className='justify-between'>
        <ColItem 
            item1='Commission Breakdown' 
            item2='Detailed log of recent payouts and pending accruals'
            className1='text-primary2 font-semibold text-[16px]'
            className2='text-ring'
        />
        <Flex className='gap-2.5'>
            <FilterIcon size={20}/>
            <Download size={20}/>
        </Flex>
    </Flex>
)

const RevenueTable = () => {

    const columns = [
        {
            key: 'user',
            title: 'Client Name',
            width: '200px',
            render: (details: any) => (
                <Flex>
                    <Image src={user} alt='CLIENT' width={50} height={50} className='rounded-full' />
                    <Typography color='primary2' variant='small'>{details}</Typography>
                </Flex>
            )
        },
        {
            key: 'loanType',
            title: 'Loan Type'
        },
        {
            key: 'date',
            title: 'Disbursement Date'
        },
        {
            key: 'loanAmount',
            title: 'Loan Principal'
        },
        {
            key: 'commission',
            title: 'Commission (%)'
        },
        {
            key: 'payout',
            title: 'Payout (₦)'
        },
        {
            key: 'status',
            title: 'Status',
            render: (status: string) => (
                <Typography variant='small' color='light' className='px-3 py-2 rounded-md capitalize bg-primary2'>{status}</Typography>
            )
        },
    ]


  return (
    <BasicTable 
        columns={columns} 
        data={data ?? []} 
        title={<Title/>}
        pageSize={4} pagination/>
  )
}

export default RevenueTable;
