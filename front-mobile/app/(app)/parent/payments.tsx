import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, TextInput } from 'react-native';
import { Stack } from 'expo-router';
import { Text } from '../../../components/ui/Text';
import { CreditCard, DollarSign, Calendar, Search, Filter, X, Plus, ChevronDown } from 'lucide-react-native';
import { paymentService, Payment, PaymentMethod } from '../../../services/payment';
import { useToast } from '../../../hooks/useToast';
import { format } from 'date-fns';
import { PaymentModal } from '../../../components/payments/PaymentModal';

interface Child {
  id: string;
  name: string;
  grade: string;
  payments: Payment[];
  stats: {
    totalPaid: number;
    dueAmount: number;
    nextDueDate: Date | null;
  };
}

interface FilterOptions {
  startDate: Date | null;
  endDate: Date | null;
  minAmount: string;
  maxAmount: string;
  status: 'all' | 'paid' | 'pending' | 'overdue';
  childId: string | 'all';
}

export default function ParentPaymentsScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [children, setChildren] = useState<Child[]>([]);
  const [selectedChild, setSelectedChild] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    startDate: null,
    endDate: null,
    minAmount: '',
    maxAmount: '',
    status: 'all',
    childId: 'all',
  });
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const toast = useToast();

  // Placeholder data - replace with API call
  const fetchChildren = async () => {
    // This would be replaced with an actual API call
    setChildren([
      {
        id: '1',
        name: 'John Doe',
        grade: '10th Grade',
        payments: [],
        stats: {
          totalPaid: 10000,
          dueAmount: 2500,
          nextDueDate: new Date('2024-04-01'),
        },
      },
      {
        id: '2',
        name: 'Jane Doe',
        grade: '8th Grade',
        payments: [],
        stats: {
          totalPaid: 8000,
          dueAmount: 2000,
          nextDueDate: new Date('2024-04-15'),
        },
      },
    ]);
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
        type: 'error',
      });
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchChildren(), fetchPaymentMethods()]);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchChildren();
    fetchPaymentMethods();
  }, []);

  const handlePaymentComplete = async () => {
    await fetchChildren();
    setShowPaymentModal(false);
    toast.show({
      title: 'Success',
      message: 'Payment completed successfully',
      type: 'success',
    });
  };

  const getTotalStats = () => {
    return children.reduce(
      (acc, child) => ({
        totalPaid: acc.totalPaid + child.stats.totalPaid,
        dueAmount: acc.dueAmount + child.stats.dueAmount,
        nextDueDate: acc.nextDueDate
          ? child.stats.nextDueDate && child.stats.nextDueDate < acc.nextDueDate
            ? child.stats.nextDueDate
            : acc.nextDueDate
          : child.stats.nextDueDate,
      }),
      { totalPaid: 0, dueAmount: 0, nextDueDate: null as Date | null }
    );
  };

  const stats = selectedChild === 'all'
    ? getTotalStats()
    : children.find(c => c.id === selectedChild)?.stats || { totalPaid: 0, dueAmount: 0, nextDueDate: null };

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
        {/* Child Selector */}
        <View style={styles.childSelector}>
          <Text style={styles.childSelectorLabel}>Viewing payments for:</Text>
          <TouchableOpacity
            style={styles.childSelectorButton}
            onPress={() => {
              // TODO: Show child selection modal
              // For now, just toggle between all and first child
              setSelectedChild(selectedChild === 'all' ? children[0]?.id : 'all');
            }}
          >
            <Text style={styles.childSelectorText}>
              {selectedChild === 'all'
                ? 'All Children'
                : children.find(c => c.id === selectedChild)?.name || 'Select Child'}
            </Text>
            <ChevronDown size={20} color="#666" />
          </TouchableOpacity>
        </View>

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
            style={[styles.filterButton, showFilters && styles.filterButtonActive]}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} color={showFilters ? '#0066cc' : '#666'} />
          </TouchableOpacity>
        </View>

        {/* Payment Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statsCard}>
            <Text style={styles.statsLabel}>Total Paid</Text>
            <Text style={styles.statsValue}>${stats.totalPaid.toLocaleString()}</Text>
            <Text style={styles.statsSubtext}>All Time</Text>
          </View>

          <View style={styles.statsCard}>
            <Text style={styles.statsLabel}>Due Amount</Text>
            <Text style={[styles.statsValue, { color: '#dc2626' }]}>
              ${stats.dueAmount.toLocaleString()}
            </Text>
            <Text style={styles.statsSubtext}>Current Period</Text>
          </View>

          <View style={styles.statsCard}>
            <Text style={styles.statsLabel}>Next Due Date</Text>
            <Text style={styles.statsValue}>
              {stats.nextDueDate ? format(stats.nextDueDate, 'MMM d') : 'N/A'}
            </Text>
            <Text style={styles.statsSubtext}>Upcoming Payment</Text>
          </View>
        </View>

        {/* Payment Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.payButton}
            onPress={() => setShowPaymentModal(true)}
          >
            <DollarSign size={24} color="white" />
            <Text style={styles.payButtonText}>Make Payment</Text>
          </TouchableOpacity>
        </View>

        {/* Children Payment Summary */}
        {selectedChild === 'all' && (
          <View style={styles.childrenSummary}>
            <Text style={styles.sectionTitle}>Children Summary</Text>
            {children.map(child => (
              <View key={child.id} style={styles.childSummaryCard}>
                <View style={styles.childInfo}>
                  <Text style={styles.childName}>{child.name}</Text>
                  <Text style={styles.childGrade}>{child.grade}</Text>
                </View>
                <View style={styles.childPaymentInfo}>
                  <View style={styles.childPaymentDetail}>
                    <Text style={styles.detailLabel}>Paid</Text>
                    <Text style={styles.detailValue}>
                      ${child.stats.totalPaid.toLocaleString()}
                    </Text>
                  </View>
                  <View style={styles.childPaymentDetail}>
                    <Text style={styles.detailLabel}>Due</Text>
                    <Text style={[styles.detailValue, { color: '#dc2626' }]}>
                      ${child.stats.dueAmount.toLocaleString()}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <PaymentModal
        visible={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onPaymentComplete={handlePaymentComplete}
        selectedChildId={selectedChild === 'all' ? undefined : selectedChild}
        children={children}
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
  headerButton: {
    padding: 8,
  },
  childSelector: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e4e4e7',
  },
  childSelectorLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  childSelectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#f4f4f5',
    borderRadius: 8,
  },
  childSelectorText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111',
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 8,
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
  },
  filterButtonActive: {
    backgroundColor: '#e0f2fe',
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
  childrenSummary: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111',
    marginBottom: 16,
  },
  childSummaryCard: {
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
  childInfo: {
    marginBottom: 12,
  },
  childName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111',
    marginBottom: 4,
  },
  childGrade: {
    fontSize: 14,
    color: '#666',
  },
  childPaymentInfo: {
    flexDirection: 'row',
    gap: 24,
  },
  childPaymentDetail: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111',
  },
}); 