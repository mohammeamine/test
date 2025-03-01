import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, ActivityIndicator, RefreshControl, TouchableOpacity, TextInput } from 'react-native';
import { Text } from '../../../../components/ui/Text';
import { Card } from '../../../../components/ui/Card';
import { scale, verticalScale } from '../../../../utils/responsive';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface Student {
  id: string;
  name: string;
  grade: string;
  attendance: number;
  performance: number;
  lastActive: string;
}

export default function TeacherStudents() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const router = useRouter();

  // Mock data - Replace with actual API call
  const students: Student[] = [
    {
      id: '1',
      name: 'John Smith',
      grade: '10th Grade',
      attendance: 95,
      performance: 88,
      lastActive: '2024-03-15',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      grade: '10th Grade',
      attendance: 92,
      performance: 95,
      lastActive: '2024-03-15',
    },
    {
      id: '3',
      name: 'Michael Brown',
      grade: '10th Grade',
      attendance: 88,
      performance: 82,
      lastActive: '2024-03-14',
    },
  ];

  const classes = ['All Classes', '10-A', '10-B', '11-A', '11-B'];

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={() => {}} />
      }
    >
      <View style={styles.header}>
        <Text variant="h1" style={styles.title}>Students</Text>
        <Text variant="body" style={styles.subtitle}>
          Manage and monitor your students
        </Text>
      </View>

      {/* Search and Filter Section */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search-outline" size={20} color="#6b7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search students..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
        >
          {classes.map((className) => (
            <TouchableOpacity
              key={className}
              style={[
                styles.filterChip,
                selectedClass === className && styles.filterChipActive
              ]}
              onPress={() => setSelectedClass(className)}
            >
              <Text style={[
                styles.filterChipText,
                selectedClass === className && styles.filterChipTextActive
              ]}>
                {className}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Stats Overview */}
      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <Text style={styles.statLabel}>Total Students</Text>
          <Text style={styles.statValue}>180</Text>
          <Text style={styles.statSubtext}>Across all classes</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statLabel}>Average Attendance</Text>
          <Text style={[styles.statValue, { color: '#4CAF50' }]}>92%</Text>
          <Text style={styles.statSubtext}>This semester</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statLabel}>Average Performance</Text>
          <Text style={[styles.statValue, { color: '#2196F3' }]}>85%</Text>
          <Text style={styles.statSubtext}>Class average</Text>
        </Card>
      </View>

      {/* Students List */}
      <View style={styles.studentsContainer}>
        {students.map((student) => (
          <TouchableOpacity
            key={student.id}
            onPress={() => router.push(`/(app)/teacher/students/${student.id}` as any)}
          >
            <Card style={styles.studentCard}>
              <View style={styles.studentHeader}>
                <View style={styles.studentInfo}>
                  <View style={styles.avatarContainer}>
                    <Text style={styles.avatarText}>
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.studentName}>{student.name}</Text>
                    <Text style={styles.studentGrade}>{student.grade}</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#6b7280" />
              </View>
              <View style={styles.studentStats}>
                <View style={styles.studentStat}>
                  <Text style={styles.studentStatLabel}>Attendance</Text>
                  <Text style={[styles.studentStatValue, { color: '#4CAF50' }]}>
                    {student.attendance}%
                  </Text>
                </View>
                <View style={styles.studentStat}>
                  <Text style={styles.studentStatLabel}>Performance</Text>
                  <Text style={[styles.studentStatValue, { color: '#2196F3' }]}>
                    {student.performance}%
                  </Text>
                </View>
                <View style={styles.studentStat}>
                  <Text style={styles.studentStatLabel}>Last Active</Text>
                  <Text style={styles.studentStatValue}>{student.lastActive}</Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
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
    padding: scale(16),
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: scale(8),
    paddingHorizontal: scale(12),
    marginBottom: verticalScale(12),
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
  filterContainer: {
    flexDirection: 'row',
    paddingVertical: verticalScale(4),
  },
  filterChip: {
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
    borderRadius: scale(16),
    backgroundColor: '#f3f4f6',
    marginRight: scale(8),
  },
  filterChipActive: {
    backgroundColor: '#2196F3',
  },
  filterChipText: {
    fontSize: scale(14),
    color: '#6b7280',
  },
  filterChipTextActive: {
    color: 'white',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: scale(16),
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    marginHorizontal: scale(4),
    padding: scale(12),
    alignItems: 'center',
  },
  statLabel: {
    fontSize: scale(12),
    color: '#6b7280',
    marginBottom: verticalScale(4),
  },
  statValue: {
    fontSize: scale(20),
    fontWeight: 'bold',
    color: '#1f2937',
  },
  statSubtext: {
    fontSize: scale(10),
    color: '#6b7280',
    marginTop: verticalScale(2),
  },
  studentsContainer: {
    padding: scale(16),
  },
  studentCard: {
    marginBottom: verticalScale(8),
    padding: scale(16),
  },
  studentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(12),
  },
  studentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(12),
  },
  avatarText: {
    fontSize: scale(16),
    fontWeight: 'bold',
    color: '#6b7280',
  },
  studentName: {
    fontSize: scale(16),
    fontWeight: '600',
    color: '#1f2937',
  },
  studentGrade: {
    fontSize: scale(14),
    color: '#6b7280',
  },
  studentStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: verticalScale(12),
  },
  studentStat: {
    alignItems: 'center',
  },
  studentStatLabel: {
    fontSize: scale(12),
    color: '#6b7280',
    marginBottom: verticalScale(2),
  },
  studentStatValue: {
    fontSize: scale(14),
    fontWeight: '600',
    color: '#1f2937',
  },
}); 