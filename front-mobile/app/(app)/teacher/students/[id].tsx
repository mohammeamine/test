import React from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '../../../../components/ui/Text';
import { Card } from '../../../../components/ui/Card';
import { scale, verticalScale } from '../../../../utils/responsive';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

interface StudentDetails {
  id: string;
  name: string;
  grade: string;
  attendance: number;
  performance: number;
  lastActive: string;
  email: string;
  parentName: string;
  parentEmail: string;
  subjects: {
    name: string;
    grade: number;
    attendance: number;
  }[];
  recentActivities: {
    type: string;
    description: string;
    date: string;
  }[];
}

export default function StudentDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // Mock data - Replace with actual API call
  const studentDetails: StudentDetails = {
    id: '1',
    name: 'John Smith',
    grade: '10th Grade',
    attendance: 95,
    performance: 88,
    lastActive: '2024-03-15',
    email: 'john.smith@school.com',
    parentName: 'Robert Smith',
    parentEmail: 'robert.smith@email.com',
    subjects: [
      { name: 'Mathematics', grade: 92, attendance: 96 },
      { name: 'Science', grade: 88, attendance: 94 },
      { name: 'English', grade: 85, attendance: 92 },
      { name: 'History', grade: 90, attendance: 98 },
    ],
    recentActivities: [
      {
        type: 'Assignment',
        description: 'Submitted Math Homework',
        date: '2024-03-15',
      },
      {
        type: 'Quiz',
        description: 'Completed Science Quiz',
        date: '2024-03-14',
      },
      {
        type: 'Attendance',
        description: 'Present in all classes',
        date: '2024-03-13',
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#1f2937" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text variant="h1" style={styles.title}>Student Details</Text>
          <Text variant="body" style={styles.subtitle}>{studentDetails.name}</Text>
        </View>
      </View>

      {/* Basic Info Card */}
      <Card style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
        </View>
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Grade</Text>
            <Text style={styles.infoValue}>{studentDetails.grade}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{studentDetails.email}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Parent Name</Text>
            <Text style={styles.infoValue}>{studentDetails.parentName}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Parent Email</Text>
            <Text style={styles.infoValue}>{studentDetails.parentEmail}</Text>
          </View>
        </View>
      </Card>

      {/* Performance Overview */}
      <Card style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Performance Overview</Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{studentDetails.performance}%</Text>
            <Text style={styles.statLabel}>Overall Performance</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{studentDetails.attendance}%</Text>
            <Text style={styles.statLabel}>Attendance Rate</Text>
          </View>
        </View>
      </Card>

      {/* Subjects */}
      <Card style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Subjects</Text>
        </View>
        {studentDetails.subjects.map((subject, index) => (
          <View key={index} style={styles.subjectItem}>
            <View style={styles.subjectHeader}>
              <Text style={styles.subjectName}>{subject.name}</Text>
              <View style={styles.subjectStats}>
                <Text style={[styles.subjectStat, { color: '#2196F3' }]}>
                  Grade: {subject.grade}%
                </Text>
                <Text style={[styles.subjectStat, { color: '#4CAF50' }]}>
                  Attendance: {subject.attendance}%
                </Text>
              </View>
            </View>
          </View>
        ))}
      </Card>

      {/* Recent Activities */}
      <Card style={[styles.section, styles.lastSection]}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activities</Text>
        </View>
        {studentDetails.recentActivities.map((activity, index) => (
          <View key={index} style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Ionicons
                name={
                  activity.type === 'Assignment'
                    ? 'document-text-outline'
                    : activity.type === 'Quiz'
                    ? 'clipboard-outline'
                    : 'calendar-outline'
                }
                size={20}
                color="#6b7280"
              />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityDescription}>{activity.description}</Text>
              <Text style={styles.activityDate}>{activity.date}</Text>
            </View>
          </View>
        ))}
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(16),
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    marginRight: scale(16),
  },
  headerContent: {
    flex: 1,
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
    margin: scale(16),
    marginBottom: 0,
    padding: scale(16),
  },
  lastSection: {
    marginBottom: scale(16),
  },
  sectionHeader: {
    marginBottom: verticalScale(12),
  },
  sectionTitle: {
    fontSize: scale(16),
    fontWeight: '600',
    color: '#1f2937',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  infoItem: {
    width: '50%',
    marginBottom: verticalScale(12),
  },
  infoLabel: {
    fontSize: scale(12),
    color: '#6b7280',
    marginBottom: verticalScale(2),
  },
  infoValue: {
    fontSize: scale(14),
    color: '#1f2937',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: scale(24),
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: verticalScale(4),
  },
  statLabel: {
    fontSize: scale(12),
    color: '#6b7280',
  },
  subjectItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: verticalScale(12),
  },
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subjectName: {
    fontSize: scale(14),
    fontWeight: '500',
    color: '#1f2937',
  },
  subjectStats: {
    flexDirection: 'row',
    gap: scale(12),
  },
  subjectStat: {
    fontSize: scale(12),
    fontWeight: '500',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(8),
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  activityIcon: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(12),
  },
  activityContent: {
    flex: 1,
  },
  activityDescription: {
    fontSize: scale(14),
    color: '#1f2937',
  },
  activityDate: {
    fontSize: scale(12),
    color: '#6b7280',
    marginTop: verticalScale(2),
  },
}); 