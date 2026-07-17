import { TitleText } from '@/components/primitives/buttons/BackButton';
import Typography from '@/components/primitives/Typography';
import { ColItem, PageHeader } from '@/components/ui/PageHeader';
import { Flex, FlexCol, Grid } from '@/components/ui/ui-layout';
import { Briefcase, CircleAlert, DollarSign, MapPinCheck, MapPinCheckInsideIcon, User, UserRoundCheck } from 'lucide-react';
import Image from 'next/image';
import demoImage from '@/assets/svgs/map.png';
import { BankInfo, FieldAssets, ScoreCard } from '@/app/(dashboard)/agent/(main)/customers';



const LeadReviewPage = () => {

  return (
    <FlexCol className='gap-5'>
        <PageHeader title='Lead Review'/>
        <Flex className='bg-[#DBEAFE] rounded-lg py-4 px-2.5 md:px-6 w-full flex-col md:flex-row gap-4 justify-between'>
            <FlexCol className='gap-2.5'>
                <Flex className='gap-2.5'>
                    <Typography variant='small' color='active' className='bg-[#016AFF1A] px-1 py-0.5' weight='semibold'>KYC VERIFIED</Typography>
                    <Typography variant='small' weight='semibold' className='bg-[#A437001A] text-[#A43700] px-1 py-0.5'>PRIORITY REVIEW</Typography>
                </Flex>
                <Typography variant='h3'>Adeola Olatunji</Typography>
                <Typography variant='p' color='primary' startIcon={<MapPinCheck size={16}/>}>Lagos Mainland, Yaba District</Typography>
            </FlexCol>

            <Flex className='gap-4'>
                <ScoreCard label='LEAD SCORE' val='30 / 820' color='text-primary' border='border-l-primary' />
                <ScoreCard label='EST. CREDIT CAP' val={`₦300,000`} color='text-[#A43700]' border='border-l-[#A43700]' icon={<Briefcase size={18}/>}/>
            </Flex>
        </Flex>

        <Grid className='gap-4 grid-cols-1 lg:grid-cols-4'>
            {/* LEFT */}
            <Grid className='col-span-3 gap-4'>
                <Grid className='gap-2.5 bg-card rounded-lg shadow-sm px-4 py-6 grid grid-cols-3 h-fit'>
                    <TitleText label='Personal Identification' className='col-span-3'/>
                    <ColItem item1='FullName' item2='-' className1='' className2=''/>
                    <ColItem item1='National ID (NIN)' item2='-' className1='' className2=''/>
                    <ColItem item1='Phone Number' item2='-' className1='' className2=''/>
                    <ColItem item1='BUSINESS CATEGORY' item2='-' className1='' className2=''/>
                    <ColItem item1='PRIMARY PRODUCT' item2='-' className1='' className2=''/>
                    <ColItem item1='REVIEW DATE' item2='-' className1='' className2=''/>
                </Grid>

                <Grid className='gap-4 bg-card rounded-lg shadow-sm px-4 py-6 grid grid-cols-2 h-fit'>
                    <TitleText label='Financial Settlement Channels' className='col-span-2'/>

                    <BankInfo/>
                    <BankInfo/>
                </Grid>
                <FieldAssets />
            </Grid>


                {/* RIGHT */}
            <Grid className='col-span-1 gap-4'>
                <Grid className='bg-card rounded-lg shadow-sm p-4 grid h-fit'>
                    <TitleText label='Geographic Location'/>
                    <Image src={demoImage} alt='BUSINESS LOCATION IMAGE' className='w-full h-66'/>

                    <Flex className='gap-2'>
                        <MapPinCheckInsideIcon size={24}/>
                        <ColItem item1='Primary Residence' item2='Plot 42, Herbert Macaulay Way, Yaba' className1='text-[#0F1C2C]'/>
                    </Flex>

                    <Flex className='gap-2'>
                        <MapPinCheckInsideIcon size={20}/>
                        <ColItem item1='Distance to Branch' item2='2.4 km (Surulere Main Branch)' className1='text-ink'/>
                    </Flex>

                </Grid>
                <FlexCol className='gap-2 bg-primary p-3 rounded-sm' >
                    <Typography variant='p' startIcon={<CircleAlert size={20} />}  className='text-card'>Field Agent Assessment</Typography>
                    <Typography className='text-card italic' >
                        "Customer has a steady turnover of textile goods. Shop location is high-traffic. Recommended for the 'Merchant Growth' credit line with initial disbursement within 48 hours."
                    </Typography>
                    <hr className='h-1 bg-[#FFFFFF1A]'/>
                    <Typography startIcon={<UserRoundCheck size={16} />} className='text-card'>Agent: Udoh Iniedo</Typography>
                </FlexCol>
            </Grid>
        </Grid>
    </FlexCol>
  )
}

export default LeadReviewPage;

