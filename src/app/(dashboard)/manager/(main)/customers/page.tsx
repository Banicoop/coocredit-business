import { Tabs2 } from '@/components/ui/Tabs2';
import CustomersTab from './(tabs)/CustomersTab';
import LeadToReview from './(tabs)/LeadToReview';
import { getBusinessDistBasedOnState, getUserOnboardingTimeSeries } from '@/lib/api';




const CustomersPage = async () => {

    const data = await getUserOnboardingTimeSeries();

    const business = await getBusinessDistBasedOnState();

    console.log('BUSINESSES:', business); 
    console.log('USERS:', data); 


    const tabs = [
      {
        label: 'Business Customers',
        content: <CustomersTab/>
      },
      {
        label: 'Lead to Review',
        content: <LeadToReview/>
      },
    ]
  return (
    <Tabs2 tabs={tabs} defaultValue='Business Customers'/>
  )
}

export default CustomersPage;
