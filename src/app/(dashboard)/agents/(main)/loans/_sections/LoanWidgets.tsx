import { ColItem } from '@/components/ui/PageHeader';
import { SendHorizontal } from 'lucide-react';
import React from 'react';

const LoanWidget = () => (
    <div className="flex items-baseline justify-between border-l-2 border-l-primary rounded-lg">
        <ColItem item1='' item2='' className1=''className2=''/>
        <span>
            <SendHorizontal size={20} className='text-primary'/>
        </span>
    </div>
)

const LoanWidgets = () => {
  return (
    <div>LoanWidgets</div>
  )
}

export default LoanWidgets
