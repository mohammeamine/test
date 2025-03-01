import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { Text } from '../ui/Text';
import { BarChart } from 'react-native-chart-kit';
import { AttendanceData } from '../../services/dashboard';
import { scale, verticalScale } from '../../utils/responsive';

interface AttendanceSummaryChartProps {
  data?: AttendanceData;
}

export const AttendanceSummaryChart: React.FC<AttendanceSummaryChartProps> = ({ data }) => {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 360;
  const chartWidth = width - (isSmallScreen ? 32 : 64);
  const chartHeight = isSmallScreen ? 180 : 220;

  if (!data) {
    return (
      <View style={styles.placeholder}>
        <Text>No attendance data available</Text>
      </View>
    );
  }

  // For small screens, show fewer labels if needed
  const labelCount = isSmallScreen ? Math.min(data.labels.length, 4) : data.labels.length;
  const step = Math.ceil(data.labels.length / labelCount);
  
  const chartData = {
    labels: data.labels.filter((_, i) => i % step === 0),
    datasets: [
      {
        data: data.data,
      },
    ],
  };

  const average = data.data.reduce((a, b) => a + b, 0) / data.data.length;
  const highest = Math.max(...data.data);
  const lowest = Math.min(...data.data);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, isSmallScreen && styles.smallTitle]}>
        Weekly Attendance
      </Text>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, isSmallScreen && styles.smallStatValue]}>
            {average.toFixed(1)}%
          </Text>
          <Text style={[styles.statLabel, isSmallScreen && styles.smallStatLabel]}>
            Average
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, isSmallScreen && styles.smallStatValue]}>
            {highest}%
          </Text>
          <Text style={[styles.statLabel, isSmallScreen && styles.smallStatLabel]}>
            Highest
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, isSmallScreen && styles.smallStatValue]}>
            {lowest}%
          </Text>
          <Text style={[styles.statLabel, isSmallScreen && styles.smallStatLabel]}>
            Lowest
          </Text>
        </View>
      </View>

      <BarChart
        data={chartData}
        width={chartWidth}
        height={chartHeight}
        yAxisLabel=""
        yAxisSuffix="%"
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(102, 102, 102, ${opacity})`,
          style: {
            borderRadius: scale(16),
          },
          barPercentage: isSmallScreen ? 0.8 : 0.7,
          propsForLabels: {
            fontSize: isSmallScreen ? 10 : 12,
          },
          propsForVerticalLabels: {
            fontSize: isSmallScreen ? 10 : 12,
          },
        }}
        style={styles.chart}
        showValuesOnTopOfBars={!isSmallScreen}
        withInnerLines={false}
        fromZero={false}
        segments={isSmallScreen ? 3 : 4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: verticalScale(8),
    backgroundColor: 'white',
    borderRadius: scale(12),
    padding: scale(12),
    marginBottom: verticalScale(12),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: scale(18),
    fontWeight: 'bold',
    marginBottom: verticalScale(12),
  },
  smallTitle: {
    fontSize: scale(16),
    marginBottom: verticalScale(8),
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: verticalScale(12),
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: scale(20),
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: verticalScale(4),
  },
  smallStatValue: {
    fontSize: scale(16),
  },
  statLabel: {
    fontSize: scale(12),
    color: '#666',
  },
  smallStatLabel: {
    fontSize: scale(10),
  },
  chart: {
    marginVertical: verticalScale(4),
    borderRadius: scale(16),
  },
  placeholder: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
