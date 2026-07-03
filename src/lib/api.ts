import { SERVER } from "@/utils/fetchUtil";
import { cookies } from "next/headers";


const cookieStore = await cookies();

const token = cookieStore.get('access_token')?.value;


export const getAllLoans = async () => {
    // Implement the logic to fetch all loans from the database or API
    const res = await SERVER.get('admin/loans/business', {
        revalidate: 120,
        timeout: 5000,
        token: token || '',
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
    const res = await SERVER.get('agents', {
        revalidate: 120,
        timeout: 5000,
        token: token || '',
    });
    
    if(res.data === null || res.status !== 200) {
        return {
            error: res.error || 'Failed to fetch agents',
            success: false,
        }
    }
    return res.data;
}
