import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Text } from './ui/Text';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { NAVIGATION_GROUPS, ROLE_COLORS, NAVIGATION_THEME } from '../navigation/constants';
import { RoleType } from '../navigation/types';
import { scale, verticalScale } from '../utils/responsive';

export const DevNavigation = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState<RoleType | null>(null);
  const router = useRouter();

  const handleNavigation = (role: RoleType, path: string) => {
    router.push(`/(app)/${role}/${path}` as any);
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="code-working" size={24} color="white" />
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
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <View style={styles.roleSelector}>
              {(Object.keys(NAVIGATION_GROUPS) as RoleType[]).map((role) => (
                <TouchableOpacity
                  key={role}
                  style={[
                    styles.roleButton,
                    selectedRole === role && {
                      backgroundColor: `${ROLE_COLORS[role].primary}15`,
                    },
                  ]}
                  onPress={() => setSelectedRole(role)}
                >
                  <Text
                    style={[
                      styles.roleText,
                      selectedRole === role && {
                        color: ROLE_COLORS[role].primary,
                        fontWeight: '600',
                      },
                    ]}
                  >
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <ScrollView style={styles.routeList}>
              {selectedRole &&
                NAVIGATION_GROUPS[selectedRole].map((group) => (
                  <View key={group.name} style={styles.group}>
                    <Text style={styles.groupTitle}>{group.name}</Text>
                    {group.routes.map((route) => (
                      <TouchableOpacity
                        key={route.path}
                        style={styles.routeItem}
                        onPress={() => handleNavigation(selectedRole, route.path)}
                      >
                        <Ionicons
                          name={route.icon}
                          size={20}
                          color={ROLE_COLORS[selectedRole].primary}
                          style={styles.routeIcon}
                        />
                        <Text style={styles.routeText}>{route.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
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
    right: NAVIGATION_THEME.spacing.md,
    bottom: NAVIGATION_THEME.spacing.md,
    backgroundColor: '#2196F3',
    width: scale(56),
    height: scale(56),
    borderRadius: scale(28),
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
    backgroundColor: NAVIGATION_THEME.colors.background,
    borderRadius: scale(20),
    width: '90%',
    maxHeight: '80%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: NAVIGATION_THEME.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: NAVIGATION_THEME.colors.border,
  },
  modalTitle: {
    fontSize: scale(18),
    fontWeight: 'bold',
  },
  closeButton: {
    padding: NAVIGATION_THEME.spacing.xs,
  },
  roleSelector: {
    flexDirection: 'row',
    padding: NAVIGATION_THEME.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: NAVIGATION_THEME.colors.border,
  },
  roleButton: {
    paddingHorizontal: NAVIGATION_THEME.spacing.md,
    paddingVertical: NAVIGATION_THEME.spacing.sm,
    borderRadius: scale(20),
    marginRight: NAVIGATION_THEME.spacing.sm,
  },
  roleText: {
    fontSize: scale(14),
    color: '#666',
  },
  routeList: {
    flexGrow: 0,
    padding: NAVIGATION_THEME.spacing.sm,
  },
  group: {
    marginBottom: NAVIGATION_THEME.spacing.md,
  },
  groupTitle: {
    fontSize: scale(16),
    fontWeight: '600',
    marginBottom: NAVIGATION_THEME.spacing.sm,
    paddingHorizontal: NAVIGATION_THEME.spacing.sm,
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: NAVIGATION_THEME.spacing.sm,
    borderRadius: scale(8),
    marginBottom: 2,
  },
  routeIcon: {
    marginRight: NAVIGATION_THEME.spacing.sm,
  },
  routeText: {
    fontSize: scale(14),
  },
});
