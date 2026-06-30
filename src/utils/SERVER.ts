import { ApiResponse, FetchOptions } from "@/types/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

console.log('BASE_URL:', BASE_URL)

export async function fetchClient<TData = unknown, TBody = unknown>(
  endpoint: string,
  options: FetchOptions<TBody> = {}
): Promise<ApiResponse<TData>> {
  const {
    method = 'GET',
    body,
    headers = {},
    token,
    tags,
    cache,
    revalidate,
  } = options;

  const url = `${BASE_URL}${endpoint}`;

  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  };

  if (token) {
    requestHeaders['Authorization'] = `Bearer ${token}`;
  }

  // Next.js extended fetch options
  const nextOptions: RequestInit & { next?: { tags?: string[]; revalidate?: number } } = {
    method,
    headers: requestHeaders,
    ...(body !== undefined && { body: JSON.stringify(body) }),
    ...(cache && { cache }),
    ...(tags || revalidate !== undefined
      ? { next: { ...(tags && { tags }), ...(revalidate !== undefined && { revalidate }) } }
      : {}),
  };

  try {
    const res = await fetch(url, nextOptions);

    // Handle empty responses (e.g. 204 No Content)
    const text = await res.text();
    const data: TData | null = text ? (JSON.parse(text) as TData) : null;

    if (!res.ok) {
      const errorMessage =
        (data as Record<string, string> | null)?.message ??
        (data as Record<string, string> | null)?.error ??
        `Request failed with status ${res.status}`;

      return { data: null, error: errorMessage, status: res.status };
    }

    return { data, error: null, status: res.status };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'An unexpected error occurred';
    return { data: null, error: message, status: 0 };
  }
}

// ─── Convenience wrappers ───────────────────────────────────────────────────

export const api = {
  get: <TData>(endpoint: string, options?: Omit<FetchOptions, 'method' | 'body'>) =>
    fetchClient<TData>(endpoint, { ...options, method: 'GET' }),

  post: <TData, TBody = unknown>(endpoint: string, body: TBody, options?: Omit<FetchOptions, 'method' | 'body'>) =>
    fetchClient<TData, TBody>(endpoint, { ...options, method: 'POST', body }),

  put: <TData, TBody = unknown>(endpoint: string, body: TBody, options?: Omit<FetchOptions, 'method' | 'body'>) =>
    fetchClient<TData, TBody>(endpoint, { ...options, method: 'PUT', body }),

  patch: <TData, TBody = unknown>(endpoint: string, body: TBody, options?: Omit<FetchOptions, 'method' | 'body'>) =>
    fetchClient<TData, TBody>(endpoint, { ...options, method: 'PATCH', body }),

  delete: <TData>(endpoint: string, options?: Omit<FetchOptions, 'method'>) =>
    fetchClient<TData>(endpoint, { ...options, method: 'DELETE' }),
};
