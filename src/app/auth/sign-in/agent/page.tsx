'use client';

import Typography from '@/components/primitives/Typography';
import Image from 'next/image';
import { useActionState, useEffect } from 'react';
import { LockKeyhole, SendHorizontal, Shield, UserRound } from 'lucide-react';
import Button from '@/components/primitives/buttons/Button';
import { TextField } from '@/components/primitives/inputs/TextField';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import logo from '@/assets/svgs/logo.svg';
import { useUserStore } from '@/store/useAuthStore';
import { toast } from 'sonner';
import {  agentSignIn } from '@/lib/auth.actions';
import { ActionState, User } from '@/types/types';


const initialState: ActionState = { error: null, success: false };

const SignInPage = () => {
  
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(agentSignIn, initialState);
  const { setUser } = useUserStore();

  useEffect(() => {
    if(state.error){
      toast.error(state.error)
    }
    
    if (state.success && state.data) {
      const agent = state.data as User;
      console.log('AGENT:', agent)
      setUser(agent);
      toast.success('Login successful! Redirecting...');
      router.push('/agent');
    }
  }, [state, router]);


  return (
    <main className='p-4 w-full mx-auto my-auto max-w-7xl flex items-center justify-center flex-col flex-1 h-full'>
      <section className='flex flex-col bg-[#FFFFFF] rounded-2xl min-h-100 shadow-2xl w-fit'>
        <div className='flex max-w-5xl'>
          <div className='hidden lg:flex flex-1 flex-col gap-2 bg-[#EEF4FF] py-4 px-6 h-full rounded-tl-2xl'>
            <Image src={logo} alt='LOGO' loading='eager' />
            <Typography variant='h1' className='text-[36px]' font='poppins'>
              Empowering Growth Through Every Transaction.
            </Typography>
            <Typography className='w-1/2'>
              Access the agent terminal to manage portfolios and facilitate financial inclusion in your teritory
            </Typography>
            <Typography
              variant='small'
              startIcon={<Shield size={18} className='text-primary' />}
              className='uppercase py-2 px-1.5 bg-white w-fit rounded-sm font-semibold'
              font='poppins'
            >
              Secure Node Access
            </Typography>
          </div>

          <form action={formAction} className='flex flex-1 flex-col gap-4 justify-center p-8'>
            <Typography variant='h2' font='poppins'>
              Agent Portal Login
            </Typography>

            <Typography color='primary' className='text-lg' font='poppins'>
              Please enter your credentials to authenticate.
            </Typography>

            <TextField
              startIcon={<UserRound size={18} />}
              placeholder='Agent ID or Phone Number'
              id='phoneNumber'
              name='phoneNumber'
              type='tel'
              className='outline-none w-full'
              autoComplete="email"
              variant='primary'
              required
            />

            <TextField
              startIcon={<LockKeyhole size={18} />}
              placeholder='Secure Password'
              id="password"
              name='password'
              type='password'
              autoComplete="current-password"
              className='outline-none'
              variant='primary'
              required
            />

            <Button loading={isPending} size='lg' type='submit' endIcon={<SendHorizontal size={20} />}>
              Sign In to Portal
            </Button>

            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-1'>
                <input type='checkbox' className='cursor-pointer' />
                <label>Keep me active</label>
              </div>

              <Link href='/auth/forgot-password' className='text-primary font-semibold text-lg uppercase'>
                Forget Password
              </Link>
            </div>
          </form>
        </div>

        {state.error && (
        <p role="alert" className="text-red-600 text-sm text-center">
          {state.error}
        </p>
      )}

        <div className='flex p-4 items-end justify-end gap-1.5'>
          <Typography variant='span' as='span' className='font-semibold text-lg' color='primary'>
            New to CooCredit?
          </Typography>

          <Typography variant='span' className='font-semibold text-lg cursor-pointer'>
            Become an Agent
          </Typography>
        </div>
      </section>
    </main>
  );
};

export default SignInPage;
