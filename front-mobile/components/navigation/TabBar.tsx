import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { RoleType, NavigationRoute } from '../../navigation/types';
import { ROLE_COLORS, NAVIGATION_THEME } from '../../navigation/constants';
import { scale, verticalScale } from '../../utils/responsive';
import { Text } from '../ui/Text';

interface TabBarProps {
  role: RoleType;
  routes: NavigationRoute[];
}

export const TabBar: React.FC<TabBarProps> = ({ role, routes }) => {
  const roleColor = ROLE_COLORS[role].primary;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: roleColor,
        tabBarInactiveTintColor: '#999',
        tabBarStyle: styles.tabBar,
        headerStyle: styles.header,
        headerTitleStyle: [
          styles.headerTitle,
          { color: roleColor }
        ],
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIconStyle: styles.tabBarIcon,
        tabBarItemStyle: styles.tabBarItem,
        tabBarLabel: ({ focused, children }) => (
          <Text
            style={[
              styles.tabBarLabel,
              { color: focused ? roleColor : '#999' }
            ]}
          >
            {children}
          </Text>
        ),
      }}
    >
      {routes.map((route) => (
        <Tabs.Screen
          key={route.path}
          name={route.path}
          options={{
            title: route.name,
            tabBarIcon: ({ color, size, focused }) => (
              <View style={styles.iconContainer}>
                <Ionicons 
                  name={route.icon} 
                  size={size} 
                  color={color}
                />
                {focused && <View style={[styles.indicator, { backgroundColor: roleColor }]} />}
              </View>
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 1,
    borderTopColor: NAVIGATION_THEME.colors.border,
    height: verticalScale(65),
    paddingBottom: verticalScale(8),
    paddingTop: verticalScale(8),
    backgroundColor: NAVIGATION_THEME.colors.background,
  },
  header: {
    backgroundColor: NAVIGATION_THEME.colors.card,
    elevation: 1,
    shadowOpacity: 0.2,
    height: verticalScale(56),
  },
  headerTitle: {
    fontSize: scale(18),
    fontWeight: '600',
  },
  tabBarLabel: {
    fontSize: scale(12),
    fontWeight: '500',
    marginTop: verticalScale(4),
  },
  tabBarIcon: {
    marginBottom: 0,
  },
  tabBarItem: {
    paddingVertical: verticalScale(4),
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(28),
  },
  indicator: {
    position: 'absolute',
    bottom: verticalScale(-8),
    width: scale(20),
    height: verticalScale(3),
    borderRadius: scale(1.5),
  },
}); 