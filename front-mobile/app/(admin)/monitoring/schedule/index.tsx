import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TextInput, Pressable } from 'react-native';
import { Text } from '../../../../src/components/common/Text';
import { Button } from '../../../../src/components/common/Button';
import { useColors, useSpacing } from '../../../../src/hooks/useTheme';
import { Icon } from '@roninoss/icons';
import { router } from 'expo-router';

type ScheduleItem = {
  id: string;
  course: string;
  instructor: string;
  room: string;
  day: string;
  startTime: string;
  endTime: string;
  type: 'Lecture' | 'Lab' | 'Tutorial';
};

const mockSchedule: ScheduleItem[] = [
  { 
    id: '1',
    course: 'Introduction to Programming',
    instructor: 'Dr. Smith',
    room: 'Room 101',
    day: 'Monday',
    startTime: '09:00',
    endTime: '10:30',
    type: 'Lecture'
  },
  { 
    id: '2',
    course: 'Calculus I',
    instructor: 'Prof. Johnson',
    room: 'Room 203',
    day: 'Monday',
    startTime: '11:00',
    endTime: '12:30',
    type: 'Lecture'
  },
  { 
    id: '3',
    course: 'Physics Lab',
    instructor: 'Dr. Brown',
    room: 'Lab 3',
    day: 'Monday',
    startTime: '14:00',
    endTime: '16:00',
    type: 'Lab'
  },
];

export default function ScheduleScreen() {
  const colors = useColors();
  const spacing = useSpacing();
  const [searchQuery, setSearchQuery] = useState('');
  const [schedule] = useState(mockSchedule);

  const getTypeColor = (type: ScheduleItem['type']) => {
    switch (type) {
      case 'Lecture':
        return colors.primary;
      case 'Lab':
        return 'rgb(16, 185, 129)';
      case 'Tutorial':
        return 'rgb(245, 158, 11)';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { padding: spacing[4] }]}>
        <View style={[styles.searchBar, { backgroundColor: colors.surface }]}>
          <Icon name="image" size={20} color={colors.textSecondary} />
          <TextInput
            placeholder="Search schedule..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={[styles.searchInput, { color: colors.text }]}
            placeholderTextColor={colors.textSecondary}
          />
        </View>
        <Button 
          variant="primary"
          onPress={() => router.push('/monitoring/schedule/add')}
        >
          Add Schedule
        </Button>
      </View>

      <FlatList
        data={schedule}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: spacing[4] }}
        ItemSeparatorComponent={() => <View style={{ height: spacing[3] }} />}
        renderItem={({ item }) => (
          <Pressable>
            <View 
              style={[
                styles.scheduleCard,
                { 
                  backgroundColor: colors.surface,
                  padding: spacing[4],
                  borderRadius: 8,
                }
              ]}
            >
              <View style={styles.cardHeader}>
                <View>
                  <Text variant="h3">{item.course}</Text>
                  <Text variant="caption" style={{ color: colors.textSecondary }}>
                    {item.instructor}
                  </Text>
                </View>
                <View 
                  style={[
                    styles.typeBadge,
                    { backgroundColor: getTypeColor(item.type) + '20' }
                  ]}
                >
                  <Text 
                    variant="caption"
                    style={{ color: getTypeColor(item.type) }}
                  >
                    {item.type}
                  </Text>
                </View>
              </View>

              <View style={[styles.details, { marginTop: spacing[3] }]}>
                <View style={styles.detailRow}>
                  <Icon name="clock" size={16} color={colors.textSecondary} />
                  <Text variant="caption" style={{ color: colors.textSecondary }}>
                    {item.day}, {item.startTime} - {item.endTime}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Icon name="map" size={16} color={colors.textSecondary} />
                  <Text variant="caption" style={{ color: colors.textSecondary }}>
                    {item.room}
                  </Text>
                </View>
              </View>

              <View style={[styles.footer, { marginTop: spacing[3] }]}>
                <Button variant="ghost">
                  Edit
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
  scheduleCard: {
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
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  details: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    paddingTop: 12,
  },
}); 