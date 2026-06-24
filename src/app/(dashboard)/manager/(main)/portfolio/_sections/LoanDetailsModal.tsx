import Button from '@/components/primitives/buttons/Button';
import { Modal } from '@/components/primitives/modals/Modal';
import Typography from '@/components/primitives/Typography';
import { ColItem } from '@/components/ui/PageHeader';
import {  FlexCol, Grid } from '@/components/ui/ui-layout';
import { cn } from '@/lib/utils';
import { SquareArrowUpRight, Trash2 } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
}

const LoanDetailsModal = ({open, setOpen}: Props) => {
  return (
    <Modal open={open} onOpenChange={setOpen}>
        <Modal.Header title='Loan Details'/>
        <Modal.Body>
            <Grid className='gap-y-3'>
                <FlexCol>
                    <Typography color='primary' weight='semibold'>CUSTOMER</Typography>
                    <Typography weight='semibold'>Abiodun Tunde Enterprises</Typography>
                    <Typography color='primary'>ID: L-9302-XC</Typography>
                </FlexCol>
                <Grid className='grid-cols-2 gap-2.5 mt-2.5'>
                    <ColItem item1='PRINCIPAL' 
                        item2='₦ 2,500,000' 
                        className1='text-ring font-semibold'
                        className2='text-primary2 font-semibold text-[16px]'
                        className='bg-accent py-2 px-4 rounded-lg'/>
                    <ColItem item1='ARREARS' 
                        item2='₦ 342,000' 
                        className1='text-ring font-semibold'
                        className2='text-destructive font-semibold text-[16px]'
                        className='bg-accent py-2 px-4 rounded-lg'/>
                </Grid>
                <Button variant='light' startIcon={<SquareArrowUpRight size={18} />} className={cn('bg-chart-4 text-white font-bold')}>Escalate Loan</Button> 
                <Button variant='light' startIcon={<Trash2 size={16}/>} className={cn('text-destructive border font-bold')}>Request Write-Off</Button>
            </Grid>
        </Modal.Body>
    </Modal>
  )
}

export default LoanDetailsModal;
