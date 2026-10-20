'use server';

import { getData } from "../api";


export interface GetCustomersParams {
  search?: string;
}

export interface GetLeadsParams {
  searchLead?: string
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
