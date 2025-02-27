import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Text } from '../../../components/ui/Text';
import { Card } from '../../../components/ui/Card';
import { Ionicons } from '@expo/vector-icons';
import { scale, verticalScale } from '../../../utils/responsive';

// Define types
interface Course {
  id: string;
  name: string;
  teacher: string;
  schedule: string;
  progress: number;
  grade: string | null;
  color: string;
}

interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  status: 'completed' | 'pending' | 'overdue';
  grade?: string;
}

interface Material {
  id: string;
  title: string;
  type: 'document' | 'video' | 'link';
  date: string;
}

// Mock data for courses
const initialCourses: Course[] = [
  {
    id: '1',
    name: 'Mathematics',
    teacher: 'John Doe',
    schedule: 'Mon, Wed, Fri - 9:00 AM',
    progress: 75,
    grade: 'B+',
    color: '#2196F3',
  },
  {
    id: '2',
    name: 'Science',
    teacher: 'Jane Smith',
    schedule: 'Tue, Thu - 11:30 AM',
    progress: 85,
    grade: 'A-',
    color: '#4CAF50',
  },
  {
    id: '3',
    name: 'History',
    teacher: 'Robert Johnson',
    schedule: 'Mon, Wed - 2:00 PM',
    progress: 60,
    grade: 'C+',
    color: '#FF9800',
  },
  {
    id: '4',
    name: 'English Literature',
    teacher: 'Sarah Wilson',
    schedule: 'Tue, Thu - 10:00 AM',
    progress: 90,
    grade: 'A',
    color: '#9C27B0',
  },
  {
    id: '5',
    name: 'Computer Science',
    teacher: 'Michael Brown',
    schedule: 'Fri - 1:30 PM',
    progress: 80,
    grade: 'B',
    color: '#F44336',
  },
];

// Mock data for course details
const getMockAssignments = (courseId: string): Assignment[] => {
  return [
    {
      id: `${courseId}-a1`,
      title: 'Homework Assignment 1',
      dueDate: '2023-06-15',
      status: 'completed',
      grade: 'A-',
    },
    {
      id: `${courseId}-a2`,
      title: 'Term Paper',
      dueDate: '2023-06-20',
      status: 'pending',
    },
    {
      id: `${courseId}-a3`,
      title: 'Group Project',
      dueDate: '2023-06-10',
      status: 'overdue',
    },
    {
      id: `${courseId}-a4`,
      title: 'Quiz Preparation',
      dueDate: '2023-06-25',
      status: 'pending',
    },
  ];
};

const getMockMaterials = (courseId: string): Material[] => {
  return [
    {
      id: `${courseId}-m1`,
      title: 'Lecture Notes - Week 1',
      type: 'document',
      date: '2023-05-10',
    },
    {
      id: `${courseId}-m2`,
      title: 'Recorded Lecture',
      type: 'video',
      date: '2023-05-12',
    },
    {
      id: `${courseId}-m3`,
      title: 'Additional Resources',
      type: 'link',
      date: '2023-05-15',
    },
    {
      id: `${courseId}-m4`,
      title: 'Study Guide',
      type: 'document',
      date: '2023-05-20',
    },
  ];
};

