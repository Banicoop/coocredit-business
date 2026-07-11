import { SERVER } from "@/utils/fetchUtil";
import { getAccessToken } from "./auth.actions";



export const getAllLoans = async () => {
    const token = await getAccessToken();

    const res = await SERVER.get('admin/loans/business', {
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


export const getAllAgents = async () => {
    const token = await getAccessToken();

    const res = await SERVER.get('agents', {
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
