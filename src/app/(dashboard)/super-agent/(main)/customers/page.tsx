import Typography from '@/components/primitives/Typography';
import { PageHeader } from '@/components/ui/PageHeader';
import { Flex, FlexBox, FlexCol, Grid } from '@/components/ui/ui-layout';
import { BookOpenCheck, Landmark, PipetteIcon, PlusSquareIcon, ShieldCheck, TableConfig, Pyramid } from 'lucide-react';
import React, { ReactNode } from 'react';
import BusinessCustTable from './_section/BusinessCustTable';


export const Card = ({icon, label, info, num}: {icon: React.ReactNode, label: string, info: React.ReactNode, num: string}) => (
  <FlexBox className='flex-col h-32'>
    <Flex className='justify-between mb-1.5'>
      <Flex className='p-2 rounded-full bg-accent h-fit'>
        {icon}
      </Flex>
      {info}
    </Flex>
    <Typography color='primary' weight='medium'>{label}</Typography>
    <Typography variant='h3' color='primary2'>{num}</Typography>
  </FlexBox>
)


const Card2 = ({icon, label, desc}: {icon: ReactNode, label: string, desc: string}) => (
  <FlexBox className='gap-4 flex-col md:flex-row items-start'>
    <Flex className='bg-accent rounded-full justify-center p-2.5'>
      {icon}
    </Flex>
    <FlexCol>
      <Typography color='primary2' weight='semibold'>{label}</Typography>
      <Typography color='primary'>{desc}</Typography>
    </FlexCol>
  </FlexBox>
)


const CustomersPage = () => {
  return (
    <Grid className='gap-5'>
      <PageHeader 
        title='Business customers'
        description='Manage and monitor high-volume business accounts across Nigeria.'
        actions={[
          {
            label: 'Add Business Customer',
            variant: 'primary',
            href: '',
            icon: <PlusSquareIcon size={18}/>
          }
        ]}
        />
      <Grid className='grid-cols-2 md:grid-cols-4 gap-4'>
        <Card label='SME Accounts' num='1,284' 
          icon={<TableConfig size={20} className='text-primary'/>} 
          info={<Typography color='success' className='py-1 px-2.5 rounded-md bg-accent font-semibold'>+12%</Typography>}/>
        <Card label='Corporate Clients' num='324' 
          icon={<BookOpenCheck size={20} className='text-indigo-800'/>} 
          info={<Typography color='success' className='py-1 px-2.5 rounded-md bg-accent font-semibold'>+5%</Typography>}/>
        <Card label='High-Value Pipeline' num='₦ 42.8M' 
          icon={<PipetteIcon size={20} className='text-ink'/>} 
          info={<Typography className='py-1 px-2.5 rounded-md bg-accent font-semibold text-primary'>Target 85%</Typography>}/>
        <Card label='Avg. Loan Size' num='₦ 1.5M' 
          icon={<Landmark size={20} className='text-destructive'/>} 
          info={<Typography className='py-1 px-2.5 rounded-md bg-accent font-semibold'>Weekly Avg.</Typography>}/>
      </Grid>

      <BusinessCustTable/>

      <Grid className='gap-4 grid-cols-2'>
        <Card2 label='Risk Allocation Strategy' 
          desc='94% of your business customers in Lagos showpositive growth trends. Consider increasing SME premium limits.' 
          icon={<Pyramid size={24} className='text-primary' />}/>
        <Card2 label='Agent Performance Sync' 
          desc='Assigned agents have resolved 98% of business compliance tickets this week. System efficiency is optimal.' 
          icon={<ShieldCheck size={24} className='text-ink' />}/>
      </Grid>
    </Grid>
  )
}

export default CustomersPage;
