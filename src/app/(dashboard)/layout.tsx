import React from 'react'
import UserSidebar from './_components/Sidebar';
import Topbar from './_components/Topbar';


const AgentsDashboardlayout = ({children}: {children: React.ReactNode}) => {
  return (
    <main className='flex w-full max-w-360 mx-auto min-h-screen bg-[#F1F5F9]'>
        <UserSidebar/>
        <div className="flex flex-1 flex-col lg:ml-64">
          <Topbar/>
          <div className="p-4">
          {children}
          </div>
        </div>
    </main>
  )
}

export default AgentsDashboardlayout;
