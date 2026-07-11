'use client';

// import { TextField } from '@/components/primitives/inputs/TextField';
import { BasicTable } from '@/components/primitives/tables/BasicTable';
import Typography from '@/components/primitives/Typography';
import { ActionDropdown } from '@/components/ui/ActionDropDown';
import { Tabs } from '@/components/ui/Tabs';
// import { Flex } from '@/components/ui/ui-layout';
import { Edit, Edit3, Eye } from 'lucide-react';

  const tabs = [
    {
      label: 'All Agents',
      value: 'all'
    },
    {
      label: 'Agents',
      value: 'agents'
    },
    {
      label: 'Super Agents',
      value: 'super-agents'
    },
  ]




const AgentList = ({ data }: { data: any[] }) => {


    const columns = [
        {
            key: 'userId',
            title: 'Agent ID',
            render: (value: string) => <Typography variant='small' color='active' className='font-semibold'>{value}</Typography>
        },
        // {
        //     key: 'username',
        //     title: 'Username',
        //     render: (value: string) => <Typography variant='small' className='font-semibold'>{value}</Typography>
        // },
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
            key: '_id',
            title: 'Actions',
            render: (_id: string) => (
                <ActionDropdown actions={[
                    {
                        label: 'View Details',
                        variant: 'primary',
                        icon: Eye,
                        onClick: () => {}
                    },
                    {
                        label: 'Validate Agent',
                        variant: 'primary',
                        icon: Edit,
                        onClick: () => {}
                    },
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
