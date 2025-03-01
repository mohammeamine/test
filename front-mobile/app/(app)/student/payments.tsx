import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, TextInput } from 'react-native';
import { Stack } from 'expo-router';
import { Text } from '../../../components/ui/Text';
import { CreditCard, DollarSign, Calendar, Download, Search, Filter, X, Plus } from 'lucide-react-native';
import { paymentService, Payment, PaymentMethod } from '../../../services/payment';
import { useToast } from '../../../hooks/useToast';
import { format } from 'date-fns';
import { PaymentModal } from '../../../components/payments/PaymentModal';

interface PaymentStats {
  totalPaid: number;
  dueAmount: number;
  nextDueDate: Date | null;
  academicYear: string;
  semester: string;
}

interface FilterOptions {
  startDate: Date | null;
  endDate: Date | null;
  minAmount: string;
  maxAmount: string;
  status: Payment['status'] | 'all';
}

const PLACEHOLDER_PAYMENTS = [
  {
    id: '1',
    description: 'Tuition Fee - Spring 2024',
    amount: 1500,
    status: 'paid',
    date: '2024-03-01',
  },
  {
    id: '2',
    description: 'Library Fee',
    amount: 50,
    status: 'pending',
    date: '2024-03-15',
  },
  {
    id: '3',
    description: 'Lab Equipment Fee',
    amount: 100,
    status: 'paid',
    date: '2024-02-28',
  },
  {
    id: '4',
    description: 'Activity Fee',
    amount: 75,
    status: 'overdue',
    date: '2024-02-15',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'paid':
      return '#4CAF50';
    case 'pending':
      return '#FFC107';
    case 'overdue':
      return '#F44336';
    default:
      return '#666666';
  }
};

