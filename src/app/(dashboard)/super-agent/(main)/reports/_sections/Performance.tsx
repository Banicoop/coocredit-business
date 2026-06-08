'use client';

import { BasicTable } from '@/components/primitives/tables/BasicTable';
import Typography from '@/components/primitives/Typography';
import { Flex } from '@/components/ui/ui-layout';
import { ListFilter } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

import user from '@/assets/images/user.png'
import { ContentTitle } from '@/components/ui/PageHeader';
import { ProgressBar } from '@/components/ui/ProgessBar';

const data = Array.from({length: 10}, (() => ({
    userDetails: {
        userName: '',
        location: ''
    },
    deal: 125,
    value: '8.4M',
    percent: 56
})))

const Title = () => (
    <Flex className='justify-between'>
        <Typography weight='semibold' color='primary2'>Performance Leaderboard</Typography>
        <Typography className='cursor-pointer' weight='semibold' variant='small' color='primary' endIcon={<ListFilter size={16}/>}>SORT BY: REVENUE</Typography>
    </Flex>
)

const Performance = ({className}: {className:string}) => {

    const columns = [
        {
            key: 'user',
            title: '',
            render: (userDetails: any) => (
                <Flex className='gap-2.5'>
                    <Image src={user} alt='AGENT' width={50} height={50} className='rounded-full' />
                    <ContentTitle title='Chinonso Okafor' desc='Lagos Main Branch'/>
                </Flex>
            )
        },
        {
            key: 'deal',
            title: '',
            render: (deal: number) => (
                <ContentTitle title='Deals Closed' desc={deal}/>
            )
        },
        {
            key: 'value',
            title: '',
            render: (net: any) => (
                <ContentTitle title='Net value' desc={`₦${net}`}/>
            )
        },
        {
            key: 'percent',
            title: '',
            render: (deal: number) => (
                <Flex className='gap-2.5 w-20'>
                    <ProgressBar value={deal} className='bg-chart-2'/>
                    <Typography weight='bold' className='text-chart-2'>{deal}%</Typography>
                </Flex>
            )
        },
    ]

  return (
    <BasicTable 
        columns={columns}
        data={data ?? []} 
        title={<Title/>} 
        pageSize={2}
        pagination={true}
        className={className}/>
  )
}

export default Performance;
