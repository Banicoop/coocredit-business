import { Flex, Grid } from '@/components/ui/ui-layout';
import RecentTransactions from './_sections/RecentTransactions';
import { getAllTransactions, getTransactionsStats } from '@/lib/api';
import TransactionCardsWidget from './_sections/TransactionCardsWidget';
import Typography from '@/components/primitives/Typography';


const BranchPage = async () => {

  const transactions = await getAllTransactions() as any;
  const stats = await getTransactionsStats() as any;

  return (
    <Grid className='gap-7'>

    {stats.data ?
      <TransactionCardsWidget data={stats.data}/>:
      <Flex className="h-40 justify-center">
        <Typography color='destructive' variant='small'>Unable to load customer's data</Typography>
      </Flex>
    }

      <RecentTransactions 
        data={transactions?.data ?? []} 
        error={transactions?.error} />
    </Grid>
  )
}

export default BranchPage;
