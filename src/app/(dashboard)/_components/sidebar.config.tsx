import Sidebar from "@/components/ui/Sidebar";
import { agentsSidebar, loanOfficerData, managersData, superAgentData } from "@/constant/sidebar.data";

export const AgentsSidebar = () => {

  return (
    <Sidebar className='bg-white' 
        data={agentsSidebar} 
        activeBasePath="/agents" 
        others={[
            {
                label: 'Settings',
                href: '/settings',
                icon: 'settings',
            },
            {
                label: 'Logout',
                icon: 'logout',
                onClick: () => {
                    console.log('logout');
            },
        },
    ]}
    />
  )
}


export const SuperAgentSidebar = () => {
    return(
        <Sidebar className="bg-[#1D3989]" 
        activeBasePath="/super-agents" 
        data={superAgentData}
        others={[
            {
                label: 'Logout',
                icon: 'logout',
                onClick: () => {
                    console.log('logout');
                }
            }
            
        ]}
        />
    )
}


export const LoanOfficerSidebar = () => {
    return(
        <Sidebar className="bg-[#1D3989]" 
        activeBasePath="/loan-officer" 
        data={loanOfficerData}
        others={[
            {
                label: 'Logout',
                icon: 'logout',
                onClick: () => {
                    console.log('logout');
                }
            }
            
        ]}
        />
    )
}


export const ManagersSidebar = () => {
    return(
        <Sidebar className="bg-[#1D3989]" 
        activeBasePath="/manager" 
        data={managersData}
        others={[
            {
                label: 'Logout',
                icon: 'logout',
                onClick: () => {
                    console.log('logout');
                }
            }
            
        ]}
        />
    )
}