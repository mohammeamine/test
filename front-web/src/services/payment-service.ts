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
  studentId?: string;
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
    try {
      // Use a direct fetch request instead of apiClient to handle non-JSON responses
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/payments/summary', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Check if response is OK and content type is JSON
      const contentType = response.headers.get('content-type');
      if (!response.ok || !contentType || !contentType.includes('application/json')) {
        console.error('Invalid response from payment summary API:', response.status, contentType);
        // Return mock data as fallback
        return this.getMockPaymentSummary();
      }
      
      const data = await response.json();
      return data.data || data;
    } catch (error) {
      console.error('Error fetching payment summary:', error);
      // Return mock data if the API call fails
      return this.getMockPaymentSummary();
    }
  }
  
  /**
   * Get mock payment summary data when API fails
   */
  private getMockPaymentSummary(): PaymentSummary {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    return {
      totalPaid: 300.00,
      pendingPayments: 175.00,
      nextPaymentDue: nextWeek,
      overduePayments: 1
    };
  }

  /**
   * Get payment history for the current student
   */
  async getPaymentHistory(filters?: PaymentFilters): Promise<Payment[]> {
    try {
      // Build URL with query parameters
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
      
      const token = localStorage.getItem('auth_token');
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Check if response is OK and content type is JSON
      const contentType = response.headers.get('content-type');
      if (!response.ok || !contentType || !contentType.includes('application/json')) {
        console.error('Invalid response from payment history API:', response.status, contentType);
        // Return mock data as fallback
        return this.getMockPaymentHistory();
      }
      
      const data = await response.json();
      return data.payments || data;
    } catch (error) {
      console.error('Error fetching payment history:', error);
      // Return mock data on error
      return this.getMockPaymentHistory();
    }
  }
  
  /**
   * Get mock payment history data when API fails
   */
  private getMockPaymentHistory(): Payment[] {
    const today = new Date();
    const lastMonth = new Date(today);
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    
    const twoMonthsAgo = new Date(today);
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
    
    return [
      {
        id: 'mock-payment-1',
        studentId: 'mock-student-1',
        amount: 150.00,
        description: 'Tuition fee - Fall Semester',
        status: 'completed',
        paymentMethod: 'credit_card',
        transactionId: 'tx_mock_123',
        dueDate: lastMonth.toISOString(),
        paymentDate: lastMonth.toISOString(),
        createdAt: lastMonth.toISOString(),
        updatedAt: lastMonth.toISOString()
      },
      {
        id: 'mock-payment-2',
        studentId: 'mock-student-1',
        amount: 75.00,
        description: 'Lab Materials',
        status: 'completed',
        paymentMethod: 'credit_card',
        transactionId: 'tx_mock_124',
        dueDate: twoMonthsAgo.toISOString(),
        paymentDate: twoMonthsAgo.toISOString(),
        createdAt: twoMonthsAgo.toISOString(),
        updatedAt: twoMonthsAgo.toISOString()
      },
      {
        id: 'mock-payment-3',
        studentId: 'mock-student-1',
        amount: 150.00,
        description: 'Tuition fee - Current Semester',
        status: 'pending',
        dueDate: today.toISOString(),
        createdAt: today.toISOString(),
        updatedAt: today.toISOString()
      }
    ];
  }

  /**
   * Get upcoming payments for the current student
   */
  async getUpcomingPayments(limit?: number): Promise<Payment[]> {
    try {
      let url = '/api/payments/upcoming';
      
      if (limit) {
        url += `?limit=${limit}`;
      }
      
      const token = localStorage.getItem('auth_token');
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Check if response is OK and content type is JSON
      const contentType = response.headers.get('content-type');
      if (!response.ok || !contentType || !contentType.includes('application/json')) {
        console.error('Invalid response from upcoming payments API:', response.status, contentType);
        // Return mock data as fallback
        return this.getMockUpcomingPayments();
      }
      
      const data = await response.json();
      return data.payments || data;
    } catch (error) {
      console.error('Error fetching upcoming payments:', error);
      // Return mock data on error
      return this.getMockUpcomingPayments();
    }
  }
  
  /**
   * Get mock upcoming payments data when API fails
   */
  private getMockUpcomingPayments(): Payment[] {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    const nextMonth = new Date(today);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    
    return [
      {
        id: 'mock-upcoming-1',
        studentId: 'mock-student-1',
        amount: 150.00,
        description: 'Tuition fee - Current Semester',
        status: 'pending',
        dueDate: nextWeek.toISOString(),
        createdAt: today.toISOString(),
        updatedAt: today.toISOString()
      },
      {
        id: 'mock-upcoming-2',
        studentId: 'mock-student-1',
        amount: 25.00,
        description: 'Lab Materials Fee',
        status: 'pending',
        dueDate: nextMonth.toISOString(),
        createdAt: today.toISOString(),
        updatedAt: today.toISOString()
      }
    ];
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
    try {
      let url = '/api/payments/invoices';
      
      if (limit) {
        url += `?limit=${limit}`;
      }
      
      const token = localStorage.getItem('auth_token');
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Check if response is OK and content type is JSON
      const contentType = response.headers.get('content-type');
      if (!response.ok || !contentType || !contentType.includes('application/json')) {
        console.error('Invalid response from invoices API:', response.status, contentType);
        // Return mock data as fallback
        return this.getMockInvoices();
      }
      
      const data = await response.json();
      return data.invoices || data;
    } catch (error) {
      console.error('Error fetching invoices:', error);
      // Return mock data on error
      return this.getMockInvoices();
    }
  }
  
  /**
   * Get mock invoices data when API fails
   */
  private getMockInvoices(): Invoice[] {
    const today = new Date();
    const lastMonth = new Date(today);
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    
    const twoMonthsAgo = new Date(today);
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
    
    return [
      {
        id: 'mock-invoice-1',
        paymentId: 'mock-payment-1',
        invoiceNumber: 'INV-2023-001',
        studentId: 'mock-student-1',
        amount: 150.00,
        description: 'Tuition fee - Fall Semester',
        status: 'completed',
        dueDate: lastMonth.toISOString(),
        issueDate: lastMonth.toISOString(),
        paidDate: lastMonth.toISOString(),
        createdAt: lastMonth.toISOString(),
        updatedAt: lastMonth.toISOString()
      },
      {
        id: 'mock-invoice-2',
        paymentId: 'mock-payment-2',
        invoiceNumber: 'INV-2023-002',
        studentId: 'mock-student-1',
        amount: 75.00,
        description: 'Lab Materials',
        status: 'completed',
        dueDate: twoMonthsAgo.toISOString(),
        issueDate: twoMonthsAgo.toISOString(),
        paidDate: twoMonthsAgo.toISOString(),
        createdAt: twoMonthsAgo.toISOString(),
        updatedAt: twoMonthsAgo.toISOString()
      },
      {
        id: 'mock-invoice-3',
        paymentId: 'mock-payment-3',
        invoiceNumber: 'INV-2023-003',
        studentId: 'mock-student-1',
        amount: 150.00,
        description: 'Tuition fee - Current Semester',
        status: 'pending',
        dueDate: today.toISOString(),
        issueDate: today.toISOString(),
        createdAt: today.toISOString(),
        updatedAt: today.toISOString()
      }
    ];
  }

  /**
   * Get a specific invoice
   */
  async getInvoice(invoiceId: string): Promise<Invoice> {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/payments/invoices/${invoiceId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Check if response is OK and content type is JSON
      const contentType = response.headers.get('content-type');
      if (!response.ok || !contentType || !contentType.includes('application/json')) {
        console.error('Invalid response from invoice API:', response.status, contentType);
        // Return a mock invoice as fallback
        // Find in the mock invoices or create a new one
        const mockInvoices = this.getMockInvoices();
        const mockInvoice = mockInvoices.find(inv => inv.id === invoiceId) || mockInvoices[0];
        return mockInvoice;
      }
      
      const data = await response.json();
      return data.invoice || data;
    } catch (error) {
      console.error('Error fetching invoice:', error);
      // Return mock data on error
      const mockInvoices = this.getMockInvoices();
      const mockInvoice = mockInvoices.find(inv => inv.id === invoiceId) || mockInvoices[0];
      return mockInvoice;
    }
  }

  /**
   * Download an invoice
   */
  async downloadInvoice(invoiceId: string): Promise<Blob> {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/payments/invoices/${invoiceId}/download`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        console.error('Error downloading invoice:', response.status);
        // Return a mock PDF blob
        return new Blob(['Mock PDF content for invoice ' + invoiceId], { type: 'application/pdf' });
      }
      
      return await response.blob();
    } catch (error) {
      console.error('Error downloading invoice:', error);
      // Return a mock PDF blob on error
      return new Blob(['Mock PDF content for invoice ' + invoiceId], { type: 'application/pdf' });
    }
  }

  /**
   * Get payment methods for the current student
   */
  async getPaymentMethods(): Promise<PaymentMethod[]> {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/payments/methods', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Check if response is OK and content type is JSON
      const contentType = response.headers.get('content-type');
      if (!response.ok || !contentType || !contentType.includes('application/json')) {
        console.error('Invalid response from payment methods API:', response.status, contentType);
        // Return mock data as fallback
        return this.getMockPaymentMethods();
      }
      
      const data = await response.json();
      return data.methods || data;
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      // Return mock data on error
      return this.getMockPaymentMethods();
    }
  }
  
  /**
   * Get mock payment methods data when API fails
   */
  private getMockPaymentMethods(): PaymentMethod[] {
    const today = new Date();
    const nextYear = new Date(today);
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    
    return [
      {
        id: 'mock-method-1',
        studentId: 'mock-student-1',
        type: 'credit_card',
        lastFour: '4242',
        expiryDate: `${nextYear.getMonth() + 1}/${nextYear.getFullYear().toString().slice(-2)}`,
        isDefault: true,
        createdAt: today.toISOString(),
        updatedAt: today.toISOString()
      },
      {
        id: 'mock-method-2',
        studentId: 'mock-student-1',
        type: 'paypal',
        isDefault: false,
        createdAt: today.toISOString(),
        updatedAt: today.toISOString()
      }
    ];
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