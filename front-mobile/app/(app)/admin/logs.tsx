import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Text } from '../../../components/ui/Text';
import { Card } from '../../../components/ui/Card';
import { Ionicons } from '@expo/vector-icons';
import { scale, verticalScale } from '../../../utils/responsive';

interface LogType {
  id: string;
  label: string;
  icon: string;
  color: string;
}

interface LogEntry {
  id: string;
  type: string;
  message: string;
  user: string;
  userRole: string;
  timestamp: string;
  ip: string;
  severity: 'info' | 'warning' | 'error';
}

// Log type filters
const logTypes: LogType[] = [
  { id: 'all', label: 'All Logs', icon: 'list', color: '#2196F3' },
  { id: 'auth', label: 'Authentication', icon: 'log-in', color: '#9C27B0' },
  { id: 'user', label: 'User Actions', icon: 'person', color: '#4CAF50' },
  { id: 'system', label: 'System', icon: 'settings', color: '#FF9800' },
  { id: 'error', label: 'Errors', icon: 'warning', color: '#F44336' },
];

// Mock logs data
const logEntries: LogEntry[] = [
  {
    id: '1',
    type: 'auth',
    message: 'User login successful',
    user: 'John Smith',
    userRole: 'Admin',
    timestamp: '2023-12-28 09:15:22',
    ip: '192.168.1.45',
    severity: 'info',
  },
  {
    id: '2',
    type: 'auth',
    message: 'Failed login attempt',
    user: 'Unknown',
    userRole: 'Unknown',
    timestamp: '2023-12-28 08:45:12',
    ip: '192.168.1.105',
    severity: 'warning',
  },
  {
    id: '3',
    type: 'user',
    message: 'User profile updated',
    user: 'Sarah Williams',
    userRole: 'Teacher',
    timestamp: '2023-12-28 08:30:45',
    ip: '192.168.1.78',
    severity: 'info',
  },
  {
    id: '4',
    type: 'system',
    message: 'Database backup completed',
    user: 'System',
    userRole: 'System',
    timestamp: '2023-12-28 01:00:00',
    ip: 'localhost',
    severity: 'info',
  },
  {
    id: '5',
    type: 'error',
    message: 'Database connection error',
    user: 'System',
    userRole: 'System',
    timestamp: '2023-12-27 23:45:10',
    ip: 'localhost',
    severity: 'error',
  },
  {
    id: '6',
    type: 'user',
    message: 'User created new class',
    user: 'Jane Smith',
    userRole: 'Admin',
    timestamp: '2023-12-27 16:22:35',
    ip: '192.168.1.45',
    severity: 'info',
  },
  {
    id: '7',
    type: 'auth',
    message: 'User logout',
    user: 'Robert Johnson',
    userRole: 'Teacher',
    timestamp: '2023-12-27 15:45:12',
    ip: '192.168.1.92',
    severity: 'info',
  },
  {
    id: '8',
    type: 'system',
    message: 'System update initiated',
    user: 'John Smith',
    userRole: 'Admin',
    timestamp: '2023-12-27 14:30:00',
    ip: '192.168.1.45',
    severity: 'info',
  },
  {
    id: '9',
    type: 'error',
    message: 'File upload failed: insufficient storage',
    user: 'Michael Brown',
    userRole: 'Teacher',
    timestamp: '2023-12-27 13:15:22',
    ip: '192.168.1.77',
    severity: 'error',
  },
  {
    id: '10',
    type: 'user',
    message: 'Grade record updated',
    user: 'Robert Johnson',
    userRole: 'Teacher',
    timestamp: '2023-12-27 11:05:42',
    ip: '192.168.1.92',
    severity: 'info',
  },
];

