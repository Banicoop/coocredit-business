import Typography from '@/components/primitives/Typography';
import { CardWidget } from '@/components/ui/cards';
import { PageHeader } from '@/components/ui/PageHeader';
import { Grid } from '@/components/ui/ui-layout';
import { Download, Landmark, ReceiptCent, ShieldAlert, TrendingDown } from 'lucide-react';
import AlertRiskList from './AlertRiskList';


const RiskPage = () => {
  return (
    <Grid className='gap-7'>
      <PageHeader title='Risk Monitoring' 
      description='Real-time fraud detection and portfolio health analysis.' 
      actions={[{
        label: 'Export Report',
        variant: 'primary',
        icon: <Download size={16}/>
      }]}/>

      <Grid className='grid-cols-2 md:grid-cols-4 gap-4'>
        <CardWidget label='FRAUD FLAGS' 
          info={<Typography className='py-0.5 px-1.5 bg-accent text-destructive font-semibold'>-12%</Typography>}
          icon={<ShieldAlert size={16} className='text-destructive'/>} 
          num='142'/>
        <CardWidget label='DEFAULT RATE' 
          info={<Typography className='py-0.5 px-1.5 bg-accent text-chart-2 font-semibold'>+4.2%</Typography>}
          icon={<TrendingDown size={16} className='text-chart-5'/>} 
          num='1.84%'/>
        <CardWidget label='EXPOSURE AT RISK' 
          icon={<Landmark size={16} className='text-chart-2'/>} 
          num='₦4.2M'/>
        <CardWidget label='PENDING REVIEWS' 
          icon={<ReceiptCent size={16} className='text-ring'/>}
          num='28'/>
      </Grid>

      <AlertRiskList/>
    </Grid>
  )
}

export default RiskPage;
