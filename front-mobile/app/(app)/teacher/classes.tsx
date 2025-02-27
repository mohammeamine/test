import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Text } from '../../../components/ui/Text';
import { Card } from '../../../components/ui/Card';
import { Ionicons } from '@expo/vector-icons';
import { scale, verticalScale } from '../../../utils/responsive';

// Define types
interface ClassItem {
  id: string;
  name: string;
  grade: string;
  schedule: string;
  students: number;
  room: string;
}

interface StudentItem {
  id: string;
  name: string;
  attendance: number;
  grade: string;
}

// Mock data for classes
const initialClasses: ClassItem[] = [
  {
    id: '1',
    name: 'Mathematics 101',
    grade: '10th Grade',
    schedule: 'Mon, Wed, Fri - 9:00 AM',
    students: 28,
    room: 'B-201',
  },
  {
    id: '2',
    name: 'Advanced Algebra',
    grade: '11th Grade',
    schedule: 'Tue, Thu - 11:30 AM',
    students: 22,
    room: 'A-105',
  },
  {
    id: '3',
    name: 'Geometry',
    grade: '9th Grade',
    schedule: 'Mon, Wed - 2:00 PM',
    students: 30,
    room: 'C-302',
  },
  {
    id: '4',
    name: 'Calculus',
    grade: '12th Grade',
    schedule: 'Tue, Thu - 10:00 AM',
    students: 18,
    room: 'B-204',
  },
  {
    id: '5',
    name: 'Statistics',
    grade: '11th Grade',
    schedule: 'Fri - 1:30 PM',
    students: 25,
    room: 'A-110',
  },
];

export default function TeacherClassesScreen() {
  const [classes, setClasses] = useState<ClassItem[]>(initialClasses);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);

  // Filter classes based on search query
  const filteredClasses = classes.filter(
    (classItem) =>
      classItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      classItem.grade.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectClass = (classItem: ClassItem) => {
    setSelectedClass(classItem);
  };

  const handleCloseDetails = () => {
    setSelectedClass(null);
  };

  return (
    <View style={styles.container}>
      {selectedClass ? (
        <ClassDetailsView classItem={selectedClass} onClose={handleCloseDetails} />
      ) : (
        <>
          <View style={styles.header}>
            <Text variant="h1" style={styles.title}>My Classes</Text>
            <Text variant="body" style={styles.subtitle}>
              Manage your classes and students
            </Text>
          </View>

          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search classes..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
                <Ionicons name="close-circle" size={20} color="#999" />
              </TouchableOpacity>
            )}
          </View>

          <ScrollView style={styles.classesContainer}>
            {filteredClasses.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="school-outline" size={48} color="#999" />
                <Text style={styles.emptyStateText}>No classes found</Text>
                <Text style={styles.emptyStateSubtext}>
                  Try adjusting your search
                </Text>
              </View>
            ) : (
              filteredClasses.map((classItem) => (
                <TouchableOpacity
                  key={classItem.id}
                  style={styles.classCard}
                  onPress={() => handleSelectClass(classItem)}
                >
                  <Card style={styles.cardContent}>
                    <View style={styles.classHeader}>
                      <Text variant="h2" style={styles.className}>
                        {classItem.name}
                      </Text>
                      <Ionicons name="chevron-forward" size={24} color="#2196F3" />
                    </View>

                    <View style={styles.classInfo}>
                      <View style={styles.infoItem}>
                        <Ionicons name="people-outline" size={18} color="#666" />
                        <Text style={styles.infoText}>{classItem.students} Students</Text>
                      </View>
                      <View style={styles.infoItem}>
                        <Ionicons name="school-outline" size={18} color="#666" />
                        <Text style={styles.infoText}>{classItem.grade}</Text>
                      </View>
                    </View>

                    <View style={styles.classInfo}>
                      <View style={styles.infoItem}>
                        <Ionicons name="time-outline" size={18} color="#666" />
                        <Text style={styles.infoText}>{classItem.schedule}</Text>
                      </View>
                      <View style={styles.infoItem}>
                        <Ionicons name="location-outline" size={18} color="#666" />
                        <Text style={styles.infoText}>Room {classItem.room}</Text>
                      </View>
                    </View>
                  </Card>
                </TouchableOpacity>
              ))
            )}
            <View style={styles.bottomSpacer} />
          </ScrollView>
        </>
      )}
    </View>
  );
}

