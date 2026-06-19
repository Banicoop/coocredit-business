import { PageHeader } from '@/components/ui/PageHeader';
import { Grid } from '@/components/ui/ui-layout';
import AssetLoans from './_sections/AssetLoan';
import { Activity, AlertTriangle, Banknote, FileText } from 'lucide-react';
import { LoanOfficerCardWidget } from '@/components/ui/cards';

const PortfolioPage = () => {
  return (
    <Grid className='gap-6'>
      <PageHeader 
        title='Loan Portfolio' 
        description='Real-time overview of active credit facilities and performance metrics.'/>

        <Grid className='grid-cols-2 lg:grid-cols-4 gap-4'>
          <LoanOfficerCardWidget
            icon={<FileText size={20} className='text-primary' />}
            percent={0.5}
            title='TOTAL LOAN VOLUME' 
            desc='Active disbursements across 1,240 accounts' 
            amount={`₦${(428502070).toLocaleString()}`}/>
          <LoanOfficerCardWidget icon={<Activity size={20} color='green'/>}
            percent={3.4}
            title='AVERAGE BALANCE' 
            desc='Per capita exposure within risk limits' 
            amount={`₦${(34556).toLocaleString()}`}/>
          <LoanOfficerCardWidget 
            icon={<AlertTriangle size={20} color='red' />}
            percent={0.2} isNegative 
            title='DELINQUENCY (30+DP)' 
            desc='Currently under collection monitoring' 
            amount='1.45%'/>
          <LoanOfficerCardWidget 
            icon={<Banknote size={20} color='#9333EA'/>}
            percent={0.8} title='PORTFOLIO YIELD' 
            desc='Net interest margin for Q3 period' 
            amount='8.2%'/>
        </Grid>
        <AssetLoans/>
    </Grid>
  )
}

export default PortfolioPage;
