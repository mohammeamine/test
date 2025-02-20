import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from '../../components/ui/Text';
import { Ionicons } from '@expo/vector-icons';

const classList = [
  { id: 1, name: '12-A', teacher: 'John Doe', students: 35, subject: 'Mathematics' },
  { id: 2, name: '11-B', teacher: 'Sarah Wilson', students: 32, subject: 'Science' },
  { id: 3, name: '10-C', teacher: 'Mike Brown', students: 30, subject: 'English' },
  { id: 4, name: '12-B', teacher: 'Emily Davis', students: 33, subject: 'History' },
  { id: 5, name: '11-A', teacher: 'David Miller', students: 31, subject: 'Physics' },
];

export default function ClassesScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Classes Management</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.classList}>
        {classList.map((classItem) => (
          <TouchableOpacity key={classItem.id} style={styles.classCard}>
            <View style={styles.classHeader}>
              <Text style={styles.className}>{classItem.name}</Text>
              <View style={styles.studentCount}>
                <Ionicons name="people-outline" size={16} color="#666" />
                <Text style={styles.countText}>{classItem.students}</Text>
              </View>
            </View>

            <View style={styles.classDetails}>
              <View style={styles.detailItem}>
                <Ionicons name="person-outline" size={16} color="#666" />
                <Text style={styles.detailText}>{classItem.teacher}</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="book-outline" size={16} color="#666" />
                <Text style={styles.detailText}>{classItem.subject}</Text>
              </View>
            </View>

            <View style={styles.cardActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="calendar-outline" size={20} color="#2196F3" />
                <Text style={styles.actionText}>Schedule</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="stats-chart-outline" size={20} color="#2196F3" />
                <Text style={styles.actionText}>Reports</Text>
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
    padding: 20,
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
  classList: {
    padding: 15,
  },
  classCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  className: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  studentCount: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 6,
    borderRadius: 15,
  },
  countText: {
    marginLeft: 5,
    color: '#666',
    fontSize: 14,
  },
  classDetails: {
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  detailText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
  cardActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionText: {
    color: '#2196F3',
    marginLeft: 5,
    fontSize: 14,
  },
});
