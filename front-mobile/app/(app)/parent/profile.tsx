import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Switch, TouchableOpacity, Image } from 'react-native';
import { Text } from '../../../components/ui/Text';
import { Card } from '../../../components/ui/Card';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { scale, verticalScale } from '../../../utils/responsive';

export default function ParentProfileScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    gradeUpdates: true,
    absenceAlerts: true,
    eventReminders: true,
  });

  // Mock parent information
  const parentInfo = {
    name: 'Michael Johnson',
    email: 'michael.johnson@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Maple Street, Springfield, IL 62701',
    occupation: 'Software Engineer',
    children: [
      { id: '1', name: 'Emma Johnson', grade: '5th Grade' },
      { id: '2', name: 'James Johnson', grade: '9th Grade' },
    ],
    joinedDate: 'September 2020',
  };

  // Mock parent activity
  const recentActivity = [
    { id: 'a1', description: 'Viewed Emma\'s attendance record', date: '2 hours ago' },
    { id: 'a2', description: 'Reported absence for James', date: 'Yesterday' },
    { id: 'a3', description: 'Paid school lunch fees', date: '3 days ago' },
    { id: 'a4', description: 'Downloaded Emma\'s report card', date: '1 week ago' },
  ];

  // Handle notification toggle
  const toggleNotification = (type: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  // Handle logout
  const handleLogout = () => {
    // In a real app, this would clear the authentication state
    router.replace('/login');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImage}>
            <Text style={styles.profileInitials}>
              {parentInfo.name.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
        </View>
        <Text variant="h1" style={styles.name}>{parentInfo.name}</Text>
        <Text variant="body" style={styles.email}>{parentInfo.email}</Text>
        <Text variant="body" style={styles.memberSince}>Member since {parentInfo.joinedDate}</Text>
      </View>

      {/* Children Summary */}
      <Card style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="people-outline" size={20} color="#2196F3" />
          <Text style={styles.sectionTitle}>My Children</Text>
        </View>
        {parentInfo.children.map(child => (
          <View key={child.id} style={styles.childItem}>
            <View style={styles.childAvatar}>
              <Text style={styles.childInitials}>
                {child.name.split(' ').map(n => n[0]).join('')}
              </Text>
            </View>
            <View style={styles.childInfo}>
              <Text style={styles.childName}>{child.name}</Text>
              <Text style={styles.childGrade}>{child.grade}</Text>
            </View>
          </View>
        ))}
        <TouchableOpacity 
          style={styles.sectionButton}
          onPress={() => router.push('/parent/children')}
        >
          <Text style={styles.sectionButtonText}>View Children Details</Text>
        </TouchableOpacity>
      </Card>

      {/* Personal Information */}
      <Card style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="person-outline" size={20} color="#2196F3" />
          <Text style={styles.sectionTitle}>Personal Information</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{parentInfo.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Phone</Text>
          <Text style={styles.infoValue}>{parentInfo.phone}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Address</Text>
          <Text style={styles.infoValue}>{parentInfo.address}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Occupation</Text>
          <Text style={styles.infoValue}>{parentInfo.occupation}</Text>
        </View>
        <TouchableOpacity style={styles.sectionButton}>
          <Text style={styles.sectionButtonText}>Edit Personal Information</Text>
        </TouchableOpacity>
      </Card>

      {/* Recent Activity */}
      <Card style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="time-outline" size={20} color="#2196F3" />
          <Text style={styles.sectionTitle}>Recent Activity</Text>
        </View>
        {recentActivity.map(activity => (
          <View key={activity.id} style={styles.activityItem}>
            <Text style={styles.activityDescription}>{activity.description}</Text>
            <Text style={styles.activityDate}>{activity.date}</Text>
          </View>
        ))}
      </Card>

      {/* Account Settings */}
      <Card style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="settings-outline" size={20} color="#2196F3" />
          <Text style={styles.sectionTitle}>Account Settings</Text>
        </View>
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingTextContainer}>
            <Text style={styles.settingText}>Change Password</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingTextContainer}>
            <Text style={styles.settingText}>Privacy Settings</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingTextContainer}>
            <Text style={styles.settingText}>Data and Storage</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#999" />
        </TouchableOpacity>
      </Card>

      {/* Notification Preferences */}
      <Card style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="notifications-outline" size={20} color="#2196F3" />
          <Text style={styles.sectionTitle}>Notification Preferences</Text>
        </View>
        <View style={styles.notificationItem}>
          <View style={styles.notificationTextContainer}>
            <Text style={styles.notificationText}>Email Notifications</Text>
          </View>
          <Switch
            value={notifications.email}
            onValueChange={() => toggleNotification('email')}
            trackColor={{ false: "#d1d1d6", true: "#81b0ff" }}
            thumbColor={notifications.email ? "#2196F3" : "#f4f3f4"}
          />
        </View>
        <View style={styles.notificationItem}>
          <View style={styles.notificationTextContainer}>
            <Text style={styles.notificationText}>Push Notifications</Text>
          </View>
          <Switch
            value={notifications.push}
            onValueChange={() => toggleNotification('push')}
            trackColor={{ false: "#d1d1d6", true: "#81b0ff" }}
            thumbColor={notifications.push ? "#2196F3" : "#f4f3f4"}
          />
        </View>
        <View style={styles.notificationItem}>
          <View style={styles.notificationTextContainer}>
            <Text style={styles.notificationText}>Grade Updates</Text>
          </View>
          <Switch
            value={notifications.gradeUpdates}
            onValueChange={() => toggleNotification('gradeUpdates')}
            trackColor={{ false: "#d1d1d6", true: "#81b0ff" }}
            thumbColor={notifications.gradeUpdates ? "#2196F3" : "#f4f3f4"}
          />
        </View>
        <View style={styles.notificationItem}>
          <View style={styles.notificationTextContainer}>
            <Text style={styles.notificationText}>Absence Alerts</Text>
          </View>
          <Switch
            value={notifications.absenceAlerts}
            onValueChange={() => toggleNotification('absenceAlerts')}
            trackColor={{ false: "#d1d1d6", true: "#81b0ff" }}
            thumbColor={notifications.absenceAlerts ? "#2196F3" : "#f4f3f4"}
          />
        </View>
        <View style={styles.notificationItem}>
          <View style={styles.notificationTextContainer}>
            <Text style={styles.notificationText}>Event Reminders</Text>
          </View>
          <Switch
            value={notifications.eventReminders}
            onValueChange={() => toggleNotification('eventReminders')}
            trackColor={{ false: "#d1d1d6", true: "#81b0ff" }}
            thumbColor={notifications.eventReminders ? "#2196F3" : "#f4f3f4"}
          />
        </View>
      </Card>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2196F3',
    padding: scale(20),
    alignItems: 'center',
    paddingBottom: scale(30),
  },
  profileImageContainer: {
    marginBottom: verticalScale(16),
  },
  profileImage: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(50),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitials: {
    color: '#fff',
    fontSize: scale(40),
    fontWeight: 'bold',
  },
  name: {
    color: '#fff',
    fontSize: scale(24),
    fontWeight: 'bold',
    marginBottom: verticalScale(4),
  },
  email: {
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: verticalScale(2),
  },
  memberSince: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: scale(14),
  },
  section: {
    marginHorizontal: scale(16),
    marginTop: scale(16),
    padding: scale(16),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  sectionTitle: {
    fontSize: scale(18),
    fontWeight: '600',
    marginLeft: scale(8),
    color: '#333',
  },
  childItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  childAvatar: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },
  childInitials: {
    color: '#fff',
    fontSize: scale(16),
    fontWeight: 'bold',
  },
  childInfo: {
    flex: 1,
  },
  childName: {
    fontSize: scale(16),
    fontWeight: '500',
    color: '#333',
  },
  childGrade: {
    fontSize: scale(14),
    color: '#666',
  },
  sectionButton: {
    marginTop: verticalScale(12),
    paddingVertical: verticalScale(10),
    backgroundColor: '#f0f0f0',
    borderRadius: scale(4),
    alignItems: 'center',
  },
  sectionButtonText: {
    color: '#2196F3',
    fontWeight: '500',
  },
  infoRow: {
    marginBottom: verticalScale(12),
  },
  infoLabel: {
    fontSize: scale(14),
    color: '#666',
    marginBottom: verticalScale(2),
  },
  infoValue: {
    fontSize: scale(16),
    color: '#333',
  },
  activityItem: {
    marginBottom: verticalScale(12),
    paddingBottom: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  activityDescription: {
    fontSize: scale(14),
    color: '#333',
    marginBottom: verticalScale(4),
  },
  activityDate: {
    fontSize: scale(12),
    color: '#999',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingTextContainer: {
    flex: 1,
  },
  settingText: {
    fontSize: scale(16),
    color: '#333',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  notificationTextContainer: {
    flex: 1,
  },
  notificationText: {
    fontSize: scale(16),
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#f44336',
    marginHorizontal: scale(16),
    marginTop: scale(24),
    padding: scale(16),
    borderRadius: scale(4),
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: scale(16),
    fontWeight: '600',
  },
  bottomSpacer: {
    height: verticalScale(40),
  },
}); 