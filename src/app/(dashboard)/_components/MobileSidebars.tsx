'use client';

import React, { useState } from 'react';
import Typography from '@/components/primitives/Typography';
import { agentsSidebar, loanOfficerData, managersData, superAgentData } from '@/config/sidebar.config';
import { useUserStore } from '@/store/useAuthStore';
import Image from 'next/image';

import user1 from '@/assets/svgs/user.svg';
import MobileSidebar from '@/components/ui/MobileSidebar';


export const AgentMobileSidebar = () => {
    const [open, setOpen] = useState(false);
    const user = useUserStore((s) => s.user);
  return (
    <MobileSidebar
        open={open}
        onClose={() => setOpen(false)}
        items={agentsSidebar}
        title="Agent Panel"
        footer={
            <div className="flex items-center gap-3 rounded-2xl bg-neutral-50 p-3">
            <Image
              src={user1}
              alt="user"
              width={44}
              height={44}
              className="rounded-full"
            />

            <div>
              <Typography weight="semibold">
                {user?.name || 'No Name'}
              </Typography>

              <Typography
                className="uppercase text-primary"
              >
                {user?.role}
              </Typography>
            </div>
          </div>
        }
        />
  )
}

export const SuperAgentMobileSidebar = () => {
    const [open, setOpen] = useState(false);
    const user = useUserStore((s) => s.user);
  return (
    <MobileSidebar
      open={open}
      onClose={() => setOpen(false)}
      items={superAgentData}
      title="Super Agent Panel"
      footer={
        <div className="flex items-center gap-3 rounded-2xl bg-neutral-50 p-3">
          <Image
            src={user1}
            alt="user"
            width={44}
            height={44}
            className="rounded-full"
          />

          <div>
            <Typography weight="semibold">
              {user?.name || 'No Name'}
            </Typography>

            <Typography
              className="uppercase text-primary"
            >
              {user?.role}
            </Typography>
          </div>
        </div>
      }
    />
  )
}

export const LoanOfficerMobileSidebar = () => {
    const [open, setOpen] = useState(false);
    const user = useUserStore((s) => s.user);
  return (
    <MobileSidebar
      open={open}
      onClose={() => setOpen(false)}
      items={loanOfficerData}
      title="Loan Officer Panel"
      footer={
        <div className="flex items-center gap-3 rounded-2xl bg-neutral-50 p-3">
          <Image
            src={user1}
            alt="user"
            width={44}
            height={44}
            className="rounded-full"
          />

          <div>
            <Typography weight="semibold">
              {user?.name || 'No Name'}
            </Typography>

            <Typography
              className="uppercase text-primary"
            >
              {user?.role}
            </Typography>
          </div>
        </div>
      }
    />
  )
}

export const ManagerMobileSidebar = () => {
    const [open, setOpen] = useState(false);
    const user = useUserStore((s) => s.user);
  return (
    <MobileSidebar
      open={open}
      onClose={() => setOpen(false)}
      items={managersData}
      title="Manager Panel"
      footer={
        <div className="flex items-center gap-3 rounded-2xl bg-neutral-50 p-3">
          <Image
            src={user1}
            alt="user"
            width={44}
            height={44}
            className="rounded-full"
          />

          <div>
            <Typography weight="semibold">
              {user?.name || 'No Name'}
            </Typography>

            <Typography
              className="uppercase text-primary"
            >
              {user?.role}
            </Typography>
          </div>
        </div>
      }
    />
  )
}
