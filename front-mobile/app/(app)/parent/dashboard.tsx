import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, ActivityIndicator, RefreshControl, TouchableOpacity, Pressable } from 'react-native';
import { Text } from '../../../components/ui/Text';
import { Card } from '../../../components/ui/Card';
import { QuickStats } from '../../../components/dashboard/QuickStats';
import { AttendanceSummaryChart } from '../../../components/charts/AttendanceSummaryChart';
import { RecentActivities } from '../../../components/dashboard/RecentActivities';
import { useResponsiveLayout } from '../../../hooks/useResponsiveLayout';
import { scale, verticalScale } from '../../../utils/responsive';
import { useDashboardData } from '../../../hooks/useDashboardData';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { createRoutePath } from '../../../navigation/helpers';
import { AppRoutePath } from '../../../navigation/types';

export default function ParentDashboard() {
  const { data, isLoading, error, refreshData } = useDashboardData('parent');
  const { isSmallScreen, getFontSize, getSpacing } = useResponsiveLayout();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

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
      id: 'payments',
      icon: 'card-outline' as const,
      label: 'Pay Fees',
      color: '#FF9800',
      route: `/(app)/parent/payments` as const,
    },
    {
      id: 'attendance',
      icon: 'calendar-outline' as const,
      label: 'Attendance',
      color: '#4CAF50',
      route: `/(app)/parent/children` as const,
    },
    {
      id: 'messages',
      icon: 'chatbubbles-outline' as const,
      label: 'Messages',
      color: '#2196F3',
      route: `/(app)/parent/profile` as const,
    },
    {
      id: 'documents',
      icon: 'document-text-outline' as const,
      label: 'Documents',
      color: '#9C27B0',
      route: `/(app)/parent/documents` as const,
    },
  ];

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
      <Pressable
        style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
        onPress={() => setActiveTab('overview')}
      >
        <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>
          Overview
        </Text>
      </Pressable>
      <Pressable
        style={[styles.tab, activeTab === 'grades' && styles.activeTab]}
        onPress={() => setActiveTab('grades')}
      >
        <Text style={[styles.tabText, activeTab === 'grades' && styles.activeTabText]}>
          Grades
        </Text>
      </Pressable>
      <Pressable
        style={[styles.tab, activeTab === 'events' && styles.activeTab]}
        onPress={() => setActiveTab('events')}
      >
        <Text style={[styles.tabText, activeTab === 'events' && styles.activeTabText]}>
          Events
        </Text>
      </Pressable>
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
                    Attendance Summary
                  </Text>
                  <AttendanceSummaryChart data={data?.attendanceSummary} />
                </Card>
              </View>

              {/* Recent Activities */}
              <View style={styles.section}>
                <RecentActivities role="parent" />
              </View>
            </>
          )}

          {activeTab === 'grades' && (
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
          )}

          {activeTab === 'events' && (
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
    marginTop: verticalScale(8),
  },
  chartTitle: {
    fontSize: scale(16),
    fontWeight: '600',
    marginBottom: verticalScale(12),
    color: '#1f2937',
  },
  gradeCard: {
    marginBottom: verticalScale(8),
    padding: scale(16),
  },
  gradeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    color: '#1f2937',
    marginRight: scale(8),
  },
  gradeType: {
    fontSize: scale(12),
    color: '#6b7280',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: scale(6),
    paddingVertical: verticalScale(2),
    borderRadius: scale(4),
  },
  teacher: {
    fontSize: scale(14),
    color: '#6b7280',
  },
  gradeValue: {
    alignItems: 'flex-end',
  },
  grade: {
    fontSize: scale(20),
    fontWeight: 'bold',
  },
  date: {
    fontSize: scale(12),
    color: '#6b7280',
    marginTop: verticalScale(2),
  },
  eventCard: {
    marginBottom: verticalScale(8),
    padding: scale(16),
  },
  eventHeader: {
    marginBottom: verticalScale(8),
  },
  eventTitle: {
    fontSize: scale(16),
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: verticalScale(4),
  },
  eventDetails: {
    flexDirection: 'row',
    marginBottom: verticalScale(4),
  },
  eventTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: scale(16),
  },
  eventTimeText: {
    fontSize: scale(12),
    color: '#6b7280',
    marginLeft: scale(4),
  },
  eventLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: scale(12),
    color: '#6b7280',
    marginLeft: scale(4),
  },
  eventTypeContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(2),
    borderRadius: scale(4),
    marginTop: verticalScale(4),
  },
  eventType: {
    fontSize: scale(12),
    color: '#6b7280',
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