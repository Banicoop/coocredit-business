import { TextField } from '@/components/primitives/inputs/TextField';
import Typography from '@/components/primitives/Typography';
import { BellDot, Search,  } from 'lucide-react';
import React from 'react'

const Topbar = () => {
  return (
    <div className='shadow-sm bg-white'>
        <section className="flex p-4 items-center justify-end gap-3.5">
        <TextField startIcon={<Search size={18} className=''/>} placeholder='Search...' className='bg-[#EEF4FF] text-[#6B7280] py-1.5 px-4 border'/>
         <BellDot size={20} className='text-[#6B7280] cursor-pointer'/>
        </section>
    </div>
  )
}

export default Topbar;
