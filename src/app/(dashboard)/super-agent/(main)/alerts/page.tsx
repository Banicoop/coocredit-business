import { CustomBarChart } from '@/components/charts/CustomBarChart';
import Button from '@/components/primitives/buttons/Button';
import Typography from '@/components/primitives/Typography';
import { PageHeader } from '@/components/ui/PageHeader';
import { Flex, FlexCol, Grid } from '@/components/ui/ui-layout';
import AlertDistributionList from './_sections/AlertDistributionList';


const data = [
  {
    name: 'Jan',
    level: 4000,
  },
  {
    name: 'Feb',
    level: 3000,
  },
  {
    name: 'March',
    level: 2000,
  },
  {
    name: 'Apr',
    level: 2780,
  },
  {
    name: 'May',
    level: 2000,
  },
]

const AlertsPage = () => {
  return (
    <Grid className='gap-5'>
      <PageHeader 
        title='Alerts & Sovereign Flags'
        description='Real-time risk monitoring and triage for the Nigerian financial corridor.'
         />
      
      <Grid className='gap-5 grid-cols-2 lg:grid-cols-3'>
        <Grid className='gap-2 p-5 rounded-lg bg-primary col-span-2'>
          <Typography variant='small' className='py-1 px-2 rounded-lg w-fit text-card bg-card/20'>CRITICAL STATUS</Typography>
          <Typography variant='h1' color='light'>14 Active High-Risk Flags</Typography>
          <Typography variant='p' color='light'>Requires immediate attention. System has automatically paused 3 suspect clearing cycles in the Lagos cluster.</Typography>
          <Flex className='gap-4'>
            <Button variant='light' className='font-semibold'>Resolve All High Priority</Button>
            <Button className='bg-card/10 text-card'>View Audit Logs</Button>
          </Flex>
        </Grid>

        <FlexCol className='bg-[#DCEAF5] py-4 px-5 rounded-lg'>
          <Typography variant='small' color='primary2' className='tracking-widest'>TRIAGE VELOCITY</Typography>
          <Typography variant='h1' color='active'>84%</Typography>
          <Typography variant='p' color='primary'>Resolution rate maintained over the last 24 hours.</Typography>
          <CustomBarChart
              className='h-20'
              height={50}
              xDataKey='name'
              data={data}
              showLegend={false}
              showYAxis={false}
              showXAxis={false}
              bars={[
                  {
                  dataKey: 'level',
                  label: 'Traige velocity',
                  color: '#0053CC',
                  radius: [10, 10 , 0, 0],
                  }
              ]}
          />
        </FlexCol>
      </Grid>

      <AlertDistributionList/>
    </Grid>
  )
}

export default AlertsPage;
