'use client';

import Button from '@/components/primitives/buttons/Button';
import { Modal } from '@/components/primitives/modals/Modal';
import Typography from '@/components/primitives/Typography';
import DetailedSlip from '@/components/ui/DetailSlip';
import { Flex, FlexCol } from '@/components/ui/ui-layout';

const list = [
    {title: 'Base Commission (1.5%)', val: '1,875'},
    {title: 'Acquisition Bonus', val: '250'},
    {title: 'Early Processing Incentive', val: '150'},
]

const list2 = [
    {title: 'Application Approved', val: 'Oct 12, 10:15 AM'},
    {title: 'Commission Calculated', val: 'Oct 12, 11:30 AM'},
    {title: 'Payout Processing', val: 'In Queue'},
]


const CommissionDetails = ({open, setOpen}: any) => {
  return (
    <Modal open={open} onOpenChange={() => setOpen(false)}>
        <Modal.Header title='Commission Breakdown'/>
        <Modal.Body>
            <FlexCol className='gap-4'>
                <Flex className='gap-4 w-full bg-[#EEF4FF] rounded-lg p-4'>
                    <Flex className='gap-1.5 items-center w-full'>
                        <Flex className='p-2.5 rounded-full bg-primary'>
                            <Typography color='light' className='text-center'>AN</Typography>
                        </Flex>
                        <FlexCol>
                            <Typography weight='semibold'>Adaeze Nwosu</Typography>
                            <Typography color='primary' variant='small' weight='semibold'>ID: APP-2023-8841</Typography>
                        </FlexCol>
                    </Flex>

                    <FlexCol>
                        <Typography color='active' weight='semibold'>Pending</Typography>
                        <Typography color='active' variant='h4' weight='semibold'>₦2,450</Typography>
                    </FlexCol>
                </Flex>

                <DetailedSlip 
                    title='DETAILED SPLIT' 
                    items={list} currencySymbol='₦'/>

                <DetailedSlip 
                    title='Timeline' 
                    items={list2} />

                <Button>Download Slip</Button>

            </FlexCol>
        </Modal.Body>
    </Modal>
  )
}

export default CommissionDetails;
