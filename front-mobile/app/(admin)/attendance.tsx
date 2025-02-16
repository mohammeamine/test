import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Pressable } from 'react-native';
import { Text } from '../../src/components/common/Text';
import { Button } from '../../src/components/common/Button';
import { useColors, useSpacing } from '../../src/hooks/useTheme';
import { Icon } from '@roninoss/icons';

export default function AttendanceScreen() {
  const colors = useColors();
  const spacing = useSpacing();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const classes = [
    {
      id: '1',
      name: 'Mathematics 101',
      time: '09:00 AM',
      totalStudents: 30,
      presentStudents: 28,
      teacher: 'Dr. Smith',
    },
    {
      id: '2',
      name: 'Physics Advanced',
      time: '11:00 AM',
      totalStudents: 25,
      presentStudents: 23,
      teacher: 'Prof. Johnson',
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { padding: spacing[4] }]}>
        <Text variant="h2">Today's Attendance</Text>
        <Button variant="primary">Take Attendance</Button>
      </View>

      <FlatList
        data={classes}
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
                },
              ]}
            >
              <View style={styles.cardHeader}>
                <Text variant="h3">{item.name}</Text>
                <Text variant="caption" style={{ color: colors.textSecondary }}>
                  {item.time}
                </Text>
              </View>

              <View style={[styles.cardContent, { marginTop: spacing[3] }]}>
                <View style={styles.infoRow}>
                  <Icon name="person" size={16} color={colors.textSecondary} />
                  <Text variant="body" style={{ color: colors.textSecondary }}>
                    {item.teacher}
                  </Text>
                </View>

                <View style={styles.attendanceStats}>
                  <View style={styles.statItem}>
                    <Text variant="h4">{item.presentStudents}</Text>
                    <Text variant="caption" style={{ color: colors.textSecondary }}>
                      Present
                    </Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text variant="h4">{item.totalStudents - item.presentStudents}</Text>
                    <Text variant="caption" style={{ color: colors.textSecondary }}>
                      Absent
                    </Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text variant="h4">{Math.round((item.presentStudents / item.totalStudents) * 100)}%</Text>
                    <Text variant="caption" style={{ color: colors.textSecondary }}>
                      Attendance
                    </Text>
                  </View>
                </View>

                <Button variant="ghost">View Details</Button>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
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
    alignItems: 'center',
  },
  cardContent: {
    gap: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  attendanceStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  statItem: {
    alignItems: 'center',
  },
}); 