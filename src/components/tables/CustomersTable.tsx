'use client';

import { BasicTable } from '@/components/primitives/tables/BasicTable';
import { TextField } from '@/components/primitives/inputs/TextField';
import Typography from '@/components/primitives/Typography';
import { Flex } from '@/components/ui/ui-layout';
import { Eye, Search } from 'lucide-react';
// import { ProgressBar } from '@/components/ui/ProgessBar';
import { ActionDropdown } from '@/components/ui/ActionDropDown';
import { useMemo, useState } from 'react';

type Customer = {
  id: string;
  customerName: string;
  status: string;
  date: string;
  creditScore: number;
};

const CustomersTable = ({
  initialData,
  error,
  isLead
}: {
  initialData: Customer[];
  error?: string;
  isLead?: boolean
}) => {
  const [search, setSearch] = useState('');

  // const filtered = useMemo(
  //   () =>
  //     initialData?.filter((c) =>
  //       c.customerName?.toLowerCase().includes(search.toLowerCase())
  //     ),
  //   [initialData, search]
  // );

  const columns = [
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
              variant: 'primary', icon: Eye },
          ]}
        />
      ),
    },
  ];

  const TableTitle = () => (
    <Flex className="w-full flex-col md:flex-row gap-2.5 items-start md:items-center justify-between">
      <Typography>All Customers</Typography>
      <TextField
        startIcon={<Search size={18} />}
        variant="primary"
        className="outline-none"
        placeholder="Search by name, ID..."
        value={search}
        onChange={(e: any) => setSearch(e.target.value)}
      />
    </Flex>
  );

  return (
    <BasicTable
      columns={columns}
      error={error}
      // data={filtered}
      data={initialData}
      title={<TableTitle />}
      pagination
    />
  );
};

export default CustomersTable;
