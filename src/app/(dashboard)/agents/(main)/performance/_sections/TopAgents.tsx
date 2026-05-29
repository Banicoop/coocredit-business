'use client';

import { BasicTable } from '@/components/primitives/tables/BasicTable';
import Typography from '@/components/primitives/Typography';
import { Flex, FlexCol } from '@/components/ui/ui-layout';
import React from 'react';

import user from '@/assets/images/user.png'
import Image from 'next/image';

const data = Array.from({length: 4}, (() => ({
    agent: {
        name: 'Chiamaka Adeleke',
        region: 'Lagos Mainland District'
    },
    points: {
        point: 78,
        label: 'Gold Tier'
    }
})))

const TableTitle = () => (
    <Flex className='justify-between'>
        <Typography>Top 10 Agents</Typography>
        <Typography color='active'>View Regional</Typography>
    </Flex>
)

const TopAgents = () => {

    const columns = [
        {
            key: 'agent',
            title: '',
            render: (val: any) => (
                <Flex className='gap-1.5'>
                    <Image src={user} alt='' width={40} height={40} className='rounded-full'/>
                    <FlexCol>
                        <Typography weight='bold'>{val.name}</Typography>
                        <Typography color='primary'>{val.region}</Typography>
                    </FlexCol>
                </Flex>
            )
        },
        {
            key: 'points',
            title: '',
            render: (val: any) => (
                <FlexCol>
                    <Typography weight='bold'>{val.point} pts</Typography>
                    <Typography variant='small' className='text-[#A43700]'>{val.label}</Typography>
                </FlexCol>
            )
        },
    ]
  return (
    <BasicTable columns={columns} data={data ?? []} title={<TableTitle/>}/>
  )
}

export default TopAgents;
