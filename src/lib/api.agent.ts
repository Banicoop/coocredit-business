import { getData } from "./api";


export const agentGetMyProfile = () => getData('agents/profiles/me', { errorMessage: 'Error loading agents profile' });

export const getAllAgentsBusinessCustomers = () => getData('business-users/all', { tags: ['agents-business-users'] });

export const agentGetBusinessCustomersDetails = (id: string) => getData(`business-users/${id}/details`);

export const getAllAgentsBusinessCustomersDetails = () => (id: string) => getData(`business-users/${id}/details`);

export const agentGetOnboardingStats = () => getData('agents/onboarding/stats');

export const agentGetLoanStats = () => getData('agents/loans/dashboard/stats');

export const agentGetAllLoans = () => getData('agents/loans/all');

export const agentGetLoanById = (loanId: string) => getData(`business-users/loans/${loanId}`);

export const agentGetDashboardOverview = () => getData('agents/loans/dashboard/overview');

export const agentGetSupportedDocs = () => getData('common/verification-doc-types');

export const agentGetAllLead = () => getData('business-users/agent/leads');

export const agentGetALeadById = (id: string) => getData(`business-users/agent/leads/${id}`);

