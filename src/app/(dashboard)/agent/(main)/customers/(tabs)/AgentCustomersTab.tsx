// import CustomerCharts from '../_sections/CustomerCharts';
import { Grid } from '@/components/ui/ui-layout';
import CustomerHero from '../_sections/CustomerHero';
import AgentCustomerTable from '@/components/tables/AgentCustomerTable';


const AgentCustomersTab = ({customerStats, customers}: {customerStats: any, customers: any}) => {
  return (
    <Grid className='gap-5'>
        <CustomerHero stats={customerStats}/>
        <AgentCustomerTable data={customers?.data ?? []} error={customers?.error}/>
      {/* <CustomerCharts /> */}
    </Grid>
  )
}

export default AgentCustomersTab;
