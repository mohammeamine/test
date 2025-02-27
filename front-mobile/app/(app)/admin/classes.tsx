import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from '../../../components/ui/Text';
import { Card } from '../../../components/ui/Card';
import { Ionicons } from '@expo/vector-icons';
import { scale, verticalScale } from '../../../utils/responsive';

const classList = [
  { id: 1, name: '12-A', teacher: 'John Doe', students: 35, subject: 'Mathematics' },
  { id: 2, name: '11-B', teacher: 'Sarah Wilson', students: 32, subject: 'Science' },
  { id: 3, name: '10-C', teacher: 'Mike Brown', students: 30, subject: 'English' },
  { id: 4, name: '12-B', teacher: 'Emily Davis', students: 33, subject: 'History' },
  { id: 5, name: '11-A', teacher: 'David Miller', students: 31, subject: 'Physics' },
];

export default function ClassesManagement() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="h1" style={styles.title}>Classes Management</Text>
        <Text variant="body" style={styles.subtitle}>
          Manage all classes and their assignments
        </Text>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={scale(20)} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Add New Class</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.classList}>
        {classList.map((classItem) => (
          <Card key={classItem.id} style={styles.classCard}>
            <View style={styles.classHeader}>
              <Text style={styles.className}>{classItem.name}</Text>
              <View style={styles.studentCount}>
                <Ionicons name="people-outline" size={scale(16)} color="#666" />
                <Text style={styles.countText}>{classItem.students}</Text>
              </View>
            </View>

            <View style={styles.classDetails}>
              <View style={styles.detailItem}>
                <Ionicons name="person-outline" size={scale(16)} color="#666" />
                <Text style={styles.detailText}>{classItem.teacher}</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="book-outline" size={scale(16)} color="#666" />
                <Text style={styles.detailText}>{classItem.subject}</Text>
              </View>
            </View>

            <View style={styles.cardActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="calendar-outline" size={scale(20)} color="#2196F3" />
                <Text style={styles.actionText}>Schedule</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="stats-chart-outline" size={scale(20)} color="#2196F3" />
                <Text style={styles.actionText}>Reports</Text>
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
  actionContainer: {
    paddingHorizontal: scale(16),
    marginBottom: verticalScale(16),
  },
  addButton: {
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(16),
    borderRadius: scale(8),
    alignSelf: 'flex-start',
  },
  buttonIcon: {
    marginRight: scale(8),
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: scale(14),
  },
  classList: {
    padding: scale(16),
    paddingBottom: verticalScale(30),
  },
  classCard: {
    padding: scale(16),
    marginBottom: verticalScale(16),
  },
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  className: {
    fontSize: scale(18),
    fontWeight: 'bold',
  },
  studentCount: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: scale(6),
    borderRadius: scale(15),
  },
  countText: {
    marginLeft: scale(5),
    color: '#666',
    fontSize: scale(14),
  },
  classDetails: {
    marginBottom: verticalScale(16),
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(5),
  },
  detailText: {
    marginLeft: scale(8),
    color: '#666',
    fontSize: scale(14),
  },
  cardActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: verticalScale(10),
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: scale(20),
  },
  actionText: {
    color: '#2196F3',
    marginLeft: scale(5),
    fontSize: scale(14),
  },
}); 