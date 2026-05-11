import { Grid } from '@/components/ui/ui-layout';
import React from 'react'
import { Buttons } from './LoanPipeline';
import { CloudUpload, FilePenLine, MapPinSearch, UserPlus } from 'lucide-react';

const QuickActions = () => {
  return (
    <Grid className='grid-cols-2 gap-2.5'>
        <Buttons text='Onboard Customer' icon={<UserPlus size={22}/>}/>
        <Buttons text='Submit Application' icon={<FilePenLine size={22}/>}/>
        <Buttons text='Upload KYC Docs' icon={<CloudUpload size={22}/>}/>
        <Buttons text='View Territory' icon={<MapPinSearch size={22}/>}/>
    </Grid>
  )
}

export default QuickActions;
