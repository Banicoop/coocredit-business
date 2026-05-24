'use client';

import React, { useState } from 'react';
import Typography from '@/components/primitives/Typography';
import { agentsSidebar, loanOfficerData, managersData, superAgentData } from '@/config/sidebar.config';
import { useUserStore } from '@/store/useAuthStore';
import Image from 'next/image';

import user1 from '@/assets/images/user.png';
import logo from '@/assets/svgs/logo.svg';
import MobileSidebar from '@/components/ui/MobileSidebar';
import { Flex } from '@/components/ui/ui-layout';
import { MenuIcon } from 'lucide-react';


export const AgentMobileSidebar = () => {

    const user = useUserStore((s) => s.user);
    const [open, setOpen] = useState(false);

  return (
    <>
    <Flex className='justify-between p-2.5 w-full border-b lg:hidden'>
      <Image src={logo} alt='Logo' width={120} height={40}/>
      <MenuIcon size={24} onClick={() => setOpen(true)} className='text-primary cursor-pointer'/>
    </Flex>
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
      </>
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
