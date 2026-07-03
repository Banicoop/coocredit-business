'use client';

import { useState } from 'react';
import Typography from '@/components/primitives/Typography';
import { agentsSidebar, loanOfficerData, managersData, superAgentData } from '@/config/sidebar.config';
import { useUserStore } from '@/store/useAuthStore';
import Image from 'next/image';

import user1 from '@/assets/images/user.png';
import logo from '@/assets/svgs/logo.svg';
import MobileSidebar from '@/components/ui/MobileSidebar';
import { Flex, FlexCol } from '@/components/ui/ui-layout';
import { LogOutIcon, MenuIcon } from 'lucide-react';


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
          <FlexCol className='gap-1.5 p-3'>
            <Flex className="gap-3 rounded-2xl bg-neutral-50">
              <Image
                src={user1}
                alt="user"
                className="rounded-full h-14 w-14 object-cover"
              />

              <FlexCol>
                <Typography weight="semibold">
                  {user?.admin?.firstName || 'No Name'}
                </Typography>

                <Typography
                  className="uppercase text-primary"
                >
                  {user?.admin?.role}
                </Typography>
              </FlexCol>
            </Flex>
            <Typography variant='p' weight='semibold' className='cursor-pointer' startIcon={<LogOutIcon size={18} />}>Logout</Typography>

          </FlexCol>
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
            alt="Super Agent"
            className="rounded-full h-14 w-14 object-cover"
          />

          <div>
            <Typography weight="semibold">
              {user?.admin?.username || 'No Name'}
            </Typography>

            <Typography
              className="uppercase text-primary"
            >
              {user?.admin?.role}
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
            alt="Loan Officer"
            className="rounded-full h-14 w-14 object-cover"
          />

          <div>
            <Typography weight="semibold">
              {user?.admin?.firstName || 'No Name'}
            </Typography>

            <Typography
              className="uppercase text-primary"
            >
              {user?.admin?.role}
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
            alt="Manager"
            className="rounded-full h-14 w-14 object-cover"
          />

          <div>
            <Typography weight="semibold">
              {user?.admin?.firstName || 'No Name'}
            </Typography>

            <Typography
              className="uppercase text-primary"
            >
              {user?.admin?.role}
            </Typography>
          </div>
        </div>
      }
    />
  )
}
