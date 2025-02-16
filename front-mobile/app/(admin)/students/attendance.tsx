import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text } from '../../../src/components/common/Text';
import { useColors, useSpacing } from '../../../src/hooks/useTheme';
import { Icon } from '@roninoss/icons';

type AttendanceRecord = {
  id: string;
  date: string;
  student: string;
  status: 'Present' | 'Absent' | 'Late';
  class: string;
};

const mockAttendance: AttendanceRecord[] = [
  { id: '1', date: '2024-03-01', student: 'John Doe', status: 'Present', class: 'Class A' },
  { id: '2', date: '2024-03-01', student: 'Jane Smith', status: 'Late', class: 'Class B' },
  { id: '3', date: '2024-03-01', student: 'Mike Johnson', status: 'Absent', class: 'Class A' },
];

export default function AttendanceScreen() {
  const colors = useColors();
  const spacing = useSpacing();
  const [attendance] = useState(mockAttendance);

  const getStatusColor = (status: AttendanceRecord['status']) => {
    switch (status) {
      case 'Present':
        return colors.primary;
      case 'Absent':
        return 'rgb(239, 68, 68)'; // red
      case 'Late':
        return 'rgb(245, 158, 11)'; // amber
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { padding: spacing[4] }]}>
        <Text variant="h2">Today's Attendance</Text>
        <Text variant="body" style={{ color: colors.textSecondary }}>
          March 1, 2024
        </Text>
      </View>

      <View style={[styles.stats, { padding: spacing[4], gap: spacing[4] }]}>
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
            <Text variant="h3">85%</Text>
            <Text variant="caption" style={{ color: colors.textSecondary }}>
              Present
            </Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
            <Text variant="h3">10%</Text>
            <Text variant="caption" style={{ color: colors.textSecondary }}>
              Absent
            </Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.surface }]}>
            <Text variant="h3">5%</Text>
            <Text variant="caption" style={{ color: colors.textSecondary }}>
              Late
            </Text>
          </View>
        </View>
      </View>

      <FlatList
        data={attendance}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: spacing[4] }}
        ItemSeparatorComponent={() => <View style={{ height: spacing[3] }} />}
        renderItem={({ item }) => (
          <View
            style={[
              styles.attendanceCard,
              { backgroundColor: colors.surface, padding: spacing[4], borderRadius: 8 },
            ]}
          >
            <View style={styles.attendanceInfo}>
              <View>
                <Text variant="h3">{item.student}</Text>
                <Text variant="caption" style={{ color: colors.textSecondary }}>
                  {item.class}
                </Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(item.status) + '20' },
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
          </View>
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
  stats: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  attendanceCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  attendanceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
}); 