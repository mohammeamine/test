import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TextInput, Pressable } from 'react-native';
import { Text } from '../../../../src/components/common/Text';
import { Button } from '../../../../src/components/common/Button';
import { useColors, useSpacing } from '../../../../src/hooks/useTheme';
import { Icon } from '@roninoss/icons';
import { router } from 'expo-router';

type AttendanceRecord = {
  id: string;
  course: string;
  instructor: string;
  date: string;
  time: string;
  totalStudents: number;
  presentStudents: number;
  status: 'Ongoing' | 'Completed' | 'Pending';
};

const mockAttendance: AttendanceRecord[] = [
  { 
    id: '1',
    course: 'Introduction to Programming',
    instructor: 'Dr. Smith',
    date: '2024-03-01',
    time: '09:00 AM',
    totalStudents: 30,
    presentStudents: 28,
    status: 'Completed'
  },
  { 
    id: '2',
    course: 'Calculus I',
    instructor: 'Prof. Johnson',
    date: '2024-03-01',
    time: '11:00 AM',
    totalStudents: 25,
    presentStudents: 23,
    status: 'Ongoing'
  },
  { 
    id: '3',
    course: 'Physics Lab',
    instructor: 'Dr. Brown',
    date: '2024-03-01',
    time: '02:00 PM',
    totalStudents: 20,
    presentStudents: 0,
    status: 'Pending'
  },
];

export default function AttendanceScreen() {
  const colors = useColors();
  const spacing = useSpacing();
  const [searchQuery, setSearchQuery] = useState('');
  const [attendance] = useState(mockAttendance);

  const getStatusColor = (status: AttendanceRecord['status']) => {
    switch (status) {
      case 'Completed':
        return colors.primary;
      case 'Ongoing':
        return 'rgb(245, 158, 11)';
      case 'Pending':
        return 'rgb(156, 163, 175)';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { padding: spacing[4] }]}>
        <View style={[styles.searchBar, { backgroundColor: colors.surface }]}>
          <Icon name="image" size={20} color={colors.textSecondary} />
          <TextInput
            placeholder="Search attendance..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={[styles.searchInput, { color: colors.text }]}
            placeholderTextColor={colors.textSecondary}
          />
        </View>
        <Button 
          variant="primary"
          onPress={() => router.push("./take")}
        >
          Take Attendance
        </Button>
      </View>

      <FlatList
        data={attendance}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: spacing[4] }}
        ItemSeparatorComponent={() => <View style={{ height: spacing[3] }} />}
        renderItem={({ item }) => (
          <Pressable>
            <View 
              style={[
                styles.attendanceCard,
                { 
                  backgroundColor: colors.surface,
                  padding: spacing[4],
                  borderRadius: 8,
                }
              ]}
            >
              <View style={styles.cardHeader}>
                <View>
                  <Text variant="h3">{item.course}</Text>
                  <Text variant="caption" style={{ color: colors.textSecondary }}>
                    {item.instructor}
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

              <View style={[styles.details, { marginTop: spacing[3] }]}>
                <View style={styles.detailRow}>
                  <Icon name="clock" size={16} color={colors.textSecondary} />
                  <Text variant="caption" style={{ color: colors.textSecondary }}>
                    {item.date}, {item.time}
                  </Text>
                </View>
              </View>

              <View style={[styles.stats, { marginTop: spacing[3] }]}>
                <View style={styles.statItem}>
                  <Text variant="h3">{item.presentStudents}</Text>
                  <Text variant="caption" style={{ color: colors.textSecondary }}>
                    Present
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <Text variant="h3">{item.totalStudents - item.presentStudents}</Text>
                  <Text variant="caption" style={{ color: colors.textSecondary }}>
                    Absent
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <Text variant="h3">
                    {Math.round((item.presentStudents / item.totalStudents) * 100)}%
                  </Text>
                  <Text variant="caption" style={{ color: colors.textSecondary }}>
                    Attendance
                  </Text>
                </View>
              </View>

              <View style={[styles.footer, { marginTop: spacing[3] }]}>
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
  attendanceCard: {
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
  details: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    paddingTop: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    paddingTop: 12,
  },
}); 