import { ReactNode } from "react";

export interface TargetCardProps {
    percent: number;
    label: string;
    val: string;
    desc: ReactNode
}

export interface Card {
    info: string;
    desc: string;
    id: string;
    icon: ReactNode
    timestamp: string;
}

export interface LiveLedgerProps {
    title: string;
    activity: ReactNode;
    className: string
    items: Card[];
}