'use client';

import Typography from '@/components/primitives/Typography';
import { ColItem, PageHeader } from '@/components/ui/PageHeader';
import { ProgressBar } from '@/components/ui/ProgessBar';
import { Flex } from '@/components/ui/ui-layout';
import React, { useState } from 'react'
import DailyList from './_sections/DailyList';
import { PlusCircle } from 'lucide-react';
import NewTask from './_sections/NewTask';

const DailyTaskPage = () => {

  const [openModal, setOpenModal] = useState(false);

  return (
    <article className='grid gap-5'>
      <PageHeader title='Daily Tasks' actions={[
        {
          label: 'New Task',
          variant: 'primary',
          icon: <PlusCircle size={20}/>,
          onClick: () => setOpenModal(true)
        }
      ]}/>

      <Flex className='bg-card flex-col md:flex-row rounded-xl gap-5 py-4 px-6 items-center justify-between'>
        <div className="flex-1">
          <ColItem 
            item1='My Daily Schedule' 
            className1='text-[24px] font-semibold'
            item2='Today is Tuesday, Oct 24th. You have 9 visits and tasks lined up for today.' className2=''/>
        </div>

          <div className="flex flex-1 flex-col gap-1.5 w-full">
            <div className="flex items-center justify-between">
              <Typography variant='small' color='active' weight='semibold'>6 of 9 tasks completed</Typography>
              <Typography variant='small' color='primary'>66%</Typography>
            </div>
            <ProgressBar value={66} className='bg-primary'/>
          </div>
      </Flex>

      <DailyList/>

      <NewTask open={openModal} setOpen={setOpenModal}/>
    </article>
  )
}

export default DailyTaskPage;
