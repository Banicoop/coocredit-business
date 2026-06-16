import { BasicTable } from '@/components/primitives/tables/BasicTable';
import Typography from '@/components/primitives/Typography';
import { Flex } from '@/components/ui/ui-layout';
import { Calendar } from 'lucide-react';
import React from 'react';


const data = Array.from({length: 10}, () => ({
    installmentDate: 'Nov 15,2023',
    principal: '₦375,000',
    interest: '₦54,375',
    totalAmount: '₦429,375'
}))

const RepaymentTerms = () => {

    const columns = [
        {
            key: 'installmentDate',
            title: 'Installment Date'
        },
        {
            key: 'principal',
            title: 'Principal'
        },
        {
            key: 'interest',
            title: 'Interest'
        },
        {
            key: 'totalAmount',
            title: 'Total Payment'
        },
    ]

  return (
    <BasicTable 
        columns={columns} 
        data={data ?? []} 
        title={
        <Flex className='justify-between'>
            <Typography startIcon={<Calendar size={16} className='text-primary'/>} color='primary2'>Repayment Terms & Schedule</Typography>
            <Typography color='active'>Download Amortization Table</Typography>
        </Flex>}
        pageSize={4} pagination/>
  )
}

export default RepaymentTerms;
