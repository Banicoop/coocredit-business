'use client';

import { useMemo } from 'react';
import { Eye } from 'lucide-react';
import Typography from '@/components/primitives/Typography';
import { Loan, LoanFilters, LoanStatus } from '@/types/domains/loan.types';
import { PaginationMeta } from '@/types/types';
import { formatDateTime } from '@/helpers/funcs';
import { ActionDropdown } from '../ui/ActionDropDown';
import { BasicTable } from '../primitives/tables/BasicTable';
import LoanTableFilters from '../ui/loans/LoanTableFilters';


interface ManagersLoanTableProps {
  data: Loan[];
  error?: string;
  pagination?: PaginationMeta;
  isLoading?: boolean;
  isFetching?: boolean;
  filters: LoanFilters;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: LoanStatus | 'all') => void;
  onDateChange: (
    field: 'startDate' | 'endDate',
    value: string
  ) => void;
  onResetFilters: () => void;
  onRetry?: () => void;
}

const statusStyles: Record<LoanStatus, string> = {
  'pending': 'bg-amber-100 text-amber-700',
  'disbursed-bank': 'bg-emerald-100 text-emerald-700',
  'rejected': 'bg-red-100 text-red-700',
};

const ManagersLoanTable = ({
  data,
  error,
  pagination,
  isLoading,
  isFetching,
  filters,
  onSearchChange,
  onStatusChange,
  onDateChange,
  onResetFilters,
  onRetry,
}: ManagersLoanTableProps) => {


  const columns = useMemo(
    () => [
      {
        key: 'loanProfileId',
        title: 'Applicant',
        render: (val: Loan['loanProfileId']) => (
          <Typography>
            {`${val?.firstName ?? ''} ${val?.lastName ?? ''}`}
          </Typography>
        ),
      },
      {
        key: 'appliedAt',
        title: 'Application Date',
        render: (val: string) => (
          <Typography>
            {val ? formatDateTime(val) : '—'}
          </Typography>
        ),
      },
      {
        key: 'amount',
        title: 'Amount',
        render: (val: number) => (
          <Typography>
            ₦{Number(val ?? 0).toLocaleString()}
          </Typography>
        ),
      },
      {
        key: 'interestAmount',
        title: 'Interest',
        render: (val: number) => (
          <Typography>
            ₦{Number(val ?? 0).toLocaleString()}
          </Typography>
        ),
      },
      {
        key: 'status',
        title: 'Status',
        render: (val: LoanStatus) => (
          <span
            className={`inline-flex rounded-md px-3 py-1 text-xs font-medium capitalize ${
              statusStyles[val] ?? 'bg-gray-100 text-gray-700'
            }`}
          >
            {val}
          </span>
        ),
      },
      {
        key: 'loanId',
        title: 'Actions',
        render: (id: string) => (
          <ActionDropdown
            actions={[
              {
                label: 'View Details',
                href: `/manager/portfolio/${id}/`,
                icon: Eye,
                variant: 'primary',
              },
              {
                label: 'Guarantor Info',
                href: `/manager/portfolio/${id}/guarantors`,
                icon: Eye,
                variant: 'primary',
              },
              {
                label: 'Repayment',
                href: `/manager/portfolio/${id}/repayments`,
                icon: Eye,
                variant: 'primary',
              },
            ]}
          />
        ),
      },
    ],
    []
  );

  return (
    <div className="flex flex-col gap-4">
      <BasicTable
        columns={columns}
        data={data}
        
        title={
          <LoanTableFilters
            filters={filters}
            onSearchChange={onSearchChange}
            onStatusChange={onStatusChange}
            onDateChange={onDateChange}
            onResetFilters={onResetFilters}
          />
        }
        loading={isFetching}
        error={error}
        emptyMessage={
          isLoading
            ? 'Loading loan applications...'
            : 'No Available Loan'
        }
        pagination
        paginationMeta={pagination}
      />
  
    </div>
  );
};

export default ManagersLoanTable;
