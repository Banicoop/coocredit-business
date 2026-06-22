import { BackButton } from '@/components/primitives/buttons/BackButton';
import { Flex, FlexBox, FlexCol, Grid, GridItem } from '@/components/ui/ui-layout';
import Image from 'next/image';
import Typography from '@/components/primitives/Typography';
import Button from '@/components/primitives/buttons/Button';
import { Download, Printer, Share2 } from 'lucide-react';
import { Images } from '@/assets/constant/images';
import { InfoItem } from '../../portfolio/(tabs)/PortfolioSummary';
import { PipeLine } from '@/components/ui/cards';
import { cn } from '@/lib/utils';
import { CreditScore, KYCVerification } from '../_sections/LoanReview';


const ApplicationDetails = () => {

  return (
    <Grid className='gap-6'>
        <BackButton label='Applications'/>

        {/* CUSTOMER PROFILE */}
        <FlexBox className='flex-col md:flex-row justify-between'>
          <Flex className='gap-2.5'>
            <Image src={Images.user} alt='USER' width={50} height={50} className='rounded-full object-cover' />
            <FlexCol className="flex flex-col gap-1">
              <Typography weight='semibold' variant='h6' endIcon={<span className='py-0.5 px-2 rounded-md bg-[#FFEDD5] text-[#C2410C] text-xs'>KYC Pending</span>}>Adebayor Olatunji</Typography>
              <Typography color='primary'>Application ID: #APP-2024-00234 • Submitted 2 hours ago</Typography>
            </FlexCol>
          </Flex>

          <Flex className='gap-2'>
            <Button variant='ghost' className='border' startIcon={<Printer size={16}/>}>Export PDF</Button>
            <Button variant='ghost' className='border' startIcon={<Share2 size={16} />}>Share</Button>
          </Flex>
        </FlexBox>

        {/* PIPELINE & MAP */}
        <Grid className='lg:grid-cols-3 gap-4'>
            <Grid className='lg:col-span-2 h-fit gap-5'>
              <GridItem className={cn('p-6 gap-2.5')}>
                <Typography variant='h6' weight='semibold' color='primary2'>Loan Request Overview</Typography>
                <Grid className='grid-cols-3 gap-2.5'>
                    <InfoItem title='REQUESTED AMOUNT' val='₦4,500,000'/>
                    <InfoItem title='PURPOSE' val='Business Expansion'/>
                    <InfoItem title='DURATION' val='24 Months @ 12.5% APR'/>
                </Grid>
                {/* PIPELINE */}
                <Flex>
                    <PipeLine label='SUBMISSION' num={1} className='bg-primary' numClassName='text-card font-semibold'/>
                    <PipeLine label='KYC REVIEW' num={2} className='bg-primary' numClassName='text-card font-semibold'/>
                    <PipeLine label='CREDIT AUDIT' num={3} className='bg-primary' numClassName='text-card font-semibold'/>
                    <PipeLine label='UNDERWRITING' num={4} className='bg-accent' numClassName='text-ring font-bold'/>
                    <PipeLine label='DISBURSEMENT' num={5} className='bg-accent' numClassName='text-ring font-bold' last/>
                </Flex>
              </GridItem>

              {/* UPLOADED DOCUMENTS */}
              <GridItem className='gap-4'>
                <Flex className='justify-between'>
                  <Typography>UPLOADED DOCUMENTS</Typography>
                  <Button variant='ghost' startIcon={<Download size={16}/>} className='border'>Download All</Button>
                </Flex>
                <Grid className='grid-cols-3 gap-4'>
                    <GridItem>
                      <Image src={Images.Idcard} alt='ID' className='w-full h-30 rounded-lg object-cover' />
                      <Typography variant='small' color='primary2' weight='semibold'>National_ID_Adebayor.jpg</Typography>
                      <Typography className='text-[10px]' color='primary'>VERIFIED • 1.2 MB</Typography>
                      <Button size='sm' variant='ghost' className='border mt-3'>View Document</Button>
                    </GridItem>
                    <GridItem>
                      <Image src={Images.tax} alt='ID' className='w-full h-30 rounded-lg object-cover' />
                      <Typography variant='small' color='primary2' weight='semibold'>Tax_Certificate_2023.pdf</Typography>
                      <Typography className='text-[10px]' color='primary'>VERIFIED • 0.8 MB</Typography>
                      <Button size='sm' variant='ghost' className='border mt-3'>View Document</Button>
                    </GridItem>
                    <GridItem>
                      <Image src={Images.statement} alt='ID' className='w-full h-30 rounded-lg object-cover' />
                      <Typography variant='small' color='primary2' weight='semibold'>Bank_Statement_Q4.pdf</Typography>
                      <Typography className='text-[10px]' color='primary'>PENDING REVIEW • 4.5 MB</Typography>
                      <Button size='sm' variant='ghost' className='border mt-3'>View Document</Button>
                    </GridItem>
                </Grid>

                <Flex className='justify-end items-end gap-4 mt-4'>
                  <Button variant='light' className={cn('border text-ring')}>Request Information</Button>
                  <Button variant='light' className={cn('border text-destructive border-destructive')}>Reject Application</Button>
                  <Button>Approve Application</Button>
                </Flex>
              </GridItem>
            </Grid>

            {/* COMPLIANCE & VERIFICATION */}
            <Grid className='gap-4'>
              <CreditScore/>
              <KYCVerification/>
            </Grid>
        </Grid>
    </Grid>
  )
}

export default ApplicationDetails;
