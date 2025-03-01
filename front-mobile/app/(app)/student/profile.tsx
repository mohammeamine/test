import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Switch, TouchableOpacity, Image } from 'react-native';
import { Text } from '../../../components/ui/Text';
import { Card } from '../../../components/ui/Card';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { scale, verticalScale } from '../../../utils/responsive';

export default function StudentProfileScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    assignmentReminders: true,
    gradeUpdates: true,
  });

  const studentInfo = {
    name: 'Alex Johnson',
    email: 'alex.johnson@student.edu',
    grade: '10th Grade',
    studentId: 'ST-2023-0042',
    phone: '(555) 123-4567',
    parentName: 'Robert & Mary Johnson',
    joinedDate: 'September 2022',
  };

  // Academic summary stats
  const academicStats = [
    { title: 'GPA', value: '3.7', icon: '🎓' },
    { title: 'Courses', value: '6', icon: '📚' },
    { title: 'Attendance', value: '95%', icon: '📅' },
    { title: 'Activities', value: '3', icon: '🏆' },
  ];

  const handleLogout = () => {
    // TODO: Implement logout logic
    router.replace('/login');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{studentInfo.name.split(' ').map(n => n[0]).join('')}</Text>
          </View>
        </View>
        <Text variant="h1" style={styles.name}>{studentInfo.name}</Text>
        <Text variant="body" style={styles.role}>Student - {studentInfo.grade}</Text>
      </View>

      {/* Academic Summary */}
      <View style={styles.statsGrid}>
        {academicStats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <Card style={styles.cardContent}>
              <Text style={styles.icon}>{stat.icon}</Text>
              <Text variant="h2" style={styles.value}>
                {stat.value}
              </Text>
              <Text variant="body" style={styles.statTitle}>
                {stat.title}
              </Text>
            </Card>
          </View>
        ))}
      </View>

      {/* Personal Information */}
      <Card style={styles.section}>
        <Text variant="h3" style={styles.sectionTitle}>Personal Information</Text>
        
        <View style={styles.infoItem}>
          <View style={styles.infoItemLeft}>
            <Ionicons name="person-outline" size={24} color="#666" />
            <Text style={styles.infoLabel}>Student ID</Text>
          </View>
          <Text style={styles.infoValue}>{studentInfo.studentId}</Text>
        </View>
        
        <View style={styles.infoItem}>
          <View style={styles.infoItemLeft}>
            <Ionicons name="mail-outline" size={24} color="#666" />
            <Text style={styles.infoLabel}>Email</Text>
          </View>
          <Text style={styles.infoValue}>{studentInfo.email}</Text>
        </View>
        
        <View style={styles.infoItem}>
          <View style={styles.infoItemLeft}>
            <Ionicons name="call-outline" size={24} color="#666" />
            <Text style={styles.infoLabel}>Phone</Text>
          </View>
          <Text style={styles.infoValue}>{studentInfo.phone}</Text>
        </View>
        
        <View style={styles.infoItem}>
          <View style={styles.infoItemLeft}>
            <Ionicons name="people-outline" size={24} color="#666" />
            <Text style={styles.infoLabel}>Parents</Text>
          </View>
          <Text style={styles.infoValue}>{studentInfo.parentName}</Text>
        </View>
        
        <View style={styles.infoItem}>
          <View style={styles.infoItemLeft}>
            <Ionicons name="calendar-outline" size={24} color="#666" />
            <Text style={styles.infoLabel}>Joined</Text>
          </View>
          <Text style={styles.infoValue}>{studentInfo.joinedDate}</Text>
        </View>
      </Card>

      {/* Academic Records */}
      <Card style={styles.section}>
        <Text variant="h3" style={styles.sectionTitle}>Academic Records</Text>
        
        <TouchableOpacity style={styles.recordItem}>
          <View style={styles.recordItemLeft}>
            <Ionicons name="school-outline" size={24} color="#666" />
            <Text style={styles.recordText}>Grade Reports</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.recordItem}>
          <View style={styles.recordItemLeft}>
            <Ionicons name="calendar-outline" size={24} color="#666" />
            <Text style={styles.recordText}>Attendance Records</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.recordItem}>
          <View style={styles.recordItemLeft}>
            <Ionicons name="trophy-outline" size={24} color="#666" />
            <Text style={styles.recordText}>Achievements</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.recordItem}>
          <View style={styles.recordItemLeft}>
            <Ionicons name="document-text-outline" size={24} color="#666" />
            <Text style={styles.recordText}>Official Transcripts</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>
      </Card>

      {/* Account Settings */}
      <Card style={styles.section}>
        <Text variant="h3" style={styles.sectionTitle}>Account Settings</Text>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="person-outline" size={24} color="#666" />
            <Text style={styles.settingText}>Edit Profile</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="lock-closed-outline" size={24} color="#666" />
            <Text style={styles.settingText}>Change Password</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>
      </Card>

      {/* Notifications */}
      <Card style={styles.section}>
        <Text variant="h3" style={styles.sectionTitle}>Notifications</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="mail-outline" size={24} color="#666" />
            <Text style={styles.settingText}>Email Notifications</Text>
          </View>
          <Switch
            value={notifications.emailNotifications}
            onValueChange={(value) =>
              setNotifications({ ...notifications, emailNotifications: value })
            }
            trackColor={{ false: '#ddd', true: '#2196F3' }}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="notifications-outline" size={24} color="#666" />
            <Text style={styles.settingText}>Push Notifications</Text>
          </View>
          <Switch
            value={notifications.pushNotifications}
            onValueChange={(value) =>
              setNotifications({ ...notifications, pushNotifications: value })
            }
            trackColor={{ false: '#ddd', true: '#2196F3' }}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="document-text-outline" size={24} color="#666" />
            <Text style={styles.settingText}>Assignment Reminders</Text>
          </View>
          <Switch
            value={notifications.assignmentReminders}
            onValueChange={(value) =>
              setNotifications({ ...notifications, assignmentReminders: value })
            }
            trackColor={{ false: '#ddd', true: '#2196F3' }}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="ribbon-outline" size={24} color="#666" />
            <Text style={styles.settingText}>Grade Updates</Text>
          </View>
          <Switch
            value={notifications.gradeUpdates}
            onValueChange={(value) =>
              setNotifications({ ...notifications, gradeUpdates: value })
            }
            trackColor={{ false: '#ddd', true: '#2196F3' }}
          />
        </View>
      </Card>

      {/* Logout Section */}
      <Card style={[styles.section, styles.logoutSection]}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={24} color="#F44336" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </Card>

      {/* Bottom spacing */}
      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileHeader: {
    backgroundColor: '#2196F3',
    padding: scale(20),
    alignItems: 'center',
    paddingBottom: scale(30),
  },
  avatarContainer: {
    marginBottom: verticalScale(16),
  },
  avatar: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(50),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatarText: {
    fontSize: scale(36),
    fontWeight: 'bold',
    color: '#2196F3',
  },
  name: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: scale(24),
    marginBottom: verticalScale(4),
  },
  role: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: scale(16),
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: scale(8),
    marginTop: scale(-20),
  },
  statCard: {
    width: '50%',
    padding: scale(8),
  },
  cardContent: {
    padding: scale(16),
    alignItems: 'center',
  },
  icon: {
    fontSize: scale(24),
    marginBottom: verticalScale(8),
  },
  value: {
    fontSize: scale(24),
    fontWeight: 'bold',
    marginBottom: verticalScale(4),
  },
  statTitle: {
    textAlign: 'center',
    opacity: 0.7,
  },
  section: {
    margin: scale(16),
    padding: scale(16),
    borderRadius: scale(8),
  },
  sectionTitle: {
    fontSize: scale(18),
    fontWeight: '600',
    marginBottom: verticalScale(16),
    color: '#333',
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: scale(16),
    marginLeft: scale(12),
    color: '#666',
  },
  infoValue: {
    fontSize: scale(16),
    color: '#333',
    fontWeight: '500',
  },
  recordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  recordItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordText: {
    fontSize: scale(16),
    marginLeft: scale(12),
    color: '#333',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: scale(16),
    marginLeft: scale(12),
    color: '#333',
  },
  logoutSection: {
    backgroundColor: '#fff',
    marginTop: verticalScale(16),
    marginBottom: verticalScale(16),
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(12),
  },
  logoutText: {
    color: '#F44336',
    fontSize: scale(16),
    fontWeight: '500',
    marginLeft: scale(8),
  },
  bottomSpacer: {
    height: verticalScale(40),
  },
}); 