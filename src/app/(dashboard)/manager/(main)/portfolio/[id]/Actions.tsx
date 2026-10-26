'use client';

import { BackButton } from '@/components/primitives/buttons/BackButton'
import Button from '@/components/primitives/buttons/Button'
import { TextArea } from '@/components/primitives/inputs/TextArea';
import { Modal } from '@/components/primitives/modals/Modal';
import Typography from '@/components/primitives/Typography';
import { Flex, FlexCol, Grid } from '@/components/ui/ui-layout'
import { useApproveBusinessLoan, useRejectBusinessLoan } from '@/lib/hooks/useLoans';
import { ChangeEvent, useState } from 'react';
import { toast } from 'sonner';


interface LoanActionsProps {
    loanId: string;
    status: string;
}


interface LoanModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    loanId: string;
}

const Actions = ({loanId, status}: LoanActionsProps) => {

    const [openApproveModal, setOpenApproveModal] = useState(false);
    const [openRejectModal, setOpenRejectModal] = useState(false);

    if (!loanId) {
    return (
        <FlexCol className="gap-4">
        <BackButton />
        <div className="flex min-h-[40vh] flex-col items-center justify-center gap-2 text-center">
            <p className="text-sm font-medium text-slate-500">This loan could not be found.</p>
        </div>
        </FlexCol>
    );
    }

  return (
    <>
     <FlexCol className='md:flex-row justify-between'>
        <BackButton />

        <Flex className='gap-4'>
            { status === 'pending' && (
                <Grid className='grid-cols-2 md:grid-cols-4 gap-5'>
                    <Button onClick={() => setOpenApproveModal(true)}>Approve</Button>
                    <Button className='bg-rose-50 text-rose-700 ring-rose-600/20' variant='ghost' onClick={() => setOpenRejectModal(true)}>Reject</Button>
                   
                </Grid>
            )
        }
        </Flex>
    </FlexCol>
    <LoanApprovalModel open={openApproveModal} setOpen={setOpenApproveModal} loanId={loanId}/>
    <LoanRejectionModel open={openRejectModal} setOpen={setOpenRejectModal} loanId={loanId}/>
    </>
  )
}

export default Actions;

const LoanApprovalModel = ({open, setOpen, loanId}: LoanModalProps) => {

    const approve = useApproveBusinessLoan();

    const handleApproval = () => {
        approve.mutate(
        { loanId },
        {
        onSuccess: () => {
            toast.success('Loan approved')
            setOpen(false);
        },
        onError: (error) => toast.error(error.message),
        }
    );
    };

    return(
        <Modal onOpenChange={() => setOpen(false)} open={open}>
            <Modal.Header title='Are you sure you want to approve this loan?'/>
            <Modal.Body>
                <FlexCol>
                    <Typography>Please ensure you have verified every customer information, documents and guarantor details</Typography>
                </FlexCol>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='light' className='border' onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={handleApproval} loading={approve.isPending} disabled={approve.isPending}>Approve</Button>
            </Modal.Footer>
        </Modal>
    )
}


const LoanRejectionModel = ({open, setOpen, loanId}: LoanModalProps) => {

    const reject = useRejectBusinessLoan();
    const [reason, setReason] = useState('');


    const handleRejection = async () => {
        reject.mutate({ loanId, reason }, 
            {
            onSuccess: () => {
            toast.success('Loan rejected')
            setOpen(false);
        },
            onError: (error) => toast.error(error.message),
            }
        );
        
    };

    return(
        <Modal onOpenChange={() => setOpen(false)} open={open}>
            <Modal.Header title='Are you sure you want to reject loan?'/>
            <Modal.Body>
                <FlexCol className='gap-4'>
                    <Typography>Tell us reason for rejecting this loan application?</Typography>
                    <TextArea placeholder='Write your reason' value={reason} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setReason(e.target.value)}/>
                </FlexCol>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='light' className='border' onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={handleRejection} variant='ghost' className='bg-rose-700 text-card ring-rose-600/20' loading={reject.isPending} disabled={reject.isPending}>Reject</Button>
            </Modal.Footer>
        </Modal>
    )
}
