import { ColItem } from '@/components/ui/PageHeader';
import { Flex, FlexCol, Grid } from '@/components/ui/ui-layout';
import Typography from '@/components/primitives/Typography';
import { cn } from '@/lib/utils';
import { LiveLedgerProps, TargetCardProps } from '../types';


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


export const LiveLedger = ({title, activity, items, className}: LiveLedgerProps) => {
    return(
        <Grid className={cn('gap-3 p-4 rounded-lg bg-[#EAF5FF] border', className)}>
            <Grid className='grid-cols-[1fr_auto] items-center justify-between'>
                <Typography variant='h3' color='primary2'>{title}</Typography>
                <div>{activity}</div>
            </Grid>

            <Grid className='md:grid-cols-2 gap-4'>
                {items.map((item) => (
                    <Grid className='grid-cols-[1fr_auto] items-center justify-between' key={item.info}>
                        <Flex className='gap-2'>
                            <Flex className='p-2.5 rounded-full bg-card'>
                                {item.icon}
                            </Flex>
                            <ColItem 
                                item1={item.info} 
                                item2={`${item.desc} • ${item.timestamp}`}
                                className1='text-primary2 font-semibold text-[18px]'
                                className2='text-ring'
                            />
                        </Flex>
                        <Typography weight='semibold' color='primary'>{item.id}</Typography>
                    </Grid>
                ))
                }
            </Grid>
        </Grid>
    )
}
