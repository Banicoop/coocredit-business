'use client';

import { BasicTable } from '@/components/primitives/tables/BasicTable';
import Typography from '@/components/primitives/Typography';
import { ActionDropdown } from '@/components/ui/ActionDropDown';
import { Tabs } from '@/components/ui/Tabs';
import { Eye } from 'lucide-react';

  const tabs = [
    {
      label: 'All Agents',
      value: 'all'
    },
    {
      label: 'Pending',
      value: 'agents'
    },
    {
      label: 'Completed',
      value: 'super-agents'
    },
  ]




const AgentList = ({ data }: { data: any[] }) => {


    const columns = [
        {
            key: 'firstName',
            title: 'First Name',
        },
        {
            key: 'lastName',
            title: 'Last Name',
        },
        {
            key: 'email',
            title: 'Email',
        },
        {
            key: 'phoneNumber',
            title: 'Phone Number',
            render: (value: string) => <Typography variant='small' className='font-semibold'>{value}</Typography>
        },
        {
            key: 'type',
            title: 'Type',
        },
        {
            key: 'approvalStatus',
            title: 'Approval Status',
            render: (value: string) => <Typography variant='small' className={`font-semibold capitalize py-2 px-3 bg-accent rounded-lg ${value === 'pending' ? 'text-chart-5': value === 'completed' ? 'text-chart-2': 'text-destructive'}`}>{value}</Typography>
        },
        {
            key: 'userId',
            title: 'Actions',
            render: (id: string) => (
                <ActionDropdown actions={[
                    {
                        label: 'View Details',
                        variant: 'primary',
                        icon: Eye,
                        href: `/manager/team/${id}`
                    }
                ]} />
            )
        },
    ];

  return (
    <BasicTable 
        columns={columns} 
        title={<Tabs items={tabs} defaultValue='all' />}
        data={data ?? []} />
  )
}

export default AgentList;
