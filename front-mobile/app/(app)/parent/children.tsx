import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Text } from '../../../components/ui/Text';
import { Card } from '../../../components/ui/Card';
import { Ionicons } from '@expo/vector-icons';
import { scale, verticalScale } from '../../../utils/responsive';

// Define types
interface Child {
  id: string;
  name: string;
  grade: string;
  teacher: string;
  photo?: string;
}

interface GradeInfo {
  subject: string;
  grade: string;
  trend: 'up' | 'down' | 'stable';
}

interface AttendanceRecord {
  date: string;
  status: 'present' | 'absent' | 'late';
  reason?: string;
}

interface ChildDetails {
  id: string;
  name: string;
  grade: string;
  teacher: string;
  photo?: string;
  className: string;
  attendance: {
    present: number;
    absent: number;
    late: number;
  };
  grades: GradeInfo[];
  recentAttendance: AttendanceRecord[];
  upcomingEvents: {
    id: string;
    title: string;
    date: string;
    type: 'exam' | 'assignment' | 'event';
  }[];
}

// Mock data for children
const initialChildren: Child[] = [
  {
    id: '1',
    name: 'Emma Johnson',
    grade: '5th Grade',
    teacher: 'Ms. Sarah Wilson',
  },
  {
    id: '2',
    name: 'James Johnson',
    grade: '9th Grade',
    teacher: 'Mr. Robert Thompson',
  },
];

// Mock detailed data for a child
const getChildDetails = (childId: string): ChildDetails => {
  // This would normally come from an API
  if (childId === '1') {
    return {
      id: '1',
      name: 'Emma Johnson',
      grade: '5th Grade',
      teacher: 'Ms. Sarah Wilson',
      className: 'Room 102',
      attendance: {
        present: 45,
        absent: 2,
        late: 3,
      },
      grades: [
        { subject: 'Mathematics', grade: 'A-', trend: 'up' },
        { subject: 'Science', grade: 'B+', trend: 'stable' },
        { subject: 'English', grade: 'A', trend: 'stable' },
        { subject: 'History', grade: 'B', trend: 'down' },
        { subject: 'Art', grade: 'A+', trend: 'up' },
      ],
      recentAttendance: [
        { date: '2023-06-12', status: 'present' },
        { date: '2023-06-11', status: 'present' },
        { date: '2023-06-10', status: 'late', reason: 'Doctor appointment' },
        { date: '2023-06-09', status: 'present' },
        { date: '2023-06-08', status: 'present' },
      ],
      upcomingEvents: [
        { id: 'e1', title: 'Math Quiz', date: '2023-06-15', type: 'exam' },
        { id: 'e2', title: 'Science Project Due', date: '2023-06-20', type: 'assignment' },
        { id: 'e3', title: 'School Field Trip', date: '2023-06-25', type: 'event' },
      ],
    };
  } else {
    return {
      id: '2',
      name: 'James Johnson',
      grade: '9th Grade',
      teacher: 'Mr. Robert Thompson',
      className: 'Room 305',
      attendance: {
        present: 42,
        absent: 4,
        late: 4,
      },
      grades: [
        { subject: 'Algebra', grade: 'B+', trend: 'up' },
        { subject: 'Biology', grade: 'A-', trend: 'down' },
        { subject: 'Literature', grade: 'B', trend: 'stable' },
        { subject: 'Geography', grade: 'C+', trend: 'up' },
        { subject: 'Physical Education', grade: 'A', trend: 'stable' },
      ],
      recentAttendance: [
        { date: '2023-06-12', status: 'present' },
        { date: '2023-06-11', status: 'absent', reason: 'Sick' },
        { date: '2023-06-10', status: 'absent', reason: 'Sick' },
        { date: '2023-06-09', status: 'present' },
        { date: '2023-06-08', status: 'present' },
      ],
      upcomingEvents: [
        { id: 'e1', title: 'Biology Test', date: '2023-06-18', type: 'exam' },
        { id: 'e2', title: 'Essay Submission', date: '2023-06-22', type: 'assignment' },
        { id: 'e3', title: 'Basketball Tournament', date: '2023-06-27', type: 'event' },
      ],
    };
  }
};

