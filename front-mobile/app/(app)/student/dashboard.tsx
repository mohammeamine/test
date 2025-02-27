import React from 'react';
import { ScrollView, View, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { Text } from '../../../components/ui/Text';
import { Card } from '../../../components/ui/Card';
import { QuickStats } from '../../../components/dashboard/QuickStats';
import { AttendanceSummaryChart } from '../../../components/charts/AttendanceSummaryChart';
import { EnrollmentTrendChart } from '../../../components/charts/EnrollmentTrendChart';
import { RecentActivities } from '../../../components/dashboard/RecentActivities';
import { useResponsiveLayout } from '../../../hooks/useResponsiveLayout';
import { scale, verticalScale } from '../../../utils/responsive';
import { useDashboardData } from '../../../hooks/useDashboardData';
import { Ionicons } from '@expo/vector-icons';

export default function StudentDashboard() {
  const { data, isLoading, error, refreshData } = useDashboardData('student');
  const { isSmallScreen, getFontSize, getSpacing } = useResponsiveLayout();

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error loading dashboard data</Text>
        <Text style={styles.errorSubtext}>{error.message}</Text>
      </View>
    );
  }

  const todayClasses = [
    {
      id: 1,
      subject: 'Mathematics',
      time: '09:00 AM',
      room: 'Room 101',
      teacher: 'Mr. Johnson',
      topic: 'Quadratic Equations'
    },
    {
      id: 2,
      subject: 'Science',
      time: '11:00 AM',
      room: 'Lab 203',
      teacher: 'Mrs. Smith',
      topic: 'Chemical Reactions'
    },
    {
      id: 3,
      subject: 'English',
      time: '02:00 PM',
      room: 'Room 105',
      teacher: 'Ms. Davis',
      topic: 'Shakespeare'
    }
  ];

  const upcomingAssignments = [
    {
      id: 1,
      subject: 'Mathematics',
      title: 'Chapter 5 Exercises',
      dueDate: '2024-03-20',
      type: 'Homework',
      status: 'pending'
    },
    {
      id: 2,
      subject: 'Science',
      title: 'Lab Report',
      dueDate: '2024-03-22',
      type: 'Report',
      status: 'pending'
    },
    {
      id: 3,
      subject: 'English',
      title: 'Essay',
      dueDate: '2024-03-25',
      type: 'Assignment',
      status: 'pending'
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
        <Text variant="h1" style={styles.title}>Student Dashboard</Text>
        <Text variant="body" style={styles.subtitle}>
          Track your academic progress
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
                Grade Trend
              </Text>
              <EnrollmentTrendChart data={data?.enrollmentTrend} />
            </Card>
            
            <Card style={styles.chartCard}>
              <Text variant="h3" style={styles.chartTitle}>
                Attendance Summary
              </Text>
              <AttendanceSummaryChart data={data?.attendanceSummary} />
            </Card>
          </View>

          {/* Recent Activities */}
          <View style={styles.section}>
            <RecentActivities role="student" />
          </View>

          {/* Today's Classes */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Today's Classes</Text>
            {todayClasses.map((classItem) => (
              <Card key={classItem.id} style={styles.classCard}>
                <View style={styles.classHeader}>
                  <View style={styles.classInfo}>
                    <View style={styles.subjectRow}>
                      <Text style={styles.subject}>{classItem.subject}</Text>
                      <Text style={styles.classTime}>{classItem.time}</Text>
                    </View>
                    <Text style={styles.topic}>{classItem.topic}</Text>
                    <Text style={styles.teacher}>{classItem.teacher}</Text>
                  </View>
                  <View style={styles.classLocation}>
                    <Ionicons name="location-outline" size={14} color="#666" />
                    <Text style={styles.roomText}>{classItem.room}</Text>
                  </View>
                </View>
              </Card>
            ))}
          </View>

          {/* Upcoming Assignments */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Upcoming Assignments</Text>
            {upcomingAssignments.map((assignment) => (
              <Card key={assignment.id} style={styles.assignmentCard}>
                <View style={styles.assignmentHeader}>
                  <View>
                    <View style={styles.assignmentTitleRow}>
                      <Text style={styles.assignmentSubject}>{assignment.subject}</Text>
                      <Text style={styles.assignmentType}>{assignment.type}</Text>
                    </View>
                    <Text style={styles.assignmentTitle}>{assignment.title}</Text>
                  </View>
                  <View style={styles.dueDate}>
                    <Ionicons name="calendar-outline" size={14} color="#666" />
                    <Text style={styles.dueDateText}>Due: {assignment.dueDate}</Text>
                  </View>
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
  classCard: {
    padding: scale(12),
    marginBottom: verticalScale(8),
  },
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  classInfo: {
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
  classTime: {
    fontSize: scale(14),
    color: '#FF9800',
    fontWeight: '500',
  },
  topic: {
    fontSize: scale(14),
    color: '#666',
    marginBottom: verticalScale(2),
  },
  teacher: {
    fontSize: scale(14),
    color: '#666',
  },
  classLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roomText: {
    fontSize: scale(14),
    color: '#666',
    marginLeft: scale(4),
  },
  assignmentCard: {
    padding: scale(12),
    marginBottom: verticalScale(8),
  },
  assignmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  assignmentTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(4),
  },
  assignmentSubject: {
    fontSize: scale(14),
    color: '#FF9800',
    fontWeight: '500',
    marginRight: scale(8),
  },
  assignmentType: {
    fontSize: scale(12),
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(2),
    borderRadius: 12,
  },
  assignmentTitle: {
    fontSize: scale(16),
    fontWeight: '600',
  },
  dueDate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dueDateText: {
    fontSize: scale(14),
    color: '#666',
    marginLeft: scale(4),
  },
}); 