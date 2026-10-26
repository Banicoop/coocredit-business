'use server';

import { SERVER } from "@/utils/fetchUtil";
import { getAccessToken } from "./auth.actions";
import { revalidateTag } from "next/cache";
import { ActionResult, BUSINESS_USERS_TAG } from "./api";

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


type LoanActionInput = {
  loanId: string;
};

type RejectLoanInput = LoanActionInput & {
  reason?: string;
};

const getErrorMessage = (error: unknown): string => {
  if (
    typeof error === 'object' &&
    error !== null &&
    'response' in error
  ) {
    const response = error.response;

    if (
      typeof response === 'object' &&
      response !== null &&
      'data' in response
    ) {
      const data = response.data;

      if (
        typeof data === 'object' &&
        data !== null &&
        'message' in data &&
        typeof data.message === 'string'
      ) {
        return data.message;
      }
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong.';
};

export const approveBusinessLoans = async ({
  loanId,
}: LoanActionInput): Promise<ActionResult<unknown>> => {
  try {
    const token = await getAccessToken();

    const res = await SERVER.patch(
      `admin/loans/${loanId}/business/approve`,
      {},
      { token },
    );

    if (!res.data || res.error) {
      return {
        success: false,
        error: res.error ?? 'Unable to approve business loan.',
      };
    }

    return {
      success: true,
      data: res.data,
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
};

export const rejectBusinessLoans = async ({
  loanId,
  reason,
}: RejectLoanInput): Promise<ActionResult<unknown>> => {
  try {
    const token = await getAccessToken();

    const res = await SERVER.patch(
      `admin/loans/${loanId}/business/reject`,
      { reason },
      { token },
    );

    if (!res.data || res.error) {
      return {
        success: false,
        error: res.error ?? 'Unable to reject business loan.',
      };
    }
    return {
      success: true,
      data: res.data,
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
};




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
      if(!result.data || result.data === null || result.error){
          return{
              success: false,
              error: result.error
          }
      }
      return {
        success: true,
        message: result.message || 'Successful:This business has been approved successfully',
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
