
import { SERVER } from "@/utils/fetchUtil";
import { getAccessToken } from "./auth.actions";



export const agentGetDashboardOverview = async () => {
    const token = await getAccessToken();

    const res = await SERVER.get('agents/loans/dashboard/overview', {
        revalidate: 120,
        timeout: 5000,
        token,
    });
    if(res.data === null || res.status !== 200) {
        return {
            error: res.error || 'Failed to fetch agents',
            success: false,
        }
    }
    return res.data;
}



export const agentGetAllLoans = async () => {
    const token = await getAccessToken();

    const res = await SERVER.get('agents/loans/all', {
        revalidate: 120,
        timeout: 5000,
        token,
    });
    if(res.data === null || res.status !== 200) {
        return {
            error: res.error || 'Failed to fetch agents',
            success: false,
        }
    }
    return res.data;
}


export const agentGetLoanStats = async () => {
    const token = await getAccessToken();

    const res = await SERVER.get('agents/loans/dashboard/stats', {
        revalidate: 120,
        timeout: 5000,
        token,
    });
    if(res.data === null || res.status !== 200) {
        return {
            error: res.error || 'Failed to fetch agents',
            success: false,
        }
    }
    return res.data;
}


export const agentGetOnboardingStats = async () => {
    const token = await getAccessToken();

    const res = await SERVER.get('agents/onboarding/stats', {
        revalidate: 120,
        timeout: 5000,
        token,
    });
    if(res.data === null || res.status !== 200) {
        return {
            error: res.error || 'Failed to fetch agents',
            success: false,
        }
    }
    return res.data;
}


export const getAllAgentsBusinessCustomers = async () => {
    const token = await getAccessToken();

    const res = await SERVER.get('business-users/all', {
        revalidate: 120,
        timeout: 5000,
        token,
    });
    if(res.data === null || res.status !== 200) {
        return {
            error: res.error || 'Failed to fetch agents',
            success: false,
        }
    }
    return res.data;
}


export const getAllAgentsBusinessCustomersDetails = async (id: string) => {
    const token = await getAccessToken();

    const res = await SERVER.get(`business-users/${id}/details`, {
        revalidate: 120,
        timeout: 5000,
        token,
    });
    if(res.data === null || res.status !== 200) {
        return {
            error: res.error || 'Failed to fetch agents',
            success: false,
        }
    }
    return res.data;
}
