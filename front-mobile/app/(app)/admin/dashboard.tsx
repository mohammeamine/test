import React from 'react';
import { ScrollView, View, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { Text } from '../../../components/ui/Text';
import { Card } from '../../../components/ui/Card';
import { QuickStats } from '../../../components/dashboard/QuickStats';
import { RecentActivities } from '../../../components/dashboard/RecentActivities';
import { EnrollmentTrendChart } from '../../../components/charts/EnrollmentTrendChart';
import { TeacherStudentRatioChart } from '../../../components/charts/TeacherStudentRatioChart';
import { AttendanceSummaryChart } from '../../../components/charts/AttendanceSummaryChart';
import { scale, verticalScale } from '../../../utils/responsive';
import { useDashboardData } from '../../../hooks/useDashboardData';

export default function AdminDashboard() {
  const { data, isLoading, error, refreshData } = useDashboardData('admin');

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error loading dashboard data</Text>
        <Text style={styles.errorSubtext}>{error.message}</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refreshData} />
      }
    >
      <View style={styles.header}>
        <Text variant="h1" style={styles.title}>Admin Dashboard</Text>
        <Text variant="body" style={styles.subtitle}>
          Overview of your school's performance and activities
        </Text>
      </View>

      {/* Quick Stats Section */}
      {isLoading && !data ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
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
                Enrollment Trend
              </Text>
              <EnrollmentTrendChart data={data?.enrollmentTrend} />
            </Card>
            
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

          {/* Recent Activities Section */}
          <View style={styles.section}>
            <Text variant="h2" style={styles.sectionTitle}>
              Recent Activities
            </Text>
            <RecentActivities role="admin" />
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
  section: {
    padding: scale(16),
    marginBottom: verticalScale(16),
  },
  sectionTitle: {
    fontSize: scale(18),
    fontWeight: 'bold',
    marginBottom: verticalScale(16),
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
}); 