'use client';

import { AgentsSidebar, LoanOfficerSidebar, ManagersSidebar, SuperAgentSidebar } from './sidebars';
import { Suspense, useEffect } from 'react';
import { SidebarSkeleton } from '@/helpers/skeleton';
import { useUserStore } from '@/store/useAuthStore';



const UserSidebar = () => {

  const { user, setUser } = useUserStore();

  useEffect(() => {
    setUser({
      id: '1',
      name: 'Ebenezer Oladepo',
      role: 'agent',
    })
  }, [])

    const sidebarMap = {
        agent: <AgentsSidebar/>,
        super_agent: <SuperAgentSidebar/>,
        loan_officer: <LoanOfficerSidebar/>,
        manager: <ManagersSidebar/>
    }

    if(!user) return null;

  return (
    <Suspense fallback={<SidebarSkeleton/>}>
      {sidebarMap[user?.role]}
    </Suspense>
  )
}

export default UserSidebar;
