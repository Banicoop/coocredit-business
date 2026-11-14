'use server';

import { SERVER } from "@/utils/fetchUtil";
import { getAccessToken } from "./auth.actions";
import { LoanApplicationPayload } from "@/schema/loan.schema";


export type VerifyLoanPinPayload =
  | {
      type: "AGENT";
      pin: string;
    }
  | {
      type: "CUSTOMER";
      pin: string;
      userId: string;
    };


export const verifyLoanPin = async (
  payload: VerifyLoanPinPayload
) => {
  const token = await getAccessToken();

  try {
    const endpoint =
      payload.type === "AGENT"
        ? "agents/auth/verify-pin"
        : "business-users/auth/verify-pin";

    const body =
      payload.type === "AGENT"
        ? { pin: payload.pin }
        : {
            pin: payload.pin,
            userId: payload.userId,
          };

    const response = await SERVER.post(
      endpoint,
      body,
      { token }
    );

    if (response.error || !response.data) {
      return {
        success: false as const,
        error: response.error || "PIN verification failed.",
      };
    }

    return {
      success: true as const,
      message: `${payload.type === "AGENT" ? "Agent" : "Customer"} PIN verified successfully.`,
      data: response.data,
    };
  } catch (error: unknown) {
    console.error("LOAN PIN VERIFICATION ERROR:", error);

    return {
      success: false as const,
      error:
        error instanceof Error
          ? error.message
          : "Unable to verify PIN. Please try again.",
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

