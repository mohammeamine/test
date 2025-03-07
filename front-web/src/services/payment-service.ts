import { apiClient } from './api-client';
import { Payment } from "../types/models"

export interface CreatePaymentData {
  amount: number
  description: string
  paymentMethod: string
  cardDetails?: {
    cardNumber: string
    cardholderName: string
    expiryMonth: string
    expiryYear: string
    cvv: string
  }
  saveCard?: boolean
  isRecurring?: boolean
  recurringFrequency?: 'monthly' | 'quarterly' | 'yearly'
  metadata?: Record<string, any>
}

export interface PaymentFilters {
  startDate?: string
  endDate?: string
  status?: string
  paymentMethod?: string
  minAmount?: number
  maxAmount?: number
  search?: string
  page?: number
  limit?: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}

export interface PaymentResponse {
  id: string
  amount: number
  description: string
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  paymentMethod: string
  createdAt: string
  updatedAt: string
  metadata?: Record<string, any>
  receiptUrl?: string
  invoiceUrl?: string
}

export interface PaymentMethodResponse {
  id: string
  type: 'card' | 'bank_account' | 'paypal'
  isDefault: boolean
  lastFour?: string
  expiryMonth?: string
  expiryYear?: string
  cardBrand?: string
  cardholderName?: string
  bankName?: string
  accountType?: string
  createdAt: string
}

export interface PaymentStatsResponse {
  totalPaid: number
  pendingAmount: number
  refundedAmount: number
  paymentCount: number
  pendingCount: number
  refundedCount: number
  failedCount: number
  recentPayments: PaymentResponse[]
}

export class PaymentService {
  private basePath = '/payments'

  /**
   * Get all payments with optional filtering
   */
  async getPayments(filters?: PaymentFilters): Promise<PaymentResponse[]> {
    const response = await apiClient.get(this.basePath, { params: filters })
    return response.data
  }

  /**
   * Get a specific payment by ID
   */
  async getPayment(id: string): Promise<PaymentResponse> {
    const response = await apiClient.get(`${this.basePath}/${id}`)
    return response.data
  }

  /**
   * Create a new payment
   */
  async createPayment(data: CreatePaymentData): Promise<PaymentResponse> {
    const response = await apiClient.post(this.basePath, data)
    return response.data
  }

  /**
   * Process a payment with Stripe
   */
  async processStripePayment(data: CreatePaymentData): Promise<PaymentResponse> {
    const response = await apiClient.post(`${this.basePath}/process/stripe`, data)
    return response.data
  }

  /**
   * Process a payment with PayPal
   */
  async processPayPalPayment(data: CreatePaymentData): Promise<{ redirectUrl: string }> {
    const response = await apiClient.post(`${this.basePath}/process/paypal`, data)
    return response.data
  }

  /**
   * Verify a PayPal payment after return from PayPal
   */
  async verifyPayPalPayment(paymentId: string, payerId: string): Promise<PaymentResponse> {
    const response = await apiClient.post(`${this.basePath}/verify/paypal`, { paymentId, payerId })
    return response.data
  }

  /**
   * Refund a payment
   */
  async refundPayment(id: string, amount?: number, reason?: string): Promise<PaymentResponse> {
    const response = await apiClient.post(`${this.basePath}/${id}/refund`, { amount, reason })
    return response.data
  }

  /**
   * Get payment receipt
   */
  async getPaymentReceipt(id: string): Promise<Blob> {
    const response = await apiClient.get(`${this.basePath}/${id}/receipt`, { responseType: 'blob' })
    return response.data
  }

  /**
   * Get payment invoice
   */
  async getPaymentInvoice(id: string): Promise<Blob> {
    const response = await apiClient.get(`${this.basePath}/${id}/invoice`, { responseType: 'blob' })
    return response.data
  }

  /**
   * Get user's saved payment methods
   */
  async getPaymentMethods(): Promise<PaymentMethodResponse[]> {
    const response = await apiClient.get('/payment-methods')
    return response.data
  }

  /**
   * Add a new payment method
   */
  async addPaymentMethod(data: {
    type: 'card' | 'bank_account' | 'paypal'
    isDefault?: boolean
    cardDetails?: {
      cardNumber: string
      cardholderName: string
      expiryMonth: string
      expiryYear: string
      cvv: string
    }
    bankDetails?: {
      accountNumber: string
      routingNumber: string
      accountType: string
      accountHolderName: string
    }
  }): Promise<PaymentMethodResponse> {
    const response = await apiClient.post('/payment-methods', data)
    return response.data
  }

  /**
   * Delete a payment method
   */
  async deletePaymentMethod(id: string): Promise<void> {
    await apiClient.delete(`/payment-methods/${id}`)
  }

  /**
   * Set a payment method as default
   */
  async setDefaultPaymentMethod(id: string): Promise<PaymentMethodResponse> {
    const response = await apiClient.put(`/payment-methods/${id}/default`)
    return response.data
  }

  /**
   * Get payment statistics
   */
  async getPaymentStats(): Promise<PaymentStatsResponse> {
    const response = await apiClient.get(`${this.basePath}/stats`)
    return response.data
  }

  /**
   * Create a subscription
   */
  async createSubscription(data: {
    planId: string
    paymentMethodId: string
    metadata?: Record<string, any>
  }): Promise<{
    id: string
    status: string
    currentPeriodEnd: string
    planId: string
    createdAt: string
  }> {
    const response = await apiClient.post('/subscriptions', data)
    return response.data
  }

  /**
   * Cancel a subscription
   */
  async cancelSubscription(id: string, reason?: string): Promise<{
    id: string
    status: string
    canceledAt: string
  }> {
    const response = await apiClient.post(`/subscriptions/${id}/cancel`, { reason })
    return response.data
  }
}

export const paymentService = new PaymentService() 