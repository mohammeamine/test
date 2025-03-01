import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Payment, paymentService } from '../../services/payment';
import { CreditCard, RefreshCcw, AlertCircle } from 'lucide-react-native';
import { format } from 'date-fns';
import { useToast } from '../../hooks/useToast';

interface PaymentListProps {
  onPaymentSelect?: (payment: Payment) => void;
  onRefundPayment?: (payment: Payment) => void;
  showActions?: boolean;
}

export const PaymentList: React.FC<PaymentListProps> = ({
  onPaymentSelect,
  onRefundPayment,
  showActions = true,
}) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const toast = useToast();

  const fetchPayments = useCallback(async () => {
    try {
      const fetchedPayments = await paymentService.getAllPayments();
      setPayments(fetchedPayments);
    } catch (error) {
      console.error('Error fetching payments:', error);
      toast.show({
        title: 'Error',
        message: 'Failed to fetch payments',
        type: 'error',
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPayments();
  }, [fetchPayments]);

  const getStatusColor = (status: Payment['status']) => {
    switch (status) {
      case 'completed':
        return '#4CAF50';
      case 'pending':
        return '#FFC107';
      case 'failed':
        return '#F44336';
      case 'refunded':
        return '#9E9E9E';
      default:
        return '#666666';
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const renderItem = ({ item: payment }: { item: Payment }) => (
    <TouchableOpacity
      style={styles.paymentItem}
      onPress={() => onPaymentSelect?.(payment)}
      disabled={!onPaymentSelect}
    >
      <View style={styles.paymentInfo}>
        <CreditCard size={24} color="#666" />
        <View style={styles.paymentDetails}>
          <Text style={styles.paymentDescription}>{payment.description}</Text>
          <Text style={styles.paymentAmount}>
            {formatCurrency(payment.amount, payment.currency)}
          </Text>
          <Text style={styles.paymentMeta}>
            {format(new Date(payment.createdAt), 'PPp')}
          </Text>
        </View>
      </View>

      <View style={styles.paymentStatus}>
        <View
          style={[
            styles.statusIndicator,
            { backgroundColor: getStatusColor(payment.status) },
          ]}
        >
          <Text style={styles.statusText}>
            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
          </Text>
        </View>

        {showActions && payment.status === 'completed' && (
          <TouchableOpacity
            style={styles.refundButton}
            onPress={() => onRefundPayment?.(payment)}
          >
            <RefreshCcw size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <FlatList
      data={payments}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <AlertCircle size={48} color="#666" />
          <Text style={styles.emptyText}>No payments found</Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  paymentInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentDetails: {
    marginLeft: 12,
    flex: 1,
  },
  paymentDescription: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  paymentAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0066cc',
    marginBottom: 4,
  },
  paymentMeta: {
    fontSize: 12,
    color: '#666',
  },
  paymentStatus: {
    alignItems: 'flex-end',
  },
  statusIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  refundButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
  },
}); 