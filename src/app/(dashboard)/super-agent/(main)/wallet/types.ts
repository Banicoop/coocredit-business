import { ReactNode } from "react";

export interface Props {
    transaction: string;
    date: string;
    time: string;
    amount: number;
    status: string;
    type: string
    // type: 'credit' | 'debit' | 'reversed'
}


export interface Props2 {
    label: string;
    amt: number | string;
    other: ReactNode;
    extra: ReactNode;
}
