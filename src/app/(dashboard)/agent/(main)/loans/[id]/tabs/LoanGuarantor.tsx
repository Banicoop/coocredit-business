'use client';

import { useState } from 'react';
import { LoanGuarantorProps } from '@/types/domains/loan.types';
import GuarantorSection from '../../_sections/GuarantorSection';
import AddGuarantorDocumentModal from '../../@modals/AddGuarantorDocumentModal';


type Guarantor = NonNullable<LoanGuarantorProps['guarantors']>[number];

const LoanGuarantor = ({ guarantors, signature }: LoanGuarantorProps) => {
  const [selectedGuarantor, setSelectedGuarantor] = useState<Guarantor | null>(
    null
  );
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
      // TODO: replace with the real delete endpoint for this app.
      // await fetch(`/api/loans/guarantors/${guarantorId}/documents/${documentId}`, {
      //   method: 'DELETE',
      // });
      console.log('Removing document', documentId, 'for guarantor', guarantorId);
    } catch (error) {
      console.error('Failed to remove guarantor document', error);
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
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('documentType', documentType);
      formData.append('file', file);

      // TODO: replace with the real upload endpoint for this app.
      // await fetch(`/api/loans/guarantors/${guarantor._id}/documents`, {
      //   method: 'POST',
      //   body: formData,
      // });
      console.log('Uploading document for guarantor', guarantor._id, {
        documentType,
        file,
      });

      handleCloseDocumentModal();
    } catch (error) {
      console.error('Failed to upload guarantor document', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <GuarantorSection
        guarantors={guarantors}
        signature={signature}
        onAddDocument={handleAddDocument}
        //@ts-ignore
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
