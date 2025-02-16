import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme, type Theme } from '../lib/theme/theme';

export function useTheme(): Theme {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? darkTheme : lightTheme;
}

export function useColors() {
  const theme = useTheme();
  return theme.colors;
}

export function useSpacing() {
  const theme = useTheme();
  return theme.spacing;
}

export function useTypography() {
  const theme = useTheme();
  return theme.typography;
}

export function useBorderRadius() {
  const theme = useTheme();
  return theme.borderRadius;
} 