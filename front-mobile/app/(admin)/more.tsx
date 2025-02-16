import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Text } from '../../src/components/common/Text';
import { useColors, useSpacing } from '../../src/hooks/useTheme';
import { Icon } from '@roninoss/icons';

export default function MoreScreen() {
  const colors = useColors();
  const spacing = useSpacing();

  const menuSections = [
    {
      title: 'Academic',
      items: [
        { title: 'Departments', icon: 'folder', route: '/departments' },
        { title: 'Courses', icon: 'newspaper', route: '/courses' },
        { title: 'Grades', icon: 'pencil', route: '/grades' },
      ],
    },
    {
      title: 'Users',
      items: [
        { title: 'Students', icon: 'person', route: '/students' },
        { title: 'Teachers', icon: 'person', route: '/teachers' },
        { title: 'Staff', icon: 'person', route: '/staff' },
      ],
    },
    {
      title: 'Administration',
      items: [
        { title: 'Settings', icon: 'cog', route: '/settings' },
        { title: 'Reports', icon: 'newspaper', route: '/reports' },
      ],
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {menuSections.map((section) => (
        <View key={section.title} style={{ marginBottom: spacing[6] }}>
          <Text
            variant="h2"
            style={[styles.sectionTitle, { marginHorizontal: spacing[4], marginVertical: spacing[2] }]}
          >
            {section.title}
          </Text>
          <View style={[styles.menuSection, { backgroundColor: colors.surface }]}>
            {section.items.map((item, index) => (
              <Pressable
                key={item.title}
                style={[
                  styles.menuItem,
                  {
                    borderBottomWidth: index === section.items.length - 1 ? 0 : 1,
                    borderBottomColor: colors.border,
                    padding: spacing[4],
                  },
                ]}
                onPress={() => router.push(item.route as any)}
              >
                <View style={styles.menuItemContent}>
                  <Icon name={item.icon as any} size={24} color={colors.primary} />
                  <Text variant="body" style={{ marginLeft: spacing[3] }}>
                    {item.title}
                  </Text>
                </View>
                <Icon name="chevron-right" size={24} color={colors.textSecondary} />
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
  sectionTitle: {
    fontWeight: 'bold',
  },
  menuSection: {
    borderRadius: 8,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
}); 