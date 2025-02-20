import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Text } from '../../components/ui/Text';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    reminderAlerts: false,
    newsUpdates: true,
  });

  const [appearance, setAppearance] = useState({
    darkMode: false,
    compactMode: false,
  });

  const handleLogout = () => {
    // TODO: Implement logout logic
    router.replace('/login');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="person-outline" size={24} color="#666" />
            <Text style={styles.settingText}>Profile Information</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="lock-closed-outline" size={24} color="#666" />
            <Text style={styles.settingText}>Change Password</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="language-outline" size={24} color="#666" />
            <Text style={styles.settingText}>Language</Text>
          </View>
          <View style={styles.settingRight}>
            <Text style={styles.settingValue}>English</Text>
            <Ionicons name="chevron-forward" size={24} color="#999" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="mail-outline" size={24} color="#666" />
            <Text style={styles.settingText}>Email Notifications</Text>
          </View>
          <Switch
            value={notifications.emailNotifications}
            onValueChange={(value) =>
              setNotifications({ ...notifications, emailNotifications: value })
            }
            trackColor={{ false: '#ddd', true: '#2196F3' }}
          />
        </View>
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="notifications-outline" size={24} color="#666" />
            <Text style={styles.settingText}>Push Notifications</Text>
          </View>
          <Switch
            value={notifications.pushNotifications}
            onValueChange={(value) =>
              setNotifications({ ...notifications, pushNotifications: value })
            }
            trackColor={{ false: '#ddd', true: '#2196F3' }}
          />
        </View>
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="alarm-outline" size={24} color="#666" />
            <Text style={styles.settingText}>Reminder Alerts</Text>
          </View>
          <Switch
            value={notifications.reminderAlerts}
            onValueChange={(value) =>
              setNotifications({ ...notifications, reminderAlerts: value })
            }
            trackColor={{ false: '#ddd', true: '#2196F3' }}
          />
        </View>
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="newspaper-outline" size={24} color="#666" />
            <Text style={styles.settingText}>News Updates</Text>
          </View>
          <Switch
            value={notifications.newsUpdates}
            onValueChange={(value) =>
              setNotifications({ ...notifications, newsUpdates: value })
            }
            trackColor={{ false: '#ddd', true: '#2196F3' }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="moon-outline" size={24} color="#666" />
            <Text style={styles.settingText}>Dark Mode</Text>
          </View>
          <Switch
            value={appearance.darkMode}
            onValueChange={(value) =>
              setAppearance({ ...appearance, darkMode: value })
            }
            trackColor={{ false: '#ddd', true: '#2196F3' }}
          />
        </View>
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="contract-outline" size={24} color="#666" />
            <Text style={styles.settingText}>Compact Mode</Text>
          </View>
          <Switch
            value={appearance.compactMode}
            onValueChange={(value) =>
              setAppearance({ ...appearance, compactMode: value })
            }
            trackColor={{ false: '#ddd', true: '#2196F3' }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>System</Text>
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="cloud-download-outline" size={24} color="#666" />
            <View>
              <Text style={styles.settingText}>Check for Updates</Text>
              <Text style={styles.settingDescription}>Current version: 1.0.0</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="information-circle-outline" size={24} color="#666" />
            <Text style={styles.settingText}>About</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>
      </View>

      <View style={[styles.section, styles.dangerSection]}>
        <TouchableOpacity
          style={[styles.settingItem, styles.dangerItem]}
          onPress={handleLogout}
        >
          <View style={styles.settingLeft}>
            <Ionicons name="log-out-outline" size={24} color="#F44336" />
            <Text style={[styles.settingText, styles.dangerText]}>Log Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginVertical: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
  },
  settingValue: {
    fontSize: 16,
    color: '#666',
    marginRight: 8,
  },
  settingDescription: {
    fontSize: 12,
    color: '#999',
    marginLeft: 12,
  },
  dangerSection: {
    marginTop: 32,
    marginBottom: 32,
  },
  dangerItem: {
    borderTopWidth: 0,
  },
  dangerText: {
    color: '#F44336',
  },
});
