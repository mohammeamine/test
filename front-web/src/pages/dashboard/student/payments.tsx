import { useState } from 'react';
import { CreditCard, DollarSign, Clock, FileText, AlertCircle, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StudentLayout } from '../../../components/dashboard/layout/student-layout';
import { User } from '../../../types/auth';

interface StudentPaymentsProps {
  user: User;
}

export function StudentPayments({ user }: StudentPaymentsProps) {
  const [activeTab, setActiveTab] = useState('history');
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  // Mock payment summary data
  const paymentSummary = {
    totalPaid: 1250.00,
    pendingPayments: 150.00,
    nextPaymentDue: new Date(2023, 11, 15),
    overduePayments: 0,
  };

  const handlePaymentComplete = (paymentId: string) => {
    console.log('Payment completed:', paymentId);
    setShowPaymentForm(false);
    setActiveTab('history');
  };

  return (
    <StudentLayout user={user}>
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your payments and view invoices
            </p>
          </div>
        </div>
        
        {/* Payment Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-100 rounded-full">
                  <DollarSign className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Paid</p>
                  <p className="text-2xl font-bold">${paymentSummary.totalPaid.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-yellow-100 rounded-full">
                  <Clock className="h-5 w-5 text-yellow-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Pending</p>
                  <p className="text-2xl font-bold">${paymentSummary.pendingPayments.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-green-100 rounded-full">
                  <FileText className="h-5 w-5 text-green-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Next Payment</p>
                  <p className="text-2xl font-bold">
                    {paymentSummary.nextPaymentDue.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-red-100 rounded-full">
                  <AlertCircle className="h-5 w-5 text-red-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Overdue</p>
                  <p className="text-2xl font-bold">${paymentSummary.overduePayments.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="history">Payment History</TabsTrigger>
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
              <TabsTrigger value="methods">Payment Methods</TabsTrigger>
            </TabsList>
            
            <Button 
              onClick={() => setShowPaymentForm(!showPaymentForm)}
              className="flex items-center"
            >
              <CreditCard className="mr-2 h-4 w-4" />
              {showPaymentForm ? 'Cancel' : 'Make a Payment'}
            </Button>
          </div>

          {showPaymentForm ? (
            <Card>
              <CardHeader>
                <CardTitle>Make a Payment</CardTitle>
                <CardDescription>
                  Complete your payment securely using your preferred payment method
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="container mx-auto py-6 space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
                      <p className="text-muted-foreground">
                        Manage your payment methods and view your billing history
                      </p>
                    </div>
                    <Button variant="default">
                      <CreditCard className="mr-2 h-4 w-4" /> Add Payment Method
                    </Button>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Current Balance</CardTitle>
                        <CardDescription>Your current account balance</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span className="text-2xl font-bold">$237.65</span>
                          </div>
                          <Button variant="outline" size="sm">
                            Pay Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Next Payment</CardTitle>
                        <CardDescription>Due on April 15, 2025</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span className="text-2xl font-bold">$119.00</span>
                          </div>
                          <Button variant="outline" size="sm">
                            Schedule
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Annual Statement</CardTitle>
                        <CardDescription>For tax purposes</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Statement for 2024</span>
                          </div>
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Billing Notices</CardTitle>
                      <CardDescription>Important information about your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-lg border p-4 mb-4">
                        <div className="flex items-center">
                          <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold">Updated Payment Terms</h4>
                            <p className="text-sm text-muted-foreground">
                              Our payment terms have been updated. The new terms will take effect on April 1, 2025.
                            </p>
                          </div>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Tabs defaultValue="payment-methods" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
                      <TabsTrigger value="payment-history">Payment History</TabsTrigger>
                    </TabsList>
                    <TabsContent value="payment-methods" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Payment Methods</CardTitle>
                          <CardDescription>
                            Manage your payment methods and preferences
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {/* Replace with actual payment method form */}
                          <div className="grid gap-6">
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                              <div className="flex items-center space-x-4">
                                <CreditCard className="h-6 w-6" />
                                <div>
                                  <p className="font-medium">Visa ending in 4242</p>
                                  <p className="text-sm text-muted-foreground">Expires 04/2026</p>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">Edit</Button>
                            </div>
                            <Button className="w-full">
                              <CreditCard className="mr-2 h-4 w-4" /> Add New Payment Method
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="payment-history" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Payment History</CardTitle>
                          <CardDescription>
                            View your recent payment activity
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          {/* Replace with actual payment history */}
                          <div className="space-y-4">
                            {[1, 2, 3].map((_, i) => (
                              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center space-x-4">
                                  <Receipt className="h-5 w-5 text-muted-foreground" />
                                  <div>
                                    <p className="font-medium">
                                      {i === 0 ? 'Monthly Tuition' : i === 1 ? 'Lab Fees' : 'Course Materials'}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      {i === 0 ? 'Mar 01, 2025' : i === 1 ? 'Feb 15, 2025' : 'Jan 25, 2025'}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center">
                                  <p className="font-medium mr-4">
                                    ${i === 0 ? '119.00' : i === 1 ? '35.50' : '74.99'}
                                  </p>
                                  <Button variant="outline" size="sm">Receipt</Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <TabsContent value="history" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment History</CardTitle>
                    <CardDescription>
                      View your recent payment activity
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Replace with actual payment history */}
                    <div className="space-y-4">
                      {[1, 2, 3].map((_, i) => (
                        <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <Receipt className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium">
                                {i === 0 ? 'Monthly Tuition' : i === 1 ? 'Lab Fees' : 'Course Materials'}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {i === 0 ? 'Mar 01, 2025' : i === 1 ? 'Feb 15, 2025' : 'Jan 25, 2025'}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <p className="font-medium mr-4">
                              ${i === 0 ? '119.00' : i === 1 ? '35.50' : '74.99'}
                            </p>
                            <Button variant="outline" size="sm">Receipt</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="invoices" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Invoices</CardTitle>
                    <CardDescription>View and download your invoices</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Mock invoices */}
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex justify-between items-center p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">Invoice #{2023000 + i}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(2023, 12 - i, 15).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <p className="font-medium">${(150 * i).toFixed(2)}</p>
                            <Button variant="outline" size="sm">
                              <Receipt className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="methods" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>Manage your saved payment methods</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Mock payment methods */}
                      <div className="flex justify-between items-center p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gray-100 rounded">
                            <CreditCard className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">Visa ending in 4242</p>
                            <p className="text-sm text-gray-500">Expires 12/2025</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Default</span>
                          <Button variant="ghost" size="sm">Remove</Button>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Add Payment Method
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </StudentLayout>
  );
} 

// Only use default export, not both
export default StudentPayments;