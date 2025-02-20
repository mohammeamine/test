import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { Text } from '../ui/Text';
import { PieChart } from 'react-native-chart-kit';

const data = [
  {
    name: 'Students',
    population: 2550,
    color: '#2196F3',
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  },
  {
    name: 'Teachers',
    population: 128,
    color: '#4CAF50',
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  },
];

export const TeacherStudentRatioChart = () => {
  const screenWidth = Dimensions.get('window').width - 32;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Teacher-Student Ratio</Text>
      <View style={styles.ratioContainer}>
        <Text style={styles.ratioText}>1:20</Text>
        <Text style={styles.ratioLabel}>Average Ratio</Text>
      </View>
      <PieChart
        data={data}
        width={screenWidth}
        height={200}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
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
  ratioContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  ratioText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  ratioLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
