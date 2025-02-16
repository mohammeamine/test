import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Text } from '../../../../src/components/common/Text';
import { Button } from '../../../../src/components/common/Button';
import { useColors, useSpacing } from '../../../../src/hooks/useTheme';
import { router } from 'expo-router';

export default function AddGradeScreen() {
  const colors = useColors();
  const spacing = useSpacing();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    student: '',
    course: '',
    grade: '',
    semester: '',
    date: '',
    notes: '',
  });

  const handleSubmit = async () => {
    setIsLoading(true);
    // TODO: Implement grade creation
    setTimeout(() => {
      setIsLoading(false);
      router.back();
    }, 1000);
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ padding: spacing[4] }}
    >
      <View style={styles.form}>
        <View style={styles.formField}>
          <Text variant="caption" style={{ color: colors.textSecondary }}>
            Student Name
          </Text>
          <TextInput
            value={formData.student}
            onChangeText={(text) => setFormData(prev => ({ ...prev, student: text }))}
            style={[
              styles.input,
              { 
                backgroundColor: colors.surface,
                color: colors.text,
                borderRadius: 8,
              }
            ]}
            placeholder="Enter student name"
            placeholderTextColor={colors.textSecondary}
          />
        </View>

        <View style={styles.formField}>
          <Text variant="caption" style={{ color: colors.textSecondary }}>
            Course
          </Text>
          <TextInput
            value={formData.course}
            onChangeText={(text) => setFormData(prev => ({ ...prev, course: text }))}
            style={[
              styles.input,
              { 
                backgroundColor: colors.surface,
                color: colors.text,
                borderRadius: 8,
              }
            ]}
            placeholder="Enter course name"
            placeholderTextColor={colors.textSecondary}
          />
        </View>

        <View style={styles.formField}>
          <Text variant="caption" style={{ color: colors.textSecondary }}>
            Grade
          </Text>
          <TextInput
            value={formData.grade}
            onChangeText={(text) => setFormData(prev => ({ ...prev, grade: text }))}
            style={[
              styles.input,
              { 
                backgroundColor: colors.surface,
                color: colors.text,
                borderRadius: 8,
              }
            ]}
            placeholder="Enter grade (e.g., A, B+, C)"
            placeholderTextColor={colors.textSecondary}
          />
        </View>

        <View style={styles.formField}>
          <Text variant="caption" style={{ color: colors.textSecondary }}>
            Semester
          </Text>
          <TextInput
            value={formData.semester}
            onChangeText={(text) => setFormData(prev => ({ ...prev, semester: text }))}
            style={[
              styles.input,
              { 
                backgroundColor: colors.surface,
                color: colors.text,
                borderRadius: 8,
              }
            ]}
            placeholder="Enter semester (e.g., Fall 2023)"
            placeholderTextColor={colors.textSecondary}
          />
        </View>

        <View style={styles.formField}>
          <Text variant="caption" style={{ color: colors.textSecondary }}>
            Date
          </Text>
          <TextInput
            value={formData.date}
            onChangeText={(text) => setFormData(prev => ({ ...prev, date: text }))}
            style={[
              styles.input,
              { 
                backgroundColor: colors.surface,
                color: colors.text,
                borderRadius: 8,
              }
            ]}
            placeholder="Enter date (YYYY-MM-DD)"
            placeholderTextColor={colors.textSecondary}
          />
        </View>

        <View style={styles.formField}>
          <Text variant="caption" style={{ color: colors.textSecondary }}>
            Notes
          </Text>
          <TextInput
            value={formData.notes}
            onChangeText={(text) => setFormData(prev => ({ ...prev, notes: text }))}
            style={[
              styles.input,
              styles.textArea,
              { 
                backgroundColor: colors.surface,
                color: colors.text,
                borderRadius: 8,
              }
            ]}
            placeholder="Enter additional notes"
            placeholderTextColor={colors.textSecondary}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <View style={[styles.actions, { marginTop: spacing[6] }]}>
          <Button
            variant="secondary"
            onPress={() => router.back()}
            style={{ flex: 1 }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onPress={handleSubmit}
            loading={isLoading}
            style={{ flex: 1 }}
          >
            Create
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    gap: 20,
  },
  formField: {
    gap: 8,
  },
  input: {
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
}); 