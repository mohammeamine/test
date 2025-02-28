import React, { useEffect } from 'react';
import {
  View,
  Text,
  Modal as RNModal,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
  Animated,
  Dimensions,
  Platform,
  BackHandler,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

type ModalSize = 'small' | 'medium' | 'large' | 'full';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  size?: ModalSize;
  children: React.ReactNode;
  actions?: React.ReactNode;
  showCloseButton?: boolean;
  closeOnBackdropPress?: boolean;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  animationType?: 'none' | 'slide' | 'fade';
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  size = 'medium',
  children,
  actions,
  showCloseButton = true,
  closeOnBackdropPress = true,
  style,
  contentStyle,
  titleStyle,
  animationType = 'fade',
}) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (visible) {
          onClose();
          return true;
        }
        return false;
      }
    );

    return () => backHandler.remove();
  }, [visible, onClose]);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 0.9,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, fadeAnim, scaleAnim]);

  const getModalSize = (): ViewStyle => {
    const { width, height } = Dimensions.get('window');
    const maxWidth = Math.min(width, 600);
    const maxHeight = height * 0.9;

    switch (size) {
      case 'small':
        return {
          width: Math.min(300, maxWidth - SPACING.lg * 2),
          maxHeight,
        };
      case 'large':
        return {
          width: Math.min(500, maxWidth - SPACING.lg * 2),
          maxHeight,
        };
      case 'full':
        return {
          width: maxWidth - SPACING.lg * 2,
          maxHeight,
        };
      default:
        return {
          width: Math.min(400, maxWidth - SPACING.lg * 2),
          maxHeight,
        };
    }
  };

  return (
    <RNModal
      visible={visible}
      transparent
      onRequestClose={onClose}
      animationType={animationType}
    >
      <Animated.View
        style={[
          styles.overlay,
          { opacity: fadeAnim },
        ]}
      >
        <TouchableOpacity
          style={styles.backdrop}
          onPress={closeOnBackdropPress ? onClose : undefined}
          activeOpacity={1}
        >
          <Animated.View
            style={[
              styles.container,
              getModalSize(),
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
              style,
            ]}
          >
            <TouchableOpacity activeOpacity={1}>
              <View style={styles.content}>
                {(title || showCloseButton) && (
                  <View style={styles.header}>
                    {title && (
                      <Text
                        style={[styles.title, titleStyle]}
                        numberOfLines={1}
                      >
                        {title}
                      </Text>
                    )}
                    {showCloseButton && (
                      <TouchableOpacity
                        onPress={onClose}
                        style={styles.closeButton}
                        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
                      >
                        <Ionicons
                          name="close"
                          size={24}
                          color={COLORS.grey[600]}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                )}
                <View style={[styles.body, contentStyle]}>
                  {children}
                </View>
                {actions && (
                  <View style={styles.actions}>
                    {actions}
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  container: {
    backgroundColor: COLORS.background.light,
    borderRadius: BORDER_RADIUS.lg,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.grey[900],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  content: {
    maxHeight: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey[200],
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.grey[900],
    marginRight: SPACING.md,
  },
  closeButton: {
    marginLeft: SPACING.md,
  },
  body: {
    padding: SPACING.lg,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.grey[200],
    backgroundColor: COLORS.grey[50],
  },
}); 