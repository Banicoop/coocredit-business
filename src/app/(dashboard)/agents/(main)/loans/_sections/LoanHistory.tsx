import { BasicTable } from '@/components/primitives/tables/BasicTable';
import { Flex } from '@/components/ui/ui-layout';
import React from 'react'

const Title = () => (
    <Flex>
        A
    </Flex>
)

const LoanHistory = () => {

    const columns = [
        {
            key: 'applicant',
            title: 'Applicant'
        },
        {
            key: 'loanAmount',
            title: 'Loan Amount'
        },
        {
            key: 'status',
            title: 'Statua'
        },
        {
            key: 'date',
            title: 'Date'
        },
        {
            key: 'actions',
            title: 'Actions'
        },
    ]
  return (
    <BasicTable columns={columns} data={[]} title={<Title/>} pageSize={6} pagination/>
  )
}

export default LoanHistory;
