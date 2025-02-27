import React, { useState } from 'react';
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  View,
  Animated,
  ScrollViewProps,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { Text } from './Text';
import { NAVIGATION_THEME } from '../../navigation/constants';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';
import { scale } from '../../utils/responsive';

interface RefreshableScrollViewProps extends ScrollViewProps {
  onRefresh: () => Promise<void>;
  refreshingComponent?: React.ReactNode;
  refreshingText?: string;
  showRefreshingText?: boolean;
}

export const RefreshableScrollView: React.FC<RefreshableScrollViewProps> = ({
  onRefresh,
  refreshingComponent,
  refreshingText = 'Refreshing...',
  showRefreshingText = true,
  children,
  onScroll,
  ...props
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [refreshProgress] = useState(new Animated.Value(0));
  const { getFontSize } = useResponsiveLayout();

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setRefreshing(false);
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY < 0) {
      const progress = Math.min(Math.abs(offsetY) / 100, 1);
      refreshProgress.setValue(progress);
    }
    onScroll?.(event);
  };

  const animatedStyle = {
    transform: [
      {
        rotate: refreshProgress.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };

  return (
    <ScrollView
      {...props}
      onScroll={handleScroll}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          progressViewOffset={scale(20)}
          colors={[NAVIGATION_THEME.colors.onSurface]}
          tintColor={NAVIGATION_THEME.colors.onSurface}
          progressBackgroundColor={NAVIGATION_THEME.colors.surface}
          size={scale(24)}
        />
      }
    >
      {refreshing && (
        <View style={styles.refreshingContainer}>
          {refreshingComponent || (
            <Animated.View style={[styles.refreshingIcon, animatedStyle]}>
              <View style={styles.refreshingDot} />
            </Animated.View>
          )}
          {showRefreshingText && (
            <Text
              style={[
                styles.refreshingText,
                { fontSize: getFontSize(14) },
              ]}
            >
              {refreshingText}
            </Text>
          )}
        </View>
      )}
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  refreshingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(16),
  },
  refreshingIcon: {
    width: scale(24),
    height: scale(24),
    borderRadius: scale(12),
    borderWidth: 2,
    borderColor: NAVIGATION_THEME.colors.onSurface,
    marginBottom: scale(8),
  },
  refreshingDot: {
    width: scale(4),
    height: scale(4),
    borderRadius: scale(2),
    backgroundColor: NAVIGATION_THEME.colors.onSurface,
    position: 'absolute',
    top: 0,
    left: '50%',
    marginLeft: -scale(2),
  },
  refreshingText: {
    color: NAVIGATION_THEME.colors.onSurface,
    marginTop: scale(8),
  },
}); 