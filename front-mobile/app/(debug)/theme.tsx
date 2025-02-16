import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text } from '../../src/components/common/Text';
import { Button } from '../../src/components/common/Button';
import { useColors, useSpacing, useTheme } from '../../src/hooks/useTheme';

export default function ThemePreviewScreen() {
  const colors = useColors();
  const spacing = useSpacing();
  const theme = useTheme();

  const colorSwatches = Object.entries(colors).map(([name, value]) => (
    <View key={name} style={styles.swatchContainer}>
      <View style={[styles.swatch, { backgroundColor: value }]} />
      <Text variant="caption">{name}</Text>
      <Text variant="caption" style={styles.colorValue}>{value}</Text>
    </View>
  ));

  const spacingPreview = Object.entries(spacing).map(([key, value]) => (
    <View key={key} style={styles.spacingContainer}>
      <Text variant="caption">spacing[{key}]</Text>
      <View style={[styles.spacingBox, { width: value, backgroundColor: colors.primary }]} />
      <Text variant="caption">{value}px</Text>
    </View>
  ));

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ padding: spacing[4] }}
    >
      <Text variant="h1" style={styles.title}>Colors</Text>
      <View style={styles.swatchGrid}>{colorSwatches}</View>

      <Text variant="h1" style={[styles.title, { marginTop: spacing[6] }]}>Spacing</Text>
      <View style={styles.spacingPreview}>{spacingPreview}</View>

      <Text variant="h1" style={[styles.title, { marginTop: spacing[6] }]}>Typography</Text>
      <View style={styles.typographyPreview}>
        <Text variant="h1">Heading 1</Text>
        <Text variant="h2">Heading 2</Text>
        <Text variant="h3">Heading 3</Text>
        <Text variant="body">Body Text</Text>
        <Text variant="caption">Caption Text</Text>
      </View>

      <Text variant="h1" style={[styles.title, { marginTop: spacing[6] }]}>Buttons</Text>
      <View style={[styles.buttonContainer, { gap: spacing[3] }]}>
        <Button variant="primary">Primary Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button variant="ghost">Ghost Button</Button>
        <Button variant="primary" loading>Loading Button</Button>
        <Button variant="primary" disabled>Disabled Button</Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginBottom: 16,
  },
  swatchGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  swatchContainer: {
    alignItems: 'center',
    width: 100,
  },
  swatch: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginBottom: 8,
  },
  colorValue: {
    opacity: 0.5,
  },
  spacingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  spacingBox: {
    height: 20,
    marginHorizontal: 16,
  },
  spacingPreview: {
    marginTop: 16,
  },
  typographyPreview: {
    marginTop: 16,
    gap: 8,
  },
  buttonContainer: {
    marginTop: 16,
  },
}); 