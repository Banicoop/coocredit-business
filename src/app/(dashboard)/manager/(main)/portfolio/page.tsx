import { Tabs2 } from '@/components/ui/Tabs2';
import { Grid } from '@/components/ui/ui-layout';
import PortfolioQuality from './(tabs)/PortfolioQuality';
import LoanApplications from './(tabs)/LoanApplications';
import { cn } from '@/lib/utils';



const PortfolioPage = () => {
  return (
    <Grid className={cn(' py-6 px-4')}>

    <LoanApplications/>

      {/* // <Tabs2 tabs={[
      //   {
      //     label: 'Portfolio Quality',
      //     content: <PortfolioQuality/>,
      //   },
      //   {
      //     label: 'Loan Portfolio',
      //     content: <LoanApplications/>,
      //   },
      // ]} defaultValue='Portfolio Quality'/> */}
    </Grid>
  )
}
 
export default PortfolioPage;
