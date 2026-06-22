'use client';

import { Flex, FlexBox, FlexCol } from '@/components/ui/ui-layout';
import Image from 'next/image';
import Typography from '@/components/primitives/Typography';
import { ArrowRightIcon, EllipsisVertical } from 'lucide-react';
import { ColItem } from '@/components/ui/PageHeader';

import user from '@/assets/images/user.png';
import agent from '@/assets/svgs/agents.svg';
import Button from '@/components/primitives/buttons/Button';
import { useRouter } from 'next/navigation';
import { useAgentStatus } from '@/store/useAgentStatus';



const AgentCard = () => {

    const { status } = useAgentStatus()

    const router = useRouter();

    const handleClick = () => {
        router.push('/super-agent/team/id');
    }

  return (
    <FlexBox className='flex-col gap-1'>
        <Flex className='justify-between items-start'>
            <Flex className='gap-2'>
                <Image src={user} alt='Agent' width={70} height={70} className='rounded-full'/>
                <FlexCol className='gap-1'>
                    <ColItem 
                        item1='Ademola Adebayo ' 
                        item2='Agent ID: AGT-992384' 
                        className1='font-bold text-lg' 
                        className2='text-ring text-xs'/>
                    <Typography 
                    color={status === 'active' ? 'active': status === 'inactive' ? 'destructive': 'pending'} 
                    weight='semibold' 
                    startIcon={<div className={`w-2 h-2 rounded-full ${status === 'pending' ? 'bg-chart-5': status === 'active' ? 'bg-primary': 'bg-destructive'}`}/>} 
                    className='bg-muted p-1 px-4 rounded-md w-fit capitalize'>{status === 'pending' ? 'KYC PENDING': `${status}`}</Typography>
                </FlexCol>
            </Flex>
            <EllipsisVertical size={24} className='text-ring cursor-pointer'/>
        </Flex>

        <hr className='h-0.5 mt-8'/>

        <Flex className='justify-between border-b py-4'>
            <ColItem 
                item1='Volume (MTD)' 
                item2='₦2,450,000' 
                className1='text-ring font-bold capitalize' 
                className2='text-accent-foreground font-bold'/>
            <ColItem 
                item1={status === 'active' ? 'Comm. Earned': status === 'pending' ? 'DOCUMENTS': 'LAST ACTIVE'} 
                item2={status === 'active' ? '₦245,000': status === 'pending' ? 'Pending Review': '8 Days Ago'} 
                className1='text-ring font-bold capitalize' 
                className2={`font-bold ${status === 'active' ? 'text-primary': status === 'pending' ? 'text-chart-5': 'text-destructive'}`}
                />
        </Flex>

        <Flex className='justify-between py-4'>
            <Image src={agent} alt='Agents' width={50} height={16} />
            <Button 
            onClick={handleClick}
            className={status === 'active' ? 'bg-primary' : 
                status === 'pending' ? 'bg-chart-5': 'bg-destructive'}
            endIcon={<ArrowRightIcon size={18} />}>
                {status === 'active' ? 'View Performance':  status === 'inactive' ? 'Re-engage Agent': 'Complete KYC'}
            </Button>
        </Flex>
    </FlexBox>
  )
}

export default AgentCard;
