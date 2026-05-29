'use client';

import { BasicTable } from '@/components/primitives/tables/BasicTable';
import Typography from '@/components/primitives/Typography';
import { Flex } from '@/components/ui/ui-layout';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'


import user from '@/assets/images/user.png'
import { ColItem } from '@/components/ui/PageHeader';
import { EllipsisVertical } from 'lucide-react';
import CustomerLocation from '../@modal/CustomerLocation';

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

const Nearest = () => {

    const [open, setOpen] = React.useState(false);

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
        {
            key: 'id',
            title: '',
            render: (val: any) => (
                <EllipsisVertical onClick={() => setOpen(true)} size={20} className='text-primary cursor-pointer'/>
            )
        },
    ]

  return (
    <>
        <BasicTable columns={columns} data={data ?? []} title={<TableTitle/>}/>
        <CustomerLocation open={open} setOpen={setOpen}/>
    </>
  )
}

export default Nearest;
