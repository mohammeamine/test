import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from '../../../components/navigation/DrawerContent';
import { NAVIGATION_GROUPS, NAVIGATION_THEME } from '../../../navigation/constants';
import { usePathname } from 'expo-router';
import { Platform, useWindowDimensions } from 'react-native';
import { HeaderBar } from '../../../components/navigation/HeaderBar';

// Import screen components
import Dashboard from './dashboard';
import Children from './children';
import Profile from './profile';

const Drawer = createDrawerNavigator();

// Screen component mapping
const SCREEN_COMPONENTS: Record<string, React.ComponentType<any>> = {
  dashboard: Dashboard,
  children: Children,
  profile: Profile,
};

export default function ParentLayout() {
  const pathname = usePathname();
  const { width } = useWindowDimensions();
  const routes = NAVIGATION_GROUPS.parent[0].routes;
  
  // Determine if we should use permanent drawer based on screen width
  const isPermanentDrawer = width >= 1024;
  
  return (
    <Drawer.Navigator
      screenOptions={({ route }) => ({
        header: () => (
          <HeaderBar 
            title={SCREEN_COMPONENTS[route.name].name || route.name}
            showMenuButton={!isPermanentDrawer}
          />
        ),
        drawerType: isPermanentDrawer ? 'permanent' : 'front',
        drawerStyle: {
          width: Math.min(width * 0.7, 300),
          backgroundColor: NAVIGATION_THEME.colors.surface,
          borderRightColor: NAVIGATION_THEME.colors.border,
          borderRightWidth: 1,
        },
        swipeEnabled: Platform.OS === 'ios',
        swipeEdgeWidth: 100,
        drawerItemStyle: {
          backgroundColor: 'transparent',
        },
      })}
      drawerContent={(props) => (
        <DrawerContent
          role="parent"
          groups={NAVIGATION_GROUPS.parent}
          activeRoute={pathname.split('/').pop()}
          onClose={props.navigation.closeDrawer}
        />
      )}
    >
      {routes.map((route) => (
        <Drawer.Screen
          key={route.path}
          name={route.path}
          component={SCREEN_COMPONENTS[route.path]}
          options={{
            title: route.name,
            drawerItemStyle: { display: 'none' },
          }}
        />
      ))}
    </Drawer.Navigator>
  );
} 