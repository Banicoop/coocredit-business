import { Flex, FlexCol } from "@/components/ui/ui-layout"
import { ItemProps, RiskEventCardProps } from "../types"
import Typography from "@/components/primitives/Typography"
import { ProgressBar } from "@/components/ui/ProgessBar"
import { cn } from "@/lib/utils"
import { Dumbbell } from "lucide-react"


export const RiskEventCard = ({icon, title, type, amount, info, time}: RiskEventCardProps) => {
    return(
        <Flex className='gap-2.5 p-2.5 bg-tertiary rounded-lg border'>
            <div className="w-13 h-13 flex items-center justify-center bg-card rounded-full">
                {icon}
            </div>
            <FlexCol>
                <Typography weight='semibold'>{title}</Typography>
                <Typography className='text-ring'>{type} - {amount}</Typography>
                <Typography variant='small' color='primary'><span className='text-primary uppercase font-semibold'>{info}</span>  • {time}</Typography>
            </FlexCol>
        </Flex>
    )
}

export const CashTransCard =  ({timeline, amount, percent, bgColor}: ItemProps) => (
    <FlexCol className='gap-2'>
      <Flex className='justify-between'>
        <Typography className='text-ring font-semibold'>{timeline}</Typography>
        <Typography color='primary2' weight='semibold'>₦ {amount}</Typography>
      </Flex>
      <ProgressBar value={percent} className={cn(bgColor)}/>
    </FlexCol>
)

