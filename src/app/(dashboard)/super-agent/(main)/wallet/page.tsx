import Button from '@/components/primitives/buttons/Button';
import { ColItem } from '@/components/ui/PageHeader';
import { Flex, FlexCol, Grid } from '@/components/ui/ui-layout';
import { ArrowDownToLine, LockKeyhole, Plus, ShieldCheck, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import Transactions from './_sections/Transactions';
import { Card2 } from './_sections/cards';
import Typography from '@/components/primitives/Typography';
import { ProgressBar } from '@/components/ui/ProgessBar';


const WalletPage = () => {
  return (
    <Grid className='gap-5 lg:grid-cols-3'>

      {/* CREDIT CARD SECTION */}
      <Grid className='col-span-2 gap-4'>
        <FlexCol className='bg-[#1D3989] p-4 md:p-8 rounded-xl'>
          <Flex className='justify-between'>
            <ColItem 
              item1='TOTAL SOVEREIGN BALANCE' 
              item2='₦14,850,200.00' 
              className1='text-card/50 text-xs tracking-widest' 
              className2='text-[45px] text-card font-bold'/>
              <div className="relative flex items-center justify-center w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-sm">
                {/* Back wallet layer */}
                <div className="absolute w-12 h-12 rounded-lg bg-[#17327A] opacity-70 -translate-y-1 translate-x-1" />

                {/* Front wallet layer */}
                <div className="absolute w-12 h-12 rounded-lg bg-[#274CA8]" />

                {/* Wallet icon */}
                <Image
                  src="/icons/wallet.svg"
                  alt="WALLET"
                  width={34}
                  height={34}
                  className="relative z-10 opacity-70"
                />
            </div>
          </Flex>
          <Flex className='justify-between mt-6'>
            <Flex className='gap-4'>
              <Button startIcon={<Plus size={18}/>} variant='light' className='font-semibold'>Add Money</Button>
              <Button startIcon={<ArrowDownToLine size={18}/>} className='bg-card/10'>Withdraw</Button>
            </Flex>
            <ColItem 
              item1='Escrow Secured' 
              item2='••••  ••••  ••••  8821'
              className1='text-card/60 tracking-widest'
              className2='text-card tracking-widest'
              />
          </Flex>
        </FlexCol>

        {/* TRANSACTIONS HISTORY*/}
        <Transactions/>
      </Grid>

      {/* LEFT */}
      <Grid className='gap-4 h-fit'>
        <Card2 
          label='WEEKLY INFLOW' 
          amt={(4200000).toLocaleString()} 
          other={<Typography weight='semibold' color='active' startIcon={<TrendingUp size={16}/>} className='text-[10px] p-2 rounded-sm bg-accent'>+12%</Typography>}
          extra={<ProgressBar value={70} className='bg-primary'/>}
        />
        <Card2 
          label='LOCKED FUNDS' 
          amt={(1150000).toLocaleString()} 
          other={<LockKeyhole className='text-ring' size={20}/>}
          extra={<span className="text-xs text-ring">Pending confirmation for 3 transactions</span>}
        />

        <Grid className='gap-2 bg-primary2 p-5 rounded-lg'>
          <Typography variant='h5' startIcon={<ShieldCheck size={18}/>} color='light'>Security Center</Typography>
          <Flex className='justify-between'>
            <Typography className='text-card/70'>2-Factor Authentication</Typography>
          </Flex>
          <Flex className='justify-between'>
            <Typography className='text-card/70'>Transaction Limits</Typography>
            <Typography variant='small' weight='semibold' className='p-1.5 text-card bg-card/10'>₦5M / DAY</Typography>
          </Flex>

          <Button size='lg' className='bg-card/10 font-semibold text-card'>Upgrade Tier Status</Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default WalletPage;
