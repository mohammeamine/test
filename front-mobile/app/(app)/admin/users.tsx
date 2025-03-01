import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Text } from '../../../components/ui/Text';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Ionicons } from '@expo/vector-icons';
import { scale, verticalScale } from '../../../utils/responsive';

// User type definition
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  class?: string;
  department?: string;
  children?: string[];
  avatarColor: string;
}

// Mock data for user types
const userTypes = [
  { id: 'all', label: 'All Users', count: 6520 },
  { id: 'students', label: 'Students', count: 2550 },
  { id: 'teachers', label: 'Teachers', count: 128 },
  { id: 'parents', label: 'Parents', count: 3842 },
];

// Mock data for users
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@school.edu',
    role: 'Student',
    status: 'Active',
    class: '10A',
    avatarColor: '#E3F2FD',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@school.edu',
    role: 'Teacher',
    status: 'Active',
    department: 'Mathematics',
    avatarColor: '#E8F5E9',
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert.johnson@school.edu',
    role: 'Parent',
    status: 'Active',
    children: ['Emily Johnson'],
    avatarColor: '#FFF8E1',
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah.williams@school.edu',
    role: 'Student',
    status: 'Inactive',
    class: '9B',
    avatarColor: '#FFEBEE',
  },
  {
    id: '5',
    name: 'Michael Brown',
    email: 'michael.brown@school.edu',
    role: 'Teacher',
    status: 'Active',
    department: 'Science',
    avatarColor: '#E0F7FA',
  },
];

export default function UserManagement() {
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = mockUsers.filter(user => {
    if (selectedType !== 'all' && selectedType === 'students' && user.role !== 'Student') return false;
    if (selectedType !== 'all' && selectedType === 'teachers' && user.role !== 'Teacher') return false;
    if (selectedType !== 'all' && selectedType === 'parents' && user.role !== 'Parent') return false;
    
    return user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           user.email.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const renderUserCard = ({ item }: { item: User }) => (
    <TouchableOpacity>
      <Card style={styles.userCard}>
        <View style={styles.userHeader}>
          <View style={[styles.avatar, { backgroundColor: item.avatarColor }]}>
            <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userEmail}>{item.email}</Text>
          </View>
        </View>
        
        <View style={styles.userDetails}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Role:</Text>
            <Text style={styles.detailValue}>{item.role}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Status:</Text>
            <Text 
              style={[
                styles.detailValue, 
                { color: item.status === 'Active' ? '#4CAF50' : '#F44336' }
              ]}
            >
              {item.status}
            </Text>
          </View>
          
          {item.class && (
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Class:</Text>
              <Text style={styles.detailValue}>{item.class}</Text>
            </View>
          )}
          
          {item.department && (
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Department:</Text>
              <Text style={styles.detailValue}>{item.department}</Text>
            </View>
          )}
          
          {item.children && (
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Children:</Text>
              <Text style={styles.detailValue}>{item.children.join(', ')}</Text>
            </View>
          )}
        </View>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="create-outline" size={20} color="#2196F3" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="trash-outline" size={20} color="#F44336" />
          </TouchableOpacity>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="h1" style={styles.title}>User Management</Text>
        <Text variant="body" style={styles.subtitle}>
          Manage all users of the school system
        </Text>
      </View>

      {/* User Type Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
        {userTypes.map(type => (
          <TouchableOpacity
            key={type.id}
            style={[
              styles.tabButton,
              selectedType === type.id && styles.activeTabButton
            ]}
            onPress={() => setSelectedType(type.id)}
          >
            <Text
              style={[
                styles.tabText,
                selectedType === type.id && styles.activeTabText
              ]}
            >
              {type.label}
            </Text>
            <View style={styles.tabBadge}>
              <Text style={styles.tabBadgeText}>{type.count}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <View style={styles.addButtonContainer}>
          <Ionicons name="add-circle-outline" size={20} color="#fff" style={styles.buttonIcon} />
          <Button 
            title="Add New User" 
            onPress={() => {}}
            style={styles.addButton}
          />
        </View>
      </View>

      {/* Users List */}
      <View style={styles.usersContainer}>
        <FlatList
          data={filteredUsers}
          renderItem={renderUserCard}
          keyExtractor={item => item.id}
          scrollEnabled={false}
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
  tabsContainer: {
    paddingHorizontal: scale(16),
    marginBottom: verticalScale(16),
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(10),
    borderRadius: 25,
    marginRight: scale(10),
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.0,
    elevation: 1,
  },
  activeTabButton: {
    backgroundColor: '#E3F2FD',
  },
  tabText: {
    fontSize: scale(14),
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: '#2196F3',
    fontWeight: '600',
  },
  tabBadge: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginLeft: scale(8),
    paddingHorizontal: scale(6),
    paddingVertical: verticalScale(2),
  },
  tabBadgeText: {
    fontSize: scale(12),
    color: '#666',
    fontWeight: '500',
  },
  actionContainer: {
    paddingHorizontal: scale(16),
    marginBottom: verticalScale(16),
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  addButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  buttonIcon: {
    position: 'absolute',
    left: scale(12),
    zIndex: 1,
  },
  addButton: {
    paddingHorizontal: scale(36),
  },
  usersContainer: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(20),
  },
  userCard: {
    padding: scale(16),
    marginBottom: verticalScale(16),
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  avatar: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },
  avatarText: {
    fontSize: scale(20),
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: scale(16),
    fontWeight: 'bold',
    marginBottom: verticalScale(4),
  },
  userEmail: {
    fontSize: scale(14),
    color: '#666',
  },
  userDetails: {
    marginBottom: verticalScale(16),
  },
  detailItem: {
    flexDirection: 'row',
    marginBottom: verticalScale(8),
  },
  detailLabel: {
    fontSize: scale(14),
    color: '#666',
    width: scale(100),
  },
  detailValue: {
    fontSize: scale(14),
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  iconButton: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(8),
  },
}); 