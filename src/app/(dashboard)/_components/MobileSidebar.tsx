'use client';


import { Suspense } from 'react';
import { SidebarSkeleton } from '@/helpers/skeleton';
import { useUserStore } from '@/store/useAuthStore';
import { AgentMobileSidebar, LoanOfficerMobileSidebar, ManagerMobileSidebar, SuperAgentMobileSidebar } from './MobileSidebars.config';


const MobileSidebar = () => {

    const { user } = useUserStore();

    const config = {
        agent: <AgentMobileSidebar/>,
        super_agent: <SuperAgentMobileSidebar/>,
        loan_officer: <LoanOfficerMobileSidebar/>,
        manager: <ManagerMobileSidebar/>,
        super_admin: <ManagerMobileSidebar/>,
    }
    
    if(!user?.admin.role) return null;

  return (
     <Suspense fallback={<SidebarSkeleton/>}>
      {config[user.admin.role]}
    </Suspense>
  )
}

export default MobileSidebar;

