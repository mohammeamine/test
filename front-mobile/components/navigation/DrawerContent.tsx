import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '../ui/Text';
import { Ionicons } from '@expo/vector-icons';
import { RoleType, NavigationGroup, NavigationRoute } from '../../navigation/types';
import { ROLE_COLORS, NAVIGATION_THEME } from '../../navigation/constants';
import { scale, verticalScale } from '../../utils/responsive';
import { useRouter } from 'expo-router';
import { createRoutePath, isValidRoute } from '../../navigation/helpers';

interface DrawerContentProps {
  role: RoleType;
  groups: NavigationGroup[];
  activeRoute?: string;
  onClose?: () => void;
}

export const DrawerContent: React.FC<DrawerContentProps> = ({
  role,
  groups,
  activeRoute,
  onClose,
}) => {
  const router = useRouter();
  const roleColor = ROLE_COLORS[role].primary;

  const handleNavigation = (route: NavigationRoute['path']) => {
    if (isValidRoute(role, route)) {
      const routePath = createRoutePath(role, route);
      router.push(routePath);
      onClose?.();
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: roleColor }]}>
        <Text style={styles.headerTitle}>School Management</Text>
        <Text style={styles.roleText}>{role.charAt(0).toUpperCase() + role.slice(1)}</Text>
      </View>

      <ScrollView style={styles.content}>
        {groups.map((group) => (
          <View key={group.name} style={styles.group}>
            <View style={styles.groupHeader}>
              <Ionicons name={group.icon} size={20} color="#666" />
              <Text style={styles.groupTitle}>{group.name}</Text>
            </View>

            {group.routes.map((route) => (
              <TouchableOpacity
                key={route.path}
                style={[
                  styles.routeItem,
                  activeRoute === route.path && { backgroundColor: `${roleColor}10` },
                ]}
                onPress={() => handleNavigation(route.path)}
              >
                <Ionicons
                  name={route.icon}
                  size={20}
                  color={activeRoute === route.path ? roleColor : '#666'}
                />
                <Text
                  style={[
                    styles.routeText,
                    activeRoute === route.path && { color: roleColor, fontWeight: '600' },
                  ]}
                >
                  {route.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.logoutButton} onPress={() => router.push('/login')}>
        <Ionicons name="log-out-outline" size={20} color="#666" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NAVIGATION_THEME.colors.background,
  },
  header: {
    padding: NAVIGATION_THEME.spacing.md,
    paddingTop: NAVIGATION_THEME.spacing.xl + verticalScale(20),
    paddingBottom: NAVIGATION_THEME.spacing.xl,
  },
  headerTitle: {
    color: '#fff',
    fontSize: scale(20),
    fontWeight: 'bold',
    marginBottom: NAVIGATION_THEME.spacing.xs,
  },
  roleText: {
    color: '#fff',
    fontSize: scale(14),
    opacity: 0.9,
  },
  content: {
    flex: 1,
  },
  group: {
    marginBottom: NAVIGATION_THEME.spacing.md,
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: NAVIGATION_THEME.spacing.md,
    paddingVertical: NAVIGATION_THEME.spacing.sm,
  },
  groupTitle: {
    fontSize: scale(14),
    color: '#666',
    marginLeft: NAVIGATION_THEME.spacing.sm,
    fontWeight: '600',
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: NAVIGATION_THEME.spacing.md,
    marginVertical: 1,
  },
  routeText: {
    fontSize: scale(16),
    color: '#333',
    marginLeft: NAVIGATION_THEME.spacing.md,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: NAVIGATION_THEME.spacing.md,
    borderTopWidth: 1,
    borderTopColor: NAVIGATION_THEME.colors.border,
  },
  logoutText: {
    fontSize: scale(16),
    color: '#666',
    marginLeft: NAVIGATION_THEME.spacing.md,
  },
}); 