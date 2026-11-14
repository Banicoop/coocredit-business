'use client';

import { Tabs2 } from '@/components/ui/Tabs2';
import CustomersTab from './(tabs)/CustomersTab';
import LeadToReview from './(tabs)/LeadToReview';
import { useGetAllCustomers, useGetAllLeads } from '@/lib/hooks/useCustomers';
import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';



const CustomersPage =  () => {
  const [search, setSearch] = useState('');
  const [searchLead, setSearchLead] = useState('');
  const [page, setPage] = useState(1);

  
  const debouncedSearch = useDebounce(search, 500);

  const { data, error, isPending, isFetching, isError } = useGetAllCustomers({
    search: debouncedSearch || undefined, page
  }) as any;

  // Reset to page 1 when the search changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const { data: leadsData, error: leadsError, isPending: leadsPending, isFetching: leadsFetching, isError: leadsisError } = useGetAllLeads({
    searchLead: debouncedSearch || undefined,
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };


  const handleLeadsSearch = (value: string) => {
    setSearchLead(value);
  };


    const tabs = [
      {
        label: 'Business Customers',
        content: <CustomersTab 
        data={data?.data ?? []} 
        search={search}
        onSearchChange={handleSearchChange}
        isLoading={isPending}
        onPageChange={(page) => {
          setPage(page);
        }}
        isFetching={isFetching}
        error={isError ? error.message : undefined} 
        pagination={data?.pagination}/>
      },
      {
        label: 'Lead to Review',
        content: <LeadToReview 
        data={leadsData?.data ?? []} 
        search={searchLead}
        onSearchChange={handleLeadsSearch}
        isLoading={leadsPending}
        isFetching={leadsFetching}
        pagination={leadsData?.pagination}
        error={leadsisError ? leadsError.message : undefined}/>
      },
    ]
  return (
    <Tabs2 tabs={tabs} defaultValue='Business Customers'/>
  )
}

export default CustomersPage;
