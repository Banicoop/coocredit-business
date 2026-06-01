'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { Mic, Paperclip, SendHorizonal } from 'lucide-react';

import { TextField } from '@/components/primitives/inputs/TextField';
import Typography from '@/components/primitives/Typography';
import { Flex, FlexCol } from '@/components/ui/ui-layout';

import user from '@/assets/images/user.png';

interface Note {
  id: string;
  message: string;
  timestamp: string;
  user: {
    name: string;
    avatar: string;
  };
}

const LoanNotes = () => {
  const [message, setMessage] = useState('');

  const [notes, setNotes] = useState<Note[]>([]);

  const isTyping = useMemo(
    () => message.trim().length > 0,
    [message]
  );

  const handleSend = () => {
    if (!message.trim()) return;

    setNotes((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        message,
        timestamp: new Date().toLocaleString(),
        user: {
          name: 'Ifeanyi Omejua',
          avatar: user.src,
        },
      },
    ]);

    setMessage('');
  };

  return (
    <div className='flex h-[calc(100vh-100px)] flex-col'>
      {/* Messages Section */}
      <div className='flex-1 overflow-y-auto pr-2'>
        {notes.length === 0 ? (
          <div className='flex h-full flex-col items-center justify-center text-center'>
            <Typography
              weight='semibold'
              className='text-lg'
            >
              No Notes Yet
            </Typography>

            <Typography
              className='mt-2 text-slate-500'
            >
              Add your first loan note to start tracking updates.
            </Typography>
          </div>
        ) : (
          <FlexCol className='gap-4 pb-4'>
            {notes.map((note) => (
              <div
                key={note.id}
                className='rounded-xl border border-slate-200 bg-card p-4'
              >
                <Flex className='items-start gap-3'>
                  <Image
                    src={note.user.avatar}
                    alt={note.user.name}
                    width={40}
                    height={40}
                    className='rounded-full'
                  />

                  <FlexCol className='gap-1'>
                    <Typography weight='semibold'>
                      {note.user.name}
                    </Typography>

                    <Typography className='text-sm text-slate-500'>
                      {note.timestamp}
                    </Typography>

                    <Typography className='mt-2'>
                      {note.message}
                    </Typography>
                  </FlexCol>
                </Flex>
              </div>
            ))}
          </FlexCol>
        )}
      </div>

      {/* Input Section */}
      {/* <div className='border-t bg-background pt-4'> */}
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Add notes...'
          className='w-full outline-none'
          wrapperClassName='w-full'
          endIcon={
            isTyping ? (
              <Flex
                onClick={handleSend}
                className='cursor-pointer rounded-full bg-green-600 p-2.5'
              >
                <SendHorizonal
                  size={20}
                  className='text-card'
                />
              </Flex>
            ) : (
              <Flex className='gap-2'>
                <Flex className='rounded-full bg-card p-2.5'>
                  <Paperclip
                    size={24}
                    className='cursor-pointer text-primary'
                  />
                </Flex>

                <Flex className='rounded-full bg-card p-2.5'>
                  <Mic
                    size={24}
                    className='cursor-pointer text-primary'
                  />
                </Flex>
              </Flex>
            )
          }
        />
      {/* </div> */}
    </div>
  );
};

export default LoanNotes;

