import React, { useState, useCallback } from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
  ActivityIndicator,
  RefreshControl,
  Animated,
  Platform,
  Keyboard
} from 'react-native';
import { Text } from '../../components/ui/Text';
import { Ionicons } from '@expo/vector-icons';

const usersList = [
  { id: 1, name: 'John Doe', role: 'Teacher', subject: 'Mathematics', status: 'Active' },
  { id: 2, name: 'Jane Smith', role: 'Student', class: '12-A', status: 'Active' },
  { id: 3, name: 'Mike Johnson', role: 'Parent', status: 'Pending' },
  { id: 4, name: 'Sarah Wilson', role: 'Teacher', subject: 'Science', status: 'Active' },
  { id: 5, name: 'Tom Brown', role: 'Student', class: '11-B', status: 'Inactive' },
];

const roleFilters = ['All', 'Teacher', 'Student', 'Parent'];

export default function UsersScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Animation values
  const searchBarAnimation = new Animated.Value(0);
  const listAnimation = new Animated.Value(0);

  // Load initial data
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      Animated.timing(listAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 1500);
  }, []);

  // Handle search bar focus animation
  React.useEffect(() => {
    Animated.timing(searchBarAnimation, {
      toValue: isSearchFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isSearchFocused]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
  }, []);

  const filteredUsers = usersList.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'All' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const searchBarWidth = searchBarAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['88%', '100%']
  });

  const getStatusStyle = (status: string) => {
    const statusStyles = {
      Active: styles.statusActive,
      Inactive: styles.statusInactive,
      Pending: styles.statusPending
    };
    return [styles.userStatus, statusStyles[status as keyof typeof statusStyles]];
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Loading users...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Users Management</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => {/* TODO: Implement add user */}}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Animated.View style={[styles.searchBox, { width: searchBarWidth }]}>
          <Ionicons name="search-outline" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search users..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
        </Animated.View>
        {isSearchFocused && (
          <TouchableOpacity 
            style={styles.cancelButton} 
            onPress={() => {
              Keyboard.dismiss();
              setIsSearchFocused(false);
              setSearchQuery('');
            }}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView 
        horizontal 
        style={styles.filterContainer}
        showsHorizontalScrollIndicator={false}
      >
        {roleFilters.map((role) => (
          <TouchableOpacity
            key={role}
            style={[
              styles.filterChip,
              selectedRole === role && styles.filterChipActive,
            ]}
            onPress={() => setSelectedRole(role)}
          >
            <Text
              style={[
                styles.filterChipText,
                selectedRole === role && styles.filterChipTextActive,
              ]}
            >
              {role}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView 
        style={styles.userList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#2196F3']}
            tintColor="#2196F3"
          />
        }
      >
        <Animated.View style={{ opacity: listAnimation }}>
          {filteredUsers.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="people-outline" size={48} color="#999" />
              <Text style={styles.emptyStateText}>No users found</Text>
              <Text style={styles.emptyStateSubtext}>
                Try adjusting your search or filters
              </Text>
            </View>
          ) : (
            filteredUsers.map((user) => (
              <TouchableOpacity 
                key={user.id} 
                style={styles.userCard}
                onPress={() => {/* TODO: Implement user details */}}
              >
                <View style={styles.userInfo}>
                  <View style={[styles.avatar, { backgroundColor: getAvatarColor(user.role) }]}>
                    <Text style={styles.avatarText}>
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </Text>
                  </View>
                  <View style={styles.userDetails}>
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userRole}>{user.role}</Text>
                    {user.subject && (
                      <Text style={styles.userSubject}>{user.subject}</Text>
                    )}
                    {user.class && (
                      <Text style={styles.userClass}>Class: {user.class}</Text>
                    )}
                  </View>
                </View>
                <View style={styles.userActions}>
                  <Text style={getStatusStyle(user.status)}>
                    {user.status}
                  </Text>
                  <TouchableOpacity 
                    style={styles.moreButton}
                    onPress={() => {/* TODO: Implement more actions */}}
                  >
                    <Ionicons name="ellipsis-vertical" size={20} color="#666" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const getAvatarColor = (role: string) => {
  const colors = {
    Teacher: '#4CAF50',
    Student: '#2196F3',
    Parent: '#FF9800',
  };
  return colors[role as keyof typeof colors] || '#9E9E9E';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#2196F3',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 8,
    flex: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  cancelButton: {
    marginLeft: 8,
    padding: 4,
  },
  cancelText: {
    color: '#2196F3',
    fontSize: 16,
  },
  filterContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    marginRight: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  filterChipActive: {
    backgroundColor: '#2196F3',
  },
  filterChipText: {
    color: '#666',
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: '#fff',
  },
  userList: {
    flex: 1,
    padding: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  userRole: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  userSubject: {
    fontSize: 12,
    color: '#666',
  },
  userClass: {
    fontSize: 12,
    color: '#666',
  },
  userActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    marginRight: 8,
  },
  statusActive: {
    backgroundColor: '#E8F5E9',
    color: '#4CAF50',
  },
  statusInactive: {
    backgroundColor: '#FFEBEE',
    color: '#F44336',
  },
  statusPending: {
    backgroundColor: '#FFF3E0',
    color: '#FF9800',
  },
  moreButton: {
    padding: 4,
  },
});
