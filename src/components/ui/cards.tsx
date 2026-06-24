import { FC } from "react"
import Typography from "../primitives/Typography"
import { Flex, FlexBox, FlexCol, GridItem } from "./ui-layout"
import { ActivityCardProps, CardWidgetProps, PipeLineProps, LoanOfficerCardWidgetProps } from "@/types/types"
import { cn } from "@/lib/utils"
import { PlusCircle, TrendingDown, TrendingUp } from "lucide-react"

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



 export const CardWidget:FC<CardWidgetProps> = ({icon, label, info, num, others, className}) => {

   return(
    <FlexBox className={cn('flex-col min-h-32', className)}>
      <Flex className='justify-between mb-1.5 items-start'>
        <Flex className='p-2 rounded-full bg-accent h-fit'>
          {icon}
        </Flex>
        {info && <div>{info}</div>}
      </Flex>
      <Typography color='primary' weight='medium'>{label}</Typography>
      <Typography variant='h3' color='primary2'>{num}</Typography>
      {others && <div>{others}</div>}
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


export const LoanOfficerCardWidget:React.FC<LoanOfficerCardWidgetProps> = ({icon, percent, title, amount, desc, isNegative, className, suffix}) => {
  return (
    <GridItem className={cn('gap-2 p-6', className)}>
        <Flex className='justify-between'>
            <Flex className='p-2.5 rounded-full bg-accent'>
                {icon}
            </Flex>
        <Typography 
            startIcon={isNegative ? <TrendingDown size={14}/>: <TrendingUp size={14}/>}
            color={isNegative ? 'destructive': 'success'} 
            variant='small' 
            className='py-1 px-2 rounded-lg bg-accent font-semibold'>{isNegative ? '-': '+'} {percent} {suffix && '%'}</Typography>
        </Flex>
        <Typography color='primary'>{title}</Typography>
        <Typography color='primary2' variant='h2'>{amount}</Typography>
        <Typography variant='small' color='primary'>{desc}</Typography>
    </GridItem>
  )
}
