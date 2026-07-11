'use client';

import Button from '@/components/primitives/buttons/Button';
import Typography from '@/components/primitives/Typography';
import { PageHeader } from '@/components/ui/PageHeader'
import { Flex, Grid } from '@/components/ui/ui-layout';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import AddCustomerModal from '../@modals/AddCustomerModal';

const Card = ({label, val, textColor, textColor1, percentage, className='bg-white'}: {label: string, val: number, textColor?: string, className?: string, textColor1?: string, percentage?: string}) => (
    <Grid className={`px-4 py-2.5 gap-2.5 rounded-xl ${className}`}>
        <Typography className={`text-xs uppercase font-semibold ${textColor1}`} color='primary'>{label}</Typography>
        <Flex className='gap-2'>
            <Typography className={`text-[28px] text-shadow-2xs ${textColor}`} weight='bold' font='manrope'>{val}</Typography>
            {percentage && <Typography className='text-[10px]' font='poppins' color='secondary'>{percentage}</Typography>}
        </Flex>
    </Grid>
)

const CustomerHero = ({stats}: any) => {

    const [openModal, setOpenModal] = useState(false);
    
  return (
    <Grid className="gap-4">
        <Flex className='flex-col md:flex-row items-start md:items-center justify-between gap-2.5 w-full'>
            <PageHeader title='Customer Acquisition'/>
            <Button variant='primary' startIcon={<Plus size={20}/>} onClick={() => setOpenModal(true)}>New Customer</Button>
        </Flex>

        <Grid className='gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
            <Card label='ONBOARDED TODAY' val={12}  percentage='+12%'/>
            <Card label='Last month' val={stats?.data?.lastMonthTotal || 0} percentage='+12%' />
            <Card label='This month' val={stats?.data?.thisMonthTotal || 0} percentage='+12%' />
            <Card label='approved' val={12} textColor='text-primary'/>
            <Card label='rejected' val={12} textColor='text-[#BA1A1A]'/>
            <Card className='bg-primary shadow-lg' label='conv. rate' val={12} textColor='text-white' textColor1='text-white'/>
        </Grid>

        <AddCustomerModal open={openModal} setOpen={setOpenModal}/>
    </Grid>
  )
}

export default CustomerHero;
