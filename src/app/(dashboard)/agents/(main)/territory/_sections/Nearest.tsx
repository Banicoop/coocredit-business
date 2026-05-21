'use client';

import { BasicTable } from '@/components/primitives/tables/BasicTable';
import Typography from '@/components/primitives/Typography';
import { Flex } from '@/components/ui/ui-layout';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'


import user from '@/assets/images/user.png'
import { ColItem } from '@/components/ui/PageHeader';

const data = Array.from({length: 3}, (() => ({
    user: {
        name: 'Bisi Akindele',
        location: '0.4 km away • Ikeja, Lagos'
    },
    loan: {
        amount: 34000,
        status: 'ACTIVE LOAN'
    }
})))


const TableTitle = () => (
    <Flex className='justify-between'>
        <Typography>Nearest Customers</Typography>
        <Link href='#' className='text-primary'>View All</Link>
    </Flex>
)
// ₦250,000
const Nearest = () => {

    const columns = [
        {
            key: 'user',
            title: '',
            render: (val: any) => (
                <Flex className='gap-2'>
                    <Image src={user} alt='User' width={40} height={40} className='rounded-full object-cover'/>
                    <ColItem item1={val.name} item2={val.location} className1='text-[#0F1C2C] font-bold text-[16px]' className2='text-[#546474]'/>
                </Flex>
            )
        },
        {
            key: 'loan',
            title: '',
            render: (val: any) => (
                <ColItem item1={`₦${val.amount.toLocaleString()}`} item2={val.status} className1='text-primary' className2='text-[#16A34A]'/>
            )
        },
    ]

  return (
   <BasicTable columns={columns} data={data ?? []} title={<TableTitle/>}/>
  )
}

export default Nearest;
