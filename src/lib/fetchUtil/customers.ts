'use server';

import { getData } from "../api";


// export interface GetCustomersParams {
//   search?: string;
//   page?: number
// }

export interface GetLeadsParams {
  searchLead?: string
}

export interface GetCustomersParams {
  search?: string;
  page?: number;
  size?: number;
}

export const getAllCustomers = async (
  params: GetCustomersParams = {}
) => {
  const query = new URLSearchParams();

  if (params.search?.trim()) {
    query.set("search", params.search.trim());
  }

  if (params.page !== undefined) {
    query.set("page", String(params.page));
  }

  if (params.size !== undefined) {
    query.set("size", String(params.size));
  }

  const queryString = query.toString();
  const url = `business-users${queryString ? `?${queryString}` : ""}`;

  return getData(url);
};

export const getAllLeads = async (
  params: GetLeadsParams = {}
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

  const url = `business-users/leads?${query.toString()}`;

  return getData(url);
};
