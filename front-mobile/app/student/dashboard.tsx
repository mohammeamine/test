import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text } from '../../components/ui/Text';
import { Card } from '../../components/ui/Card';
import { scale, verticalScale } from '../../utils/responsive';

const stats = [
  { title: 'Current Courses', value: '6', icon: '📚' },
  { title: 'Assignments Due', value: '4', icon: '📝' },
  { title: 'Average Grade', value: 'A-', icon: '📊' },
  { title: 'Attendance', value: '98%', icon: '📅' },
];

export default function StudentDashboard() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="h1" style={styles.title}>Student Dashboard</Text>
        <Text variant="body" style={styles.subtitle}>
          Welcome back, Student
        </Text>
      </View>

      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <Card style={styles.cardContent}>
              <Text style={styles.icon}>{stat.icon}</Text>
              <Text variant="h2" style={styles.value}>
                {stat.value}
              </Text>
              <Text variant="body" style={styles.statTitle}>
                {stat.title}
              </Text>
            </Card>
          </View>
        ))}
      </View>

      <Card style={styles.section}>
        <Text variant="h3" style={styles.sectionTitle}>
          Today's Schedule
        </Text>
        <Text variant="body" style={styles.emptyState}>
          No classes scheduled for today
        </Text>
      </Card>

      <Card style={styles.section}>
        <Text variant="h3" style={styles.sectionTitle}>
          Upcoming Assignments
        </Text>
        <Text variant="body" style={styles.emptyState}>
          No upcoming assignments
        </Text>
      </Card>

      <Card style={styles.section}>
        <Text variant="h3" style={styles.sectionTitle}>
          Recent Grades
        </Text>
        <Text variant="body" style={styles.emptyState}>
          No recent grades to display
        </Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: scale(16),
  },
  title: {
    marginBottom: verticalScale(4),
  },
  subtitle: {
    opacity: 0.7,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: scale(8),
  },
  statCard: {
    width: '50%',
    padding: scale(8),
  },
  cardContent: {
    padding: scale(16),
    alignItems: 'center',
  },
  icon: {
    fontSize: scale(24),
    marginBottom: verticalScale(8),
  },
  value: {
    fontSize: scale(24),
    fontWeight: 'bold',
    marginBottom: verticalScale(4),
  },
  statTitle: {
    textAlign: 'center',
    opacity: 0.7,
  },
  section: {
    margin: scale(16),
    padding: scale(16),
  },
  sectionTitle: {
    marginBottom: verticalScale(16),
  },
  emptyState: {
    textAlign: 'center',
    opacity: 0.5,
  },
}); 