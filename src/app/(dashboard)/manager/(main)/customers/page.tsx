import BusinessCustomers from '@/app/(dashboard)/super-agent/(main)/customers/(tabs)/BusinessCustomers';
import LeadReview from '@/app/(dashboard)/super-agent/(main)/customers/(tabs)/LeadReview';
import { Tabs2 } from '@/components/ui/Tabs2';


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
