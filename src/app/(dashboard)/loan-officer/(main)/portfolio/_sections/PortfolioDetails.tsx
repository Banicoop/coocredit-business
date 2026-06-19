'use client';

import { Tabs } from '@/components/ui/Tabs';
import { Grid } from '@/components/ui/ui-layout';
import PortfolioSummary from '../tabs/PortfolioSummary';
import { useState } from 'react';
import RecentInstallment from '../tabs/RecentInstallment';



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

    // const [active, setActive] = useState('')

  return (
    <Grid className='gap-5'>
        <Tabs items={tabs} defaultValue='summary' />
        <PortfolioSummary/>
        <RecentInstallment/>
    </Grid>
  )
}

export default LoanPortfolioDetails;
