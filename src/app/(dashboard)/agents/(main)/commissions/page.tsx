import Typography from '@/components/primitives/Typography';
import { PageHeader } from '@/components/ui/PageHeader';
import { FlexCol, Grid, GridItem } from '@/components/ui/ui-layout';
import React from 'react';
import CommissionHistory from './_features/CommissionHistory';

interface CardItemProps {
  textColor?: string;
  className: string
  title: string;
  val: string
}

const CardItem = ({ className, title, val, textColor}: CardItemProps) => (
  <FlexCol className={`p-4 rounded-lg bg-card ${className} `}>
    <Typography variant='small' color='primary' weight='bold' className={textColor}>{title}</Typography>
    <Typography variant='h3' weight='bold' className={textColor}>{val}</Typography>
  </FlexCol>
)

const AgentCommission = () => {
  return (
    <Grid className='gap-6'>
      <PageHeader title='Commission Tracker' />
      <Grid className='grid-cols-2 md:grid-cols-4 gap-5'>
        <CardItem title='Earning Today' val='₦250,000' className='border-l-primary border-l-4'/>
        <CardItem title='This month' val='₦250,000' className='border-l-[#506070] border-l-4'/>
        <CardItem title='Pending' val='₦27,000' className='border-l-[#A43700] border-l-4'/>
        <CardItem title='Paid out' val='₦12,000' className='bg-primary' textColor='text-white'/>
      </Grid>
      <CommissionHistory/>
    </Grid>
  )
}

export default AgentCommission;
