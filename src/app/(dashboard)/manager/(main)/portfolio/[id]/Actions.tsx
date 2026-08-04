'use client';

import { BackButton } from '@/components/primitives/buttons/BackButton'
import Button from '@/components/primitives/buttons/Button'
import { TextArea } from '@/components/primitives/inputs/TextArea';
import { Modal } from '@/components/primitives/modals/Modal';
import Typography from '@/components/primitives/Typography';
import { Flex, FlexCol } from '@/components/ui/ui-layout'
import { approveBusinessLoans, rejectBusinessLoans } from '@/lib/manager.actions';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState, useTransition } from 'react';
import { toast } from 'sonner';


const Actions = ({loanId, status}: {loanId: string, status: string}) => {

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
     <Flex className='justify-between'>
        <BackButton />

        <Flex className='gap-4'>
            { status === 'pending' && (
                <>
                <Button onClick={() => setOpenApproveModal(true)}>Approve</Button>
                <Button className='bg-rose-50 text-rose-700 ring-rose-600/20' variant='ghost' onClick={() => setOpenRejectModal(true)}>Reject</Button>
                </>
            )}
        <Link href={`${loanId}/repayments`} className='text-primary bg-card border text-xs py-2 px-2.5 rounded-md'>View Repayment</Link>
        </Flex>
    </Flex>
    <LoanApprovalModel open={openApproveModal} setOpen={setOpenApproveModal} loanId={loanId}/>
    <LoanRejectionModel open={openRejectModal} setOpen={setOpenRejectModal} leadId={loanId}/>
    </>
  )
}

export default Actions;

const LoanApprovalModel = ({open, setOpen, loanId}: any) => {

    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    console.log('LOAN:', loanId);

    const handleApproval = () => {
        startTransition(async () => {
        const res = await approveBusinessLoans({loanId});

        if (res.success && res.data) {
            toast.success('Agent approved successfully');
            setOpen(false);
            router.refresh();
        } else {
            toast.error(res.error);
        }
        });
    };

    return(
        <Modal onOpenChange={() => setOpen(false)} open={open}>
            <Modal.Header title='Are you sure you want to approve agent creation'/>
            <Modal.Body>
                <FlexCol>
                    <Typography>Approving an agent implies creating an acount for this agent</Typography>
                </FlexCol>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='light' className='border' onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={handleApproval} loading={isPending} disabled={isPending}>Approve</Button>
            </Modal.Footer>
        </Modal>
    )
}


const LoanRejectionModel = ({open, setOpen, loanId}: any) => {

    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const [reason, setReason] = useState('');

    const handleApproval = async () => {
        startTransition(async () => {
        const res = await rejectBusinessLoans({loanId, reason});

        if (res.success && res.data) {
            toast.success('Agent rejected successfully');
            setOpen(false);
            router.refresh();
        } else {
            toast.error(res.error);
        }
        });
    };

    return(
        <Modal onOpenChange={() => setOpen(false)} open={open}>
            <Modal.Header title='Are you sure you want to reject agent application request?'/>
            <Modal.Body>
                <FlexCol className='gap-4'>
                    <Typography>Is there a reason for rejecting this loan application?</Typography>
                    <TextArea placeholder='Write your reason' value={reason} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setReason(e.target.value)}/>
                </FlexCol>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='light' className='border' onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={handleApproval} variant='ghost' className='bg-rose-700 text-card ring-rose-600/20' loading={isPending} disabled={isPending}>Reject</Button>
            </Modal.Footer>
        </Modal>
    )
}