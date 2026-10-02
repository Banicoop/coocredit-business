import { Flex, Grid } from '@/components/ui/ui-layout';
import RecentTransactions from './_sections/RecentTransactions';
import {
  getAllTransactions,
  getTransactionsStats,
} from '@/lib/api';
import TransactionCardsWidget from './_sections/TransactionCardsWidget';
import Typography from '@/components/primitives/Typography';

interface BranchPageProps {
  searchParams: Promise<{
    page?: string;
    size?: string;
  }>;
}

const BranchPage = async ({ searchParams }: BranchPageProps) => {
  const params = await searchParams;

  const page = Math.max(
    Number(params.page) || 1,
    1
  );

  const size = Math.max(
    Number(params.size) || 50,
    1
  );

  const [transactions, stats] =
    (await Promise.all([
      getAllTransactions({
        page,
        size,
      }),
      getTransactionsStats(),
    ])) as any;

  return (
    <Grid className="gap-7">
      {stats?.data ? (
        <TransactionCardsWidget
          data={stats.data}
        />
      ) : (
        <Flex className="h-40 justify-center">
          <Typography
            color="destructive"
            variant="small"
          >
            Unable to load transaction stats
          </Typography>
        </Flex>
      )}

      <RecentTransactions
        data={transactions?.data ?? []}
        pagination={transactions?.pagination}
        error={transactions?.error}
      />
    </Grid>
  );
};

export default BranchPage;
