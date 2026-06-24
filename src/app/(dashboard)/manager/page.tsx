import Button from '@/components/primitives/buttons/Button';
import Typography from '@/components/primitives/Typography';
import { CardWidget } from '@/components/ui/cards';
import { PageHeader } from '@/components/ui/PageHeader';
import { Flex, Grid } from '@/components/ui/ui-layout';
import { AlertTriangle, Banknote, Building2, CalendarDays, CircleSlash2, Download, Rocket, TrendingUp, UsersRound } from 'lucide-react';
import React from 'react'

const ManagerDashboard = () => {
  return (
    <Grid className='gap-6'>
      <PageHeader
        title='Dashboard Overview' 
        description='Real-time overview of Lagos Central performance metrics.'
        actions={[
          {
            label: 'Last 30 Days',
            icon: <CalendarDays size={18} className='text-ring'/>,
            textClassName: 'text-ring font-semibold'
          },
          {
            label: 'Download',
            icon: <Download size={18}/>,
            variant: 'primary'
          },
        ]}
        />

        <Grid className='grid-cols-2 md:grid-cols-4 gap-5'>
          <CardWidget label='Total Active Customers' 
            icon={<UsersRound size={18}  className='text-primary'/>}
            num='1,247' 
            info={<Typography color='success' variant='small' weight='semibold' startIcon={<TrendingUp size={16}/>}>+8.3%</Typography>}/>
          <CardWidget label='Total Loan Portfolio' 
            icon={<Building2 size={18} className='text-primary'/>} 
            num='₦48,200,000' 
            info={<Typography color='success' variant='small' weight='semibold' startIcon={<TrendingUp size={16}/>}>+12.1%</Typography>}/>
          <CardWidget label='Disbursements Today' 
            icon={<CircleSlash2 size={18} className='text-primary'/>} 
            num='₦3,400,000' 
            info={<Typography color='primary' variant='small' weight='semibold'>23 loans</Typography>}/>
          <CardWidget label='Collections Today' 
            icon={<Banknote size={18} className='text-primary'/>} 
            num='₦2,100,000' 
            info={<Typography variant='small' color='primary' weight='semibold'>87% efficiency</Typography>}/>
        </Grid>

        <Flex className='justify-between bg-[#FEF2F2] border border-[#FEE2E2] rounded-lg px-4 py-1'>
          <Typography color='destructive' startIcon={<AlertTriangle size={20}/>}><strong>Fraud Alert:</strong> Unusual withdrawal patterns detected in Branch Sub-Sector A4.</Typography>
          <Button variant='light' size='lg' className='text-destructive font-semibold bg-transparent'>Investigate</Button>
        </Flex>

        <Flex className='justify-between bg-tertiary border rounded-lg px-4 py-1'>
          <Typography color='active' startIcon={<Rocket size={20}/>}><strong>Growth Insight:</strong> Portfolio has exceeded Q3 targets by 14%. Adjust disbursement limits?</Typography>
          <Button variant='light' className='text-primary font-semibold bg-transparent'>VIEW INSIGHTS</Button>
        </Flex>
    </Grid>
  )
}

export default ManagerDashboard;
