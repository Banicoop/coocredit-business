import { ColItem } from '@/components/ui/PageHeader';
import { SendHorizontal } from 'lucide-react';
import React from 'react';

export const LoanWidget = () => (
    <div className="flex items-end justify-between border-l-2 border-l-primary rounded-sm p-4 shadow-sm bg-card">
        <ColItem item1='SUBMITTED' item2='47' className1='' className2='text-[24px]'/>
        <span className='h-full flex'>
            <SendHorizontal size={20} className='text-primary mt-auto'/>
        </span>
    </div>
)

