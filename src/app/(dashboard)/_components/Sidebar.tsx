'use client';

import { AgentsSidebar, LoanOfficerSidebar, ManagersSidebar, SuperAgentSidebar } from './sidebars';
import { Suspense } from 'react';
import { SidebarSkeleton } from '@/helpers/skeleton';
import { useUserStore } from '@/store/useAuthStore';



const UserSidebar = () => {

  const { user } = useUserStore();


    const sidebarMap = {
        agent: <AgentsSidebar/>,
        super_agent: <SuperAgentSidebar/>,
        loan_officer: <LoanOfficerSidebar/>,
        manager: <ManagersSidebar/>,
        super_admin: <ManagersSidebar/>,
    }

    if(!user?.admin?.role) return null;

  return (
    <Suspense fallback={<SidebarSkeleton/>}>
      {sidebarMap[user?.admin?.role as keyof typeof sidebarMap] || null}
    </Suspense>
  )
}

export default UserSidebar;
