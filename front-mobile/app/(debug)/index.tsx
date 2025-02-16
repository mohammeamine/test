import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Button } from '../../src/components/common/Button';
import { Text } from '../../src/components/common/Text';
import { useColors, useSpacing } from '../../src/hooks/useTheme';

const routeSections = [
  {
    title: 'Authentication',
    routes: [
      { title: 'Landing', href: '/' },
      { title: 'Sign In', href: '/(auth)/sign-in' },
      { title: 'Sign Up', href: '/(auth)/sign-up' },
      { title: 'Forgot Password', href: '/(auth)/forgot-password' },
    ],
  },
  {
    title: 'Admin Dashboard',
    routes: [
      { title: 'Dashboard Home', href: '/(admin)' },
      { title: 'Settings', href: '/(admin)/settings' },
    ],
  },
  {
    title: 'Academic Management',
    routes: [
      { title: 'Academic Overview', href: '/(admin)/academic' },
      { title: 'Departments', href: '/(admin)/academic/departments' },
      { title: 'Courses', href: '/(admin)/academic/courses' },
      { title: 'Grades', href: '/(admin)/academic/grades' },
    ],
  },
  {
    title: 'Student Management',
    routes: [
      { title: 'Students List', href: '/(admin)/students' },
      { title: 'Student Attendance', href: '/(admin)/students/attendance' },
      { title: 'Student Grades', href: '/(admin)/students/grades' },
    ],
  },
  {
    title: 'Staff Management',
    routes: [
      { title: 'Teachers', href: '/(admin)/teachers' },
      { title: 'Staff List', href: '/(admin)/staff' },
    ],
  },
  {
    title: 'Monitoring',
    routes: [
      { title: 'Monitoring Overview', href: '/(admin)/monitoring' },
      { title: 'Schedule', href: '/(admin)/monitoring/schedule' },
      { title: 'Attendance', href: '/(admin)/monitoring/attendance' },
    ],
  },
  {
    title: 'Teacher Portal',
    routes: [
      { title: 'Teacher Dashboard', href: '/(teacher)' },
      { title: 'My Classes', href: '/(teacher)/classes' },
      { title: 'Assignments', href: '/(teacher)/assignments' },
    ],
  },
  {
    title: 'Student Portal',
    routes: [
      { title: 'Student Dashboard', href: '/(student)' },
      { title: 'My Courses', href: '/(student)/courses' },
      { title: 'My Grades', href: '/(student)/grades' },
    ],
  },
] as const;

export default function DebugScreen() {
  const colors = useColors();
  const spacing = useSpacing();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {routeSections.map((section) => (
        <View key={section.title} style={{ marginBottom: spacing[6] }}>
          <Text 
            variant="h2" 
            style={[
              styles.sectionTitle, 
              { 
                color: colors.primary,
                marginBottom: spacing[2],
                marginHorizontal: spacing[4],
              }
            ]}
          >
            {section.title}
          </Text>
          <View style={[styles.buttonContainer, { paddingHorizontal: spacing[4] }]}>
            {section.routes.map((route) => (
              <Link key={route.href} href={route.href} asChild>
                <Button 
                  variant="secondary"
                  style={styles.button}
                >
                  {route.title}
                </Button>
              </Link>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    gap: 12,
  },
  button: {
    width: '100%',
  },
}); 