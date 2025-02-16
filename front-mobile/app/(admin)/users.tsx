import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TextInput, Pressable } from 'react-native';
import { Text } from '../../src/components/common/Text';
import { Button } from '../../src/components/common/Button';
import { useColors, useSpacing } from '../../src/hooks/useTheme';
import { Icon } from '@roninoss/icons';

export default function UsersScreen() {
  const colors = useColors();
  const spacing = useSpacing();
  const [searchQuery, setSearchQuery] = useState('');

  const users = [
    { id: '1', name: 'John Doe', role: 'Student', email: 'john@example.com', status: 'Active' },
    { id: '2', name: 'Jane Smith', role: 'Teacher', email: 'jane@example.com', status: 'Active' },
    { id: '3', name: 'Mike Johnson', role: 'Student', email: 'mike@example.com', status: 'Inactive' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { padding: spacing[4] }]}>
        <View style={[styles.searchBar, { backgroundColor: colors.surface }]}>
          <Icon name="image" size={20} color={colors.textSecondary} />
          <TextInput
            placeholder="Search users..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={[styles.searchInput, { color: colors.text }]}
            placeholderTextColor={colors.textSecondary}
          />
        </View>
        <Button variant="primary">Add User</Button>
      </View>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: spacing[4] }}
        ItemSeparatorComponent={() => <View style={{ height: spacing[3] }} />}
        renderItem={({ item }) => (
          <Pressable>
            <View 
              style={[
                styles.userCard,
                { 
                  backgroundColor: colors.surface,
                  padding: spacing[4],
                  borderRadius: 8,
                }
              ]}
            >
              <View style={styles.userInfo}>
                <View style={styles.nameSection}>
                  <Text variant="h3">{item.name}</Text>
                  <Text variant="caption" style={{ color: colors.textSecondary }}>
                    {item.email}
                  </Text>
                </View>
                <View style={styles.roleSection}>
                  <Text variant="body" style={{ color: colors.textSecondary }}>
                    {item.role}
                  </Text>
                  <View 
                    style={[
                      styles.statusBadge,
                      { 
                        backgroundColor: item.status === 'Active' 
                          ? colors.primary + '20'
                          : colors.textSecondary + '20',
                      }
                    ]}
                  >
                    <Text 
                      variant="caption"
                      style={{ 
                        color: item.status === 'Active' 
                          ? colors.primary
                          : colors.textSecondary,
                      }}
                    >
                      {item.status}
                    </Text>
                  </View>
                </View>
              </View>
              <Button variant="ghost">
                Edit
              </Button>
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
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  userInfo: {
    flex: 1,
  },
  nameSection: {
    marginBottom: 4,
  },
  roleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
}); 