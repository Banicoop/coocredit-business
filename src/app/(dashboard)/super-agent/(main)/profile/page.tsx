import Button from '@/components/primitives/buttons/Button';
import Typography from '@/components/primitives/Typography';
import { ColItem, PageHeader } from '@/components/ui/PageHeader';
import { Flex, Grid, GridItem } from '@/components/ui/ui-layout';
import { cn } from '@/lib/utils';
import { Binary, ChevronRight, CircleQuestionMark, DollarSign, FileText, FingerprintPattern, KeyRound, Monitor, PlusCircle, ShieldCheck, ShieldCogCorner, Wallet2 } from 'lucide-react';
import Image from 'next/image';


const SuperAgentProfilePage = () => {
  return (
    <Grid className='gap-5'>
      <PageHeader 
        title='Personal Ledger Hub' 
        description='Manage your professional credentials and financial reach.'
        actions={[
          {
            label: 'Export Profile'
          },
          {
            label: 'Edit Credentials',
            variant: 'primary'

          },
        ]}
      />

      <Grid className='md:grid-cols-2 lg:grid-cols-3 gap-7'>
        {/* PERSONAL DETAILS */}
        <Grid className='col-span-2 gap-8 grid-cols-2 h-fit'>
          <GridItem className='gap-5 grid-cols-2 p-8 col-span-2'>
            <Flex className='justify-between items-start col-span-2'>
              <ColItem 
                item1='Account Master File' 
                item2='VERIFIED PERSONAL DETAILS' 
                className1='text-primary2 font-semibold' 
                className2='text-ring font-semibold'/>
              <Typography weight='semibold' variant='small' color='active' className='py-1 px-2.5 rounded-md bg-accent'>Status: Active</Typography>
            </Flex>

              <ColItem 
                item1='FULL LEGAL NAME' 
                item2='Alex Sovereign Chukwu' 
                className1='text-ring font-semibold' 
                className2='text-ink font-semibold'/>
              <ColItem 
                item1='DIGITAL ADDRESS' 
                item2='a.sovereign@azure- meridian.com' 
                className1='text-ring font-semibold' 
                className2='text-ink font-semibold'/>
              <ColItem 
                item1='COMMUNICATION CHANNEL' 
                item2='+234 802 000 0000' 
                className1='text-ring font-semibold' 
                className2='text-ink font-semibold'/>
              <ColItem 
                item1='OPERATIONAL ZONE' 
                item2='Lagos Central' 
                className1='text-ring font-semibold' 
                className2='text-ink font-semibold'/>
          </GridItem>

          {/* CARD CONTAINER */}
          <Grid className='p-6 bg-tertiary border rounded-lg gap-4'>
            <ColItem item1='Card Vault' item2='Manage connected payment instruments.' className1='text-[20px] text-primary2' className2='text-ring'/>
            <Image src='/icons/debit-card.svg' alt='DEBIT CARD' width={280} height={100} className='w-full h-auto' />
            <Typography className='justify-center cursor-pointer' color='active' weight='semibold' startIcon={<PlusCircle size={18}/>}>Provision New Card</Typography>
          </Grid>

          <GridItem className='gap-6 p-6'>
            <ColItem item1='Floating Liquidity' item2='Real-time balance across ledgers.' className1='text-[20px] text-primary2' className2='text-ring'/>
            <Flex className='gap-4 p-4 bg-accent rounded-lg'>
              <div className="p-2.5 bg-card rounded-full">
                <Wallet2 size={20} className='text-primary'/>
              </div>
              <ColItem item1='Naira Vault' item2='₦2,450,000.00' className1='text-ring' className2='text-primary2 font-bold text-[20px]'/>
            </Flex>
            <Flex className='gap-4 p-4 bg-accent rounded-lg'>
              <div className="p-2.5 bg-card rounded-full">
                <DollarSign size={20} className='text-primary'/>
              </div>
              <ColItem item1='COMMISSION POOL' item2='₦2,450,000.00' className1='text-ring' className2='text-primary2 font-bold text-[20px]'/>
            </Flex>

            <Button size='lg' className='bg-primary2 font-semibold'>Withdraw Liquidity</Button>
          </GridItem>
        </Grid>

        {/* SECURITY */}
        <Grid className='gap-8 h-fit'>
          {/* DEVICES FORTIFICATION */}
          <Grid className='gap-4 p-8 bg-tertiary border rounded-lg'>
            <ColItem item1='Fortification' item2='Biometric and credential security.' className2='text-ring' className1='text-primary2 text-[20px]'/>

            <Button size='lg' variant='light' startIcon={<FingerprintPattern size={20} className='text-primary mt-1'/>} endIcon={<ChevronRight size={20}/>} className='font-bold text-primary2 justify-start text-[12px]'>Touch ID Authentication</Button>
            <Button size='lg' variant='light' startIcon={<Binary size={20} className='text-primary mt-1'/>} endIcon={<ChevronRight size={20}/>} className='font-bold text-primary2 justify-start text-[12px]'>Transaction PIN</Button>
            <Button size='lg' variant='light' startIcon={<KeyRound size={20} className='text-primary mt-1'/>} endIcon={<ChevronRight size={20}/>} className='font-bold text-primary2 justify-start text-[12px]'>Change Password</Button>
            <Button size='lg' variant='light' startIcon={<Monitor size={20} className='text-primary mt-1'/>} endIcon={<ChevronRight size={20}/>} className='font-bold text-primary2 justify-start text-[12px]'>Device Management (4)</Button>
          </Grid>

        {/* Archive & Legals */}
        <GridItem className={cn('gap-4 p-8')}>
          <ColItem item1='Archive & Legals' item2='Access contracts and compliance logs.' className2='text-ring' className1='text-primary2 text-[20px]'/>

          <Typography startIcon={<FileText size={20}/>} color='primary' weight='semibold'>Agent Agreement 2024</Typography>
          <Typography startIcon={<ShieldCheck size={20}/>} color='primary' weight='semibold'>Compliance Certificate</Typography>
          <Typography startIcon={<ShieldCogCorner size={20}/>} color='primary' weight='semibold'>Privacy Protocols</Typography>
          <Typography startIcon={<CircleQuestionMark size={20}/>} color='primary' weight='semibold'>Service Desk Escalation</Typography>

          <ColItem 
            item1='VERSION 4.2.0-PRIME'
            item2='Revoke All Sessions'
            className1='text-ring'
            className2='text-chart-5 font-bold cursor-pointer'
            className={cn('justify-center items-center gap-2.5 pt-4 border-t-2 border-t-[#F1F5F9]')}/>
        </GridItem>
        </Grid>
      </Grid>

      <Flex className='justify-between py-5 border-t-2 '>
        <Flex className='gap-4'>
          <Typography variant='small' weight='semibold' color='primary'>© 2024 Azure Meridian Ledger Systems •</Typography>
          <Typography variant='small' weight='semibold' color='primary'>End-to-End Encryption Enabled </Typography>
        </Flex>
        <Flex className='gap-4'>
          <Typography variant='small' weight='semibold' color='primary'>API ACCESS</Typography>
          <Typography variant='small' weight='semibold' color='primary'>SYSTEM STATUS</Typography>
          <Typography variant='small' weight='semibold' color='primary'>TERMINATE ACCESS</Typography>
        </Flex>
      </Flex>
    </Grid>
  )
}

export default SuperAgentProfilePage;
