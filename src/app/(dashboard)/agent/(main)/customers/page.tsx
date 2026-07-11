import CustHeader from './_sections/CustHeader';
import CustomerCharts from './_sections/CustomerCharts';
import CustomersTable from '../../../../../components/tables/CustomersTable';
import { getAllAgentsBusinessCustomers } from '@/lib/api.agent';


const data = Array.from({length: 30}, () => ({
  id: '1',
  customerName: 'Divine Maduka',
  customerID: '#CUST-8821',
  status: 'approved',
  date: '12th May, 2016',
  creditScore: 60
}))

const AgentsCustomersPage = async () => {

  const customers = await getAllAgentsBusinessCustomers();

  console.log('CUSTOMERS:', customers);

  return (
    <main className='grid gap-5'>
      <CustHeader/>
      <CustomerCharts/>
      <CustomersTable initialData={data} />
    </main>
  )
}

export default AgentsCustomersPage;

