import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '../../../components/ui/Text';
import { Card } from '../../../components/ui/Card';
import { Ionicons } from '@expo/vector-icons';
import { NAVIGATION_THEME } from '../../../navigation/constants';
import { scale, verticalScale } from '../../../utils/responsive';

export default function AttendanceScreen() {
  // Mock data - Replace with actual API calls
  const overallAttendance = 92;
  const daysPresent = 45;
  const totalDays = 49;
  const classesToday = 4;
  const recentAttendance = [
    {
      id: '1',
      subject: 'Mathematics 101',
      date: 'Today, 10:00 AM',
      status: 'Present',
      instructor: 'Dr. Smith',
      room: 'Room 201'
    },
    {
      id: '2',
      subject: 'Physics 201',
      date: 'Today, 11:30 AM',
      status: 'Present',
      instructor: 'Prof. Johnson',
      room: 'Lab 305'
    },
    {
      id: '3',
      subject: 'Chemistry Lab',
      date: 'Yesterday, 2:00 PM',
      status: 'Absent',
      instructor: 'Dr. Williams',
      room: 'Science Block B'
    },
  ];

  const renderAttendanceCard = (attendance: { id: string; subject: string; date: string; status: string; instructor: string; room: string }) => (
    <Card key={attendance.id} style={styles.attendanceCard}>
      <View style={styles.attendanceHeader}>
        <View style={styles.subjectContainer}>
          <Text style={styles.subject}>{attendance.subject}</Text>
          <Text style={styles.instructorRoom}>
            <Ionicons name="person-outline" size={14} /> {attendance.instructor} • <Ionicons name="location-outline" size={14} /> {attendance.room}
          </Text>
        </View>
        <View style={[
          styles.statusBadge,
          { backgroundColor: attendance.status === 'Present' ? '#4CAF50' : '#F44336' }
        ]}>
          <Ionicons 
            name={attendance.status === 'Present' ? "checkmark-circle" : "close-circle"} 
            size={16} 
            color="#fff" 
            style={styles.statusIcon} 
          />
          <Text style={styles.statusText}>
            {attendance.status}
          </Text>
        </View>
      </View>
      <View style={styles.dateContainer}>
        <Ionicons name="time-outline" size={14} color={NAVIGATION_THEME.colors.onSurfaceVariant} />
        <Text style={styles.date}> {attendance.date}</Text>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="h1" style={styles.title}>Attendance Overview</Text>
        <Text variant="body" style={styles.subtitle}>
          Track your attendance and class participation
        </Text>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.statsContainer}>
          <Card style={styles.overallAttendanceCard}>
            <View style={styles.cardHeader}>
              <Ionicons name="stats-chart" size={20} color={NAVIGATION_THEME.colors.primary} />
              <Text style={styles.cardHeaderText}>Overall Attendance</Text>
            </View>
            <View style={styles.percentageContainer}>
              <View style={styles.percentageCircle}>
                <Text style={styles.overallAttendancePercentage}>{overallAttendance}%</Text>
              </View>
              <View style={styles.attendanceDetails}>
                <View style={styles.attendanceDetailRow}>
                  <Ionicons name="checkmark-circle" size={18} color="#4CAF50" />
                  <Text style={styles.detailText}>{daysPresent} days present</Text>
                </View>
                <View style={styles.attendanceDetailRow}>
                  <Ionicons name="close-circle" size={18} color="#F44336" />
                  <Text style={styles.detailText}>{totalDays - daysPresent} days absent</Text>
                </View>
                <View style={styles.attendanceDetailRow}>
                  <Ionicons name="calendar" size={18} color={NAVIGATION_THEME.colors.primary} />
                  <Text style={styles.detailText}>{totalDays} total days</Text>
                </View>
              </View>
            </View>
          </Card>
        </View>
        
        <Card style={styles.todayCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="today" size={20} color={NAVIGATION_THEME.colors.primary} />
            <Text style={styles.cardHeaderText}>Today's Classes</Text>
          </View>
          
          <View style={styles.todayStats}>
            <View style={styles.todayStat}>
              <Text style={styles.todayStatNumber}>{classesToday}</Text>
              <Text style={styles.todayStatLabel}>Classes</Text>
            </View>
            <View style={styles.todayStatDivider} />
            <View style={styles.todayStat}>
              <Text style={styles.todayStatNumber}>{classesToday}</Text>
              <Text style={styles.todayStatLabel}>Present</Text>
            </View>
            <View style={styles.todayStatDivider} />
            <View style={styles.todayStat}>
              <Text style={styles.todayStatNumber}>100%</Text>
              <Text style={styles.todayStatLabel}>Rate</Text>
            </View>
          </View>
        </Card>

        <View style={styles.sectionHeader}>
          <Ionicons name="time" size={20} color={NAVIGATION_THEME.colors.primary} />
          <Text style={styles.sectionHeaderText}>Recent Attendance</Text>
        </View>
        
        {recentAttendance.map(renderAttendanceCard)}

        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All Records</Text>
          <Ionicons name="chevron-forward" size={16} color={NAVIGATION_THEME.colors.primary} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NAVIGATION_THEME.colors.background,
  },
  header: {
    padding: scale(16),
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: scale(24),
    fontWeight: 'bold',
    marginBottom: verticalScale(4),
  },
  subtitle: {
    color: '#666',
    fontSize: scale(16),
  },
  content: {
    flex: 1,
    padding: NAVIGATION_THEME.spacing.md,
  },
  statsContainer: {
    marginTop: -verticalScale(20),
  },
  overallAttendanceCard: {
    padding: NAVIGATION_THEME.spacing.md,
    borderRadius: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: NAVIGATION_THEME.spacing.sm,
  },
  cardHeaderText: {
    fontSize: scale(16),
    fontWeight: '600',
    marginLeft: NAVIGATION_THEME.spacing.xs,
  },
  percentageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: NAVIGATION_THEME.spacing.sm,
  },
  percentageCircle: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
    borderWidth: scale(3),
    borderColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overallAttendancePercentage: {
    fontSize: scale(24),
    fontWeight: '700',
    color: '#4CAF50',
  },
  attendanceDetails: {
    flex: 1,
    marginLeft: NAVIGATION_THEME.spacing.md,
  },
  attendanceDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: NAVIGATION_THEME.spacing.xs,
  },
  detailText: {
    fontSize: scale(14),
    marginLeft: NAVIGATION_THEME.spacing.xs,
  },
  todayCard: {
    marginTop: NAVIGATION_THEME.spacing.md,
    marginBottom: NAVIGATION_THEME.spacing.md,
    padding: NAVIGATION_THEME.spacing.md,
    borderRadius: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  todayStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: NAVIGATION_THEME.spacing.sm,
  },
  todayStat: {
    alignItems: 'center',
    flex: 1,
  },
  todayStatNumber: {
    fontSize: scale(20),
    fontWeight: '700',
    color: NAVIGATION_THEME.colors.primary,
  },
  todayStatLabel: {
    fontSize: scale(12),
    color: NAVIGATION_THEME.colors.onSurfaceVariant,
  },
  todayStatDivider: {
    width: 1,
    height: '80%',
    backgroundColor: NAVIGATION_THEME.colors.border,
    opacity: 0.3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: NAVIGATION_THEME.spacing.md,
  },
  sectionHeaderText: {
    fontSize: scale(16),
    fontWeight: '600',
    marginLeft: NAVIGATION_THEME.spacing.xs,
  },
  attendanceCard: {
    marginBottom: NAVIGATION_THEME.spacing.md,
    padding: NAVIGATION_THEME.spacing.md,
    borderRadius: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  attendanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: NAVIGATION_THEME.spacing.sm,
  },
  subjectContainer: {
    flex: 1,
  },
  subject: {
    fontSize: scale(16),
    fontWeight: '600',
  },
  instructorRoom: {
    fontSize: scale(12),
    color: NAVIGATION_THEME.colors.onSurfaceVariant,
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: NAVIGATION_THEME.spacing.sm,
    paddingVertical: NAVIGATION_THEME.spacing.xs,
    borderRadius: 20,
  },
  statusIcon: {
    marginRight: 4,
  },
  statusText: {
    color: '#fff',
    fontSize: scale(12),
    fontWeight: '500',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: scale(12),
    color: NAVIGATION_THEME.colors.onSurfaceVariant,
  },
  viewAllButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: NAVIGATION_THEME.spacing.md,
    marginBottom: NAVIGATION_THEME.spacing.lg,
  },
  viewAllText: {
    fontSize: scale(14),
    color: NAVIGATION_THEME.colors.primary,
    fontWeight: '500',
    marginRight: NAVIGATION_THEME.spacing.xs,
  },
});