import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TextInput, Pressable } from 'react-native';
import { Text } from '../../../src/components/common/Text';
import { Button } from '../../../src/components/common/Button';
import { useColors, useSpacing } from '../../../src/hooks/useTheme';
import { Icon } from '@roninoss/icons';

type StudentGrade = {
  id: string;
  student: string;
  course: string;
  grade: string;
  semester: string;
  date: string;
};

const mockGrades: StudentGrade[] = [
  { 
    id: '1',
    student: 'John Doe',
    course: 'Introduction to Programming',
    grade: 'A',
    semester: 'Fall 2023',
    date: '2023-12-15'
  },
  { 
    id: '2',
    student: 'Jane Smith',
    course: 'Calculus I',
    grade: 'B+',
    semester: 'Fall 2023',
    date: '2023-12-15'
  },
  { 
    id: '3',
    student: 'Mike Johnson',
    course: 'Quantum Mechanics',
    grade: 'A-',
    semester: 'Fall 2023',
    date: '2023-12-15'
  },
];

export default function StudentGradesScreen() {
  const colors = useColors();
  const spacing = useSpacing();
  const [searchQuery, setSearchQuery] = useState('');
  const [grades] = useState(mockGrades);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { padding: spacing[4] }]}>
        <View style={[styles.searchBar, { backgroundColor: colors.surface }]}>
          <Icon name="image" size={20} color={colors.textSecondary} />
          <TextInput
            placeholder="Search grades..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={[styles.searchInput, { color: colors.text }]}
            placeholderTextColor={colors.textSecondary}
          />
        </View>
      </View>

      <FlatList
        data={grades}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: spacing[4] }}
        ItemSeparatorComponent={() => <View style={{ height: spacing[3] }} />}
        renderItem={({ item }) => (
          <Pressable>
            <View 
              style={[
                styles.gradeCard,
                { 
                  backgroundColor: colors.surface,
                  padding: spacing[4],
                  borderRadius: 8,
                }
              ]}
            >
              <View style={styles.cardHeader}>
                <View>
                  <Text variant="h3">{item.student}</Text>
                  <Text variant="caption" style={{ color: colors.textSecondary }}>
                    {item.course}
                  </Text>
                </View>
                <View 
                  style={[
                    styles.gradeBadge,
                    { backgroundColor: colors.primary + '20' }
                  ]}
                >
                  <Text 
                    variant="h3"
                    style={{ color: colors.primary }}
                  >
                    {item.grade}
                  </Text>
                </View>
              </View>

              <View style={[styles.footer, { marginTop: spacing[3] }]}>
                <Text variant="caption" style={{ color: colors.textSecondary }}>
                  {item.semester}
                </Text>
                <Text variant="caption" style={{ color: colors.textSecondary }}>
                  {item.date}
                </Text>
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
  gradeCard: {
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
  gradeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    minWidth: 40,
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}); 