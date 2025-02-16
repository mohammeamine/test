import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TextInput, Pressable } from 'react-native';
import { Text } from '../../../src/components/common/Text';
import { Button } from '../../../src/components/common/Button';
import { useColors, useSpacing } from '../../../src/hooks/useTheme';
import { Icon } from '@roninoss/icons';

type Student = {
  id: string;
  name: string;
  class: string;
  grade: string;
  status: 'Active' | 'Inactive';
};

const mockStudents: Student[] = [
  { id: '1', name: 'John Doe', class: 'Class A', grade: '10th', status: 'Active' },
  { id: '2', name: 'Jane Smith', class: 'Class B', grade: '11th', status: 'Active' },
  { id: '3', name: 'Mike Johnson', class: 'Class A', grade: '10th', status: 'Inactive' },
];

export default function StudentsScreen() {
  const colors = useColors();
  const spacing = useSpacing();
  const [searchQuery, setSearchQuery] = useState('');
  const [students] = useState(mockStudents);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { padding: spacing[4] }]}>
        <View style={[styles.searchBar, { backgroundColor: colors.surface }]}>
          <Icon name="search" size={20} color={colors.textSecondary} />
          <TextInput
            placeholder="Search students..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={[styles.searchInput, { color: colors.text }]}
            placeholderTextColor={colors.textSecondary}
          />
        </View>
        <Button variant="primary">Add Student</Button>
      </View>

      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: spacing[4] }}
        ItemSeparatorComponent={() => <View style={{ height: spacing[3] }} />}
        renderItem={({ item }) => (
          <Pressable>
            <View 
              style={[
                styles.studentCard,
                { 
                  backgroundColor: colors.surface,
                  padding: spacing[4],
                  borderRadius: 8,
                }
              ]}
            >
              <View style={styles.studentInfo}>
                <View style={styles.nameSection}>
                  <Text variant="h3">{item.name}</Text>
                  <Text variant="caption" style={{ color: colors.textSecondary }}>
                    {item.class} • {item.grade}
                  </Text>
                </View>
                <View 
                  style={[
                    styles.statusBadge,
                    { 
                      backgroundColor: item.status === 'Active' 
                        ? colors.primary + '20'
                        : colors.textSecondary + '20',
                    }
                  ]}
                >
                  <Text 
                    variant="caption"
                    style={{ 
                      color: item.status === 'Active' 
                        ? colors.primary
                        : colors.textSecondary,
                    }}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>
              <View style={styles.actions}>
                <Button variant="ghost" onPress={() => {}}>
                  View Details
                </Button>
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
  studentCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  studentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameSection: {
    gap: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  actions: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
}); 