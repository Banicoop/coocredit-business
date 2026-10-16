import { SERVER } from "@/utils/fetchUtil";
import { getAccessToken } from "./auth.actions";

type FetchOptions = {
  revalidate?: number;
  timeout?: number;
  errorMessage?: string;
  tags?: string[];
  cache?: RequestCache;
  signal?: AbortSignal;
};

export const getData = async (
  url: string,
  options: FetchOptions = {}
) => {
  const {
    revalidate,
    timeout = 5000,
    errorMessage = 'Failed to fetch data',
    tags,
    cache = 'no-store',
    signal,
  } = options;

  const token = await getAccessToken();

  const res = await SERVER.get(url, {
    timeout,
    token,
    tags,
    cache,
    signal,
    ...(cache !== 'no-store' && revalidate !== undefined
      ? { revalidate }
      : {}),
  });

  if (!res.data || res.status !== 200) {
    return {
      error: res.error || errorMessage,
      success: false,
    };
  }

  return res.data;
};




export const BUSINESS_USERS_TAG = (businessId: string) =>
  `business-users-${businessId}`;


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

export const getAllCustomers = () => getData('business-users', { tags: ['business-users'] });

export const getAllLeadsToReview = () => getData('business-users/leads', { tags: ['business-users'] });

export const getPendingOnboardingCustomers = () => getData('business-users/onboarding-pending');

export const getCustomerDetails = (id: string) => getData(`business-users/admin/${id}`, { tags: [BUSINESS_USERS_TAG(id)] });

type TransactionParams = {
  page?: number;
  size?: number;
};

export const getAllTransactions = ({
  page = 1,
  size = 50,
}: TransactionParams = {}) => {
  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
  });

  return getData(
    `transactions/business?${params.toString()}`
  );
};


export const getTransactionById = (id: string) => getData(`transactions/business/${id}`);

type TransactionStatsParams = {
  startDate?: string;
  endDate?: string;
  type?: "business" | "all";
};

export const getTransactionsStats = (
  params: TransactionStatsParams = {}
) => {
  const query = new URLSearchParams();

  if (params.startDate) {
    query.set("startDate", params.startDate);
  }

  if (params.endDate) {
    query.set("endDate", params.endDate);
  }

  if (params.type) {
    query.set("type", params.type);
  }

  const queryString = query.toString();

  return getData(
    `transactions/business/stats${queryString ? `?${queryString}` : ""}`
  );
};


export const getAllLoans = () => getData('admin/loans/business');

export const getLoanById = (id: string) => getData(`admin/loans/business/${id}`, { tags: [id] });

export const getLoanRepaymentBreakdown = (id: string) => getData(`admin/loans/business/${id}/repayments`, { tags: [id] });

export const getLoanRepaymentProjection = (id: string) => getData(`admin/loans/business/${id}/repayment-projection`, { tags: [id] });

export const getAdminGurantorInfo = (loanId: string) => getData(`admin/loans/${loanId}/business/guarantors`)
