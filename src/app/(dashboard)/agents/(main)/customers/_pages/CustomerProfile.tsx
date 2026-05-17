import { Flex, FlexBox, FlexCol } from '@/components/ui/ui-layout';
import Image from 'next/image';
import React from 'react';

import user from '@/assets/images/user.png'
import { ColItem } from '@/components/ui/PageHeader';
import Typography from '@/components/primitives/Typography';

const CustomerProfile = () => {
  return (
    <FlexCol className='gap-4'>
      <Flex className='gap-5'>
        <FlexBox className='flex-2'>
          <FlexCol className='gap-2.5 px-4 py-3 w-full'>
            <Flex className='gap-x-1.5'>
              <Image src={user} alt='USER' className='h-30 w-30 rounded-md object-cover' loading='lazy' />
              <ColItem item1='Amara Okafor' 
                item2='CU-8842-XN • Member since 2021' 
                className1='text-[24px] text-[#0F1C2C] font-semibold' className2='text-[#546474]'/>
            </Flex>
              <Flex className='justify-between gap-x-2 w-full'>
                <ColItem item1='Address' item2='-' className1='text-ink' className2='text-[#0F1C2C] font-semibold text-[18px]'/>
                <ColItem item1='Location' item2='-' className1='text-ink' className2='text-[#0F1C2C] font-semibold  text-[18px]'/>
                <ColItem item1='Primary Product' item2='-' className1='text-ink' className2='text-[#0F1C2C] font-semibold  text-[18px]'/>
                <ColItem item1='Sector' item2='-' className1='text-ink' className2='text-[#0F1C2C] font-semibold text-[18px]'/>
              </Flex>
          </FlexCol>
        </FlexBox>
        <FlexBox className='flex-1 flex-col justify-center items-center gap-y-4 p-4 h-full'>
          <Typography color='primary'>CREDIT HEALTH SCORE</Typography>
          <FlexCol className='p-5 rounded-full border-4 border-primary w-fit'>
            <Typography variant='h1'>810</Typography>
            <Typography color='active'>Excellent</Typography> 
          </FlexCol>
            <Typography color='active' className='px-2 py-1 rounded-sm bg-[#0053CC1A]'>+12 pts from last month</Typography> 
        </FlexBox>
      </Flex>

      <Flex className='gap-4'>
        <FlexCol className='flex-1 gap-2.5'>
          L
        </FlexCol>
        <FlexCol className='flex-2'>
          R
        </FlexCol>
      </Flex>
    </FlexCol>
  )
}

export default CustomerProfile;
