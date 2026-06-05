import Typography from '@/components/primitives/Typography'
import { Flex, GridItem } from '@/components/ui/ui-layout'
import Image from 'next/image'
import user from '@/assets/images/user.png'
import { ColItem } from '@/components/ui/PageHeader'
import { ShieldCheckIcon, MessageSquareText, ScrollText, SquareArrowLeft, SquareCheck } from 'lucide-react'
import { FinActionsCards } from './cards'

export const RelatManager = () => {
  return (
    <GridItem className='gap-2'>
        <Typography color='primary' weight='semibold'>RELATIONSHIP MANAGER</Typography>
        <Flex className='gap-x-2.5'>
            <Image src={user} alt='USER' width={35} height={35} />
            <ColItem 
                item1='Chioma Adebayo' 
                item2='Senior Portfolio Lead' 
                className1='text-ink font-bold' 
                className2='text-ring'/>
            <Flex className='p-2.5 rounded-full bg-accent '>
                <MessageSquareText size={24} className='text-brand'/>
            </Flex>
        </Flex>
    </GridItem>
  )
}


export const FinActions = () => {
  return (
    <FinActionsCards 
        title='FINANCIAL ACTIONS'
        actions={[
            {label: 'Statement', icon: <ScrollText size={24} className='text-primary'/>, },
            {label: 'Extend Credit', icon: <SquareCheck size={24} className='text-primary'/>, },
            {label: 'Audit KYC', icon: <ShieldCheckIcon size={24} className='text-primary'/>, },
            {label: 'Risk Profile', icon: <SquareArrowLeft size={24} className='text-primary'/>, }
        ]}
        />
  )
}

