import { ReactNode } from "react";


export interface PortfolioCardProps {
    icon: ReactNode;
    percent: number;
    title: string;
    amount: number | string;
    desc: string;
    isNegative?: boolean
}

export interface SummaryCardProps {
    title: string;
    desc: string | number
    others: ReactNode
};
