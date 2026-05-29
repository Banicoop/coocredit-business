import { Flex, FlexCol, Grid, GridItem } from '@/components/ui/ui-layout';
import Image from 'next/image';
import React from 'react';

import user from '@/assets/images/user.png'
import Typography from '@/components/primitives/Typography';
import DetailedSlip from '@/components/ui/DetailSlip';
// import { PageHeader } from '@/components/ui/PageHeader';
import ReferralList from './_sections/ReferralList';
import { UserCircle } from 'lucide-react';

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
        <Grid className='gap-2.5'>
            <GridItem>
                <FlexCol className='items-center justify-center gap-1.5'>
                    <Image src={user} alt='' width={70} height={90} className='rounded-lg object-cover' />
                    <Typography weight='semibold'>Sarah Chen</Typography>
                    <Typography color='primary'>Senior Co-Agent • Lagos Metro</Typography>
                    <DetailedSlip title='AGENT BIO-DATA' className='bg-accent p-3.5 rounded-lg w-full' items={details}/>
                    <DetailedSlip title='PROFESSIONAL INFO' className='bg-accent p-3.5 rounded-lg w-full' items={details2}/>
                </FlexCol>
            </GridItem>
        </Grid>
        <Grid className='col-span-2 gap-4'>
            <Flex className='gap-2'>
                <Typography variant='small' className='bg-[#EFF6FF] p-2 rounded-md text-primary'>+14% Growth this month</Typography>
                <Typography weight='semibold' variant='small' className='bg-[#D6E4F9] p-2.5 py-1 rounded-md' startIcon={<UserCircle size={16}/>}>42 Active Referrals</Typography>
            </Flex>
            <ReferralList/>
        </Grid>
    </Grid>
  )
}

export default Referrals;
