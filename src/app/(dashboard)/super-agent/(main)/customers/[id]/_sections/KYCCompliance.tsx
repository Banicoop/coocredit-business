import Typography from '@/components/primitives/Typography';
import { Flex, FlexCol, GridItem } from '@/components/ui/ui-layout';
import { CheckCircle2, CircleEllipsis } from 'lucide-react';
import React from 'react'

const Card = ({label, isUploaded = false}: {label: string, isUploaded?: boolean}) => (
    <Flex className={`p-2.5 rounded-lg gap-2.5 justify-between ${isUploaded ? 'bg-accent': 'border border-dashed border-chart-2'}`}>
        
        <Typography 
            startIcon={isUploaded ?
        <CheckCircle2 size={24} className='text-primary font-bold'/>: 
        <CircleEllipsis size={24} className='text-primary font-bold'/>} weight='semibold'>{label}</Typography>
        <Typography color={isUploaded ? 'primary': 'active'} weight='semibold'>{isUploaded ? 'Verfied': 'Upload'}</Typography> 
    </Flex>
)


export const FinScore = () => {
    return(
        <GridItem className='gap-4'>
            <Typography color='primary2' weight='semibold'>Financial Scoring</Typography>
            <FlexCol className='w-full items-center justify-center'>
                <FlexCol className='w-25 h-25 items-center justify-center rounded-full border-4 border-primary'>
                    <Typography variant='h1'>A+</Typography>
                    <Typography variant='small'>Premium</Typography>
                </FlexCol>
            </FlexCol>
            <Typography className='text-center' color='primary'>Based on credit utilization, repayment speed, and operational longevity.</Typography>
        </GridItem>
    )
}

const KYCCompliance = () => {
  return (
    <GridItem className='gap-4'>
        <Flex className='justify-between'>
            <Typography color='primary2' weight='semibold'>KYC Compliance</Typography>
            <Typography color='primary2' weight='semibold' className='py-1 px-2.5 bg-accent rounded-lg text-lg' >95% Complete</Typography>
        </Flex>
        <Card label='Business Registration (CAC)' isUploaded/>
        <Card label='Tax Clearance Certificate' isUploaded/>
        <Card label='Utility Bill (Last 3 Months)' />
    </GridItem>
  )
}

export default KYCCompliance;
