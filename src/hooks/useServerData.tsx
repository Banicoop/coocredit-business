'use client';

import { getData } from '@/lib/api';
import { useCallback, useEffect, useRef, useState } from 'react';


type UseServerDataOptions = {
  revalidate?: number;
  timeout?: number;
  errorMessage?: string;
  enabled?: boolean; // skip auto-fetch if false
};

export function useServerData<T = any>(
  url: string,
  options: UseServerDataOptions = {}
) {
  const { enabled = true, ...fetchOptions } = options;

  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(enabled);

  // avoids setting state after unmount
  const isMounted = useRef(true);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    const result = await getData(url, fetchOptions) as any;

    if (!isMounted.current) return;

    if (result.error) {
      setError(result.error);
      setData(null);
    } else {
      setData(result.data);
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  useEffect(() => {
    if (enabled) {
      fetchData();
    }
  }, [fetchData, enabled]);

  return { data, error, loading, refetch: fetchData };
}
