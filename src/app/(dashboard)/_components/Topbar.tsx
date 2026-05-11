'use client';

import { TextField } from '@/components/primitives/inputs/TextField';
import { BellDot, Search, Timer,  } from 'lucide-react';
import user1 from '@/assets/images/user.png'
import Image from 'next/image';
import React from 'react'
import { ColItem } from '@/components/ui/PageHeader';
import { useUserStore } from '@/store/useAuthStore';

const Topbar = () => {

  const user = useUserStore((state) => state.user);

  if(!user) return null;

  return (
    <div className='shadow-sm bg-white hidden lg:flex w-full'>
        <section className="flex p-4 items-center justify-end gap-7 w-full">
            <TextField startIcon={<Search size={18} className=''/>} placeholder='Search applications, loans, or clients...' className='bg-[#EEF4FF] text-[#6B7280] py-1.5 px-4 border min-w-100'/>

          <div className="flex items-center gap-3 w-auto h-auto">
             <BellDot size={20} className='text-[#6B7280] cursor-pointer'/>
             <Timer size={20} className='text-[#6B7280] cursor-pointer'/>
              <ColItem item1={user?.name} item2={user?.role}className2='capitalize' />
 
              <Image src={user1} alt='USER' width={40} height={40} loading='eager'/>
          </div>
        </section>
    </div>
  )
}

export default Topbar;
