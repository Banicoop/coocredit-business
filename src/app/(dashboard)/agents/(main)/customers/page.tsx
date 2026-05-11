import Button from '@/components/primitives/buttons/Button';
import { PageHeader } from '@/components/ui/PageHeader'
import { Flex } from '@/components/ui/ui-layout';
import { Plus } from 'lucide-react';
import React from 'react'

const AgentsCustomersPage = () => {
  return (
    <main className='grid gap-5'>
      <Flex className='items-center justify-between w-full'>
        <PageHeader title='Customer Acquisition'/>
        <Button variant='primary' startIcon={<Plus size={20}/>}>New Customer</Button>
      </Flex>
    </main>
  )
}

export default AgentsCustomersPage;
