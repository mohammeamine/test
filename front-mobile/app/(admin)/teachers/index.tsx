import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TextInput, Pressable } from 'react-native';
import { Text } from '../../../src/components/common/Text';
import { Button } from '../../../src/components/common/Button';
import { useColors, useSpacing } from '../../../src/hooks/useTheme';
import { Icon } from '@roninoss/icons';
import { router } from 'expo-router';

type Teacher = {
  id: string;
  name: string;
  department: string;
  email: string;
  phone: string;
  courses: number;
  status: 'Active' | 'On Leave' | 'Inactive';
};

const mockTeachers: Teacher[] = [
  { 
    id: '1',
    name: 'Dr. John Smith',
    department: 'Computer Science',
    email: 'john.smith@example.com',
    phone: '+1 234-567-8901',
    courses: 3,
    status: 'Active'
  },
  { 
    id: '2',
    name: 'Prof. Sarah Johnson',
    department: 'Mathematics',
    email: 'sarah.johnson@example.com',
    phone: '+1 234-567-8902',
    courses: 4,
    status: 'Active'
  },
  { 
    id: '3',
    name: 'Dr. Michael Brown',
    department: 'Physics',
    email: 'michael.brown@example.com',
    phone: '+1 234-567-8903',
    courses: 2,
    status: 'On Leave'
  },
];

export default function TeachersScreen() {
  const colors = useColors();
  const spacing = useSpacing();
  const [searchQuery, setSearchQuery] = useState('');
  const [teachers] = useState(mockTeachers);

  const getStatusColor = (status: Teacher['status']) => {
    switch (status) {
      case 'Active':
        return colors.primary;
      case 'On Leave':
        return 'rgb(245, 158, 11)';
      case 'Inactive':
        return 'rgb(239, 68, 68)';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { padding: spacing[4] }]}>
        <View style={[styles.searchBar, { backgroundColor: colors.surface }]}>
          <Icon name="image" size={20} color={colors.textSecondary} />
          <TextInput
            placeholder="Search teachers..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={[styles.searchInput, { color: colors.text }]}
            placeholderTextColor={colors.textSecondary}
          />
        </View>
        <Button 
          variant="primary"
          onPress={() => router.push('/teachers/add')}
        >
          Add Teacher
        </Button>
      </View>

      <FlatList
        data={teachers}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: spacing[4] }}
        ItemSeparatorComponent={() => <View style={{ height: spacing[3] }} />}
        renderItem={({ item }) => (
          <Pressable>
            <View 
              style={[
                styles.teacherCard,
                { 
                  backgroundColor: colors.surface,
                  padding: spacing[4],
                  borderRadius: 8,
                }
              ]}
            >
              <View style={styles.cardHeader}>
                <View>
                  <Text variant="h3">{item.name}</Text>
                  <Text variant="caption" style={{ color: colors.textSecondary }}>
                    {item.department}
                  </Text>
                </View>
                <View 
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(item.status) + '20' }
                  ]}
                >
                  <Text 
                    variant="caption"
                    style={{ color: getStatusColor(item.status) }}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>

              <View style={[styles.contactInfo, { marginTop: spacing[3] }]}>
                <Text variant="caption" style={{ color: colors.textSecondary }}>
                  {item.email}
                </Text>
                <Text variant="caption" style={{ color: colors.textSecondary }}>
                  {item.phone}
                </Text>
              </View>

              <View style={[styles.footer, { marginTop: spacing[3] }]}>
                <Text variant="caption" style={{ color: colors.textSecondary }}>
                  {item.courses} Courses
                </Text>
                <Button variant="ghost">
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
  teacherCard: {
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
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  contactInfo: {
    gap: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    paddingTop: 12,
  },
}); 