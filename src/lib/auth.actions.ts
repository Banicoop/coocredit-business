'use server';

import { ActionState, LoginResponseEnvelope, LoginPayload, VerifyOTPResponse, otpPayload } from "@/types/types";
import { SERVER } from "@/utils/fetchUtil";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


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

    console.log('adminLogin result:', result);

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

  const adminId = data.admin.id;

  const cookieStore = await cookies();

  cookieStore.set('otp_admin_id', adminId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 5,
    path: '/',
  });

  redirect('/auth/verify-otp');
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

  const response = result.data;

  const { success, statusCode, message, data } = response;

  if (!success || statusCode !== 200 || !data) {
    return {
      success: false,
      error: message || 'Unable to verify OTP. Please try again.',
    };
  }

  const { accessToken, refreshToken, admin } = data;
   
   cookieStore.set('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 15,
    });
    
    cookieStore.set('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    cookieStore.set('role', admin.role, {
      httpOnly: false, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    cookieStore.set('admin', admin, {
      httpOnly: false, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

  return {
    success: true,
    data,
    message: response.message, 
  };
};


export const agentSignIn = async (
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  const phoneNumber = formData.get('phoneNumber') as string | null;
  const password = formData.get('password') as string | null;


    // ── Basic validation ──
    if (!password || !phoneNumber) {
      return { error: 'Phone number and password are required.', success: false };
    }

    // ── Call backend ──
    const result = await SERVER.post<LoginResponseEnvelope, { phoneNumber: string, password: string }>(
      'agents/auth/login',
      { password, phoneNumber }
    );

    const response = result.data;

    console.log('adminLogin result:', result);

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

  const agent = data.admin.id;

  const cookieStore = await cookies();

  cookieStore.set('agent', agent, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 5,
    path: '/',
  });

  redirect('/agent');
};
