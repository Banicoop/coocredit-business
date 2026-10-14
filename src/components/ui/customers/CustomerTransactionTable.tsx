'use client';

import { BasicTable } from "@/components/primitives/tables/BasicTable";
import Typography from "@/components/primitives/Typography";
import { formatCurrency, formatDate } from "@/helpers/funcs";


const CustomerTransactionTable = ({data}: {data: any[]}) => {

    const columns = [
        {
            key: 'type',
            title: 'TYPE',
            render: (type: string) => (
                <Typography variant="small" className="capitalize">{type}</Typography>
            )
        },
        {
            key: 'date',
            title: 'DATE',
            render: (date: string) => (
                <Typography variant="small">{formatDate(date)}</Typography>
            )
        },
        {
            key: 'amount',
            title: 'AMOUNT',
            render: (amount: number) => (
                <Typography variant="small">{formatCurrency(amount)}</Typography>
            )
        },
        {
            key: 'status',
            title: 'STATUS',
            render: (status: string) => (
                <Typography variant="small" color={status === 'completed' ? 'success': 'default'} className="capitalize bg-muted py-1 px-2.5 rounded-lg">{status}</Typography>
            )
        },
    ]
    return(
        <BasicTable
            columns={columns}
            data={data}
            title={<Typography>Recent transactions</Typography>}
            pagination
            emptyMessage="No transactions recorded yet."
        />
    )
}

export default CustomerTransactionTable;
