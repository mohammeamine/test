import AsyncStorage from '@react-native-async-storage/async-storage';
import { FEATURES } from '../utils/config';
import { apiClient } from '../utils/api-client';

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded' | 'overdue' | 'paid';
  paymentMethod?: string;
  description: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt?: Date;
}

export interface PaymentIntent {
  id: string;
  clientSecret: string;
  amount: number;
  currency: string;
  status: 'requires_payment_method' | 'requires_confirmation' | 'processing' | 'succeeded' | 'canceled';
}

export interface CreatePaymentParams {
  amount: number;
  currency: string;
  description: string;
  paymentMethod: string;
  metadata?: {
    childId?: string;
    [key: string]: any;
  };
}

export interface RefundParams {
  paymentId: string;
  amount?: number;
  reason?: string;
}

export interface PaymentMethod {
  id: string;
  type: string;
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  isDefault: boolean;
}

class PaymentService {
  private readonly basePath = "/payments";
  
  // Placeholder data for when backend is disabled
  private PLACEHOLDER_PAYMENTS: Payment[] = [
    {
      id: '1',
      description: 'Tuition Fee - Spring 2024',
      amount: 1500,
      currency: 'USD',
      status: 'paid',
      paymentMethod: 'credit_card',
      createdAt: new Date('2024-03-01'),
    },
    {
      id: '2',
      description: 'Library Fee',
      amount: 50,
      currency: 'USD',
      status: 'pending',
      createdAt: new Date('2024-03-15'),
    },
    {
      id: '3',
      description: 'Lab Equipment Fee',
      amount: 100,
      currency: 'USD',
      status: 'paid',
      paymentMethod: 'bank_transfer',
      createdAt: new Date('2024-02-28'),
    },
    {
      id: '4',
      description: 'Activity Fee',
      amount: 75,
      currency: 'USD',
      status: 'overdue',
      createdAt: new Date('2024-02-15'),
    },
  ];

  private PLACEHOLDER_PAYMENT_METHODS: PaymentMethod[] = [
    {
      id: '1',
      type: 'visa',
      last4: '4242',
      expiryMonth: '12',
      expiryYear: '24',
      isDefault: true,
    },
    {
      id: '2',
      type: 'mastercard',
      last4: '8888',
      expiryMonth: '06',
      expiryYear: '25',
      isDefault: false,
    },
  ];

  async getAllPayments(): Promise<Payment[]> {
    try {
      const { data } = await apiClient.get<Payment[]>(this.basePath);
      return data;
    } catch (error) {
      if (!FEATURES.enableBackend) {
        return this.PLACEHOLDER_PAYMENTS;
      }
      throw error;
    }
  }

  async getPaymentById(id: string): Promise<Payment> {
    try {
      const { data } = await apiClient.get<Payment>(`${this.basePath}/${id}`);
      return data;
    } catch (error) {
      if (!FEATURES.enableBackend) {
        const payment = this.PLACEHOLDER_PAYMENTS.find((p: Payment) => p.id === id);
        if (payment) return payment;
        throw new Error('Payment not found');
      }
      throw error;
    }
  }

  async createPaymentIntent(params: CreatePaymentParams): Promise<PaymentIntent> {
    try {
      const { data } = await apiClient.post<PaymentIntent>(`${this.basePath}/intent`, params);
      return data;
    } catch (error) {
      if (!FEATURES.enableBackend) {
        return {
          id: 'pi_mock_' + Date.now(),
          clientSecret: 'mock_secret_' + Date.now(),
          amount: params.amount,
          currency: params.currency,
          status: 'requires_payment_method'
        };
      }
      throw error;
    }
  }

  async confirmPayment(paymentIntentId: string, paymentMethodId: string): Promise<Payment> {
    try {
      const { data } = await apiClient.post<Payment>(`${this.basePath}/confirm`, {
        paymentIntentId,
        paymentMethodId
      });
      return data;
    } catch (error) {
      if (!FEATURES.enableBackend) {
        return {
          id: 'pay_mock_' + Date.now(),
          amount: 100,
          currency: 'USD',
          status: 'completed',
          description: 'Mock payment',
          createdAt: new Date()
        };
      }
      throw error;
    }
  }

