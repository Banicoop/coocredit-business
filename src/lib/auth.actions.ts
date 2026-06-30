'use server';

import { api } from "@/utils/SERVER";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
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
  const { data, error, status } = await api.post<LoginResponse, LoginPayload>(
    'admin/auth/login',
    { email, password }
  );

  if (error || !data) {
    if (status === 401) {
      return { error: 'Invalid email or password.', success: false };
    }
    if (status === 429) {
      return { error: 'Too many attempts. Please try again later.', success: false };
    }
    return { error: error ?? 'Login failed. Please try again.', success: false };
  }

  // ── Persist tokens in secure, httpOnly cookies ──
  const cookieStore = await cookies();

  cookieStore.set('access_token', data.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 15, // 15 minutes
  });

  if (data.refreshToken) {
    cookieStore.set('refresh_token', data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  }

  // ── Redirect to dashboard (runs after cookies are set) ──
  redirect('/manager');
};

