import React from 'react';
import { View, ScrollView, StyleSheet, Switch } from 'react-native';
import { Text } from '../../src/components/common/Text';
import { Button } from '../../src/components/common/Button';
import { useColors, useSpacing } from '../../src/hooks/useTheme';

export default function SettingsScreen() {
  const colors = useColors();
  const spacing = useSpacing();

  const settings = [
    { title: 'School Information', items: [
      { label: 'School Name', value: 'Example High School' },
      { label: 'Address', value: '123 Education St.' },
      { label: 'Phone', value: '+1 234 567 890' },
    ]},
    { title: 'Academic Settings', items: [
      { label: 'Current Semester', value: 'Fall 2024' },
      { label: 'Grading System', value: 'Letter Grade (A-F)' },
      { label: 'Class Duration', value: '50 minutes' },
    ]},
    { title: 'System Settings', items: [
      { label: 'Email Notifications', type: 'toggle', value: true },
      { label: 'SMS Notifications', type: 'toggle', value: false },
      { label: 'Public Calendar', type: 'toggle', value: true },
    ]},
  ];

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ padding: spacing[4] }}
    >
      {settings.map((section, index) => (
        <View 
          key={section.title}
          style={[
            styles.section,
            { marginTop: index > 0 ? spacing[6] : 0 }
          ]}
        >
          <Text variant="h2" style={styles.sectionTitle}>
            {section.title}
          </Text>
          <View 
            style={[
              styles.card,
              { 
                backgroundColor: colors.surface,
                padding: spacing[4],
                borderRadius: 8,
                marginTop: spacing[2],
              }
            ]}
          >
            {section.items.map((item, itemIndex) => (
              <View 
                key={item.label}
                style={[
                  styles.settingItem,
                  { 
                    borderBottomWidth: itemIndex < section.items.length - 1 ? 1 : 0,
                    borderBottomColor: colors.border,
                    paddingVertical: spacing[3],
                  }
                ]}
              >
                <Text variant="body">{item.label}</Text>
                {'type' in item && item.type === 'toggle' ? (
                  <Switch 
                    value={item.value as boolean}
                    onValueChange={() => {}}
                    trackColor={{ false: colors.textSecondary, true: colors.primary }}
                  />
                ) : (
                  <Text variant="body" style={{ color: colors.textSecondary }}>
                    {item.value as string}
                  </Text>
                )}
              </View>
            ))}
          </View>
          {section.title === 'School Information' && (
            <Button 
              variant="primary"
              style={{ marginTop: spacing[3] }}
            >
              Edit School Information
            </Button>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {},
  sectionTitle: {
    marginBottom: 8,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}); 