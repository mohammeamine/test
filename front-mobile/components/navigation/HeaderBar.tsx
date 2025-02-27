import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '../ui/Text';
import { Ionicons } from '@expo/vector-icons';
import { NAVIGATION_THEME } from '../../navigation/constants';
import { scale, verticalScale } from '../../utils/responsive';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

interface HeaderBarProps {
  title: string;
  showMenuButton?: boolean;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({ 
  title,
  showMenuButton = true,
}) => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <View style={styles.container}>
      {showMenuButton && (
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.menuButton}
        >
          <Ionicons 
            name="menu-outline" 
            size={28} 
            color={NAVIGATION_THEME.colors.onSurface} 
          />
        </TouchableOpacity>
      )}
      <Text variant="h2" style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: verticalScale(56),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    backgroundColor: NAVIGATION_THEME.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: NAVIGATION_THEME.colors.border,
  },
  menuButton: {
    width: scale(40),
    height: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(8),
  },
  title: {
    flex: 1,
    color: NAVIGATION_THEME.colors.onSurface,
  },
}); 