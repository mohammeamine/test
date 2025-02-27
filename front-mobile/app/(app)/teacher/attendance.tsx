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
  students: number;
}

interface Student {
  id: string;
  name: string;
  present: boolean | null;
  streak: number;
  attendance: number; // percentage
}

interface AttendanceRecord {
  date: string;
  classId: string;
  students: { [key: string]: boolean };
}

// Mock data
const classes: ClassItem[] = [
  { id: '1', name: 'Mathematics 101', grade: '10th Grade', students: 28 },
  { id: '2', name: 'Advanced Algebra', grade: '11th Grade', students: 22 },
  { id: '3', name: 'Geometry', grade: '9th Grade', students: 30 },
  { id: '4', name: 'Calculus', grade: '12th Grade', students: 18 },
  { id: '5', name: 'Statistics', grade: '11th Grade', students: 25 },
];

// Generate mock students for a class
const generateStudents = (count: number): Student[] => {
  return Array(count)
    .fill(0)
    .map((_, i) => ({
      id: `s${i + 1}`,
      name: `Student ${i + 1}`,
      present: null,
      streak: Math.floor(Math.random() * 10),
      attendance: Math.floor(Math.random() * 30) + 70, // 70-100%
    }));
};

// Format date to readable string
const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('en-US', options);
};

