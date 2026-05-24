import Button from '@/components/primitives/buttons/Button';
import { BasicTable } from '@/components/primitives/tables/BasicTable';
import Typography from '@/components/primitives/Typography';
import { FlexCol } from '@/components/ui/ui-layout';
import { Download } from 'lucide-react';


const data = Array.from({length: 40}, (() => ({
    date: 'Oct 12, 2023',
    customers: 'Adaeze Nwosu',
    loanProduct: 'Business Growth Loan',
    commission: '₦2,450',
    status: 'Paid'
})))

const TableTitle = () => (
    <FlexCol className='md:flex-row md:items-center md:justify-between gap-4'>
        <Typography variant='h4' weight='bold'>Commission History</Typography>
        <Button startIcon={<Download size={20} />}>Download</Button>
    </FlexCol>
)

const CommissionHistory = () => {

    const columns = [
        {
            key: 'date',
            title:'Date'
        },
        {
            key: 'customers',
            title:'Customers'
        },
        {
            key: 'loanProduct',
            title:'Loan Product'
        },
        {
            key: 'commission',
            title:'Commission'
        },
        {
            key: 'status',
            title:'Status'
        },
    ]

  return (
    <BasicTable columns={columns} data={data ?? []} title={<TableTitle/>} pageSize={8} pagination/>
  )
}

export default CommissionHistory;
