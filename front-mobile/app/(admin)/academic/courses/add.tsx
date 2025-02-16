import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Text } from '../../../../src/components/common/Text';
import { Button } from '../../../../src/components/common/Button';
import { useColors, useSpacing } from '../../../../src/hooks/useTheme';
import { router } from 'expo-router';

export default function AddCourseScreen() {
  const colors = useColors();
  const spacing = useSpacing();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    department: '',
    instructor: '',
    credits: '',
    description: '',
  });

  const handleSubmit = async () => {
    setIsLoading(true);
    // TODO: Implement course creation
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
            Course Code
          </Text>
          <TextInput
            value={formData.code}
            onChangeText={(text) => setFormData(prev => ({ ...prev, code: text }))}
            style={[
              styles.input,
              { 
                backgroundColor: colors.surface,
                color: colors.text,
                borderRadius: 8,
              }
            ]}
            placeholder="Enter course code"
            placeholderTextColor={colors.textSecondary}
          />
        </View>

        <View style={styles.formField}>
          <Text variant="caption" style={{ color: colors.textSecondary }}>
            Course Name
          </Text>
          <TextInput
            value={formData.name}
            onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
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
            Department
          </Text>
          <TextInput
            value={formData.department}
            onChangeText={(text) => setFormData(prev => ({ ...prev, department: text }))}
            style={[
              styles.input,
              { 
                backgroundColor: colors.surface,
                color: colors.text,
                borderRadius: 8,
              }
            ]}
            placeholder="Enter department"
            placeholderTextColor={colors.textSecondary}
          />
        </View>

        <View style={styles.formField}>
          <Text variant="caption" style={{ color: colors.textSecondary }}>
            Instructor
          </Text>
          <TextInput
            value={formData.instructor}
            onChangeText={(text) => setFormData(prev => ({ ...prev, instructor: text }))}
            style={[
              styles.input,
              { 
                backgroundColor: colors.surface,
                color: colors.text,
                borderRadius: 8,
              }
            ]}
            placeholder="Enter instructor name"
            placeholderTextColor={colors.textSecondary}
          />
        </View>

        <View style={styles.formField}>
          <Text variant="caption" style={{ color: colors.textSecondary }}>
            Credits
          </Text>
          <TextInput
            value={formData.credits}
            onChangeText={(text) => setFormData(prev => ({ ...prev, credits: text }))}
            style={[
              styles.input,
              { 
                backgroundColor: colors.surface,
                color: colors.text,
                borderRadius: 8,
              }
            ]}
            placeholder="Enter credits"
            placeholderTextColor={colors.textSecondary}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.formField}>
          <Text variant="caption" style={{ color: colors.textSecondary }}>
            Description
          </Text>
          <TextInput
            value={formData.description}
            onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
            style={[
              styles.input,
              styles.textArea,
              { 
                backgroundColor: colors.surface,
                color: colors.text,
                borderRadius: 8,
              }
            ]}
            placeholder="Enter course description"
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