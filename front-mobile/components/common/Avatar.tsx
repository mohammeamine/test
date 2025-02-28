import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
  ImageStyle,
  ImageSourcePropType,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../theme';

type AvatarSize = 'small' | 'medium' | 'large' | 'xlarge';
type AvatarVariant = 'circular' | 'rounded' | 'square';

interface AvatarProps {
  source?: ImageSourcePropType;
  name?: string;
  size?: AvatarSize;
  variant?: AvatarVariant;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  backgroundColor?: string;
  textColor?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  name,
  size = 'medium',
  variant = 'circular',
  style,
  imageStyle,
  backgroundColor,
  textColor,
}) => {
  const [imageError, setImageError] = useState(false);

  const getSize = (): number => {
    switch (size) {
      case 'small':
        return 32;
      case 'large':
        return 56;
      case 'xlarge':
        return 80;
      default:
        return 40;
    }
  };

  const getBorderRadius = (): number => {
    const avatarSize = getSize();
    switch (variant) {
      case 'square':
        return 0;
      case 'rounded':
        return BORDER_RADIUS.md;
      default:
        return avatarSize / 2;
    }
  };

  const getFontSize = (): number => {
    switch (size) {
      case 'small':
        return 14;
      case 'large':
        return 24;
      case 'xlarge':
        return 32;
      default:
        return 16;
    }
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRandomColor = (name: string): string => {
    const colors = [
      COLORS.primary.light,
      COLORS.secondary.light,
      COLORS.success.light,
      COLORS.warning.light,
      COLORS.error.light,
    ];
    
    const index = name.split('').reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0) % colors.length;

    return colors[index];
  };

  const containerSize = getSize();
  const containerStyle: ViewStyle = {
    width: containerSize,
    height: containerSize,
    borderRadius: getBorderRadius(),
    backgroundColor: backgroundColor || (name ? getRandomColor(name) : COLORS.grey[300]),
  };

  const renderContent = () => {
    if (source && !imageError) {
      return (
        <Image
          source={source}
          style={[
            styles.image,
            {
              width: containerSize,
              height: containerSize,
              borderRadius: getBorderRadius(),
            },
            imageStyle,
          ]}
          onError={() => setImageError(true)}
        />
      );
    }

    if (name) {
      return (
        <Text
          style={[
            styles.text,
            {
              fontSize: getFontSize(),
              color: textColor || COLORS.grey[800],
            },
          ]}
          numberOfLines={1}
        >
          {getInitials(name)}
        </Text>
      );
    }

    return null;
  };

  return (
    <View style={[styles.container, containerStyle, style]}>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
}); 