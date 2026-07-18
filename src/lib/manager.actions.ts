'use server';

import { SERVER } from "@/utils/fetchUtil";
import { getAccessToken } from "./auth.actions";

type validateAgentPayload = {
     decision: 'APPROVE' | 'REJECT';
     agentId: string
}


export const approveBusinessLoans = async () => {
    // Implement the logic to fetch all loans from the database or API

}


export const rejectBusinessLoans = async () => {
    // Implement the logic to fetch all loans from the database or API

}





export const validateAgentCreation = async ({ agentId, decision } : validateAgentPayload) => {
    const token = await getAccessToken() as string
  try {
    const result = await SERVER.post('admin/agents/validate', 
        { agentId, decision  },
        {token}
    );

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