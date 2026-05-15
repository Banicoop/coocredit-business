'use client';

import { BasicTable } from '@/components/primitives/tables/BasicTable';
import CustHeader from './_sections/CustHeader';
import { TextField } from '@/components/primitives/inputs/TextField';
import Typography from '@/components/primitives/Typography';
import { Flex } from '@/components/ui/ui-layout';
import { EllipsisVertical, Search } from 'lucide-react';
import React from 'react';
import { ProgressBar } from '@/components/ui/ProgessBar';

const data = Array.from({length: 30}, () => ({
  customerName: 'Divine Maduka',
  customerID: '#CUST-8821',
  loanAmount: 50000,
  status: 'approved',
  date: '12th May, 2016',
  creditScore: 60
}))

const TableTitle = () => (
    <Flex className='w-full flex-col md:flex-row justify-between'>
        <Typography>All Customers</Typography>
        <TextField startIcon={<Search size={18}/>} variant='primary' className='outline-none' placeholder='Search by name, ID...'/>
    </Flex>
)

const AgentsCustomersPage = () => {

  const columns = [
    {
      key: 'customerName',
      title: 'Customer Name'
    },
    {
      key: 'status',
      title: 'Status',
      render: (value: string) => (
        <Typography variant='small' className='capitalize'>{value}</Typography>
      )
    },
    {
      key: 'loanAmount',
      title: 'Loan Amount',
      render: (value: number) => (
        <Typography>₦{value.toLocaleString()}</Typography>
      )
    },
    {
      key: 'date',
      title: 'Date Applied'
    },
    {
      key: 'creditScore',
      title: 'Credit Score',
      render: (val: number) => (
        <div className=" flex items-center p-1 gap-1.5">
            <ProgressBar value={val} className='bg-primary'/>
           <Typography color='active' weight='bold' variant='small'>{val}%</Typography>
        </div>
      )
    },
    {
      key: 'Actions',
      title: 'Actions',
      render: (row: any) => (
        <EllipsisVertical size={20} className='text-primary' />
      )
    },
  ]


  return (
    <main className='grid gap-5'>
      <CustHeader/>
      <BasicTable columns={columns} data={data ?? []} title={<TableTitle/>} pagination pageSize={5}/>
    </main>
  )
}

export default AgentsCustomersPage;

