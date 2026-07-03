'use client';

import { AgentsSidebar, LoanOfficerSidebar, ManagersSidebar, SuperAgentSidebar } from './sidebars';
import { Suspense } from 'react';
import { SidebarSkeleton } from '@/helpers/skeleton';
import { useUserStore } from '@/store/useAuthStore';



const UserSidebar = () => {

  const { user } = useUserStore();


    const sidebarMap = {
        field_agent: <AgentsSidebar/>,
        super_agent: <SuperAgentSidebar/>,
        loan_officer: <LoanOfficerSidebar/>,
        manager: <ManagersSidebar/>,
        super_admin: <ManagersSidebar/>,
    }

    if(!user?.user?.role) return null;

  return (
    <Suspense fallback={<SidebarSkeleton/>}>
      {sidebarMap[user?.user?.role as keyof typeof sidebarMap] || null}
    </Suspense>
  )
}

export default UserSidebar;
