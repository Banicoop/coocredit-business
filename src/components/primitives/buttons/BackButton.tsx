'use client';

import { useRouter } from "next/navigation";
import Button from "./Button"
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
    label?: string;
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