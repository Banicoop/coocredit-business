import { Modal } from '@/components/primitives/modals/Modal';
import { Flex, FlexCol } from '@/components/ui/ui-layout';
import Image from 'next/image';
import React from 'react'

import user from '@/assets/images/user.png'
import Typography from '@/components/primitives/Typography';
import { Star } from 'lucide-react';
import location from '@/assets/images/shop-location.png'
import Button from '@/components/primitives/buttons/Button';

const CustomerLocation = ({open, setOpen}: {open: boolean, setOpen: (open: boolean) => void}) => {
  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Header title='Customer Location Detail'/>
      <FlexCol className='gap-4'>
        <FlexCol className='items-center justify-center'>
          <Image src={user} alt='' width={100} height={120} className='rounded-lg'/>
          <Typography weight='bold' variant='p'>Bisi Akindele</Typography>
          <Typography color='primary'>Premier Tailoring Services</Typography>
        </FlexCol>
        <Flex className='w-full gap-2.5'>
          <FlexCol className='bg-accent py-4 px-2.5 rounded-lg flex-1'>
            <Typography color='primary'>LAST VISIT</Typography>
            <Typography weight='bold'>2 days ago</Typography>
          </FlexCol>
          <FlexCol className='bg-accent py-4 px-2.5 rounded-lg flex-1'>
            <Typography color='primary'>REPUTATION</Typography>
            <Typography color='success' startIcon={<Star size={16}/>} weight='bold'>4.8/5</Typography>
          </FlexCol>
        </Flex>
        <FlexCol className='gap-1.5'>
          <Typography color='primary' weight='semibold'>Precise Location</Typography>
          <Image src={location} alt='' className='w-full h-24 rounded-md object-cover' />
          <Typography color='primary'>Plot 24, Kudirat Abiola Way, Oregun Industrial Estate, Ikeja, Lagos.</Typography>
          <Button size='lg' variant='ghost' className='font-bold bg-accent text-primary'>Get Directions</Button>
        </FlexCol>
        
        <Typography weight='bold' color='primary' variant='h4'>Field Agent Notes</Typography>
        <Typography>"Business is expanding. Mentioned needing a second heavy-duty sewing machine by Q4. Shop visibility is excellent."</Typography>
      </FlexCol>

      <Modal.Footer>
        <Button size='lg' className='w-full mt-4 font-bold'>Schedule Routine Visit</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CustomerLocation;
