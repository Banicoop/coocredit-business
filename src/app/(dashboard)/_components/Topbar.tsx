'use client';

import { TextField } from '@/components/primitives/inputs/TextField';
import { BellDot, Search, Timer,  } from 'lucide-react';
import user1 from '@/assets/images/user.png'
import Image from 'next/image';
import { ColItem } from '@/components/ui/PageHeader';
import { useUserStore } from '@/store/useAuthStore';


const Topbar = () => {

  const user = useUserStore((state) => state.user);

  if(!user?.admin) return null;

  return (
    <div className='shadow-sm bg-white hidden lg:flex w-full'>
        <section className="flex p-4 items-center justify-end gap-7 w-full">
            <TextField variant='primary' startIcon={<Search size={18} className=''/>} placeholder='Search applications, loans, or clients...' className='outline-none min-w-100'/>

          <div className="flex items-center gap-3 w-auto h-auto">
             <BellDot size={20} className='text-[#6B7280] cursor-pointer'/>
             <Timer size={20} className='text-[#6B7280] cursor-pointer'/>
              <ColItem 
                item1={`${user?.admin?.firstName} ${user?.admin?.lastName}`} 
                item2={`Username: ${user?.admin?.username}`} 
                className2='capitalize font-bold text-primary' />
 
              <Image src={user1} alt='USER' width={40} height={40} loading='eager'/>
          </div>
        </section>
    </div>
  )
}

export default Topbar;
