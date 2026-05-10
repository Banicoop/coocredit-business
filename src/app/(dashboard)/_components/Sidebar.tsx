'use client';

import { AgentsSidebar, LoanOfficerSidebar, ManagersSidebar, SuperAgentSidebar } from './sidebar.config';
import { Suspense } from 'react';
import { SidebarSkeleton } from '@/helpers/skeleton';



const UserSidebar = () => {

    const sidebarMap = {
        agents: <AgentsSidebar/>,
        superAgent: <SuperAgentSidebar/>,
        loanOfficer: <LoanOfficerSidebar/>,
        manager: <ManagersSidebar/>
    }

  return (
    <Suspense fallback={<SidebarSkeleton/>}>

    </Suspense>
  )
  
}

export default UserSidebar;
