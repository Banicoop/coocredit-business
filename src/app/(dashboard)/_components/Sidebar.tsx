'use client';


import Typography from '@/components/primitives/Typography';
import { agentsSidbar } from '@/constant/sidebar.data';
import { isActive } from '@/lib/utils';
import { LogOut, Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const AgentsSidebar = () => {

    const pathname = usePathname();

  return (
    <aside className='border-r border-r-[#e5e5e5] hidden lg:block w-[256px] h-full overflow-y-auto scrollbar-hide fixed bg-white'>
        <section className="flex flex-1 flex-col justify-between h-full p-4 gap-2.5">
            {/* SIDEBAR ITEMS */}
            <div className="flex flex-col gap-2.5">
                <Image src='/logo.svg' alt='LOGO' width={120} height={30} loading='eager' />
                {agentsSidbar.map((item) => {
                    const Icon = item.icon;

                    const active = isActive(pathname, item.href, '/agents');

                    return(
                        <Link href={item.href} key={item.label} className={`flex items-center gap-2 py-3 px-4  transition ${active && 'border-r-4 border-primary bg-[#DBEAFE]'}`}>
                            <Typography startIcon={<Icon size={20}/>} weight={active ? 'semibold': 'medium'} color={active ? 'active': 'primary'}>{item.label}</Typography>
                        </Link>
                )})}
            </div>

            <div className="flex flex-col items-start gap-6 p-4">
                <Link href='/settings' >
                    <Typography startIcon={<Settings size={20}/>} color='primary'>Settings</Typography>
                </Link>

                <hr className='bg-[#E5E5E5] h-0.5 w-full'/>

                <Typography startIcon={<LogOut size={20}/>} color='primary' weight='semibold'>Logout</Typography>
            </div>
        </section>
    </aside>
  )
}

export default AgentsSidebar;
