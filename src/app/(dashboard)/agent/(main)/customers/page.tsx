// import CustomerCharts from './_sections/CustomerCharts';
import { agentGetDashboardOverview, getAllAgentsBusinessCustomers } from '@/lib/api.agent';
import CustomerHero from './_sections/CustomerHero';
import AgentCustomerTable from '@/components/tables/AgentCustomerTable';


const AgentsCustomersPage = async () => {

  const customers = await getAllAgentsBusinessCustomers() as any;
  const customerStats = await agentGetDashboardOverview() as any

  console.log('CUSTOMERS:', customers?.data);

  return (
    <main className='grid gap-5'>
      <CustomerHero stats={customerStats}/>
      <AgentCustomerTable data={customers?.data ?? []} error={customers?.error}/>
      {/* <CustomerCharts /> */}
    </main>
  )
}

export default AgentsCustomersPage;

