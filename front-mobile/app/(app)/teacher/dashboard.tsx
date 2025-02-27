import React from 'react';
import { ScrollView, View, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { Text } from '../../../components/ui/Text';
import { Card } from '../../../components/ui/Card';
import { QuickStats } from '../../../components/dashboard/QuickStats';
import { AttendanceSummaryChart } from '../../../components/charts/AttendanceSummaryChart';
import { TeacherStudentRatioChart } from '../../../components/charts/TeacherStudentRatioChart';
import { RecentActivities } from '../../../components/dashboard/RecentActivities';
import { useResponsiveLayout } from '../../../hooks/useResponsiveLayout';
import { scale, verticalScale } from '../../../utils/responsive';
import { useDashboardData } from '../../../hooks/useDashboardData';
import { Ionicons } from '@expo/vector-icons';

export default function TeacherDashboard() {
  const { data, isLoading, error, refreshData } = useDashboardData('teacher');
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
      class: '12-A',
      subject: 'Mathematics',
      time: '09:00 AM',
      room: 'Room 101',
      students: 35,
      topic: 'Quadratic Equations'
    },
    { 
      id: 2, 
      class: '11-B',
      subject: 'Mathematics',
      time: '11:00 AM',
      room: 'Room 203',
      students: 32,
      topic: 'Trigonometry'
    },
    { 
      id: 3, 
      class: '10-C',
      subject: 'Mathematics',
      time: '02:00 PM',
      room: 'Room 105',
      students: 30,
      topic: 'Algebra'
    },
  ];

  const pendingAssignments = [
    { 
      id: 1, 
      class: '12-A',
      title: 'Chapter 5 Exercises',
      dueDate: '2024-03-20',
      submissions: 28,
      total: 35
    },
    { 
      id: 2, 
      class: '11-B',
      title: 'Mid-Term Test',
      dueDate: '2024-03-22',
      submissions: 25,
      total: 32
    },
    { 
      id: 3, 
      class: '10-C',
      title: 'Practice Problems',
      dueDate: '2024-03-25',
      submissions: 20,
      total: 30
    },
  ];

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refreshData} />
      }
    >
      <View style={styles.header}>
        <Text variant="h1" style={styles.title}>Teacher Dashboard</Text>
        <Text variant="body" style={styles.subtitle}>
          Welcome back! Here's your teaching overview
        </Text>
      </View>

      {isLoading && !data ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
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
                Teacher-Student Ratio
              </Text>
              <TeacherStudentRatioChart data={data?.teacherStudentRatio} />
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
            <RecentActivities role="teacher" />
          </View>

          {/* Today's Classes */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Today's Classes</Text>
            {todayClasses.map((classItem) => (
              <Card key={classItem.id} style={styles.classCard}>
                <View style={styles.classHeader}>
                  <View style={styles.classInfo}>
                    <View style={styles.classNameRow}>
                      <Text style={styles.className}>{classItem.class}</Text>
                      <Text style={styles.classTime}>{classItem.time}</Text>
                    </View>
                    <Text style={styles.classTopic}>{classItem.topic}</Text>
                  </View>
                  <View style={styles.classDetails}>
                    <Text style={styles.classRoom}>
                      <Ionicons name="location-outline" size={14} color="#666" /> {classItem.room}
                    </Text>
                    <Text style={styles.studentCount}>
                      <Ionicons name="people-outline" size={14} color="#666" /> {classItem.students} students
                    </Text>
                  </View>
                </View>
              </Card>
            ))}
          </View>

          {/* Pending Assignments */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pending Assignments</Text>
            {pendingAssignments.map((assignment) => (
              <Card key={assignment.id} style={styles.assignmentCard}>
                <View style={styles.assignmentHeader}>
                  <View>
                    <View style={styles.assignmentTitleRow}>
                      <Text style={styles.assignmentClass}>{assignment.class}</Text>
                      <Text style={styles.assignmentTitle}>{assignment.title}</Text>
                    </View>
                    <Text style={styles.dueDate}>Due: {assignment.dueDate}</Text>
                  </View>
                  <View style={styles.submissionCount}>
                    <Text style={styles.submissionText}>
                      {assignment.submissions}/{assignment.total}
                    </Text>
                    <Text style={styles.submissionLabel}>Submitted</Text>
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
  classNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(4),
  },
  className: {
    fontSize: scale(16),
    fontWeight: '600',
    marginRight: scale(8),
  },
  classTime: {
    fontSize: scale(14),
    color: '#4CAF50',
    fontWeight: '500',
  },
  classTopic: {
    fontSize: scale(14),
    color: '#666',
    marginBottom: verticalScale(2),
  },
  classDetails: {
    alignItems: 'flex-end',
  },
  classRoom: {
    fontSize: scale(14),
    color: '#666',
    marginBottom: verticalScale(4),
  },
  studentCount: {
    fontSize: scale(14),
    color: '#666',
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
  assignmentClass: {
    fontSize: scale(14),
    color: '#4CAF50',
    fontWeight: '500',
    marginRight: scale(8),
  },
  assignmentTitle: {
    fontSize: scale(16),
    fontWeight: '600',
  },
  dueDate: {
    fontSize: scale(14),
    color: '#666',
  },
  submissionCount: {
    alignItems: 'center',
  },
  submissionText: {
    fontSize: scale(16),
    fontWeight: '600',
    color: '#4CAF50',
  },
  submissionLabel: {
    fontSize: scale(12),
    color: '#666',
  },
}); 