import { ColItem, PageHeader } from '@/components/ui/PageHeader';
import { Flex, FlexCol, Grid } from '@/components/ui/ui-layout';
import Image from 'next/image';
import React from 'react';

import map from '@/assets/images/ter-map.png';
import Typography from '@/components/primitives/Typography';
import { ProgressBar } from '@/components/ui/ProgessBar';
import { Aperture, Briefcase } from 'lucide-react';

const AgentsTerritoryPage = () => {
  
  return (
    <Grid className='gap-5'>
      <PageHeader title='Territory Map'/>
      <Grid className='grid-cols-4 gap-4'>
        <Grid className='col-span-3'>
          <Image src={map} alt='' className='w-full h-full' loading='lazy' />
        </Grid>
        <Grid className='col-span-1 h-fit'>
          <Grid className='bg-[#DBEAFE] rounded-lg px-2.5 py-4 gap-2.5'>
            <Typography variant='p' weight='semibold'>Territory health</Typography>

            <FlexCol className='gap-1.5'>
              <Flex className='justify-between'>
                <Typography color='primary'>Coverage</Typography>
                <Typography color='primary'>65%</Typography>
              </Flex>
              <ProgressBar value={65} className='bg-primary' className2='bg-white' />
            </FlexCol>

            <FlexCol className='p-2 rounded-md bg-card'>
              <Typography variant='small' weight='bold' color='primary'>UNTAPPED ESTIMATE</Typography>
              <Typography variant='h4' color='active' weight='semibold'>₦4.2M</Typography>
              <Typography variant='small' className='text-[#16A34A]'>12% potential growth</Typography>
            </FlexCol>

            <Typography variant='p' weight='bold' className='text-center mt-2'>AI Prospect Suggestions</Typography>

            <Flex className='gap-1.5 rounded-md border-l-4 border-l-primary py-4 shadow-sm'>
              <Flex className='p-4 bg-[#DAE2FF] justify-center rounded-full '>
                <Aperture size={24} className='text-primary'/>
              </Flex>
              <ColItem item1='Ikorodu Market' item2='12 customers' className1='font-bold text-sm' className2='text-[#546474] text-sm'/>
            </Flex>
            <Flex className='gap-1.5 rounded-md border-l-4 border-l-primary py-4 shadow-sm'>
              <Flex className='p-4 bg-[#DAE2FF] justify-center rounded-full '>
                <Briefcase size={24} className='text-primary'/>
              </Flex>
              <ColItem item1='Ogun Industrial Hub' item2='High credit demand zone' className1='font-bold text-sm' className2='text-[#546474] text-sm'/>
            </Flex>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default AgentsTerritoryPage;
