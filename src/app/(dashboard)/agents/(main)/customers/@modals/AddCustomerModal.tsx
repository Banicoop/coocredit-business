import { TextArea } from '@/components/primitives/inputs/TextArea';
import { TextField } from '@/components/primitives/inputs/TextField';
import { Modal } from '@/components/primitives/modals/Modal';
import Typography from '@/components/primitives/Typography';
import React from 'react'

const AddCustomerModal = ({open, setOpen}: {open: boolean, setOpen: any}) => {
  return (
    <Modal open={open} onOpenChange={setOpen}>
        <Modal.Header title='Onboard New Customer' description='Complete all required fields to initiate a new loan application.'/>
        <Modal.Body>
            <div className="grid grid-cols-2 gap-4">
                <Typography className='col-span-2 border-l-4 border-l-primary px-1 my-1' weight='bold'>PERSONAL INFORMATION</Typography>
                <TextField 
                    label='Full Name'
                    variant='primary'
                    placeholder='Enter first and last name'/>
                <TextField 
                    label='Phone Number'
                    variant='primary'
                    placeholder='+234 000 000 0000'/>
                <TextField 
                    label='Date of Birth'
                    variant='primary'
                    type='date'
                />
                <TextField 
                    label='Account Number'
                    variant='primary'
                    placeholder='10-digit account ID'/>
                <Typography className='col-span-2 border-l-4 border-l-primary px-1 my-1' weight='bold'>LOCATION & LOAN DETAILS</Typography>

                <TextArea 
                    label='Residential Address' 
                    wrapperClass='col-span-2' 
                    placeholder='Street name, landmark, and state'/>
            </div>
        </Modal.Body>
    </Modal>
  )
}

export default AddCustomerModal;
