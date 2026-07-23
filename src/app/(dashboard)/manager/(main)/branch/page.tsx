import { Grid } from '@/components/ui/ui-layout';
import RecentTransactions from './_sections/RecentTransactions';
import { getAllTransactions, getTransactionsStats } from '@/lib/api';
import TransactionCardsWidget from './_sections/TransactionCardsWidget';


const BranchPage = async () => {

  const transactions = await getAllTransactions() as any;
  const stats = await getTransactionsStats() as any;

  return (
    <Grid className='gap-7'>

      <TransactionCardsWidget data={stats?.data}/>

      <RecentTransactions data={transactions?.data}/>
    </Grid>
  )
}

export default BranchPage;
