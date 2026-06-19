import Typography from '@/components/primitives/Typography';
import { ColItem } from '@/components/ui/PageHeader';
import { FlexCol, Grid, GridItem } from '@/components/ui/ui-layout';
import React from 'react'
import { InfoItem } from '../../portfolio/(tabs)/PortfolioSummary';

const RepaymentCards = () => {
  return (
    <Grid className='grid-cols-3 gap-4'>
        <GridItem className='gap-2.5 border-t-4 border-t-primary'>
            <Typography variant='small' color='primary' weight='semibold'>CURRENT COLLECTION RATE</Typography>
            <FlexCol className='w-40 h-40 rounded-full justify-center items-center border-4 border-primary mx-auto'>
                <Typography variant='h1' color='primary2'>88.2%</Typography>
                <Typography variant='small' className='py-1 px-2.5 bg-accent rounded-md text-primary'>+2.4% vs last month</Typography>
            </FlexCol>
            <hr className='h-px'/>
            <Grid className='grid-cols-2'>
                <InfoItem title='Target' val='92.0%'/>
                <InfoItem title='Forecast' val='89.5%'/>
            </Grid>
        </GridItem>
    </Grid>
  )
}

export default RepaymentCards;