// Class Details Sub-component
function ClassDetailsView({ classItem, onClose }: { classItem: ClassItem; onClose: () => void }) {
  // Mock data for students
  const students: StudentItem[] = Array(classItem.students).fill(0).map((_, i) => ({
    id: `s${i + 1}`,
    name: `Student ${i + 1}`,
    attendance: Math.floor(Math.random() * 30) + 70, // Random attendance between 70-100%
    grade: ['A', 'B+', 'B', 'C+', 'C'][Math.floor(Math.random() * 5)], // Random grade
  }));

  const [activeTab, setActiveTab] = useState('students');

  return (
    <View style={styles.container}>
      <View style={styles.detailsHeader}>
        <TouchableOpacity onPress={onClose} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text variant="h1" style={styles.detailsTitle}>{classItem.name}</Text>
        <Text variant="body" style={styles.detailsSubtitle}>{classItem.grade}</Text>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'students' && styles.activeTab]}
          onPress={() => setActiveTab('students')}
        >
          <Text style={[styles.tabText, activeTab === 'students' && styles.activeTabText]}>
            Students
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'assignments' && styles.activeTab]}
          onPress={() => setActiveTab('assignments')}
        >
          <Text style={[styles.tabText, activeTab === 'assignments' && styles.activeTabText]}>
            Assignments
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'schedule' && styles.activeTab]}
          onPress={() => setActiveTab('schedule')}
        >
          <Text style={[styles.tabText, activeTab === 'schedule' && styles.activeTabText]}>
            Schedule
          </Text>
        </TouchableOpacity>
      </View>

      <Card style={styles.infoCard}>
        <View style={styles.classDetailsInfo}>
          <View style={styles.detailsInfoItem}>
            <Ionicons name="people-outline" size={20} color="#2196F3" />
            <Text style={styles.detailsInfoText}>{classItem.students} Students</Text>
          </View>
          <View style={styles.detailsInfoItem}>
            <Ionicons name="time-outline" size={20} color="#2196F3" />
            <Text style={styles.detailsInfoText}>{classItem.schedule}</Text>
          </View>
          <View style={styles.detailsInfoItem}>
            <Ionicons name="location-outline" size={20} color="#2196F3" />
            <Text style={styles.detailsInfoText}>Room {classItem.room}</Text>
          </View>
        </View>
      </Card>

      <ScrollView style={styles.detailsContent}>
        {activeTab === 'students' && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Student List</Text>
              <TouchableOpacity style={styles.addButton}>
                <Ionicons name="add" size={20} color="#fff" />
                <Text style={styles.addButtonText}>Add Student</Text>
              </TouchableOpacity>
            </View>
            
            {students.map((student) => (
              <Card key={student.id} style={styles.studentCard}>
                <View style={styles.studentInfo}>
                  <View style={styles.studentAvatar}>
                    <Text style={styles.studentAvatarText}>
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </Text>
                  </View>
                  <View style={styles.studentDetails}>
                    <Text style={styles.studentName}>{student.name}</Text>
                    <View style={styles.studentStats}>
                      <Text style={styles.studentStat}>
                        Attendance: {student.attendance}%
                      </Text>
                      <Text style={styles.studentStat}>
                        Grade: {student.grade}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.moreButton}>
                    <Ionicons name="ellipsis-vertical" size={20} color="#666" />
                  </TouchableOpacity>
                </View>
              </Card>
            ))}
          </>
        )}

        {activeTab === 'assignments' && (
          <View style={styles.emptyTabContent}>
            <Ionicons name="document-text-outline" size={48} color="#999" />
            <Text style={styles.emptyTabTitle}>No Assignments Yet</Text>
            <Text style={styles.emptyTabSubtitle}>
              Create assignments for this class
            </Text>
            <TouchableOpacity style={styles.emptyTabButton}>
              <Text style={styles.emptyTabButtonText}>Add Assignment</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === 'schedule' && (
          <View style={styles.emptyTabContent}>
            <Ionicons name="calendar-outline" size={48} color="#999" />
            <Text style={styles.emptyTabTitle}>Class Schedule</Text>
            <Text style={styles.emptyTabSubtitle}>
              {classItem.schedule}
            </Text>
            <Card style={styles.scheduleCard}>
              <Text style={styles.scheduleTitle}>Schedule Details</Text>
              <Text style={styles.scheduleText}>
                This class meets on the days and times shown above in Room {classItem.room}.
              </Text>
            </Card>
          </View>
        )}
        
        <View style={styles.bottomSpacer} />
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
  classesContainer: {
    flex: 1,
    padding: scale(16),
  },
  classCard: {
    marginBottom: scale(16),
  },
  cardContent: {
    padding: scale(16),
  },
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  className: {
    fontSize: scale(18),
    fontWeight: '600',
    color: '#2196F3',
  },
  classInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(8),
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
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
  // Class Details Styles
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
  infoCard: {
    margin: scale(16),
    marginTop: scale(8),
    marginBottom: scale(8),
  },
  classDetailsInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: scale(12),
  },
  detailsInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsInfoText: {
    marginLeft: scale(8),
    fontSize: scale(14),
    color: '#333',
  },
  detailsContent: {
    flex: 1,
    padding: scale(16),
    paddingTop: scale(0),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: verticalScale(16),
  },
  sectionTitle: {
    fontSize: scale(18),
    fontWeight: '600',
    color: '#333',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
    borderRadius: scale(4),
  },
  addButtonText: {
    color: '#fff',
    marginLeft: scale(4),
    fontWeight: '500',
  },
  studentCard: {
    marginBottom: scale(12),
  },
  studentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(12),
  },
  studentAvatar: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },
  studentAvatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: scale(16),
  },
  studentDetails: {
    flex: 1,
  },
  studentName: {
    fontSize: scale(16),
    fontWeight: '500',
    marginBottom: verticalScale(4),
  },
  studentStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  studentStat: {
    fontSize: scale(14),
    color: '#666',
  },
  moreButton: {
    padding: scale(8),
  },
  emptyTabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(40),
  },
  emptyTabTitle: {
    fontSize: scale(18),
    fontWeight: '600',
    color: '#333',
    marginTop: verticalScale(16),
  },
  emptyTabSubtitle: {
    fontSize: scale(14),
    color: '#666',
    marginTop: verticalScale(8),
    textAlign: 'center',
  },
  emptyTabButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(8),
    borderRadius: scale(4),
    marginTop: verticalScale(16),
  },
  emptyTabButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  scheduleCard: {
    marginTop: verticalScale(16),
    padding: scale(16),
    width: '100%',
  },
  scheduleTitle: {
    fontSize: scale(16),
    fontWeight: '600',
    marginBottom: verticalScale(8),
  },
  scheduleText: {
    fontSize: scale(14),
    color: '#666',
    lineHeight: scale(20),
  },
}); 