import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '../ui/Text';
import { Ionicons } from '@expo/vector-icons';

interface Activity {
  id: string;
  type: 'enrollment' | 'attendance' | 'grade' | 'event';
  title: string;
  description: string;
  time: string;
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'enrollment',
    title: 'New Student Enrollment',
    description: 'Sarah Johnson enrolled in Class 10-A',
    time: '2 hours ago',
  },
  {
    id: '2',
    type: 'attendance',
    title: 'Attendance Update',
    description: 'Class 11-B attendance marked by Mr. Smith',
    time: '3 hours ago',
  },
  {
    id: '3',
    type: 'grade',
    title: 'Grades Published',
    description: 'Mathematics mid-term grades published',
    time: '5 hours ago',
  },
  {
    id: '4',
    type: 'event',
    title: 'New Event',
    description: 'Science Fair scheduled for next month',
    time: '1 day ago',
  },
];

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'enrollment':
      return 'person-add';
    case 'attendance':
      return 'calendar';
    case 'grade':
      return 'school';
    case 'event':
      return 'calendar';
    default:
      return 'information-circle';
  }
};

const ActivityItem = ({ activity }: { activity: Activity }) => (
  <TouchableOpacity style={styles.activityItem}>
    <View style={styles.activityIcon}>
      <Ionicons name={getActivityIcon(activity.type)} size={20} color="#2196F3" />
    </View>
    <View style={styles.activityContent}>
      <Text style={styles.activityTitle}>{activity.title}</Text>
      <Text style={styles.activityDescription}>{activity.description}</Text>
      <Text style={styles.activityTime}>{activity.time}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#999" />
  </TouchableOpacity>
);

export const RecentActivities = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Recent Activities</Text>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All</Text>
          <Ionicons name="arrow-forward" size={16} color="#2196F3" />
        </TouchableOpacity>
      </View>
      <View style={styles.activitiesList}>
        {activities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    color: '#2196F3',
    marginRight: 4,
  },
  activitiesList: {
    gap: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  activityIcon: {
    backgroundColor: '#e3f2fd',
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  activityDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#999',
  },
});
