import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { CreditCard, Lock, CheckCircle } from 'lucide-react';

// Payment form schema
const paymentSchema = z.object({
  cardNumber: z.string()
    .min(16, 'Card number must be at least 16 digits')
    .max(19, 'Card number must not exceed 19 digits')
    .regex(/^[0-9\s-]+$/, 'Card number must contain only digits, spaces, or hyphens'),
  cardholderName: z.string().min(3, 'Cardholder name is required'),
  expiryMonth: z.string().min(1, 'Expiry month is required'),
  expiryYear: z.string().min(1, 'Expiry year is required'),
  cvv: z.string()
    .min(3, 'CVV must be at least 3 digits')
    .max(4, 'CVV must not exceed 4 digits')
    .regex(/^[0-9]+$/, 'CVV must contain only digits'),
  amount: z.number().min(1, 'Amount must be at least 1'),
  description: z.string().optional(),
  saveCard: z.boolean().optional(),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

interface PaymentFormProps {
  onPaymentComplete?: (paymentId: string) => void;
  initialAmount?: number;
  description?: string;
  isRecurring?: boolean;
}

export function PaymentForm({ 
  onPaymentComplete, 
  initialAmount = 0, 
  description = '',
  isRecurring = false 
}: PaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');

  // Generate months and years for expiry date
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    return { value: month.toString().padStart(2, '0'), label: month.toString().padStart(2, '0') };
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => {
    const year = currentYear + i;
    return { value: year.toString(), label: year.toString() };
  });

  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: '',
      cardholderName: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      amount: initialAmount,
      description: description,
      saveCard: false,
    },
  });

  const onSubmit = async (data: PaymentFormData) => {
    setIsProcessing(true);
    setPaymentError(null);

    try {
      // In a real application, this would call the Stripe API
      console.log('Processing payment:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful payment
      setIsComplete(true);
      
      // Call the callback with a mock payment ID
      if (onPaymentComplete) {
        onPaymentComplete('payment_' + Math.random().toString(36).substr(2, 9));
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentError('An error occurred while processing your payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  if (isComplete) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="bg-green-50 border-b">
          <div className="flex items-center space-x-2">
            <div className="rounded-full bg-green-100 p-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-green-800">Payment Successful</CardTitle>
              <CardDescription className="text-green-700">
                Your payment has been processed successfully.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-500">Amount Paid:</span>
              <span className="font-semibold">${form.getValues().amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Payment Method:</span>
              <span className="font-semibold">
                {paymentMethod === 'card' ? 'Credit Card' : 'PayPal'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Transaction ID:</span>
              <span className="font-semibold text-sm">
                {/* Mock transaction ID */}
                TXN_{Math.random().toString(36).substr(2, 9).toUpperCase()}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-6">
          <Button onClick={() => window.location.reload()}>Make Another Payment</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
        <CardDescription>
          Complete your payment securely with Stripe
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-6">
          <Button
            type="button"
            variant={paymentMethod === 'card' ? 'default' : 'outline'}
            className="flex-1"
            onClick={() => setPaymentMethod('card')}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Credit Card
          </Button>
          <Button
            type="button"
            variant={paymentMethod === 'paypal' ? 'default' : 'outline'}
            className="flex-1"
            onClick={() => setPaymentMethod('paypal')}
          >
            <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.566 6.082-8.558 6.082h-2.19c-1.57 0-2.905 1.146-3.117 2.702l-1.12 7.106c-.03.196.076.367.271.367h4.463l.88-5.57c.05-.353.366-.624.724-.624h1.534c3.14 0 5.59-.893 7.048-2.847 1.044-1.397 1.673-3.139 1.952-5.012.12-.803.146-1.478.073-2.037-.072-.516-.237-.95-.486-1.353a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.566 6.082-8.558 6.082h-2.19c-1.57 0-2.905 1.146-3.117 2.702l-1.12 7.106c-.03.196.076.367.271.367h4.463l.88-5.57c.05-.353.366-.624.724-.624h1.534c3.14 0 5.59-.893 7.048-2.847 1.044-1.397 1.673-3.139 1.952-5.012.12-.803.146-1.478.073-2.037-.072-.516-.237-.95-.486-1.353z" />
            </svg>
            PayPal
          </Button>
        </div>

        {paymentMethod === 'card' ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        min="1"
                        placeholder="Enter amount"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cardholderName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cardholder Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name on card" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="1234 5678 9012 3456"
                        {...field}
                        onChange={(e) => {
                          const formatted = formatCardNumber(e.target.value);
                          field.onChange(formatted);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="expiryMonth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Month</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="MM" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {months.map((month) => (
                            <SelectItem key={month.value} value={month.value}>
                              {month.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expiryYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="YYYY" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {years.map((year) => (
                            <SelectItem key={year.value} value={year.value}>
                              {year.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cvv"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVV</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="123"
                          maxLength={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {isRecurring && (
                <div className="flex items-center space-x-2 pt-2">
                  <input
                    type="checkbox"
                    id="recurring"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="recurring" className="text-sm text-gray-700">
                    Set up recurring payment
                  </label>
                </div>
              )}

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="saveCard"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  {...form.register('saveCard')}
                />
                <label htmlFor="saveCard" className="text-sm text-gray-700">
                  Save card for future payments
                </label>
              </div>

              {paymentError && (
                <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
                  {paymentError}
                </div>
              )}

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Lock className="h-4 w-4 mr-2" />
                      Pay ${form.getValues().amount.toFixed(2)}
                    </span>
                  )}
                </Button>
              </div>

              <div className="text-xs text-center text-gray-500 pt-4 flex items-center justify-center">
                <Lock className="h-3 w-3 mr-1" />
                Secured by Stripe. We don't store your card details.
              </div>
            </form>
          </Form>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              You will be redirected to PayPal to complete your payment.
            </p>
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount ($)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="1"
                      placeholder="Enter amount"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              className="w-full"
              onClick={() => {
                setIsProcessing(true);
                // Simulate PayPal redirect
                setTimeout(() => {
                  setIsComplete(true);
                  setIsProcessing(false);
                  if (onPaymentComplete) {
                    onPaymentComplete('paypal_' + Math.random().toString(36).substr(2, 9));
                  }
                }, 2000);
              }}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Redirecting to PayPal...
                </span>
              ) : (
                <span className="flex items-center">
                  Proceed to PayPal
                </span>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 