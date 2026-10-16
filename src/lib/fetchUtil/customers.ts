'use server';

import { getData } from "../api";


export interface GetCustomersParams {
  search?: string;
}

export const getAllCustomers = async (
  params: GetCustomersParams = {}
) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== ''
    ) {
      query.set(key, String(value));
    }
  });

  const url = `business-users?${query.toString()}`;

  return getData(url);
};
