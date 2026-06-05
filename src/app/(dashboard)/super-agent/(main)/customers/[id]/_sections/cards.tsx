'use client';

import React, { useRef } from 'react';
import Button from '@/components/primitives/buttons/Button';
import Typography from '@/components/primitives/Typography';
import { Flex, FlexBox, FlexCol, Grid, GridItem } from '@/components/ui/ui-layout';
import { ProgressBar } from '@/components/ui/ProgessBar';
import { CapitalAllocationProps, CardProps, FinCardsProps } from '../../type';


export const FinActionsCards = ({title, actions}: FinCardsProps) => {
  return(
    <Grid className='bg-[#DCEAF5] rounded-lg p-4 gap-2 grid-cols-2'>
        <Typography color='primary' weight='semibold' className='col-span-2'>{title}</Typography>

      {actions.map((action) => (
        <FlexBox className='flex-col items-center justify-center cursor-pointer' onClick={action.onClick} key={action.label}>
            <span>{action.icon}</span>
            <Typography color='primary2' weight='semibold'>{action.label}</Typography>
        </FlexBox>
      ))}
    </Grid>
  )
}


export const CapitalAllocationCard = ({title, items}: CapitalAllocationProps) => {
  return(
    <GridItem className='gap-2'>
      <Typography color='primary' weight='semibold'>{title}</Typography>
      {items.map((item) => (
        <FlexCol className='gap-2' key={item.label}>
          <Flex className='justify-between w-full'>
            <Typography variant='small' color='primary2'>{item.label}</Typography>
            <Typography weight='semibold'>{item.val}%</Typography>
          </Flex>
          <ProgressBar value={item.val} className={item.className}/>
        </FlexCol>
      ))}
    </GridItem>
  )
}


const Card = ({
  label,
  isUploaded = false,
  onUpload,
}: CardProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      onUpload?.(file);
    }
  };

  return (
    <Flex className="items-center justify-between p-4 border rounded-xl">
      <Typography variant='small' color='primary'>{label}</Typography>
      {isUploaded ? (
        <Button disabled>
          Uploaded
        </Button>
      ) : (
        <>
          <Button onClick={handleUploadClick}>
            Upload
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            onChange={handleFileChange}
          />
        </>
      )}
    </Flex>
  );
};

export default Card;
