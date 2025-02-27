import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Text } from '../../../components/ui/Text';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Ionicons } from '@expo/vector-icons';
import { scale, verticalScale } from '../../../utils/responsive';

interface ReportCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
}

interface Report {
  id: string;
  title: string;
  description: string;
  category: string;
  lastGenerated?: string;
  format: 'PDF' | 'Excel' | 'CSV';
}

// Report categories
const reportCategories: ReportCategory[] = [
  { id: 'all', title: 'All Reports', icon: 'documents-outline', color: '#2196F3' },
  { id: 'academic', title: 'Academic', icon: 'school-outline', color: '#4CAF50' },
  { id: 'attendance', title: 'Attendance', icon: 'calendar-outline', color: '#FF9800' },
  { id: 'financial', title: 'Financial', icon: 'cash-outline', color: '#9C27B0' },
  { id: 'system', title: 'System', icon: 'settings-outline', color: '#607D8B' },
];

// Sample reports data
const reportsList: Report[] = [
  {
    id: '1',
    title: 'Student Performance Report',
    description: 'Comprehensive report on student grades and performance metrics',
    category: 'academic',
    lastGenerated: '2023-12-15',
    format: 'PDF',
  },
  {
    id: '2',
    title: 'Class Attendance Summary',
    description: 'Summary of attendance patterns across all classes',
    category: 'attendance',
    lastGenerated: '2023-12-20',
    format: 'Excel',
  },
  {
    id: '3',
    title: 'Teacher Performance Analysis',
    description: 'Analysis of teacher performance based on student outcomes',
    category: 'academic',
    lastGenerated: '2023-12-10',
    format: 'PDF',
  },
  {
    id: '4',
    title: 'Fee Collection Status',
    description: 'Status report on tuition fee collection',
    category: 'financial',
    lastGenerated: '2023-12-18',
    format: 'Excel',
  },
  {
    id: '5',
    title: 'System Access Logs',
    description: 'Logs of user access and activity in the system',
    category: 'system',
    lastGenerated: '2023-12-21',
    format: 'CSV',
  },
  {
    id: '6',
    title: 'Student Enrollment Trends',
    description: 'Analysis of enrollment trends over time',
    category: 'academic',
    lastGenerated: '2023-12-05',
    format: 'PDF',
  },
  {
    id: '7',
    title: 'Teacher Attendance Record',
    description: 'Detailed record of teacher attendance',
    category: 'attendance',
    format: 'Excel',
  },
  {
    id: '8',
    title: 'Financial Year Summary',
    description: 'Summary of all financial transactions for the academic year',
    category: 'financial',
    lastGenerated: '2023-12-01',
    format: 'Excel',
  },
];

