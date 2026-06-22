
import CustomSelect from '@/components/primitives/inputs/CustomSelect'
import { TextField } from '@/components/primitives/inputs/TextField'
import Typography from '@/components/primitives/Typography'
import { Flex, FlexCol, GridItem } from '@/components/ui/ui-layout'
import { cn } from '@/lib/utils'
import { Fingerprint, Info } from 'lucide-react'
import React from 'react'

export const OnbaordingInputs = () => {
  return (
     <GridItem className={cn('grid-cols-2 gap-3.5 p-6')}>
        <Flex className='gap-4 col-span-2'>
        <div className="p-2 rounded-xl bg-accent">
            <Fingerprint size={16} className='text-primary'/>
        </div>
        <Typography variant='h4' weight='semibold' color='primary2'>Agent Identity</Typography>
        </Flex>

        <TextField placeholder='e.g Maduka Divine' label='Full Legal Name'/>
        <CustomSelect 
        label='OPERATIONAL REGION' 
        wrapperClass='h-11'
        options={[{label: 'Lagos Central', value: '1'}, {label: 'Lagos Island', value: '2'}, {label: 'Ibeju-Lekki Zone', value: '3'}]}/>
        <TextField placeholder='agent@meridian.com' label='PRIMARY EMAIL'/>
        <TextField placeholder='e.g 0800 000 0000' label='DIRECT PHONE'/>
    </GridItem>
  )
}


export const SecurityProtocol = () => {
    return(
        <FlexCol className='gap-4 p-5 bg-card rounded-lg shadow-md'>
            <Typography color='active' startIcon={<Info size={16}/>}>SECURITY PROTOCOL</Typography>
            <Typography variant='p'>A ₦25,000 security deposit will be automatically earmarked for KYC processing upon initialization.</Typography>
        </FlexCol>
    )
}


