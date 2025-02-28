import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, ActivityIndicator, RefreshControl, TouchableOpacity, TextInput } from 'react-native';
import { Text } from '../../../components/ui/Text';
import { Card } from '../../../components/ui/Card';
import { QuickStats } from '../../../components/dashboard/QuickStats';
import { RecentActivities } from '../../../components/dashboard/RecentActivities';
import { EnrollmentTrendChart } from '../../../components/charts/EnrollmentTrendChart';
import { TeacherStudentRatioChart } from '../../../components/charts/TeacherStudentRatioChart';
import { AttendanceSummaryChart } from '../../../components/charts/AttendanceSummaryChart';
import { scale, verticalScale } from '../../../utils/responsive';
import { useDashboardData } from '../../../hooks/useDashboardData';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Route } from 'expo-router';

export default function AdminDashboard() {
  const { data, isLoading, error, refreshData } = useDashboardData('admin');
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error loading dashboard data</Text>
        <Text style={styles.errorSubtext}>{error.message}</Text>
      </View>
    );
  }

  const quickActions = [
    {
      id: 'users',
      icon: 'people-outline' as const,
      label: 'Manage Users',
      color: '#2196F3',
      route: '/(app)/admin/users' as Route<string>,
    },
    {
      id: 'classes',
      icon: 'list-outline' as const,
      label: 'Classes',
      color: '#4CAF50',
      route: '/(app)/admin/classes' as Route<string>,
    },
    {
      id: 'payments',
      icon: 'card-outline' as const,
      label: 'Payments',
      color: '#FF9800',
      route: '/(app)/admin/payments' as Route<string>,
    },
    {
      id: 'reports',
      icon: 'stats-chart-outline' as const,
      label: 'Reports',
      color: '#9C27B0',
      route: '/(app)/admin/reports' as Route<string>,
    },
  ];

  const systemStats = [
    {
      id: 'storage',
      label: 'Storage Used',
      value: '45.8 GB',
      total: '100 GB',
      icon: 'save-outline' as const,
      color: '#2196F3',
    },
    {
      id: 'users',
      label: 'Active Users',
      value: '1,245',
      total: '2,550',
      icon: 'people-outline' as const,
      color: '#4CAF50',
    },
    {
      id: 'uptime',
      label: 'System Uptime',
      value: '99.9%',
      icon: 'time-outline' as const,
      color: '#FF9800',
    },
  ];

  const renderQuickActions = () => (
    <View style={styles.quickActionsGrid}>
      {quickActions.map((action) => (
        <TouchableOpacity
          key={action.id}
          style={styles.quickActionButton}
          onPress={() => router.push(action.route)}
        >
          <View style={[styles.quickActionIcon, { backgroundColor: `${action.color}15` }]}>
            <Ionicons name={action.icon} size={24} color={action.color} />
          </View>
          <Text style={styles.quickActionLabel}>{action.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderSystemStats = () => (
    <View style={styles.systemStatsContainer}>
      {systemStats.map((stat) => (
        <Card key={stat.id} style={styles.systemStatCard}>
          <View style={styles.systemStatHeader}>
            <Ionicons name={stat.icon} size={20} color={stat.color} />
            <Text style={styles.systemStatLabel}>{stat.label}</Text>
          </View>
          <Text style={[styles.systemStatValue, { color: stat.color }]}>{stat.value}</Text>
          {stat.total && (
            <Text style={styles.systemStatTotal}>of {stat.total}</Text>
          )}
        </Card>
      ))}
    </View>
  );

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

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#6b7280" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search users, classes, or reports..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {isLoading && !data ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
        </View>
      ) : (
        <>
          <QuickStats data={data?.quickStats} />

          {/* Quick Actions */}
          {renderQuickActions()}

          {/* System Stats */}
          {renderSystemStats()}

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
  header: {
    padding: scale(16),
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: scale(24),
    fontWeight: 'bold',
    color: '#1f2937',
  },
  subtitle: {
    fontSize: scale(14),
    color: '#6b7280',
    marginTop: verticalScale(4),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: scale(16),
    paddingHorizontal: scale(12),
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  searchIcon: {
    marginRight: scale(8),
  },
  searchInput: {
    flex: 1,
    paddingVertical: scale(8),
    fontSize: scale(14),
    color: '#1f2937',
  },
  section: {
    marginBottom: verticalScale(16),
    padding: scale(16),
  },
  sectionTitle: {
    fontSize: scale(18),
    fontWeight: '600',
    marginBottom: verticalScale(12),
    color: '#1f2937',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: scale(12),
    backgroundColor: 'white',
    marginVertical: verticalScale(8),
  },
  quickActionButton: {
    width: '25%',
    alignItems: 'center',
    padding: scale(8),
  },
  quickActionIcon: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(4),
  },
  quickActionLabel: {
    fontSize: scale(12),
    color: '#4b5563',
    textAlign: 'center',
  },
  systemStatsContainer: {
    padding: scale(12),
    backgroundColor: 'white',
  },
  systemStatCard: {
    marginBottom: verticalScale(8),
    padding: scale(12),
  },
  systemStatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(4),
  },
  systemStatLabel: {
    fontSize: scale(14),
    color: '#6b7280',
    marginLeft: scale(8),
  },
  systemStatValue: {
    fontSize: scale(20),
    fontWeight: 'bold',
    marginVertical: verticalScale(4),
  },
  systemStatTotal: {
    fontSize: scale(12),
    color: '#6b7280',
  },
  chartCard: {
    padding: scale(16),
    marginBottom: verticalScale(16),
  },
  chartTitle: {
    fontSize: scale(16),
    fontWeight: '600',
    marginBottom: verticalScale(12),
    color: '#1f2937',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(16),
  },
  errorText: {
    fontSize: scale(18),
    fontWeight: '600',
    color: '#ef4444',
    marginBottom: verticalScale(8),
  },
  errorSubtext: {
    fontSize: scale(14),
    color: '#6b7280',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(32),
  },
}); 