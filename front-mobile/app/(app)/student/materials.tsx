import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Text } from '../../../components/ui/Text';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Ionicons } from '@expo/vector-icons';
import { NAVIGATION_THEME } from '../../../navigation/constants';
import { scale } from '../../../utils/responsive';

export default function MaterialsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Mock data - Replace with actual API calls
  const categories = ['all', 'books', 'presentations', 'documents', 'videos'];
  const materials = [
    {
      id: '1',
      title: 'Mathematics Textbook',
      category: 'books',
      subject: 'Mathematics',
      size: '15.2 MB',
      uploadDate: '2024-02-25',
      description: 'Complete mathematics textbook for the semester',
    },
    {
      id: '2',
      title: 'Physics Lab Guide',
      category: 'documents',
      subject: 'Physics',
      size: '2.8 MB',
      uploadDate: '2024-02-28',
      description: 'Laboratory procedures and safety guidelines',
    },
    {
      id: '3',
      title: 'Chemistry Lecture Slides',
      category: 'presentations',
      subject: 'Chemistry',
      size: '5.4 MB',
      uploadDate: '2024-03-01',
      description: 'Lecture slides covering organic chemistry',
    },
  ];

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || material.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderMaterialCard = (material: typeof materials[0]) => (
    <Card key={material.id} style={styles.materialCard}>
      <View style={styles.materialHeader}>
        <View style={styles.titleContainer}>
          <Text style={styles.materialTitle}>{material.title}</Text>
          <Text style={styles.subject}>{material.subject}</Text>
        </View>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>
            {material.category.charAt(0).toUpperCase() + material.category.slice(1)}
          </Text>
        </View>
      </View>
      
      <Text style={styles.description}>{material.description}</Text>
      
      <View style={styles.footer}>
        <View style={styles.materialInfo}>
          <Text style={styles.infoText}>Size: {material.size}</Text>
          <Text style={styles.infoText}>Uploaded: {material.uploadDate}</Text>
        </View>
        <Button
          title="Download"
          onPress={() => {/* Handle download */}}
          style={styles.downloadButton}
        />
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search materials..."
            style={styles.searchInput}
          />
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.categoryContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryButtonText,
                selectedCategory === category && styles.categoryButtonTextActive
              ]}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content}>
        {filteredMaterials.map(renderMaterialCard)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NAVIGATION_THEME.colors.background,
  },
  header: {
    padding: NAVIGATION_THEME.spacing.md,
    backgroundColor: NAVIGATION_THEME.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: NAVIGATION_THEME.colors.border,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: NAVIGATION_THEME.colors.surfaceVariant,
    borderRadius: NAVIGATION_THEME.shape.small,
    padding: NAVIGATION_THEME.spacing.sm,
  },
  searchIcon: {
    marginRight: NAVIGATION_THEME.spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: scale(14),
  },
  categoryContainer: {
    marginTop: NAVIGATION_THEME.spacing.md,
  },
  categoryButton: {
    paddingVertical: NAVIGATION_THEME.spacing.sm,
    paddingHorizontal: NAVIGATION_THEME.spacing.md,
    borderRadius: NAVIGATION_THEME.shape.small,
    backgroundColor: NAVIGATION_THEME.colors.surfaceVariant,
    marginRight: NAVIGATION_THEME.spacing.sm,
  },
  categoryButtonActive: {
    backgroundColor: NAVIGATION_THEME.colors.primary,
  },
  categoryButtonText: {
    color: NAVIGATION_THEME.colors.onSurfaceVariant,
  },
  categoryButtonTextActive: {
    color: NAVIGATION_THEME.colors.surface,
  },
  content: {
    flex: 1,
    padding: NAVIGATION_THEME.spacing.md,
  },
  materialCard: {
    marginBottom: NAVIGATION_THEME.spacing.md,
    padding: NAVIGATION_THEME.spacing.md,
  },
  materialHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: NAVIGATION_THEME.spacing.sm,
  },
  titleContainer: {
    flex: 1,
  },
  materialTitle: {
    fontSize: scale(16),
    fontWeight: '600',
    marginBottom: NAVIGATION_THEME.spacing.xs,
  },
  subject: {
    fontSize: scale(14),
    color: NAVIGATION_THEME.colors.onSurfaceVariant,
  },
  categoryBadge: {
    backgroundColor: NAVIGATION_THEME.colors.surfaceVariant,
    paddingHorizontal: NAVIGATION_THEME.spacing.sm,
    paddingVertical: NAVIGATION_THEME.spacing.xs,
    borderRadius: NAVIGATION_THEME.shape.extraSmall,
    marginLeft: NAVIGATION_THEME.spacing.sm,
  },
  categoryText: {
    fontSize: scale(12),
    color: NAVIGATION_THEME.colors.onSurfaceVariant,
  },
  description: {
    fontSize: scale(14),
    marginBottom: NAVIGATION_THEME.spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  materialInfo: {
    flex: 1,
  },
  infoText: {
    fontSize: scale(12),
    color: NAVIGATION_THEME.colors.onSurfaceVariant,
    marginBottom: 2,
  },
  downloadButton: {
    paddingHorizontal: NAVIGATION_THEME.spacing.md,
  },
}); 