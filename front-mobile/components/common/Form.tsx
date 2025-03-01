import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  KeyboardAvoidingViewProps,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../theme';
import { Button } from './Button';
import { LoadingState } from './LoadingState';

type FontWeight = '400' | '500' | '600' | '700' | 'normal' | 'bold';

interface FormProps {
  children: React.ReactNode;
  onSubmit: () => void;
  submitLabel?: string;
  submitDisabled?: boolean;
  submitLoading?: boolean;
  onCancel?: () => void;
  cancelLabel?: string;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  actionsStyle?: StyleProp<ViewStyle>;
  scrollable?: boolean;
  keyboardAvoiding?: boolean;
}

interface FormFieldProps {
  children: React.ReactNode;
  label?: string;
  error?: string;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
}

export const FormField: React.FC<FormFieldProps> = ({
  children,
  label,
  error,
  style,
  labelStyle,
  errorStyle,
}) => {
  return (
    <View style={[styles.field, style]}>
      {label && (
        <Text
          style={[
            styles.fieldLabel,
            labelStyle,
          ]}
        >
          {label}
        </Text>
      )}
      {children}
      {error && (
        <Text
          style={[
            styles.fieldError,
            errorStyle,
          ]}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

export const Form: React.FC<FormProps> = ({
  children,
  onSubmit,
  submitLabel = 'Submit',
  submitDisabled = false,
  submitLoading = false,
  onCancel,
  cancelLabel = 'Cancel',
  style,
  contentStyle,
  actionsStyle,
  scrollable = true,
  keyboardAvoiding = true,
}) => {
  const renderContent = () => {
    const content = (
      <View style={[styles.content, contentStyle]}>
        {children}
      </View>
    );

    if (scrollable) {
      return (
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          {content}
        </ScrollView>
      );
    }

    return content;
  };

  const renderActions = () => {
    if (!onSubmit && !onCancel) return null;

    return (
      <View style={[styles.actions, actionsStyle]}>
        {onCancel && (
          <Button
            onPress={onCancel}
            variant="outlined"
            color="primary"
            style={styles.cancelButton}
          >
            {cancelLabel}
          </Button>
        )}
        {onSubmit && (
          <Button
            onPress={onSubmit}
            variant="contained"
            color="primary"
            disabled={submitDisabled}
          >
            {submitLabel}
          </Button>
        )}
      </View>
    );
  };

  const Container = keyboardAvoiding ? KeyboardAvoidingView : View;
  const containerProps = keyboardAvoiding ? {
    behavior: Platform.OS === 'ios' ? 'padding' as KeyboardAvoidingViewProps['behavior'] : undefined,
    keyboardVerticalOffset: Platform.OS === 'ios' ? 88 : 0,
  } : {};

  return (
    <Container
      style={[styles.container, style]}
      {...containerProps}
    >
      {submitLoading ? (
        <LoadingState
          message="Submitting..."
          variant="spinner"
          size="large"
        />
      ) : (
        <>
          {renderContent()}
          {renderActions()}
        </>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
  },
  scrollContent: {
    flexGrow: 1,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.grey[200],
    backgroundColor: COLORS.grey[50],
  },
  cancelButton: {
    marginRight: SPACING.md,
  },
  field: {
    marginBottom: SPACING.lg,
  },
  fieldLabel: {
    fontSize: TYPOGRAPHY.subtitle2.fontSize,
    fontWeight: TYPOGRAPHY.subtitle2.fontWeight as FontWeight,
    lineHeight: TYPOGRAPHY.subtitle2.lineHeight,
    letterSpacing: TYPOGRAPHY.subtitle2.letterSpacing,
    color: COLORS.grey[700],
    marginBottom: SPACING.xs,
  },
  fieldError: {
    fontSize: TYPOGRAPHY.caption.fontSize,
    fontWeight: TYPOGRAPHY.caption.fontWeight as FontWeight,
    lineHeight: TYPOGRAPHY.caption.lineHeight,
    letterSpacing: TYPOGRAPHY.caption.letterSpacing,
    color: COLORS.error.main,
    marginTop: SPACING.xs,
  },
}); 