import Typography from "@/components/primitives/Typography";
import { ColItem } from "@/components/ui/PageHeader";
import { ProgressBar } from "@/components/ui/ProgessBar";
import { Flex, FlexBox, FlexCol } from "@/components/ui/ui-layout";
import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";


export const Card = () => (
    <FlexBox className='items-center justify-between'>
        <Flex className='gap-2'>
            <div className="p-2.5 bg-accent rounded-full">
                <AlertTriangle size={20} className='text-destructive'/>
            </div>
            <FlexCol>
                <Typography weight='semibold' color='primary2' endIcon={<span className='text-[10px] px-2 py-0.5 rounded-md bg-[crimson] text-card font-bold'>Suspicious</span>}>Unusual Rapid Outflow</Typography>
                <Typography>Merchant #8821 initiated ₦14,500,000 in split transfers within 120 seconds. Origin: Ikeja Hub.</Typography>
            </FlexCol>
        </Flex>

        <ColItem
            item1='₦ 14,500,000.00' 
            item2='2 mins ago' 
            className1='text-primary2' 
            className2='text-[10px] text-ring font-light'/>
    </FlexBox>
)


export const Card2 = ({label, val, className = 'bg-primary'}: {label: string, val: number, className?: string}) => (
    <Flex className="justify-between gap-2.5">
        <Typography color="primary" weight="semibold">{label}</Typography>
        <Flex className="gap-2.5 w-50">
            <ProgressBar value={val} className={cn(className)}/>
            <Typography color="primary2" weight="semibold">{val}%</Typography>
        </Flex>
    </Flex>
)