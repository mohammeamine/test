import React, { useState } from 'react';
import { format } from 'date-fns';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '../ui/dropdown-menu';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../ui/select';
import { 
  Download, 
  Eye, 
  Filter, 
  Search, 
  ChevronDown, 
  ArrowUpDown, 
  FileText 
} from 'lucide-react';
import { Badge } from '../ui/badge';

// Mock payment data
const MOCK_PAYMENTS = [
  {
    id: 'pay_1',
    date: new Date(2023, 10, 15),
    amount: 250.00,
    description: 'Tuition Fee - Fall Semester',
    status: 'completed',
    paymentMethod: 'Credit Card',
    receiptUrl: '#',
    invoiceUrl: '#',
  },
  {
    id: 'pay_2',
    date: new Date(2023, 9, 5),
    amount: 75.00,
    description: 'Lab Materials Fee',
    status: 'completed',
    paymentMethod: 'PayPal',
    receiptUrl: '#',
    invoiceUrl: '#',
  },
  {
    id: 'pay_3',
    date: new Date(2023, 11, 1),
    amount: 150.00,
    description: 'Library Access Fee',
    status: 'pending',
    paymentMethod: 'Bank Transfer',
    receiptUrl: '#',
    invoiceUrl: '#',
  },
  {
    id: 'pay_4',
    date: new Date(2023, 8, 20),
    amount: 350.00,
    description: 'Registration Fee',
    status: 'completed',
    paymentMethod: 'Credit Card',
    receiptUrl: '#',
    invoiceUrl: '#',
  },
  {
    id: 'pay_5',
    date: new Date(2023, 11, 10),
    amount: 50.00,
    description: 'Late Assignment Fee',
    status: 'failed',
    paymentMethod: 'Credit Card',
    receiptUrl: '#',
    invoiceUrl: '#',
  },
  {
    id: 'pay_6',
    date: new Date(2023, 7, 15),
    amount: 200.00,
    description: 'Exam Registration',
    status: 'refunded',
    paymentMethod: 'PayPal',
    receiptUrl: '#',
    invoiceUrl: '#',
  },
  {
    id: 'pay_7',
    date: new Date(2023, 10, 25),
    amount: 125.00,
    description: 'Workshop Fee',
    status: 'completed',
    paymentMethod: 'Bank Transfer',
    receiptUrl: '#',
    invoiceUrl: '#',
  },
];

interface PaymentHistoryProps {
  userId?: string;
  limit?: number;
  showFilters?: boolean;
  className?: string;
}

export function PaymentHistory({ 
  userId, 
  limit, 
  showFilters = true,
  className = '' 
}: PaymentHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateSort, setDateSort] = useState<'asc' | 'desc'>('desc');
  const [amountSort, setAmountSort] = useState<'asc' | 'desc' | null>(null);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  // Filter and sort payments
  const filteredPayments = MOCK_PAYMENTS
    .filter(payment => {
      // Filter by search term
      const matchesSearch = 
        payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by status
      const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      // Sort by date
      if (dateSort === 'asc') {
        return a.date.getTime() - b.date.getTime();
      } else {
        return b.date.getTime() - a.date.getTime();
      }
    })
    .sort((a, b) => {
      // Sort by amount if amount sort is active
      if (amountSort === 'asc') {
        return a.amount - b.amount;
      } else if (amountSort === 'desc') {
        return b.amount - a.amount;
      } else {
        return 0;
      }
    });

  // Limit the number of payments if specified
  const displayedPayments = limit ? filteredPayments.slice(0, limit) : filteredPayments;

  // Toggle date sort
  const toggleDateSort = () => {
    setDateSort(dateSort === 'asc' ? 'desc' : 'asc');
    setAmountSort(null);
  };

  // Toggle amount sort
  const toggleAmountSort = () => {
    if (amountSort === null) {
      setAmountSort('desc');
      setDateSort('desc');
    } else if (amountSort === 'desc') {
      setAmountSort('asc');
      setDateSort('desc');
    } else {
      setAmountSort(null);
      setDateSort('desc');
    }
  };

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Failed</Badge>;
      case 'refunded':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Refunded</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>View your payment history and download receipts</CardDescription>
          </div>
          {showFilters && (
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search payments..."
                  className="pl-8 w-[200px] md:w-[300px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFiltersVisible(!isFiltersVisible)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          )}
        </div>
        {showFilters && isFiltersVisible && (
          <div className="flex flex-wrap gap-4 mt-4 p-4 bg-gray-50 rounded-md">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
              <div className="flex gap-2">
                <Input
                  type="date"
                  className="w-[150px]"
                />
                <span className="flex items-center">to</span>
                <Input
                  type="date"
                  className="w-[150px]"
                />
              </div>
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {displayedPayments.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 mx-auto text-gray-400 mb-3" />
            <h3 className="text-lg font-medium text-gray-900">No payments found</h3>
            <p className="text-gray-500 mt-1">
              {searchTerm || statusFilter !== 'all' 
                ? "Try adjusting your filters to see more results" 
                : "You haven't made any payments yet"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">
                    <Button 
                      variant="ghost" 
                      onClick={toggleDateSort}
                      className="flex items-center p-0 h-auto font-medium"
                    >
                      Date
                      {dateSort === 'asc' ? (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4 rotate-180" />
                      )}
                    </Button>
                  </TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>
                    <Button 
                      variant="ghost" 
                      onClick={toggleAmountSort}
                      className="flex items-center p-0 h-auto font-medium"
                    >
                      Amount
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">
                      {format(payment.date, 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell>{payment.description}</TableCell>
                    <TableCell>${payment.amount.toFixed(2)}</TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                    <TableCell>{payment.paymentMethod}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <span className="sr-only">Open menu</span>
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer">
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Download className="mr-2 h-4 w-4" />
                            <span>Download Receipt</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <FileText className="mr-2 h-4 w-4" />
                            <span>View Invoice</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        {limit && filteredPayments.length > limit && (
          <div className="mt-4 text-center">
            <Button variant="outline">View All Payments</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 