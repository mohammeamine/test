import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Text } from '../../../components/ui/Text';
import { Card } from '../../../components/ui/Card';
import { Ionicons } from '@expo/vector-icons';
import { scale, verticalScale } from '../../../utils/responsive';

const coursesList = [
  {
    id: 1,
    name: 'Advanced Mathematics',
    teacher: 'John Doe',
    students: 25,
    schedule: 'Mon, Wed 10:00 AM',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Physics 101',
    teacher: 'Sarah Wilson',
    students: 30,
    schedule: 'Tue, Thu 11:30 AM',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Chemistry Basics',
    teacher: 'Mike Brown',
    students: 28,
    schedule: 'Mon, Fri 2:00 PM',
    status: 'Inactive',
  },
  {
    id: 4,
    name: 'Biology Advanced',
    teacher: 'Emma Davis',
    students: 22,
    schedule: 'Wed, Fri 9:00 AM',
    status: 'Active',
  },
  {
    id: 5,
    name: 'Computer Science',
    teacher: 'James Wilson',
    students: 35,
    schedule: 'Tue, Thu 3:30 PM',
    status: 'Active',
  },
];

export default function CoursesManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = coursesList.filter(course =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.teacher.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusStyle = (status: string) => {
    const statusStyles = {
      Active: styles.statusActive,
      Inactive: styles.statusInactive,
      Pending: styles.statusPending
    };
    return [styles.courseStatus, statusStyles[status as keyof typeof statusStyles]];
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="h1" style={styles.title}>Courses Management</Text>
        <Text variant="body" style={styles.subtitle}>
          Manage all academic courses and their assignments
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search courses or teachers..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={scale(24)} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.courseList}>
        {filteredCourses.map((course) => (
          <Card key={course.id} style={styles.courseCard}>
            <View style={styles.courseHeader}>
              <View style={styles.courseInfo}>
                <Text style={styles.courseName}>{course.name}</Text>
                <Text style={styles.courseTeacher}>
                  <Ionicons name="person-outline" size={scale(14)} color="#666" /> {course.teacher}
                </Text>
              </View>
              <View style={getStatusStyle(course.status)}>
                <Text style={styles.statusText}>
                  {course.status}
                </Text>
              </View>
            </View>
            
            <View style={styles.courseDetails}>
              <View style={styles.detailItem}>
                <Ionicons name="people-outline" size={scale(16)} color="#666" />
                <Text style={styles.detailText}>{course.students} Students</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="time-outline" size={scale(16)} color="#666" />
                <Text style={styles.detailText}>{course.schedule}</Text>
              </View>
            </View>

            <View style={styles.courseActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="create-outline" size={scale(20)} color="#2196F3" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="people-outline" size={scale(20)} color="#4CAF50" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="calendar-outline" size={scale(20)} color="#FF9800" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="trash-outline" size={scale(20)} color="#F44336" />
              </TouchableOpacity>
            </View>
          </Card>
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
  searchContainer: {
    padding: scale(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: scale(8),
    padding: scale(10),
    marginRight: scale(10),
    borderWidth: 1,
    borderColor: '#eee',
  },
  searchInput: {
    flex: 1,
    marginLeft: scale(8),
    fontSize: scale(16),
  },
  addButton: {
    backgroundColor: '#2196F3',
    width: scale(44),
    height: scale(44),
    borderRadius: scale(22),
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseList: {
    padding: scale(16),
    paddingBottom: verticalScale(30),
  },
  courseCard: {
    padding: scale(16),
    marginBottom: verticalScale(16),
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: verticalScale(12),
  },
  courseInfo: {
    flex: 1,
    marginRight: scale(12),
  },
  courseName: {
    fontSize: scale(16),
    fontWeight: '600',
    marginBottom: verticalScale(4),
  },
  courseTeacher: {
    fontSize: scale(14),
    color: '#666',
  },
  courseStatus: {
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(4),
    borderRadius: scale(4),
  },
  statusText: {
    fontSize: scale(12),
    fontWeight: '500',
  },
  statusActive: {
    backgroundColor: '#E8F5E9',
  },
  statusInactive: {
    backgroundColor: '#FFEBEE',
  },
  statusPending: {
    backgroundColor: '#FFF59D',
  },
  courseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(12),
    paddingBottom: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: scale(4),
    fontSize: scale(14),
    color: '#666',
  },
  courseActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(8),
  },
}); 