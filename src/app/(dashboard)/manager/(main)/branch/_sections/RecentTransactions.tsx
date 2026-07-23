'use client';

import Button from '@/components/primitives/buttons/Button';
import { BasicTable } from '@/components/primitives/tables/BasicTable';
import Typography from '@/components/primitives/Typography';
import { ActionDropdown } from '@/components/ui/ActionDropDown';
import { Flex, FlexCol } from '@/components/ui/ui-layout';
import { Eye } from 'lucide-react';



const Title = () => (
    <Flex className='justify-between'>
        <Typography>Recent Transactions</Typography>
        <Button variant='ghost' className='border'>Export CSV</Button>
    </Flex>
)

const RecentTransactions = ({data, error}: {data: any[], error: string}) => {

    const columns = [
        {
            key: 'transactionId',
            title: 'TRANSACTION ID',
            render: (id: string) => (
                <Typography variant='small' weight='semibold' color='active'>{id}</Typography>
            )
        },
        {
            key: 'createdAt',
            title: 'TIMESTAMP',
            render: (timestamp: string | Date | number) => {
            const date = new Date(timestamp);
                return(
                <FlexCol>
                      <Typography variant="small" color="primary" weight="semibold">
                    {date.toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    })}
                </Typography>
                <Typography className="text-[10px] text-ring">
                    {date.toLocaleTimeString(undefined, {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </Typography>
                </FlexCol>
            )
        },},
        {
            key: 'transactionType',
            title: 'TYPE'
        },
        {
            key: 'beneficiaryAccountName',
            title: 'Beneficiary'
        },
        {
            key: 'transactionAmount',
            title: 'AMOUNT (₦)',
             render: (amount: string) => (
                <Typography variant='small' color='success' className='py-1 px-2.5 bg-accent font-semibold'>₦{Number(amount).toLocaleString()}</Typography>
            )
        },
        {
            key: 'transactionStatus',
            title: 'STATUS',
            render: (status: string) => (
                <Typography variant='small' color='success' className='py-1 px-2.5 bg-accent font-semibold'>{status}</Typography>
            )
        },
        {
            key: 'id',
            title: 'ACTIONS',
            render: () => (
                <ActionDropdown 
                    actions={[
                        {
                            label: 'View Details',
                            icon: Eye,
                            variant: 'primary',
                            href: '/manager/branch/'
                        }
                    ]}/>
            )
        },
    ]


  return (
    <BasicTable 
        columns={columns} 
        data={data ?? []} 
        title={<Title/>} pageSize={8} 
        pagination error={error}
        />
  )
}

export default RecentTransactions;
