
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { LoanGuarantorProps } from '@/types/domains/loan.types';
import GuarantorSection from '../../_sections/GuarantorSection';
import AddGuarantorDocumentModal from '../../@modals/AddGuarantorDocumentModal';

import {
  uploadToCloudinary,
  addGurantorDocument,
} from '@/lib/uploads/file-uploads';

type Guarantor = NonNullable<LoanGuarantorProps['guarantors']>[number];

const LoanGuarantor = ({
  guarantors,
  signature,
}: LoanGuarantorProps) => {
  const router = useRouter();

  const [selectedGuarantor, setSelectedGuarantor] =
    useState<Guarantor | null>(null);

  const [documentModalOpen, setDocumentModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleAddDocument = (guarantor: Guarantor) => {
    setSelectedGuarantor(guarantor);
    setDocumentModalOpen(true);
  };

  const handleCloseDocumentModal = () => {
    if (isUploading) return;

    setDocumentModalOpen(false);
    setSelectedGuarantor(null);
  };


  const handleRemoveDocument = async (
    guarantorId: string,
    documentId: string
  ) => {
    if (!guarantorId || !documentId) return;

    try {
      // Implement the document deletion endpoint here.
      console.log('Removing document:', { guarantorId, documentId });
    } catch (error) {
      console.error('Failed to remove guarantor document:', error);
      toast.error('Failed to remove document');
    }
  };

  const handleUploadDocument = async ({
    guarantor,
    documentType,
    file,
  }: {
    guarantor: Guarantor;
    documentType: string;
    file: File;
  }) => {
    if (isUploading) return;

    setIsUploading(true);

    if (
    !signature?.timestamp ||
    !signature.signature ||
    !signature.cloudName ||
    !signature.apiKey
  ) {
    throw new Error('Invalid Cloudinary signature');
  }
    
    try {
      // Step 1: Upload document to Cloudinary
      const cloudinaryResponse = (await uploadToCloudinary({
        ...signature,
        file,
        folder: 'uploads',
      })) as { secure_url?: string };

      const cloudinaryUrl = cloudinaryResponse.secure_url;

      if (!cloudinaryUrl) {
        throw new Error('Cloudinary upload failed. No file URL returned.');
      }

      // Step 2: Save document details to the database
      await addGurantorDocument({
        guarantorId: guarantor._id,
        verificationDocument: {
          type: documentType,
          url: cloudinaryUrl,
          mime: file.type,
        },
      });

      // Step 3: Notify user
      toast.success(
        `${documentType.replace(/-/g, ' ')} uploaded successfully`
      );

      // Step 4: Close modal after successful upload
      setDocumentModalOpen(false);
      setSelectedGuarantor(null);

      // Step 5: Refresh server data
      router.refresh();
    } catch (error) {
      console.error('Failed to upload guarantor document:', error);

      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to upload guarantor document. Please try again.'
      );
    } finally {
      setIsUploading(false);
    }
  };

  console.log('guarantor:', guarantors);

  return (
    <>
      <GuarantorSection
        guarantors={guarantors}
        signature={signature}
        onAddDocument={handleAddDocument}
        // @ts-ignore
        onRemoveDocument={handleRemoveDocument}
      />

      <AddGuarantorDocumentModal
        open={documentModalOpen}
        guarantor={selectedGuarantor}
        onClose={handleCloseDocumentModal}
        onUpload={handleUploadDocument}
        isUploading={isUploading}
      />
    </>
  );
};

export default LoanGuarantor;
