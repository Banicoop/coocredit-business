'use client';


import { Suspense, useEffect } from 'react';
import { SidebarSkeleton } from '@/helpers/skeleton';
import { useUserStore } from '@/store/useAuthStore';
import { AgentMobileSidebar, LoanOfficerMobileSidebar, ManagerMobileSidebar, SuperAgentMobileSidebar } from './MobileSidebars.config';


const MobileSidebar = () => {

    const { user } = useUserStore();

    const config = {
        agents: <AgentMobileSidebar/>,
        super_agent: <SuperAgentMobileSidebar/>,
        loan_officer: <LoanOfficerMobileSidebar/>,
        manager: <ManagerMobileSidebar/>
    }
    
    if(!user?.role) return null;

  return (
     <Suspense fallback={<SidebarSkeleton/>}>
      {config[user.role]}
    </Suspense>
  )
}

export default MobileSidebar;

