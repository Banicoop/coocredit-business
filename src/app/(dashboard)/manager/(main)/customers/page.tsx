'use client';

import { Tabs2 } from '@/components/ui/Tabs2';
import CustomersTab from './(tabs)/CustomersTab';
import LeadToReview from './(tabs)/LeadToReview';
import {  getAllLeadsToReview } from '@/lib/api';
// import ErrorPage from '@/components/ui/ErrorPage';
import { useGetAllCustomers, useGetAllLeads } from '@/lib/hooks/useCustomers';
import { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';




const CustomersPage =  () => {
  const [search, setSearch] = useState('');
  const [searchLead, setSearchLead] = useState('');

  
  const debouncedSearch = useDebounce(search, 500);

  const { data, error, isPending, isFetching, isError } = useGetAllCustomers({
    search: debouncedSearch || undefined,
  });

  const { data: leadsData, error: leadsError, isPending: leadsPending, isFetching: leadsFetching, isError: leadsisError } = useGetAllLeads({
    searchLead: debouncedSearch || undefined,
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };


  const handleLeadsSearch = (value: string) => {
    setSearchLead(value);
  };

  console.log('leads:', leadsData);



    const tabs = [
      {
        label: 'Business Customers',
        content: <CustomersTab 
        data={data?.data ?? []} 
        search={search}
        onSearchChange={handleSearchChange}
        isLoading={isPending}
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
