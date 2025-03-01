import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { CreatePaymentParams, paymentService } from '../../services/payment';
import { useToast } from '../../hooks/useToast';
import { CreditCard, DollarSign } from 'lucide-react-native';
import { Picker } from '@react-native-picker/picker';

interface PaymentFormProps {
  onPaymentComplete?: () => void;
}

// Add type for currency
type Currency = 'USD' | 'EUR' | 'GBP';

export const PaymentForm: React.FC<PaymentFormProps> = ({
  onPaymentComplete,
}) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<string[]>([]);
  const toast = useToast();

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const methods = await paymentService.getPaymentMethods();
        setPaymentMethods(methods);
        if (methods.length > 0) {
          setPaymentMethod(methods[0]);
        }
      } catch (error) {
        console.error('Error fetching payment methods:', error);
        toast.show({
          title: 'Error',
          message: 'Failed to fetch payment methods',
          type: 'error',
        });
      }
    };

    fetchPaymentMethods();
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!amount || !description || !paymentMethod) {
      toast.show({
        title: 'Error',
        message: 'Please fill in all required fields',
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
        paymentMethod,
      };

      const paymentIntent = await paymentService.createPaymentIntent(paymentParams);
      
      // Here you would typically handle the payment confirmation
      // using a payment provider's SDK (e.g., Stripe)
      
      toast.show({
        title: 'Success',
        message: 'Payment initiated successfully',
        type: 'success',
      });

      // Reset form
      setAmount('');
      setDescription('');
      setCurrency('USD');
      setPaymentMethod(paymentMethods[0] || '');

      onPaymentComplete?.();
    } catch (error) {
      console.error('Error creating payment:', error);
      toast.show({
        title: 'Error',
        message: 'Failed to create payment',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, [amount, currency, description, paymentMethod, paymentMethods]);

  return (
    <ScrollView style={styles.container}>
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
        <View style={styles.paymentMethodContainer}>
          <CreditCard size={20} color="#666" style={styles.paymentMethodIcon} />
          <Picker
            selectedValue={paymentMethod}
            onValueChange={(value: string) => setPaymentMethod(value)}
            enabled={!loading}
            style={styles.paymentMethodPicker}
          >
            {paymentMethods.map((method) => (
              <Picker.Item
                key={method}
                label={method}
                value={method}
              />
            ))}
          </Picker>
        </View>
      </View>

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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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