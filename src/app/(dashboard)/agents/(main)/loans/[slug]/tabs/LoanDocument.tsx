'use client';

import Typography from '@/components/primitives/Typography';
import { ColItem, PageHeader } from '@/components/ui/PageHeader';
import { Flex, FlexCol, Grid, GridItem } from '@/components/ui/ui-layout';
import { Download, Eye, File, FileUp } from 'lucide-react';

const documents = Array.from({length: 4}, (() => ({
  title: 'NIN Slip',
  fileName: 'NIN_Slip_Rodriguez.pdf',
  timestamp: 'Oct 12, 2026',
  size: '1.2 MB'
})))

const LoanDocument = () => {
  return (
    <Grid className='gap-5'>
      <PageHeader 
        title='Verification Files' 
        description='4 total documents uploaded' 
        actions={[
          {
            label: 'Upload New',
            onClick: () => console.log('CLicked!!'),
            icon: <FileUp size={18} />,
            variant: 'primary'
            
          }
        ]}
        />
      
      <Grid className='md:grid-cols-2 gap-6'>
        {documents.map((document, index) => (
          <GridItem key={index} className='grid grid-cols-[auto_1fr] gap-4 p-5 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200'>
            <div className='flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10'>
              <File size={26} className='text-primary' />
            </div>

            <FlexCol className='gap-1.5'>
              <ColItem item1={document.title} 
                item2={document.fileName} 
                className1='font-semibold' className2='text-[#546474] '/>

              <Typography variant='small' weight='semibold' color='primary'>
                Uploaded {document.timestamp} • {document.size}
              </Typography>

            <Flex className='gap-2.5'>
                <Typography
                  color='active'
                  weight='semibold'
                  variant='p'
                  startIcon={<Eye size={18} />}
                  className='cursor-pointer'
                >
                  View
                </Typography>

                <Typography
                  color='primary'
                  weight='semibold'
                  variant='p'
                  startIcon={<Download size={18} />}
                  className='cursor-pointer'
                >
                  Download
                </Typography>
            </Flex>
            </FlexCol>
          </GridItem>
        ))}

      </Grid>
    </Grid>
  )
}

export default LoanDocument;
