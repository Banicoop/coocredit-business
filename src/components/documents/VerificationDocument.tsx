import React from 'react';
import { FileText, ExternalLink } from 'lucide-react';
import { EmptyState } from '../primitive-ui/card-ui';


type VerificationDocument = {
  _id: string;
  type: string;
  documentId: string;
  mime: string;
  url: string;
};

type VerificationDocumentsProps = {
  documents?: VerificationDocument[];
};

const formatDocumentType = (type: string) => {
  return type
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const VerificationDocuments = ({
  documents = [],
}: VerificationDocumentsProps) => {
  return (
    <div className="mt-6 border-t border-slate-200 pt-6">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-900">
          Verification Documents
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Documents submitted for business verification.
        </p>
      </div>

      {documents.length === 0 ? (
        <EmptyState message="No verification documents submitted." />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {documents.map((document) => {
            const isImage = document.mime?.startsWith('image/');

            return (
              <a
                key={document._id}
                href={document.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-slate-300 hover:shadow-sm"
              >
                {/* Document preview */}
                <div className="relative flex h-48 items-center justify-center overflow-hidden bg-slate-100">
                  {isImage ? (
                    <img
                      src={document.url}
                      alt={formatDocumentType(document.type)}
                      className="h-full w-full object-cover transition duration-200 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                      <FileText className="h-12 w-12" />

                      <span className="text-xs font-medium">
                        {document.mime || 'Document'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Document details */}
                <div className="flex items-start justify-between gap-3 p-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {formatDocumentType(document.type)}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {document.mime}
                    </p>

                    <p className="mt-1 truncate font-mono text-xs text-slate-400">
                      {document.documentId}
                    </p>
                  </div>

                  <span className="flex shrink-0 items-center gap-1 text-sm font-medium text-blue-600 transition group-hover:text-blue-700">
                    View
                    <ExternalLink className="h-4 w-4" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VerificationDocuments;
