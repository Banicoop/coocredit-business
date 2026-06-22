'use client';

import { useAgentStatus } from "@/store/useAgentStatus";
import ActiveAgentPage from "../_pages/ActiveAgentPage";
import AgentKYCPending from "../_pages/KYCPendingPage";


const AgentDetailsPage = () => {

    const { status } = useAgentStatus();

    console.log('STATUS:', status)

    const pages = {
        active: <ActiveAgentPage/>,
        pending: <AgentKYCPending/>,
        inactive: <AgentKYCPending/>,
    }

    if(!status) return null;

  return (
    <div>
        {pages[status]}
    </div>
  )
}

export default AgentDetailsPage;
