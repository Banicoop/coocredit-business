'use client';

import { ProgressBar } from '../ui/ProgessBar'
import { Flex } from '../ui/ui-layout'
import Typography from '../primitives/Typography'
import { ActionDropdown } from '../ui/ActionDropDown'
import { Eye } from 'lucide-react'
import { BasicTable } from '../primitives/tables/BasicTable'
import { PaginationMeta } from '@/types/types';
import { useUrlPagination } from '@/hooks/useUrlPagination.';

const AgentCustomerTable = ({data, error, pagination}: {data: any[], error: string, pagination?: PaginationMeta}) => {

    const onPageChange = useUrlPagination();

    const columns = [
        { key: 'firstName', title: 'First Name' },
        { key: 'lastName', title: 'Last Name' },
        { key: 'phoneNumber', title: 'Phone Number' },
        { key: 'type', title: 'Type' },
        { key: 'creditScore',
            title: 'Credit Score',
            render: (val: number) => {
                const score = Math.round(val) || 0
                return(
                    <Flex className="flex items-center p-1 gap-1.5">
                        <ProgressBar value={score} className="bg-primary" />
                        <Typography color="active" weight="bold" variant="small">{score}%</Typography>
                    </Flex>
            )},
        },
        {
            key: 'userId',
            title: 'Actions',
            render: (id: string) => (
            <ActionDropdown
                actions={[
                { 
                    label: 'View Details', 
                    href: `/agent/customers/${id}`, 
                    variant: 'primary', icon: Eye },
                ]}
            />
            ),
        },
    ]
  return (
    <BasicTable
        columns={columns}
        error={error}
        data={data}
        onPageChange={onPageChange}
        pagination
        paginationMeta={pagination}
    />
  )
}

export default AgentCustomerTable;
