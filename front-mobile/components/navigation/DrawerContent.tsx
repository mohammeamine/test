import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../theme';
import { NavigationGroup } from '../../navigation/types';
import { useNavigation, DrawerActions } from '@react-navigation/native';

type FontWeight = '400' | '500' | '600' | '700' | 'normal' | 'bold';

interface DrawerContentProps {
  role: string;
  groups: NavigationGroup[];
  activeRoute: string;
  onClose: () => void;
}

export const DrawerContent: React.FC<DrawerContentProps> = ({
  role,
  groups,
  activeRoute,
  onClose,
}) => {
  const router = useRouter();
  const navigation = useNavigation();

  const handleNavigation = (path: string) => {
    // @ts-ignore - navigation type mismatch
    navigation.navigate(path);
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  const handleLogout = () => {
    router.replace('/auth/login');
  };

  const renderItem = (route: { name: string; path: string; icon?: string }) => {
    const isActive = activeRoute === route.path;
    const iconName = route.icon || 'document-outline';

    return (
      <TouchableOpacity
        key={route.path}
        style={[
          styles.item,
          isActive && styles.activeItem,
        ]}
        onPress={() => handleNavigation(route.path)}
      >
        <Ionicons
          name={iconName as any}
          size={24}
          color={isActive ? COLORS.primary.main : COLORS.grey[600]}
          style={styles.icon}
        />
        <Text
          style={[
            styles.itemText,
            isActive && styles.activeItemText,
          ]}
          numberOfLines={1}
        >
          {route.name}
        </Text>
        {isActive && (
          <View style={styles.activeIndicator} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>School Management</Text>
        </View>
        <Text style={styles.roleText}>
          {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
        </Text>
      </View>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {groups.map((group, index) => (
          <View key={index} style={styles.group}>
            {group.name && (
              <Text style={styles.groupTitle}>{group.name}</Text>
            )}
            {group.routes.map(renderItem)}
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Ionicons
          name="log-out-outline"
          size={24}
          color={COLORS.error.main}
          style={styles.icon}
        />
        <Text style={[
          styles.itemText,
          { color: COLORS.error.main, fontWeight: '600' as FontWeight }
        ]}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.light,
  },
  header: {
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey[200],
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: SPACING.sm,
  },
  logoText: {
    fontSize: TYPOGRAPHY.h2.fontSize,
    fontWeight: TYPOGRAPHY.h2.fontWeight as FontWeight,
    color: COLORS.primary.main,
    textAlign: 'center',
  },
  roleText: {
    fontSize: TYPOGRAPHY.subtitle1.fontSize,
    fontWeight: TYPOGRAPHY.subtitle1.fontWeight as FontWeight,
    lineHeight: TYPOGRAPHY.subtitle1.lineHeight,
    letterSpacing: TYPOGRAPHY.subtitle1.letterSpacing,
    color: COLORS.grey[700],
  },
  scrollView: {
    flex: 1,
  },
  group: {
    paddingVertical: SPACING.sm,
  },
  groupTitle: {
    fontSize: TYPOGRAPHY.caption.fontSize,
    fontWeight: TYPOGRAPHY.caption.fontWeight as FontWeight,
    lineHeight: TYPOGRAPHY.caption.lineHeight,
    letterSpacing: TYPOGRAPHY.caption.letterSpacing,
    color: COLORS.grey[500],
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    textTransform: 'uppercase',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    marginHorizontal: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  activeItem: {
    backgroundColor: COLORS.primary.light + '20',
  },
  icon: {
    marginRight: SPACING.sm,
  },
  itemText: {
    fontSize: TYPOGRAPHY.body1.fontSize,
    fontWeight: TYPOGRAPHY.body1.fontWeight as FontWeight,
    lineHeight: TYPOGRAPHY.body1.lineHeight,
    letterSpacing: TYPOGRAPHY.body1.letterSpacing,
    color: COLORS.grey[600],
    flex: 1,
  },
  activeItemText: {
    color: COLORS.primary.main,
    fontWeight: '600' as FontWeight,
  },
  activeIndicator: {
    width: 4,
    height: 24,
    backgroundColor: COLORS.primary.main,
    borderRadius: BORDER_RADIUS.sm,
    position: 'absolute',
    right: 0,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.grey[200],
  },
}); 