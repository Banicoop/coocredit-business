'use server';

import { SERVER } from "@/utils/fetchUtil";
import { getAccessToken } from "./auth.actions";
import { revalidatePath, revalidateTag } from "next/cache";

type validateAgentPayload = {
     decision: 'APPROVE' | 'REJECT';
     agentId: string;
     reason?: string
}

type businessUserPayload = {
  userId: string;
  businessId: string;
  businessSegment: string;
  decision: 'approve' | 'reject';
}


export const approveBusinessLoans = async () => {
    // Implement the logic to fetch all loans from the database or API

}


export const rejectBusinessLoans = async () => {
    // Implement the logic to fetch all loans from the database or API

}





export const validateAgentCreation = async ({ agentId, decision, reason } : validateAgentPayload) => {
    const token = await getAccessToken() as string
  try {
    const result = await SERVER.post('admin/agents/validate', 
        { agentId, decision, reason },
        {token, tags: [`${agentId}`]},
    );

    revalidateTag(`${agentId}`, `${decision}` )

    if(!result.data || result.data === null || result.error){
        return{
            success: false,
            error: result.error
        }
    }

    return {
      success: true,
      data: result,
    };
  } catch (error: any) {
    return {
      success: false,
      error:
        error?.response?.data?.message ||
        error?.message ||
        'Something went wrong.',
    };
  }
};


export const validateBusinessUser = async ({userId, businessId, businessSegment, decision}: businessUserPayload) => {
  const token = await getAccessToken();

  try {
      const result = await SERVER.post('business-users/verify', {
        userId, businessId, businessSegment, decision
      }, { token }
    );
    
    revalidateTag(`${userId}`, `${businessId}`);
    
      if(!result.data || result.data === null || result.error){
          return{
              success: false,
              error: result.error
          }
      }
      return {
        success: true,
        data: result,
      };
      
  } catch (error: any) {
    return {
      success: false,
      error:
        error?.response?.data?.message ||
        error?.message ||
        'Something went wrong.',
    };
  }
}
