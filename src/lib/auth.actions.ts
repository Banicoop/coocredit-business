'use server';

import { SERVER } from "@/utils/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface LoginPayload {
  email: string;
  password: string;
}

// Matches your actual API envelope
interface LoginResponseEnvelope {
  success: boolean;
  status: string;
  message: string;
  statusCode: number;
  data: {
    admin: {
      id: string;
      email: string;
    };
    otp?: string; 
  };
  timeStamp: string;
}

export interface ActionState {
  error: string | null;
  success: boolean;
}

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
    redirect('/admin-login'); // guard against someone hitting the OTP page directly
  }

  // cookieStore.set('access_token', data.accessToken, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === 'production',
  //   sameSite: 'lax',
  //   path: '/',
  //   maxAge: 60 * 15, // 15 minutes
  // });

  // if (data.refreshToken) {
  //   cookieStore.set('refresh_token', data.refreshToken, {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === 'production',
  //     sameSite: 'lax',
  //     path: '/',
  //     maxAge: 60 * 60 * 24 * 7, // 7 days
  //   });
  // }
}