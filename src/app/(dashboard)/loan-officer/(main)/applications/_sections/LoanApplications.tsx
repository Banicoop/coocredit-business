'use client';

import Button from '@/components/primitives/buttons/Button';
import { BasicTable } from '@/components/primitives/tables/BasicTable';
import Typography from '@/components/primitives/Typography';
import { ActionDropdown } from '@/components/ui/ActionDropDown';
import { Tabs } from '@/components/ui/Tabs';
import { Flex, FlexCol } from '@/components/ui/ui-layout';
import { Download } from 'lucide-react';


const data = Array.from({length: 20}, (_, i) => ({
    id: `${i + 1}`,
    applicant: {
        name: 'Apex Manufacturing',
        ID: '#LN-884210'
    },
    amount: 300000,
    type: 'Equipment Finance',
    date: 'Oct 24, 2023',
    status: 'new',
}))


const Title = () => (
    <Flex className='justify-between w-full'>
        <Tabs items={tabs} defaultValue='new'/>
        <Button variant='ghost' startIcon={<Download size={16}/>} className='border'>Export</Button>
    </Flex>
)


const tabs = [
    {
        label: 'New',
        value: 'new',
        count: 42
    },
    {
        label: 'KYC Pending',
        value: 'KYCPending',
        count: 8
    },
    {
        label: 'Credit Check',
        value: 'CreditCheck',
        count: 5
    },
    {
        label: 'Underwriting',
        value: 'Underwriting',
        count: 14
    },
    {
        label: 'Approved',
        value: 'Approved',
        count: 42
    },
]


const LoanApplications = () => {

    const columns = [
        {
            key: 'applicant',
            title: 'Applicant',
            render: (applicant: any) => (
                <FlexCol>
                    <Typography weight='semibold'>{applicant.name}</Typography>
                    <Typography color='primary'>{applicant.ID}</Typography>
                </FlexCol>
            )
        },
        {
            key: 'amount',
            title: 'Amount',
            render: (amount: number) => (
                <Typography weight='semibold'>₦{(amount).toLocaleString()}</Typography>
            )
        },
        {
            key: 'type',
            title: 'Type'
        },
        {
            key: 'date',
            title: 'Date'
        },
        {
            key: 'status',
            title: 'Status',
            render: (status: string) => (
                <Typography className='py-1 px-2.5 rounded-lg capitalize bg-accent text-primary'>{status}</Typography>
            )
        },
        {
            key: 'id',
            title: 'Actions',
            render: (id: string) => (
                 <ActionDropdown 
                    actions={[
                        {
                            label: 'Review Loan',
                            variant: 'primary',
                            href: `/loan-officer/applications/${id}`
                        }
                    ]}/>
            )
        },
    ]

  return (
    <BasicTable
        columns={columns}
        data={data ?? []}
        title={<Title/>}
        pageSize={6} pagination/>
  )
}

export default LoanApplications;
