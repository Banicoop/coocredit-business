import Typography from '@/components/primitives/Typography';
import { Flex, FlexBox, FlexCol } from '@/components/ui/ui-layout';
import { MapMinus, MapPinCheck } from 'lucide-react';
import React, { ReactNode } from 'react';

type ScoreCardProps = {
    label: string;
    val: string;
    color: string;
    border: string;
    icon?: ReactNode;
}

const ScoreCard = ({label, val, color, icon, border}: ScoreCardProps) => (
    <FlexBox className={`flex-col shadow-sm border-l-4 h-20 px-4 w-36.25 ${border}`}>
        <Typography variant='small' color='primary'>{label}</Typography>
        <Typography variant='h4' startIcon={icon} className={`${color}`}>{val}</Typography>
    </FlexBox>
)

const LeadReviewPage = () => {
  return (
    <FlexCol className='gap-5'>
        <Flex className='bg-[#DBEAFE] rounded-lg py-4 px-6 w-full justify-between'>
            <FlexCol className='gap-2.5'>
                <Flex className='gap-2.5'>
                    <Typography variant='small' color='active' className='bg-[#016AFF1A] px-1 py-0.5' weight='semibold'>KYC VERIFIED</Typography>
                    <Typography variant='small' weight='semibold' className='bg-[#A437001A] text-[#A43700] px-1 py-0.5'>PRIORITY REVIEW</Typography>
                </Flex>
                <Typography variant='h3'>Adeola Olatunji</Typography>
                <Typography variant='p' color='primary' startIcon={<MapPinCheck size={16}/>}>Lagos Mainland, Yaba District</Typography>
            </FlexCol>

            <Flex className='gap-4'>
                <ScoreCard label='LEAD SCORE' val='30 / 820' color='text-primary' border='border-l-primary' />
                <ScoreCard label='EST. CREDIT CAP' val={`₦300,000`} color='text-[#A43700]' border='border-l-[#A43700]' icon/>
            </Flex>
        </Flex>
    </FlexCol>
  )
}

export default LeadReviewPage;
