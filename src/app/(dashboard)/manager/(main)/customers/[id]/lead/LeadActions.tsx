'use client';

import { Flex, FlexCol } from '@/components/ui/ui-layout';
import { Badge, BadgeTone, Dot, initials, titleCase } from './page';
import Button from '@/components/primitives/buttons/Button';
import { BackButton } from '@/components/primitives/buttons/BackButton';


const LeadActions = ({lead}: any) => {

  const riskTone: BadgeTone =
      lead.identityDescription === 'low_risk'
        ? 'success'
        : lead.identityDescription === 'high_risk'
        ? 'danger'
        : 'warning';


  return (
      <div className="border-b border-slate-200 bg-white">
        <FlexCol className="mx-auto max-w-6xl px-6 py-8">
          <FlexCol className='md:flex-row md:items-center gap-4 justify-between'>
            <BackButton />
            <Flex className='gap-4'>
              <Button variant='ghost' className='bg-rose-50 text-rose-700 ring-rose-600/20'>Reject</Button>
              <Button>Approve</Button>
            </Flex>
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
        </div>
  )
}

export default LeadActions;
