'use client';

import Typography from '@/components/primitives/Typography';
import Image from 'next/image';
import { useActionState, useEffect } from 'react';
import { ArrowRight, Shield, UserRound } from 'lucide-react';
import Button from '@/components/primitives/buttons/Button';
import { TextField } from '@/components/primitives/inputs/TextField';
import Link from 'next/link';
import logo from '@/assets/svgs/logo.svg';
import { verifyOTP } from '@/lib/auth.actions';
import { toast } from 'sonner';
import { ActionState, User } from '@/types/types';
import { useUserStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';



const initialState: ActionState = { error: null, success: false };

const AdminVerifyOTPPage = () => {

  const { setUser } = useUserStore();
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(verifyOTP, initialState);

  useEffect(() => {
    if (state.success && state.data) {
    const admin = state.data as User;
    setUser(admin);
    toast.success(state.message || 'Login successful');
    router.push('/manager');
  }

}, [state.success, state.error, state.message]);

 
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

          <form action={formAction} className='flex flex-1 flex-col gap-4 justify-center p-5'>
            <Typography variant='h2' font='poppins'>
             Two-Factor Authentication
            </Typography>

            <Typography color='primary' className='text-lg' font='poppins'>
             Check your email inbox for a 4-digit OTP. Enter it below
            </Typography>

            <TextField
              startIcon={<UserRound size={18} />}
              placeholder='Please Enter the 4-digit OTP'
              name='otp'
              type='number'
              className='outline-none w-full'
              autoComplete="otp"
              variant='primary'
              desc={`${state.error ? state.error: ''}`}
              error={state.error ? true: false}
              descClassName='text-xs text-destructive font-bold'
              required
            />

            <Button loading={isPending} type='submit' endIcon={<ArrowRight size={18} />}>
              Continue
            </Button>

            <div className='flex items-center justify-between'>
              <Link href='/auth/sign-in/admin' className='text-primary font-semibold text-sm uppercase'>
                Back to Sign In
              </Link>
              <Button size='sm' disabled>
                Resend OTP
              </Button>
            </div>
          </form>
        </div>

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

export default AdminVerifyOTPPage;

