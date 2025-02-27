import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Text } from '../../../components/ui/Text';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Ionicons } from '@expo/vector-icons';
import { scale, verticalScale } from '../../../utils/responsive';

// Setting section type
interface SettingSection {
  id: string;
  title: string;
  icon: string;
  color: string;
  settings: Setting[];
}

// Setting item type
interface Setting {
  id: string;
  title: string;
  description: string;
  type: 'toggle' | 'select' | 'input';
  value: boolean | string | number;
  options?: { label: string; value: string }[];
}

// Mock settings data
const settingSections: SettingSection[] = [
  {
    id: 'general',
    title: 'General Settings',
    icon: 'settings-outline',
    color: '#2196F3',
    settings: [
      {
        id: 'system_name',
        title: 'School Name',
        description: 'Name of your educational institution',
        type: 'input',
        value: 'International School of Technology',
      },
      {
        id: 'academic_year',
        title: 'Current Academic Year',
        description: 'Set the current academic year for the system',
        type: 'select',
        value: '2023-2024',
        options: [
          { label: '2022-2023', value: '2022-2023' },
          { label: '2023-2024', value: '2023-2024' },
          { label: '2024-2025', value: '2024-2025' },
        ],
      },
      {
        id: 'maintenance_mode',
        title: 'Maintenance Mode',
        description: 'Enable maintenance mode to prevent user access during updates',
        type: 'toggle',
        value: false,
      },
    ],
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: 'notifications-outline',
    color: '#FF9800',
    settings: [
      {
        id: 'email_notifications',
        title: 'Email Notifications',
        description: 'Send system notifications via email',
        type: 'toggle',
        value: true,
      },
      {
        id: 'push_notifications',
        title: 'Push Notifications',
        description: 'Send push notifications to mobile devices',
        type: 'toggle',
        value: true,
      },
      {
        id: 'grade_notifications',
        title: 'Grade Update Notifications',
        description: 'Notify users when grades are updated',
        type: 'toggle',
        value: true,
      },
    ],
  },
  {
    id: 'security',
    title: 'Security',
    icon: 'shield-outline',
    color: '#4CAF50',
    settings: [
      {
        id: 'two_factor_auth',
        title: 'Two-Factor Authentication',
        description: 'Require two-factor authentication for staff accounts',
        type: 'toggle',
        value: false,
      },
      {
        id: 'password_expiry',
        title: 'Password Expiry',
        description: 'Number of days until password expires',
        type: 'select',
        value: '90',
        options: [
          { label: '30 days', value: '30' },
          { label: '60 days', value: '60' },
          { label: '90 days', value: '90' },
          { label: 'Never', value: 'never' },
        ],
      },
      {
        id: 'session_timeout',
        title: 'Session Timeout',
        description: 'Minutes of inactivity before automatic logout',
        type: 'select',
        value: '30',
        options: [
          { label: '15 minutes', value: '15' },
          { label: '30 minutes', value: '30' },
          { label: '60 minutes', value: '60' },
        ],
      },
    ],
  },
];

export default function AdminSettings() {
  const [settings, setSettings] = useState<SettingSection[]>(settingSections);

  // Handle toggle change
  const handleToggleChange = (sectionId: string, settingId: string, newValue: boolean) => {
    setSettings(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? {
              ...section,
              settings: section.settings.map(setting => 
                setting.id === settingId
                  ? { ...setting, value: newValue }
                  : setting
              )
            }
          : section
      )
    );
  };

  // Render setting based on type
  const renderSetting = (section: SettingSection, setting: Setting) => {
    switch (setting.type) {
      case 'toggle':
        return (
          <View style={styles.settingRow} key={setting.id}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>{setting.title}</Text>
              <Text style={styles.settingDescription}>{setting.description}</Text>
            </View>
            <Switch
              value={setting.value as boolean}
              onValueChange={(newValue) => handleToggleChange(section.id, setting.id, newValue)}
              trackColor={{ false: '#D1D5DB', true: '#BBDEFB' }}
              thumbColor={setting.value ? '#2196F3' : '#F4F4F5'}
            />
          </View>
        );
      
      case 'select':
        return (
          <View style={styles.settingRow} key={setting.id}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>{setting.title}</Text>
              <Text style={styles.settingDescription}>{setting.description}</Text>
            </View>
            <TouchableOpacity style={styles.selectButton}>
              <Text style={styles.selectButtonText}>{setting.value.toString()}</Text>
              <Ionicons name="chevron-down" size={16} color="#666" />
            </TouchableOpacity>
          </View>
        );
      
      case 'input':
        return (
          <View style={styles.settingRow} key={setting.id}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>{setting.title}</Text>
              <Text style={styles.settingDescription}>{setting.description}</Text>
            </View>
            <TouchableOpacity style={styles.inputButton}>
              <Text style={styles.inputButtonText} numberOfLines={1} ellipsizeMode="tail">
                {setting.value.toString()}
              </Text>
              <Ionicons name="create-outline" size={16} color="#666" />
            </TouchableOpacity>
          </View>
        );
      
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="h1" style={styles.title}>System Settings</Text>
        <Text variant="body" style={styles.subtitle}>
          Configure application settings and preferences
        </Text>
      </View>

      {settings.map(section => (
        <Card key={section.id} style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={[styles.iconContainer, { backgroundColor: `${section.color}15` }]}>
              <Ionicons name={section.icon as any} size={24} color={section.color} />
            </View>
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>
          
          <View style={styles.settingsContainer}>
            {section.settings.map(setting => renderSetting(section, setting))}
          </View>
        </Card>
      ))}

      <View style={styles.actionButtons}>
        <Button 
          title="Reset to Defaults" 
          onPress={() => {}}
          style={[styles.button, styles.resetButton]}
        />
        <Button 
          title="Save Changes" 
          onPress={() => {}}
          style={[styles.button, styles.saveButton]}
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
  sectionCard: {
    marginHorizontal: scale(16),
    marginBottom: scale(16),
    padding: scale(16),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(16),
  },
  iconContainer: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },
  sectionTitle: {
    fontSize: scale(18),
    fontWeight: '600',
  },
  settingsContainer: {
    marginLeft: scale(4),
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingInfo: {
    flex: 1,
    marginRight: scale(16),
  },
  settingTitle: {
    fontSize: scale(16),
    fontWeight: '500',
    marginBottom: scale(4),
  },
  settingDescription: {
    fontSize: scale(14),
    color: '#666',
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    paddingHorizontal: scale(12),
    paddingVertical: scale(8),
    borderRadius: scale(6),
    borderWidth: 1,
    borderColor: '#e0e0e0',
    minWidth: scale(100),
    justifyContent: 'space-between',
  },
  selectButtonText: {
    fontSize: scale(14),
    color: '#333',
    marginRight: scale(8),
  },
  inputButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    paddingHorizontal: scale(12),
    paddingVertical: scale(8),
    borderRadius: scale(6),
    borderWidth: 1,
    borderColor: '#e0e0e0',
    maxWidth: scale(160),
    justifyContent: 'space-between',
  },
  inputButtonText: {
    fontSize: scale(14),
    color: '#333',
    marginRight: scale(8),
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: scale(16),
    marginBottom: scale(30),
  },
  button: {
    flex: 1,
    marginHorizontal: scale(8),
  },
  resetButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  saveButton: {
    backgroundColor: '#2196F3',
  },
}); 