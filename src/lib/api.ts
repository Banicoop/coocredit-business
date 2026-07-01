import { SERVER } from "@/utils/server"


export const getAllLoans = async () => {
    // Implement the logic to fetch all loans from the database or API
    const res = await SERVER.get('admin/loans/business', {
        revalidate: 120,
        timeout: 5000,
    });
    if(res.status !== 200) {
        throw new Error('Failed to fetch loans');
    }
    return res.data;
}