export default function TeacherAttendanceScreen() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Date navigation
  const goToPrevDay = () => {
    const prevDay = new Date(selectedDate);
    prevDay.setDate(prevDay.getDate() - 1);
    setSelectedDate(prevDay);
  };

  const goToNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setSelectedDate(nextDay);
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  // Select a class to take attendance
  const handleSelectClass = (classItem: ClassItem) => {
    setSelectedClass(classItem);
    setStudents(generateStudents(classItem.students));
  };

  // Mark student as present or absent
  const markAttendance = (studentId: string, present: boolean) => {
    setStudents(
      students.map((student) =>
        student.id === studentId ? { ...student, present } : student
      )
    );
  };

  // Filter students based on search
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Save attendance (mock function)
  const saveAttendance = () => {
    // Here you would normally save to a backend
    console.log('Saving attendance for', selectedClass?.name, 'on', formatDate(selectedDate));
    console.log('Attendance data:', students);
    
    // Show all students as saved
    setStudents(
      students.map((student) => ({
        ...student,
        // If attendance wasn't marked, default to absent
        present: student.present === null ? false : student.present,
      }))
    );
    
    // For demo purposes, return to class selection
    setSelectedClass(null);
  };

  return (
    <View style={styles.container}>
      {/* Date Selection Header */}
      <View style={styles.dateHeader}>
        <View style={styles.dateControls}>
          <TouchableOpacity style={styles.dateButton} onPress={goToPrevDay}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.todayButton} onPress={goToToday}>
            <Text style={styles.todayButtonText}>Today</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dateButton} onPress={goToNextDay}>
            <Ionicons name="chevron-forward" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
      </View>

      {/* Class Selection or Attendance Taking */}
      {!selectedClass ? (
        <ScrollView style={styles.classListContainer}>
          <Text style={styles.sectionTitle}>Select a Class</Text>
          {classes.map((classItem) => (
            <TouchableOpacity
              key={classItem.id}
              style={styles.classCard}
              onPress={() => handleSelectClass(classItem)}
            >
              <Card style={styles.cardContent}>
                <View style={styles.classInfo}>
                  <Text style={styles.className}>{classItem.name}</Text>
                  <Text style={styles.classGrade}>{classItem.grade}</Text>
                </View>
                <View style={styles.classDetails}>
                  <View style={styles.classDetailItem}>
                    <Ionicons name="people-outline" size={18} color="#666" />
                    <Text style={styles.detailText}>{classItem.students} Students</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={24} color="#2196F3" />
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.attendanceContainer}>
          <View style={styles.attendanceHeader}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => setSelectedClass(null)}
            >
              <Ionicons name="arrow-back" size={24} color="#2196F3" />
            </TouchableOpacity>
            <View style={styles.attendanceHeaderInfo}>
              <Text style={styles.attendanceClassName}>{selectedClass.name}</Text>
              <Text style={styles.attendanceClassGrade}>{selectedClass.grade}</Text>
            </View>
          </View>

          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search students..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
                <Ionicons name="close-circle" size={20} color="#999" />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.attendanceStatsCard}>
            <Card style={styles.statsContent}>
              <View style={styles.statsGrid}>
                <View style={styles.statsItem}>
                  <Text style={styles.statsValue}>
                    {students.filter((s) => s.present === true).length}
                  </Text>
                  <Text style={styles.statsLabel}>Present</Text>
                </View>
                <View style={styles.statsItem}>
                  <Text style={styles.statsValue}>
                    {students.filter((s) => s.present === false).length}
                  </Text>
                  <Text style={styles.statsLabel}>Absent</Text>
                </View>
                <View style={styles.statsItem}>
                  <Text style={styles.statsValue}>
                    {students.filter((s) => s.present === null).length}
                  </Text>
                  <Text style={styles.statsLabel}>Unmarked</Text>
                </View>
              </View>
            </Card>
          </View>

          <ScrollView style={styles.studentList}>
            {filteredStudents.map((student) => (
              <Card key={student.id} style={styles.studentCard}>
                <View style={styles.studentInfo}>
                  <View style={styles.studentNameSection}>
                    <View style={styles.studentAvatar}>
                      <Text style={styles.studentAvatarText}>
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.studentName}>{student.name}</Text>
                      <View style={styles.studentStats}>
                        <Text style={styles.studentStat}>
                          Overall: {student.attendance}%
                        </Text>
                        <Text style={styles.studentStat}>
                          Streak: {student.streak} days
                        </Text>
                      </View>
                    </View>
                  </View>
                  
                  <View style={styles.attendanceButtons}>
                    <TouchableOpacity
                      style={[
                        styles.attendanceButton,
                        styles.presentButton,
                        student.present === true && styles.activeButton,
                      ]}
                      onPress={() => markAttendance(student.id, true)}
                    >
                      <Ionicons
                        name={student.present === true ? "checkmark-circle" : "checkmark-circle-outline"}
                        size={24}
                        color={student.present === true ? "#fff" : "#4CAF50"}
                      />
                      <Text style={[
                        styles.attendanceButtonText,
                        student.present === true && styles.activeButtonText,
                      ]}>
                        Present
                      </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={[
                        styles.attendanceButton,
                        styles.absentButton,
                        student.present === false && styles.activeAbsentButton,
                      ]}
                      onPress={() => markAttendance(student.id, false)}
                    >
                      <Ionicons
                        name={student.present === false ? "close-circle" : "close-circle-outline"}
                        size={24}
                        color={student.present === false ? "#fff" : "#F44336"}
                      />
                      <Text style={[
                        styles.attendanceButtonText,
                        student.present === false && styles.activeButtonText,
                      ]}>
                        Absent
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Card>
            ))}
          </ScrollView>

          <TouchableOpacity style={styles.saveButton} onPress={saveAttendance}>
            <Ionicons name="save-outline" size={20} color="#fff" />
            <Text style={styles.saveButtonText}>Save Attendance</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  dateHeader: {
    backgroundColor: '#2196F3',
    padding: scale(16),
    alignItems: 'center',
  },
  dateControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(8),
  },
  dateButton: {
    padding: scale(8),
  },
  todayButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(6),
    borderRadius: scale(20),
    marginHorizontal: scale(8),
  },
  todayButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  dateText: {
    color: '#fff',
    fontSize: scale(18),
    fontWeight: '500',
  },
  classListContainer: {
    flex: 1,
    padding: scale(16),
  },
  sectionTitle: {
    fontSize: scale(18),
    fontWeight: '600',
    marginVertical: verticalScale(16),
    color: '#333',
  },
  classCard: {
    marginBottom: scale(12),
  },
  cardContent: {
    padding: scale(16),
  },
  classInfo: {
    marginBottom: verticalScale(8),
  },
  className: {
    fontSize: scale(18),
    fontWeight: '600',
    color: '#2196F3',
    marginBottom: verticalScale(4),
  },
  classGrade: {
    fontSize: scale(14),
    color: '#666',
  },
  classDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  classDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: scale(8),
    color: '#666',
    fontSize: scale(14),
  },
  // Attendance taking styles
  attendanceContainer: {
    flex: 1,
  },
  attendanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: scale(8),
    marginRight: scale(12),
  },
  attendanceHeaderInfo: {
    flex: 1,
  },
  attendanceClassName: {
    fontSize: scale(18),
    fontWeight: '600',
    color: '#333',
  },
  attendanceClassGrade: {
    fontSize: scale(14),
    color: '#666',
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
  attendanceStatsCard: {
    padding: scale(16),
    paddingBottom: 0,
  },
  statsContent: {
    padding: scale(16),
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statsItem: {
    alignItems: 'center',
    flex: 1,
  },
  statsValue: {
    fontSize: scale(24),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: verticalScale(4),
  },
  statsLabel: {
    fontSize: scale(14),
    color: '#666',
  },
  studentList: {
    flex: 1,
    padding: scale(16),
  },
  studentCard: {
    marginBottom: scale(12),
  },
  studentInfo: {
    padding: scale(12),
  },
  studentNameSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(12),
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
    fontSize: scale(14),
  },
  studentName: {
    fontSize: scale(16),
    fontWeight: '500',
    marginBottom: verticalScale(2),
  },
  studentStats: {
    flexDirection: 'row',
  },
  studentStat: {
    fontSize: scale(12),
    color: '#666',
    marginRight: scale(12),
  },
  attendanceButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  attendanceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(12),
    borderRadius: scale(4),
    flex: 1,
    marginHorizontal: scale(4),
    borderWidth: 1,
  },
  presentButton: {
    borderColor: '#4CAF50',
    backgroundColor: 'transparent',
  },
  absentButton: {
    borderColor: '#F44336',
    backgroundColor: 'transparent',
  },
  activeButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  activeAbsentButton: {
    backgroundColor: '#F44336',
    borderColor: '#F44336',
  },
  attendanceButtonText: {
    marginLeft: scale(8),
    fontWeight: '500',
  },
  activeButtonText: {
    color: '#fff',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
    padding: scale(16),
    marginTop: verticalScale(16),
  },
  saveButtonText: {
    color: '#fff',
    fontSize: scale(16),
    fontWeight: '600',
    marginLeft: scale(8),
  },
}); 