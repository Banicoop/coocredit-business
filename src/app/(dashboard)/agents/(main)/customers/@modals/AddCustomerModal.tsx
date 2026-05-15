import { Modal } from '@/components/primitives/modals/Modal';
import React from 'react'

const AddCustomerModal = ({open, setOpen}: {open: boolean, setOpen: any}) => {
  return (
    <Modal open={open} onOpenChange={setOpen}>
        <Modal.Header title='Onboard New Customer' description='Complete all required fields to initiate a new loan application.'/>
    </Modal>
  )
}

export default AddCustomerModal;
