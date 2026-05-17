import Typography from "@/components/primitives/Typography"
import { Flex, FlexBox, FlexCol } from "@/components/ui/ui-layout"
import { HousePlus } from "lucide-react";
import { ReactNode } from "react";


type ScoreCardProps = {
    label: string;
    val: string;
    color: string;
    border: string;
    icon?: ReactNode;
}


export const FinChannel = () => {
    return(
        <Flex className='bg-[#DBEAFE] p-4 rounded-lg gap-2.5'>
            <div className="p-2.5 bg-white text-primary rounded-full">
                <HousePlus size={24}/>
            </div>

            <FlexCol>
                <Typography weight='semibold' variant='p'>Zenith Bank PLC</Typography>
                <Typography color='primary'>2021****901 • Savings</Typography>
                <Typography className='text-[#16A34A]'>PRIMARY REPAYMENT</Typography>
            </FlexCol>
        </Flex>
    )
}

export const ScoreCard = ({label, val, color, icon, border}: ScoreCardProps) => (
    <FlexBox className={`flex-col shadow-sm border-l-4 h-20 px-4 w-36.25 ${border}`}>
        <Typography variant='small' color='primary'>{label}</Typography>
        <Typography variant='h4' startIcon={icon} className={`${color}`}>{val}</Typography>
    </FlexBox>
)
