import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { Text } from '../ui/Text';
import { LineChart } from 'react-native-chart-kit';
import { EnrollmentData } from '../../services/dashboard';
import { scale, verticalScale } from '../../utils/responsive';

interface EnrollmentTrendChartProps {
  data?: EnrollmentData;
}

export const EnrollmentTrendChart: React.FC<EnrollmentTrendChartProps> = ({ data }) => {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 360;
  const chartWidth = width - (isSmallScreen ? 32 : 64);
  const chartHeight = isSmallScreen ? 180 : 220;

  if (!data) {
    return (
      <View style={styles.placeholder}>
        <Text>No enrollment data available</Text>
      </View>
    );
  }

  // For small screens, show fewer labels
  const labelCount = isSmallScreen ? 3 : data.labels.length;
  const step = Math.ceil(data.labels.length / labelCount);
  
  const chartData = {
    labels: data.labels.filter((_, i) => i % step === 0),
    datasets: [
      {
        data: data.data,
        color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, isSmallScreen && styles.smallTitle]}>Enrollment Trend</Text>
      <LineChart
        data={chartData}
        width={chartWidth}
        height={chartHeight}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(102, 102, 102, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: isSmallScreen ? 3 : 4,
            strokeWidth: isSmallScreen ? 1 : 2,
            stroke: '#2196F3',
          },
          propsForLabels: {
            fontSize: isSmallScreen ? 10 : 12,
          },
          propsForVerticalLabels: {
            fontSize: isSmallScreen ? 10 : 12,
          },
          formatYLabel: (yLabel: string) => Math.round(parseFloat(yLabel)).toString(),
        }}
        bezier
        style={styles.chart}
        withInnerLines={false}
        withOuterLines={true}
        withVerticalLines={false}
        withHorizontalLines={true}
        withVerticalLabels={true}
        withHorizontalLabels={true}
        fromZero={true}
        getDotColor={() => '#2196F3'}
        segments={isSmallScreen ? 3 : 4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
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
  chart: {
    marginVertical: scale(4),
    borderRadius: scale(16),
  },
  placeholder: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
