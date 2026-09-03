'use client';

import {  CheckCircle2,  CircleUserRound,  FileText,  Mail, Phone, Plus,  Trash2,  Upload,  XCircle, } from 'lucide-react';
import { FlexCol } from '@/components/ui/ui-layout';
import { LoanGuarantorProps } from '@/types/domains/loan.types';
import { formatDocumentType, maskBVN } from '@/helpers/funcs';


const LoanGuarantor = ({ guarantors, onAddDocument, onRemoveDocument }: LoanGuarantorProps) => {
  if (!guarantors?.length) {
    return (
      <FlexCol className="gap-6">
        <div>
          <h2 className="text-base font-semibold text-[#0B1220]">
            Guarantor Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            No guarantors were submitted with this loan application.
          </p>
        </div>
      </FlexCol>
    );
  }

  return (
    <FlexCol className="gap-6">
      <div>
        <h2 className="text-base font-semibold text-[#0B1220]">
          Guarantor Information
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Guarantors submitted by the applicant and their verification
          documents.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {guarantors.map((guarantor, index) => (
          <div
            key={guarantor._id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
          >
            {/* Guarantor header */}
            <div className="flex flex-col gap-4 border-b border-slate-200 bg-slate-50/70 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1E4FD8]/10 text-[#1E4FD8]">
                  <CircleUserRound className="h-5 w-5" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-[#0B1220]">
                      {guarantor.fullName}
                    </h3>

                    <span className="text-xs text-slate-400">
                      Guarantor {index + 1}
                    </span>
                  </div>

                  <p className="mt-0.5 text-sm text-slate-500">
                    {guarantor.relationship}
                  </p>
                </div>
              </div>

              {guarantor.verified ? (
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Verified
                </span>
              ) : (
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700">
                  <XCircle className="h-3.5 w-3.5" />
                  Not Verified
                </span>
              )}
            </div>

            {/* Guarantor information */}
            <div className="p-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="text-xs font-medium text-slate-400">
                    Full Name
                  </p>

                  <p className="mt-1 text-sm font-medium text-[#0B1220]">
                    {guarantor.fullName}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-400">
                    Relationship
                  </p>

                  <p className="mt-1 text-sm font-medium text-[#0B1220]">
                    {guarantor.relationship}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-400">
                    Phone Number
                  </p>

                  <div className="mt-1 flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-slate-400" />

                    <p className="text-sm font-medium text-[#0B1220]">
                      {guarantor.phoneNumber}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-400">
                    Email
                  </p>

                  <div className="mt-1 flex min-w-0 items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 shrink-0 text-slate-400" />

                    <p className="truncate text-sm font-medium text-[#0B1220]">
                      {guarantor.email}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-400">
                    BVN
                  </p>

                  <p className="mt-1 font-mono text-sm font-medium text-[#0B1220]">
                    {maskBVN(guarantor.bvn)}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-400">
                    Guarantor ID
                  </p>

                  <p className="mt-1 truncate font-mono text-sm text-slate-600">
                    {guarantor.guarantorId}
                  </p>
                </div>
              </div>

              {/* Documents */}
              <div className="mt-6 border-t border-slate-200 pt-5">
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-[#0B1220]">
                      Verification Documents
                    </h4>

                    <p className="mt-1 text-xs text-slate-400">
                      {guarantor.verificationDocuments?.length || 0}{' '}
                      document(s) uploaded
                    </p>
                  </div>

                  {onAddDocument && (
                    <button
                      type="button"
                      onClick={() => onAddDocument(guarantor)}
                      className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#1E4FD8] px-3 py-2 text-xs font-medium text-white transition hover:bg-[#1742b5]"
                    >
                      <Plus className="h-4 w-4" />
                      Add Document
                    </button>
                  )}
                </div>

                {/* Required documents */}
                {guarantor.documentsRequired?.length > 0 && (
                  <div className="mb-4 rounded-xl bg-slate-50 p-3">
                    <p className="mb-2 text-xs font-medium text-slate-500">
                      Required Documents
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {guarantor.documentsRequired.map((type) => {
                        const uploaded =
                          guarantor.verificationDocuments?.some(
                            (doc) => doc.type === type
                          );

                        return (
                          <span
                            key={type}
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs ${
                              uploaded
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-white text-slate-500 ring-1 ring-slate-200'
                            }`}
                          >
                            {uploaded ? (
                              <CheckCircle2 className="h-3 w-3" />
                            ) : (
                              <FileText className="h-3 w-3" />
                            )}

                            {formatDocumentType(type)}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Uploaded documents */}
                {guarantor.verificationDocuments?.length > 0 ? (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {guarantor.verificationDocuments.map((document) => {
                      const documentUrl =
                        document.url || document.documentURL;

                      return (
                        <div
                          key={document._id || document.id}
                          className="group flex items-center gap-3 rounded-xl border border-slate-200 p-3 transition hover:border-[#1E4FD8]/40 hover:bg-[#1E4FD8]/[0.03]"
                        >
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                            <FileText className="h-5 w-5 text-slate-400" />
                          </div>

                          <div className="min-w-0 flex-1">
                            {documentUrl ? (
                              <a
                                href={documentUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="block truncate text-sm font-medium text-[#0B1220] hover:text-[#1E4FD8]"
                              >
                                {formatDocumentType(document.type)}
                              </a>
                            ) : (
                              <p className="truncate text-sm font-medium text-[#0B1220]">
                                {formatDocumentType(document.type)}
                              </p>
                            )}

                            <p className="mt-0.5 truncate text-xs text-slate-400">
                              {document.mime || 'Document'}
                            </p>
                          </div>

                          {onRemoveDocument && (
                            <button
                              type="button"
                              onClick={() =>
                                onRemoveDocument(guarantor, document)
                              }
                              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                              title="Remove document"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center">
                    <Upload className="mx-auto h-7 w-7 text-slate-300" />

                    <p className="mt-2 text-sm font-medium text-slate-500">
                      No verification documents uploaded
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Add the required documents for this guarantor.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </FlexCol>
  );
};

export default LoanGuarantor;
