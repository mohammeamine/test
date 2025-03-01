import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../ui/Text';
import { NAVIGATION_THEME } from '../../navigation/constants';
import { scale } from '../../utils/responsive';
import { useRouter } from 'expo-router';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class NavigationErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can log the error to an error reporting service here
    console.error('Navigation Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

const ErrorFallback: React.FC<{ error?: Error }> = ({ error }) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Oops! Something went wrong</Text>
      {error && (
        <Text style={styles.errorMessage}>
          {error.message}
        </Text>
      )}
      <View style={styles.buttonContainer}>
        <Text style={styles.button} onPress={handleGoBack}>
          Go Back
        </Text>
        <Text style={styles.button} onPress={handleGoHome}>
          Go Home
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: NAVIGATION_THEME.spacing.lg,
    backgroundColor: NAVIGATION_THEME.colors.background,
  },
  title: {
    fontSize: scale(20),
    fontWeight: 'bold',
    color: NAVIGATION_THEME.colors.text,
    marginBottom: NAVIGATION_THEME.spacing.md,
  },
  errorMessage: {
    fontSize: scale(14),
    color: '#666',
    textAlign: 'center',
    marginBottom: NAVIGATION_THEME.spacing.lg,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: NAVIGATION_THEME.spacing.md,
  },
  button: {
    fontSize: scale(16),
    color: NAVIGATION_THEME.colors.text,
    padding: NAVIGATION_THEME.spacing.sm,
  },
}); 