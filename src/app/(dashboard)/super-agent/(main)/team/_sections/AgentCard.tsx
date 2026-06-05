import { Flex, FlexBox, FlexCol } from '@/components/ui/ui-layout';
import Image from 'next/image';
import Typography from '@/components/primitives/Typography';
import { ArrowRightIcon, EllipsisVertical } from 'lucide-react';
import { ColItem } from '@/components/ui/PageHeader';

import user from '@/assets/images/user.png';
import agent from '@/assets/svgs/agents.svg';
import Button from '@/components/primitives/buttons/Button';


const AgentCard = () => {
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
                    <Typography color='success' weight='semibold' startIcon={<div className='w-2 h-2 rounded-full bg-chart-2'/>} className='bg-muted p-1 px-4 rounded-md w-fit'>Active</Typography>
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
                item1='Comm. Earned' 
                item2='₦245,000' 
                className1='text-ring font-bold capitalize' 
                className2='text-primary font-bold'
                />
        </Flex>

        <Flex className='justify-between py-4'>
            <Image src={agent} alt='Agents' width={50} height={16} />
            <Button variant='ghost' endIcon={<ArrowRightIcon size={18} className=''/>}>View Performance</Button>
        </Flex>
    </FlexBox>
  )
}

export default AgentCard;
