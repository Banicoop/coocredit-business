import { BackButton } from '@/components/primitives/buttons/BackButton';
import { Grid } from '@/components/ui/ui-layout';
import React from 'react'

const PortfolioDetails = () => {
  return (
    <Grid className='gap-6'>
        <BackButton 
            label='Portfolio Details' 
            className='font-bold text-primary2 text-[20px]'/>
    </Grid>
  )
}

export default PortfolioDetails;
