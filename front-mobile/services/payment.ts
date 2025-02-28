import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, FEATURES } from '../utils/config';

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

  private async getAuthToken(): Promise<string | null> {
    return await AsyncStorage.getItem('authToken');
  }

  private async getHeaders(): Promise<Headers> {
    const token = await this.getAuthToken();
    return new Headers({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  async getAllPayments(): Promise<Payment[]> {
    try {
      // Check if offline mode is enabled
      const offlineMode = await AsyncStorage.getItem('offlineMode') === 'true' || !FEATURES.enableBackend;
      
      if (offlineMode) {
        return this.PLACEHOLDER_PAYMENTS;
      }

      const response = await fetch(`${API_URL}/payments`);
      if (!response.ok) {
        throw new Error('Failed to fetch payments');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching payments:', error);
      // Return placeholder data in case of error
      return this.PLACEHOLDER_PAYMENTS;
    }
  }

  async getPaymentById(id: string): Promise<Payment> {
    try {
      const headers = await this.getHeaders();
      const response = await fetch(`${API_URL}/payments/${id}`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch payment');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching payment:', error);
      throw error;
    }
  }

  async createPaymentIntent(params: CreatePaymentParams): Promise<PaymentIntent> {
    try {
      const headers = await this.getHeaders();
      const response = await fetch(`${API_URL}/payments/create-intent`, {
        method: 'POST',
        headers,
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw error;
    }
  }

  async confirmPayment(paymentIntentId: string, paymentMethodId: string): Promise<Payment> {
    try {
      const headers = await this.getHeaders();
      const response = await fetch(`${API_URL}/payments/confirm`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          paymentIntentId,
          paymentMethodId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to confirm payment');
      }

      return await response.json();
    } catch (error) {
      console.error('Error confirming payment:', error);
      throw error;
    }
  }

  async refundPayment(params: RefundParams): Promise<Payment> {
    try {
      const headers = await this.getHeaders();
      const response = await fetch(`${API_URL}/payments/${params.paymentId}/refund`, {
        method: 'POST',
        headers,
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error('Failed to refund payment');
      }

      return await response.json();
    } catch (error) {
      console.error('Error refunding payment:', error);
      throw error;
    }
  }

  async getPaymentMethods(): Promise<PaymentMethod[]> {
    try {
      // Check if offline mode is enabled
      const offlineMode = await AsyncStorage.getItem('offlineMode') === 'true' || !FEATURES.enableBackend;
      
      if (offlineMode) {
        return this.PLACEHOLDER_PAYMENT_METHODS;
      }

      const headers = await this.getHeaders();
      const response = await fetch(`${API_URL}/payments/methods`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch payment methods');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      // Return placeholder data in case of error
      return this.PLACEHOLDER_PAYMENT_METHODS;
    }
  }

  async addPaymentMethod(paymentMethodData: any): Promise<PaymentMethod> {
    try {
      // Check if offline mode is enabled
      const offlineMode = await AsyncStorage.getItem('offlineMode') === 'true' || !FEATURES.enableBackend;
      
      if (offlineMode) {
        // Simulate adding a payment method in offline mode
        const newMethod: PaymentMethod = {
          id: Math.random().toString(36).substr(2, 9),
          type: paymentMethodData.type,
          last4: paymentMethodData.card.number.slice(-4),
          expiryMonth: paymentMethodData.card.exp_month.toString().padStart(2, '0'),
          expiryYear: paymentMethodData.card.exp_year.toString().slice(-2),
          isDefault: this.PLACEHOLDER_PAYMENT_METHODS.length === 0,
        };
        this.PLACEHOLDER_PAYMENT_METHODS.push(newMethod);
        return newMethod;
      }

      const headers = await this.getHeaders();
      const response = await fetch(`${API_URL}/payments/methods`, {
        method: 'POST',
        headers,
        body: JSON.stringify(paymentMethodData),
      });

      if (!response.ok) {
        throw new Error('Failed to add payment method');
      }

      return await response.json();
    } catch (error) {
      console.error('Error adding payment method:', error);
      throw error;
    }
  }

  async deletePaymentMethod(methodId: string): Promise<void> {
    try {
      // Check if offline mode is enabled
      const offlineMode = await AsyncStorage.getItem('offlineMode') === 'true' || !FEATURES.enableBackend;
      
      if (offlineMode) {
        // Simulate deleting a payment method in offline mode
        const index = this.PLACEHOLDER_PAYMENT_METHODS.findIndex(m => m.id === methodId);
        if (index !== -1) {
          this.PLACEHOLDER_PAYMENT_METHODS.splice(index, 1);
        }
        return;
      }

      const headers = await this.getHeaders();
      const response = await fetch(`${API_URL}/payments/methods/${methodId}`, {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) {
        throw new Error('Failed to delete payment method');
      }
    } catch (error) {
      console.error('Error deleting payment method:', error);
      throw error;
    }
  }

  async setDefaultPaymentMethod(methodId: string): Promise<PaymentMethod> {
    try {
      // Check if offline mode is enabled
      const offlineMode = await AsyncStorage.getItem('offlineMode') === 'true' || !FEATURES.enableBackend;
      
      if (offlineMode) {
        // Simulate setting default payment method in offline mode
        this.PLACEHOLDER_PAYMENT_METHODS = this.PLACEHOLDER_PAYMENT_METHODS.map(method => ({
          ...method,
          isDefault: method.id === methodId,
        }));
        return this.PLACEHOLDER_PAYMENT_METHODS.find(m => m.id === methodId)!;
      }

      const headers = await this.getHeaders();
      const response = await fetch(`${API_URL}/payments/methods/${methodId}/default`, {
        method: 'POST',
        headers,
      });

      if (!response.ok) {
        throw new Error('Failed to set default payment method');
      }

      return await response.json();
    } catch (error) {
      console.error('Error setting default payment method:', error);
      throw error;
    }
  }

  async downloadReceipt(id: string): Promise<Blob> {
    try {
      const headers = await this.getHeaders();
      const response = await fetch(`${API_URL}/payments/${id}/receipt`, {
        method: 'GET',
        headers: {
          ...headers,
          'Content-Type': 'application/pdf',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to download receipt');
      }

      return await response.blob();
    } catch (error) {
      console.error('Error downloading receipt:', error);
      throw error;
    }
  }

  async downloadInvoice(id: string): Promise<Blob> {
    try {
      const headers = await this.getHeaders();
      const response = await fetch(`${API_URL}/payments/${id}/invoice`, {
        method: 'GET',
        headers: {
          ...headers,
          'Content-Type': 'application/pdf',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to download invoice');
      }

      return await response.blob();
    } catch (error) {
      console.error('Error downloading invoice:', error);
      throw error;
    }
  }
}

export const paymentService = new PaymentService(); 