import { FC } from "react"
import Typography from "../primitives/Typography"
import { Flex, FlexBox, FlexCol } from "./ui-layout"
import { ActivityCardProps, CardWidgetProps, PipeLineProps } from "@/types/types"
import { cn } from "@/lib/utils"
import { PlusCircle } from "lucide-react"

export const PipeLine:FC<PipeLineProps> = ({className, num, numClassName, label, last, stage, lastClassName}) => {
  return(
  <FlexCol className='gap-2.5 justify-center w-full'>
    <div className="flex items-center w-full">
      <div className={`h-10 max-w-10 w-full rounded-full text-center flex items-center justify-center ${className}`}>
        <Typography variant='h6' weight='bold' className={`text-center mb-1 ${numClassName}`}>{num}</Typography>
      </div>
      {!last && <hr className={cn('h-0.4 w-full bg-[#E5EFFF] mt-1', lastClassName)}/>}
    </div>
    <FlexCol>
        <Typography weight='semibold'>{label}</Typography>
        <Typography variant='small' color='primary'>{stage}</Typography>
    </FlexCol>
  </FlexCol>
)}



 export const CardWidget:FC<CardWidgetProps> = ({icon, label, info, num}) => {

   return(
    <FlexBox className='flex-col h-32'>
      <Flex className='justify-between mb-1.5 items-start'>
        <Flex className='p-2 rounded-full bg-accent h-fit'>
          {icon}
        </Flex>
        {info && <div>{info}</div>}
      </Flex>
      <Typography color='primary' weight='medium'>{label}</Typography>
      <Typography variant='h3' color='primary2'>{num}</Typography>
    </FlexBox>
    )
 }
 

export const ActivityCard = ({
    title,
    description,
    time,
    icon = <PlusCircle size={18} className="text-primary" />
}: ActivityCardProps) => (
    <Flex className="gap-2 items-start">
        <Flex className="p-2 rounded-xl bg-card">
            {icon}
        </Flex>

        <FlexCol>
            <Typography weight="semibold">{title}</Typography>
            <Typography color="primary">{description}</Typography>
            <Typography color="primary" variant="small">
                {time}
            </Typography>
        </FlexCol>
    </Flex>
);

