import { Flex, FlexCol, Grid } from '@/components/ui/ui-layout';
import LoanOfficerOverview from './_sections/LoanOfficerOverview';
import CardSection from './_sections/CardSection';
import RepaymentChart from './_sections/RepaymentChart';
import Typography from '@/components/primitives/Typography';


const LoanOfficerDashboard = () => {
  return (
    <Grid className='gap-6'>
      <LoanOfficerOverview/>
      <CardSection/>
      <Grid className='md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <RepaymentChart className='lg:col-span-2'/>
        {/* <FlexCol>
          <Flex>
            <Typography>Recent Activ</Typography>
          </Flex>
        </FlexCol> */}
      </Grid>
    </Grid>
  )
}

export default LoanOfficerDashboard;