export default function AdminReports() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Filter reports based on selected category
  const filteredReports = selectedCategory === 'all' 
    ? reportsList
    : reportsList.filter(report => report.category === selectedCategory);

  // Get icon for report format
  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'PDF': return 'document-text-outline';
      case 'Excel': return 'grid-outline';
      case 'CSV': return 'list-outline';
      default: return 'document-outline';
    }
  };

  // Get color for report format
  const getFormatColor = (format: string) => {
    switch (format) {
      case 'PDF': return '#F44336';
      case 'Excel': return '#4CAF50';
      case 'CSV': return '#2196F3';
      default: return '#757575';
    }
  };

  // Render a report card
  const renderReportCard = ({ item }: { item: Report }) => (
    <Card style={styles.reportCard}>
      <View style={styles.reportHeader}>
        <View style={[styles.formatIcon, { backgroundColor: `${getFormatColor(item.format)}15` }]}>
          <Ionicons name={getFormatIcon(item.format) as any} size={24} color={getFormatColor(item.format)} />
        </View>
        <View style={styles.reportInfo}>
          <Text style={styles.reportTitle}>{item.title}</Text>
          <Text style={styles.reportDescription}>{item.description}</Text>
        </View>
      </View>
      
      <View style={styles.reportMeta}>
        {item.lastGenerated && (
          <Text style={styles.lastGenerated}>
            <Ionicons name="time-outline" size={14} color="#666" /> Last generated: {item.lastGenerated}
          </Text>
        )}
        
        <Text style={styles.formatLabel}>
          Format: <Text style={[styles.formatText, { color: getFormatColor(item.format) }]}>{item.format}</Text>
        </Text>
      </View>
      
      <View style={styles.reportActions}>
        <Button
          title="Generate"
          onPress={() => {}}
          style={styles.generateButton}
        />
        <TouchableOpacity style={styles.optionsButton}>
          <Ionicons name="ellipsis-vertical" size={18} color="#666" />
        </TouchableOpacity>
      </View>
    </Card>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="h1" style={styles.title}>Reports</Text>
        <Text variant="body" style={styles.subtitle}>
          Generate and export system reports
        </Text>
      </View>

      {/* Categories ScrollView */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.categoriesContainer}
      >
        {reportCategories.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.selectedCategoryButton
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Ionicons 
              name={category.icon as any} 
              size={20} 
              color={selectedCategory === category.id ? category.color : '#757575'} 
              style={styles.categoryIcon}
            />
            <Text 
              style={[
                styles.categoryText,
                selectedCategory === category.id && { color: category.color, fontWeight: '600' }
              ]}
            >
              {category.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Reports List */}
      <View style={styles.reportsContainer}>
        <FlatList
          data={filteredReports}
          renderItem={renderReportCard}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="document-outline" size={48} color="#ccc" />
              <Text style={styles.emptyText}>No reports found in this category</Text>
            </View>
          }
        />
      </View>

      {/* Custom Report Section */}
      <View style={styles.customReportSection}>
        <Card style={styles.customReportCard}>
          <View style={styles.customReportContent}>
            <View>
              <Text style={styles.customReportTitle}>Need a Custom Report?</Text>
              <Text style={styles.customReportDescription}>
                Create a customized report with specific parameters and data points
              </Text>
            </View>
            <Button
              title="Create Custom Report"
              onPress={() => {}}
              style={styles.customReportButton}
            />
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: scale(16),
    paddingTop: verticalScale(20),
  },
  title: {
    fontSize: scale(24),
    fontWeight: 'bold',
    marginBottom: verticalScale(4),
  },
  subtitle: {
    fontSize: scale(14),
    color: '#666',
    marginBottom: verticalScale(16),
  },
  categoriesContainer: {
    paddingHorizontal: scale(16),
    paddingBottom: scale(16),
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: scale(16),
    paddingVertical: scale(10),
    borderRadius: 20,
    marginRight: scale(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  selectedCategoryButton: {
    backgroundColor: '#F5F5F5',
  },
  categoryIcon: {
    marginRight: scale(8),
  },
  categoryText: {
    fontSize: scale(14),
    color: '#757575',
  },
  reportsContainer: {
    paddingHorizontal: scale(16),
  },
  reportCard: {
    padding: scale(16),
    marginBottom: scale(16),
  },
  reportHeader: {
    flexDirection: 'row',
    marginBottom: scale(12),
  },
  formatIcon: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(8),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },
  reportInfo: {
    flex: 1,
  },
  reportTitle: {
    fontSize: scale(16),
    fontWeight: '600',
    marginBottom: scale(4),
  },
  reportDescription: {
    fontSize: scale(14),
    color: '#666',
  },
  reportMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(12),
  },
  lastGenerated: {
    fontSize: scale(12),
    color: '#666',
  },
  formatLabel: {
    fontSize: scale(12),
    color: '#666',
  },
  formatText: {
    fontWeight: '600',
  },
  reportActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  generateButton: {
    flex: 1,
    marginRight: scale(10),
  },
  optionsButton: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(40),
  },
  emptyText: {
    fontSize: scale(16),
    color: '#999',
    marginTop: scale(16),
  },
  customReportSection: {
    padding: scale(16),
    paddingBottom: scale(30),
  },
  customReportCard: {
    backgroundColor: '#E3F2FD',
    padding: scale(16),
  },
  customReportContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  customReportTitle: {
    fontSize: scale(16),
    fontWeight: '600',
    marginBottom: scale(4),
  },
  customReportDescription: {
    fontSize: scale(14),
    color: '#333',
    maxWidth: scale(200),
  },
  customReportButton: {
    backgroundColor: '#2196F3',
  },
}); 