

import Typography from '@/components/primitives/Typography'
import { ColItem } from '@/components/ui/PageHeader'
import { Flex, FlexCol } from '@/components/ui/ui-layout'
import { Landmark } from 'lucide-react'
import React from 'react'

export const DisbursementDestnation = () => {
  return (
    <FlexCol className='p-6 bg-primary2/90 rounded-lg gap-5'>
      <Typography className='text-card/60 text-xs'>DISBURSEMENT DESTINATION</Typography>
      <Flex className='gap-4'>
        <Flex className='p-2.5 rounded-lg justify-center bg-card/10'>
          <Landmark size={24} className='text-card'/>
        </Flex>
        <FlexCol>
          <Typography className='text-card text-lg leading-7 font-semibold'>Zenith Bank PLC</Typography>
          <ColItem 
            item1='Bakare Textile & Logistics Ltd.' 
            item2='1022 •••• 8901'
            className1='text-card/40 text-[12px]'
            className2='text-card/40 text-[12px] tracking-widest'
            />
        </FlexCol>
      </Flex>
      <hr className='bg-card/5 h-0.1'/>
      <ColItem item1='Disbursement Fee(1.2%)' item2='₦54,000.00' className='flex-row justify-between' className1='text-card/60' className2='text-card font-semibold text-[16px]'/>
      <ColItem item1='Disbursement Fee(1.2%)' item2='₦54,000.00' className='flex-row justify-between' className1='text-card/60' className2='text-card font-semibold text-[16px]'/>
      <hr className='bg-card/40 h-0.1'/>
      <ColItem item1='Net Disbursement' item2='₦4,433,500.00' className='flex-row justify-between' className1='text-card/60 font-semibold' className2='text-card font-semibold text-[16px]'/>
    </FlexCol>
  )
}

