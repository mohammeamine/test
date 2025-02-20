import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { Text } from '../ui/Text';
import { LineChart } from 'react-native-chart-kit';

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [2350, 2400, 2450, 2480, 2500, 2550],
      color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

export const EnrollmentTrendChart = () => {
  const { width } = useWindowDimensions();
  const chartWidth = width * 0.75; // Take up 75% of the card width
  const chartHeight = 200; // Fixed height that works well on mobile

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enrollment Trend</Text>
      <LineChart
        data={data}
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
            r: '4',
            strokeWidth: '2',
            stroke: '#2196F3',
          },
          propsForLabels: {
            fontSize: 10,
          },
          propsForVerticalLabels: {
            fontSize: 10,
          },
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});
