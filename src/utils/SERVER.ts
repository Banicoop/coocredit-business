// import { FetchOptions } from '@/types/types';
// import { fetchClient } from './fetchUtil';

// export const SERVER = {
//   get: <TData>(
//     endpoint: string,
//     options?: Omit<FetchOptions, 'method' | 'body'>
//   ) =>
//     fetchClient<TData>(endpoint, {
//       ...options,
//       method: 'GET',
//     }),

//   post: <TData, TBody = unknown>(
//     endpoint: string,
//     body: TBody,
//     options?: Omit<FetchOptions<TBody>, 'method' | 'body'>
//   ) =>
//     fetchClient<TData, TBody>(endpoint, {
//       ...options,
//       method: 'POST',
//       body,
//     }),

//   put: <TData, TBody = unknown>(
//     endpoint: string,
//     body: TBody,
//     options?: Omit<FetchOptions<TBody>, 'method' | 'body'>
//   ) =>
//     fetchClient<TData, TBody>(endpoint, {
//       ...options,
//       method: 'PUT',
//       body,
//     }),

//   patch: <TData, TBody = unknown>(
//     endpoint: string,
//     body: TBody,
//     options?: Omit<FetchOptions<TBody>, 'method' | 'body'>
//   ) =>
//     fetchClient<TData, TBody>(endpoint, {
//       ...options,
//       method: 'PATCH',
//       body,
//     }),

//   delete: <TData, TBody = unknown>(
//     endpoint: string,
//     body?: TBody,
//     options?: Omit<FetchOptions<TBody>, 'method' | 'body'>
//   ) =>
//     fetchClient<TData, TBody>(endpoint, {
//       ...options,
//       method: 'DELETE',
//       body,
//     }),
// };