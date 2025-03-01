import { useWindowDimensions } from 'react-native';
import { scale, verticalScale } from '../utils/responsive';

export const useResponsiveLayout = () => {
  const { width, height } = useWindowDimensions();

  // Mobile-first breakpoints
  const breakpoints = {
    xs: 320,
    sm: 360,
    md: 480,
    lg: 768,
    xl: 1024,
  };

  return {
    // Screen size checks
    isExtraSmallScreen: width < breakpoints.xs,
    isSmallScreen: width >= breakpoints.xs && width < breakpoints.sm,
    isMediumScreen: width >= breakpoints.sm && width < breakpoints.md,
    isLargeScreen: width >= breakpoints.md && width < breakpoints.lg,
    isExtraLargeScreen: width >= breakpoints.lg,
    isLandscape: width > height,

    // Layout utilities
    getChartWidth: (padding = 32) => {
      if (width < breakpoints.sm) return width - padding;
      if (width < breakpoints.md) return width - (padding * 1.5);
      return width - (padding * 2);
    },

    getChartHeight: () => {
      if (width < breakpoints.sm) return 180;
      if (width < breakpoints.md) return 200;
      return 220;
    },

    getGridColumns: () => {
      if (width < breakpoints.sm) return 1;
      if (width < breakpoints.lg) return 2;
      return 3;
    },

    // Typography scaling
    getFontSize: (size: number) => {
      if (width < breakpoints.xs) return scale(size * 0.8);
      if (width < breakpoints.sm) return scale(size * 0.85);
      if (width < breakpoints.md) return scale(size * 0.9);
      return scale(size);
    },

    // Spacing utilities
    getSpacing: (value: number) => {
      if (width < breakpoints.xs) return scale(value * 0.7);
      if (width < breakpoints.sm) return scale(value * 0.75);
      if (width < breakpoints.md) return scale(value * 0.85);
      return scale(value);
    },

    // Touch target utilities
    getTouchableSize: (baseSize = 44) => {
      // Following Apple's Human Interface Guidelines minimum touch target size
      return Math.max(scale(baseSize), 44);
    },

    // Safe area utilities
    getSafeAreaPadding: () => ({
      paddingTop: verticalScale(20),
      paddingBottom: verticalScale(16),
      paddingHorizontal: scale(16),
    }),

    // Card layout utilities
    getCardPadding: () => {
      if (width < breakpoints.sm) return scale(12);
      if (width < breakpoints.md) return scale(16);
      return scale(20);
    },

    // Navigation utilities
    getNavigationBarHeight: () => {
      if (width < breakpoints.sm) return verticalScale(56);
      return verticalScale(64);
    },
  };
}; 