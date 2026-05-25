import { TitleText } from '@/components/primitives/buttons/BackButton';
import Typography from '@/components/primitives/Typography';
import { ProgressBar } from '@/components/ui/ProgessBar';
import { Flex, Grid, GridItem } from '@/components/ui/ui-layout';
import { BookOpenText, FileText, UserRoundSearch } from 'lucide-react';
import React from 'react';

type Props = {
  icon: React.ReactNode;
  desc: string;
  title: string;
  score: string;
  total: string; 
  className: string
}

const Widget = ({icon, desc, title, score, total, className}: Props) => (
  <GridItem className='gap-2.5'>
    <Flex className='justify-between'>
      <Flex className='p-2 rounded-full bg-[#EFF6FF]'>
        {icon}
      </Flex>
      <Typography variant='small' className='text-chart-5'>{desc}</Typography>
    </Flex>
    <Typography weight='semibold' variant='small' color='primary'>{title}</Typography>
    <Typography variant='h2' className='gap-x-0.5'>{score}<span className='text-xs text-[#546474]'>  {total}</span></Typography>
    <ProgressBar value={70} className={className} className2='bg-[#EEF4FF]'/>
  </GridItem>
)

const TargetBreakdown = () => {

  return (
    <Grid className='gap-5'>
      <TitleText label='Quarterly Target Breakdown'/>

      <Grid className='grid-cols-2 lg:grid-cols-4 gap-5'>
        <Widget title='Customer Onboarding' desc='+4%' icon={<UserRoundSearch size={20} className='text-primary'/>} score='142' total='/ 180' className='bg-primary'/>
        <Widget title='Loan Applications' desc='+2%' icon={<FileText size={20} className='text-[#A855F7]'/>} score='56' total='/ 60' className='bg-[#A855F7]'/>
        <Widget title='Total Disbursement' desc='+2%' icon={<FileText size={20} className='text-[#10B981]'/>} score='₦1.3m' total='/ 2m' className='bg-[#10B981]'/>
        <Widget title='KYC Completion' desc='+2%' icon={<FileText size={20} className='text-chart-5'/>} score='100%' total='Target' className='bg-chart-5'/>
      </Grid>
    </Grid>
  )
}

export default TargetBreakdown;
