import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Text } from '../../../components/ui/Text';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Ionicons } from '@expo/vector-icons';
import { NAVIGATION_THEME } from '../../../navigation/constants';
import { scale, verticalScale } from '../../../utils/responsive';

export default function AssignmentsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pending' | 'submitted'>('all');

  // Mock data - Replace with actual API calls
  const assignments = [
    {
      id: '1',
      title: 'Mathematics Assignment 1',
      subject: 'Mathematics',
      dueDate: '2024-03-15',
      status: 'pending',
      description: 'Complete exercises 1-10 from Chapter 3',
    },
    {
      id: '2',
      title: 'Physics Lab Report',
      subject: 'Physics',
      dueDate: '2024-03-20',
      status: 'submitted',
      description: 'Write a detailed report on the pendulum experiment',
    },
  ];

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || assignment.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const renderAssignmentCard = (assignment: typeof assignments[0]) => (
    <Card key={assignment.id} style={styles.assignmentCard}>
      <View style={styles.assignmentHeader}>
        <Text style={styles.assignmentTitle}>{assignment.title}</Text>
        <View style={[
          styles.statusBadge,
          { backgroundColor: assignment.status === 'submitted' ? '#4CAF50' : '#FFA726' }
        ]}>
          <Text style={styles.statusText}>
            {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
          </Text>
        </View>
      </View>
      
      <Text style={styles.subject}>{assignment.subject}</Text>
      <Text style={styles.description}>{assignment.description}</Text>
      
      <View style={styles.footer}>
        <Text style={styles.dueDate}>Due: {assignment.dueDate}</Text>
        {assignment.status === 'pending' && (
          <Button
            title="Submit"
            onPress={() => {/* Handle submission */}}
            style={styles.submitButton}
          >
            Submit
          </Button>
        )}
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search assignments..."
            style={styles.searchInput}
          />
        </View>
        
        <View style={styles.filterContainer}>
          {(['all', 'pending', 'submitted'] as const).map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                selectedFilter === filter && styles.filterButtonActive
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text style={[
                styles.filterText,
                selectedFilter === filter && styles.filterTextActive
              ]}>
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView style={styles.content}>
        {filteredAssignments.map(renderAssignmentCard)}
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
    padding: NAVIGATION_THEME.spacing.md,
    backgroundColor: NAVIGATION_THEME.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: NAVIGATION_THEME.colors.border,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: NAVIGATION_THEME.colors.surfaceVariant,
    borderRadius: NAVIGATION_THEME.shape.small,
    padding: NAVIGATION_THEME.spacing.sm,
  },
  searchIcon: {
    marginRight: NAVIGATION_THEME.spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: scale(14),
  },
  filterContainer: {
    flexDirection: 'row',
    marginTop: NAVIGATION_THEME.spacing.md,
    gap: NAVIGATION_THEME.spacing.sm,
  },
  filterButton: {
    paddingVertical: NAVIGATION_THEME.spacing.sm,
    paddingHorizontal: NAVIGATION_THEME.spacing.md,
    borderRadius: NAVIGATION_THEME.shape.small,
    backgroundColor: NAVIGATION_THEME.colors.surfaceVariant,
  },
  filterButtonActive: {
    backgroundColor: NAVIGATION_THEME.colors.primary,
  },
  filterText: {
    color: NAVIGATION_THEME.colors.onSurfaceVariant,
  },
  filterTextActive: {
    color: NAVIGATION_THEME.colors.surface,
  },
  content: {
    flex: 1,
    padding: NAVIGATION_THEME.spacing.md,
  },
  assignmentCard: {
    marginBottom: NAVIGATION_THEME.spacing.md,
    padding: NAVIGATION_THEME.spacing.md,
  },
  assignmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: NAVIGATION_THEME.spacing.sm,
  },
  assignmentTitle: {
    fontSize: scale(16),
    fontWeight: '600',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: NAVIGATION_THEME.spacing.sm,
    paddingVertical: NAVIGATION_THEME.spacing.xs,
    borderRadius: NAVIGATION_THEME.shape.extraSmall,
  },
  statusText: {
    color: '#fff',
    fontSize: scale(12),
  },
  subject: {
    fontSize: scale(14),
    color: NAVIGATION_THEME.colors.onSurfaceVariant,
    marginBottom: NAVIGATION_THEME.spacing.sm,
  },
  description: {
    fontSize: scale(14),
    marginBottom: NAVIGATION_THEME.spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dueDate: {
    fontSize: scale(14),
    color: NAVIGATION_THEME.colors.onSurfaceVariant,
  },
  submitButton: {
    paddingHorizontal: NAVIGATION_THEME.spacing.md,
  },
}); 