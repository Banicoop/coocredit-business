import { BackButton } from '@/components/primitives/buttons/BackButton';
import { ColItem, PageHeader } from '@/components/ui/PageHeader';
import { Grid } from '@/components/ui/ui-layout';
import React from 'react'

const AddNewAgent = () => {
  return (
    <Grid className='gap-5'>
        <BackButton label='Back to Agent'/>
        <ColItem item1='Network Expansion' 
            item2='Onboard a new sovereign agent into the Meridian network. High-authority verification and regional compliance checks are mandatory.'
            className1='text-[30px]'
            className2='text-[18px] md:w-2/3'
            />
    </Grid>
  )
}

export default AddNewAgent;