export default function SystemLogs() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [expandedLogs, setExpandedLogs] = useState<string[]>([]);
  
  // Filter logs based on selected type
  const filteredLogs = selectedType === 'all' 
    ? logEntries
    : logEntries.filter(log => log.type === selectedType);

  // Toggle log expansion
  const toggleLogExpansion = (logId: string) => {
    setExpandedLogs(prev => 
      prev.includes(logId)
        ? prev.filter(id => id !== logId)
        : [...prev, logId]
    );
  };

  // Get icon for log severity
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'info': return 'information-circle';
      case 'warning': return 'warning';
      case 'error': return 'alert-circle';
      default: return 'information-circle';
    }
  };

  // Get color for log severity
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'info': return '#2196F3';
      case 'warning': return '#FF9800';
      case 'error': return '#F44336';
      default: return '#757575';
    }
  };

  // Render a log entry
  const renderLogEntry = ({ item }: { item: LogEntry }) => {
    const isExpanded = expandedLogs.includes(item.id);
    
    return (
      <Card style={styles.logCard}>
        <TouchableOpacity onPress={() => toggleLogExpansion(item.id)}>
          <View style={styles.logHeader}>
            <View style={[styles.severityIndicator, { backgroundColor: getSeverityColor(item.severity) }]}>
              <Ionicons name={getSeverityIcon(item.severity)} size={16} color="white" />
            </View>
            <View style={styles.logInfo}>
              <Text style={styles.logMessage}>{item.message}</Text>
              <Text style={styles.logTimestamp}>{item.timestamp}</Text>
            </View>
            <Ionicons 
              name={isExpanded ? 'chevron-up' : 'chevron-down'} 
              size={20} 
              color="#757575"
            />
          </View>
        </TouchableOpacity>
        
        {isExpanded && (
          <View style={styles.logDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>User:</Text>
              <Text style={styles.detailValue}>{item.user} ({item.userRole})</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Type:</Text>
              <Text style={styles.detailValue}>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>IP Address:</Text>
              <Text style={styles.detailValue}>{item.ip}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Severity:</Text>
              <Text style={[styles.detailValue, { color: getSeverityColor(item.severity) }]}>
                {item.severity.charAt(0).toUpperCase() + item.severity.slice(1)}
              </Text>
            </View>
          </View>
        )}
      </Card>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="h1" style={styles.title}>System Logs</Text>
        <Text variant="body" style={styles.subtitle}>
          View and filter system activity logs
        </Text>
      </View>

      {/* Log Types ScrollView */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.logTypesContainer}
      >
        {logTypes.map(type => (
          <TouchableOpacity
            key={type.id}
            style={[
              styles.typeButton,
              selectedType === type.id && styles.selectedTypeButton
            ]}
            onPress={() => setSelectedType(type.id)}
          >
            <Ionicons 
              name={type.icon as any} 
              size={18} 
              color={selectedType === type.id ? type.color : '#757575'} 
              style={styles.typeIcon}
            />
            <Text 
              style={[
                styles.typeText,
                selectedType === type.id && { color: type.color, fontWeight: '600' }
              ]}
            >
              {type.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Log Summary */}
      <View style={styles.summaryContainer}>
        <Card style={styles.summaryCard}>
          <View style={styles.summaryContent}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{logEntries.length}</Text>
              <Text style={styles.summaryLabel}>Total Logs</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>
                {logEntries.filter(log => log.severity === 'error').length}
              </Text>
              <Text style={styles.summaryLabel}>Errors</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>
                {logEntries.filter(log => log.severity === 'warning').length}
              </Text>
              <Text style={styles.summaryLabel}>Warnings</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>
                {logEntries.filter(log => log.type === 'auth').length}
              </Text>
              <Text style={styles.summaryLabel}>Auth Events</Text>
            </View>
          </View>
        </Card>
      </View>

      {/* Logs List */}
      <View style={styles.logsContainer}>
        <FlatList
          data={filteredLogs}
          renderItem={renderLogEntry}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="list" size={48} color="#ccc" />
              <Text style={styles.emptyText}>No logs found with selected filter</Text>
            </View>
          }
        />
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
  logTypesContainer: {
    paddingHorizontal: scale(16),
    paddingBottom: scale(16),
  },
  typeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: scale(12),
    paddingVertical: scale(8),
    borderRadius: 16,
    marginRight: scale(8),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  selectedTypeButton: {
    backgroundColor: '#F5F5F5',
  },
  typeIcon: {
    marginRight: scale(6),
  },
  typeText: {
    fontSize: scale(14),
    color: '#757575',
  },
  summaryContainer: {
    paddingHorizontal: scale(16),
    marginBottom: scale(16),
  },
  summaryCard: {
    padding: scale(16),
  },
  summaryContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: scale(18),
    fontWeight: 'bold',
    color: '#333',
  },
  summaryLabel: {
    fontSize: scale(12),
    color: '#666',
    marginTop: scale(4),
  },
  logsContainer: {
    paddingHorizontal: scale(16),
    paddingBottom: scale(30),
  },
  logCard: {
    padding: scale(16),
    marginBottom: scale(12),
  },
  logHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  severityIndicator: {
    width: scale(24),
    height: scale(24),
    borderRadius: scale(12),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(10),
  },
  logInfo: {
    flex: 1,
  },
  logMessage: {
    fontSize: scale(14),
    fontWeight: '500',
    marginBottom: scale(4),
  },
  logTimestamp: {
    fontSize: scale(12),
    color: '#757575',
  },
  logDetails: {
    marginTop: scale(16),
    paddingTop: scale(16),
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: scale(8),
  },
  detailLabel: {
    width: scale(100),
    fontSize: scale(14),
    color: '#666',
  },
  detailValue: {
    fontSize: scale(14),
    fontWeight: '500',
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
}); 