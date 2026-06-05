'use client';

import React, { useRef } from 'react';
import Button from '@/components/primitives/buttons/Button';
import Typography from '@/components/primitives/Typography';
import { Flex } from '@/components/ui/ui-layout';

type CardProps = {
  label: string;
  isUploaded?: boolean;
  onUpload?: (file: File) => void;
};

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
      <Typography>{label}</Typography>

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
