'use client';

import { Tabs2 } from '@/components/ui/Tabs2';
import CustomersTab from './(tabs)/CustomersTab';
// import LeadToReview from './(tabs)/LeadToReview';
// import {  getAllLeadsToReview } from '@/lib/api';
// import ErrorPage from '@/components/ui/ErrorPage';
import { useGetAllCustomers } from '@/lib/hooks/useCustomers';
import { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';




const CustomersPage =  () => {
  const [search, setSearch] = useState('');
  
  const debouncedSearch = useDebounce(search, 500);

  const { data, error, isPending, isFetching, isError } = useGetAllCustomers({
    search: debouncedSearch || undefined,
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };


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
      // {
      //   label: 'Lead to Review',
      //   content: <LeadToReview data={leads?.data} error={leads.error}/>
      // },
    ]
  return (
    <Tabs2 tabs={tabs} defaultValue='Business Customers'/>
  )
}

export default CustomersPage;