// Format date string
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// Define the getGradeColor function outside of the StyleSheet
const getGradeColor = (grade: string) => {
  if (grade.startsWith('A')) return { color: '#4CAF50' };
  if (grade.startsWith('B')) return { color: '#2196F3' };
  if (grade.startsWith('C')) return { color: '#FF9800' };
  return { color: '#F44336' };
};

export default function ParentChildrenScreen() {
  const [children, setChildren] = useState<Child[]>(initialChildren);
  const [selectedChild, setSelectedChild] = useState<ChildDetails | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'grades' | 'attendance'>('overview');

  const handleSelectChild = (childId: string) => {
    const details = getChildDetails(childId);
    setSelectedChild(details);
    setActiveTab('overview');
  };

  const handleBackToList = () => {
    setSelectedChild(null);
  };

  // Main children list view
  const renderChildrenList = () => {
    return (
      <>
        <View style={styles.header}>
          <Text variant="h1" style={styles.title}>My Children</Text>
          <Text variant="body" style={styles.subtitle}>
            View and manage your children's school information
          </Text>
        </View>

        <ScrollView style={styles.childrenContainer}>
          {children.map((child) => (
            <TouchableOpacity
              key={child.id}
              style={styles.childCard}
              onPress={() => handleSelectChild(child.id)}
            >
              <Card style={styles.cardContent}>
                <View style={styles.childInfo}>
                  <View style={styles.avatarContainer}>
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>
                        {child.name.split(' ').map(n => n[0]).join('')}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.childDetails}>
                    <Text style={styles.childName}>{child.name}</Text>
                    <Text style={styles.childGrade}>{child.grade}</Text>
                    <Text style={styles.childTeacher}>Teacher: {child.teacher}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={24} color="#2196F3" />
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </>
    );
  };

  // Child details view
  const renderChildDetails = () => {
    if (!selectedChild) return null;

    return (
      <View style={styles.container}>
        <View style={styles.detailsHeader}>
          <TouchableOpacity onPress={handleBackToList} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text variant="h1" style={styles.detailsTitle}>{selectedChild.name}</Text>
          <Text variant="body" style={styles.detailsSubtitle}>
            {selectedChild.grade} • {selectedChild.className}
          </Text>
        </View>

        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
            onPress={() => setActiveTab('overview')}
          >
            <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>
              Overview
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'grades' && styles.activeTab]}
            onPress={() => setActiveTab('grades')}
          >
            <Text style={[styles.tabText, activeTab === 'grades' && styles.activeTabText]}>
              Grades
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'attendance' && styles.activeTab]}
            onPress={() => setActiveTab('attendance')}
          >
            <Text style={[styles.tabText, activeTab === 'attendance' && styles.activeTabText]}>
              Attendance
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'overview' && (
          <ScrollView style={styles.detailsContent}>
            <Card style={styles.infoSection}>
              <View style={styles.infoHeader}>
                <Ionicons name="person-outline" size={20} color="#2196F3" />
                <Text style={styles.infoTitle}>Student Information</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Teacher:</Text>
                <Text style={styles.infoValue}>{selectedChild.teacher}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Class:</Text>
                <Text style={styles.infoValue}>{selectedChild.className}</Text>
              </View>
              <TouchableOpacity style={styles.contactButton}>
                <Ionicons name="mail-outline" size={16} color="#fff" />
                <Text style={styles.contactButtonText}>Contact Teacher</Text>
              </TouchableOpacity>
            </Card>

            <Card style={styles.infoSection}>
              <View style={styles.infoHeader}>
                <Ionicons name="calendar-outline" size={20} color="#2196F3" />
                <Text style={styles.infoTitle}>Upcoming Events</Text>
              </View>
              {selectedChild.upcomingEvents.map((event) => (
                <View key={event.id} style={styles.eventItem}>
                  <View style={styles.eventDate}>
                    <Text style={styles.eventDateText}>{formatDate(event.date)}</Text>
                  </View>
                  <View style={styles.eventDetails}>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <View style={[styles.eventTypeBadge, styles[`${event.type}Badge`]]}>
                      <Text style={styles.eventTypeText}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </Card>

            <Card style={styles.infoSection}>
              <View style={styles.infoHeader}>
                <Ionicons name="stats-chart-outline" size={20} color="#2196F3" />
                <Text style={styles.infoTitle}>Attendance Summary</Text>
              </View>
              <View style={styles.attendanceSummary}>
                <View style={styles.attendanceItem}>
                  <Text style={styles.attendanceCount}>{selectedChild.attendance.present}</Text>
                  <Text style={styles.attendanceLabel}>Present</Text>
                </View>
                <View style={styles.attendanceItem}>
                  <Text style={styles.attendanceCount}>{selectedChild.attendance.absent}</Text>
                  <Text style={styles.attendanceLabel}>Absent</Text>
                </View>
                <View style={styles.attendanceItem}>
                  <Text style={styles.attendanceCount}>{selectedChild.attendance.late}</Text>
                  <Text style={styles.attendanceLabel}>Late</Text>
                </View>
              </View>
            </Card>

            <Card style={styles.infoSection}>
              <View style={styles.infoHeader}>
                <Ionicons name="school-outline" size={20} color="#2196F3" />
                <Text style={styles.infoTitle}>Recent Grades</Text>
              </View>
              {selectedChild.grades.slice(0, 3).map((grade, index) => (
                <View key={index} style={styles.gradeRow}>
                  <Text style={styles.subjectName}>{grade.subject}</Text>
                  <View style={styles.gradeInfo}>
                    <Text style={styles.gradeValue}>{grade.grade}</Text>
                    <Ionicons 
                      name={
                        grade.trend === 'up' ? 'arrow-up-outline' :
                        grade.trend === 'down' ? 'arrow-down-outline' : 'remove-outline'
                      } 
                      size={16} 
                      color={
                        grade.trend === 'up' ? '#4CAF50' :
                        grade.trend === 'down' ? '#F44336' : '#757575'
                      } 
                    />
                  </View>
                </View>
              ))}
              <TouchableOpacity 
                style={styles.viewMoreButton}
                onPress={() => setActiveTab('grades')}
              >
                <Text style={styles.viewMoreText}>View All Grades</Text>
              </TouchableOpacity>
            </Card>

            <View style={styles.bottomSpacer} />
          </ScrollView>
        )}

        {activeTab === 'grades' && (
          <ScrollView style={styles.detailsContent}>
            <Card style={[styles.infoSection, styles.gradesCard]}>
              <Text style={styles.gradeSectionTitle}>Current Grades</Text>
              {selectedChild.grades.map((grade, index) => (
                <View key={index} style={styles.gradeItem}>
                  <View style={styles.gradeSubjectContainer}>
                    <Text style={styles.gradeSubject}>{grade.subject}</Text>
                  </View>
                  <View style={styles.gradeValueContainer}>
                    <Text style={[styles.gradeValueText, getGradeColor(grade.grade)]}>
                      {grade.grade}
                    </Text>
                    <Ionicons 
                      name={
                        grade.trend === 'up' ? 'arrow-up-outline' :
                        grade.trend === 'down' ? 'arrow-down-outline' : 'remove-outline'
                      } 
                      size={16} 
                      color={
                        grade.trend === 'up' ? '#4CAF50' :
                        grade.trend === 'down' ? '#F44336' : '#757575'
                      } 
                      style={styles.trendIcon}
                    />
                  </View>
                </View>
              ))}
            </Card>

            <Card style={styles.infoSection}>
              <Text style={styles.gradeSectionTitle}>Request Information</Text>
              <TouchableOpacity style={styles.requestButton}>
                <Ionicons name="document-text-outline" size={18} color="#2196F3" />
                <Text style={styles.requestButtonText}>Request Detailed Report</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.requestButton}>
                <Ionicons name="chatbubble-outline" size={18} color="#2196F3" />
                <Text style={styles.requestButtonText}>Message Teacher About Grades</Text>
              </TouchableOpacity>
            </Card>

            <View style={styles.bottomSpacer} />
          </ScrollView>
        )}

        {activeTab === 'attendance' && (
          <ScrollView style={styles.detailsContent}>
            <Card style={styles.infoSection}>
              <View style={styles.infoHeader}>
                <Ionicons name="stats-chart-outline" size={20} color="#2196F3" />
                <Text style={styles.infoTitle}>Attendance Summary</Text>
              </View>
              <View style={styles.attendanceSummary}>
                <View style={styles.attendanceItem}>
                  <Text style={styles.attendanceCount}>{selectedChild.attendance.present}</Text>
                  <Text style={styles.attendanceLabel}>Present</Text>
                </View>
                <View style={styles.attendanceItem}>
                  <Text style={styles.attendanceCount}>{selectedChild.attendance.absent}</Text>
                  <Text style={styles.attendanceLabel}>Absent</Text>
                </View>
                <View style={styles.attendanceItem}>
                  <Text style={styles.attendanceCount}>{selectedChild.attendance.late}</Text>
                  <Text style={styles.attendanceLabel}>Late</Text>
                </View>
              </View>
            </Card>

            <Card style={styles.infoSection}>
              <Text style={styles.attendanceSectionTitle}>Recent Attendance</Text>
              {selectedChild.recentAttendance.map((record, index) => (
                <View key={index} style={styles.attendanceRecord}>
                  <View style={styles.attendanceDate}>
                    <Text style={styles.attendanceDateText}>{formatDate(record.date)}</Text>
                  </View>
                  <View style={styles.attendanceStatus}>
                    <View style={[styles.statusDot, styles[`${record.status}Dot`]]} />
                    <Text style={styles.statusText}>
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </Text>
                  </View>
                  {record.reason && (
                    <Text style={styles.attendanceReason}>{record.reason}</Text>
                  )}
                </View>
              ))}
            </Card>

            <Card style={styles.infoSection}>
              <Text style={styles.attendanceSectionTitle}>Report Absence</Text>
              <TouchableOpacity style={styles.reportButton}>
                <Ionicons name="add-circle-outline" size={18} color="#fff" />
                <Text style={styles.reportButtonText}>Report New Absence</Text>
              </TouchableOpacity>
            </Card>

            <View style={styles.bottomSpacer} />
          </ScrollView>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {selectedChild ? renderChildDetails() : renderChildrenList()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  childrenContainer: {
    flex: 1,
    padding: scale(16),
  },
  childCard: {
    marginBottom: scale(16),
  },
  cardContent: {
    padding: scale(16),
  },
  childInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: scale(16),
  },
  avatar: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: scale(20),
    fontWeight: 'bold',
  },
  childDetails: {
    flex: 1,
  },
  childName: {
    fontSize: scale(18),
    fontWeight: '600',
    marginBottom: verticalScale(4),
  },
  childGrade: {
    fontSize: scale(14),
    color: '#666',
    marginBottom: verticalScale(2),
  },
  childTeacher: {
    fontSize: scale(14),
    color: '#666',
  },
  detailsHeader: {
    backgroundColor: '#2196F3',
    padding: scale(16),
    paddingTop: scale(20),
  },
  backButton: {
    marginBottom: verticalScale(8),
  },
  detailsTitle: {
    color: '#fff',
    fontSize: scale(24),
    fontWeight: 'bold',
  },
  detailsSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: scale(16),
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#2196F3',
  },
  tabText: {
    fontSize: scale(16),
    color: '#666',
  },
  activeTabText: {
    color: '#2196F3',
    fontWeight: '600',
  },
  detailsContent: {
    flex: 1,
    padding: scale(16),
  },
  infoSection: {
    padding: scale(16),
    marginBottom: scale(16),
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  infoTitle: {
    fontSize: scale(18),
    fontWeight: '600',
    marginLeft: scale(8),
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(10),
  },
  infoLabel: {
    fontSize: scale(14),
    color: '#666',
  },
  infoValue: {
    fontSize: scale(14),
    fontWeight: '500',
    color: '#333',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
    padding: scale(10),
    borderRadius: scale(4),
    marginTop: verticalScale(12),
  },
  contactButtonText: {
    color: '#fff',
    marginLeft: scale(8),
    fontWeight: '500',
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(12),
    paddingBottom: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  eventDate: {
    width: scale(80),
  },
  eventDateText: {
    fontSize: scale(14),
    color: '#666',
  },
  eventDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventTitle: {
    fontSize: scale(14),
    fontWeight: '500',
    flex: 1,
  },
  eventTypeBadge: {
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(4),
    borderRadius: scale(4),
  },
  examBadge: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
  },
  assignmentBadge: {
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
  },
  eventBadge: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  eventTypeText: {
    fontSize: scale(12),
    fontWeight: '500',
  },
  attendanceSummary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: verticalScale(16),
  },
  attendanceItem: {
    alignItems: 'center',
  },
  attendanceCount: {
    fontSize: scale(24),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: verticalScale(4),
  },
  attendanceLabel: {
    fontSize: scale(14),
    color: '#666',
  },
  gradeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(8),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  subjectName: {
    fontSize: scale(14),
    color: '#333',
  },
  gradeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gradeValue: {
    fontSize: scale(14),
    fontWeight: '600',
    marginRight: scale(8),
  },
  viewMoreButton: {
    alignItems: 'center',
    padding: scale(12),
    marginTop: verticalScale(8),
  },
  viewMoreText: {
    color: '#2196F3',
    fontWeight: '500',
  },
  // Grade details tab
  gradesCard: {
    padding: scale(0),
  },
  gradeSectionTitle: {
    fontSize: scale(16),
    fontWeight: '600',
    marginBottom: verticalScale(16),
    paddingHorizontal: scale(16),
    paddingTop: scale(16),
  },
  gradeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  gradeSubjectContainer: {
    flex: 1,
  },
  gradeSubject: {
    fontSize: scale(14),
    color: '#333',
  },
  gradeValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gradeValueText: {
    fontSize: scale(16),
    fontWeight: '600',
    marginRight: scale(8),
  },
  trendIcon: {
    marginLeft: scale(4),
  },
  requestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  requestButtonText: {
    marginLeft: scale(12),
    color: '#333',
    fontSize: scale(14),
  },
  // Attendance tab
  attendanceSectionTitle: {
    fontSize: scale(16),
    fontWeight: '600',
    marginBottom: verticalScale(16),
  },
  attendanceRecord: {
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  attendanceDate: {
    marginBottom: verticalScale(4),
  },
  attendanceDateText: {
    fontSize: scale(14),
    color: '#666',
  },
  attendanceStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(4),
  },
  statusDot: {
    width: scale(12),
    height: scale(12),
    borderRadius: scale(6),
    marginRight: scale(8),
  },
  presentDot: {
    backgroundColor: '#4CAF50',
  },
  absentDot: {
    backgroundColor: '#F44336',
  },
  lateDot: {
    backgroundColor: '#FF9800',
  },
  statusText: {
    fontSize: scale(14),
    fontWeight: '500',
    color: '#333',
  },
  attendanceReason: {
    fontSize: scale(14),
    color: '#666',
    fontStyle: 'italic',
  },
  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
    padding: scale(12),
    borderRadius: scale(4),
  },
  reportButtonText: {
    color: '#fff',
    marginLeft: scale(8),
    fontWeight: '500',
  },
  bottomSpacer: {
    height: verticalScale(40),
  },
}); 