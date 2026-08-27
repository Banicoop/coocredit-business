'use client';

import Button from '@/components/primitives/buttons/Button';
import { MultiSelect } from '@/components/primitives/inputs/MultipleSelect';
import Typography from '@/components/primitives/Typography';
import { ColItem } from '@/components/ui/PageHeader';
import { Flex, FlexCol, Grid, GridItem } from '@/components/ui/ui-layout';
import { addBusinessDocument, uploadToCloudinary } from '@/lib/uploads/file-uploads';
import { PendingDocument } from '@/types/domains/documentstypes';
import { Signature } from '@/types/types';
import { Download, Eye, File } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type DocumentOption = {
  name: string;
  slug: string;
};

const LoanDocument = ({ documents, signature, businessId, loanDocuments }: {
  documents: DocumentOption[];
  signature: Signature;
  businessId: string;
  loanDocuments: any[]
}) => {
  const documentOptions = documents.map((doc) => ({
    label: doc.name,
    value: doc.slug,
  }));

  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * The document we're currently expecting a file for
   * (kept in DocumentOption shape — name/slug — everywhere,
   * so there's a single source of truth for this type).
   */
  const [selectedDocument, setSelectedDocument] = useState<{
    businessId: string;
    document: DocumentOption;
  } | null>(null);

  /** businessId -> selected document slugs */
  const [selectedDocuments, setSelectedDocuments] = useState<Record<string, string[]>>({});
  const [pendingDocuments, setPendingDocuments] = useState<PendingDocument[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Ref mirror so the unmount cleanup effect always sees the latest list.
  const pendingDocumentsRef = useRef<PendingDocument[]>([]);
  useEffect(() => {
    pendingDocumentsRef.current = pendingDocuments;
  }, [pendingDocuments]);

  const handleDocumentChange = (businessId: string, values: string[]) => {
    const previousValues = selectedDocuments[businessId] || [];
    const newlySelectedSlug = values.find((v) => !previousValues.includes(v));
    const removedSlug = previousValues.find((v) => !values.includes(v));

    setSelectedDocuments((prev) => ({ ...prev, [businessId]: values }));

    if (removedSlug) {
      setPendingDocuments((prev) =>
        prev.filter((d) => !(d.businessId === businessId && d.slug === removedSlug))
      );
    }

    if (!newlySelectedSlug) return;

    // Look up directly in `documents` — it's already {name, slug},
    // no need to go through the {label, value} option list.
    const document = documents.find((d) => d.slug === newlySelectedSlug);
    if (!document) return;

    setSelectedDocument({ businessId, document });
    setTimeout(() => fileInputRef.current?.click(), 0);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedDocument) return;

    const { businessId, document } = selectedDocument;

    setPendingDocuments((prev) => {
      const existing = prev.find(
        (item) => item.businessId === businessId && item.slug === document.slug
      );
      if (existing) {
        URL.revokeObjectURL(existing.previewUrl);
      }

      const newDocument: PendingDocument = {
        id: crypto.randomUUID(),
        businessId,
        slug: document.slug,
        name: document.name,
        file,
        previewUrl: URL.createObjectURL(file),
        status: 'pending',
      };

      return [
        ...prev.filter((item) => !(item.businessId === businessId && item.slug === document.slug)),
        newDocument,
      ];
    });

    event.target.value = ''; // allow re-selecting the same file
    setSelectedDocument(null);
  };

  const handleUploadDocuments = async () => {
    const toUpload = pendingDocuments.filter((d) => d.status === 'pending' || d.status === 'error');
    if (!toUpload.length) return;

    setIsUploading(true);
    try {
      for (const document of toUpload) {
        setPendingDocuments((prev) =>
          prev.map((item) => (item.id === document.id ? { ...item, status: 'uploading' } : item))
        );

        try {
          const cloudinaryResponse: any = await uploadToCloudinary({
            ...signature,
            file: document.file,
            folder: 'uploads',
          });

          console.log('cloud:', cloudinaryResponse);

          const cloudinaryUrl = cloudinaryResponse.secure_url;

          await addBusinessDocument({
            businessId: document.businessId,
            verificationDocument: {
              type: document.slug,
              url: cloudinaryUrl,
              mime: document.file.type,
            },
          });

          setPendingDocuments((prev) =>
            prev.map((item) =>
              item.id === document.id ? { ...item, status: 'uploaded', url: cloudinaryUrl } : item
            )
          );
        } catch (err) {
          console.error(`Failed to upload ${document.name}:`, err);
          setPendingDocuments((prev) =>
            prev.map((item) =>
              item.id === document.id
                ? { ...item, status: 'error', error: 'Failed to upload document' }
                : item
            )
          );
        }
      }
    } finally {
      setIsUploading(false);
    }
  };

  // Revoke any outstanding object URLs on unmount.
  useEffect(() => {
    return () => {
      pendingDocumentsRef.current.forEach((doc) => URL.revokeObjectURL(doc.previewUrl));
    };
  }, []);

  const businessDocuments = pendingDocuments.filter((d) => d.businessId === businessId);
  const hasUploadable = businessDocuments.some((d) => d.status === 'pending' || d.status === 'error');

  console.log('doc:', businessDocuments);

  return (
    <Grid className="gap-5">
      <Flex className="justify-between">
        <Typography variant="h6" weight="semibold">
          Verification Files
        </Typography>
        <MultiSelect
          wrapperClass="w-75"
          placeholder="Upload New Document"
          options={documentOptions}
          values={selectedDocuments[businessId] || []}
          onChange={(values) => handleDocumentChange(businessId, values)}
        />
      </Flex>

      <Grid className="md:grid-cols-2 gap-6">
        {businessDocuments.map((doc) => (
          <GridItem
            key={doc.id}
            className="grid grid-cols-[auto_1fr] gap-4 p-5 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10">
              <File size={26} className="text-primary" />
            </div>

            <FlexCol className="gap-1.5">
              <ColItem
                item1={doc.name}
                item2={doc.file.name}
                className1="font-semibold"
                className2="text-[#546474]"
              />

              <Typography variant="small" weight="semibold" color="primary">
                {doc.status === 'uploading' && 'Uploading…'}
                {doc.status === 'uploaded' && 'Uploaded'}
                {doc.status === 'error' && 'Upload failed — tap Upload to retry'}
                {doc.status === 'pending' && 'Ready to upload'}
                {' • '}
                {(doc.file.size / (1024 * 1024)).toFixed(1)} MB
              </Typography>

              <Flex className="gap-2.5">
                <Typography
                  color="active"
                  weight="semibold"
                  variant="p"
                  startIcon={<Eye size={18} />}
                  className="cursor-pointer"
                  onClick={() => window.open(doc.previewUrl, '_blank')}
                >
                  View
                </Typography>

                {doc.url && (
                  <Typography
                    color="primary"
                    weight="semibold"
                    variant="p"
                    startIcon={<Download size={18} />}
                    className="cursor-pointer"
                    onClick={() => window.open(doc.url, '_blank')}
                  >
                    Download
                  </Typography>
                )}
              </Flex>
            </FlexCol>
          </GridItem>
        ))}
      </Grid>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      {hasUploadable && (
        <Flex className="justify-end">
          <Button
            type="button"
            onClick={handleUploadDocuments}
            loading={isUploading}
            disabled={isUploading}
            className="px-4 py-2 rounded-lg bg-primary text-white font-semibold disabled:opacity-50"
          >
            {isUploading ? 'Uploading…' : 'Upload Documents'}
          </Button>
        </Flex>
      )}
    </Grid>
  );
};

export default LoanDocument;
