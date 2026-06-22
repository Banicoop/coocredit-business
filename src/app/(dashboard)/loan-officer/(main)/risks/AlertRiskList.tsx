'use client';

import { BasicTable } from '@/components/primitives/tables/BasicTable';
import Typography from '@/components/primitives/Typography';
import { ActionDropdown } from '@/components/ui/ActionDropDown';
import { Tabs } from '@/components/ui/Tabs';
import { Flex } from '@/components/ui/ui-layout';
import { Eye } from 'lucide-react';


const data = Array.from({length: 20}, (_, i) => ({
    id: `${i + 1}`,
    entity: {
        name: 'Global Retailers Inc.',
        id: 'LN-8842-XQ'
    },
    riskType: 'Identity Fraud',
    severity: 'CRITICAL',
    date: 'Oct 24, 2023'
}))


const tabs = [
    {
        label: 'Critical',
        value: 'critical',
        count: 8
    },
    {
        label: 'High',
        value: 'high',
        count: 14
    },
    {
        label: 'Medium',
        value: 'medium',
        count: 20
    },
]

const Title = () => (
    <Flex className='justify-between'>
        <Typography variant='h3'>Active Risk Alerts</Typography>
        <Tabs items={tabs} defaultValue='critical'/>
    </Flex>
)

const AlertRiskList = () => {

    const columns = [
        {
            key: 'entity',
            title: 'ENTITY / LOAN ID',
            render: (entity: any) => (
                <div className="flex flex-col">
                    <Typography weight='semibold'>{entity.name}</Typography>
                    <Typography color='primary'>{entity.id}</Typography>
                </div>
            )
        },
        {
            key: 'riskType',
            title: 'RISK TYPE'
        },
        {
            key: 'severity',
            title: 'SEVERITY',
            render: (val: string) => (
                <Typography className='py-1 px-2.5 rounded-lg bg-accent text-chart-5 text-xs capitalize'>{val}</Typography>
            )
        },
        {
            key: 'date',
            title: 'TRIGGER DATE'
        },
        {
            key: 'id',
            title: 'Actions',
            render: (id: string) => (
                <ActionDropdown 
                actions={[
                    {
                        label: 'View Details',
                        icon: Eye,
                        variant: 'destructive'
                    }
                ]}/>
            )
        },
    ]

  return (
    <BasicTable columns={columns} data={data ?? []} title={<Title/>} pageSize={5} pagination/>
  )
}

export default AlertRiskList;
