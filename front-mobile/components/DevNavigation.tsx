import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// List of all available routes in the app
const routes = [
  { name: 'Home', path: '/' },
  { name: 'Sign Up', path: '/signup' },
  // Auth routes
  { name: 'Auth Home', path: '/(auth)/' },
  // Admin routes
  { name: 'Admin Dashboard', path: '/admin/dashboard' },
  // Parent routes
  { name: 'Parent Dashboard', path: '/parent/dashboard' },
  // Student routes
  { name: 'Student Dashboard', path: '/student/dashboard' },
  // Teacher routes
  { name: 'Teacher Dashboard', path: '/teacher/dashboard' },
];

export const DevNavigation = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const navigateToRoute = (path: string) => {
    setModalVisible(false);
    router.push(path as any);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="menu" size={24} color="white" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Development Navigation</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.routeList}>
              {routes.map((route, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.routeItem}
                  onPress={() => navigateToRoute(route.path)}
                >
                  <Text style={styles.routeText}>{route.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#2196F3',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  routeList: {
    flexGrow: 0,
  },
  routeItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  routeText: {
    fontSize: 16,
  },
});
