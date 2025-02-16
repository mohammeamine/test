import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Icon, IconProps } from '@roninoss/icons';
import { useColors } from '../../hooks/useTheme';

type IconButtonProps = {
  icon: IconProps['name'];
  onPress?: () => void;
  color?: string;
  size?: number;
  variant?: 'primary' | 'secondary' | 'ghost';
};

export function IconButton({ 
  icon, 
  onPress, 
  color,
  size = 20,
  variant = 'ghost'
}: IconButtonProps) {
  const colors = useColors();
  
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        variant === 'ghost' && { backgroundColor: 'transparent' }
      ]}
    >
      <Icon 
        name={icon} 
        size={size} 
        color={color || colors.primary} 
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
}); 