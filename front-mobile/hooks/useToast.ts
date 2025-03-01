import { useCallback } from 'react';
import { Alert } from 'react-native';

interface ToastOptions {
  title: string;
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
}

export const useToast = () => {
  const show = useCallback(({ title, message, type = 'info' }: ToastOptions) => {
    Alert.alert(
      title,
      message,
      [{ text: 'OK', onPress: () => {} }],
      {
        cancelable: true,
      }
    );
  }, []);

  return { show };
}; 