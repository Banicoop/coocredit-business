import { BackButton } from '@/components/primitives/buttons/BackButton';
import { PageHeader } from '@/components/ui/PageHeader';
import { Grid, GridItem } from '@/components/ui/ui-layout';
import React from 'react'
import ProfileCard from '../_section/ProfileCard';
import RepaymentTerms from '../_section/RepaymentTerms';
import { DisbursementDestnation } from '../_section/OtherInfo';
import Typography from '@/components/primitives/Typography';

const LoanPipelineDetails = () => {
  return (
   <Grid className='gap-6 grid-cols-3'>
        <BackButton className='col-span-3'/>
        <PageHeader 
            className='col-span-3'
            title='Pipeline > Loan Request #LR-89021' 
            description='Request Detail: SME Working Capital' 
            titleClass='text-sm text-ring'
            descClass='text-[24px] text-primary2 font-semibold'
            actions={[
                {
                    label: 'Reject Loan',
                    className: 'bg-destructive',
                    variant: 'primary',
                    textClassName: 'text-card bg-destructive'

                },
                {
                    label: 'Approve Loan',
                    variant: 'primary',
                },
            ]}
        />

        {/* MAIN */}
        <Grid className='col-span-2 gap-4 h-fit'>
            <ProfileCard/>
            <RepaymentTerms/>
        </Grid>

        {/* OTHER INFO */}
        <Grid className='gap-6 h-fit'>
            <DisbursementDestnation/>
            <GridItem>
                <Typography>Required Documentation</Typography>
            </GridItem>
        </Grid>
   </Grid>
  )
}

export default LoanPipelineDetails;
