import { ColItem } from '@/components/ui/PageHeader';
import { Flex, FlexCol, Grid } from '@/components/ui/ui-layout';
import { TrendingUp } from 'lucide-react';
import Typography from '@/components/primitives/Typography';
import { ReactNode } from 'react';

interface TargetCardProps {
    percent: number;
    label: string;
    val: string;
    desc: ReactNode
}

export const TargetCard = ({percent, label, val, desc}: TargetCardProps) => {
    return(
        <Grid className='grid-cols-[1fr_auto] items-center'>
            <Flex className='w-22 h-22 rounded-full border-4 border-primary justify-center'>
                <Typography weight='semibold' color='primary2' variant='h3' className='text-center'>{percent}%</Typography>
            </Flex>
            <FlexCol className='gap-2.5'>
                <ColItem 
                    item1={label}
                    item2={val}
                    className1='text-primary2 font-semibold'
                    className2='text-ring'
                />
                <div>{desc}</div>
                {/* <Typography color='success' startIcon={<TrendingUp size={14}/>} variant='small'>{desc}</Typography> */}
            </FlexCol>
        </Grid>
)}