import { PageHeader } from '@/components/ui/PageHeader';
import { Grid } from '@/components/ui/ui-layout';
import { Plus } from 'lucide-react';
import React from 'react'

const PortfolioPage = () => {
  return (
    <Grid className='gap-6'>
      <PageHeader 
        title='Portfolio Quality' 
        description='Real-time health monitoring of branch loan assets and risk concentration.'
        actions={[
          {
            label: 'New Transaction',
            variant: 'primary',
            icon: <Plus size={18}/>
          },
        ]}
      />
    </Grid>
  )
}

export default PortfolioPage;
