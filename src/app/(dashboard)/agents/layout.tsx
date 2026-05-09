import React from 'react'
import AgentsSidebar from './_components/Sidebar';

const AgentsDashboardlayout = ({children}: {children: React.ReactNode}) => {
  return (
    <main className='flex w-full min-h-screen bg-[#F1F5F9]'>
        <AgentsSidebar/>
        <div className="flex flex-1 flex-col h-full">
          {children}
        </div>
    </main>
  )
}

export default AgentsDashboardlayout;
