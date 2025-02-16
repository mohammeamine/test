import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Text } from '../../../src/components/common/Text';
import { useColors, useSpacing } from '../../../src/hooks/useTheme';
import { Icon } from '@roninoss/icons';

type MenuItem = {
  title: string;
  icon: 'folder' | 'newspaper' | 'pencil';
  route: string;
  count: number;
};

export default function AcademicScreen() {
  const colors = useColors();
  const spacing = useSpacing();

  const menuItems: MenuItem[] = [
    { title: 'Departments', icon: 'folder', route: 'departments', count: 8 },
    { title: 'Courses', icon: 'newspaper', route: 'courses', count: 24 },
    { title: 'Grades', icon: 'pencil', route: 'grades', count: 156 },
  ];

  const stats = menuItems.reduce((acc, item) => {
    return {
      ...acc,
      totalCount: (acc.totalCount || 0) + item.count,
      items: [...(acc.items || []), { ...item, percentage: Math.round((item.count / 188) * 100) }]
    };
  }, { totalCount: 0, items: [] } as { totalCount: number, items: (MenuItem & { percentage: number })[] });

  return (
    <View style={[styles.container, { backgroundColor: colors.background, padding: spacing[4] }]}>
      <View style={styles.header}>
        <Text variant="h2">Academic Overview</Text>
        <Text variant="body" style={{ color: colors.textSecondary }}>
          Total Items: {stats.totalCount}
        </Text>
      </View>

      <View style={styles.grid}>
        {stats.items.map((item) => (
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
            onPress={() => router.push(`/(admin)/academic/${item.route}` as any)}
          >
            <Icon name={item.icon} size={32} color={colors.primary} />
            <Text
              variant="h3"
              style={[styles.title, { marginTop: spacing[2] }]}
            >
              {item.title}
            </Text>
            <View style={styles.statsContainer}>
              <Text variant="body" style={{ color: colors.primary }}>
                {item.count}
              </Text>
              <Text variant="caption" style={{ color: colors.textSecondary }}>
                {item.percentage}%
              </Text>
            </View>
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
  header: {
    marginBottom: 24,
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
  statsContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
}); 