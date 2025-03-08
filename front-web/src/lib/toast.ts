import { toast } from 'sonner';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

interface ToastOptions {
  variant?: ToastVariant;
  duration?: number;
}

class ToastService {
  private defaultDuration = 3000;

  show(message: string, { variant = 'info', duration = this.defaultDuration }: ToastOptions = {}) {
    toast[variant](message, { duration });
  }

  success(message: string, options: Omit<ToastOptions, 'variant'> = {}) {
    this.show(message, { ...options, variant: 'success' });
  }

  error(message: string, options: Omit<ToastOptions, 'variant'> = {}) {
    this.show(message, { ...options, variant: 'error' });
  }

  warning(message: string, options: Omit<ToastOptions, 'variant'> = {}) {
    this.show(message, { ...options, variant: 'warning' });
  }

  info(message: string, options: Omit<ToastOptions, 'variant'> = {}) {
    this.show(message, { ...options, variant: 'info' });
  }
}

export const toastService = new ToastService();