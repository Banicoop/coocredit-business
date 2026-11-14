'use client';

import { BasicTable } from '@/components/primitives/tables/BasicTable';
import { TextField } from '@/components/primitives/inputs/TextField';
import Typography from '@/components/primitives/Typography';
import { Flex } from '@/components/ui/ui-layout';
import { Eye, Search } from 'lucide-react';
// import { ProgressBar } from '@/components/ui/ProgessBar';
import { ActionDropdown } from '@/components/ui/ActionDropDown';
import { PaginationMeta } from '@/types/types';

interface TableProps {
  initialData: any;
  error?: string;
  isLead?: boolean;
  onPageChange: (page: number) => void;
  pagination: PaginationMeta;
  onSearchChange: (val: string) => void;
  isFetching: boolean;
  isLoading: boolean;
  search: string;
}


const CustomersTable = ({
  initialData,
  pagination,
  onSearchChange,
  isFetching,
  onPageChange,
  isLoading,
  error,
  isLead,
  search
}: TableProps) => {

 


  const columns = [
    {
        key: 'index',
        title: 'S/N',
        render: (_value: any, _row: any, index: number) => (
            <Typography variant='small' color="primary">
            {index + 1}
            </Typography>
        ),
    },
    { key: 'firstName', title: 'First Name' },
    { key: 'lastName', title: 'Last Name' },
    { key: 'phoneNumber', title: 'Phone Number' },
    { key: 'gender', title: 'Gender' },
    { key: 'type', title: 'Type' },
    {
      key: 'userId',
      title: 'Actions',
      render: (id: string) => (
        <ActionDropdown
          actions={[
            { 
              label: 'View Details', 
              href: isLead ? `/manager/customers/${id}/lead`:  `/manager/customers/${id}`, 
              variant: 'primary', 
              icon: Eye 
            },
          ]}
        />
      ),
    },
  ];

  const title = (
    <Flex className="w-full flex-col md:flex-row gap-2.5 items-start md:items-center justify-between">
      <Typography>All Customers</Typography>
      <TextField
        startIcon={<Search size={18} />}
        variant="primary"
        className="outline-none"
        placeholder="Search by name, ID..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </Flex>
  );


  return (
    <BasicTable
      columns={columns}
      error={error}
      data={initialData}
      loading={isFetching || isLoading}
      title={title}
      onPageChange={(page) => onPageChange(page)}
      pagination
      paginationMeta={pagination}
    />
  );
};

export default CustomersTable;
