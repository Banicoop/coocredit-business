import { BackButton } from '@/components/primitives/buttons/BackButton';
import Typography from '@/components/primitives/Typography';
import { ColItem } from '@/components/ui/PageHeader';
import { Flex, Grid, GridItem } from '@/components/ui/ui-layout';
import { cn } from '@/lib/utils';
import { ShieldCheck } from 'lucide-react';
import { GrowthCard, OnboardingCard } from './cards';
import Button from '@/components/primitives/buttons/Button';
import { OnbaordingInputs, SecurityProtocol } from './InputFields';
import Image from 'next/image';

import Meridan from '@/assets/svgs/hub.svg'


const AddNewAgent = () => {
  return (
    <Grid className='gap-5'>
        <BackButton label='Back to Agent'/>
        <ColItem item1='Network Expansion' 
            item2='Onboard a new sovereign agent into the Meridian network. High-authority verification and regional compliance checks are mandatory.'
            className1='text-[30px]'
            className2='text-[18px] md:w-2/3'
        />

        <Grid className='gap-7 grid-cols-3'>
          {/* MAIN */}
          <Grid className='col-span-2 gap-6'>
            <OnbaordingInputs/>

            <GridItem className={cn('p-6 gap-4')}>
              <Typography color='primary2' weight='semibold' startIcon={<ShieldCheck size={16}/>}>Security & Compliance</Typography>

              <OnboardingCard label='BVN Verification' val='Automated Bank Verification Number background check for fiscal security.'/>
              <OnboardingCard label='Biometric Enrollment Required' val='Enforce physical fingerprinting at a regional Meridian hub before activation.'/>
              <OnboardingCard label='Tier 3 Settlement Rights' val='Grant full permission for high-value transactional processing within the assigned region.'/>

              <Flex className='gap-6 items-end justify-end'>
                <Button variant='ghost' className='border'>Cancel Onbaording</Button>
                <Button>Initiate Agent</Button>
              </Flex>
            </GridItem>
          </Grid>


          {/* OTHERS */}
          <Grid className='gap-6 h-fit'>
            <Grid className='py-6 px-8 rounded-lg bg-primary2 gap-2.5 shadow-sm'>
              <Typography color='light' variant='h5'>Network Growth Stats</Typography>
              <GrowthCard label='ACTIVE AGENTS' val={1284} desc='+12%'/>
              <GrowthCard label='PENDING APPROVAL' val={42} desc='Priority'/>
            </Grid>

            <Grid className='rounded-2xl bg-black shadow-lg'>
              <Image src={Meridan} alt='HUB' className='w-full h-40 rounded-t-2xl'/>
              <Grid className='p-5 bg-tertiary'>
                <Typography color='active' className='text-[16px]'>Regional Standard</Typography>
                <Typography variant='p' color='primary'>Agents are the cornerstone of the Sovereign Ledger. Ensure all documentation matches the physical address provided in Section 1.</Typography>
              </Grid>
            </Grid>
            <SecurityProtocol/>
          </Grid>
        </Grid>
    </Grid>
  )
}

export default AddNewAgent;
