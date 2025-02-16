import React from 'react';
import { View, FlatList, StyleSheet, Pressable } from 'react-native';
import { Text } from '../../src/components/common/Text';
import { Button } from '../../src/components/common/Button';
import { useColors, useSpacing } from '../../src/hooks/useTheme';
import { Icon } from '@roninoss/icons';

export default function ClassesScreen() {
  const colors = useColors();
  const spacing = useSpacing();

  const classes = [
    { 
      id: '1', 
      name: 'Mathematics 101',
      teacher: 'Dr. Smith',
      students: 30,
      schedule: 'Mon, Wed 10:00 AM',
      room: 'Room 201'
    },
    { 
      id: '2', 
      name: 'Physics Advanced',
      teacher: 'Prof. Johnson',
      students: 25,
      schedule: 'Tue, Thu 2:00 PM',
      room: 'Lab 101'
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { padding: spacing[4] }]}>
        <Button variant="primary">Add Class</Button>
      </View>

      <FlatList
        data={classes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: spacing[4] }}
        ItemSeparatorComponent={() => <View style={{ height: spacing[3] }} />}
        renderItem={({ item }) => (
          <Pressable>
            <View 
              style={[
                styles.classCard,
                { 
                  backgroundColor: colors.surface,
                  padding: spacing[4],
                  borderRadius: 8,
                }
              ]}
            >
              <View style={styles.classHeader}>
                <Text variant="h3">{item.name}</Text>
                <Button variant="ghost">
                  Edit
                </Button>
              </View>

              <View style={[styles.classInfo, { marginTop: spacing[2] }]}>
                <View style={styles.infoRow}>
                  <Icon name="person" size={16} color={colors.textSecondary} />
                  <Text variant="body" style={{ color: colors.textSecondary }}>
                    {item.teacher}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Icon name="timer" size={16} color={colors.textSecondary} />
                  <Text variant="body" style={{ color: colors.textSecondary }}>
                    {item.schedule}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Icon name="map" size={16} color={colors.textSecondary} />
                  <Text variant="body" style={{ color: colors.textSecondary }}>
                    {item.room}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Icon name="person" size={16} color={colors.textSecondary} />
                  <Text variant="body" style={{ color: colors.textSecondary }}>
                    {item.students} Students
                  </Text>
                </View>
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
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  classCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  classInfo: {
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
}); 