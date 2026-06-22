import { Tabs2 } from '@/components/ui/Tabs2';
import BusinessCustomers from './(tabs)/BusinessCustomers';
import LeadReview from './(tabs)/LeadReview';

const tabs = [
  {
    label: 'Business Customers',
    content: <BusinessCustomers/>
  },
  {
    label: 'Lead to Review',
    content: <LeadReview/>
  },
]


const CustomersPage = () => {
  return (
    <Tabs2 tabs={tabs} defaultValue='Business Customers'/>
  )
}

export default CustomersPage;
