import React from 'react'
import UserSidebar from './_components/Sidebar';
import Topbar from './_components/Topbar';
import MobileSidebar from './_components/MobileSidebar';
import { QueryProvider } from '@/providers/QueryClient';


const Dashboardlayout = ({children}: {children: React.ReactNode}) => {
  return (
    <QueryProvider>
      <main className='flex w-full max-w-7xl mx-auto min-h-screen bg-[#F1F5F9]'>
          <UserSidebar/>
          <div className="flex flex-1 flex-col lg:ml-64">
            <Topbar/>
            <MobileSidebar/>
            <div className="p-4">
            {children}
            </div>
          </div>
      </main>
    </QueryProvider>
  )
}

export default Dashboardlayout;
