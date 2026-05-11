import Typography from '@/components/primitives/Typography'
import { ColItem } from '@/components/ui/PageHeader';
import { Flex, FlexCol, Grid } from '@/components/ui/ui-layout'
import { Activity, Award, ChartNoAxesColumn } from 'lucide-react';
import React from 'react';

const Pipe = ({className, num, numClassName, label}: {className: string, num: number, numClassName: string, label: string}) => {
  return(
  <FlexCol className='gap-2.5 justify-center'>
    <div className="flex items-center">
      <div className={`h-10 w-10 rounded-full text-center flex items-center justify-center ${className}`}>
        <Typography variant='h6' weight='bold' className={`text-center mb-1 ${numClassName}`}>{num}</Typography>
      </div>
      <hr className='h-0.4 w-25 bg-[#E5EFFF] mt-1'/>
    </div>
    <Typography color='primary' weight='bold'>{label}</Typography>
  </FlexCol>
)}

export const LoanPipeline = () => {
  return (
    <FlexCol className='p-4 border bg-white rounded-xl gap-4 hidden lg:flex'>
        <Typography className='' font='manrope' weight='bold'>Loan Application Pipeline</Typography>

        <Flex>
          <Pipe label='Submitted' className='bg-primary' numClassName='text-white' num={1}/>
          <Pipe label='Under Review' className='bg-primary' numClassName='text-white' num={2}/>
          <Pipe label='Approved' className='border-4 border-primary' numClassName='text-primary' num={3}/>
          <Pipe label='Disbursed' className='bg-[#E5EFFF]' numClassName='text-[#546474]' num={4}/>
        </Flex>
    </FlexCol>
  )
}


export const Buttons = ({icon, text}: {icon: React.ReactNode, text: string}) => {
  return (
    <FlexCol className='items-center justify-center p-4 bg-[#0053CC0D] rounded-xl gap-0.5'>
        <Flex className='h-12 w-12 items-center justify-center rounded-xl bg-white text-primary cursor-pointer'>
          {icon}
        </Flex>
        <Typography variant='small' weight='semibold'>{text}</Typography>
    </FlexCol>
  )
}


export const Commissions = () => {
  return (
    <Flex className='py-4 px-6 border bg-card rounded-xl items-center justify-between min-h-20'>
      <div className="flex flex-col gap-6 justify-between">
        <Typography font='manrope' weight='bold'>Commission Today</Typography>
        <div className="flex gap-4">
          <ColItem item1='EARNED' item2='₦4,500' className2='text-[24px] text-primary font-bold'/>
          <ColItem item1='PENDING' item2='₦12,000' className2='text-[24px] text-[#94A3B8] font-bold'/>
        </div>
      </div>

      <ChartNoAxesColumn size={40} className='text-primary'/>
    </Flex>
  )
}


export const Rank = () => {
  return(
    <FlexCol className='gap-4 w-full bg-primary text-white p-4 rounded-xl'>
      <div className="flex items-center justify-between">
        <Typography className='text-[#FFFFFFCC]'>Regional Leaderboard</Typography>
        <Award size={24} className='text-[#FFFFFFCC]'/>
      </div>
      <ColItem item1='My Rank' item2='#4 of 28 Agents' className1='text-[#FFFFFF99]' className2='text-[#FFFFFF99] text-[24px]'/>
    </FlexCol>
  )
}
