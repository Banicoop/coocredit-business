import Typography from '@/components/primitives/Typography';
import { PageHeader } from '@/components/ui/PageHeader';
import { Flex, FlexBox, Grid } from '@/components/ui/ui-layout';
import { PlusSquareIcon, TableConfig } from 'lucide-react';
import React from 'react';


const Card = ({icon, label, info, num}: {icon: React.ReactNode, label: string, info: React.ReactNode, num: string}) => (
  <FlexBox className='flex-col h-32'>
    <Flex className='justify-between mb-1.5'>
      <Flex className='p-2 rounded-full bg-accent'>
        {icon}
      </Flex>
      {info}
    </Flex>
    <Typography color='primary' weight='medium'>{label}</Typography>
    <Typography variant='h3' color='primary2'>{num}</Typography>
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
          icon={<TableConfig size={20}/>} 
          info={<Typography color='success' className='py-1 px-2.5 rounded-md bg-accent font-semibold'>+12%</Typography>}/>
        <Card label='Corporate Clients' num='324' 
          icon={<TableConfig size={20}/>} 
          info={<Typography color='success' className='py-1 px-2.5 rounded-md bg-accent font-semibold'>+5%</Typography>}/>
        <Card label='High-Value Pipeline' num='₦ 42.8M' 
          icon={<TableConfig size={20}/>} 
          info={<Typography className='py-1 px-2.5 rounded-md bg-accent font-semibold text-primary'>Target 85%</Typography>}/>
        <Card label='Avg. Loan Size' num='₦ 1.5M' 
          icon={<TableConfig size={20}/>} 
          info={<Typography className='py-1 px-2.5 rounded-md bg-accent font-semibold'>Weekly Avg.</Typography>}/>
      </Grid>
    </Grid>
  )
}

export default CustomersPage;
