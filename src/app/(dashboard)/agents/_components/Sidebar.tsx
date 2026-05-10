'use client';

import Sidebar from '@/components/ui/Sidebar';
import { agentsSidebar } from '@/constant/sidebar.data';



const AgentsSidebar = () => {

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

export default AgentsSidebar;
