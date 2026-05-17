'use client';

import { useRouter } from "next/navigation";
import Button from "./Button"
import { ArrowLeft } from "lucide-react";
import Typography from "../Typography";

interface BackButtonProps {
    label?: string;
    className?: string;
}

interface TitleTextProps {
    label: string;
    className?: string;
}

export const BackButton = ({label = 'Back', className = 'text-primary'}: BackButtonProps) => {

    const router = useRouter();

  return(
    <Button variant="ghost" startIcon={<ArrowLeft size={16}/>} className={`w-fit ${className}`} type="button" onClick={() => router.back()}>
        {label}
    </Button>
  )
}


export const TitleText = ({label, className}: TitleTextProps) => {
  return(
    <Typography className={`border-l-4 border-l-primary px-1 my-1 ${className}`} weight='bold'>{label}</Typography>
  )
}
