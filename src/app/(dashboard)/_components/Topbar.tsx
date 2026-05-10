import { TextField } from '@/components/primitives/inputs/TextField';
import { BellDot, Search, Timer,  } from 'lucide-react';
import user from '@/assets/images/user.png'
import Image from 'next/image';
import React from 'react'
import PageHeader from '@/components/ui/PageHeader';

const Topbar = () => {

  return (
    <div className='shadow-sm bg-white'>
        <section className="flex p-4 items-center justify-end gap-7">
            <TextField startIcon={<Search size={18} className=''/>} placeholder='Search applications, loans, or clients...' className='bg-[#EEF4FF] text-[#6B7280] py-1.5 px-4 border min-w-100'/>

          <div className="flex items-center gap-3 w-auto h-auto">
             <BellDot size={20} className='text-[#6B7280] cursor-pointer'/>
             <Timer size={20} className='text-[#6B7280] cursor-pointer'/>
              <PageHeader title='James Udoh' subtitle='Loan Officer' />
 
              <Image src={user} alt='USER' width={40} height={40} loading='eager'/>
          </div>
        </section>
    </div>
  )
}

export default Topbar;
