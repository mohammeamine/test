import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextStyle, Animated, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS, BORDER_RADIUS } from '../../theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Input } from '../common/Input';

type FontWeight = '400' | '500' | '600' | '700' | 'normal' | 'bold';

interface HeaderBarProps {
  title: string;
  showMenuButton?: boolean;
  showBackButton?: boolean;
  showSearch?: boolean;
  onSearch?: (query: string) => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  title,
  showMenuButton = true,
  showBackButton = false,
  showSearch = false,
  onSearch,
}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleMenuPress = () => {
    if (showBackButton) {
      navigation.goBack();
    } else {
      // @ts-ignore - drawer navigation type
      navigation.openDrawer();
    }
  };

  const handleSearchPress = () => {
    setIsSearchVisible(!isSearchVisible);
    if (!isSearchVisible) {
      setSearchQuery('');
    }
  };

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    onSearch?.(text);
  };

  const renderRightContent = () => (
    <View style={styles.rightButtons}>
      {showSearch && (
        <TouchableOpacity
          style={styles.iconButton}
          onPress={handleSearchPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name={isSearchVisible ? 'close' : 'search'}
            size={24}
            color={COLORS.grey[700]}
          />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => {}}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <View style={styles.notificationBadge}>
          <Text style={styles.badgeText}>3</Text>
        </View>
        <Ionicons
          name="notifications-outline"
          size={24}
          color={COLORS.grey[700]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.iconButton, styles.profileButton]}
        onPress={() => {}}
      >
        <Ionicons
          name="person-circle-outline"
          size={28}
          color={COLORS.primary.main}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <Animated.View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        {(showMenuButton || showBackButton) && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleMenuPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={showBackButton ? 'chevron-back' : 'menu'}
              size={24}
              color={COLORS.grey[700]}
            />
          </TouchableOpacity>
        )}
        {!isSearchVisible ? (
          <Text 
            style={[
              styles.title,
              {
                fontSize: TYPOGRAPHY.h3.fontSize,
                fontWeight: TYPOGRAPHY.h3.fontWeight as FontWeight,
                lineHeight: TYPOGRAPHY.h3.lineHeight,
                letterSpacing: TYPOGRAPHY.h3.letterSpacing,
                color: COLORS.grey[900],
              }
            ]} 
            numberOfLines={1}
          >
            {title}
          </Text>
        ) : (
          <View style={styles.searchContainer}>
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChangeText={handleSearchChange}
              autoFocus
              containerStyle={styles.searchInput}
              startAdornment={
                <Ionicons name="search" size={20} color={COLORS.grey[400]} />
              }
            />
          </View>
        )}
        {renderRightContent()}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background.light,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey[200],
    ...SHADOWS.sm,
  },
  content: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: SPACING.xs,
  },
  title: {
    flex: 1,
    marginHorizontal: SPACING.sm,
  },
  rightButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileButton: {
    backgroundColor: COLORS.primary.light + '10',
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: COLORS.error.main,
    borderRadius: BORDER_RADIUS.round,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    borderWidth: 1.5,
    borderColor: COLORS.background.light,
  },
  badgeText: {
    color: COLORS.background.light,
    fontSize: 10,
    fontWeight: '600',
    marginHorizontal: 4,
  },
  searchContainer: {
    flex: 1,
    marginHorizontal: SPACING.sm,
  },
  searchInput: {
    minHeight: 36,
    backgroundColor: COLORS.grey[100],
  },
}); 