export default function PaymentsScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState<PaymentStats>({
    totalPaid: 0,
    dueAmount: 0,
    nextDueDate: null,
    academicYear: '2023-24',
    semester: 'Spring'
  });
  const [payments, setPayments] = useState<Payment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    startDate: null,
    endDate: null,
    minAmount: '',
    maxAmount: '',
    status: 'all',
  });
  const toast = useToast();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  const fetchPayments = async () => {
    try {
      const fetchedPayments = await paymentService.getAllPayments();
      setPayments(fetchedPayments);

      // In a real app, these would come from the API
      setStats({
        totalPaid: 15000,
        dueAmount: 5000,
        nextDueDate: new Date('2024-04-01'),
        academicYear: '2023-24',
        semester: 'Spring'
      });
    } catch (error) {
      console.error('Error fetching payments:', error);
      toast.show({
        title: 'Error',
        message: 'Failed to fetch payments',
        type: 'error'
      });
    }
  };

  const fetchPaymentMethods = async () => {
    try {
      const methods = await paymentService.getPaymentMethods();
      setPaymentMethods(methods);
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      toast.show({
        title: 'Error',
        message: 'Failed to fetch payment methods',
        type: 'error'
      });
    }
  };

  useEffect(() => {
    fetchPayments();
    fetchPaymentMethods();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPayments();
    setRefreshing(false);
  };

  const downloadInvoice = async (paymentId: string) => {
    try {
      await paymentService.downloadInvoice(paymentId);
      toast.show({
        title: 'Success',
        message: 'Invoice downloaded successfully',
        type: 'success'
      });
    } catch (error) {
      toast.show({
        title: 'Error',
        message: 'Failed to download invoice',
        type: 'error'
      });
    }
  };

  const filteredPayments = payments.filter(payment => {
    // Search query filter
    if (searchQuery && !payment.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Date range filter
    if (filters.startDate && new Date(payment.createdAt) < filters.startDate) {
      return false;
    }
    if (filters.endDate && new Date(payment.createdAt) > filters.endDate) {
      return false;
    }

    // Amount range filter
    const amount = payment.amount;
    if (filters.minAmount && amount < parseFloat(filters.minAmount)) {
      return false;
    }
    if (filters.maxAmount && amount > parseFloat(filters.maxAmount)) {
      return false;
    }

    // Status filter
    if (filters.status !== 'all' && payment.status !== filters.status) {
      return false;
    }

    return true;
  });

  const resetFilters = () => {
    setFilters({
      startDate: null,
      endDate: null,
      minAmount: '',
      maxAmount: '',
      status: 'all',
    });
    setSearchQuery('');
  };

  const handlePaymentComplete = async () => {
    await onRefresh();
    toast.show({
      title: 'Success',
      message: 'Payment completed successfully',
      type: 'success'
    });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Payments',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => setShowPaymentModal(true)}
              style={styles.headerButton}
            >
              <Plus size={24} color="#666" />
            </TouchableOpacity>
          ),
        }} 
      />
      
      <ScrollView 
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Search and Filter */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search payments..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery ? (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <X size={20} color="#666" />
              </TouchableOpacity>
            ) : null}
          </View>
          <TouchableOpacity
            style={[
              styles.filterButton,
              showFilters && styles.filterButtonActive
            ]}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} color={showFilters ? '#0066cc' : '#666'} />
          </TouchableOpacity>
        </View>

        {showFilters && (
          <View style={styles.filtersContainer}>
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Amount Range</Text>
              <View style={styles.amountInputs}>
                <TextInput
                  style={styles.amountInput}
                  placeholder="Min"
                  value={filters.minAmount}
                  onChangeText={(value) => setFilters(f => ({ ...f, minAmount: value }))}
                  keyboardType="numeric"
                />
                <Text style={styles.amountSeparator}>to</Text>
                <TextInput
                  style={styles.amountInput}
                  placeholder="Max"
                  value={filters.maxAmount}
                  onChangeText={(value) => setFilters(f => ({ ...f, maxAmount: value }))}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Status</Text>
              <View style={styles.statusButtons}>
                {['all', 'pending', 'completed', 'failed', 'refunded'].map((status) => (
                  <TouchableOpacity
                    key={status}
                    style={[
                      styles.statusButton,
                      filters.status === status && styles.statusButtonActive
                    ]}
                    onPress={() => setFilters(f => ({ ...f, status: status as FilterOptions['status'] }))}
                  >
                    <Text
                      style={[
                        styles.statusButtonText,
                        filters.status === status && styles.statusButtonTextActive
                      ]}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity
              style={styles.resetButton}
              onPress={resetFilters}
            >
              <Text style={styles.resetButtonText}>Reset Filters</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Statistics Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statsCard}>
            <Text style={styles.statsLabel}>Total Paid</Text>
            <Text style={styles.statsValue}>${stats.totalPaid.toLocaleString()}</Text>
            <Text style={styles.statsSubtext}>{stats.academicYear}</Text>
          </View>
          
          <View style={styles.statsCard}>
            <Text style={styles.statsLabel}>Due Amount</Text>
            <Text style={[styles.statsValue, { color: '#dc2626' }]}>${stats.dueAmount.toLocaleString()}</Text>
            <Text style={styles.statsSubtext}>{stats.semester} Semester</Text>
          </View>
          
          <View style={styles.statsCard}>
            <Text style={styles.statsLabel}>Next Due Date</Text>
            <Text style={styles.statsValue}>
              {stats.nextDueDate ? format(stats.nextDueDate, 'MMM d') : 'N/A'}
            </Text>
            <Text style={styles.statsSubtext}>{stats.semester} Semester</Text>
          </View>
        </View>

        {/* Payment Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.payButton}>
            <DollarSign size={24} color="white" />
            <Text style={styles.payButtonText}>Make Payment</Text>
          </TouchableOpacity>
        </View>

        {/* Payment History */}
        <View style={styles.historyContainer}>
          <Text style={styles.sectionTitle}>Payment History</Text>
          {filteredPayments.map((payment) => (
            <View key={payment.id} style={styles.paymentCard}>
              <View style={styles.paymentHeader}>
                <View style={styles.paymentInfo}>
                  <CreditCard size={20} color="#666" />
                  <View style={styles.paymentDetails}>
                    <Text style={styles.paymentTitle}>{payment.description}</Text>
                    <View style={styles.paymentMeta}>
                      <Calendar size={16} color="#666" />
                      <Text style={styles.paymentDate}>
                        {format(new Date(payment.createdAt), 'MMM d, yyyy')}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.paymentAmount}>
                  <Text style={styles.amountText}>
                    ${payment.amount.toLocaleString()}
                  </Text>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: `${getStatusColor(payment.status)}20` }
                  ]}>
                    <Text style={[
                      styles.statusText,
                      { color: getStatusColor(payment.status) }
                    ]}>
                      {payment.status.toUpperCase()}
                    </Text>
                  </View>
                </View>
              </View>
              
              {payment.status === 'completed' && (
                <TouchableOpacity 
                  style={styles.downloadButton}
                  onPress={() => downloadInvoice(payment.id)}
                >
                  <Download size={16} color="#666" />
                  <Text style={styles.downloadText}>Download Invoice</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
          {filteredPayments.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No payments found</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <PaymentModal
        visible={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onPaymentComplete={handlePaymentComplete}
        paymentMethods={paymentMethods}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f5',
  },
  content: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  statsCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statsLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  statsValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111',
    marginBottom: 4,
  },
  statsSubtext: {
    fontSize: 12,
    color: '#666',
  },
  actionsContainer: {
    padding: 16,
  },
  payButton: {
    backgroundColor: '#0066cc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  payButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  historyContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111',
    marginBottom: 16,
  },
  paymentCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  paymentDetails: {
    flex: 1,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111',
    marginBottom: 4,
  },
  paymentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  paymentDate: {
    fontSize: 14,
    color: '#666',
  },
  paymentAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 12,
    padding: 8,
    backgroundColor: '#f4f4f5',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  downloadText: {
    fontSize: 14,
    color: '#666',
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#e0f2fe',
  },
  filtersContainer: {
    backgroundColor: 'white',
    margin: 16,
    marginTop: 0,
    borderRadius: 12,
    padding: 16,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 8,
  },
  amountInputs: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  amountInput: {
    flex: 1,
    backgroundColor: '#f4f4f5',
    borderRadius: 6,
    padding: 8,
    fontSize: 14,
  },
  amountSeparator: {
    color: '#666',
  },
  statusButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statusButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f4f4f5',
  },
  statusButtonActive: {
    backgroundColor: '#0066cc',
  },
  statusButtonText: {
    fontSize: 14,
    color: '#666',
  },
  statusButtonTextActive: {
    color: 'white',
  },
  resetButton: {
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f4f4f5',
    borderRadius: 8,
    marginTop: 8,
  },
  resetButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  emptyState: {
    padding: 24,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
  },
  headerButton: {
    padding: 8,
    marginRight: 8,
  },
}); 