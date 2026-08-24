'use client';

import { Card,  Field, FieldGrid } from '@/components/primitive-ui/card-ui';
import { MultiSelect } from '@/components/primitives/inputs/MultipleSelect';
import { FlexCol } from '@/components/ui/ui-layout';

import {  formatCurrency,  titleCase } from '@/helpers/funcs';
import React, { useEffect,  useRef,  useState } from 'react';
import { Signature } from '@/types/types';
import { addBusinessDocument, uploadToCloudinary } from '@/lib/uploads/file-uploads';
import Image from 'next/image';
import Button from '@/components/primitives/buttons/Button';


type DocumentOption = {
  label: string;
  value: string;
};


type PendingDocument = {
  id: string;
  businessId: string;
  slug: string;
  name: string;
  file: File;
  previewUrl: string;
  status: 'pending' | 'uploading' | 'uploaded' | 'error';
  url?: string;
  error?: string;
};


const BusinessDocuments = ({ business, documents, signature }: { business: any; documents: any; signature: Signature; }) => {

  const fileInputRef = useRef<HTMLInputElement>(null);
  /**
   * The document currently waiting for a file.
   */
  const [selectedDocument, setSelectedDocument] = useState<{
      businessId: string;
      document: DocumentOption;
    } | null>(null);

  /**
   * Documents selected in the MultiSelect.
   *
   * businessId -> document slugs
   */
  const [selectedDocuments, setSelectedDocuments] = useState<Record<string, string[]>>({});
  /**
   * Files that have been selected but not yet uploaded.
   */
  const [pendingDocuments, setPendingDocuments] = useState<PendingDocument[]>([]);
  /**
   * Uploading state.
   */
  const [isUploading, setIsUploading] = useState(false);

  /**
   * Convert API documents into MultiSelect options.
   */
  const documentOptions: DocumentOption[] = documents.data.map((document: { slug: string; name: string }) => ({
        label: document.name,
        value: document.slug,
      })
    );

  /**
   * Handle selecting a document from MultiSelect.
   */
  const handleDocumentChange = ( businessId: string, values: string[]) => {
    const previousValues = selectedDocuments[businessId] || [];
    /**
     * Find the document that was newly selected.
     */
    const newlySelected = values.find((value) =>!previousValues.includes(value));
    /**
     * Find a document that was removed.
     */
    const removedDocument = previousValues.find((value) =>!values.includes(value));
    /**
     * Update selected documents.
     */
    setSelectedDocuments((prev) => ({ ...prev, [businessId]: values }));
    /**
     * If a document was removed,
     * remove its pending file as well.
     */
    if (removedDocument) {
      setPendingDocuments((prev) =>
        prev.filter(
          (document) =>
            !(
              document.businessId === businessId &&
              document.slug === removedDocument
            )
        )
      );
    }


    /**
     * Nothing new was selected.
     */
    if (!newlySelected) return;


    const document = documentOptions.find((option) => option.value === newlySelected);

    if (!document) return;
    /**
     * Store the document we're expecting a file for.
     */
    setSelectedDocument({ businessId, document });
    /**
     * Open the file picker.
     */
    setTimeout(() => {
      fileInputRef.current?.click();
    }, 0);
  };


  /**
   * Handle file selection.
   */
  const handleFileChange = ( event: React.ChangeEvent<HTMLInputElement>) => {

    const file = event.target.files?.[0];
    if (!file || !selectedDocument) {
      return;
    }

    const { businessId, document } = selectedDocument;
    /**
     * Make sure this document doesn't
     * already have a pending file.
     */
    setPendingDocuments((prev) => {
      const existing = prev.find((item) =>
          item.businessId === businessId &&
          item.slug === document.value
        );
      /**
       * Revoke old preview URL if replacing file.
       */
      if (existing) {
        URL.revokeObjectURL(existing.previewUrl);
      }

      const newDocument: PendingDocument = {
        id: crypto.randomUUID(),
        businessId,
        slug: document.value,
        name: document.label,
        file,
        previewUrl: URL.createObjectURL(file),
        status: 'pending',
      };

      return [
        ...prev.filter(
          (item) =>
            !(
              item.businessId === businessId &&
              item.slug === document.value
            )
        ),
        newDocument,
      ];
    });
    /**
     * Reset input.
     *
     * This allows the user to select
     * the same file again.
     */
    event.target.value = '';
    setSelectedDocument(null);
  };


  /**
   * Remove a pending document.
   */
  const removePendingDocument = ( documentId: string ) => {
    setPendingDocuments((prev) => {
      const document = prev.find((item) => item.id === documentId);

      if (document) {URL.revokeObjectURL(document.previewUrl);
        /**
         * Remove it from selected documents too.
         */
        setSelectedDocuments((current) => ({
          ...current,
          [document.businessId]:
            (
              current[document.businessId] || []
            ).filter(
              (slug) =>
                slug !== document.slug
            ),
        }));
      }
      return prev.filter(
        (item) =>
          item.id !== documentId
      );
    });
  };

  const handleDocumentSelect = ( businessId: string, document: DocumentOption ) => {
    setSelectedDocument({
      businessId,
      document,
    });
    // Open the file picker
    setTimeout(() => {
      fileInputRef.current?.click();
    }, 0);
  };

  const unselectDocument = ( businessId: string, documentSlug: string ) => {
    setSelectedDocuments((prev) => ({
      ...prev, [businessId]: (prev[businessId] || []).filter(
        (slug) => slug !== documentSlug
      ),
    }));
  };

  /**
   * Upload all pending documents.
   */
  const handleUploadDocuments = async () => {

    if (!pendingDocuments.length) {
      return;
    }
    setIsUploading(true);
    try {

      for (const document of pendingDocuments) {
        /**
         * Mark document as uploading.
         */
        setPendingDocuments((prev) => prev.map((item) => item.id === document.id ? {
                  ...item,
                  status: 'uploading',
                }
              : item ));
        /**
         * 1. Upload to Cloudinary.
         */
        const cloudinaryResponse = await uploadToCloudinary({ ...signature,
            file: document.file,
            folder: 'uploads',
          }) as any;

        console.log('CLOUDINARY:', cloudinaryResponse)

        const cloudinaryUrl = cloudinaryResponse.secure_url;
        /**
         * 2. Add the Cloudinary URL
         *    as a business verification document.
         *
         * Replace this with your actual API function.
         */
        await addBusinessDocument({ businessId: document.businessId,
          verificationDocument: {
            type: document.slug,
            url: cloudinaryUrl,
            mime: document.file.type,
          }, 
        });
        /**
         * Mark as uploaded.
         */
        setPendingDocuments((prev) => prev.map((item) => item.id === document.id ? {
                  ...item, status: 'uploaded', url: cloudinaryUrl }: item
        ));
         // 4. Remove it from MultiSelect
        unselectDocument(document.businessId, document.slug);
      }
    } catch (error) {
      console.error('Document upload failed:', error);
      /**
       * Mark failed uploads.
       */
      setPendingDocuments((prev) => prev.map((item) => item.status === 'uploading' ? {
                ...item, status: 'error',
                error: 'Failed to upload document' }
            : item
      ));
    } finally {
      setIsUploading(false);
    }
  };
  /**
   * Cleanup preview URLs when component
   * is unmounted.
   */
  useEffect(() => { return () => {
      pendingDocuments.forEach((document) => {
          URL.revokeObjectURL(
            document.previewUrl
          );
        }
      );
    };
  }, []);



  return (
    <FlexCol>
      {business && business.map((business: any) => {
          const businessId = business.businessId;
          const businessPendingDocuments = pendingDocuments.filter((document) => document.businessId === businessId);
          return (
            <FlexCol key={businessId} className="gap-4">
              {/* Business information */}
              <Card title="Business information">
                <FieldGrid>
                  <Field label="Business name" value={business.businessName}/>
                  <Field label="Business ID" value={business.businessId} mono />
                  <Field label="Category" value={business.type} />
                  <Field label="Business type" value={titleCase(business.businessType)} />
                  <Field label="Registration number" value={business.registrationNumber} mono />
                  <Field label="Estimated profit" value={formatCurrency(business.estimatedProfit)} />
                </FieldGrid>
              </Card>

              {/* Documents */}
              {business.documentsRequired && (
                <Card title="Required Documentation" action={
                    <MultiSelect
                      wrapperClass="w-60"
                      options={documentOptions}
                      values={selectedDocuments[businessId] || []}
                      onChange={(values) => handleDocumentChange(businessId, values)
                      }
                      onSelect={(document) =>
                        handleDocumentSelect(
                          businessId,
                          document
                        )
                      }
                      placeholder="Upload Document"
                    />} >

                  {/* Required documents */}
                  <ol className="list-decimal grid grid-cols-2 px-6">
                    {business.documentsRequired.map((document: string) => (
                        <li key={document}>{titleCase(document)}</li>
                      ))}
                  </ol>
                  {/* Selected files */}
                  {businessPendingDocuments.length > 0 && (
                    <div className="mt-6 space-y-3">
                      <p className="font-semibold text-sm">Documents ready for upload</p>
                      {businessPendingDocuments.map((document) => (
                          <div key={document.id} className="flex items-center gap-4 border rounded-lg p-3">
                            {/* Preview */}
                            <div className="w-20 h-20 rounded-lg overflow-hidden border bg-gray-50 flex items-center justify-center">
                              {document.file.type.startsWith('image/') ? (
                                <Image src={document.previewUrl} alt={document.name} width={40} height={20} className="w-full h-full object-cover" />
                              ) : (
                                <div className="text-xs text-center px-2">
                                  {document.file.type || 'FILE'}
                                </div>
                              )}
                            </div>
                            {/* Information */}
                            <div className="flex-1 min-w-0">
                              <p className="font-medium">{document.name}</p>
                              <p className="text-sm text-gray-500 truncate">
                                {document.file.name}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {(
                                  document.file.size /
                                  1024 /
                                  1024
                                ).toFixed(2)}{' '}
                                MB
                              </p>
                              {document.status === 'uploading' && (
                                <p className="text-sm">
                                  Uploading...
                                </p>
                              )}
                              {document.status === 'uploaded' && (
                                <p className="text-sm">Uploaded successfully</p>
                              )}

                              {document.status === 'error' && (
                                <p className="text-sm text-red-500">
                                  {document.error}
                                </p>
                              )}
                            </div>
                            {/* Remove */}
                            {(document.status !== 'uploading' && document.status !== 'uploaded') || (document.status === 'uploaded') && (
                              <Button type="button" variant='light' className='text-red-700' onClick={() => removePendingDocument(document.id)}>
                                Remove
                              </Button>
                            )}
                          </div>
                        ))}
                    </div>
                  )}

                  {/* Upload button */}
                  {businessPendingDocuments.some((document) => document.status === 'pending') && (
                    <Button type="button" loading={isUploading} onClick={handleUploadDocuments} disabled={isUploading}
                      className="mt-6 px-4 py-2 rounded-lg disabled:opacity-50">
                      {isUploading ? 'Uploading...' : 'Upload Documents'}
                    </Button>
                  )}
                </Card>
              )}
            </FlexCol>
          );
        })}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.pdf"
        className="hidden"
        onChange={
          handleFileChange
        } />

    </FlexCol>
  );
};


export default BusinessDocuments;
