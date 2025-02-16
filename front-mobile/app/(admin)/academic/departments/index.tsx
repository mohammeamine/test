import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TextInput, Pressable } from 'react-native';
import { Text } from '../../../../src/components/common/Text';
import { Button } from '../../../../src/components/common/Button';
import { useColors, useSpacing } from '../../../../src/hooks/useTheme';
import { Icon } from '@roninoss/icons';
import { router } from 'expo-router';

type Department = {
  id: string;
  name: string;
  head: string;
  faculty: number;
  students: number;
  courses: number;
};

const mockDepartments: Department[] = [
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
  { 
    id: '3',
    name: 'Physics',
    head: 'Dr. Brown',
    faculty: 10,
    students: 90,
    courses: 7
  },
];

export default function DepartmentsScreen() {
  const colors = useColors();
  const spacing = useSpacing();
  const [searchQuery, setSearchQuery] = useState('');
  const [departments] = useState(mockDepartments);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header with Search and Add Button */}
      <View style={[styles.header, { padding: spacing[4] }]}>
        <View style={[styles.searchBar, { backgroundColor: colors.surface }]}>
          <Icon name="image" size={20} color={colors.textSecondary} />
          <TextInput
            placeholder="Search departments..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={[styles.searchInput, { color: colors.text }]}
            placeholderTextColor={colors.textSecondary}
          />
        </View>
        <Button 
          variant="primary"
          onPress={() => router.push({
            pathname: "/(admin)/academic/departments/add"
          })}
        >
          Add Department
        </Button>
      </View>

      {/* Departments List */}
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
              <View style={styles.cardHeader}>
                <Text variant="h3">{item.name}</Text>
                <Button 
                  variant="ghost"
                  onPress={() => router.push({
                    pathname: "/(admin)/academic/departments/edit",
                    params: { id: item.id }
                  })}
                >
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
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  departmentCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
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