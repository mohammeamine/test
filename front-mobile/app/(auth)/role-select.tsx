import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '../../components/ui/Text';
import { Card } from '../../components/ui/Card';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const roles = [
  {
    id: 'admin',
    title: 'Administrator',
    description: 'Manage the entire school system',
    icon: 'settings-sharp',
    route: '/admin/dashboard',
  },
  {
    id: 'teacher',
    title: 'Teacher',
    description: 'Manage classes and students',
    icon: 'school',
    route: '/teacher/dashboard',
  },
  {
    id: 'student',
    title: 'Student',
    description: 'View courses and grades',
    icon: 'person',
    route: '/student/dashboard',
  },
];

export default function RoleSelect() {
  const router = useRouter();

  const handleRoleSelect = (route: string) => {
    router.replace(route as any);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Role</Text>
      <Text style={styles.subtitle}>Choose your role to continue</Text>
      
      <View style={styles.rolesContainer}>
        {roles.map((role) => (
          <TouchableOpacity
            key={role.id}
            style={styles.roleCard}
            onPress={() => handleRoleSelect(role.route)}
          >
            <Card style={styles.cardContent}>
              <Ionicons name={role.icon as any} size={32} color="#2196F3" />
              <Text style={styles.roleTitle}>{role.title}</Text>
              <Text style={styles.roleDescription}>{role.description}</Text>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  rolesContainer: {
    flex: 1,
    gap: 16,
  },
  roleCard: {
    width: '100%',
  },
  cardContent: {
    padding: 20,
    alignItems: 'center',
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4,
  },
  roleDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});