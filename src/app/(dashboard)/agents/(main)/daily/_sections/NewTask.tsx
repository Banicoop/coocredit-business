import Button from '@/components/primitives/buttons/Button';
import CustomSelect from '@/components/primitives/inputs/CustomSelect';
import { MultiSelect } from '@/components/primitives/inputs/MultipleSelect';
import { TextArea } from '@/components/primitives/inputs/TextArea';
import { TextField } from '@/components/primitives/inputs/TextField';
import { Modal } from '@/components/primitives/modals/Modal';
import { Grid } from '@/components/ui/ui-layout';
import React, { Dispatch, SetStateAction } from 'react'

type Props = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const NewTask = ({open, setOpen}: Props) => {
    
  return (
    <Modal open={open} onOpenChange={setOpen}>
        <Modal.Header title='Schedule New Visit'/>
        <Modal.Body>
            <Grid className='gap-4'>
                <MultiSelect label='Search Customer' placeholder='Enter name or ID...' options={[]} />
                <div className="flex flex-col md:flex-row gap-2.5 w-full">
                    <TextField type='date' label='Visit Date' wrapperClassName='w-full' />
                    <TextField type='time' label='Preferred Time' wrapperClassName='w-full'/>
                </div>
                <CustomSelect label='Visit Purpose' options={[{label: 'Business Verification', value: 'val1'}, {label: 'Notes & Instructions', value: 'val2'}]} wrapperClass='h-10'/>
                <TextArea label='Notes & Instructions' placeholder='Enter specific field notes for this visit...' wrapperClass='mt-4'/>
            </Grid>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='ghost' className='border'>Cancel</Button>
            <Button>Schedule Visit</Button>
        </Modal.Footer>
    </Modal>
  )
}

export default NewTask;
