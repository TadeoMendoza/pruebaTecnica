import { apiClient } from './api';

export interface CreateLoanPayload {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  dni: string;
  amount: number;
  months: number;
}

export interface LoanResponse {
  id: string;
  status: string;
  message?: string;
}

export async function createLoan(payload: CreateLoanPayload): Promise<LoanResponse> {
  return apiClient<LoanResponse>('/solicitudes', {
    method: 'POST',
    data: payload,
  });
}

export async function getLoans(): Promise<LoanResponse[]> {
  return apiClient<LoanResponse[]>('/solicitudes', {
    method: 'GET',
  });
}