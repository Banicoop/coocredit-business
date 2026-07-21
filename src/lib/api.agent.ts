import { getData } from "./api";


export const agentGetMyProfile = () => getData('agents/profiles/me', { errorMessage: 'Error loading agents profile' });

export const getAllAgentsBusinessCustomers = () => getData('business-users/all');

export const getAllAgentsBusinessCustomersDetails = () => (id: string) => getData(`business-users/${id}/details`);

export const agentGetOnboardingStats = () => getData('agents/onboarding/stats');

 export const agentGetLoanStats = () => getData('agents/loans/dashboard/stats');

 export const agentGetAllLoans = () => getData('agents/loans/all');

 export const agentGetDashboardOverview = () => getData('agents/loans/dashboard/overview');

