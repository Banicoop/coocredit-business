import { CustomBarChart } from '@/components/charts/CustomBarChart';
import Typography from '@/components/primitives/Typography';
import { Flex, FlexCol, Grid } from '@/components/ui/ui-layout';
import CustomPieChart from '@/components/charts/CustomPiechart';

const data = [
  {
    name: 'Jan',
    submitted: 4000,
    approved: 2400,
  },
  {
    name: 'Feb',
    submitted: 3000,
    approved: 1398,
  },
  {
    name: 'Mar',
    submitted: 2000,
    approved: 9800,
  },
  {
    name: 'Apr',
    submitted: 2780,
    approved: 3908,
  },
  {
    name: 'May',
    submitted: 2000,
    approved: 9800,
  },
  {
    name: 'Jun',
    submitted: 2780,
    approved: 3908,
  },
]

const data2 = [
  { name: 'Approved', value: 100, fill: "#DBE9FE" },
  { name: 'Submited', value: 200, fill: "#0053CC" }, 
  { name: 'Rejected', value: 50, fill: "#BA1A1A" }
]

const footerLists = [
  {
    title: 'Approved',
    percent: '75',
    color: 'bg-[#0053CC]'
  },
  {
    title: 'Submitted',
    percent: '12',
    color: 'bg-[#DBE9FE]'
  },
  {
    title: 'Rejected',
    percent: '11',
    color: 'bg-[#BA1A1A]'
  },
]

const BarTitle = () => (
  <FlexCol className='w-full gap-4 md:flex-row justify-between'>
    <Typography variant='h4' weight='bold' font='manrope'>Customer Onboarding Trend</Typography>
    <Flex className='gap-2'>
      <Typography startIcon={<div className='w-3 h-3 bg-[#0053CC] rounded-full' />} className='text-[#0053CC]'>Approved</Typography>
      <Typography startIcon={<div className='w-3 h-3 bg-[#DBE9FE] rounded-full' />} className='text-[#DBE9FE]'>Submitted</Typography>
    </Flex>
  </FlexCol>
)

const PieFooter = () => (
  <FlexCol className='gap-2 p-4'>
    {footerLists.map((list) => (
      <Flex className='p-2 rounded-lg bg-[#EEF4FF] justify-between' key={list.title}>
        <Typography startIcon={<div className={`w-3 h-3 rounded-full ${list.color}`}/>} variant='h5' weight='semibold'>{list.title}</Typography>
        <Typography weight='semibold'>{list.percent}%</Typography>
      </Flex>
    ))}
  </FlexCol>
)

const CustomerCharts = () => {
  return (
    <Grid className='md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <CustomBarChart 
          className='lg:col-span-2'
          data={data} 
          title={<BarTitle/>}
            xDataKey="name"
            height={400}
            showLegend={false}
            showXAxis={false}
            showYAxis={false}
            barSize={40}
              bars={[
                {
                  dataKey: 'approved',
                  label: 'Approved',
                  color: '#0053CC',
                  stackId: 'name',
                  radius: [0, 0 , 0, 0],
                },
                {
                  dataKey: 'submitted',
                  label: 'Submitted',
                  color: '#DBE9FE',
                  stackId: 'name',
                  radius: [0, 0 , 0, 0],
                },
              ]}
          />
        <CustomPieChart 
          data={data2} 
          footer={<PieFooter/>}
          title={<Typography variant='h5' weight='semibold'>Approval Breakdown</Typography>}/>
    </Grid>
  )
}

export default CustomerCharts;
