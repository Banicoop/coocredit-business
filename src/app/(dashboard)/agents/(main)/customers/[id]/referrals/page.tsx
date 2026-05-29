import { Flex, FlexCol, Grid, GridItem } from '@/components/ui/ui-layout';
import Image from 'next/image';
import React from 'react';

import user from '@/assets/images/user.png'
import Typography from '@/components/primitives/Typography';
import DetailedSlip from '@/components/ui/DetailSlip';
// import { PageHeader } from '@/components/ui/PageHeader';
import ReferralList from './_sections/ReferralList';
import { Bomb, Copy, MapPinCheck, Megaphone, Timer, TrendingUp, UserCircle, UserRoundKey } from 'lucide-react';
import network from '@/assets/images/shop-location.png'
import { ColItem } from '@/components/ui/PageHeader';

const details = [
    {title: 'Email', val: 'eben@gmail.com'},
    {title: 'Phone', val: '+234 812 345 6789'},
    {title: 'Location', val: 'Victoria Island'},
]
const details2 = [
    {title: 'Joined', val: 'Mar 12, 2023'},
    {title: 'Portfolio Quality', val: '94%'},
]

const Referrals = () => {
  return (
    <Grid className='lg:grid-cols-3 gap-4'>
        {/* <PageHeader title='My Referrals' /> */}
        <Grid className='gap-4'>
            <GridItem className='h-fit'>
                <FlexCol className='items-center justify-center gap-1.5 '>
                    <Image src={user} alt='' width={70} height={90} className='rounded-lg object-cover' />
                    <Typography weight='semibold'>Sarah Chen</Typography>
                    <Typography color='primary'>Senior Co-Agent • Lagos Metro</Typography>
                    <DetailedSlip title='AGENT BIO-DATA' className='bg-accent p-3.5 rounded-lg w-full' items={details}/>
                    <DetailedSlip title='PROFESSIONAL INFO' className='bg-accent p-3.5 rounded-lg w-full' items={details2}/>
                </FlexCol>
            </GridItem>
            <GridItem className='gap-2'>
                <Flex className='gap-1.5'>
                    <Flex className='bg-[#D6E4F9] p-2 rounded-lg'>
                        <Megaphone size={20} className='text-primary' />
                    </Flex>
                    <ColItem item1='Referral bonus' item2='₦2,500' className1='' className2='text-primary text-[10px] bg-[#D6E4F9] rounded-sm w-fit py-0.5 px-2 font-bold'/>
                </Flex>
                <Typography color='primary'>Earn rewards for every successful onboarding through your network.</Typography>
                <Typography variant='small' color='primary'>YOUR REFERRAL LINK</Typography>
                <Flex className='justify-between gap-2.5'>
                    <Typography variant='small' color='primary' weight='bold' className='p-2 rounded-md bg-[#EEF4FF] w-full'>coocredit.ag/sarah-chen-882</Typography>
                    <Flex className='p-2 rounded-md bg-primary'>
                        <Copy size={16} className='text-card cursor-pointer' />
                    </Flex>
                </Flex>
                 <Typography variant='small' color='primary'>Quick share</Typography>
            </GridItem>
            <GridItem>
                <Typography weight='semibold' className='text-[18px]'>Referral Bonus</Typography>
                <ColItem item1='Total Earned' item2='₦248,500' className1='text-[#546474] text-sm' className2='text-[24px] font-bold text-primary'/>
                <hr className='my-2 h-0.5 bg-[#F1F5F9]'/>
                <Flex className='justify-between'>
                    <ColItem item1='This Month' item2='+₦48,500' className1='text-[#546474] text-sm' className2='text-[26px] font-bold text-green-500'/>
                    <Typography startIcon={<Timer size={14} className='font-bold'/>} className='capitalize text-xs text-[#A43700] bg-[#A437001A] px-2.5 py-1 rounded-md font-bold'>3 pending</Typography>
                </Flex>
            </GridItem>
        </Grid>
        <Grid className='col-span-2 gap-4'>
            <Flex className='gap-2'>
                <Typography variant='small' className='bg-[#DBEAFE] p-2.5 py-1 rounded-md text-primary' startIcon={<TrendingUp size={16}/>}>+14% Growth this month</Typography>
                <Typography weight='semibold' variant='small' className='bg-[#D6E4F9] p-2.5 py-1 rounded-md' startIcon={<UserRoundKey size={16}/>}>42 Active Referrals</Typography>
            </Flex>
            <ReferralList/>
            <Grid className='gap-4 grid-cols-2'>
                <GridItem className='gap-4 h-fit'>
                    <Typography weight='semibold' startIcon={<MapPinCheck size={18} className='text-primary'/>}>Network Reach</Typography>

                    <Image src={network} alt='' className='rounded-lg object-cover w-full h-25' />
                </GridItem>
                <GridItem className='gap-4 h-fit p-4'>
                    <Typography weight='semibold' startIcon={<TrendingUp size={18} className='text-primary'/>}>Conversion Rate</Typography>

                    <FlexCol className='h-25 w-25 rounded-full mx-auto border-4 border-primary items-center justify-center'>
                        <Typography weight='bold' variant='h3'>75%</Typography>
                        <Typography variant='small' color='primary'>Target 80%</Typography>
                    </FlexCol>
                </GridItem>
            </Grid>
        </Grid>
    </Grid>
  )
}

export default Referrals;
