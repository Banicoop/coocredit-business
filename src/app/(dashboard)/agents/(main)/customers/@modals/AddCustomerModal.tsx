import { TextField } from '@/components/primitives/inputs/TextField';
import { Modal } from '@/components/primitives/modals/Modal';
import React from 'react'

const AddCustomerModal = ({open, setOpen}: {open: boolean, setOpen: any}) => {
  return (
    <Modal open={open} onOpenChange={setOpen}>
        <Modal.Header title='Onboard New Customer' description='Complete all required fields to initiate a new loan application.'/>
        <Modal.Body>
            <div className="grid grid-cols-2 gap-4">
                <TextField 
                    variant='primary'
                    placeholder='Enter first and last name'/>
            </div>
        </Modal.Body>
    </Modal>
  )
}

export default AddCustomerModal;