  async refundPayment(params: RefundParams): Promise<Payment> {
    try {
      const { data } = await apiClient.post<Payment>(`${this.basePath}/refund`, params);
      return data;
    } catch (error) {
      if (!FEATURES.enableBackend) {
        const payment = this.PLACEHOLDER_PAYMENTS.find((p: Payment) => p.id === params.paymentId);
        if (!payment) throw new Error('Payment not found');
        return {
          ...payment,
          status: 'refunded',
          updatedAt: new Date()
        };
      }
      throw error;
    }
  }

  async getPaymentMethods(): Promise<PaymentMethod[]> {
    try {
      const { data } = await apiClient.get<PaymentMethod[]>(`${this.basePath}/methods`);
      return data;
    } catch (error) {
      if (!FEATURES.enableBackend) {
        return this.PLACEHOLDER_PAYMENT_METHODS;
      }
      throw error;
    }
  }

  async addPaymentMethod(paymentMethodData: any): Promise<PaymentMethod> {
    try {
      const { data } = await apiClient.post<PaymentMethod>(`${this.basePath}/methods`, paymentMethodData);
      return data;
    } catch (error) {
      if (!FEATURES.enableBackend) {
        const newMethod: PaymentMethod = {
          id: 'pm_mock_' + Date.now(),
          type: paymentMethodData.type || 'card',
          last4: paymentMethodData.last4 || '4242',
          expiryMonth: paymentMethodData.expiryMonth || '12',
          expiryYear: paymentMethodData.expiryYear || '2025',
          isDefault: false
        };
        return newMethod;
      }
      throw error;
    }
  }

  async deletePaymentMethod(methodId: string): Promise<void> {
    try {
      await apiClient.delete(`${this.basePath}/methods/${methodId}`);
    } catch (error) {
      if (!FEATURES.enableBackend) {
        // Mock successful deletion
        return;
      }
      throw error;
    }
  }

  async setDefaultPaymentMethod(methodId: string): Promise<PaymentMethod> {
    try {
      const { data } = await apiClient.put<PaymentMethod>(`${this.basePath}/methods/${methodId}/default`, {});
      return data;
    } catch (error) {
      if (!FEATURES.enableBackend) {
        const method = this.PLACEHOLDER_PAYMENT_METHODS.find((m: PaymentMethod) => m.id === methodId);
        if (!method) throw new Error('Payment method not found');
        return {
          ...method,
          isDefault: true
        };
      }
      throw error;
    }
  }

  async downloadReceipt(id: string): Promise<Blob> {
    try {
      const response = await fetch(`${this.basePath}/${id}/receipt`, {
        headers: await this.getHeaders(),
      });
      
      if (!response.ok) {
        throw new Error('Failed to download receipt');
      }
      
      return await response.blob();
    } catch (error) {
      if (!FEATURES.enableBackend) {
        // Mock a PDF blob
        return new Blob(['Mock PDF content'], { type: 'application/pdf' });
      }
      throw error;
    }
  }

  async downloadInvoice(id: string): Promise<Blob> {
    try {
      const response = await fetch(`${this.basePath}/${id}/invoice`, {
        headers: await this.getHeaders(),
      });
      
      if (!response.ok) {
        throw new Error('Failed to download invoice');
      }
      
      return await response.blob();
    } catch (error) {
      if (!FEATURES.enableBackend) {
        // Mock a PDF blob
        return new Blob(['Mock PDF content'], { type: 'application/pdf' });
      }
      throw error;
    }
  }
  
  private async getHeaders(): Promise<Headers> {
    const token = await AsyncStorage.getItem('authToken');
    const headers = new Headers({
      'Content-Type': 'application/json',
    });
    
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }
    
    return headers;
  }
}

export const paymentService = new PaymentService(); 