import { colors } from '../../styles/theme/colors';
import { spacing, borderRadius } from '../../styles/theme/spacing';
import { typography } from '../../styles/theme/typography';

export const lightTheme = {
  colors: {
    // Background colors
    background: colors.white,
    surface: colors.neutral[50],
    surfaceHover: colors.neutral[100],
    surfaceActive: colors.neutral[200],

    // Text colors
    text: colors.neutral[900],
    textSecondary: colors.neutral[600],
    textTertiary: colors.neutral[400],
    textDisabled: colors.neutral[300],

    // Primary colors
    primary: colors.primary[600],
    primaryHover: colors.primary[700],
    primaryActive: colors.primary[800],
    primaryLight: colors.primary[50],
    primaryLightHover: colors.primary[100],
    primaryLightActive: colors.primary[200],

    // Secondary colors
    secondary: colors.secondary[600],
    secondaryHover: colors.secondary[700],
    secondaryActive: colors.secondary[800],
    secondaryLight: colors.secondary[50],
    secondaryLightHover: colors.secondary[100],
    secondaryLightActive: colors.secondary[200],

    // Success colors
    success: colors.success[600],
    successHover: colors.success[700],
    successActive: colors.success[800],
    successLight: colors.success[50],
    successLightHover: colors.success[100],
    successLightActive: colors.success[200],

    // Warning colors
    warning: colors.warning[600],
    warningHover: colors.warning[700],
    warningActive: colors.warning[800],
    warningLight: colors.warning[50],
    warningLightHover: colors.warning[100],
    warningLightActive: colors.warning[200],

    // Error colors
    error: colors.error[600],
    errorHover: colors.error[700],
    errorActive: colors.error[800],
    errorLight: colors.error[50],
    errorLightHover: colors.error[100],
    errorLightActive: colors.error[200],

    // Border colors
    border: colors.neutral[200],
    borderHover: colors.neutral[300],
    borderFocus: colors.primary[500],

    // Overlay colors
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  spacing,
  borderRadius,
  typography,
} as const;

export const darkTheme = {
  colors: {
    // Background colors
    background: colors.neutral[900],
    surface: colors.neutral[800],
    surfaceHover: colors.neutral[700],
    surfaceActive: colors.neutral[600],

    // Text colors
    text: colors.white,
    textSecondary: colors.neutral[400],
    textTertiary: colors.neutral[500],
    textDisabled: colors.neutral[600],

    // Primary colors
    primary: colors.primary[500],
    primaryHover: colors.primary[400],
    primaryActive: colors.primary[300],
    primaryLight: colors.primary[900],
    primaryLightHover: colors.primary[800],
    primaryLightActive: colors.primary[700],

    // Secondary colors
    secondary: colors.secondary[500],
    secondaryHover: colors.secondary[400],
    secondaryActive: colors.secondary[300],
    secondaryLight: colors.secondary[900],
    secondaryLightHover: colors.secondary[800],
    secondaryLightActive: colors.secondary[700],

    // Success colors
    success: colors.success[500],
    successHover: colors.success[400],
    successActive: colors.success[300],
    successLight: colors.success[900],
    successLightHover: colors.success[800],
    successLightActive: colors.success[700],

    // Warning colors
    warning: colors.warning[500],
    warningHover: colors.warning[400],
    warningActive: colors.warning[300],
    warningLight: colors.warning[900],
    warningLightHover: colors.warning[800],
    warningLightActive: colors.warning[700],

    // Error colors
    error: colors.error[500],
    errorHover: colors.error[400],
    errorActive: colors.error[300],
    errorLight: colors.error[900],
    errorLightHover: colors.error[800],
    errorLightActive: colors.error[700],

    // Border colors
    border: colors.neutral[700],
    borderHover: colors.neutral[600],
    borderFocus: colors.primary[500],

    // Overlay colors
    overlay: 'rgba(0, 0, 0, 0.75)',
  },
  spacing,
  borderRadius,
  typography,
} as const;

export type Theme = {
  colors: {
    [K in keyof typeof lightTheme.colors]: string;
  };
  spacing: typeof lightTheme.spacing;
  borderRadius: typeof lightTheme.borderRadius;
  typography: typeof lightTheme.typography;
};
export type ThemeColors = Theme['colors']; 