import { TitleText } from "@/components/primitives/buttons/BackButton";
import Typography from "@/components/primitives/Typography"
import { Flex, FlexBox, FlexCol, Grid, GridItem } from "@/components/ui/ui-layout"
import { HousePlus, UserCheck2Icon } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";

import customer from '@/assets/images/cust-verification.png'
import shop from '@/assets/images/shop-location.png'


type ScoreCardProps = {
    label: string;
    val: string;
    color: string;
    border: string;
    icon?: ReactNode;
}


export const BankInfo = () => {
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


const Item = ({label, val}:{label: string, val: string}) => (
     <Flex className="justify-between border-b py-1">
        <Typography color="primary">{label}</Typography>
        <Typography weight="semibold">{val}</Typography>
    </Flex>
)


export const BioData = () => {
    return(
        <GridItem className="gap-2.5 h-fit">
            <Typography variant="p" weight="bold" startIcon={<UserCheck2Icon size={20}/>}>Bio-data Summary</Typography>

            <Item label="FullName" val="Amara Jennifer Okafor"/>
            <Item label="Phone" val="+234 812 345 6789"/>
            <Item label="Email" val="amara.o@agrifund.ng"/>
            <Item label="Marital Status" val="Married (3 Dependents)"/>
        </GridItem>
    )
}


export const FieldAssets = () => {
    return(
          <Grid className={`gap-4 rounded-lg px-4 py-6 grid grid-cols-2 h-fit`}>
            <TitleText label='Fieldwork Evidence' className='col-span-2'/>

            <Image src={customer} alt='' className='h-40 w-full rounded-lg object-cover' />
            <Image src={shop} alt='' className='h-40 w-full rounded-lg object-cover'/>
        </Grid>
    )
}


export const FinCard = ({label, val, className}: {label: string, val: string, className?: string}) => {
    return(
        <GridItem>
            <Typography variant="p" color="primary">{label}</Typography>
            <Typography variant="h4" weight="semibold" className={`${className}`}>{val}</Typography>
        </GridItem>
    )
}