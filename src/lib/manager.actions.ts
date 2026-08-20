'use server';

import { SERVER } from "@/utils/fetchUtil";
import { getAccessToken } from "./auth.actions";
import { revalidateTag } from "next/cache";
import { BUSINESS_USERS_TAG } from "./api";

type validateAgentPayload = {
     decision: 'APPROVE' | 'REJECT';
     agentId: string;
     reason?: string
}

export type businessSegmentProps = 'micro' | 'starter' | 'small' |  'growth' |  'enterprise' | 'asset';

type businessUserPayload = {
  userId: string;
  businessId: string;
  businessSegment: string | null
  decision: 'approve' | 'reject';
  reason?: string
}


export const approveBusinessLoans = async ({loanId}: {loanId: string}) => {
  const token = await getAccessToken();
  try {
    const res = await SERVER.patch(`admin/loans/${loanId}/business/approve`, {
      token
    })

    revalidateTag(loanId, "max");
    
    if(!res.data || res.data === null || res.error){
      return{
          success: false,
          error: res.error
      }
    }
    return {
      success: true,
      data: res,
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


export const rejectBusinessLoans = async ({loanId, reason}: {loanId: string, reason?: string}) => {
  const token = await getAccessToken();
  try {
    const res = await SERVER.patch(`admin/loans/${loanId}/business/reject`, {
        reason
      }, { token }
    )

    revalidateTag(loanId, "max");
    
    if(!res.data || res.data === null || res.error){
      return{
          success: false,
          error: res.error
      }
    }
    return { success: true, data: res };
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





export const validateAgentCreation = async ({ agentId, decision, reason } : validateAgentPayload) => {
    const token = await getAccessToken() as string
  try {
    const result = await SERVER.post('admin/agents/validate', 
        { agentId, decision, reason },
        {token, tags: [`${agentId}`]},
    );

    revalidateTag(agentId, 'max')

    if(!result.data || result.data === null || result.error){
        return{
            success: false,
            error: result.error
        }
    }

    return { success: true, data: result };
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


export const validateBusinessUser = async ({userId, businessId, businessSegment, decision, reason}: businessUserPayload) => {
  const token = await getAccessToken();

  try {
    const result = await SERVER.post('business-users/verify', {
        userId, businessId, businessSegment, decision, reason
      }, { token }
    );
    revalidateTag(BUSINESS_USERS_TAG(userId), 'max');
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
