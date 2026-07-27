import { getTransactionById } from '@/lib/api';
import { IDParam } from '@/types/types';
import React from 'react'

const TransactionDetails = async ({params}: IDParam) => {

    const { id } = await params;

    const res = await getTransactionById(id);

    console.log('TRANSACTION DETAILS:', res)
  return (
    <div>TransactionDetails</div>
  )
}

export default TransactionDetails;
