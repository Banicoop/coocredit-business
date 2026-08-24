import { SERVER } from "@/utils/fetchUtil";
import { getData } from "../api";
import { Signature } from "@/types/types";


export const getUploadSignature = () => getData('signed-url');


export const uploadToCloudinary = async ({cloudName, apiKey, signature, timestamp, folder, file}: Signature & { file: File }) => {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('api_key', apiKey);
    formData.append('timestamp', String(timestamp));
    formData.append('signature', signature);

    if (folder) {
      formData.append('folder', folder);
    }

    try {
      const res =  await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
        method: 'POST',
        body: formData,
      }
    );

    if (!res.ok) {
      throw new Error('Failed to upload file to Cloudinary');
    }

    return await res.json();
    } catch (error) {
        console.error('Error:', error);
    }
}


export const addBusinessDocument = async ({ businessId, verificationDocument }: {
  businessId: string;
  verificationDocument: {
    type: string;
    url: string;
    mime: string;
  };
}) => {
  try {
    const response = await SERVER.post('business-users/documents/business', {
        businessId,
        verificationDocument,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error adding business verification document:', error);
    throw error;
  }
};


