import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Text } from '../../../src/components/common/Text';
import { useColors, useSpacing } from '../../../src/hooks/useTheme';
import { Icon } from '@roninoss/icons';

export default function MonitoringScreen() {
  const colors = useColors();
  const spacing = useSpacing();

  const menuItems = [
    { title: 'Schedule', icon: 'clock' as const, route: './schedule' },
    { title: 'Attendance', icon: 'clipboard' as const, route: './attendance' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background, padding: spacing[4] }]}>
      <View style={styles.grid}>
        {menuItems.map((item) => (
          <Pressable
            key={item.title}
            style={[
              styles.card,
              {
                backgroundColor: colors.surface,
                padding: spacing[4],
                borderRadius: 8,
              },
            ]}
            onPress={() => router.push(`/(admin)/monitoring/${item.route}` as any)}
          >
            <Icon name={item.icon} size={32} color={colors.primary} />
            <Text
              variant="h3"
              style={[styles.title, { marginTop: spacing[2] }]}
            >
              {item.title}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  card: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    textAlign: 'center',
  },
}); 