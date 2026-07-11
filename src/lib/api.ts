import { SERVER } from "@/utils/fetchUtil";
import { getAccessToken } from "./auth.actions";

type FetchOptions = {
  revalidate?: number;
  timeout?: number;
  errorMessage?: string;
};


export const getData = async( url: string, options: FetchOptions = {}) => {
  const { revalidate = 120, timeout = 5000, errorMessage = 'Failed to fetch data' } = options;

  const token = await getAccessToken();

  const res = await SERVER.get(url, {
    revalidate,
    timeout,
    token,
  });

  if (!res.data || res.data === null || res.status !== 200) {
    return {
      error: res.error || errorMessage,
      success: false,
    };
  }

  return res.data;
};





export const getLoanTimeSeries = async () => {
    const token = await getAccessToken();

    const res = await SERVER.get('dashboards/managers', {
        revalidate: 120,
        timeout: 5000,
        token,
    });
    
    if(!res.data || res.data === null || res.status !== 200) {
        return {
            error: res.error || 'Failed to fetch agents',
            success: false,
        }
    }
    return res.data;
}
