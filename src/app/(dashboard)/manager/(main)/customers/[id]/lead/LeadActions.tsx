'use client';

import { Flex, FlexCol } from '@/components/ui/ui-layout';
import { Badge, BadgeTone, Dot } from '@/components/primitive-ui/card-ui';
import Button from '@/components/primitives/buttons/Button';
import { BackButton } from '@/components/primitives/buttons/BackButton';
import { ChangeEvent, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Modal } from '@/components/primitives/modals/Modal';
import Typography from '@/components/primitives/Typography';
import { TextArea } from '@/components/primitives/inputs/TextArea';
import { businessSegmentProps, validateBusinessUser } from '@/lib/manager.actions';
import { initials, titleCase } from '@/helpers/funcs';
import CustomSelect from '@/components/primitives/inputs/CustomSelect';


const LeadActions = ({lead}: any) => {

  const riskTone: BadgeTone =
      lead.identityDescription === 'low_risk'
        ? 'success'
        : lead.identityDescription === 'high_risk'
        ? 'danger'
        : 'warning';

  const [openApproveModal, setOpenApproveModal] = useState(false);
  const [openRejectModal, setOpenRejectModal] = useState(false);


  return (
      <div className="border-b border-slate-200 bg-white">
        <FlexCol className="mx-auto max-w-6xl px-6 py-8">
          <FlexCol className='md:flex-row md:items-center gap-4 justify-between'>
            <BackButton />
            {lead?.verification?.verificationStatus === 'pending' &&
              <Flex className='gap-4'>
                <Button variant='ghost' onClick={() => setOpenRejectModal(true)} className='bg-rose-50 text-rose-700 ring-rose-600/20'>Reject</Button>
                <Button onClick={() => setOpenApproveModal(true)} >Approve</Button>
              </Flex>
            }
          </FlexCol>

        <Flex className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-lg font-semibold text-slate-400 ring-1 ring-slate-200">
              {initials(lead.firstName, lead.lastName)}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-xl font-semibold tracking-tight text-[#0B1220]">
                  {lead.firstName} {lead.lastName}
                </h1>
                <Badge tone="warning">
                  <Dot tone="warning" />
                  Pending review
                </Badge>
              </div>
              <p className="mt-1 font-mono text-sm text-slate-400">@{lead.username}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge tone="neutral">{titleCase(lead.role)}</Badge>
                <Badge tone="neutral">KYC {lead.kycLevel}</Badge>
                <Badge tone={riskTone}>{titleCase(lead.identityDescription)}</Badge>
                <Badge tone="accent">{titleCase(lead.onboardingStage)}</Badge>
              </div>
            </div>
          </div>
        </Flex>
        </FlexCol>
        <LeadApprovalModel open={openApproveModal} setOpen={setOpenApproveModal} lead={lead}/>

        <LeadRejectionModel open={openRejectModal} setOpen={setOpenRejectModal} lead={lead}/>
      </div>
  )
}

export default LeadActions;


const businessSegment = [
  {label: 'Select Business Segment', value: ''},
  {label: 'Micro', value: 'micro'},
  {label: 'Starter', value: 'starter'},
  {label: 'Small', value: 'small'},
  {label: 'Growth', value: 'growth'},
  {label: 'Eterprise', value: 'enterprise'},
  {label: 'Asset', value: 'asset'},
]



const LeadApprovalModel = ({open, setOpen, lead}: any) => {

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedSegment, setSelectedSegment] = useState('');
  const businessId = lead?.businesses[0]?.businessId;


  const handleApproval = () => {
      startTransition(async () => {
        const res = await validateBusinessUser({userId: lead.userId, businessId, businessSegment: selectedSegment, decision: 'approve'});
      if (res.success && res.data) {
          toast.success('Business user approved successfully');
          setOpen(false);
          router.refresh();
          router.replace('/manager/customers')
      } else {
          toast.error(res.error);
      }
      });
  };

    return(
        <Modal onOpenChange={() => setOpen(false)} open={open}>
            <Modal.Header title='Are you sure you want to approve business user creation'/>
            <Modal.Body>
                <FlexCol>
                    <Typography>Approving an business implies creating an acount for this business user</Typography>
                    <CustomSelect 
                      label='Business Segment'  
                      options={businessSegment} 
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedSegment(e.target.value)}
                      wrapperClass='my-6 h-10'/>
                </FlexCol>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='light' className='border' onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={handleApproval} loading={isPending} disabled={isPending}>Approve</Button>
            </Modal.Footer>
        </Modal>
    )
}


const LeadRejectionModel = ({open, setOpen, lead}: any) => {

    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const businessId = lead?.businesses[0]?.businessId;
    const [reason, setReason] = useState('');

    const handleApproval = () => {
        startTransition(async () => {
        const res = await validateBusinessUser({userId: lead.userId, businessId, businessSegment: 'micro', decision: 'reject', reason});

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
                <Button onClick={handleApproval} variant='ghost' className='bg-rose-700 text-card ring-rose-600/20' loading={isPending} disabled={isPending}>Reject</Button>
            </Modal.Footer>
        </Modal>
    )
}
