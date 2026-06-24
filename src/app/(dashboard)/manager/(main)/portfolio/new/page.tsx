'use client';

import { BackButton } from '@/components/primitives/buttons/BackButton';
import Button from '@/components/primitives/buttons/Button';
import CustomSelect from '@/components/primitives/inputs/CustomSelect';
import { TextArea } from '@/components/primitives/inputs/TextArea';
import { TextField } from '@/components/primitives/inputs/TextField';
import Typography from '@/components/primitives/Typography';
import { PageHeader } from '@/components/ui/PageHeader';
import { Tabs } from '@/components/ui/Tabs';
import { Flex, FlexCol, Grid } from '@/components/ui/ui-layout';
import { cn } from '@/lib/utils';
import { Info, UserCheck2 } from 'lucide-react';
import { useState } from 'react';

const tabs = [
    {label: 'Inflow', value: 'inflow'},
    {label: 'Outflow', value: 'outflow'},
]


const NewTransactionPage = () => {

    const [amount, setAmount] = useState(0.00)

  return (
    <Grid className='gap-4'>
        <BackButton/>
        <PageHeader
            title='Record New Cash Entry'
            description='Manual entry for physical cash movements at the Lagos Main Branch.'/>

        <Grid className='bg-white rounded-lg border p-6 gap-5'>
            <FlexCol className='justify-center items-center gap-2.5'>
                <Tabs items={tabs} defaultValue='inflow'/>
                <Typography color='primary' weight='semibold'>TRANSACTION AMOUNT</Typography>
                <TextField 
                    variant='ghost'
                    value={amount} className=' outline-none text-[32px] font-semibold text-ring' 
                    label='₦' labelClassName='text-[24px] font-semibold text-primary'
                    placeholder='0.00'
                    wrapperClassName={cn('flex-row items-center gap-4  border-b-2')} onChange={(e: any) => setAmount(e.target.value)}
                />
            </FlexCol>
            <Grid className='md:grid-cols-2 gap-5'>
                <TextField type='date' variant='primary' label='Date & Time'/>
                <CustomSelect label='Category' wrapperClass='h-10' options={[{label: 'Repayment', value: '1'}, {label: 'Disbursement', value: '2'}]}/>
                <TextField startIcon={<UserCheck2 size={20}/>} variant='primary' label='Customer / Staff' placeholder='Search by name, account number or staff ID' wrapperClassName='col-span-2'/>

                <TextField variant='primary' label='Reference Number (Optional)' placeholder='e.g. SLIP-1029384' wrapperClassName='col-span-2' />
 
                <TextArea label='Notes' placeholder='Add any specific details regarding this cash movement...' wrapperClass='col-span-2'/>

                <Flex className='gap-4 col-span-2 bg-primary/5 border border-primary/20 p-4 rounded-lg items-start'>
                    <Info size={30} className='text-primary'/>
                    <FlexCol>
                        <Typography weight='semibold' color='active'>Compliance Requirement</Typography>
                        <Typography variant='p' color='primary'>Transactions exceeding ₦500,000 require additional AML verification and manager authorization before final posting. Please ensure all ID documents are scanned and attached.</Typography>
                    </FlexCol>
                </Flex>
            </Grid>

            <Flex className='gap-4 items-end justify-end'>
                <Button variant='ghost'>Cancel</Button>
                <Button>Save Entry</Button>
            </Flex>
        </Grid>
    </Grid>
  )
}

export default NewTransactionPage;
