import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { Text } from '../ui/Text';
import { Card } from '../ui/Card';
import { Ionicons } from '@expo/vector-icons';
import { scale, verticalScale } from '../../utils/responsive';
import { QuickStat } from '../../services/dashboard';

interface QuickStatsProps {
  data?: QuickStat[];
}

export const QuickStats: React.FC<QuickStatsProps> = ({ data = [] }) => {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 360;
  const gridColumns = width < 480 ? 1 : 2;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Quick Stats</Text>
      <View style={[styles.statsGrid, { flexDirection: gridColumns === 1 ? 'column' : 'row' }]}>
        {data.map((stat) => (
          <Card key={stat.id} style={[styles.statCard, gridColumns === 1 && styles.fullWidthCard]}>
            <View style={styles.statHeader}>
              <View style={[styles.iconContainer, isSmallScreen && styles.smallIconContainer]}>
                <Ionicons name={stat.icon as any} size={isSmallScreen ? 20 : 24} color="#2196F3" />
              </View>
              {stat.change && (
                <View style={[
                  styles.changeContainer,
                  { backgroundColor: stat.change.trend === 'up' ? '#e3f2fd' : '#ffebee' }
                ]}>
                  <Ionicons
                    name={stat.change.trend === 'up' ? 'arrow-up' : 'arrow-down'}
                    size={12}
                    color={stat.change.trend === 'up' ? '#2196F3' : '#f44336'}
                  />
                  <Text style={[
                    styles.changeText,
                    { color: stat.change.trend === 'up' ? '#2196F3' : '#f44336' }
                  ]}>
                    {stat.change.value}%
                  </Text>
                </View>
              )}
            </View>
            <Text style={[styles.statValue, isSmallScreen && styles.smallStatValue]}>
              {stat.value}
            </Text>
            <Text style={[styles.statTitle, isSmallScreen && styles.smallStatTitle]}>
              {stat.title}
            </Text>
          </Card>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: verticalScale(16),
    padding: scale(8),
  },
  sectionTitle: {
    fontSize: scale(18),
    fontWeight: 'bold',
    marginBottom: verticalScale(16),
    paddingHorizontal: scale(8),
  },
  statsGrid: {
    flexWrap: 'wrap',
    margin: -scale(4),
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    margin: scale(4),
    padding: scale(12),
  },
  fullWidthCard: {
    minWidth: '100%',
    marginBottom: scale(8),
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(8),
  },
  iconContainer: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: '#f0f7ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallIconContainer: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(6),
    paddingVertical: scale(2),
    borderRadius: scale(12),
  },
  changeText: {
    fontSize: scale(12),
    marginLeft: scale(2),
    fontWeight: '500',
  },
  statValue: {
    fontSize: scale(24),
    fontWeight: 'bold',
    marginBottom: verticalScale(4),
  },
  smallStatValue: {
    fontSize: scale(20),
  },
  statTitle: {
    fontSize: scale(14),
    color: '#666',
  },
  smallStatTitle: {
    fontSize: scale(12),
  },
});
