'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useUrlPagination() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (page: number, size: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    params.set('size', String(size));
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
}
