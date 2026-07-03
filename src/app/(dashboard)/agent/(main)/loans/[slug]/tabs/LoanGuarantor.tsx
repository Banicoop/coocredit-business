import Button from '@/components/primitives/buttons/Button';
import { Flex, FlexBox, FlexCol, Grid } from '@/components/ui/ui-layout';
import Image from 'next/image';
import { ColItem } from '@/components/ui/PageHeader';
import Typography from '@/components/primitives/Typography';
import { BadgeCheck, Download, FileChartColumn, Mail, MapPinCheckIcon, Phone,  } from 'lucide-react';
import React from 'react'

import user from '@/assets/images/user.png'
import bg from '@/assets/images/shop-location.png'


const items = [
  {
    label: 'EMAIL ADDRESS',
    val: 'chief.olumide@adeyemi.com',
    icon: Mail
  },
  {
    label: 'PHONE NUMBER',
    val: '+234 803 456 7890',
    icon: Phone
  },
  {
    label: 'RESIDENTIAL ADDRESS',
    val: '15B Banana Island Road, Ikoyi, Lagos, Nigeria',
    icon: MapPinCheckIcon
  },
]

const documents = Array.from({ length: 4 }, (_, i) => ({
  id: i + 1,
  name: 'Valid National ID Card',
  type: 'jpg',
  size: `${(Math.random() * 2 + 0.5).toFixed(2)} MB`,
}));  

const LoanGuarantor = () => {
  return (
    <FlexCol className='gap-6'>
      <Flex className='gap-4'>
        {[1, 2, 3].map((i) => (
          <Button key={i}>Gurantor {i}</Button>
        ))}
      </Flex>

        {/* Customer Information */}
      <FlexCol className='gap-4 md:flex-row items-start'>
        <FlexCol className='gap-5 flex-1'>
        <FlexBox className='flex-col gap-5'>
          <Flex className='gap-2'>
            <Image src={user} width={80} height={80} alt='' />
            <FlexCol>
              <Typography weight='semibold' variant='p' endIcon={<BadgeCheck size={18} className='text-primary' />}>Chief Olumide Adeyemi</Typography>
              <Typography color='primary' weight='semibold'>Business Partner / Uncle</Typography>
              <Typography variant='small' weight='semibold' startIcon={<div className='w-1.5 h-1.5 rounded-full bg-[#15803D]'/>} color='success' className='bg-[#F0FDF4] px-2 py-0.5 rounded-sm mt-1.5 w-fit'>VERIFIED STATUS</Typography>
            </FlexCol>
          </Flex>

          {items.map((item) => (
            <Flex className='gap-x-2.5 p-2.5 bg-accent rounded-lg' key={item.label}>
              {React.createElement(item.icon, { size: 24, className: 'text-primary' })}
              <ColItem 
                item1={item.label} 
                item2={item.val}
                className1='text-[#546474] font-bold text-xs'
                className2='text-[#0F1C2C] font-semibold text-sm'
                />
            </Flex>
          ))}
        </FlexBox>
        <FlexBox className='flex-col gap-4'>
          <Typography color='primary' weight='semibold'>FINANCIAL STANDING</Typography>
          <Flex className='w-full gap-2.5'>
            <FlexCol className='bg-accent p-4 border-l-4 border-l-primary w-full rounded-lg h-24'>
              <Typography color='primary' weight='semibold' variant='p'>Net worth</Typography>
              <Typography weight='bold' variant='p'>₦45,000,000</Typography>
            </FlexCol>

            <FlexCol className='bg-accent p-4 w-full rounded-lg h-24 border'>
              <Typography color='primary' weight='semibold' variant='small' className='capitalize'>MONTHLY INCOME</Typography>
              <Typography weight='bold' variant='p'>₦250, 000, 000</Typography>
            </FlexCol>
          </Flex>
          <Flex className='py-2.5 px-4 rounded-md bg-accent justify-between'>
            <ColItem 
              item1='ASSET VERIFICATION' 
              item2='Current Assets Verified' 
              className1='text-[#15803D] font-semibold' className2='text-[#15803D] font-semibold'/>
            <FileChartColumn size={24} className='text-[#15803D] font-bold'/>
          </Flex>
        </FlexBox>
        </FlexCol>

          {/* Gurantor Documents */}
        <FlexBox className='flex-1 lg:flex-[1.5] flex-col gap-5'>
            <Typography color='primary' weight='semibold'>GUARANTOR DOCUMENTS</Typography>

            <Grid className='gap-5 grid-cols-1 lg:grid-cols-2 '>
              {documents.map((doc) => (
                <FlexCol className='bg-accent py-4 px-6 rounded-lg gap-2.5' key={doc.id}>
                <Flex className='gap-4'>
                  <div className="w-12 h-12 rounded-lg bg-card flex items-center justify-center">
                    <FileChartColumn size={24} className='text-primary'/>
                  </div>
                  <ColItem 
                    item1={doc.name} 
                    item2={`${doc.type} • ${doc.size}`} 
                    className1='text-base text-[#0F1C2C] font-bold' className2='text-[#546474] text-xs'/>
                </Flex>
                <Flex className='gap-4'>
                  <Typography weight='bold' color='primary' className='bg-card py-2 px-6 rounded-sm shadow-sm cursor-pointer w-full text-center'>View</Typography>
                  <Flex className='p-2.5 rounded-lg bg-card'>
                  <Download size={16} className='text-primary cursor-pointer'/>
                  </Flex>
                </Flex>
              </FlexCol>
              ))}
            </Grid>

            <Image src={bg} height={200} alt='' className='self-center mt-4 w-full'/>
        </FlexBox>
      </FlexCol>
    </FlexCol>
  )
}

export default LoanGuarantor;
