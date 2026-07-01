'use server';

import { ActionState, LoginResponseEnvelope, LoginPayload, verifyOTPResponseEnvelope, otpPayload } from "@/types/types";
import { SERVER } from "@/utils/server";
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
        error: result.error ?? 'Login failed.',
        success: false,
      };
    }

  const { success, statusCode, data } = response;

  if (!success || statusCode !== 200) {
    return {
      error: result.error ?? 'Login failed.',
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



export const verifyOTP = async (_prevState: ActionState, formData: FormData) => {

  const otp = formData.get('otp') as string | null
    // ── Persist tokens in secure, httpOnly cookies ──
  const cookieStore = await cookies();

  const adminId = cookieStore.get('otp_admin_id')?.value;

  if (!adminId) {
     return {
        error: 'Expired session. Please log in again.',
        success: false,
      };
  }

  const result = await SERVER.post<verifyOTPResponseEnvelope, otpPayload>('admin/auth/verifyToken',
    { adminId, otp: otp ?? '' }
  );

  console.log('verifyOTP result:', result);

    const response = result.data;

    console.log('adminLogin result:', result);

    if (!response) {
      return {
        error: result.error ?? 'Login failed.',
        success: false,
      };
    }

  const { success, statusCode, data, accessToken, refreshToken } = response;

  if (!success || statusCode !== 200) {
    return {
      error: result.error ?? 'Login failed.',
      success: false,
    };
  }

  cookieStore.set('access_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 15, // 15 minutes
  });

  if (refreshToken) {
    cookieStore.set('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  }

  redirect('/manager');
}
