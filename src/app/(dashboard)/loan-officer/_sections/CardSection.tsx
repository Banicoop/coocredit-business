import Typography from '@/components/primitives/Typography';
import { CardWidget } from '@/components/ui/cards';
import { Grid } from '@/components/ui/ui-layout';
import { CircleAlert, CircleCheck, Landmark, TableConfig, TrendingUp, TriangleAlert } from 'lucide-react';



const CardSection = () => {
  return (
    <Grid className='grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5' >
        <CardWidget label='APPLICATIONS' num='142' 
          icon={<TableConfig size={20} className='text-primary'/>} 
          info={<Typography color='success' className='py-1 px-2.5 rounded-md bg-accent font-semibold'>+12%</Typography>}/>
        <CardWidget label='ACTIVE LOANS' num='1,324' 
          icon={<CircleCheck size={20} className='text-chart-2'/>} 
          info={<Typography color='success' className='py-1 px-2.5 rounded-md bg-accent font-semibold'>+5%</Typography>}/>
        <CardWidget label='BALANCE' num='₦42.8M' 
          icon={<Landmark size={20} className='text-primary'/>} 
          info={<Typography className='py-1 px-2.5 rounded-md bg-accent font-bold text-[10px]'>STABLE</Typography>}/>
        <CardWidget label='COLLECTIONS' num='98.2%' 
          icon={<TrendingUp size={20} className='text-chart-2'/>} 
          info={<Typography color='success' className='py-1 px-2.5 rounded-md bg-accent font-semibold'>+0.5%</Typography>}/>
        <CardWidget label='AT-RISK' num='5' 
          icon={<TriangleAlert size={20} className='text-destructive'/>} 
          info={<Typography color='destructive' className='py-1 px-2.5 rounded-md bg-accent font-semibold'>-1.5%</Typography>}/>
        <CardWidget label='AT-RISK' num='4' 
          icon={<CircleAlert size={20} className='text-destructive'/>} 
          info={<Typography color='destructive' className='py-1 px-2.5 rounded-md bg-accent font-semibold'>-0.5%</Typography>}/>
    </Grid>
  )
}

export default CardSection;
