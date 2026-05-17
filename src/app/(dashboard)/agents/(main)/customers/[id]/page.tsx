import { BackButton } from '@/components/primitives/buttons/BackButton';
import { Flex, FlexCol } from '@/components/ui/ui-layout';
import React from 'react'
import LeadReviewPage from '../_pages/LeadReviewPage';

const CustomerDetails = () => {
  return (
    <FlexCol className='gap-4'>
        <BackButton/>
        <LeadReviewPage/>
    </FlexCol>
  )
}

export default CustomerDetails;
