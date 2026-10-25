'use server';

import { GetLoansParams, RepaymentQuery } from "@/types/domains/loan.types";
import { getData } from "../api";


export const getAllLoans = async (
  params: GetLoansParams = {}
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

  const url = `admin/loans/business?${query.toString()}`;

  return getData(url);
};


export const getDailyRepayments = async (
  query: RepaymentQuery = {}
) => {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ''
    ) {
      params.set(key, String(value));
    }
  });

  const queryString = params.toString();

  const url = `admin/loans/business/repayments${
    queryString ? `?${queryString}` : ''
  }`;

  return getData(url);
};

