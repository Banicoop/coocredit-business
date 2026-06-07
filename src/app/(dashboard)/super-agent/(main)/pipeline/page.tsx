import Typography from '@/components/primitives/Typography';
import { ColItem, PageHeader } from '@/components/ui/PageHeader';
import { Tabs } from '@/components/ui/Tabs';
import { Flex, FlexCol, Grid } from '@/components/ui/ui-layout';
import { FlipVertical2, ShieldCheck, TrendingUp } from 'lucide-react';
import React from 'react';
import ActiveCreditList from './ActiveCreditList';


interface CardProps {
  className?: string;
  icon: React.ReactNode;
  label: string;
  val: string;
  desc: React.ReactNode
}

const Card = ({icon, label, val, desc, className}: CardProps) => (
  <FlexCol className={`p-4 rounded-lg bg-card border border-secondary h-40 ${className}`}>
    <div>{icon}</div>
    <ColItem 
      item1={label} 
      item2={val}
      className1='text-ring'
      className2='text-ink text-[24px] font-semibold'
      />
    <div>{desc}</div>
  </FlexCol>
)

const tabs = [
  {
    label: 'All Applications',
    value: 'all'
  },
  {
    label: 'Pending',
    value: 'pending'
  },
  {
    label: 'Approved',
    value: 'approved'
  },
  {
    label: 'Disbursed',
    value: 'disbursed'
  },
  {
    label: 'Rejected',
    value: 'rejected'
  },
]


const PipelinePage = () => {
  return (
    <FlexCol className='gap-7'>
      <FlexCol className='gap-5 lg:flex-row lg:items-center justify-between'>
        <PageHeader 
          title='Loan Pipeline' 
          description='Manage and track active credit applications across all stages.' />
        <Tabs items={tabs} defaultValue='all' className='hidden md:flex'/>
      </FlexCol>
      <Grid className='grid-cols-2 lg:grid-cols-4 gap-6'>
        <FlexCol className='col-span-2 p-4 rounded-lg bg-primary gap-2'>
          <Typography className='text-card/60'>Total Pipeline Value</Typography>
          <Typography variant='h1' color='light'>₦ 248,500,000</Typography>
          <Flex className='gap-4'>
            <ColItem
              item1='ACTIVE LOANS'
              item2='142'
              className='bg-[#FFFFFF1A] rounded-lg border border-[#FFFFFF1A] py-2 px-3' 
              className1='text-[12px] text-card' className2='font-bold text-card text-[20px]'/>
            <ColItem 
              item1='AVG. TICKET' 
              item2='₦1.75M'
              className='bg-[#FFFFFF1A] rounded-lg border border-[#FFFFFF1A] py-2 px-3'
              className1='text-[12px] text-card' className2='font-bold text-card text-[20px]'/>
          </Flex>
        </FlexCol>
        <Card 
          label='Pending Approval'
          val='₦42.8M'
          desc={<Typography variant='small' className='text-chart-5' startIcon={<TrendingUp size={16}/>}>+12% from last week</Typography>}
          icon={<Flex className='p-2.5 rounded-full bg-accent w-fit'>
            <FlipVertical2 size={20} className='text-primary'/>
          </Flex>}/>
        <Card 
          label='Disbursement'
          val='₦18.2M'
          desc={<Typography color='active' variant='small'>8 priority files</Typography>}
          icon={<Flex className='p-2.5 rounded-full bg-accent w-fit'>
            <ShieldCheck size={20} className='text-primary'/>
          </Flex>}/>
      </Grid>

      <ActiveCreditList/>
    </FlexCol>
  )
}

export default PipelinePage;
