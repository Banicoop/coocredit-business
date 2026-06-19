'use client';

import { Tabs } from '@/components/ui/Tabs';
import { Grid } from '@/components/ui/ui-layout';
import { useState } from 'react';
import { PortfolioSummary, RecentInstallment } from '../(tabs)';



const tabs = [
    {
        label: 'Summary',
        value: 'summary'
    },
    {
        label: 'Repayment Schedule',
        value: 'repayment'
    },
    {
        label: 'Restructure',
        value: 'restructure'
    },
    {
        label: 'Transfer/Write-Off',
        value: 'write-off'
    },
]

const LoanPortfolioDetails = () => {

    const [activeTab, setActiveTab] = useState('summary');

  return (
    <Grid className='gap-5'>
        <Tabs items={tabs} defaultValue='summary' onChange={setActiveTab} />
        <PortfolioSummary/>
        <RecentInstallment/>
        {/* <LoanRestructure/>
        <LoanWriteOff/> */}
    </Grid>
  )
}

export default LoanPortfolioDetails;
