import Typography from '@/components/primitives/Typography';
import { PageHeader } from '@/components/ui/PageHeader';
import { Flex, FlexBox, FlexCol } from '@/components/ui/ui-layout';
import { CheckCircle, HistoryIcon, Shield, ShieldAlert, UserPlus } from 'lucide-react';
import React from 'react'
import AgentsList from './_sections/Agents';


const Card1 = ({label, val, endIcon}: {label: string, val: number, endIcon?:React.ReactNode}) => (
    <FlexCol className='px-2.5 py-3 rounded-lg bg-[#FFFFFF1A] border border-[#FFFFFF0D]'>
      <Typography variant='small' className='text-card/60'>{label}</Typography>
      <Typography color='light' weight='semibold' variant='p' endIcon={endIcon}>{val}% </Typography>
    </FlexCol>
)

const Card = ({className, icon, label, value, other}: {className?: string, icon?: React.ReactNode, label: string, value: number, other?: React.ReactNode}) => (
  <FlexBox className={`min-w-40 flex-1 flex-col gap-1 border-b-4 ${className}`}>
      <Flex className='justify-between w-full'>
        <Flex className='px-2.5 py-1 rounded-full bg-[#F0FDF4]'>
          {icon}
        </Flex>
        <div>{other}</div>
      </Flex>
      <Typography color='primary' variant='small' weight='semibold' className='capitalize'>{label}</Typography>
      <Typography color='primary2' variant='h2'>{value}</Typography>
  </FlexBox>
)

const TeamsPage = () => {
  return (
    <FlexCol className='gap-5'>
      <PageHeader 
        title='Team Management'
        description='Monitor and manage your agent network performance.' 
        actions={[{
          label: 'Add New Agent',
          variant: 'primary',
          icon: <UserPlus size={18}/>
        }]} />
      
      <FlexCol className='md:flex-row gap-6'>
        <FlexCol className='flex-1 bg-[#00164E] p-5 rounded-lg gap-2.5'>
          <Typography variant='small' className='text-card/60'>TOTAL TEAM VOLUME</Typography>
          <Typography variant='h1' color='light'>₦24,840,000.00</Typography>
          <Flex className='gap-4'>
            <Card1 label="TODAY'S GOAL" val={88} endIcon={<span className='text-chart-2 text-[10px]'>+12%</span>}/>
            <Card1 label='AVG. SUCCESS' val={95.5} />
          </Flex>
        </FlexCol>
        <Flex className='flex-1 items-start gap-4 flex-wrap lg:flex-2'>
          <Card 
            label='Active Agents' 
            value={142} 
            other={<Typography color='success' className='px-2 py-1 rounded-lg bg-[#F0FDF4]'>+ 4 new</Typography>}
            className='border-b-chart-2'
            icon={<CheckCircle size={20} className='text-chart-2'/>}/>
          <Card 
            label='Total Agents' 
            className='border-b-chart-5'
            value={200} 
            icon={<HistoryIcon size={20} className='text-chart-5'/>}/>
          <Card 
            label='KYC Pending' 
            className='border-b-primary'
            other={<Typography className='px-2 py-1 rounded-lg bg-accent text-primary'>Priority</Typography>}
            value={120} 
            icon={<ShieldAlert size={20} className='text-primary'/>}/>
        </Flex>
      </FlexCol>

      <AgentsList/>
    </FlexCol>
  )
}

export default TeamsPage;
