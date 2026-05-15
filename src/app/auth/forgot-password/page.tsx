'use client';


import fp from '@/assets/svgs/fp-page.png';
import Typography from '@/components/primitives/Typography';
import { TextField } from '@/components/primitives/inputs/TextField';
import Button from '@/components/primitives/buttons/Button';
import { ArrowLeft, Mail, MailCheckIcon, SendHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ForgotPasswordPage = () => {

  const router = useRouter();

  return (
    <section className="grid min-h-screen lg:grid-cols-2">
      
      {/* Image Section */}
      <div style={{
        backgroundImage: `url(${fp.src})`
      }} className="relative hidden lg:flex items-center justify-center bg-primary overflow-hidden" />


      {/* Form Section */}
      <div className="flex items-center justify-center px-6 py-10">
        <form className="w-full max-w-md flex flex-col gap-5">
          <Typography variant="h1" color="default">
            Reset Password
          </Typography>

          <Typography color="primary" className="text-lg">
            No worries! It happens. Please enter the email address associated
            with your agent account.
          </Typography>

          <TextField
            label="Email Address"
            type="email"
            startIcon={<Mail size={18}/>}
            placeholder="e.g. agent.name@coocredit.com"
            className="outline-none"
          />

          <Button endIcon={<SendHorizontal size={18} />} size="lg" type='submit'>
            Send Reset Link
          </Button>

          <Button
            type="button"
            variant="ghost"
            startIcon={<ArrowLeft size={18} className="mt-1" />}
            onClick={() => router.push('/auth/sign-in')}
          >
            Back to Login
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
