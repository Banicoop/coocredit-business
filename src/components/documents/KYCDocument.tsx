import Image from 'next/image';
import { FileText, ExternalLink } from 'lucide-react';
import { formatDate, titleCase } from '@/helpers/funcs';
import { cn } from '@/lib/utils';

type KycDocument = {
  id: string;
  documentURL: string;
  type: string;
  category: string;
  issuedDate?: string | null;
  mime?: string | null;
};

type KycDocumentsProps = {
    documents?: KycDocument[];
    className?: string;
};

const isImage = (doc: KycDocument) => {
  return (
    doc.mime?.startsWith('image/') ||
    /\.(jpg|jpeg|png|webp|gif)$/i.test(doc.documentURL)
  );
};

const KycDocuments = ({ documents = [], className }: KycDocumentsProps) => {
  if (!documents.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center">
        <FileText className="mx-auto h-8 w-8 text-slate-300" />

        <p className="mt-2 text-sm text-slate-500">
          No KYC documents submitted.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2", className)}>
      {documents.map((doc) => (
        <a
          key={doc.id}
          href={doc.documentURL}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-4 rounded-xl border border-slate-200 p-3 transition hover:border-[#1E4FD8]/40 hover:bg-[#1E4FD8]/3"
        >
          {/* Preview */}
          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100">
            {isImage(doc) ? (
              <Image
                src={doc.documentURL}
                alt={titleCase(doc.type)}
                width={56}
                height={56}
                className="h-full w-full object-cover"
              />
            ) : (
              <FileText className="h-7 w-7 text-slate-400" />
            )}
          </div>

          {/* Details */}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-[#0B1220]">
              {titleCase(doc.type)}
            </p>

            <p className="truncate text-xs text-slate-400">
              {titleCase(doc.category)}
            </p>

            {doc.issuedDate && (
              <p className="mt-0.5 text-xs text-slate-400">
                Issued {formatDate(doc.issuedDate)}
              </p>
            )}
          </div>

          {/* Open icon */}
          <ExternalLink className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:text-[#1E4FD8]" />
        </a>
      ))}
    </div>
  );
};

export default KycDocuments;
