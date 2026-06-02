'use client';

import LogoutModal from "@/components/ui/LogoutModal";
import Sidebar from "@/components/ui/Sidebar";
import { agentsSidebar, loanOfficerData, managersData, superAgentData } from "@/config/sidebar.config";
import { useState } from "react";

export const AgentsSidebar = () => {

    const [open, setOpen] = useState(false);

  return (
    <>
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
                        setOpen(true)
                },
            },
        ]}
        />
        <LogoutModal open={open} setOpen={setOpen}/>
    </>
  )
}


export const SuperAgentSidebar = () => {

    const [open, setOpen] = useState(false);
    
    return(
        <>
        <Sidebar 
            className="bg-[#1D3989]" 
            className1="text-white"
            styles="border-0 bg-[#FFFFFF1A] rounded-md"
            activeBasePath="/super-agent" 
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
        <LogoutModal open={open} setOpen={setOpen}/>
        </>
    )
}


export const LoanOfficerSidebar = () => {

     const [open, setOpen] = useState(false);

    return(
        <>
            <Sidebar 
            className="bg-[#0F2557]" 
            className1="text-white"
            styles="border-0 bg-[#2563EB] rounded-md"
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
            <LogoutModal open={open} setOpen={setOpen}/>
        </>
    )
}


export const ManagersSidebar = () => {

     const [open, setOpen] = useState(false);

    return(
        <>
            <Sidebar className="bg-[#1D3989]" 
            className1="text-white"
            styles="border-0 bg-[#FFFFFF1A] rounded-md"
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
            <LogoutModal open={open} setOpen={setOpen}/>
        </>
    )
}