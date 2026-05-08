import Typography from '@/components/primitives/inputs/Typography';
import Image from 'next/image';
import React from 'react'

import logo from '@/assets/svgs/logo.svg'
import { ArrowRight, Shield } from 'lucide-react';
import Button from '@/components/primitives/buttons/Button';

const SignInPage = () => {
  return (
    <main className='p-4 w-full mx-auto my-auto max-w-7xl flex items-center justify-center flex-col flex-1 h-full'>
      <section className="flex flex-col bg-[#FFFFFF] rounded-2xl h-100 shadow-2xl w-fit">
        <div className="flex max-w-5xl">
          <div className="flex flex-1 flex-col gap-2 bg-[#EEF4FF] py-4 px-6 h-full rounded-tl-2xl">
            <Image src={logo} alt='' loading='lazy' />
            <Typography variant='h1' className='text-[36px]'>Empowering Growth Through Every Transaction.</Typography>
            <Typography className='w-1/2'>Access the agent terminal to manage portfolios and facilitate financial inclusion in your teritory</Typography>
            <Typography variant='small' startIcon={<Shield size={18} className='text-primary'/>} className='uppercase py-2 px-1.5 bg-white w-fit rounded-sm font-semibold'>Secure Node Access</Typography>
          </div>

          <div className="flex flex-1 flex-col gap-2 justify-center p-4">
            <Typography variant='h2'>Agent Portal Login</Typography>
            <Typography color='primary' className='text-lg'>Please enter your credentials to authenticate.</Typography>
            <Button size='lg' endIcon={<ArrowRight size={20}/>}>Sign In to Portal</Button>
          </div>
        </div>
        <div className="flex p-4 items-end justify-end">
          <Typography variant='span' color='primary'>New to CooCredit?</Typography>
        </div>
      </section>
    </main>
  )
}

export default SignInPage;
