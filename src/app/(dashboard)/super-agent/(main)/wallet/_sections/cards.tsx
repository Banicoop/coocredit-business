import Typography from "@/components/primitives/Typography";
import { ColItem } from "@/components/ui/PageHeader";
import { Flex, FlexBox } from "@/components/ui/ui-layout";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { Props, Props2 } from '../types'


export const Card = ({transaction, date, time, amount, status, type}: Props) => (
    <Flex className="justify-between bg-card p-2.5 rounded-lg">
        <Flex className="gap-2.5">
            <div className={`p-2.5 rounded-full ${type === 'debit' ? 'bg-[#FFDAD6]': 'bg-accent'} `}>
                {type === 'credit' ? 
                <ArrowUpRight size={20} className="text-primary" />: type === 'debit' ? 
                <ArrowDownLeft size={20} className="text-destructive" />: ''}
            </div>
            <ColItem 
                item1={transaction}
                item2={`${date} • ${time}`}
                className1="text-primary2 font-semibold"
                className2="text-ring"
                />
        </Flex>

        <ColItem
            item1={`${type === 'debit' ? '-': '+'} ₦${(amount).toLocaleString()}`}
            item2={status}
            className1={type === 'debit' ? "text-destructive font-semibold": 'text-primary font-semibold'}
            className2="text-ring p-1 rounded-md bg-accent text-center capitalize h-fit"
            />
    </Flex>
)


export const Card2 = ({label, amt, other, extra}: Props2) => (
    <FlexBox className="flex-col gap-1.5">
        <Typography variant="small" color="primary">{label}</Typography>
        <Flex className="justify-between">
            <Typography color="primary2" variant="h3">₦{amt}</Typography>
            <div>{other}</div>
        </Flex>
        <div>{extra}</div>
    </FlexBox>
)
