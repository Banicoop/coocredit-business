import React from 'react'
import AgentsSidebar from '../_components/Sidebar';
import Topbar from '../_components/Topbar';

const AgentsDashboardlayout = ({children}: {children: React.ReactNode}) => {
  return (
    <main className='flex w-full min-h-screen bg-[#F1F5F9]'>
        <AgentsSidebar/>
        <div className="flex flex-1 flex-col lg:ml-64">
          <Topbar/>
          {children}
        </div>
    </main>
  )
}

export default AgentsDashboardlayout;
