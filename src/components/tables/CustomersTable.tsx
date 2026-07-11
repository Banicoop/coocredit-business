'use client';

import { BasicTable } from '@/components/primitives/tables/BasicTable';
import { TextField } from '@/components/primitives/inputs/TextField';
import Typography from '@/components/primitives/Typography';
import { Flex } from '@/components/ui/ui-layout';
import { Eye, Search } from 'lucide-react';
import { ProgressBar } from '@/components/ui/ProgessBar';
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
}: {
  initialData: Customer[];
  error?: string | null;
}) => {
  const [search, setSearch] = useState('');

  const filtered = useMemo(
    () =>
      initialData.filter((c) =>
        c.customerName.toLowerCase().includes(search.toLowerCase())
      ),
    [initialData, search]
  );

  const columns = [
    { key: 'customerName', title: 'Customer Name' },
    {
      key: 'status',
      title: 'Status',
      render: (value: string) => (
        <Typography variant="small" className="capitalize">{value}</Typography>
      ),
    },
    { key: 'date', title: 'Date Applied' },
    {
      key: 'creditScore',
      title: 'Credit Score',
      render: (val: number) => (
        <div className="flex items-center p-1 gap-1.5">
          <ProgressBar value={val} className="bg-primary" />
          <Typography color="active" weight="bold" variant="small">{val}%</Typography>
        </div>
      ),
    },
    {
      key: 'id',
      title: 'Actions',
      render: (id: string) => (
        <ActionDropdown
          actions={[
            { label: 'View Details', href: `/agents/customer/${id}`, variant: 'primary', icon: Eye },
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

  if (error) {
    return <Typography>{error}</Typography>;
  }

  return (
    <BasicTable
      columns={columns}
      data={filtered}
      title={<TableTitle />}
      pagination
      pageSize={5}
    />
  );
};

export default CustomersTable;
