'use client';

import { BasicTable } from '@/components/primitives/tables/BasicTable';
import Typography from '@/components/primitives/Typography';
import { ActionDropdown } from '@/components/ui/ActionDropDown';
import { View } from 'lucide-react';
import React from 'react'


const data = Array.from({length: 10}, () => ({
    customer: {
        name: 'Starlight Logistics',
        business: 'Commercial Credit'
    },
    loanId: '#LN-8802-QX',
    date: 'Oct 12, 2023',
    balance: '₦850,000.00',
    status: 'active'
}))

const AssetLoans = () => {

    const columns = [
        {
            key: 'customer',
            title: 'Customer',
            render: (customer: any) => (
                <div className='flex flex-col'>
                    <Typography weight='semibold'>{customer.name}</Typography>
                    <Typography variant='small' color='primary'>{customer.business}</Typography>
                </div>
            )
        },
        {
            key: 'loanId',
            title: 'LOAN ID'
        },
        {
            key: 'date',
            title: 'DISBURSEMENT DATE'
        },
        {
            key: 'balance',
            title: 'TOTAL BALANCE'
        },
        {
            key: 'status',
            title: 'Status',
            render: (status: string) => (
                <Typography className='py-1 px-2 bg-accent rounded-md text-primary capitalize'>{status}</Typography>
            )
        },
        {
            key: 'id',
            title: 'Actions',
            render: (id: string) => (
                <ActionDropdown 
                actions={[
                    {
                        label: 'Loan Details',
                        variant: 'primary',
                        icon: View,
                        href: `/loan-officer/portfolio/${id}`
                    }
                ]} />
            )
        },
    ]

  return (
    <BasicTable 
        columns={columns} 
        data={data ?? []} 
        pageSize={6}
        pagination
        title={<Typography>Active Loan Assets</Typography>}/>
  )
}

export default AssetLoans;
