'use client';

import CustomSelect from '@/components/primitives/inputs/CustomSelect';
import { BasicTable } from '@/components/primitives/tables/BasicTable';
import Typography from '@/components/primitives/Typography';
import { Flex, FlexCol } from '@/components/ui/ui-layout';
import React from 'react'


const data = Array.from({length: 10}, (() => ({
    customer: {
        name: 'Olukayode Adeyemi',
        detail: 'Micro-Retail Loan'
    },
    balance: '₦450,000',
    loanProduct: 'SME Growth Cap',
    status: 'current'
})))

const Title = () => (
    <Flex className='justify-between'>
        <Typography>Portfolio Customers</Typography>
        <CustomSelect label='Status' 
        wrapperClass='flex flex-row items-center gap-1.5' options={[
            {label: 'All', value: 'all'},
            {label: 'Current', value: 'active'},
            {label: 'Overdue', value: 'inactive'},]}/>
    </Flex>
)

const CustomersList = () => {

    const columns = [
        {
            key: 'customer',
            title: 'CUSTOMER',
            render: (customer: any) => (
                <FlexCol>
                    <Typography weight='semibold'>{customer.name}</Typography>
                    <Typography color='primary' weight='semibold'>{customer.detail}</Typography>
                </FlexCol>
            )
        },
        {
            key: 'loanProduct',
            title: 'Loan Product'
        },
        {
            key: 'balance',
            title: 'Balance'
        },
        {
            key: 'status',
            title: 'Status',
            render: (status: string) => (
                <Typography color='success' className='py-1 px-2 rounded-md bg-accent capitalize font-bold'>{status}</Typography>
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

export default CustomersList;
