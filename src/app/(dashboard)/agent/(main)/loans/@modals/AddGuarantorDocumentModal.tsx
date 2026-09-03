'use client';

import { useEffect, useRef, useState } from 'react';
import {
  CheckCircle2,
  File,
  FileText,
  Image as ImageIcon,
  Upload,
  X,
} from 'lucide-react';
import { LoanGuarantorProps } from '@/types/domains/loan.types';
import { formatDocumentType } from '@/helpers/funcs';

// Reuse the same Guarantor shape as the rest of the guarantor UI instead of
// redefining a slightly different local type.
type Guarantor = NonNullable<LoanGuarantorProps['guarantors']>[number];

type AddGuarantorDocumentModalProps = {
  open: boolean;
  guarantor: Guarantor | null;
  onClose: () => void;
  onUpload?: (payload: {
    guarantor: Guarantor;
    documentType: string;
    file: File;
  }) => void;
  isUploading?: boolean;
};

const MAX_FILE_SIZE_MB = 10;

const getFileIcon = (file: File) => {
  if (file.type.startsWith('image/')) {
    return <ImageIcon className="h-6 w-6 text-blue-600" />;
  }

  if (file.type === 'application/pdf') {
    return <FileText className="h-6 w-6 text-red-500" />;
  }

  return <File className="h-6 w-6 text-slate-500" />;
};

const AddGuarantorDocumentModal = ({
  open,
  guarantor,
  onClose,
  onUpload,
  isUploading = false,
}: AddGuarantorDocumentModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [documentType, setDocumentType] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');

  useEffect(() => {
    if (open) {
      setDocumentType('');
      setSelectedFile(null);
      setFileError('');
    }
  }, [open]);

  if (!open || !guarantor) return null;

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const isValidType =
      file.type.startsWith('image/') || file.type === 'application/pdf';
    const isValidSize = file.size <= MAX_FILE_SIZE_MB * 1024 * 1024;

    if (!isValidType) {
      setFileError('Only PDF, JPG, JPEG or PNG files are supported.');
      setSelectedFile(null);
      return;
    }

    if (!isValidSize) {
      setFileError(`File must be smaller than ${MAX_FILE_SIZE_MB}MB.`);
      setSelectedFile(null);
      return;
    }

    setFileError('');
    setSelectedFile(file);
  };

  const handleChooseFile = () => {
    if (!documentType) return;

    fileInputRef.current?.click();
  };

  const handleUpload = () => {
    if (!selectedFile || !documentType || !onUpload) return;

    onUpload({
      guarantor,
      documentType,
      file: selectedFile,
    });
  };

  const handleClose = () => {
    if (isUploading) return;

    setSelectedFile(null);
    setDocumentType('');
    setFileError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-document-title"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2
              id="add-document-title"
              className="text-base font-semibold text-[#0B1220]"
            >
              Add Verification Document
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Upload a verification document for{' '}
              <span className="font-medium text-slate-700">
                {guarantor.fullName}
              </span>
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isUploading}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-5 p-5">
          {/* Document type */}
          <div>
            <label
              htmlFor="document-type"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Document type
            </label>

            <select
              id="document-type"
              value={documentType}
              onChange={(event) => {
                setDocumentType(event.target.value);
                setSelectedFile(null);
                setFileError('');

                // Reset input so the same file can be selected again
                if (fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
              }}
              disabled={isUploading}
              className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-[#1E4FD8] focus:ring-2 focus:ring-[#1E4FD8]/10 disabled:cursor-not-allowed disabled:bg-slate-50"
            >
              <option value="">Select document type</option>

              {guarantor.documentsRequired?.map((type) => (
                <option key={type} value={type}>
                  {formatDocumentType(type)}
                </option>
              ))}
            </select>
          </div>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*,.pdf"
            onChange={handleFileSelect}
          />

          {/* File picker */}
          {!selectedFile ? (
            <button
              type="button"
              onClick={handleChooseFile}
              disabled={!documentType || isUploading}
              className="flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 px-5 py-8 text-center transition hover:border-[#1E4FD8]/40 hover:bg-[#1E4FD8]/[0.02] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1E4FD8]/10 text-[#1E4FD8]">
                <Upload className="h-5 w-5" />
              </div>

              <p className="mt-3 text-sm font-medium text-slate-700">
                Choose a document
              </p>

              <p className="mt-1 text-xs text-slate-400">
                PDF, JPG, JPEG or PNG, up to {MAX_FILE_SIZE_MB}MB
              </p>

              {!documentType && (
                <p className="mt-2 text-xs text-amber-600">
                  Select a document type first
                </p>
              )}
            </button>
          ) : (
            /* Selected file */
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white">
                  {getFileIcon(selectedFile)}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-700">
                    {selectedFile.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    setFileError('');

                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                  }}
                  disabled={isUploading}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs text-emerald-600">
                <CheckCircle2 className="h-4 w-4" />
                Ready to upload
              </div>
            </div>
          )}

          {fileError && <p className="text-xs text-red-600">{fileError}</p>}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-5 py-4">
          <button
            type="button"
            onClick={handleClose}
            disabled={isUploading}
            className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleUpload}
            disabled={!selectedFile || !documentType || isUploading}
            className="inline-flex items-center gap-2 rounded-lg bg-[#1E4FD8] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#1742b5] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isUploading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Upload Document
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddGuarantorDocumentModal;

