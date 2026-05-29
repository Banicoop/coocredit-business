import { Flex, FlexCol, Grid, GridItem } from '@/components/ui/ui-layout';
import Image from 'next/image';
import { ColItem } from '@/components/ui/PageHeader';
import Typography from '@/components/primitives/Typography';
import TransactionHistory from '../_sections/TransactionHistory';
import React from 'react';

import user from '@/assets/images/user.png'
import { BioData, BankInfo, FieldAssets, FinCard } from '..';
import Link from 'next/link';

const CustomerProfile = () => {

  return (
    <FlexCol className='gap-4'>
      <Grid className='gap-5 md:grid-cols-3'>
        <GridItem className='md:col-span-2'>
          <FlexCol className='gap-2.5 px-4 py-3 w-full'>
            <Flex className='gap-x-1.5 justify-between'>
              <Flex>
                <Image src={user} alt='USER' className='h-30 w-30 rounded-md object-cover' loading='lazy' />
                <ColItem item1='Amara Okafor' 
                  item2='CU-8842-XN • Member since 2021' 
                  className1='text-[24px] text-[#0F1C2C] font-semibold' className2='text-[#546474]'/>
              </Flex>
              <Link href='/agents/customers/id/referrals' className='p-2 rounded-lg bg-primary text-card font-semibold shadow-sm'>Referrals</Link>
            </Flex>
              <Grid className='grid-cols-2 md:grid-cols-4 gap-x-2 w-full'>
                <ColItem item1='Address' item2='-' className1='text-ink' className2='text-[#0F1C2C] font-semibold text-[18px]'/>
                <ColItem item1='Location' item2='-' className1='text-ink' className2='text-[#0F1C2C] font-semibold  text-[18px]'/>
                <ColItem item1='Primary Product' item2='-' className1='text-ink' className2='text-[#0F1C2C] font-semibold  text-[18px]'/>
                <ColItem item1='Sector' item2='-' className1='text-ink' className2='text-[#0F1C2C] font-semibold text-[18px]'/>
              </Grid>
          </FlexCol>
        </GridItem>
        <GridItem className='gap-y-4'>
          <Typography color='primary' className='text-center'>CREDIT HEALTH SCORE</Typography>
          <FlexCol className='p-5 rounded-full border-4 border-primary w-fit mx-auto'>
            <Typography variant='h1'>810</Typography>
            <Typography color='active'>Excellent</Typography> 
          </FlexCol>
            <Typography color='active' className='text-center px-2 py-1 rounded-sm bg-[#0053CC1A]'>+12 pts from last month</Typography> 
        </GridItem>
      </Grid>

      <Grid className='gap-4 md:grid-cols-3'>
        <Grid className='gap-4'>
          <BioData/>
          <GridItem className='border-l-4 border-l-primary gap-2'>
            <Typography weight='semibold' variant='p'>Bank Information</Typography>
            <BankInfo/>
          </GridItem>
          <FieldAssets />
        </Grid>
        <div className="md:col-span-2 grid">
            <TransactionHistory/>
            <Grid className='grid-cols-2 gap-2.5 mt-5'>
              <FinCard label='TOTAL BORROWED' val='₦1,250,000'/>
              <FinCard label='OUTSTANDING BAL' val='₦205,000' className='text-primary'/>
              <FinCard label='NEXT PAYMENT' val='Nov 12, 2023'/>
            </Grid>
        </div>
      </Grid>
    </FlexCol>
  )
}

export default CustomerProfile;
