import { BackButton } from '@/components/primitives/buttons/BackButton';
import { Grid } from '@/components/ui/ui-layout';
import PortfolioOverview from '../_sections/PortfolioOverview';
import LoanPortfolioDetails from '../_sections/PortfolioDetails';

const PortfolioDetails = () => {
  return (
    <Grid className='gap-6'>
        <BackButton 
            label='Portfolio Details' 
            className='font-bold text-primary2 text-[20px]'/>
        <PortfolioOverview/>
        <LoanPortfolioDetails/>
        {/* <Grid className='lg:grid-cols-3 gap-4'>
            <Grid className='lg:col-span-2'>
                <PortfolioSummary/>
            </Grid>
            <Grid>
                B
            </Grid>
        </Grid> */}
    </Grid>
  )
}

export default PortfolioDetails;
