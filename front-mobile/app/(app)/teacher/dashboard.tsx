import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, ActivityIndicator, RefreshControl, TouchableOpacity, TextInput } from 'react-native';
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
import { useRouter, Route } from 'expo-router';

export default function TeacherDashboard() {
  const { data, isLoading, error, refreshData } = useDashboardData('teacher');
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

  const quickActions = [
    {
      id: 'classes',
      icon: 'school-outline' as const,
      label: 'My Classes',
      color: '#2196F3',
      route: '/(app)/teacher/classes' as Route<string>,
    },
    {
      id: 'assignments',
      icon: 'clipboard-outline' as const,
      label: 'Assignments',
      color: '#9C27B0',
      route: '/(app)/teacher/assignments' as Route<string>,
    },
    {
      id: 'messages',
      icon: 'chatbubbles-outline' as const,
      label: 'Messages',
      color: '#FF9800',
      route: '/(app)/teacher/messages' as Route<string>,
    },
    {
      id: 'materials',
      icon: 'book-outline' as const,
      label: 'Materials',
      color: '#4CAF50',
      route: '/(app)/teacher/materials' as Route<string>,
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
        style={[styles.tab, activeTab === 'classes' && styles.activeTab]}
        onPress={() => setActiveTab('classes')}
      >
        <Text style={[styles.tabText, activeTab === 'classes' && styles.activeTabText]}>
          Today's Classes
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
        <Text variant="h1" style={styles.title}>Teacher Dashboard</Text>
        <Text variant="body" style={styles.subtitle}>
          Welcome back! Here's your teaching overview
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#6b7280" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search classes, students, or assignments..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {isLoading && !data ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
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
            </>
          )}

          {activeTab === 'classes' && (
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
          )}

          {activeTab === 'assignments' && (
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
    backgroundColor: '#4CAF5015',
  },
  tabText: {
    fontSize: scale(14),
    color: '#6b7280',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#4CAF50',
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