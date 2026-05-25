import React, { Dispatch, SetStateAction } from 'react'
import { Modal } from '../primitives/modals/Modal';
import { Flex, FlexCol } from './ui-layout';
import { LogOut } from 'lucide-react';
import Typography from '../primitives/Typography';
import Button from '../primitives/buttons/Button';

type Props = {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const LogoutModal = ({open, setOpen}: Props) => {
  return (
    <Modal open={open} onOpenChange={setOpen}>
        <Modal.Body>
            <FlexCol className='gap-2'>
                <Flex className='justify-center p-4 rounded-full bg-accent w-fit mx-auto'>
                    <LogOut size={18} className='text-primary'/>
                </Flex>
                <Typography>Ready to Leave?</Typography>
                <Typography color='primary'>You are about to log out of CooCredit. Make sure all your field collection data has been synced to the central server.</Typography>

                <Button>Log Out Now</Button>
                <Button variant='outline'>Cancel and Stay</Button>
            </FlexCol>
        </Modal.Body>
    </Modal>
  )
}

export default LogoutModal;
