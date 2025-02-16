import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TextInput, Pressable } from 'react-native';
import { Text } from '../../../../src/components/common/Text';
import { Button } from '../../../../src/components/common/Button';
import { useColors, useSpacing } from '../../../../src/hooks/useTheme';
import { Icon } from '@roninoss/icons';
import { router } from 'expo-router';

type Course = {
  id: string;
  code: string;
  name: string;
  department: string;
  instructor: string;
  credits: number;
  students: number;
};

const mockCourses: Course[] = [
  { 
    id: '1',
    code: 'CS101',
    name: 'Introduction to Programming',
    department: 'Computer Science',
    instructor: 'Dr. Smith',
    credits: 3,
    students: 45
  },
  { 
    id: '2',
    code: 'MATH201',
    name: 'Calculus I',
    department: 'Mathematics',
    instructor: 'Prof. Johnson',
    credits: 4,
    students: 35
  },
  { 
    id: '3',
    code: 'PHY301',
    name: 'Quantum Mechanics',
    department: 'Physics',
    instructor: 'Dr. Brown',
    credits: 4,
    students: 25
  },
];

export default function CoursesScreen() {
  const colors = useColors();
  const spacing = useSpacing();
  const [searchQuery, setSearchQuery] = useState('');
  const [courses] = useState(mockCourses);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { padding: spacing[4] }]}>
        <View style={[styles.searchBar, { backgroundColor: colors.surface }]}>
          <Icon name="image" size={20} color={colors.textSecondary} />
          <TextInput
            placeholder="Search courses..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={[styles.searchInput, { color: colors.text }]}
            placeholderTextColor={colors.textSecondary}
          />
        </View>
        <Button 
          variant="primary"
          onPress={() => router.push('/academic/courses/add')}
        >
          Add Course
        </Button>
      </View>

      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: spacing[4] }}
        ItemSeparatorComponent={() => <View style={{ height: spacing[3] }} />}
        renderItem={({ item }) => (
          <Pressable>
            <View 
              style={[
                styles.courseCard,
                { 
                  backgroundColor: colors.surface,
                  padding: spacing[4],
                  borderRadius: 8,
                }
              ]}
            >
              <View style={styles.cardHeader}>
                <View>
                  <View style={styles.courseTitle}>
                    <Text variant="h3">{item.name}</Text>
                    <Text 
                      variant="caption" 
                      style={[
                        styles.courseCode,
                        { 
                          backgroundColor: colors.primary + '20',
                          color: colors.primary 
                        }
                      ]}
                    >
                      {item.code}
                    </Text>
                  </View>
                  <Text variant="caption" style={{ color: colors.textSecondary }}>
                    {item.department}
                  </Text>
                </View>
                <Button variant="ghost">
                  Edit
                </Button>
              </View>

              <View style={[styles.stats, { marginTop: spacing[3] }]}>
                <View style={styles.statItem}>
                  <Text variant="caption" style={{ color: colors.textSecondary }}>
                    Instructor
                  </Text>
                  <Text variant="body">{item.instructor}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text variant="caption" style={{ color: colors.textSecondary }}>
                    Credits
                  </Text>
                  <Text variant="body">{item.credits}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text variant="caption" style={{ color: colors.textSecondary }}>
                    Students
                  </Text>
                  <Text variant="body">{item.students}</Text>
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
  courseCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  courseTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  courseCode: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  stats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statItem: {
    flex: 1,
    minWidth: '30%',
  },
}); 