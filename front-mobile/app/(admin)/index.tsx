import React from 'react';
import { View, ScrollView, StyleSheet, Pressable } from 'react-native';
import { Text } from '../../src/components/common/Text';
import { useColors, useSpacing } from '../../src/hooks/useTheme';
import { Icon } from '@roninoss/icons';
import { router } from 'expo-router';

type IconName = 'person' | 'newspaper' | 'folder' | 'pencil' | 'clock' | 'clipboard';

const quickStats: Array<{ title: string; count: number; icon: IconName; color: string }> = [
  { title: 'Total Students', count: 1234, icon: 'person', color: 'rgb(59, 130, 246)' },
  { title: 'Total Teachers', count: 56, icon: 'person', color: 'rgb(16, 185, 129)' },
  { title: 'Active Courses', count: 32, icon: 'newspaper', color: 'rgb(245, 158, 11)' },
  { title: 'Departments', count: 8, icon: 'folder', color: 'rgb(99, 102, 241)' },
];

const menuSections: Array<{ title: string; items: Array<{ title: string; icon: IconName; route: string }> }> = [
  {
    title: 'Academic',
    items: [
      { title: 'Departments', icon: 'folder', route: '/academic' },
      { title: 'Courses', icon: 'newspaper', route: '/courses' },
      { title: 'Grades', icon: 'pencil', route: '/grades' },
    ],
  },
  {
    title: 'Users',
    items: [
      { title: 'Students', icon: 'person', route: '/users' },
      { title: 'Teachers', icon: 'person', route: '/teachers' },
      { title: 'Staff', icon: 'person', route: '/staff' },
    ],
  },
  {
    title: 'Monitoring',
    items: [
      { title: 'Schedule', icon: 'clock', route: '/monitoring' },
      { title: 'Attendance', icon: 'clipboard', route: '/attendance' },
    ],
  },
];

export default function AdminDashboard() {
  const colors = useColors();
  const spacing = useSpacing();

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ padding: spacing[4] }}
    >
      <View style={styles.header}>
        <Text variant="h1" style={styles.title}>Dashboard</Text>
        <Text variant="body" style={{ color: colors.textSecondary }}>
          Welcome to the admin dashboard
        </Text>
      </View>

      {/* Quick Stats */}
      <View style={[styles.statsGrid, { gap: spacing[4], marginTop: spacing[6] }]}>
        {quickStats.map((stat) => (
          <View
            key={stat.title}
            style={[
              styles.statCard,
              {
                backgroundColor: colors.surface,
                padding: spacing[4],
                borderRadius: 8,
              },
            ]}
          >
            <View style={[styles.iconContainer, { backgroundColor: stat.color + '20' }]}>
              <Icon name={stat.icon} size={24} color={stat.color} />
            </View>
            <Text variant="h2" style={[styles.statCount, { color: colors.text }]}>
              {stat.count}
            </Text>
            <Text variant="caption" style={{ color: colors.textSecondary }}>
              {stat.title}
            </Text>
          </View>
        ))}
      </View>

      {/* Menu Sections */}
      {menuSections.map((section) => (
        <View key={section.title} style={{ marginTop: spacing[6] }}>
          <Text variant="h2" style={[styles.sectionTitle, { marginBottom: spacing[4] }]}>
            {section.title}
          </Text>
          <View style={[styles.menuGrid, { gap: spacing[4] }]}>
            {section.items.map((item) => (
              <Pressable
                key={item.title}
                style={[
                  styles.menuCard,
                  {
                    backgroundColor: colors.surface,
                    padding: spacing[4],
                    borderRadius: 8,
                  },
                ]}
                onPress={() => router.push(item.route as any)}
              >
                <Icon name={item.icon} size={24} color={colors.primary} />
                <Text
                  variant="body"
                  style={[styles.menuTitle, { marginTop: spacing[2], color: colors.text }]}
                >
                  {item.title}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontWeight: 'bold',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  statCount: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectionTitle: {
    fontWeight: 'bold',
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  menuCard: {
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
  menuTitle: {
    textAlign: 'center',
  },
}); 