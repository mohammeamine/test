import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from '../ui/Text';
import { Card } from '../ui/Card';
import { Ionicons } from '@expo/vector-icons';
import { scale, verticalScale } from '../../utils/responsive';
import { RoleType } from '../../navigation/types';

interface Activity {
  id: string;
  type: 'enrollment' | 'attendance' | 'grade' | 'event' | 'assignment' | 'message';
  title: string;
  description: string;
  time: string;
}

interface RecentActivitiesProps {
  role: RoleType;
}

const getActivitiesByRole = (role: RoleType): Activity[] => {
  switch (role) {
    case 'admin':
      return [
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
    case 'teacher':
      return [
        {
          id: '1',
          type: 'attendance',
          title: 'Attendance Marked',
          description: 'You marked attendance for Class 10-A',
          time: '1 hour ago',
        },
        {
          id: '2',
          type: 'grade',
          title: 'Grades Updated',
          description: 'You published grades for Mathematics Quiz',
          time: '3 hours ago',
        },
        {
          id: '3',
          type: 'assignment',
          title: 'Assignment Created',
          description: 'New assignment: Chapter 5 Exercises',
          time: '4 hours ago',
        },
      ];
    case 'student':
      return [
        {
          id: '1',
          type: 'grade',
          title: 'New Grade',
          description: 'You received an A in Mathematics Quiz',
          time: '2 hours ago',
        },
        {
          id: '2',
          type: 'assignment',
          title: 'Assignment Due',
          description: 'Mathematics: Chapter 5 Exercises due tomorrow',
          time: '3 hours ago',
        },
        {
          id: '3',
          type: 'event',
          title: 'Class Schedule',
          description: 'Chemistry Lab rescheduled to Room 203',
          time: '5 hours ago',
        },
      ];
    case 'parent':
      return [
        {
          id: '1',
          type: 'grade',
          title: 'Grade Update',
          description: 'John received an A in Mathematics Quiz',
          time: '2 hours ago',
        },
        {
          id: '2',
          type: 'attendance',
          title: 'Attendance Alert',
          description: 'John was present in all classes today',
          time: '4 hours ago',
        },
        {
          id: '3',
          type: 'event',
          title: 'Parent Meeting',
          description: 'Parent-Teacher meeting scheduled next week',
          time: '1 day ago',
        },
        {
          id: '4',
          type: 'message',
          title: 'New Message',
          description: 'Message from Math teacher regarding progress',
          time: '1 day ago',
        },
      ];
  }
};

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'enrollment':
      return 'person-add-outline';
    case 'attendance':
      return 'calendar-outline';
    case 'grade':
      return 'school-outline';
    case 'event':
      return 'calendar-outline';
    case 'assignment':
      return 'document-text-outline';
    case 'message':
      return 'mail-outline';
    default:
      return 'information-circle-outline';
  }
};

const getActivityColor = (type: Activity['type']) => {
  switch (type) {
    case 'enrollment':
      return '#2196F3';
    case 'attendance':
      return '#4CAF50';
    case 'grade':
      return '#FF9800';
    case 'event':
      return '#9C27B0';
    case 'assignment':
      return '#00BCD4';
    case 'message':
      return '#3F51B5';
    default:
      return '#757575';
  }
};

export const RecentActivities: React.FC<RecentActivitiesProps> = ({ role }) => {
  const activities = getActivitiesByRole(role);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Activities</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {activities.map((activity) => (
          <Card key={activity.id} style={styles.activityCard}>
            <View style={[styles.iconContainer, { backgroundColor: `${getActivityColor(activity.type)}15` }]}>
              <Ionicons
                name={getActivityIcon(activity.type)}
                size={24}
                color={getActivityColor(activity.type)}
              />
            </View>
            <Text style={styles.activityTitle}>{activity.title}</Text>
            <Text style={styles.activityDescription}>{activity.description}</Text>
            <Text style={styles.activityTime}>{activity.time}</Text>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: verticalScale(16),
  },
  title: {
    fontSize: scale(18),
    fontWeight: 'bold',
    marginBottom: verticalScale(12),
    paddingHorizontal: scale(16),
  },
  scrollContent: {
    paddingHorizontal: scale(12),
  },
  activityCard: {
    width: scale(250),
    marginHorizontal: scale(4),
    padding: scale(16),
  },
  iconContainer: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  activityTitle: {
    fontSize: scale(16),
    fontWeight: '600',
    marginBottom: verticalScale(4),
  },
  activityDescription: {
    fontSize: scale(14),
    color: '#666',
    marginBottom: verticalScale(8),
  },
  activityTime: {
    fontSize: scale(12),
    color: '#999',
  },
});