export default function StudentCoursesScreen() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState<'assignments' | 'materials'>('assignments');

  // Filter courses based on search query
  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.teacher.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
  };

  const handleCloseDetails = () => {
    setSelectedCourse(null);
  };

  // Main course list view
  const renderCourseList = () => {
    return (
      <>
        <View style={styles.header}>
          <Text variant="h1" style={styles.title}>My Courses</Text>
          <Text variant="body" style={styles.subtitle}>
            View your enrolled courses and progress
          </Text>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search courses..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView style={styles.coursesContainer}>
          {filteredCourses.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="book-outline" size={48} color="#999" />
              <Text style={styles.emptyStateText}>No courses found</Text>
              <Text style={styles.emptyStateSubtext}>
                Try adjusting your search
              </Text>
            </View>
          ) : (
            filteredCourses.map((course) => (
              <TouchableOpacity
                key={course.id}
                style={styles.courseCard}
                onPress={() => handleSelectCourse(course)}
              >
                <Card style={styles.cardContent}>
                  <View style={[styles.courseColorBadge, { backgroundColor: course.color }]} />
                  <View style={styles.courseHeader}>
                    <Text variant="h2" style={styles.courseName}>
                      {course.name}
                    </Text>
                    <Text style={styles.courseTeacher}>
                      Teacher: {course.teacher}
                    </Text>
                  </View>

                  <View style={styles.courseProgress}>
                    <View style={styles.progressBarContainer}>
                      <View 
                        style={[
                          styles.progressBarFill, 
                          { width: `${course.progress}%`, backgroundColor: course.color }
                        ]} 
                      />
                    </View>
                    <Text style={styles.progressText}>{course.progress}% Complete</Text>
                  </View>

                  <View style={styles.courseDetails}>
                    <View style={styles.detailItem}>
                      <Ionicons name="time-outline" size={18} color="#666" />
                      <Text style={styles.detailText}>{course.schedule}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Ionicons name="school-outline" size={18} color="#666" />
                      <Text style={styles.detailText}>
                        Grade: {course.grade || 'N/A'}
                      </Text>
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
            ))
          )}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </>
    );
  };

  // Course details view
  const renderCourseDetails = () => {
    if (!selectedCourse) return null;

    const assignments = getMockAssignments(selectedCourse.id);
    const materials = getMockMaterials(selectedCourse.id);

    return (
      <View style={styles.container}>
        <View style={[styles.detailsHeader, { backgroundColor: selectedCourse.color }]}>
          <TouchableOpacity onPress={handleCloseDetails} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text variant="h1" style={styles.detailsTitle}>{selectedCourse.name}</Text>
          <Text variant="body" style={styles.detailsSubtitle}>
            Teacher: {selectedCourse.teacher}
          </Text>
        </View>

        <View style={styles.courseDetailsInfo}>
          <View style={styles.courseGradeContainer}>
            <Text style={styles.courseGradeLabel}>Current Grade</Text>
            <Text style={styles.courseGradeValue}>{selectedCourse.grade || 'N/A'}</Text>
          </View>
          <View style={styles.courseProgressContainer}>
            <Text style={styles.courseProgressLabel}>Progress</Text>
            <View style={styles.progressCircle}>
              <Text style={styles.progressCircleText}>{selectedCourse.progress}%</Text>
            </View>
          </View>
          <View style={styles.courseScheduleContainer}>
            <Text style={styles.courseScheduleLabel}>Schedule</Text>
            <Text style={styles.courseScheduleValue}>{selectedCourse.schedule}</Text>
          </View>
        </View>

        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'assignments' && styles.activeTab]}
            onPress={() => setActiveTab('assignments')}
          >
            <Text style={[styles.tabText, activeTab === 'assignments' && styles.activeTabText]}>
              Assignments
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'materials' && styles.activeTab]}
            onPress={() => setActiveTab('materials')}
          >
            <Text style={[styles.tabText, activeTab === 'materials' && styles.activeTabText]}>
              Materials
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.detailsContent}>
          {activeTab === 'assignments' && (
            <>
              <Text style={styles.sectionTitle}>Upcoming & Recent Assignments</Text>
              {assignments.map((assignment) => (
                <Card key={assignment.id} style={styles.assignmentCard}>
                  <View style={styles.assignmentHeader}>
                    <Text style={styles.assignmentTitle}>{assignment.title}</Text>
                    <View style={[styles.statusBadge, styles[`${assignment.status}Badge`]]}>
                      <Text style={styles.statusText}>
                        {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.assignmentDetails}>
                    <View style={styles.assignmentDetailItem}>
                      <Ionicons name="calendar-outline" size={16} color="#666" />
                      <Text style={styles.assignmentDetailText}>
                        Due: {new Date(assignment.dueDate).toLocaleDateString()}
                      </Text>
                    </View>
                    {assignment.grade && (
                      <View style={styles.assignmentDetailItem}>
                        <Ionicons name="ribbon-outline" size={16} color="#666" />
                        <Text style={styles.assignmentDetailText}>
                          Grade: {assignment.grade}
                        </Text>
                      </View>
                    )}
                  </View>
                </Card>
              ))}
            </>
          )}

          {activeTab === 'materials' && (
            <>
              <Text style={styles.sectionTitle}>Course Materials</Text>
              {materials.map((material) => (
                <Card key={material.id} style={styles.materialCard}>
                  <View style={styles.materialHeader}>
                    <View style={styles.materialTypeContainer}>
                      <Ionicons 
                        name={
                          material.type === 'document' ? 'document-text-outline' :
                          material.type === 'video' ? 'videocam-outline' : 'link-outline'
                        } 
                        size={24} 
                        color={selectedCourse.color} 
                      />
                    </View>
                    <View style={styles.materialInfo}>
                      <Text style={styles.materialTitle}>{material.title}</Text>
                      <Text style={styles.materialDate}>
                        Added: {new Date(material.date).toLocaleDateString()}
                      </Text>
                    </View>
                    <TouchableOpacity style={styles.downloadButton}>
                      <Ionicons name="download-outline" size={24} color="#666" />
                    </TouchableOpacity>
                  </View>
                </Card>
              ))}
            </>
          )}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {selectedCourse ? renderCourseDetails() : renderCourseList()}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(8),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchIcon: {
    marginRight: scale(8),
  },
  searchInput: {
    flex: 1,
    height: verticalScale(40),
    fontSize: scale(16),
  },
  clearButton: {
    padding: scale(4),
  },
  coursesContainer: {
    flex: 1,
    padding: scale(16),
  },
  courseCard: {
    marginBottom: scale(16),
  },
  cardContent: {
    padding: scale(16),
    position: 'relative',
    overflow: 'hidden',
  },
  courseColorBadge: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: scale(4),
  },
  courseHeader: {
    paddingLeft: scale(8),
    marginBottom: verticalScale(12),
  },
  courseName: {
    fontSize: scale(18),
    fontWeight: '600',
    color: '#333',
    marginBottom: verticalScale(4),
  },
  courseTeacher: {
    fontSize: scale(14),
    color: '#666',
  },
  courseProgress: {
    marginBottom: verticalScale(12),
  },
  progressBarContainer: {
    height: verticalScale(8),
    backgroundColor: '#e0e0e0',
    borderRadius: scale(4),
    marginBottom: verticalScale(4),
  },
  progressBarFill: {
    height: '100%',
    borderRadius: scale(4),
  },
  progressText: {
    fontSize: scale(12),
    color: '#666',
    textAlign: 'right',
  },
  courseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: scale(8),
    color: '#666',
    fontSize: scale(14),
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(40),
  },
  emptyStateText: {
    fontSize: scale(18),
    fontWeight: '600',
    color: '#666',
    marginTop: verticalScale(16),
  },
  emptyStateSubtext: {
    fontSize: scale(14),
    color: '#999',
    marginTop: verticalScale(8),
  },
  bottomSpacer: {
    height: verticalScale(40),
  },
  // Course Details Styles
  detailsHeader: {
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
  courseDetailsInfo: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  courseGradeContainer: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },
  courseGradeLabel: {
    fontSize: scale(12),
    color: '#666',
    marginBottom: verticalScale(4),
  },
  courseGradeValue: {
    fontSize: scale(24),
    fontWeight: 'bold',
    color: '#333',
  },
  courseProgressContainer: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },
  courseProgressLabel: {
    fontSize: scale(12),
    color: '#666',
    marginBottom: verticalScale(4),
  },
  progressCircle: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCircleText: {
    fontSize: scale(12),
    fontWeight: 'bold',
    color: '#333',
  },
  courseScheduleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  courseScheduleLabel: {
    fontSize: scale(12),
    color: '#666',
    marginBottom: verticalScale(4),
  },
  courseScheduleValue: {
    fontSize: scale(12),
    color: '#333',
    textAlign: 'center',
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
  sectionTitle: {
    fontSize: scale(18),
    fontWeight: '600',
    marginBottom: verticalScale(16),
    color: '#333',
  },
  assignmentCard: {
    marginBottom: scale(12),
    padding: scale(16),
  },
  assignmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(8),
  },
  assignmentTitle: {
    fontSize: scale(16),
    fontWeight: '500',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(4),
    borderRadius: scale(4),
  },
  completedBadge: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  pendingBadge: {
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
  },
  overdueBadge: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
  },
  statusText: {
    fontSize: scale(12),
    fontWeight: '500',
  },
  assignmentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  assignmentDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assignmentDetailText: {
    marginLeft: scale(8),
    color: '#666',
    fontSize: scale(12),
  },
  materialCard: {
    marginBottom: scale(12),
    padding: scale(16),
  },
  materialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  materialTypeContainer: {
    marginRight: scale(12),
  },
  materialInfo: {
    flex: 1,
  },
  materialTitle: {
    fontSize: scale(16),
    fontWeight: '500',
    marginBottom: verticalScale(4),
  },
  materialDate: {
    fontSize: scale(12),
    color: '#666',
  },
  downloadButton: {
    padding: scale(8),
  },
}); 