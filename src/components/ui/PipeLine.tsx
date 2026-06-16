import { FC } from "react"
import Typography from "../primitives/Typography"
import { FlexCol } from "./ui-layout"
import { PipeLineProps } from "@/types/types"
import { cn } from "@/lib/utils"

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
