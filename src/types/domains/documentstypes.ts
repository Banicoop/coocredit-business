

export type DocumentOption = {
  label: string;
  value: string;
};


export type Status = 'pending' | 'uploading' | 'uploaded' | 'error';


export type PendingDocument = {
  id: string;
  businessId: string;
  slug: string;
  name: string;
  file: File;
  previewUrl: string;
  status: Status;
  url?: string;
  error?: string;
};