'use client';

import { Card, Field, FieldGrid } from '@/components/primitive-ui/card-ui';
import { MultiSelect } from '@/components/primitives/inputs/MultipleSelect';
import { FlexCol } from '@/components/ui/ui-layout';
import { formatCurrency, titleCase } from '@/helpers/funcs';
import React, { useRef, useState } from 'react';

type DocumentOption = {
  label: string;
  value: string;
};

type UploadedDocument = {
  slug: string;
  name: string;
  file: File;
};

const BusinessDocuments = ({
  business,
  documents,
}: {
  business: any;
  documents: any;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedDocument, setSelectedDocument] =
    useState<DocumentOption | null>(null);

  const [selectedDocuments, setSelectedDocuments] = useState<
    Record<string, string[]>
  >({});

  const [uploadedDocuments, setUploadedDocuments] = useState<
    Record<string, UploadedDocument[]>
  >({});

  const documentOptions: DocumentOption[] = documents.data.map(
    (document: { slug: string; name: string }) => ({
      label: document.name,
      value: document.slug,
    })
  );

  /**
   * When a document is selected from the MultiSelect
   */
  const handleDocumentChange = (
    businessId: string,
    values: string[]
  ) => {
    const previousValues = selectedDocuments[businessId] || [];

    // Find the newly selected document
    const newlySelected = values.find(
      (value) => !previousValues.includes(value)
    );

    // Update selected documents
    setSelectedDocuments((prev) => ({
      ...prev,
      [businessId]: values,
    }));

    if (!newlySelected) return;

    const document = documentOptions.find(
      (option) => option.value === newlySelected
    );

    if (!document) return;

    // Store the document we're about to upload
    setSelectedDocument(document);

    // Open file picker
    setTimeout(() => {
      fileInputRef.current?.click();
    }, 0);
  };

  /**
   * When the user actually selects a file
   */
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file || !selectedDocument) return;

    /**
     * At this point we know:
     *
     * selectedDocument.value = document slug
     * selectedDocument.label = document name
     * file = actual File object
     *
     * We can now save it for upload later.
     */

    console.log('Selected document:', selectedDocument);
    console.log('Selected file:', file);

    // For now, we'll store it.
    // You'll later send this to your upload API.
    setUploadedDocuments((prev) => {
      // Since the current business isn't stored here,
      // this version assumes a single active upload.
      return prev;
    });

    // Reset input so selecting the same file again works
    event.target.value = '';

    setSelectedDocument(null);
  };

  return (
    <FlexCol>
      {business &&
        business.map((business: any) => {
          const businessId = business.businessId;

          return (
            <FlexCol key={businessId} className="gap-4">
              <Card title="Business information">
                <FieldGrid>
                  <Field label="Business name" value={business.businessName} />
                  <Field label="Business ID" value={business.businessId} mono />
                  <Field label="Category" value={business.type} />
                  <Field label="Business type" value={titleCase(business.businessType)} />
                  <Field label="Registration number" value={business.registrationNumber} mono />
                  <Field label="Estimated profit" value={formatCurrency(business.estimatedProfi)} />
                </FieldGrid>
              </Card>

              {business.documentsRequired && (
                <Card
                  title="Required Documentation"
                  action={
                    <MultiSelect
                      wrapperClass="w-60"
                      options={documentOptions}
                      values={selectedDocuments[businessId] || []}
                      onChange={(values) =>
                        handleDocumentChange(
                          businessId,
                          values
                        )
                      }
                      placeholder="Upload Document"
                    />
                  }
                >
                  <ol className="list-decimal grid grid-cols-2 px-6">
                    {business.documentsRequired.map(
                      (document: string) => (
                        <li key={document}>
                          {titleCase(document)}
                        </li>
                      )
                    )}
                  </ol>
                </Card>
              )}
            </FlexCol>
          );
        })}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />
    </FlexCol>
  );
};

export default BusinessDocuments;
