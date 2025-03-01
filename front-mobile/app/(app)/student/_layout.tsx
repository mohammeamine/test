import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from '../../../components/navigation/DrawerContent';
import { NAVIGATION_GROUPS } from '../../../navigation/constants';
import { usePathname } from 'expo-router';
import { Platform, useWindowDimensions, View, StyleSheet } from 'react-native';
import { HeaderBar } from '../../../components/navigation/HeaderBar';
import { COLORS, SPACING, SHADOWS } from '../../../theme';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Import screen components
import Dashboard from './dashboard';
import Courses from './courses';
import Documents from './documents';
import Payments from './payments';
import PaymentMethods from './payment-methods';
import Profile from './profile';
import Assignments from './assignments';
import Materials from './materials';
import Messages from './messages';

const Drawer = createDrawerNavigator();

// Screen component mapping
const SCREEN_COMPONENTS: Record<string, React.ComponentType<any>> = {
  dashboard: Dashboard,
  courses: Courses,
  documents: Documents,
  payments: Payments,
  'payment-methods': PaymentMethods,
  profile: Profile,
  assignments: Assignments,
  materials: Materials,
  messages: Messages,
};

export default function StudentLayout() {
  const pathname = usePathname();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const allRoutes = NAVIGATION_GROUPS.student[0].routes;
  
  // Determine if we should use permanent drawer based on screen width
  const isPermanentDrawer = width >= 1024;
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="auto" />
      <Drawer.Navigator
        screenOptions={({ route }) => ({
          header: () => {
            const routeConfig = allRoutes.find(r => r.path === route.name);
            return (
              <HeaderBar 
                title={routeConfig?.name || route.name} 
                showMenuButton={!isPermanentDrawer}
              />
            );
          },
          drawerType: isPermanentDrawer ? 'permanent' : 'slide',
          drawerStyle: {
            width: Math.min(width * 0.7, 300),
            backgroundColor: COLORS.background.light,
            borderRightColor: COLORS.grey[200],
            borderRightWidth: 1,
            ...(!isPermanentDrawer && SHADOWS.lg),
          },
          swipeEnabled: Platform.OS === 'ios',
          swipeEdgeWidth: 50,
          drawerItemStyle: {
            backgroundColor: 'transparent',
            borderRadius: 8,
            marginHorizontal: SPACING.xs,
          },
          overlayColor: 'rgba(0, 0, 0, 0.5)',
          sceneContainerStyle: {
            backgroundColor: COLORS.background.light,
          },
        })}
        drawerContent={(props) => (
          <DrawerContent
            role="student"
            groups={NAVIGATION_GROUPS.student}
            activeRoute={pathname.split('/').pop() || ''}
            onClose={props.navigation.closeDrawer}
          />
        )}
      >
        {allRoutes.map((route) => (
          <Drawer.Screen
            key={route.path}
            name={route.path}
            component={SCREEN_COMPONENTS[route.path]}
            options={{
              title: route.name,
            }}
          />
        ))}
      </Drawer.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.light,
  },
}); 