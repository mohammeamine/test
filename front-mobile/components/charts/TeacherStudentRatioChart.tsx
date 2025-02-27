import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { Text } from '../ui/Text';
import { PieChart } from 'react-native-chart-kit';
import { TeacherStudentRatioData } from '../../services/dashboard';
import { scale, verticalScale } from '../../utils/responsive';

interface TeacherStudentRatioChartProps {
  data?: TeacherStudentRatioData;
}

export const TeacherStudentRatioChart: React.FC<TeacherStudentRatioChartProps> = ({ data }) => {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 360;
  const chartWidth = width - (isSmallScreen ? 32 : 64);
  const chartHeight = isSmallScreen ? 180 : 220;

  if (!data) {
    return (
      <View style={styles.placeholder}>
        <Text>No ratio data available</Text>
      </View>
    );
  }

  const chartData = [
    {
      name: 'Teachers',
      population: data.teachers,
      color: '#4CAF50',
      legendFontColor: '#666',
      legendFontSize: isSmallScreen ? 10 : 12,
    },
    {
      name: 'Students',
      population: data.students,
      color: '#2196F3',
      legendFontColor: '#666',
      legendFontSize: isSmallScreen ? 10 : 12,
    },
  ];

  const ratio = (data.students / data.teachers).toFixed(1);

  return (
    <View style={styles.container}>
      <View style={styles.ratioContainer}>
        <Text style={[styles.ratioText, isSmallScreen && styles.smallRatioText]}>
          1:{ratio}
        </Text>
        <Text style={[styles.ratioLabel, isSmallScreen && styles.smallRatioLabel]}>
          Teacher to Student Ratio
        </Text>
      </View>
      <PieChart
        data={chartData}
        width={chartWidth}
        height={chartHeight}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: scale(16),
          },
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft={isSmallScreen ? "15" : "0"}
        center={[isSmallScreen ? 0 : 10, 0]}
        absolute
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: scale(12),
  },
  ratioContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  ratioText: {
    fontSize: scale(24),
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: verticalScale(4),
  },
  smallRatioText: {
    fontSize: scale(20),
  },
  ratioLabel: {
    fontSize: scale(14),
    color: '#666',
  },
  smallRatioLabel: {
    fontSize: scale(12),
  },
  placeholder: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
