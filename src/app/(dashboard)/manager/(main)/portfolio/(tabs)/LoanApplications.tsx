'use client';

import ManagersLoanTable from '@/components/tables/ManagersLoanTable';
import { PageHeader } from '@/components/ui/PageHeader';
import { Grid } from '@/components/ui/ui-layout';
import { useDebounce } from '@/hooks/useDebounce';
import { useGetAllLoans } from '@/lib/hooks/useLoans';
import { LoanStatus } from '@/types/domains/loan.types';
import { useState } from 'react';


const LoanApplicationsTab = () => {

  
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<LoanStatus | 'all'>('all');

  const debouncedSearch = useDebounce(search, 500);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const {
    data,
    isPending,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetAllLoans({
    search: debouncedSearch || undefined,
    // @ts-ignore
    status: status === 'all' ? undefined : status,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
  });

  const handleStatusChange = (
    value: LoanStatus | 'all'
  ) => {
    setStatus(value);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleDateChange = (
    field: 'startDate' | 'endDate',
    value: string
  ) => {
    if (field === 'startDate') {
      setStartDate(value);
    } else {
      setEndDate(value);
    }

  };

  const resetFilters = () => {
    setSearch('');
    setStatus('all');
    setStartDate('');
    setEndDate('');
  };


  return (
    <Grid className='gap-6'>
        <PageHeader
            title='Loan Applications' 
            description='Manage and review incoming enterprise loan requests.' />

          <ManagersLoanTable
            data={data?.data ?? []}
            pagination={data?.pagination}
            error={isError ? error.message : undefined}
            isLoading={isPending}
            isFetching={isFetching}
            onRetry={() => refetch()}
            filters={{
              search,
              status,
              startDate,
              endDate,
            }}
            onSearchChange={handleSearchChange}
            onStatusChange={handleStatusChange}
            onDateChange={handleDateChange}
            onResetFilters={resetFilters}
          />

    </Grid>
  )
}

export default LoanApplicationsTab;
