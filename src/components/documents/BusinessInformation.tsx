import { Card, EmptyState, Field, FieldGrid } from "../primitive-ui/card-ui";
import { formatCurrency, formatDocumentType, titleCase } from "@/helpers/funcs";


interface BusinessLocation {
  state?: string;
  localGovernment?: string;
}

interface VerificationDocument {
  _id: string;
  url: string;
  mime?: string;
  type?: string;
  documentId?: string;
}

interface Business {
  _id: string;
  businessName?: string;
  registrationNumber?: string;
  type?: string;
  estimatedProfit?: number;
  location?: BusinessLocation;
  verificationDocuments?: VerificationDocument[];
}

interface BusinessInformationProps {
  businesses?: Business[];
}

interface BusinessInformationProps {
  businesses?: Business[];
}

interface VerificationDocument {
  _id: string;
  url: string;
  mime?: string;
  type?: string;
  documentId?: string;
}

interface VerificationDocumentsProps {
  documents?: VerificationDocument[];
  title?: string;
  description?: string;
}

export const BusinessInformation = ({
  businesses = [],
}: BusinessInformationProps) => {
  return (
    <Card title="Business information">
      {businesses.length > 0 ? (
        <div className="space-y-8">
          {businesses.map((business) => (
            <div key={business._id}>
              <FieldGrid>
                <Field
                  label="Business name"
                  value={business.businessName}
                />

                <Field
                  label="Registration number"
                  value={business.registrationNumber}
                  mono
                />

                <Field
                  label="State"
                  value={titleCase(business.location?.state)}
                  mono
                />

                <Field
                  label="LGA of Business"
                  value={titleCase(business.location?.localGovernment)}
                  mono
                />

                <Field
                  label="Business Type"
                  value={titleCase(business.type)}
                  mono
                />

                {business.estimatedProfit && <Field
                  label="Estimated Profit"
                  value={formatCurrency(business.estimatedProfit)}
                  mono
                />}
              </FieldGrid>

             {business.verificationDocuments && <VerificationDocuments
                documents={business.verificationDocuments}
              />}
            </div>
          ))}
        </div>
      ) : (
        <EmptyState message="No business details submitted yet." />
      )}
    </Card>
  );
};





export const VerificationDocuments = ({
  documents = [],
  title = "Verification Documents",
  description = "Documents submitted for business verification.",
}: VerificationDocumentsProps) => {
  return (
    <div className="mt-6 border-t border-slate-200 pt-6">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-900">
          {title}
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>
      </div>

      {documents.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {documents.map((doc) => {
            const isImage = doc.mime?.startsWith("image/");

            return (
              <a
                key={doc._id}
                href={doc.url}
                target="_blank"
                rel="noreferrer"
                className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-slate-300 hover:shadow-sm"
              >
                {/* Preview */}
                <div className="relative flex h-40 items-center justify-center overflow-hidden bg-slate-100">
                  {isImage ? (
                    <img
                      src={doc.url}
                      alt={doc.type? formatDocumentType(doc.type): ''}
                      className="h-full w-full object-cover transition duration-200 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                      <span className="text-4xl">📄</span>

                      <span className="text-xs">
                        Document
                      </span>
                    </div>
                  )}
                </div>

                {/* Document information */}
                <div className="flex items-center justify-between gap-3 p-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {doc.type ? formatDocumentType(doc.type): ''}
                    </p>

                    {doc.mime && (
                      <p className="mt-1 text-xs text-slate-500">
                        {doc.mime}
                      </p>
                    )}

                    {doc.documentId && (
                      <p className="mt-1 truncate font-mono text-xs text-slate-400">
                        {doc.documentId}
                      </p>
                    )}
                  </div>

                  <span className="shrink-0 text-sm font-medium text-blue-600 transition group-hover:text-blue-700">
                    View
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      ) : (
        <EmptyState message="No verification documents submitted." />
      )}
    </div>
  );
};
