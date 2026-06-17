'use client';

import React, { Dispatch, SetStateAction } from 'react'
import { Modal } from '../primitives/modals/Modal';
import { Flex, FlexCol } from './ui-layout';
import { LogOut } from 'lucide-react';
import Typography from '../primitives/Typography';
import Button from '../primitives/buttons/Button';
import { useUserStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';

type Props = {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}


const LogoutModal = ({open, setOpen}: Props) => {

    const { setUser } = useUserStore();
    const router = useRouter();

    
    const handleLogout = () => {
        setUser(null);
        router.push('/auth/sign-in');
    }


  return (
    <Modal open={open} onOpenChange={setOpen} >
        <Modal.Header title='Ready to Leave?'/>
        <Modal.Body>
            <FlexCol className='gap-4'>
                <Flex className='justify-center p-4 rounded-full bg-accent w-fit mx-auto'>
                    <LogOut size={18} className='text-primary'/>
                </Flex>
                <Typography variant='p' color='primary' className='text-center'>You are about to log out of CooCredit. Make sure all your field collection data has been synced to the central server.</Typography>

                <Button onClick={handleLogout}>Log Out Now</Button>
                <Button variant='ghost' className='border' onClick={() => setOpen(false)}>Cancel and Stay</Button>
            </FlexCol>
        </Modal.Body>
        <Modal.Footer>
                <Typography color='primary' className='text-center w-full'>SESSION SECURITY: AES-256 ENCRYPTED</Typography>
        </Modal.Footer>
    </Modal>
  )
}

export default LogoutModal;
