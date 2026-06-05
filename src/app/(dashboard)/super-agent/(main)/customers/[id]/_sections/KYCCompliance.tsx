'use client';

import Typography from '@/components/primitives/Typography';
import { Flex, FlexCol, GridItem } from '@/components/ui/ui-layout';
import { useState } from 'react';
import Card from './cards';

type DocumentItem = {
  label: string;
  isUploaded: boolean;
  file?: File;
};


export const FinScore = () => {
    return(
        <GridItem className='gap-4'>
            <Typography color='primary2' weight='semibold'>Financial Scoring</Typography>
            <FlexCol className='w-full items-center justify-center'>
                <FlexCol className='w-25 h-25 items-center justify-center rounded-full border-4 border-primary'>
                    <Typography variant='h1'>A+</Typography>
                    <Typography variant='small'>Premium</Typography>
                </FlexCol>
            </FlexCol>
            <Typography className='text-center' color='primary'>Based on credit utilization, repayment speed, and operational longevity.</Typography>
        </GridItem>
    )
}

const KYCCompliance = () => {
  const [documents, setDocuments] = useState<DocumentItem[]>([
    {
      label: 'Business Registration (CAC)',
      isUploaded: true,
    },
    {
      label: 'Tax Clearance Certificate',
      isUploaded: true,
    },
    {
      label: 'Utility Bill (Last 3 Months)',
      isUploaded: false,
    },
  ]);

  const handleUpload = (label: string, file: File) => {
    console.log('Uploading:', label, file);

    setDocuments((prev) =>
      prev.map((doc) =>
        doc.label === label
          ? {
              ...doc,
              file,
              isUploaded: true,
            }
          : doc
      )
    );

    // Call your upload API here
    // await uploadDocument(file)
  };

  const completion = Math.round(
    (documents.filter((doc) => doc.isUploaded).length /
      documents.length) *
      100
  );

  return (
    <GridItem className="gap-4">
      <Flex className="justify-between items-center">
        <Typography color="primary2" weight="semibold">
          KYC Compliance
        </Typography>

        <Typography
          color="primary2"
          weight="semibold"
          className="py-1 px-2.5 bg-accent rounded-lg text-lg"
        >
          {completion}% Complete
        </Typography>
      </Flex>

      {documents.map((document) => (
        <Card
          key={document.label}
          label={document.label}
          isUploaded={document.isUploaded}
          onUpload={(file) =>
            handleUpload(document.label, file)
          }
        />
      ))}
    </GridItem>
  );
};

export default KYCCompliance;
