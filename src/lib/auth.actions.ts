'use server';

import { ActionState, LoginResponseEnvelope, LoginPayload, VerifyOTPResponse, otpPayload, User, LoginResponse } from "@/types/types";
import { cookieOptions } from "@/utils/cookie";
import { SERVER } from "@/utils/fetchUtil";
import { cookies } from "next/headers";


// ─── Server Action ──────────────────────────────────────────────────────────
export const adminLogin = async (
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  const email = formData.get('email') as string | null;
  const password = formData.get('password') as string | null;


    // ── Basic validation ──
    if (!email || !password) {
      return { error: 'Email and password are required.', success: false };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { error: 'Please enter a valid email address.', success: false };
    }

    // ── Call backend ──
    const result = await SERVER.post<LoginResponseEnvelope, LoginPayload>(
      'admin/auth/login',
      { email, password }
    );

    const response = result.data;

    if (!response) {
      return {
        error: result.error ?? 'Login failed: Please try again later',
        success: false,
      };
    }

  const { success, statusCode, data } = response;

  if (!success || statusCode !== 200) {
    return {
      error: result.error || 'Login failed: Please try again later',
      success: false,
    };
  }

  const adminId = data.user?.id;

  if(!adminId){
    return {
      error: result.error ?? 'Login failed: Unable to verify user',
      success: false,
    }
  }

  const cookieStore = await cookies();

  cookieStore.set('otp_admin_id', adminId, {
     ...cookieOptions,
    maxAge: 60 * 5,
  });


  return {
    success: true,
    data: response.data,
    message: response.message || 'Successful!'
  }
};

// FOR ADMIN ONLY
export const verifyOTP = async (_prevState: ActionState, formData: FormData): Promise<ActionState> => {

  const otp = formData.get('otp') as string | null;

  const cookieStore = await cookies();

  const adminId = cookieStore.get('otp_admin_id')?.value;

  if (!adminId) {
    return {
      error: 'Expired session. Please log in again.',
      success: false,
    };
  }

  const result = await SERVER.post<VerifyOTPResponse, otpPayload>(
    'admin/auth/verifyToken',
    {
      adminId,
      otp: otp ?? '',
    }
  );

  if (!result.data) {
    return {
      success: false,
      error: result.error || 'Unable to verify OTP. Please try again.',
    };
  }


  const { success, statusCode, message, data } = result.data;

  if (!success || statusCode !== 200 || !data) {
    return {
      success: false,
      error: message || 'Unable to verify OTP. Please try again.',
    };
  }

  const { accessToken, refreshToken, user } = data;
   
    cookieStore.set('access_token', accessToken, {
    ...cookieOptions,
      maxAge: 60 * 15 * 24,
    });
    
    cookieStore.set('refresh_token', refreshToken, {
      ...cookieOptions,
      maxAge: 60 * 60 * 24 * 7,
    });


    cookieStore.set('admin', user.role, {
      httpOnly: false, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

  return {
    success: true,
    data,
    message, 
  };
};


export const agentSignIn = async (
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  const phoneNumber = formData.get('phoneNumber') as string | null;
  const password = formData.get('password') as string | null;

    if (!password?.trim() || !phoneNumber?.trim()) {
      return { error: 'Phone number and password are required.', success: false };
    }


  try {
  const result = await SERVER.post<LoginResponse, { phoneNumber: string, password: string }>(
    'agents/auth/login',
    { phoneNumber, password }
  );

  if (!result?.data) {
    return {
      success: false,
      error: result?.error || 'Something went wrong. Please try again.',
    };
  }

  const {
    success,
    statusCode,
    message,
    data,
  } = result.data;

  if (
    !success ||
    statusCode !== 200 ||
    !data
  ) {
    return {
      success: false,
      error: message || 'Something went wrong. Please try again.',
    };
  }

  console.log('USER ROLE:', data.user.role)

  const cookieStore = await cookies();
  // set cookies...
      cookieStore.set('access_token', data.accessToken, {
    ...cookieOptions,
      maxAge: 60 * 15 * 24,
    });
    
    cookieStore.set('refresh_token', data.refreshToken, {
      ...cookieOptions,
      maxAge: 60 * 60 * 24 * 7,
    });

    cookieStore.set('role', data.user.role, {
      httpOnly: false, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

  return {
    success: true,
    data,
    message,
  };
} catch (error) {

  return {
    success: false,
    error: 'Something went wrong. Please try again.',
  };
}
};
