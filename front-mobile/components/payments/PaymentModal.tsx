import React, { useState } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Text } from '../ui/Text';
import { X, CreditCard, DollarSign, User } from 'lucide-react-native';
import { Picker } from '@react-native-picker/picker';
import { CreatePaymentParams, PaymentMethod, paymentService } from '../../services/payment';
import { useToast } from '../../hooks/useToast';

interface Child {
  id: string;
  name: string;
  grade: string;
}

interface PaymentModalProps {
  visible: boolean;
  onClose: () => void;
  onPaymentComplete?: () => void;
  paymentMethods: PaymentMethod[];
  children?: Child[];
  selectedChildId?: string;
}

type Currency = 'USD' | 'EUR' | 'GBP';

export const PaymentModal: React.FC<PaymentModalProps> = ({
  visible,
  onClose,
  onPaymentComplete,
  paymentMethods,
  children,
  selectedChildId,
}) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [selectedChild, setSelectedChild] = useState<string>(selectedChildId || '');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async () => {
    if (!amount || !description || !selectedMethod) {
      toast.show({
        title: 'Error',
        message: 'Please fill in all required fields',
        type: 'error',
      });
      return;
    }

    if (children && children.length > 0 && !selectedChild) {
      toast.show({
        title: 'Error',
        message: 'Please select a child',
        type: 'error',
      });
      return;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      toast.show({
        title: 'Error',
        message: 'Please enter a valid amount',
        type: 'error',
      });
      return;
    }

    try {
      setLoading(true);

      const paymentParams: CreatePaymentParams = {
        amount: numericAmount,
        currency,
        description: description.trim(),
        paymentMethod: selectedMethod,
        metadata: children ? { childId: selectedChild } : undefined,
      };

      const paymentIntent = await paymentService.createPaymentIntent(paymentParams);
      await paymentService.confirmPayment(paymentIntent.id, selectedMethod);
      
      toast.show({
        title: 'Success',
        message: 'Payment completed successfully',
        type: 'success',
      });

      // Reset form
      setAmount('');
      setDescription('');
      setCurrency('USD');
      setSelectedMethod('');
      setSelectedChild(selectedChildId || '');

      onPaymentComplete?.();
      onClose();
    } catch (error) {
      console.error('Error processing payment:', error);
      toast.show({
        title: 'Error',
        message: 'Failed to process payment',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Make Payment</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.form}>
            {children && children.length > 0 && (
              <View style={styles.formGroup}>
                <Text style={styles.label}>Select Child</Text>
                <View style={styles.pickerContainer}>
                  <User size={20} color="#666" style={styles.pickerIcon} />
                  <Picker
                    selectedValue={selectedChild}
                    onValueChange={(value: string) => setSelectedChild(value)}
                    enabled={!loading}
                    style={styles.picker}
                  >
                    <Picker.Item label="Select a child" value="" />
                    {children.map((child) => (
                      <Picker.Item
                        key={child.id}
                        label={`${child.name} (${child.grade})`}
                        value={child.id}
                      />
                    ))}
                  </Picker>
                </View>
              </View>
            )}

            <View style={styles.formGroup}>
              <Text style={styles.label}>Amount</Text>
              <View style={styles.amountContainer}>
                <DollarSign size={20} color="#666" style={styles.amountIcon} />
                <TextInput
                  style={styles.amountInput}
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="decimal-pad"
                  placeholder="0.00"
                  editable={!loading}
                />
                <Picker
                  selectedValue={currency}
                  onValueChange={(value: Currency) => setCurrency(value)}
                  enabled={!loading}
                  style={styles.currencyPicker}
                >
                  <Picker.Item label="USD" value="USD" />
                  <Picker.Item label="EUR" value="EUR" />
                  <Picker.Item label="GBP" value="GBP" />
                </Picker>
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder="Payment description"
                multiline
                numberOfLines={3}
                editable={!loading}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Payment Method</Text>
              {paymentMethods.length > 0 ? (
                <View style={styles.paymentMethodContainer}>
                  <CreditCard size={20} color="#666" style={styles.paymentMethodIcon} />
                  <Picker
                    selectedValue={selectedMethod}
                    onValueChange={(value: string) => setSelectedMethod(value)}
                    enabled={!loading}
                    style={styles.paymentMethodPicker}
                  >
                    <Picker.Item label="Select a payment method" value="" />
                    {paymentMethods.map((method) => (
                      <Picker.Item
                        key={method.id}
                        label={`${method.type} •••• ${method.last4}`}
                        value={method.id}
                      />
                    ))}
                  </Picker>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.addPaymentMethodButton}
                  onPress={() => {
                    onClose();
                    // Navigate to payment methods screen
                  }}
                >
                  <CreditCard size={20} color="#0066cc" />
                  <Text style={styles.addPaymentMethodText}>
                    Add a Payment Method
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>

          <TouchableOpacity
            style={[styles.submitButton, loading && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.submitButtonText}>Make Payment</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: '80%',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111',
  },
  closeButton: {
    padding: 8,
  },
  form: {
    flex: 1,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  amountIcon: {
    marginLeft: 12,
  },
  amountInput: {
    flex: 1,
    padding: 12,
    fontSize: 24,
    fontWeight: '600',
  },
  currencyPicker: {
    width: 100,
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  paymentMethodIcon: {
    marginLeft: 12,
  },
  paymentMethodPicker: {
    flex: 1,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  pickerIcon: {
    marginLeft: 12,
  },
  picker: {
    flex: 1,
  },
  addPaymentMethodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bae6fd',
    gap: 8,
  },
  addPaymentMethodText: {
    color: '#0066cc',
    fontSize: 16,
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#0066cc',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
}); 