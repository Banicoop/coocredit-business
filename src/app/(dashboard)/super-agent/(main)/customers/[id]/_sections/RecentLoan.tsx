import { BasicTable } from "@/components/primitives/tables/BasicTable"
import Typography from "@/components/primitives/Typography"
import { Flex } from "@/components/ui/ui-layout"
import { ArrowRight } from "lucide-react"


const data = Array.from({length: 4}, (() => ({
    loanId: 'ORZ-9942-LN',
    amount: '₦ 25,000,000.00',
    date: 'Jan 15, 2024',
    tenure: '12 months',
    status: 'Active'
})))


export const RecentLoan = ({className}: {className?: string }) => {

    const columns = [
        {
            key: 'loanId',
            title: 'LOAN ID',
        },
        {
            key: 'amount',
            title: 'AMOUNT',
        },
        {
            key: 'date',
            title: 'DATE',
        },
        {
            key: 'tenure',
            title: 'TENURE',
        },
        {
            key: 'status',
            title: 'STATUS',
        },
    ]

    return (
        <BasicTable 
            columns={columns} 
            data={data ?? []} 
            title={
            <Flex className="justify-between">
                <Typography variant="h3">Recent Loans</Typography>
                <Typography className="cursor-pointer" variant="small" color="active" endIcon={<ArrowRight size={18}/>}>View Ledger</Typography>
            </Flex>}
            className={className}
            />
    )
}
