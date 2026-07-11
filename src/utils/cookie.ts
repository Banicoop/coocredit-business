// 'use server';

// utils/cookies.ts
import { cookies } from "next/headers";

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
};


// export async function getAccessToken() {
//     const cookieStore = await cookies();
//     return cookieStore.get("access_token")?.value ?? "";
// }
