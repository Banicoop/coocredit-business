import { PageHeader } from '@/components/ui/PageHeader';
import { Grid, GridItem } from '@/components/ui/ui-layout';
import { Dumbbell, Plus } from 'lucide-react';
import RiskBucket from './_sections/RiskBucket';
import Typography from '@/components/primitives/Typography';
import { CashTransCard, RiskEventCard } from './_sections/cards';
import PRACharts from './_sections/PRACharts';



const PortfolioPage = () => {
  return (
    <Grid className='gap-6'>
      <PageHeader 
        title='Portfolio Quality' 
        description='Real-time health monitoring of branch loan assets and risk concentration.'
        actions={[
          {
            label: 'New Transaction',
            variant: 'primary',
            icon: <Plus size={18}/>
          },
        ]}
      />
      <Grid className='grid-cols-4 gap-5'>
        <PRACharts className='col-span-4'/>
        <RiskBucket className='col-span-4'/>
        <GridItem className='col-span-2 gap-3'>
          <Typography weight='semibold' variant='h5'>Cash Transactions</Typography>

          <CashTransCard timeline='0-30 DAYS EARLY STAGE' amount='85.4M' percent={34} bgColor='bg-primary'/>
          <CashTransCard timeline='31-90 DAYS CRITICAL' amount='42.1M' percent={14} bgColor='bg-chart-4'/>
          <CashTransCard timeline='91+ DAYS DEFAULT' amount='14.2' percent={34} bgColor='bg-muted-foreground'/>
        </GridItem>

        <GridItem className='col-span-2 gap-2'>
          <Typography color='primary2' weight='semibold' variant='h5'>Recent Risk Events</Typography>

          <RiskEventCard title='Large Exposure Write-off Requested' type='Merchant Loan #49202' amount='₦ 1,200,000' time='2 hours ago' info='REVIEW MODAL' icon={<Dumbbell size={20} className='text-chart-4'/>}/>

          <RiskEventCard title='Large Exposure Write-off Requested' type='Merchant Loan #49202' amount='₦ 1,200,000' time='2 hours ago' info='REVIEW MODAL' icon={<Dumbbell size={20} className='text-chart-4'/>}/>
        </GridItem>
      </Grid>
    </Grid>
  )
}
 
export default PortfolioPage;
