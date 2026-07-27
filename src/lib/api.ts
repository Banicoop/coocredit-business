import { SERVER } from "@/utils/fetchUtil";
import { getAccessToken } from "./auth.actions";

type FetchOptions = {
  revalidate?: number;
  timeout?: number;
  errorMessage?: string;
  tags?: string[]
};


export const getData = async( url: string, options: FetchOptions = {}) => {
  const { revalidate = 120, timeout = 5000, errorMessage = 'Failed to fetch data', tags } = options;

  const token = await getAccessToken();

  const res = await SERVER.get(url, {
    revalidate,
    timeout,
    token,
    tags
  });

  if (!res.data || res.data === null || res.status !== 200) {
    return {
      error: res.error || errorMessage,
      success: false,
    };
  }

  return res.data;
};



export const getManagerDashboardStats = ({startDate, endDate}: {startDate?:string, endDate?: string}) => {
   const params = new URLSearchParams();

  if (startDate) params.append("startDate", startDate);
  if (endDate) params.append("endDate", endDate);

  return getData(`dashboards/managers?${params.toString()}`);
}

export const getUserOnboardingTimeSeries = () => getData('dashboards/managers/users/onboarding-timeseries');

export const getBusinessDistBasedOnState = () => getData('dashboards/managers/users/distribution');

export const getAllLoansWeeklyDistribution = () => getData('dashboards/managers/loans/weekly-distributions');

export const getLoanTimeSeries = () => getData('dashboards/managers/loans/time-series-stats')

export const getAgentProfileById = (id: string) => getData(`agents/profiles/${id}`, { tags: [id] });

export const getAllCustomers = () => getData('business-users');

export const getAllLeadsToReview = () => getData('business-users/leads');

export const getCustomerDetails = (id: string) => getData(`business-users/admin/${id}`, { tags: [id] });

export const getAllTransactions = () => getData('transactions/business');

export const getTransactionById = (id: string) => getData(`transactions/business/${id}`);

export const getTransactionsStats = () => getData('transactions/business/stats');

export const getAllLoans = () => getData('admin/loans/business');
