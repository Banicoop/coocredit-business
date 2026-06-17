import Typography from '@/components/primitives/Typography';
import Button from '@/components/primitives/buttons/Button'
import { Flex, FlexCol } from '@/components/ui/ui-layout';
import { Images } from '@/assets/constant/images';
import React from 'react'

const LoanOfficerOverview = () => {
  return (
    <FlexCol className='md:flex-row rounded-xl'>
        <FlexCol className='flex-1 lg:flex-[1.5] bg-primary2 py-6 px-8 rounded-tl-xl rounded-tr-xl md:rounded-tr-none md:rounded-bl-xl border-none gap-4'>
            <Typography color='light'>Good morning, Ebenezer</Typography>
            <Typography variant='p' className='text-card/60'>You have <strong className='text-card'>14 applications</strong> pending review and <strong className='text-card'>3 urgent</strong>  repayment alerts today.</Typography>
            <Flex className='gap-4'>
                <Button>New Loan Application</Button>
                <Button className='text-card/10 bg-card/20 border border-card/20'>View Daily Agenda</Button>
            </Flex>
        </FlexCol>
        <FlexCol 
            style={{
                flex: 1,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundColor: 'primary2',
                backgroundImage: `url(${Images.loanOfficerOverviewImage.src})`
            }}
            className='flex-1 bg-primary rounded-bl-xl md:rounded-bl-none md:rounded-tr-xl rounded-br-xl border-none relative'>
                <FlexCol className='bg-card/20 z-30 border border-card/10 p-4 rounded-lg absolute bottom-4 right-4'>
                    <Typography className='text-ring'>Market Indicator</Typography>
                    <Flex className='gap-2 items-baseline'>
                        <Typography weight='bold' color='light' variant='h3'>4.5%</Typography>
                        <Typography variant='small' color='success' className='mt-2'>-12%</Typography>
                    </Flex>
                    <Typography className='text-ring'>Fed Funds Target Rate</Typography>
                </FlexCol>
            </FlexCol>
    </FlexCol>
  )
}

export default LoanOfficerOverview;
