import CustomerCharts from './_sections/CustomerCharts';
import CustomersTable from '../../../../../components/tables/CustomersTable';
import { agentGetDashboardOverview, getAllAgentsBusinessCustomers } from '@/lib/api.agent';
import CustomerHero from './_sections/CustomerHero';


const data = Array.from({length: 30}, () => ({
  id: '1',
  customerName: 'Divine Maduka',
  customerID: '#CUST-8821',
  status: 'approved',
  date: '12th May, 2016',
  creditScore: 60
}))

const AgentsCustomersPage = async () => {

  const customers = await getAllAgentsBusinessCustomers() as any;
  const customerStats = await agentGetDashboardOverview() as any

  console.log('CUSTOMERS:', customers);

  return (
    <main className='grid gap-5'>
      <CustomerHero stats={customerStats}/>
      <CustomerCharts />
      <CustomersTable initialData={customers?.data ?? []} error={customers.error} />
    </main>
  )
}

export default AgentsCustomersPage;

