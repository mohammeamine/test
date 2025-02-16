import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Pressable } from 'react-native';
import { Text } from '../../src/components/common/Text';
import { Button } from '../../src/components/common/Button';
import { useColors, useSpacing } from '../../src/hooks/useTheme';
import { Icon } from '@roninoss/icons';

export default function DepartmentsScreen() {
  const colors = useColors();
  const spacing = useSpacing();

  const departments = [
    { 
      id: '1',
      name: 'Computer Science',
      head: 'Dr. Smith',
      faculty: 12,
      students: 150,
      courses: 8
    },
    { 
      id: '2',
      name: 'Mathematics',
      head: 'Prof. Johnson',
      faculty: 8,
      students: 120,
      courses: 6
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { padding: spacing[4] }]}>
        <Button variant="primary">Add Department</Button>
      </View>

      <FlatList
        data={departments}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: spacing[4] }}
        ItemSeparatorComponent={() => <View style={{ height: spacing[3] }} />}
        renderItem={({ item }) => (
          <Pressable>
            <View 
              style={[
                styles.departmentCard,
                { 
                  backgroundColor: colors.surface,
                  padding: spacing[4],
                  borderRadius: 8,
                }
              ]}
            >
              <View style={styles.departmentHeader}>
                <Text variant="h3">{item.name}</Text>
                <Button variant="ghost">
                  Edit
                </Button>
              </View>

              <View style={[styles.stats, { marginTop: spacing[3] }]}>
                <View style={styles.statItem}>
                  <Text variant="caption" style={{ color: colors.textSecondary }}>
                    Head
                  </Text>
                  <Text variant="body">{item.head}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text variant="caption" style={{ color: colors.textSecondary }}>
                    Faculty
                  </Text>
                  <Text variant="body">{item.faculty}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text variant="caption" style={{ color: colors.textSecondary }}>
                    Students
                  </Text>
                  <Text variant="body">{item.students}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text variant="caption" style={{ color: colors.textSecondary }}>
                    Courses
                  </Text>
                  <Text variant="body">{item.courses}</Text>
                </View>
              </View>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  departmentCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  departmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statItem: {
    flex: 1,
    minWidth: '40%',
  },
}); 