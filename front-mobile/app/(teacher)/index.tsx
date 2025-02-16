import React from 'react';
import { View, ScrollView, StyleSheet, Pressable } from 'react-native';
import { Text } from '../../src/components/common/Text';
import { useColors, useSpacing } from '../../src/hooks/useTheme';
import { Icon } from '@roninoss/icons';
import { router } from 'expo-router';

type QuickStat = {
  title: string;
  value: number;
  icon: 'person' | 'newspaper' | 'clipboard' | 'pencil';
  color: string;
};

type UpcomingClass = {
  id: string;
  course: string;
  time: string;
  room: string;
  students: number;
};

const quickStats: QuickStat[] = [
  { title: 'Total Students', value: 120, icon: 'person', color: 'rgb(59, 130, 246)' },
  { title: 'Active Courses', value: 4, icon: 'newspaper', color: 'rgb(16, 185, 129)' },
  { title: 'Today\'s Classes', value: 3, icon: 'clipboard', color: 'rgb(245, 158, 11)' },
  { title: 'Pending Grades', value: 25, icon: 'pencil', color: 'rgb(239, 68, 68)' },
];

const upcomingClasses: UpcomingClass[] = [
  { id: '1', course: 'Introduction to Programming', time: '09:00 AM', room: 'Room 101', students: 35 },
  { id: '2', course: 'Data Structures', time: '11:00 AM', room: 'Room 203', students: 30 },
  { id: '3', course: 'Web Development', time: '02:00 PM', room: 'Lab 2', students: 25 },
];

export default function TeacherDashboard() {
  const colors = useColors();
  const spacing = useSpacing();

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ padding: spacing[4] }}
    >
      <View style={styles.header}>
        <Text variant="h1">Welcome Back</Text>
        <Text variant="body" style={{ color: colors.textSecondary }}>
          Dr. Smith
        </Text>
      </View>

      <View style={[styles.statsGrid, { gap: spacing[4], marginTop: spacing[6] }]}>
        {quickStats.map((stat) => (
          <View
            key={stat.title}
            style={[
              styles.statCard,
              {
                backgroundColor: colors.surface,
                padding: spacing[4],
                borderRadius: 8,
              },
            ]}
          >
            <View style={[styles.iconContainer, { backgroundColor: stat.color + '20' }]}>
              <Icon name={stat.icon} size={24} color={stat.color} />
            </View>
            <Text variant="h2" style={[styles.statValue, { color: colors.text }]}>
              {stat.value}
            </Text>
            <Text variant="caption" style={{ color: colors.textSecondary }}>
              {stat.title}
            </Text>
          </View>
        ))}
      </View>

      <View style={{ marginTop: spacing[6] }}>
        <View style={styles.sectionHeader}>
          <Text variant="h2">Today's Classes</Text>
          <Pressable onPress={() => router.push('/teacher/classes')}>
            <Text variant="body" style={{ color: colors.primary }}>
              View All
            </Text>
          </Pressable>
        </View>

        <View style={[styles.classesGrid, { gap: spacing[4] }]}>
          {upcomingClasses.map((item) => (
            <Pressable key={item.id}>
              <View
                style={[
                  styles.classCard,
                  {
                    backgroundColor: colors.surface,
                    padding: spacing[4],
                    borderRadius: 8,
                  },
                ]}
              >
                <Text variant="h3">{item.course}</Text>
                
                <View style={[styles.classDetails, { marginTop: spacing[2] }]}>
                  <View style={styles.detailRow}>
                    <Icon name="clock" size={16} color={colors.textSecondary} />
                    <Text variant="caption" style={{ color: colors.textSecondary }}>
                      {item.time}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Icon name="map" size={16} color={colors.textSecondary} />
                    <Text variant="caption" style={{ color: colors.textSecondary }}>
                      {item.room}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Icon name="person" size={16} color={colors.textSecondary} />
                    <Text variant="caption" style={{ color: colors.textSecondary }}>
                      {item.students} Students
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  classesGrid: {
    flexDirection: 'column',
  },
  classCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  classDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
}); 