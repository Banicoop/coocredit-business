'use client';

import { BasicTable } from '@/components/primitives/tables/BasicTable';
import Typography from '@/components/primitives/Typography';
import { Flex, FlexCol } from '@/components/ui/ui-layout';
import Image from 'next/image';
import { ColItem } from '@/components/ui/PageHeader';
import React from 'react';

import user from '@/assets/images/user.png';


const data = Array.from({length: 3}, (() => ({
    user: {
        agent: '',
        desc: ''
    },
    detail: {
        amount: '',
        desc: ''
    }
})))

const TableTitle = () => (
    <Flex className='justify-between'>
        <Typography>Team Performance Snapshots</Typography>

        <Flex className='gap-2'>
            {['Daily', 'Weekly'].map((d, index) => (
                <Typography key={d} className={`py-2 px-3 rounded-lg  cursor-pointer ${index === 0 ? 'bg-accent text-primary': 'text-ring'}`}>{d}</Typography>
            ))}
        </Flex>
    </Flex>
)

const columns = [
    {
        key: 'user',
        title: '',
        render: (val: any) => (
            <Flex className='gap-2'>
                <Image src={user} alt='User' width={50} height={50} className='object-cover' />
                <ColItem 
                    item1='Lagos Mainland Cluster' 
                    item2='Lead: Sarah Adewale'
                    className1='text-foreground-popover font-bold'
                    className2='text-muted'
                    />
            </Flex>
        )
    },
    {
        key: 'detail',
        title: '',
        render: (val: any) => (
            <ColItem 
                item1='₦ 2.4M' 
                item2='TOP PERFOMER'
                className1=''
                className2='font-bold text-[10px] text-chart-2'
                />
        )
    },
]
// ₦ 2.4M
const TeamSnapShot = ({className}: {className: string}) => {
  return (
    <BasicTable 
        columns={columns} 
        data={data ?? []} 
        title={<TableTitle/>} 
        pagination={true}
        pageSize={4}
        className={className}/>
  )
}

export default TeamSnapShot;
