import Typography from "@/components/primitives/Typography";
import { ProgressBar } from "@/components/ui/ProgessBar";
import { Flex, FlexBox, FlexCol } from "@/components/ui/ui-layout";
import { CardProps } from "../types";
import { PlusCircle } from "lucide-react";


export const Card = ({title, content, desc, value, className}: CardProps) => (
    <FlexBox className='flex-col gap-2'>
        <Typography color='primary'>{title}</Typography>
        <div>{content}</div>
        <Typography variant='small' color='primary'>{desc}</Typography>
        <ProgressBar value={value} className={className}/>
    </FlexBox>
)

