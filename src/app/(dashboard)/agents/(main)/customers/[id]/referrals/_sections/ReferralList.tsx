'use client';

import { BasicTable } from '@/components/primitives/tables/BasicTable';
import Typography from '@/components/primitives/Typography';
import { Flex, FlexCol } from '@/components/ui/ui-layout';
import Image from 'next/image';
import React from 'react'

import user from '@/assets/images/user.png';


const data = Array.from({length: 4}, (() => ({
    customer: {
        name: 'Adewale Johnson',
        ID: 'Retailer • ID #29402'
    },
    createdAt: 'Oct 24, 2023',
    loanStatus: 'FULLY REPAID',
    bonusEarned: '₦2,500'
})))

const ReferralList = () => {

    const columns = [
        {
            key: 'customer',
            title: 'Customer Name',
            render: (val: any) => (
                <Flex className='gap-1'>
                    <Image src={user} alt='' width={35} height={35}/>
                    <FlexCol>
                        <Typography weight='semibold'>{val.name}</Typography>
                        <Typography color='primary' variant='small'>{val.ID}</Typography>
                    </FlexCol>
                </Flex>
            )
        },
        {
            key: 'createdAt',
            title: 'Date Referred'
        },
        {
            key: 'loanStatus',
            title: 'Loan Status'
        },
        {
            key: 'bonusEarned',
            title: 'Bonus Earned'
        },
    ]
  return (
    <BasicTable columns={columns} data={data ?? []} title={<Typography variant='p'>Referral Network</Typography>}/>
  )
}

export default ReferralList;
