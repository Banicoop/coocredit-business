import Typography from '@/components/primitives/inputs/Typography';
import Image from 'next/image';
import React from 'react'
import { ArrowRight, LockKeyhole, Shield, UserRound } from 'lucide-react';
import Button from '@/components/primitives/buttons/Button';
import { TextField } from '@/components/primitives/inputs/TextField';
import Link from 'next/link';

import logo from '@/assets/svgs/logo.svg'


const SignInPage = () => {

  return (
    <main className='p-4 w-full mx-auto my-auto max-w-7xl flex items-center justify-center flex-col flex-1 h-full'>
      <section className="flex flex-col bg-[#FFFFFF] rounded-2xl min-h-100 shadow-2xl w-fit">
        <div className="flex max-w-5xl">
          <div className="hidden lg:flex flex-1 flex-col gap-2 bg-[#EEF4FF] py-4 px-6 h-full rounded-tl-2xl">
            <Image src={logo} alt='LOGO' loading='eager' />
            <Typography variant='h1' className='text-[36px]'>Empowering Growth Through Every Transaction.</Typography>
            <Typography className='w-1/2'>Access the agent terminal to manage portfolios and facilitate financial inclusion in your teritory</Typography>
            <Typography variant='small' startIcon={<Shield size={18} className='text-primary'/>} className='uppercase py-2 px-1.5 bg-white w-fit rounded-sm font-semibold'>Secure Node Access</Typography>
          </div>

          <div className="flex flex-1 flex-col gap-4 justify-center p-5">
            <Typography variant='h2' >Agent Portal Login</Typography>
            <Typography color='primary' className='text-lg'>Please enter your credentials to authenticate.</Typography>
            <TextField startIcon={<UserRound size={18}/>} placeholder='Agent ID or Email' className='bg-[#DBE9FE] py-2.5 px-3.5' />
            <TextField startIcon={<LockKeyhole size={18}/>} placeholder='Secure Password' type='password' className='bg-[#DBE9FE] py-2.5 px-3.5'/>
            <Button size='lg' endIcon={<ArrowRight size={20}/>}>Sign In to Portal</Button>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <input type="checkbox" className='cursor-pointer'/>
                <label htmlFor="">Keep me active</label>
              </div>
              <Link href='/auth/forgot-password' className='text-primary font-semibold text-lg uppercase'>Forget Password</Link>
            </div>
          </div>
        </div>
        <div className="flex p-4 items-end justify-end gap-1.5">
        <Typography variant='span' as='span' className='font-semibold text-lg' color='primary'>New to CooCredit?</Typography>
          <Typography variant='span' className='font-semibold text-lg cursor-pointer'>Become an Agent</Typography>
        </div>
      </section>
    </main>
  )
}

export default SignInPage;
