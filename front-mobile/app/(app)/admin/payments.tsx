import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Plus, X } from 'lucide-react-native';
import { PaymentList } from '../../../components/payments/PaymentList';
import { PaymentForm } from '../../../components/payments/PaymentForm';
import { Payment, paymentService } from '../../../services/payment';
import { useToast } from '../../../hooks/useToast';

export default function PaymentsScreen() {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const toast = useToast();

  const handleRefundPayment = async (payment: Payment) => {
    try {
      await paymentService.refundPayment({
        paymentId: payment.id,
        amount: payment.amount,
        reason: 'Refund requested by admin',
      });

      toast.show({
        title: 'Success',
        message: 'Payment refunded successfully',
        type: 'success',
      });
    } catch (error) {
      console.error('Error refunding payment:', error);
      toast.show({
        title: 'Error',
        message: 'Failed to refund payment',
        type: 'error',
      });
    }
  };

  const handlePaymentComplete = () => {
    setShowPaymentForm(false);
    // The PaymentList component will automatically refresh its data
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Payments',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => setShowPaymentForm(!showPaymentForm)}
              style={styles.headerButton}
            >
              {showPaymentForm ? (
                <X size={24} color="#666" />
              ) : (
                <Plus size={24} color="#666" />
              )}
            </TouchableOpacity>
          ),
        }}
      />

      {showPaymentForm ? (
        <PaymentForm onPaymentComplete={handlePaymentComplete} />
      ) : (
        <PaymentList
          onRefundPayment={handleRefundPayment}
          showActions={true}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerButton: {
    padding: 8,
  },
}); 