import { ApiResponse, FetchOptions } from '@/types/types';

const BASE_URL = process.env['NEXT_PUBLIC_API_URL'];

// console.info('BASEURL:', BASE_URL);

// if (!BASE_URL) {
//   throw new Error('NEXT_PUBLIC_API_URL is not defined.');
// }

function extractError(data: unknown, status: number): string {
  if (!data) {
    return `Request failed with status ${status}`;
  }

  if (typeof data === 'string') {
    return data;
  }

  if (typeof data === 'object') {
    const error = data as Record<string, unknown>;

    if (typeof error.message === 'string') return error.message;
    if (typeof error.error === 'string') return error.error;
    if (typeof error.detail === 'string') return error.detail;

    if (Array.isArray(error.errors)) {
      return error.errors.join(', ');
    }
  }

  return `Request failed with status ${status}`;
}

export async function fetchClient<
  TData = unknown,
  TBody = unknown
>(
  endpoint: string,
  options: FetchOptions<TBody> = {}
): Promise<ApiResponse<TData>> {
  const { method = 'GET', body, headers, token, query, signal, timeout, cache, tags, revalidate } = options;

  const url = new URL(endpoint, BASE_URL);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const requestHeaders = new Headers(headers);

  requestHeaders.set('Accept', 'application/json');

  if (token) {
    requestHeaders.set('Authorization', `Bearer ${token}`);
  }

  const isFormData = body instanceof FormData;
  const canHaveBody = !['GET', 'HEAD'].includes(method);

  if (
    canHaveBody &&
    body !== undefined &&
    !isFormData &&
    !requestHeaders.has('Content-Type')
  ) {
    requestHeaders.set('Content-Type', 'application/json');
  }

  const controller = timeout ? new AbortController() : undefined;

  const timeoutId =
    timeout && controller
      ? setTimeout(() => controller.abort(), timeout)
      : undefined;

  const requestSignal =
    controller && signal
      ? AbortSignal.any([controller.signal, signal])
      : controller?.signal ?? signal;

  const nextOptions: RequestInit & {
    next?: {
      tags?: string[];
      revalidate?: number;
    };
  } = {
    method,
    headers: requestHeaders,
    signal: requestSignal,
    ...(canHaveBody &&
      body !== undefined && {
        body: isFormData ? body : JSON.stringify(body),
      }),
    ...(cache && { cache }),
    ...(tags || revalidate !== undefined
      ? {
          next: {
            ...(tags && { tags }),
            ...(revalidate !== undefined && { revalidate }),
          },
        }
      : {}),
  };

  try {
    const response = await fetch(url.toString(), nextOptions);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const contentType = response.headers.get('content-type');

    let data: unknown = null;

    if (response.status !== 204) {
      if (contentType?.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }
    }

    if (!response.ok) {
      return {
        data: null,
        error: extractError(data, response.status),
        status: response.status,
        headers: response.headers,
      };
    }

    return {
      data: data as TData,
      error: null,
      status: response.status,
      headers: response.headers,
    };
  } catch (error) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const message =
      error instanceof DOMException && error.name === 'AbortError'
        ? 'Request timed out.'
        : error instanceof Error
        ? error.message
        : 'Unexpected error occurred.';

    return {
      data: null,
      headers: new Headers(),
      error: message,
      status: 0,
    };
  }
}



export const SERVER = {
  get: <TData>(
    endpoint: string,
    options?: Omit<FetchOptions, 'method' | 'body'>
  ) =>
    fetchClient<TData>(endpoint, {
      ...options,
      method: 'GET',
    }),

  post: <TData, TBody = unknown>(
    endpoint: string,
    body: TBody,
    options?: Omit<FetchOptions<TBody>, 'method' | 'body'>
  ) =>
    fetchClient<TData, TBody>(endpoint, {
      ...options,
      method: 'POST',
      body,
    }),

  put: <TData, TBody = unknown>(
    endpoint: string,
    body: TBody,
    options?: Omit<FetchOptions<TBody>, 'method' | 'body'>
  ) =>
    fetchClient<TData, TBody>(endpoint, {
      ...options,
      method: 'PUT',
      body,
    }),

  patch: <TData, TBody = unknown>(
    endpoint: string,
    body: TBody,
    options?: Omit<FetchOptions<TBody>, 'method' | 'body'>
  ) =>
    fetchClient<TData, TBody>(endpoint, {
      ...options,
      method: 'PATCH',
      body,
    }),

  delete: <TData, TBody = unknown>(
    endpoint: string,
    body?: TBody,
    options?: Omit<FetchOptions<TBody>, 'method' | 'body'>
  ) =>
    fetchClient<TData, TBody>(endpoint, {
      ...options,
      method: 'DELETE',
      body,
    }),
};