'use client';

import Image from 'next/image';
import { Badge } from './AgentProfileCards';
import { Flex, FlexCol } from '@/components/ui/ui-layout';
import Button from '@/components/primitives/buttons/Button';
import { ChangeEvent, useState, useTransition } from 'react';
import { Modal } from '@/components/primitives/modals/Modal';
import Typography from '@/components/primitives/Typography';
import { validateAgentCreation } from '@/lib/manager.actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { TextArea } from '@/components/primitives/inputs/TextArea';

const AgentProfileHeader = ({data}: any) => {

    const [openApproveModal, setOpenApproveModal] = useState(false);
    const [openRejectModal, setOpenRejectModal] = useState(false);

  return (
    <>
        <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex flex-col md:flex-row gap-6 items-center">
            <Image
                src={data?.profileImage || '/icons/user-icon.png'}
                alt={data.firstName}
                width={120}
                height={120}
                className="rounded-full border object-cover"
            />

            <div className="flex-1">
                <FlexCol className='gap-4 md:flex-row md:justify-between'>
                    <div className="">
                        <h1 className="text-3xl font-bold capitalize">
                        {data.firstName} {data.lastName}
                        </h1>
                        <p className="text-gray-500">{data.email}</p>
                    </div>
                {data.approvalStatus === 'pending' && (
                    <Flex className='gap-2.5'>
                        <Button className='cursor-pointer h-fit bg-rose-50 text-rose-700 ring-rose-600/20' variant='ghost' size='md' onClick={() => setOpenRejectModal(true)}>Reject Agent</Button>
                        <Button className='cursor-pointer h-fit' size='md' onClick={() => setOpenApproveModal(true)}>Approve Agent</Button>
                    </Flex>)}
                </FlexCol>

                <div className="flex flex-wrap gap-2 mt-4">
                <Badge>{data?.role?.replace("_", " ")}</Badge>
                <Badge color="green">{data.approvalStatus}</Badge>
                <Badge color="blue">{data.kycLevel}</Badge>

                {data.phoneVerified && (
                    <Badge color="emerald">Phone Verified</Badge>
                )}

                {data.emailVerified ? (
                    <Badge color="emerald">Email Verified</Badge>
                ) : (
                    <Badge color="red">Email Unverified</Badge>
                )}
                </div>
            </div>
            </div>
        </div>
        <AgentApprovalModel open={openApproveModal} setOpen={setOpenApproveModal} id={data?.userId}/>

        <AgentRejectModel open={openRejectModal} setOpen={setOpenRejectModal} id={data?.userId}/>
    </>
  )
}

export default AgentProfileHeader;


const AgentApprovalModel = ({open, setOpen, id}: any) => {

    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleApproval = () => {
        startTransition(async () => {
        const res = await validateAgentCreation({agentId: id, decision :'APPROVE'});

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


const AgentRejectModel = ({open, setOpen, id}: any) => {

    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const [reason, setReason] = useState('');

    const handleApproval = () => {
        startTransition(async () => {
        const res = await validateAgentCreation({agentId: id, decision :'REJECT', reason});

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
            <Modal.Header title='Are you sure you want to reject agent application request?'/>
            <Modal.Body>
                <FlexCol className='gap-4'>
                    <Typography>Please provide reason for rejection</Typography>
                    <TextArea placeholder='Reason' value={reason} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setReason(e.target.value)}/>
                </FlexCol>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='light' className='border' onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={handleApproval} loading={isPending} disabled={isPending}>Approve</Button>
            </Modal.Footer>
        </Modal>
    )
}
