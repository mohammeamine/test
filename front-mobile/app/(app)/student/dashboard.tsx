import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, ActivityIndicator, RefreshControl, TouchableOpacity, TextInput } from 'react-native';
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
import { useRouter, Route } from 'expo-router';

export default function StudentDashboard() {
  const { data, isLoading, error, refreshData } = useDashboardData('student');
  const { isSmallScreen, getFontSize, getSpacing } = useResponsiveLayout();
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

  const quickActions = [
    {
      id: 'courses',
      icon: 'school-outline' as const,
      label: 'My Courses',
      color: '#2196F3',
      route: '/(app)/student/courses' as Route<string>,
    },
    {
      id: 'materials',
      icon: 'book-outline' as const,
      label: 'Materials',
      color: '#4CAF50',
      route: '/(app)/student/materials' as Route<string>,
    },
    {
      id: 'library',
      icon: 'library-outline' as const,
      label: 'Library',
      color: '#9C27B0',
      route: '/(app)/student/library' as Route<string>,
    },
    {
      id: 'certificates',
      icon: 'ribbon-outline' as const,
      label: 'Certificates',
      color: '#FF9800',
      route: '/(app)/student/certificates' as Route<string>,
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

  const renderTabs = () => (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
        onPress={() => setActiveTab('overview')}
      >
        <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>
          Overview
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'schedule' && styles.activeTab]}
        onPress={() => setActiveTab('schedule')}
      >
        <Text style={[styles.tabText, activeTab === 'schedule' && styles.activeTabText]}>
          Schedule
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'assignments' && styles.activeTab]}
        onPress={() => setActiveTab('assignments')}
      >
        <Text style={[styles.tabText, activeTab === 'assignments' && styles.activeTabText]}>
          Assignments
        </Text>
      </TouchableOpacity>
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
        <Text variant="h1" style={styles.title}>Student Dashboard</Text>
        <Text variant="body" style={styles.subtitle}>
          Track your academic progress
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#6b7280" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search courses, materials, or assignments..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {isLoading && !data ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF9800" />
        </View>
      ) : (
        <>
          <QuickStats data={data?.quickStats} />

          {/* Quick Actions */}
          {renderQuickActions()}

          {/* Tabs Navigation */}
          {renderTabs()}

          {activeTab === 'overview' && (
            <>
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
            </>
          )}

          {activeTab === 'schedule' && (
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
          )}

          {activeTab === 'assignments' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Upcoming Assignments</Text>
              {upcomingAssignments.map((assignment) => (
                <Card key={assignment.id} style={styles.assignmentCard}>
                  <View style={styles.assignmentHeader}>
                    <View>
                      <View style={styles.assignmentTitleRow}>
                        <Text style={styles.assignmentSubject}>{assignment.subject}</Text>
                        <Text style={styles.assignmentTitle}>{assignment.title}</Text>
                      </View>
                      <View style={styles.assignmentDetails}>
                        <Text style={styles.dueDate}>Due: {assignment.dueDate}</Text>
                        <Text style={styles.assignmentType}>{assignment.type}</Text>
                      </View>
                    </View>
                    <View style={styles.assignmentStatus}>
                      <Text style={[
                        styles.statusText,
                        { color: assignment.status === 'pending' ? '#FF9800' : '#4CAF50' }
                      ]}>
                        {assignment.status === 'pending' ? 'Pending' : 'Submitted'}
                      </Text>
                    </View>
                  </View>
                </Card>
              ))}
            </View>
          )}
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: scale(4),
    marginHorizontal: scale(16),
    marginVertical: verticalScale(8),
    borderRadius: scale(8),
  },
  tab: {
    flex: 1,
    paddingVertical: verticalScale(8),
    alignItems: 'center',
    borderRadius: scale(6),
  },
  activeTab: {
    backgroundColor: '#FF980015',
  },
  tabText: {
    fontSize: scale(14),
    color: '#6b7280',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FF9800',
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
  assignmentTitle: {
    fontSize: scale(16),
    fontWeight: '600',
  },
  assignmentDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dueDate: {
    fontSize: scale(14),
    color: '#666',
    marginRight: scale(8),
  },
  assignmentType: {
    fontSize: scale(12),
    color: '#666',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: scale(6),
    paddingVertical: verticalScale(2),
    borderRadius: scale(4),
  },
  assignmentStatus: {
    alignItems: 'flex-end',
  },
  statusText: {
    fontSize: scale(14),
    fontWeight: '500',
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