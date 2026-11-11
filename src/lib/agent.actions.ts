'use server';

import { SERVER } from "@/utils/fetchUtil";


export const verifyCustomerPin = async (userId: string, pin: string) => {
    try {
        const res = await SERVER.post('business-users/auth/verify-pin', { pin, userId }, {

        })
    } catch (error) {
        
    }
}


export const verifyAgentPin = async (pin: string) => {
    try {
        const res = await SERVER.post('agents/auth/verify-pin', pin, {

        })
    } catch (error) {
        
    }
}


export const newLoan = async (pin: string) => {
    try {
        const res = await SERVER.post('business-users/loans/apply', pin, {

        })
    } catch (error) {
        
    }
}

