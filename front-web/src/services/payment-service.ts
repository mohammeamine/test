import { apiClient } from '../lib/api-client';

export interface PaymentSummary {
  totalPaid: number;
  pendingPayments: number;
  nextPaymentDue: Date | null;
  overduePayments: number;
}

export interface Payment {
  id: string;
  studentId: string;
  amount: number;
  description: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded' | 'overdue';
  paymentMethod?: string;
  transactionId?: string;
  dueDate: string;
  paymentDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Invoice {
  id: string;
  paymentId: string;
  invoiceNumber: string;
  studentId: string;
  amount: number;
  description: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded' | 'overdue';
  dueDate: string;
  issueDate: string;
  paidDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentMethod {
  id: string;
  studentId: string;
  type: 'credit_card' | 'paypal' | 'bank_account';
  lastFour?: string;
  expiryDate?: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentFilters {
  status?: string;
  startDate?: string;
  endDate?: string;
  limit?: number;
}

export interface ProcessPaymentRequest {
  amount: number;
  description: string;
  paymentMethod: string;
  cardDetails?: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardholderName: string;
  };
  dueDate?: string;
}

export interface AddPaymentMethodRequest {
  type: 'credit_card' | 'paypal' | 'bank_account';
  lastFour?: string;
  expiryDate?: string;
  isDefault?: boolean;
}

export interface PaymentResponse {
  paymentId: string;
  invoiceId: string;
  invoiceNumber: string;
  transactionId: string;
  message: string;
}

class PaymentService {
  /**
   * Get payment summary for the current student
   */
  async getPaymentSummary(): Promise<PaymentSummary> {
    const response = await apiClient.get<PaymentSummary>('/payments/summary');
    return response.data;
  }

  /**
   * Get payment history for the current student
   */
  async getPaymentHistory(filters?: PaymentFilters): Promise<Payment[]> {
    // For GET requests with query parameters, we need to use fetch directly
    let url = '/api/payments/history';
    
    if (filters) {
      const queryParams = new URLSearchParams();
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.startDate) queryParams.append('startDate', filters.startDate);
      if (filters.endDate) queryParams.append('endDate', filters.endDate);
      if (filters.limit) queryParams.append('limit', filters.limit.toString());
      
      if (queryParams.toString()) {
        url += `?${queryParams.toString()}`;
      }
    }
    
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch payment history');
    }
    
    const data = await response.json();
    return data.payments;
  }

  /**
   * Get upcoming payments for the current student
   */
  async getUpcomingPayments(limit?: number): Promise<Payment[]> {
    let url = '/api/payments/upcoming';
    
    if (limit) {
      url += `?limit=${limit}`;
    }
    
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch upcoming payments');
    }
    
    const data = await response.json();
    return data.payments;
  }

  /**
   * Process a payment
   */
  async processPayment(paymentData: ProcessPaymentRequest): Promise<PaymentResponse> {
    const response = await apiClient.post<PaymentResponse>('/payments/process', paymentData);
    return response.data;
  }

  /**
   * Get invoices for the current student
   */
  async getInvoices(limit?: number): Promise<Invoice[]> {
    let url = '/api/payments/invoices';
    
    if (limit) {
      url += `?limit=${limit}`;
    }
    
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch invoices');
    }
    
    const data = await response.json();
    return data.invoices;
  }

  /**
   * Get a specific invoice
   */
  async getInvoice(invoiceId: string): Promise<Invoice> {
    const response = await apiClient.get<Invoice>(`/payments/invoices/${invoiceId}`);
    return response.data;
  }

  /**
   * Download an invoice
   */
  async downloadInvoice(invoiceId: string): Promise<Blob> {
    // For blob responses, we need to use fetch directly
    const response = await fetch(`/api/payments/invoices/${invoiceId}/download`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to download invoice');
    }
    
    return await response.blob();
  }

  /**
   * Get payment methods for the current student
   */
  async getPaymentMethods(): Promise<PaymentMethod[]> {
    const response = await apiClient.get<{ methods: PaymentMethod[] }>('/payments/methods');
    return response.data.methods;
  }

  /**
   * Add a payment method
   */
  async addPaymentMethod(methodData: AddPaymentMethodRequest): Promise<{ methodId: string }> {
    const response = await apiClient.post<{ methodId: string }>('/payments/methods', methodData);
    return response.data;
  }

  /**
   * Delete a payment method
   */
  async deletePaymentMethod(methodId: string): Promise<void> {
    await apiClient.delete(`/payments/methods/${methodId}`);
  }

  /**
   * Set a payment method as default
   */
  async setDefaultPaymentMethod(methodId: string): Promise<{ message: string }> {
    const response = await apiClient.put<{ message: string }>(`/payments/methods/${methodId}/default`, {});
    return response.data;
  }
}

export const paymentService = new PaymentService(); 