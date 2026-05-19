import { ColItem } from '@/components/ui/PageHeader';
import { SendHorizontal } from 'lucide-react';
import React from 'react';

type LProps = {
    label: string;
    val: string;
    borderColor: string;
    textColor: string;
    icon?: React.ReactNode
}

export const LoanWidget = ({label, val, borderColor, textColor, icon}: LProps) => (
    <div className={`flex items-end justify-between border-l-4 rounded-sm p-4 shadow-sm bg-card ${borderColor}`}>
        <ColItem item1={label} item2={val} className1='text-[#546474] text-sm' className2={`text-[24px] ${textColor}`}/>
        <span className='h-full flex'>
            {icon}
        </span>
    </div>
)

