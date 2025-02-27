import React from 'react';
import { ScrollView, View, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { Text } from '../../../components/ui/Text';
import { Card } from '../../../components/ui/Card';
import { QuickStats } from '../../../components/dashboard/QuickStats';
import { AttendanceSummaryChart } from '../../../components/charts/AttendanceSummaryChart';
import { RecentActivities } from '../../../components/dashboard/RecentActivities';
import { useResponsiveLayout } from '../../../hooks/useResponsiveLayout';
import { scale, verticalScale } from '../../../utils/responsive';
import { useDashboardData } from '../../../hooks/useDashboardData';
import { Ionicons } from '@expo/vector-icons';

export default function ParentDashboard() {
  const { data, isLoading, error, refreshData } = useDashboardData('parent');
  const { isSmallScreen, getFontSize, getSpacing } = useResponsiveLayout();

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error loading dashboard data</Text>
        <Text style={styles.errorSubtext}>{error.message}</Text>
      </View>
    );
  }

  const recentGrades = [
    {
      id: 1,
      subject: 'Mathematics',
      grade: 'A',
      date: '2024-03-15',
      type: 'Quiz',
      teacher: 'Mr. Johnson'
    },
    {
      id: 2,
      subject: 'Science',
      grade: 'B+',
      date: '2024-03-14',
      type: 'Assignment',
      teacher: 'Mrs. Smith'
    },
    {
      id: 3,
      subject: 'English',
      grade: 'A-',
      date: '2024-03-13',
      type: 'Test',
      teacher: 'Ms. Davis'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Parent-Teacher Conference',
      date: '2024-03-20',
      time: '03:00 PM',
      location: 'Room 201',
      type: 'Meeting'
    },
    {
      id: 2,
      title: 'Science Fair',
      date: '2024-03-25',
      time: '09:00 AM',
      location: 'School Hall',
      type: 'Event'
    },
    {
      id: 3,
      title: 'Sports Day',
      date: '2024-03-28',
      time: '10:00 AM',
      location: 'School Ground',
      type: 'Event'
    }
  ];

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refreshData} />
      }
    >
      <View style={styles.header}>
        <Text variant="h1" style={styles.title}>Parent Dashboard</Text>
        <Text variant="body" style={styles.subtitle}>
          Monitor your child's academic progress
        </Text>
      </View>

      {isLoading && !data ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF9800" />
        </View>
      ) : (
        <>
          <QuickStats data={data?.quickStats} />

          {/* Charts Section */}
          <View style={styles.section}>
            <Text variant="h2" style={styles.sectionTitle}>
              Key Metrics
            </Text>
            <Card style={styles.chartCard}>
              <Text variant="h3" style={styles.chartTitle}>
                Attendance Summary
              </Text>
              <AttendanceSummaryChart data={data?.attendanceSummary} />
            </Card>
          </View>

          {/* Recent Activities */}
          <View style={styles.section}>
            <RecentActivities role="parent" />
          </View>

          {/* Recent Grades */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Grades</Text>
            {recentGrades.map((grade) => (
              <Card key={grade.id} style={styles.gradeCard}>
                <View style={styles.gradeHeader}>
                  <View style={styles.gradeInfo}>
                    <View style={styles.subjectRow}>
                      <Text style={styles.subject}>{grade.subject}</Text>
                      <Text style={styles.gradeType}>{grade.type}</Text>
                    </View>
                    <Text style={styles.teacher}>{grade.teacher}</Text>
                  </View>
                  <View style={styles.gradeValue}>
                    <Text style={[styles.grade, { color: '#FF9800' }]}>{grade.grade}</Text>
                    <Text style={styles.date}>{grade.date}</Text>
                  </View>
                </View>
              </Card>
            ))}
          </View>

          {/* Upcoming Events */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Upcoming Events</Text>
            {upcomingEvents.map((event) => (
              <Card key={event.id} style={styles.eventCard}>
                <View style={styles.eventHeader}>
                  <View>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <View style={styles.eventDetails}>
                      <View style={styles.eventTime}>
                        <Ionicons name="calendar-outline" size={14} color="#666" />
                        <Text style={styles.eventTimeText}>{event.date}</Text>
                      </View>
                      <View style={styles.eventTime}>
                        <Ionicons name="time-outline" size={14} color="#666" />
                        <Text style={styles.eventTimeText}>{event.time}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.eventLocation}>
                    <Ionicons name="location-outline" size={14} color="#666" />
                    <Text style={styles.locationText}>{event.location}</Text>
                  </View>
                </View>
                <View style={styles.eventTypeContainer}>
                  <Text style={styles.eventType}>{event.type}</Text>
                </View>
              </Card>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(16),
  },
  loadingContainer: {
    padding: scale(32),
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: scale(16),
    paddingTop: verticalScale(20),
  },
  title: {
    fontSize: scale(24),
    fontWeight: 'bold',
    marginBottom: verticalScale(4),
  },
  subtitle: {
    fontSize: scale(14),
    color: '#666',
    marginBottom: verticalScale(16),
  },
  errorText: {
    fontSize: scale(18),
    fontWeight: 'bold',
    color: '#f44336',
    marginBottom: verticalScale(8),
  },
  errorSubtext: {
    fontSize: scale(14),
    color: '#666',
    textAlign: 'center',
  },
  section: {
    padding: scale(16),
    marginBottom: verticalScale(8),
  },
  sectionTitle: {
    fontSize: scale(18),
    fontWeight: 'bold',
    marginBottom: verticalScale(12),
  },
  chartCard: {
    padding: scale(16),
    marginBottom: verticalScale(16),
  },
  chartTitle: {
    fontSize: scale(16),
    fontWeight: '600',
    marginBottom: verticalScale(12),
  },
  gradeCard: {
    padding: scale(12),
    marginBottom: verticalScale(8),
  },
  gradeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  gradeInfo: {
    flex: 1,
  },
  subjectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(4),
  },
  subject: {
    fontSize: scale(16),
    fontWeight: '600',
    marginRight: scale(8),
  },
  gradeType: {
    fontSize: scale(12),
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(2),
    borderRadius: 12,
  },
  teacher: {
    fontSize: scale(14),
    color: '#666',
  },
  gradeValue: {
    alignItems: 'flex-end',
  },
  grade: {
    fontSize: scale(20),
    fontWeight: 'bold',
    marginBottom: verticalScale(2),
  },
  date: {
    fontSize: scale(12),
    color: '#666',
  },
  eventCard: {
    padding: scale(12),
    marginBottom: verticalScale(8),
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: verticalScale(8),
  },
  eventTitle: {
    fontSize: scale(16),
    fontWeight: '600',
    marginBottom: verticalScale(4),
  },
  eventDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: scale(16),
  },
  eventTimeText: {
    fontSize: scale(14),
    color: '#666',
    marginLeft: scale(4),
  },
  eventLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: scale(14),
    color: '#666',
    marginLeft: scale(4),
  },
  eventTypeContainer: {
    alignSelf: 'flex-start',
  },
  eventType: {
    fontSize: scale(12),
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(2),
    borderRadius: 12,
  },
}); 