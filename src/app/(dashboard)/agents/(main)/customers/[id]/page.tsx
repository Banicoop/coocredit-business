import { BackButton } from '@/components/primitives/buttons/BackButton';
import { Flex, FlexCol } from '@/components/ui/ui-layout';
import React from 'react'
import LeadReviewPage from '../_pages/LeadReviewPage';
import CustomerProfile from '../_pages/CustomerProfile';

const CustomerDetails = () => {

  const type = false;

  return (
    <FlexCol className='gap-4'>
        <BackButton/>
        {type ? <LeadReviewPage/>: <CustomerProfile/>}
    </FlexCol>
  )
}

export default CustomerDetails;
