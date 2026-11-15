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
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';

type DocumentOption = {
  name: string;
  slug: string;
};

/** Shape of a document already saved in the database. */
type SavedDocument = {
  _id: string;
  documentId: string;
  type: string; // matches DocumentOption.slug
  mime: string;
  url: string;
};

/** "proof-of-address" -> "Proof Of Address" (fallback when slug isn't in `documents`). */
const humanizeSlug = (slug: string) =>
  slug
    .split('-')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

/** Last path segment of a URL, e.g. ".../uploads/abc123.png" -> "abc123.png". */
const fileNameFromUrl = (url: string) => {
  try {
    return decodeURIComponent(new URL(url).pathname.split('/').pop() || 'document');
  } catch {
    return 'document';
  }
};

/** "image/png" -> "PNG", "application/pdf" -> "PDF" */
const formatMime = (mime?: string) => (mime ? mime.split('/').pop()?.toUpperCase() : undefined);

/**
 * Shared card used for both pending (local) and saved (from DB) documents,
 * so both look identical.
 */
const DocumentCard = ({
  title,
  fileName,
  statusText,
  statusColor = 'primary',
  viewUrl,
  downloadUrl,
}: {
  title: string;
  fileName: string;
  statusText: string;
  statusColor?: 'primary' | 'active';
  viewUrl?: string;
  downloadUrl?: string;
}) => (
  <GridItem className="grid grid-cols-[auto_1fr] gap-4 p-5 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200">
    <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10">
      <File size={26} className="text-primary" />
    </div>

    <FlexCol className="gap-1.5">
      <ColItem
        item1={title}
        item2={fileName}
        className1="font-semibold"
        className2="text-[#546474]"
      />

      <Typography variant="small" weight="semibold" color={statusColor}>
        {statusText}
      </Typography>

      <Flex className="gap-2.5">
        {viewUrl && (
          <Typography
            color="active"
            weight="semibold"
            variant="p"
            startIcon={<Eye size={18} />}
            className="cursor-pointer"
            onClick={() => window.open(viewUrl, '_blank')}
          >
            View
          </Typography>
        )}

        {downloadUrl && (
          <Typography
            color="primary"
            weight="semibold"
            variant="p"
            startIcon={<Download size={18} />}
            className="cursor-pointer"
            onClick={() => window.open(downloadUrl, '_blank')}
          >
            Download
          </Typography>
        )}
      </Flex>
    </FlexCol>
  </GridItem>
);

const LoanDocument = ({
  documents,
  signature,
  businessId,
  loanDocuments,
}: {
  documents: DocumentOption[];
  signature: Signature;
  businessId: string;
  loanDocuments: SavedDocument[];
}) => {
  const router = useRouter();

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
    let anyUploaded = false;

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

          const cloudinaryUrl = cloudinaryResponse.secure_url;

          const result = (await addBusinessDocument({
            loanId: businessId,
            loanRequestDocument: {
              type: document.slug,
              url: cloudinaryUrl,
              mime: document.file.type,
            },
          })) as any;

          setPendingDocuments((prev) =>
            prev.map((item) =>
              item.id === document.id ? { ...item, status: 'uploaded', url: cloudinaryUrl } : item
            )
          );

          if (result.data) {
            anyUploaded = true;
            toast.success(`Successfully uploaded ${document.name}`);
          }
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
      // Re-fetch server data so the new documents appear in `loanDocuments`.
      if (anyUploaded) router.refresh();
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

  /** slug -> display name, built from the required-documents list. */
  const nameBySlug = useMemo(
    () => Object.fromEntries(documents.map((d) => [d.slug, d.name])),
    [documents]
  );

  const savedSlugs = useMemo(() => new Set(loanDocuments.map((d) => d.type)), [loanDocuments]);

  /**
   * Avoid showing the same document twice:
   *  - a pending doc that already uploaded successfully is hidden once the
   *    server copy shows up in `loanDocuments`;
   *  - a saved doc is hidden while the user is preparing a replacement for it.
   */
  const visiblePending = businessDocuments.filter(
    (d) => !(d.status === 'uploaded' && savedSlugs.has(d.slug))
  );
  const replacingSlugs = new Set(
    businessDocuments.filter((d) => d.status !== 'uploaded').map((d) => d.slug)
  );
  const visibleSaved = loanDocuments.filter((d) => !replacingSlugs.has(d.type));

  const hasAnything = visiblePending.length > 0 || visibleSaved.length > 0;

  return (
    <Grid className="gap-5">
      <FlexCol className="md:flex-row gap-5 md:justify-between">
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
      </FlexCol>

      {!hasAnything && (
        <Typography variant="small" className="text-[#546474]">
          No documents uploaded yet. Use “Upload New Document” to add one.
        </Typography>
      )}

      <Grid className="md:grid-cols-2 gap-6">
        {/* Already uploaded (from database) */}
        {visibleSaved.map((doc) => (
          <DocumentCard
            key={doc._id}
            title={nameBySlug[doc.type] ?? humanizeSlug(doc.type)}
            fileName={fileNameFromUrl(doc.url)}
            statusText={['Uploaded', formatMime(doc.mime)].filter(Boolean).join(' • ')}
            viewUrl={doc.url}
            downloadUrl={doc.url}
          />
        ))}

        {/* Selected locally, not yet (or just) uploaded */}
        {visiblePending.map((doc) => {
          const statusLabel =
            doc.status === 'uploading'
              ? 'Uploading…'
              : doc.status === 'uploaded'
                ? 'Uploaded'
                : doc.status === 'error'
                  ? 'Upload failed — tap Upload to retry'
                  : 'Ready to upload';

          return (
            <DocumentCard
              key={doc.id}
              title={doc.name}
              fileName={doc.file.name}
              statusText={`${statusLabel} • ${(doc.file.size / (1024 * 1024)).toFixed(1)} MB`}
              viewUrl={doc.previewUrl}
              downloadUrl={doc.url}
            />
          );
        })}
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
