import { getAccessToken } from "@/utils/cookie";
import { SERVER } from "@/utils/fetchUtil";



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
