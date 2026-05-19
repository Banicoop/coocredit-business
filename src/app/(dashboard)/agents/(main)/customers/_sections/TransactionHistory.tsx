import { BasicTable } from "@/components/primitives/tables/BasicTable";
import Typography from "@/components/primitives/Typography";
import { Tabs } from "@/components/ui/Tabs";
import { FlexCol } from "@/components/ui/ui-layout";

const data = Array.from({length: 20}, () => ({
  reference: '#TR-50221',
  date: '23rd Oct, 2026',
  type: 'repayment',
  status: 'success',
  amount: 30000
}))

const tabs = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'Loans',
    value: 'loans'
  },
  {
    label: 'Payments',
    value: 'payments'
  },
]

const Title = () => (
  <FlexCol className="gap-4 lg:flex-row justify-between">
    <FlexCol>
      <Typography>Transaction History</Typography>
      <Typography color="primary">Overview of recent repayments and disbursements</Typography>
    </FlexCol>
    <Tabs items={tabs} defaultValue="all"/>
  </FlexCol>
)


const TransactionHistory = () => {

  const columns = [
    {
      key: 'reference',
      title: 'Reference'
    },
    {
      key: 'date',
      title: 'Date'
    },
    {
      key: 'type',
      title: 'Type'
    },
    {
      key: 'status',
      title: 'Status'
    },
    {
      key: 'amount',
      title: 'Amount'
    },
  ]

  return (
      <BasicTable columns={columns} data={data ?? []} title={<Title/>} pageSize={5} pagination/>
  )
}

export default TransactionHistory;
