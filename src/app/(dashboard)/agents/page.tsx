import Typography from '@/components/primitives/Typography';
import PageHeader from '@/components/ui/PageHeader';
import { Grid } from '@/components/ui/ui-layout';
import { ArrowUp } from 'lucide-react';
import React from 'react'

const Widget = ({title, num, percent}: {title: string, num: number, percent: number}) => {
  return(
    <Grid className='gap-1 bg-white rounded-lg px-5 py-2.5 border'>
      <Typography variant='small' weight='semibold' color='primary'>{title}</Typography>
      <div className="flex items-baseline gap-1">
        <Typography variant='h1' color='default'>{num}</Typography>
        <Typography variant='small' color='tertiary' startIcon={<ArrowUp size={18}/>}>{percent}%</Typography>
      </div>
    </Grid>
  )
}

const AgentDashboard = () => {
  return (
    <main className='grid gap-5 p-4'>
      <PageHeader title='Good morning, Emeka 👋' subtitle='Friday, 11 April 2025' className='text-2xl'/>
      
      <section className='grid grid-cols-2 gap-4 md:grid-cols-4'>
        <Widget title='TOTAL ONBOARDED TODAY' num={12} percent={12}/>
        <Widget title='APPROVED THIS WEEK' num={12} percent={12}/>
        <Widget title='CONVERSION RATE' num={12} percent={12}/>
        <Widget title='ACTIVE APPLICATIONS' num={12} percent={12}/>
      </section>
    </main>
  )
}

export default AgentDashboard;
