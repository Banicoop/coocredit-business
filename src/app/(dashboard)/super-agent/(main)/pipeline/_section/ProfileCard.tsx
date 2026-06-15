import { FlexBox, FlexCol, Grid } from '@/components/ui/ui-layout';
import Image from 'next/image';
import { Images } from '@/assets/constant/images';
import { ColItem } from '@/components/ui/PageHeader';


const InfoCard = ({label, info}: {label: string, info: string}) => (
    <ColItem 
        item1={label} 
        item2={info}
        className1='text-[12px] text-ring font-light'
        className2='text-primary2 font-semibold text-[16px]'
    />
)



const ProfileCard = () => {
  return (
    <FlexBox className='gap-4'>
        <Image src={Images.agent} width={100} height={40} alt='CUSTOMER' className='rounded-lg h-fit'/>
        <FlexCol className='gap-2.5 w-full'>
            <ColItem 
                item1='Adeola Catherine Bakare' 
                item2='CEO, Bakare Textile & Logistics Ltd.'
                className1='text-[20px] text-primary2'
                className2='text-ring'
            />

            <Grid className='grid-cols-3 w-full gap-y-5'>
                <InfoCard label='CUSTOMER ID' info='CUST-NG-55210'/>
                <InfoCard label='CREDIT SCORE' info='768'/>
                <InfoCard label='TOTAL LOAN AMOUNT' info='₦4,500,000.00'/>
                <InfoCard label='LOAN TENURE' info='12 months'/>
                <InfoCard label='INTEREST RATE (ANNUAL)' info='4% Monthly'/>
                <InfoCard label='Due Date' info='Nov 15, 2023'/>
            </Grid>
        </FlexCol>
    </FlexBox>
  )
}

export default ProfileCard;
