import { CustomBarChart } from '@/components/charts/CustomBarChart';
import CustomPieChart from '@/components/charts/CustomPiechart';
import Typography from '@/components/primitives/Typography';
import { Flex, FlexCol, Grid } from '@/components/ui/ui-layout';
import { cn } from '@/lib/utils';

const data = [
  {
    name: 'Jan',
    par30: 14000,
    par60: 2400,
    par90: 2005
  },
  {
    name: 'Feb',
    par30: 13000,
    par60: 1398,
    par90: 2005
  },
  {
    name: 'Mar',
    par30: 12000,
    par60: 9800,
    par90: 2005
  },
  {
    name: 'Apr',
    par30: 12780,
    par60: 3908,
    par90: 2005
  },
  {
    name: 'May',
    par30: 12000,
    par60: 9800,
    par90: 2005
  },
  {
    name: 'Jun',
    par30: 12780,
    par60: 3908,
    par90: 2005
  },
]

const data2 = [
  { name: 'Performin', value: 900, fill: "#10B981" },
  { name: 'Watchlist', value: 200, fill: "#F59E0B" }, 
  { name: 'Imapaired', value: 50, fill: "#F43F5E" }, 
]


const BarTitle = () => (
    <FlexCol className='md:flex-row justify-between md:items-center w-full gap-4'>
        <Typography variant='h3' weight='semibold' color='primary2'>PAR Trending (6 Months)</Typography>
        <Flex className='gap-2'>
            <Typography variant='small' className='text-chart-2' startIcon={<div className='w-3 h-3 bg-chart-2 rounded-full'/>}>PAR30</Typography>
            <Typography weight='semibold' variant='small' className='text-chart-4' startIcon={<div className='w-3 h-3 bg-chart-4 rounded-full'/>}>PAR30</Typography>
            <Typography weight='semibold' variant='small' color='destructive' startIcon={<div className='w-3 h-3 bg-destructive rounded-full'/>}>PAR90+</Typography>
        </Flex>
    </FlexCol>
)

const PieFooter = () => (
    <FlexCol className='gap-2'>
      <Flex className='justify-between'>
        <Typography
            color='success' 
            startIcon={<div className='w-3 h-3 rounded-full bg-chart-2'/>}>Performing</Typography>
        <Typography color='primary'>₦ 124.2M</Typography>
      </Flex>

      <Flex className='justify-between'>
        <Typography 
            className='text-chart-4'
            startIcon={<div className='w-3 h-3 rounded-full bg-chart-4'/>}>Watchlist</Typography>
        <Typography color='primary'>₦ 12.8M</Typography>
      </Flex>

      <Flex className='justify-between'>
        <Typography 
            className='text-destructive'
            startIcon={<div className='w-3 h-3 rounded-full bg-destructive'/>}>Imapaired</Typography>
        <Typography color='primary'>₦ 3.4M</Typography>
      </Flex>
    </FlexCol>
)


const PRACharts = ({className}: {className: string}) => {
  return (
    <Grid className={cn('grid-cols-4 gap-6', className)}>
        <CustomBarChart
            className='col-span-3'
            title={<BarTitle/>}
            data={data} 
            height={300} 
            showLegend={false} 
            showYAxis={false}
            xDataKey='name'
            barSize={20}
                bars={[
                    {
                        dataKey: 'par30',
                        label: 'PAR30',
                        color: '#10B981',
                    },
                    {
                        dataKey: 'par60',
                        label: 'PAR60',
                        color: '#F59E0B',
                    },
                    {
                        dataKey: 'par90',
                        label: 'PAR90+',
                        color: '#F43F5E',
                    },
                ]}
        />
        <CustomPieChart 
            data={data2} 
            title={<Typography variant='h5' weight='semibold' color='primary'>Loan Health</Typography>} 
            footer={<PieFooter/>}/>
    </Grid>
  )
}

export default PRACharts;
