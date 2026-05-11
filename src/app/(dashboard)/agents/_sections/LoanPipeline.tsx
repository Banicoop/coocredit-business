import Typography from '@/components/primitives/Typography'
import { FlexCol, Grid } from '@/components/ui/ui-layout'
import React from 'react'

export const LoanPipeline = () => {
  return (
    <FlexCol className='p-4 border bg-white rounded-xl'>
        <Typography variant='h3' className='' weight='bold'>Loan Application Pipeline</Typography>
    </FlexCol>
  )
}


export const Buttons = () => {
  return (
    <Grid className='grid-cols-2 p-4 border bg-white rounded-xl'>
        <div className="">Groups</div>
    </Grid>
  )
}
export const Commissions = () => {
  return (
    <Grid className='grid-cols-2 p-4 border bg-white rounded-xl'>
        <div className="">Groups</div>
    </Grid>
  )
}

