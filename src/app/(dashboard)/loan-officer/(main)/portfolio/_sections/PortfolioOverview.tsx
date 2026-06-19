import Button from '@/components/primitives/buttons/Button'
import Typography from '@/components/primitives/Typography'
import { Flex, FlexBox, FlexCol } from '@/components/ui/ui-layout'
import { cn } from '@/lib/utils'
import { Banknote, MapPinCheck, PrinterCheck } from 'lucide-react'
import React from 'react'

const PortfolioOverview = () => {
  return (
    <FlexBox className={cn('flex-col md:flex-row md:justify-between')}>
        <Flex className='gap-2.5'>
            <Flex className='p-2.5 bg-[#F5F3F8] rounded-full'>
                <Typography weight='bold' color='active'>SP</Typography>
            </Flex>
            <FlexCol>
                <Flex className='gap-2.5'>
                    <Typography variant='h2' color='primary2'>Starlight Logistics</Typography>
                    <Typography variant='small' 
                    startIcon={<div className='w-2 h-2 rounded-full bg-primary'/>} className='px-3 py-1 bg-accent rounded-lg text-primary font-bold'>Active</Typography>
                </Flex>
                <Typography color='primary' startIcon={<MapPinCheck size={14} />}>Victoria Island, Lagos, Nigeria</Typography>
            </FlexCol>
        </Flex>
        <Flex className='gap-4'>
            <Button variant='ghost' startIcon={<PrinterCheck size={16}/>} className='border font-bold'>Print Schedule</Button>
            <Button className='font-bold' startIcon={<Banknote size={20} color='white'/>}>Log Payment</Button>
        </Flex>
    </FlexBox>
  )
}

export default PortfolioOverview;
