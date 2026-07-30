import { Tabs2 } from '@/components/ui/Tabs2';
import CustomersTab from './(tabs)/CustomersTab';
import LeadToReview from './(tabs)/LeadToReview';
import { getAllCustomers, getAllLeadsToReview, getPendingOnboardingCustomers } from '@/lib/api';




const CustomersPage = async () => {

  const customers = await getAllCustomers() as any;
  const leads = await getAllLeadsToReview() as any;
  const pending = await getPendingOnboardingCustomers();

  console.log('P', pending)


    const tabs = [
      {
        label: 'Business Customers',
        content: <CustomersTab data={customers?.data} error={customers.error}/>
      },
      {
        label: 'Lead to Review',
        content: <LeadToReview data={leads?.data} error={leads.error}/>
      },
    ]
  return (
    <Tabs2 tabs={tabs} defaultValue='Business Customers'/>
  )
}

export default CustomersPage;
