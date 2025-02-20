import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Text } from '../../components/ui/Text';
import { Ionicons } from '@expo/vector-icons';

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

export default function CoursesScreen() {
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Courses Management</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
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
      </View>

      <ScrollView style={styles.courseList}>
        {filteredCourses.map((course) => (
          <TouchableOpacity key={course.id} style={styles.courseCard}>
            <View style={styles.courseHeader}>
              <View style={styles.courseInfo}>
                <Text style={styles.courseName}>{course.name}</Text>
                <Text style={styles.courseTeacher}>
                  <Ionicons name="person-outline" size={14} color="#666" /> {course.teacher}
                </Text>
              </View>
              <View style={getStatusStyle(course.status)}>
                <Text>
                  {course.status}
                </Text>
              </View>
            </View>
            
            <View style={styles.courseDetails}>
              <View style={styles.detailItem}>
                <Ionicons name="people-outline" size={16} color="#666" />
                <Text style={styles.detailText}>{course.students} Students</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="time-outline" size={16} color="#666" />
                <Text style={styles.detailText}>{course.schedule}</Text>
              </View>
            </View>

            <View style={styles.courseActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="create-outline" size={20} color="#2196F3" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="people-outline" size={20} color="#4CAF50" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="calendar-outline" size={20} color="#FF9800" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="trash-outline" size={20} color="#F44336" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#2196F3',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  courseList: {
    flex: 1,
    padding: 16,
  },
  courseCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  courseInfo: {
    flex: 1,
    marginRight: 12,
  },
  courseName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  courseTeacher: {
    fontSize: 14,
    color: '#666',
  },
  courseStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
  },
  statusActive: {
    backgroundColor: '#E8F5E9',
    color: '#4CAF50',
  },
  statusInactive: {
    backgroundColor: '#FFEBEE',
    color: '#F44336',
  },
  statusPending: {
    backgroundColor: '#FFF59D',
    color: '#FF9800',
  },
  courseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  courseActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});
