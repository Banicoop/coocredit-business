'use client';

import Link from 'next/link';
import Button from '../primitives/buttons/Button';
import Typography from '../primitives/Typography';
import { FlexCol, Grid } from './ui-layout';
import { useRouter } from 'next/navigation';

interface ErrorPageProps {
    label?: string;
    onClick?: () => void;
    href?: string
}

const ErrorPage = ({label, href}: ErrorPageProps) => {

  const router = useRouter();

  return (
    <Grid className='h-full w-full'>
      <FlexCol className="justify-center items-center h-full w-1/2 mx-auto text-center gap-4">
        <Typography className='text-[#E2DBEC] text-2xl lg:text-[100px] font-semibold'>Oops!</Typography>
        <Typography variant='p' weight='semibold' className='text-4xl text-red-400'>Something Went Wrong</Typography>
        <Typography variant='p' color='primary'>We're currently experiencing technical difficulties and our servers are temporarily down. Please try again in a few minutes.</Typography>
        <Typography color='active' variant='p'>Contact Support</Typography>

        {label && <Button className='py-3 px-6 bg-primary text-bgWhite rounded-[24px] w-full' onClick={() => router.refresh()}>{label}</Button>}
        {href && <Link  className='py-3 px-6 bg-primary text-card rounded-[24px] w-full' href={href}>Back to Dashboard</Link>}

      </FlexCol>
    </Grid>
  )
}

export default ErrorPage;
