import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TextInput, Pressable } from 'react-native';
import { Text } from '../../../src/components/common/Text';
import { Button } from '../../../src/components/common/Button';
import { useColors, useSpacing } from '../../../src/hooks/useTheme';
import { Icon } from '@roninoss/icons';
import { router } from 'expo-router';

type StaffMember = {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  joinDate: string;
};

const mockStaff: StaffMember[] = [
  { 
    id: '1',
    name: 'Alice Wilson',
    role: 'Administrative Assistant',
    department: 'Administration',
    email: 'alice.wilson@example.com',
    phone: '+1 234-567-8901',
    status: 'Active',
    joinDate: '2022-03-15'
  },
  { 
    id: '2',
    name: 'Robert Davis',
    role: 'IT Support',
    department: 'IT',
    email: 'robert.davis@example.com',
    phone: '+1 234-567-8902',
    status: 'Active',
    joinDate: '2021-08-01'
  },
  { 
    id: '3',
    name: 'Emily Taylor',
    role: 'Library Assistant',
    department: 'Library',
    email: 'emily.taylor@example.com',
    phone: '+1 234-567-8903',
    status: 'On Leave',
    joinDate: '2023-01-10'
  },
];

export default function StaffScreen() {
  const colors = useColors();
  const spacing = useSpacing();
  const [searchQuery, setSearchQuery] = useState('');
  const [staff] = useState(mockStaff);

  const getStatusColor = (status: StaffMember['status']) => {
    switch (status) {
      case 'Active':
        return colors.primary;
      case 'On Leave':
        return 'rgb(245, 158, 11)';
      case 'Inactive':
        return 'rgb(239, 68, 68)';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { padding: spacing[4] }]}>
        <View style={[styles.searchBar, { backgroundColor: colors.surface }]}>
          <Icon name="image" size={20} color={colors.textSecondary} />
          <TextInput
            placeholder="Search staff..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={[styles.searchInput, { color: colors.text }]}
            placeholderTextColor={colors.textSecondary}
          />
        </View>
        <Button 
          variant="primary"
          onPress={() => router.push('/staff/add')}
        >
          Add Staff
        </Button>
      </View>

      <FlatList
        data={staff}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: spacing[4] }}
        ItemSeparatorComponent={() => <View style={{ height: spacing[3] }} />}
        renderItem={({ item }) => (
          <Pressable>
            <View 
              style={[
                styles.staffCard,
                { 
                  backgroundColor: colors.surface,
                  padding: spacing[4],
                  borderRadius: 8,
                }
              ]}
            >
              <View style={styles.cardHeader}>
                <View>
                  <Text variant="h3">{item.name}</Text>
                  <Text variant="caption" style={{ color: colors.textSecondary }}>
                    {item.role}
                  </Text>
                </View>
                <View 
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(item.status) + '20' }
                  ]}
                >
                  <Text 
                    variant="caption"
                    style={{ color: getStatusColor(item.status) }}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>

              <View style={[styles.details, { marginTop: spacing[3] }]}>
                <Text variant="caption" style={{ color: colors.textSecondary }}>
                  Department: {item.department}
                </Text>
                <Text variant="caption" style={{ color: colors.textSecondary }}>
                  Email: {item.email}
                </Text>
                <Text variant="caption" style={{ color: colors.textSecondary }}>
                  Phone: {item.phone}
                </Text>
              </View>

              <View style={[styles.footer, { marginTop: spacing[3] }]}>
                <Text variant="caption" style={{ color: colors.textSecondary }}>
                  Joined: {item.joinDate}
                </Text>
                <Button variant="ghost">
                  View Details
                </Button>
              </View>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  staffCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  details: {
    gap: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    paddingTop: 12,
  },
}); 