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

type AgentType = 'pending' | 'active' | 'inactive';


const AgentCard = ({type}: {type: AgentType}) => {

    const router = useRouter();

    const handleClick = () => {
        if(type === 'active'){
            router.push('/super-agent/team/id')
        } else {
            return;
        }
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
                    color={type === 'active' ? 'active': type === 'inactive' ? 'destructive': 'pending'} 
                    weight='semibold' 
                    startIcon={<div className={`w-2 h-2 rounded-full ${type === 'pending' ? 'bg-chart-5': type === 'active' ? 'bg-primary': 'bg-destructive'}`}/>} 
                    className='bg-muted p-1 px-4 rounded-md w-fit capitalize'>{type === 'pending' ? 'KYC PENDING': `${type}`}</Typography>
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
                item1={type === 'active' ? 'Comm. Earned': type === 'pending' ? 'DOCUMENTS': 'LAST ACTIVE'} 
                item2={type === 'active' ? '₦245,000': type === 'pending' ? 'Pending Review': '8 Days Ago'} 
                className1='text-ring font-bold capitalize' 
                className2={`font-bold ${type === 'active' ? 'text-primary': type === 'pending' ? 'text-chart-5': 'text-destructive'}`}
                />
        </Flex>

        <Flex className='justify-between py-4'>
            <Image src={agent} alt='Agents' width={50} height={16} />
            <Button 
            onClick={handleClick}
            className={type === 'active' ? 'bg-primary' : 
                type === 'pending' ? 'bg-chart-5': 'bg-destructive'}
            endIcon={<ArrowRightIcon size={18} />}>
                {type === 'active' ? 'View Performance':  type === 'inactive' ? 'Re-engage Agent': 'Complete KYC'}
            </Button>
        </Flex>
    </FlexBox>
  )
}

export default AgentCard;
