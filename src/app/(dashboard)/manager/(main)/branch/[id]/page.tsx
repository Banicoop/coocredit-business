import { BackButton } from '@/components/primitives/buttons/BackButton';
import { Grid } from '@/components/ui/ui-layout';
import { getTransactionById } from '@/lib/api';
import { IDParam } from '@/types/types';
import React from 'react'

const TransactionDetails = async ({params}: IDParam) => {

    const { id } = await params;

    const res = await getTransactionById(id);

    // console.log('TRANSACTION DETAILS:', res)
  return (
    <Grid className='gap-6'>
      <BackButton/>
    </Grid>
  )
}

export default TransactionDetails;
