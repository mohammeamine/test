import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text } from '../../../components/ui/Text';
import { Card } from '../../../components/ui/Card';
import { Ionicons } from '@expo/vector-icons';
import { NAVIGATION_THEME } from '../../../navigation/constants';
import { scale, verticalScale } from '../../../utils/responsive';

export default function TeacherAssignments() {
  const [activeSection, setActiveSection] = useState<'Create' | 'Assignments' | 'Exams' | 'Projects'>('Create');
  const [formData, setFormData] = useState({
    evaluationType: '',
    courseTitle: '',
    instructions: '',
    assignmentDate: '',
    dueDate: '',
    possiblePoints: '',
    attachments: [],
  });

  // Color palette
  const colors = {
    primary: '#4361ee',
    secondary: '#3f37c9',
    accent: '#4cc9f0',
    warning: '#f72585',
    success: '#4CAF50',
    background: '#f8f9fa',
    surface: '#ffffff',
    text: '#212529',
    textSecondary: '#6c757d',
    border: '#e0e0e0',
  };

  const assignments = [
    { id: '1', title: 'Calculus Quiz #3', course: 'Mathematics 101', dueDate: 'Mar 15, 2024', submitted: '18/24', status: 'Grade', priority: 'High' },
    { id: '2', title: 'Lab Report #2', course: 'Physics 201', dueDate: 'Mar 20, 2024', submitted: '22/22', status: 'Details', priority: 'Medium' },
    { id: '3', title: 'Literary Analysis Essay', course: 'English Literature', dueDate: 'Mar 18, 2024', submitted: '15/26', status: 'Grade', priority: 'Low' },
  ];

  const exams = [
    { id: '1', title: 'Midterm Exam', course: 'Physics 201', date: 'Mar 25, 2024', type: 'Exam' },
    { id: '2', title: 'Quiz #1', course: 'Mathematics 101', date: 'Mar 30, 2024', type: 'Quiz' },
  ];

  const projects = [
    { id: '1', title: 'Final Project', course: 'English Literature', date: 'Apr 10, 2024', type: 'Project' },
    { id: '2', title: 'Unit Test', course: 'Mathematics 101', date: 'Apr 5, 2024', type: 'Test' },
  ];

  const handleFormSubmit = () => {
    console.log('Form Data Submitted:', formData);
    // Add logic to handle form submission
  };

  const renderCreateSection = () => (
    <View style={styles.createSection}>
      <Text variant="h2" style={styles.sectionTitle}>Create Assignment</Text>
      <TextInput
        style={styles.input}
        placeholder="Evaluation Type (e.g., Assignment, Quiz, Exam, Project)"
        value={formData.evaluationType}
        onChangeText={(text) => setFormData({ ...formData, evaluationType: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Course Title"
        value={formData.courseTitle}
        onChangeText={(text) => setFormData({ ...formData, courseTitle: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Instructions"
        value={formData.instructions}
        onChangeText={(text) => setFormData({ ...formData, instructions: text })}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Assignment Date"
        value={formData.assignmentDate}
        onChangeText={(text) => setFormData({ ...formData, assignmentDate: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Due Date"
        value={formData.dueDate}
        onChangeText={(text) => setFormData({ ...formData, dueDate: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Possible Points"
        value={formData.possiblePoints}
        onChangeText={(text) => setFormData({ ...formData, possiblePoints: text })}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.uploadButton}>
        <Text style={styles.uploadButtonText}>Upload Attachments</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.submitButton} onPress={handleFormSubmit}>
        <Text style={styles.submitButtonText}>Create and Assign</Text>
      </TouchableOpacity>
    </View>
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return colors.warning;
      case 'Medium':
        return colors.accent;
      case 'Low':
        return colors.success;
      default:
        return colors.textSecondary;
    }
  };

  const renderAssignmentCard = (assignment: { id: string; title: string; course: string; dueDate: string; submitted: string; status: string; priority: string }) => (
    <Card key={assignment.id} style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleContainer}>
          <Ionicons name="document-text-outline" size={scale(20)} color={colors.primary} style={styles.cardIcon} />
          <Text style={styles.cardTitle}>{assignment.title}</Text>
        </View>
        <View style={[styles.priorityIndicator, { backgroundColor: getPriorityColor(assignment.priority) }]}>
          <Text style={styles.priorityText}>{assignment.priority}</Text>
        </View>
      </View>
      <Text style={styles.courseText}>{assignment.course}</Text>
      <View style={styles.cardDetailsContainer}>
        <View style={styles.detailItem}>
          <Ionicons name="calendar-outline" size={scale(16)} color={colors.textSecondary} />
          <Text style={styles.detailText}>Due: {assignment.dueDate}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="people-outline" size={scale(16)} color={colors.textSecondary} />
          <Text style={styles.detailText}>{assignment.submitted}</Text>
        </View>
      </View>
      <TouchableOpacity 
        style={[styles.actionButton, { backgroundColor: assignment.status === 'Grade' ? colors.primary : colors.accent }]}
      >
        <Text style={styles.actionButtonText}>{assignment.status}</Text>
      </TouchableOpacity>
    </Card>
  );

  const renderExamCard = (exam: { id: string; title: string; course: string; date: string; type: string }) => (
    <Card key={exam.id} style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleContainer}>
          <Ionicons name="clipboard-outline" size={scale(20)} color={colors.secondary} style={styles.cardIcon} />
          <Text style={styles.cardTitle}>{exam.title}</Text>
        </View>
        <View style={[styles.typeIndicator, { backgroundColor: colors.secondary }]}>
          <Text style={styles.typeText}>{exam.type}</Text>
        </View>
      </View>
      <Text style={styles.courseText}>{exam.course}</Text>
      <View style={styles.cardDetailsContainer}>
        <View style={styles.detailItem}>
          <Ionicons name="calendar-outline" size={scale(16)} color={colors.textSecondary} />
          <Text style={styles.detailText}>Date: {exam.date}</Text>
        </View>
      </View>
      <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.secondary }]}>
        <Text style={styles.actionButtonText}>View Details</Text>
      </TouchableOpacity>
    </Card>
  );

  const renderProjectCard = (project: { id: string; title: string; course: string; date: string; type: string }) => (
    <Card key={project.id} style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleContainer}>
          <Ionicons name="folder-outline" size={scale(20)} color={colors.accent} style={styles.cardIcon} />
          <Text style={styles.cardTitle}>{project.title}</Text>
        </View>
        <View style={[styles.typeIndicator, { backgroundColor: colors.accent }]}>
          <Text style={styles.typeText}>{project.type}</Text>
        </View>
      </View>
      <Text style={styles.courseText}>{project.course}</Text>
      <View style={styles.cardDetailsContainer}>
        <View style={styles.detailItem}>
          <Ionicons name="calendar-outline" size={scale(16)} color={colors.textSecondary} />
          <Text style={styles.detailText}>Date: {project.date}</Text>
        </View>
      </View>
      <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.accent }]}>
        <Text style={styles.actionButtonText}>View Details</Text>
      </TouchableOpacity>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="h1" style={styles.title}>Assignment Management</Text>
        <Text variant="body" style={styles.subtitle}>
          Create, assign, and manage evaluations for your classes
        </Text>
      </View>
      
      {/* Tab Container */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={styles.tab} 
          onPress={() => setActiveSection('Create')}
        >
          <Ionicons 
            name="add-circle-outline" 
            size={scale(20)} 
            color={activeSection === 'Create' ? colors.primary : colors.textSecondary} 
          />
          <Text style={[
            styles.tabText, 
            activeSection === 'Create' && styles.activeTabText,
            activeSection === 'Create' && { color: colors.primary }
          ]}>
            Create
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tab} 
          onPress={() => setActiveSection('Assignments')}
        >
          <Ionicons 
            name="document-text-outline" 
            size={scale(20)} 
            color={activeSection === 'Assignments' ? colors.primary : colors.textSecondary} 
          />
          <Text style={[
            styles.tabText, 
            activeSection === 'Assignments' && styles.activeTabText,
            activeSection === 'Assignments' && { color: colors.primary }
          ]}>
            Assignments
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tab} 
          onPress={() => setActiveSection('Exams')}
        >
          <Ionicons 
            name="clipboard-outline" 
            size={scale(20)} 
            color={activeSection === 'Exams' ? colors.primary : colors.textSecondary}
          />
          <Text style={[
            styles.tabText, 
            activeSection === 'Exams' && styles.activeTabText,
            activeSection === 'Exams' && { color: colors.primary }
          ]}>
            Exams
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tab} 
          onPress={() => setActiveSection('Projects')}
        >
          <Ionicons 
            name="folder-outline" 
            size={scale(20)} 
            color={activeSection === 'Projects' ? colors.primary : colors.textSecondary}
          />
          <Text style={[
            styles.tabText, 
            activeSection === 'Projects' && styles.activeTabText,
            activeSection === 'Projects' && { color: colors.primary }
          ]}>
            Projects
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        {activeSection === 'Create' && renderCreateSection()}
        {activeSection === 'Assignments' && assignments.map(renderAssignmentCard)}
        {activeSection === 'Exams' && exams.map(renderExamCard)}
        {activeSection === 'Projects' && projects.map(renderProjectCard)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
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
    color: '#333',
  },
  subtitle: {
    color: '#666',
    fontSize: scale(14),
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tab: {
    alignItems: 'center',
    paddingVertical: scale(8),
    paddingHorizontal: scale(12),
  },
  tabText: {
    fontSize: scale(14),
    color: '#666',
    marginTop: verticalScale(4),
  },
  activeTabText: {
    fontWeight: '700',
  },
  createSection: {
    padding: scale(16),
    backgroundColor: '#fff',
    marginBottom: scale(12),
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: scale(18),
    fontWeight: '600',
    marginBottom: scale(12),
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 6,
    padding: scale(10),
    marginBottom: scale(12),
    fontSize: scale(14),
  },
  uploadButton: {
    backgroundColor: '#f0f0f0',
    padding: scale(12),
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: scale(12),
  },
  uploadButtonText: {
    color: '#666',
    fontSize: scale(14),
  },
  submitButton: {
    backgroundColor: '#4361ee',
    padding: scale(12),
    borderRadius: 6,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: scale(14),
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: scale(12),
  },
  card: {
    marginBottom: scale(12),
    padding: scale(16),
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: scale(8),
  },
  cardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardIcon: {
    marginRight: scale(8),
  },
  cardTitle: {
    fontSize: scale(16),
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  priorityIndicator: {
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
    borderRadius: 4,
    marginLeft: scale(8),
  },
  priorityText: {
    color: '#fff',
    fontSize: scale(12),
    fontWeight: '600',
  },
  typeIndicator: {
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
    borderRadius: 4,
    marginLeft: scale(8),
  },
  typeText: {
    color: '#fff',
    fontSize: scale(12),
    fontWeight: '600',
  },
  courseText: {
    fontSize: scale(14),
    color: '#666',
    marginBottom: scale(12),
  },
  cardDetailsContainer: {
    marginBottom: scale(12),
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(6),
  },
  detailText: {
    fontSize: scale(14),
    color: '#666',
    marginLeft: scale(8),
  },
  actionButton: {
    padding: scale(10),
    borderRadius: 6,
    alignItems: 'center',
    marginTop: scale(4),
  },
  actionButtonText: {
    color: '#fff',
    fontSize: scale(14),
    fontWeight: '600',
  },
});