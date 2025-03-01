import { apiClient } from "../lib/api-client"
import { Payment } from "../types/models"

export interface CreatePaymentData {
  amount: number
  description: string
  paymentMethod: string
}

export interface PaymentFilters {
  status?: Payment["status"]
  startDate?: string
  endDate?: string
  minAmount?: number
  maxAmount?: number
}

class PaymentService {
  private readonly basePath = "/payments"

  async getPayments(filters?: PaymentFilters) {
    const { data } = await apiClient.get<Payment[]>(
      this.basePath,
      filters as Record<string, string>
    )
    return data
  }

  async getPayment(id: string) {
    const { data } = await apiClient.get<Payment>(`${this.basePath}/${id}`)
    return data
  }

  async createPayment(paymentData: CreatePaymentData) {
    const { data } = await apiClient.post<Payment>(this.basePath, paymentData)
    return data
  }

  async cancelPayment(id: string) {
    const { data } = await apiClient.post<Payment>(
      `${this.basePath}/${id}/cancel`,
      {}
    )
    return data
  }

  async getPaymentMethods() {
    const { data } = await apiClient.get<string[]>(`${this.basePath}/methods`)
    return data
  }

  async getPaymentHistory() {
    const { data } = await apiClient.get<Payment[]>(`${this.basePath}/history`)
    return data
  }

  async getPendingPayments() {
    const { data } = await apiClient.get<Payment[]>(`${this.basePath}/pending`)
    return data
  }

  async downloadInvoice(id: string) {
    const { data } = await apiClient.get<Blob>(
      `${this.basePath}/${id}/invoice`,
      { "Content-Type": "application/pdf" } as any
    )
    return data
  }

  async downloadReceipt(id: string) {
    const { data } = await apiClient.get<Blob>(
      `${this.basePath}/${id}/receipt`,
      { "Content-Type": "application/pdf" } as any
    )
    return data
  }
}

export const paymentService = new PaymentService() 