import { ReactNode } from "react";

export interface ItemProps {
  timeline: string;
  amount: string;
  percent: number;
  bgColor: string
}

export interface RiskEventCardProps {
    icon: ReactNode 
    title: string; 
    type: string; 
    amount: string 
    info: string 
    time: string
}