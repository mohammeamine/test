import React from 'react';
import { Stack } from 'expo-router';
import { useColors } from '../../../src/hooks/useTheme';

export default function AcademicLayout() {
  const colors = useColors();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Academic',
        }}
      />
      <Stack.Screen
        name="departments"
        options={{
          title: 'Departments',
        }}
      />
      <Stack.Screen
        name="departments/add"
        options={{
          title: 'Add Department',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="departments/edit"
        options={{
          title: 'Edit Department',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="courses"
        options={{
          title: 'Courses',
        }}
      />
      <Stack.Screen
        name="courses/add"
        options={{
          title: 'Add Course',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="grades"
        options={{
          title: 'Grades',
        }}
      />
      <Stack.Screen
        name="grades/add"
        options={{
          title: 'Add Grade',
          presentation: 'modal',
        }}
      />
    </Stack>
  );
} 