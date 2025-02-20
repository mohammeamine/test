import React from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import { Text } from '../ui/Text';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_MARGIN = 8;
const CARDS_PER_ROW = 2;
const CARD_WIDTH = (SCREEN_WIDTH - (CARD_MARGIN * (CARDS_PER_ROW + 1) * 2)) / CARDS_PER_ROW;

interface StatItemProps {
  title: string;
  value: string;
  change?: {
    value: number;
    trend: 'up' | 'down';
  };
  icon: string;
}

const StatItem = ({ title, value, change, icon }: StatItemProps) => (
  <View style={styles.statCard}>
    <View style={styles.statHeader}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon as any} size={24} color="#2196F3" />
      </View>
      {change && (
        <View style={[
          styles.changeContainer,
          { backgroundColor: change.trend === 'up' ? '#e3f2fd' : '#ffebee' }
        ]}>
          <Ionicons
            name={change.trend === 'up' ? 'arrow-up' : 'arrow-down'}
            size={12}
            color={change.trend === 'up' ? '#2196F3' : '#f44336'}
          />
          <Text style={[
            styles.changeText,
            { color: change.trend === 'up' ? '#2196F3' : '#f44336' }
          ]}>
            {change.value}%
          </Text>
        </View>
      )}
    </View>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statTitle}>{title}</Text>
  </View>
);

export const QuickStats = () => {
  const stats: StatItemProps[] = [
    {
      title: 'Total Students',
      value: '2,550',
      change: { value: 12, trend: 'up' },
      icon: 'people',
    },
    {
      title: 'Total Teachers',
      value: '128',
      change: { value: 5, trend: 'up' },
      icon: 'school',
    },
    {
      title: 'Total Classes',
      value: '64',
      icon: 'book',
    },
    {
      title: 'Total Parents',
      value: '3,842',
      change: { value: 8, trend: 'up' },
      icon: 'people',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Quick Stats</Text>
      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <StatItem key={index} {...stat} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    paddingHorizontal: CARD_MARGIN,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1a1a1a',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -CARD_MARGIN,
  },
  statCard: {
    width: CARD_WIDTH,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    margin: CARD_MARGIN,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f7ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  changeText: {
    fontSize: 12,
    marginLeft: 2,
    fontWeight: '500',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    color: '#666',
  },
});
