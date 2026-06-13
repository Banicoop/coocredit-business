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


export const ActivityCard = () => (
    <Flex className="gap-2 items-start">
        <Flex className="p-2 rounded-xl bg-card">
            <PlusCircle size={18} className="text-primary" />
        </Flex>
        <FlexCol>
            <Typography weight="semibold">Repayment Collected</Typography>
            <Typography color="primary">₦25,000 from Amina Bello</Typography>
            <Typography color="primary" variant="small">10:20 AM</Typography>
        </FlexCol>
    </Flex>
)
