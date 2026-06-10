import Button from '@/components/primitives/buttons/Button';
import Typography from '@/components/primitives/Typography';
import { ColItem, PageHeader } from '@/components/ui/PageHeader';
import { Flex, Grid, GridItem } from '@/components/ui/ui-layout';
import { ChevronRight, DollarSign, PlusCircle, Wallet2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

const SuperAgentProfilePage = () => {
  return (
    <Grid className='gap-5'>
      <PageHeader 
        title='Personal Ledger Hub' 
        description='Manage your professional credentials and financial reach.'
        actions={[
          {
            label: 'Export Profile'
          },
          {
            label: 'Edit Credentials',
            variant: 'primary'

          },
        ]}
      />

      <Grid className='md:grid-cols-2 lg:grid-cols-3 gap-7'>
        {/* PERSONAL DETAILS */}
        <Grid className='col-span-2 gap-8 grid-cols-2'>
          <GridItem className='gap-5 grid-cols-2 p-8 col-span-2'>
            <Flex className='justify-between items-start col-span-2'>
              <ColItem 
                item1='Account Master File' 
                item2='VERIFIED PERSONAL DETAILS' 
                className1='text-primary2 font-semibold' 
                className2='text-ring font-semibold'/>
              <Typography weight='semibold' variant='small' color='active' className='py-1 px-2.5 rounded-md bg-accent'>Status: Active</Typography>
            </Flex>

              <ColItem 
                item1='FULL LEGAL NAME' 
                item2='Alex Sovereign Chukwu' 
                className1='text-ring font-semibold' 
                className2='text-ink font-semibold'/>
              <ColItem 
                item1='DIGITAL ADDRESS' 
                item2='a.sovereign@azure- meridian.com' 
                className1='text-ring font-semibold' 
                className2='text-ink font-semibold'/>
              <ColItem 
                item1='COMMUNICATION CHANNEL' 
                item2='+234 802 000 0000' 
                className1='text-ring font-semibold' 
                className2='text-ink font-semibold'/>
              <ColItem 
                item1='OPERATIONAL ZONE' 
                item2='Lagos Central' 
                className1='text-ring font-semibold' 
                className2='text-ink font-semibold'/>
          </GridItem>

          {/* CARD CONTAINER */}
          <Grid className='p-6 bg-tertiary border rounded-lg gap-4'>
            <ColItem item1='Card Vault' item2='Manage connected payment instruments.' className1='text-[20px] text-primary2' className2='text-ring'/>
            <Image src='/icons/debit-card.svg' alt='DEBIT CARD' width={280} height={100} className='w-full h-auto' />
            <Typography className='justify-center cursor-pointer' color='active' weight='semibold' startIcon={<PlusCircle size={18}/>}>Provision New Card</Typography>
          </Grid>

          <GridItem className='gap-6 p-6'>
            <ColItem item1='Floating Liquidity' item2='Real-time balance across ledgers.' className1='text-[20px] text-primary2' className2='text-ring'/>
            <Flex className='gap-4 p-4 bg-accent rounded-lg'>
              <div className="p-2.5 bg-card rounded-full">
                <Wallet2 size={20} className='text-primary'/>
              </div>
              <ColItem item1='Naira Vault' item2='₦2,450,000.00' className1='text-ring' className2='text-primary2 font-bold text-[20px]'/>
            </Flex>
            <Flex className='gap-4 p-4 bg-accent rounded-lg'>
              <div className="p-2.5 bg-card rounded-full">
                <DollarSign size={20} className='text-primary'/>
              </div>
              <ColItem item1='Naira Vault' item2='₦2,450,000.00' className1='text-ring' className2='text-primary2 font-bold text-[20px]'/>
            </Flex>

            <Button className='bg-primary2 font-semibold'>Withdraw Liquidity</Button>
          </GridItem>
        </Grid>

        {/* SECURITY */}
        <Grid className='gap-8 h-fit'>
          <Grid className='gap-4 p-4 bg-tertiary border rounded-lg'>
            <ColItem item1='Fortification' item2='Biometric and credential security.' className2='text-ring' className1='text-primary2 text-[20px]'/>

            <Button size='lg' variant='light' startIcon={''} endIcon={<ChevronRight size={20}/>} className='font-bold text-primary2'>Transaction PIN</Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default SuperAgentProfilePage;
