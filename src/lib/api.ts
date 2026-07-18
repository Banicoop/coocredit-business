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



export const getManagerDashboardStats = () => getData('dashboards/managers');

export const getUserOnboardingTimeSeries = () => getData('dashboards/managers/users/onboarding-timeseries');

export const getBusinessDistBasedOnState = () => getData('dashboards/managers/users/distribution');

export const getAllLoansWeeklyDistribution = () => getData('dashboards/managers/loans/weekly-distributions');

export const getLoanTimeSeries = () => getData('dashboards/managers/loans/time-series-stats')

export const getAgentProfileById = (id: string) => getData(`agents/profiles/${id}`);
