'use client';

import Image from 'next/image';
import { Badge } from './AgentProfileCards';
import { Flex, FlexCol } from '@/components/ui/ui-layout';
import Button from '@/components/primitives/buttons/Button';
import { useState } from 'react';

const AgentProfileHeader = ({data}: any) => {

    const [openApproveModal, setOpenApproveModal] = useState(false);

    const approveAgent = () => {

    }

  return (
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
            {data.approvalStatus === 'pending' && <Button className='cursor-pointer h-fit' size='md' onClick={approveAgent}>Approve Agent</Button>}
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
  )
}

export default AgentProfileHeader;
