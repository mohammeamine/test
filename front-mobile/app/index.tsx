import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  Animated,
  ViewToken,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Text } from '../components/ui/Text';
import { Button } from '../components/ui/Button';
import { NAVIGATION_THEME } from '../navigation/constants';
import { scale, verticalScale } from '../utils/responsive';
import { Ionicons } from '@expo/vector-icons';

interface OnboardingItem {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const onboardingData: OnboardingItem[] = [
  {
    id: '1',
    title: 'Welcome to School Management',
    description: 'Your all-in-one solution for managing educational institutions efficiently and effectively.',
    icon: 'school-outline',
  },
  {
    id: '2',
    title: 'Multiple User Roles',
    description: 'Dedicated interfaces for administrators, teachers, students, and parents.',
    icon: 'people-outline',
  },
  {
    id: '3',
    title: 'Real-time Updates',
    description: 'Stay informed with instant notifications about grades, attendance, and important announcements.',
    icon: 'notifications-outline',
  },
  {
    id: '4',
    title: 'Get Started',
    description: 'Join us in revolutionizing education management. Create your account or sign in to continue.',
    icon: 'rocket-outline',
  },
];

export default function LandingScreen() {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const viewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems[0]) {
      setCurrentIndex(Number(viewableItems[0].index));
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      router.push('/login');
    }
  };

  const renderItem = ({ item }: { item: OnboardingItem }) => {
    return (
      <View style={[styles.itemContainer, { width }]}>
        <View style={styles.iconContainer}>
          <Ionicons name={item.icon} size={64} color={NAVIGATION_THEME.colors.onSurface} />
        </View>
        <Text variant="h1" style={styles.title}>{item.title}</Text>
        <Text variant="body" style={styles.description}>{item.description}</Text>
      </View>
    );
  };

  const Pagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {onboardingData.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 16, 8],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={i.toString()}
              style={[
                styles.dot,
                { width: dotWidth, opacity },
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <LinearGradient
      colors={[NAVIGATION_THEME.colors.surface, NAVIGATION_THEME.colors.surfaceVariant]}
      style={styles.container}
    >
      <View style={styles.flatListContainer}>
        <FlatList
          ref={flatListRef}
          data={onboardingData}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          scrollEventThrottle={32}
        />
      </View>

      <View style={styles.bottomContainer}>
        <Pagination />
        
        <View style={styles.buttonContainer}>
          <Button
            title={currentIndex === onboardingData.length - 1 ? "Get Started" : "Next"}
            onPress={scrollTo}
            size="large"
            style={styles.button}
          />
          {currentIndex !== onboardingData.length - 1 && (
            <Button
              title="Skip"
              onPress={() => router.push('/login')}
              variant="text"
              size="large"
              style={styles.skipButton}
            />
          )}
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContainer: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(40),
  },
  iconContainer: {
    width: scale(120),
    height: scale(120),
    borderRadius: scale(60),
    backgroundColor: NAVIGATION_THEME.colors.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(32),
  },
  title: {
    textAlign: 'center',
    marginBottom: verticalScale(16),
    color: NAVIGATION_THEME.colors.onSurface,
  },
  description: {
    textAlign: 'center',
    color: NAVIGATION_THEME.colors.onSurfaceVariant,
  },
  bottomContainer: {
    paddingHorizontal: scale(24),
    paddingBottom: verticalScale(48),
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(24),
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: NAVIGATION_THEME.colors.onSurface,
    marginHorizontal: 4,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    minWidth: '100%',
  },
  skipButton: {
    marginTop: verticalScale(8),
  },
});
