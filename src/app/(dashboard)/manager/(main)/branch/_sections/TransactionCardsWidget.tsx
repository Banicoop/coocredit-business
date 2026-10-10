import Typography from "@/components/primitives/Typography";
import { CardWidget } from "@/components/ui/cards";
import { PageHeader } from "@/components/ui/PageHeader";
import { Flex, Grid } from "@/components/ui/ui-layout";
import { formatCurrency } from "@/helpers/funcs";
import { cn } from "@/lib/utils";
import {
  ArrowUp,
  BookOpenText,
  Plus,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import TransactionStatsFilter from "./TransactionStatsFilter";

interface TransactionStats {
  totalInflow: number;
  totalOutflow: number;
  totalTransactionAmount: number;
  averageTransactionAmount: number;
}

interface TransactionCardsWidgetProps {
  data?: TransactionStats | null;
  filters: {
    startDate?: string;
    endDate?: string;
    type?: "business" | "all";
  };
}

const TransactionCardsWidget = ({
  data,
  filters,
}: TransactionCardsWidgetProps) => {
  return (
    <Grid className="gap-6">
      <PageHeader
        title="Cash Transactions"
        description="Monitor your transaction performance and financial activities"
        actions={[
          {
            label: "New Entry",
            icon: <Plus size={20} />,
            variant: "primary",
          },
        ]}
      />

      <TransactionStatsFilter filters={filters} />

      {!data ? (
        <Flex className="h-40 justify-center">
          <Typography color="destructive" variant="small">
            Unable to load transaction stats
          </Typography>
        </Flex>
      ) : (
        <Grid className="gap-5 md:grid-cols-3">
          <CardWidget
            className={cn("px-8 py-6")}
            label="TOTAL INFLOW"
            icon
            num={formatCurrency(data.totalInflow ?? 0)}
            info={
              <TrendingDown
                size={40}
                className="text-[#05966849]"
              />
            }
          />

          <CardWidget
            className={cn("px-8 py-6")}
            label="TOTAL OUTFLOW"
            icon
            num={formatCurrency(data.totalOutflow ?? 0)}
            info={
              <TrendingUp
                size={40}
                className="text-destructive/40"
              />
            }
          />

          <CardWidget
            className={cn("px-8 py-6")}
            label="NET TRANSACTION"
            icon
            num={formatCurrency(
              data.totalTransactionAmount ?? 0
            )}
            info={
              <BookOpenText
                size={40}
                className="text-primary/40"
              />
            }
            others={
              <Typography variant="small" color="active">
                Net Average:{" "}
                {formatCurrency(
                  data.averageTransactionAmount ?? 0
                )}
              </Typography>
            }
          />
        </Grid>
      )}
    </Grid>
  );
};

export default TransactionCardsWidget;

