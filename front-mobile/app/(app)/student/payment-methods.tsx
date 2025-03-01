import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';
import { Text } from '../../../components/ui/Text';
import { CreditCard, Plus, Trash2, CheckCircle2 } from 'lucide-react-native';
import { paymentService } from '../../../services/payment';
import { useToast } from '../../../hooks/useToast';
import { AddPaymentMethodModal } from '../../../components/payments/AddPaymentMethodModal';

interface PaymentMethod {
  id: string;
  type: string;
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  isDefault: boolean;
}

export default function PaymentMethodsScreen() {
  const [loading, setLoading] = useState(true);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const toast = useToast();
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchPaymentMethods = async () => {
    try {
      setLoading(true);
      const methods = await paymentService.getPaymentMethods();
      setPaymentMethods(methods);
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      toast.show({
        title: 'Error',
        message: 'Failed to fetch payment methods',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const handleAddSuccess = async () => {
    await fetchPaymentMethods();
    toast.show({
      title: 'Success',
      message: 'Payment method added successfully',
      type: 'success',
    });
  };

  const handleSetDefault = async (methodId: string) => {
    try {
      await paymentService.setDefaultPaymentMethod(methodId);
      await fetchPaymentMethods();
      toast.show({
        title: 'Success',
        message: 'Default payment method updated',
        type: 'success',
      });
    } catch (error) {
      toast.show({
        title: 'Error',
        message: 'Failed to update default payment method',
        type: 'error',
      });
    }
  };

  const handleDelete = async (methodId: string) => {
    try {
      await paymentService.deletePaymentMethod(methodId);
      await fetchPaymentMethods();
      toast.show({
        title: 'Success',
        message: 'Payment method removed',
        type: 'success',
      });
    } catch (error) {
      toast.show({
        title: 'Error',
        message: 'Failed to remove payment method',
        type: 'error',
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0066cc" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Payment Methods' }} />

      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Saved Payment Methods</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowAddModal(true)}
          >
            <Plus size={20} color="white" />
            <Text style={styles.addButtonText}>Add New</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.methodsList}>
          {paymentMethods.map((method) => (
            <View key={method.id} style={styles.methodCard}>
              <View style={styles.methodInfo}>
                <CreditCard size={24} color="#666" />
                <View style={styles.methodDetails}>
                  <Text style={styles.methodTitle}>
                    {method.type.charAt(0).toUpperCase() + method.type.slice(1)} •••• {method.last4}
                  </Text>
                  <Text style={styles.methodExpiry}>
                    Expires {method.expiryMonth}/{method.expiryYear}
                  </Text>
                </View>
              </View>

              <View style={styles.methodActions}>
                {method.isDefault ? (
                  <View style={styles.defaultBadge}>
                    <CheckCircle2 size={16} color="#16a34a" />
                    <Text style={styles.defaultText}>Default</Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.setDefaultButton}
                    onPress={() => handleSetDefault(method.id)}
                  >
                    <Text style={styles.setDefaultText}>Set Default</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(method.id)}
                >
                  <Trash2 size={20} color="#dc2626" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <AddPaymentMethodModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleAddSuccess}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0066cc',
    padding: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 4,
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  methodsList: {
    padding: 16,
    gap: 12,
  },
  methodCard: {
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
  methodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  methodDetails: {
    flex: 1,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111',
    marginBottom: 4,
  },
  methodExpiry: {
    fontSize: 14,
    color: '#666',
  },
  methodActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f4f4f5',
  },
  defaultBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  defaultText: {
    fontSize: 14,
    color: '#16a34a',
    fontWeight: '500',
  },
  setDefaultButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#f4f4f5',
  },
  setDefaultText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  deleteButton: {
    padding: 8,
  },
}); 