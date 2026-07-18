import { BackButton } from '@/components/primitives/buttons/BackButton';
import { FlexCol } from '@/components/ui/ui-layout';
import LeadReviewPage from '../_pages/LeadReviewPage';
import CustomerProfile from '../_pages/CustomerProfile';
// import { useParams } from 'next/navigation';

interface Props {
  status: string;
  params: Promise<{
    id: string;
  }>;
}

const CustomerDetails = async ({params}: Props) => {

  const { id } = await params;

  const type = false;

  console.log('ID:', id)

  
  return (
    <FlexCol className='gap-4'>
        <BackButton/>
        {type ? <LeadReviewPage/>: <CustomerProfile/>}
    </FlexCol>
  )
}

export default CustomerDetails;
