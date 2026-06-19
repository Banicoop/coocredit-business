import { BackButton } from '@/components/primitives/buttons/BackButton';
import { Grid } from '@/components/ui/ui-layout';
import React from 'react'

const ApplicationDetails = () => {
  return (
    <Grid className='gap-6'>
        <BackButton label='Applications'/>
    </Grid>
  )
}

export default ApplicationDetails;
