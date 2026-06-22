import { Images } from "@/assets/constant/images";
import Typography from "@/components/primitives/Typography";
import { ColItem } from "@/components/ui/PageHeader";
import { ProgressBar } from "@/components/ui/ProgessBar";
import { Flex, FlexCol, GridItem } from "@/components/ui/ui-layout";
import { cn } from "@/lib/utils";
import Image from "next/image";

const list = [
    {
        label : 'Identity Match',
        checked: true
    },
    {
        label : 'Address proof',
        checked: true
    },
    {
        label : 'Liveness Check',
        checked: false
    },
    {
        label : 'Watchlist Screening',
        checked: false
    },
]

const val = Math.round((700/850) * 100);


export const CreditScore = () => {
  return (
    <FlexCol className={cn("rounded-lg border bg-white")}>
        <Typography color="primary2" weight="semibold" variant="h3" className="text-center py-2 flex justify-center">Credit Score</Typography>
        <FlexCol className="items-center justify-center p-5">
            <Flex className="gap-2 w-full">
                <ProgressBar value={val} className="bg-primary"/>
                <Typography variant="p" color="active" weight="semibold">{val}%</Typography>
            </Flex>
            <Typography variant="small" color="primary2" weight="semibold">700 out of 850</Typography>
        </FlexCol>
        <FlexCol className="gap-2 bg-accent w-full p-5 rounded-b-lg">
            <ColItem item1="Bureau Report Status" item2="Clear" className="flex-row justify-between border-b" className1="text-ring" className2="text-chart-2 font-semibold"/>
            <ColItem item1="Debt-to-Income Ratio" item2="32%" className="flex-row justify-between border-b" className1="text-ring"/>
            <ColItem item1="Total Active Loans" item2="1" className="flex-row justify-between border-b" className1="text-ring"/>
        </FlexCol>
    </FlexCol>
  )
}



export const KYCVerification = () => {
    return(
        <GridItem className={cn('p-6 gap-2.5')}>
            <Typography variant="h3" weight="bold" color="primary2">KYC Verification</Typography>
            {list.map((d) => (
                <Flex key={d.label} className="gap-1.5">
                    <input type="checkbox" defaultChecked={d.checked} />
                    <Typography color="primary" className="text-lg">{d.label}</Typography>
                </Flex>
            ))}
            <hr className="h-px"/>
            <Typography color="primary" variant="h4">Selfie Match</Typography>
            <Image src={Images.agent} alt="SELFIE PHOTO" className="rounded-lg object-cover w-full h-30"/>
        </GridItem>
    )
}
