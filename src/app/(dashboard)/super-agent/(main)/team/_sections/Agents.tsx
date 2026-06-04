import { Flex, FlexBox, FlexCol } from '@/components/ui/ui-layout';
import Image from 'next/image';
import React from 'react';

import user from '@/assets/images/user.png';
import Typography from '@/components/primitives/Typography';
import { ArrowRight, ArrowRightIcon, EllipsisVertical } from 'lucide-react';
import { ColItem } from '@/components/ui/PageHeader';

const AgentsList = () => {
  return (
    <FlexCol className='gap-4'>
        {/* <Flex>A</Flex> */}
        <FlexBox className='flex-col gap-1'>
            <Flex className='justify-between'>
                <Flex className='gap-2'>
                    <Image src={user} alt='Agent' width={70} height={70} className='rounded-full'/>
                    <FlexCol className='gap-1'>
                        <Typography variant='p' weight='semibold'>Ademola Adebayo</Typography>
                        <Typography variant='small' color='primary'>Agent ID: AGT-992384</Typography>
                        <Typography color='success' weight='semibold' startIcon={<div className='w-2 h-2 rounded-full bg-chart-2 mt-1'/>} className='bg-muted p-1 px-4 rounded-md w-fit'>Active</Typography>
                    </FlexCol>
                </Flex>
                <EllipsisVertical size={24} className='text-primary cursor-pointer'/>
            </Flex>

            <hr className='h-0.5 mt-8'/>

            <Flex className='justify-between border-b p-4'>
                <ColItem item1='VOLUME (MTD)' item2='₦2,450,000' className1='' className2=''/>
                <ColItem item1='COMM. EARNED' item2='₦245,000' className1='' className2=''/>
            </Flex>

            <Flex className='justify-between border-b p-4'>
                <Typography color='active' variant='p' weight='semibold' endIcon={<ArrowRightIcon size={18} className='mt-1'/>}>View Performance</Typography>
            </Flex>
        </FlexBox>
    </FlexCol>
  )
}
    
export default AgentsList;
