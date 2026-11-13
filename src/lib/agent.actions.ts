'use server';

import { SERVER } from "@/utils/fetchUtil";
import { getAccessToken } from "./auth.actions";
import { LoanApplicationPayload } from "@/schema/loan.schema";


export type VerifyLoanPinsPayload = {
  userId: string;
  customerPin: string;
  agentPin: string;
};

export const verifyLoanPins = async ({
  userId,
  customerPin,
  agentPin,
}: VerifyLoanPinsPayload) => {
  if (!userId || !customerPin || !agentPin) {
    return {
      success: false,
      error: "Customer ID and both PINs are required.",
    };
  }

  const token = await getAccessToken();

  try {
    const [customer, agent] = await Promise.all([
      SERVER.post(
        "business-users/auth/verify-pin",
        { pin: customerPin, userId },
        { token }
      ),

      SERVER.post(
        "agents/auth/verify-pin",
        { pin: agentPin },
        { token }
      ),
    ]);

    console.info('customer:', customer);
    console.info('agent:', agent);


    // Check both verification responses.
    if (customer.error || agent.error) {
      return {
        success: false,
        error:
          customer.error ||
          agent.error ||
          "PIN verification failed.",
      };
    }

    return {
      success: true,
      message: "Both PINs verified successfully.",
      data: {
        customer: customer.data,
        agent: agent.data,
      },
    };
  } catch (error: unknown) {
    console.error("LOAN PIN VERIFICATION ERROR:", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unable to verify PINs. Please try again.",
    };
  }
};



export const newLoan = async (payload: LoanApplicationPayload) => {
    try {
        const res = await SERVER.post('business-users/loans/apply', payload, {

        })
    } catch (error) {
        
    }
}

