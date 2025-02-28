import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  StyleProp,
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

interface ListItemProps {
  title: string;
  subtitle?: string;
  description?: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

interface ListProps<T> {
  data: T[];
  renderItem?: (info: ListRenderItemInfo<T>) => React.ReactElement;
  keyExtractor?: (item: T, index: number) => string;
  ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null;
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
  ListFooterComponent?: React.ComponentType<any> | React.ReactElement | null;
  ItemSeparatorComponent?: React.ComponentType<any> | null;
  onRefresh?: () => void;
  refreshing?: boolean;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  showDividers?: boolean;
  loading?: boolean;
}

export const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  description,
  leftContent,
  rightContent,
  onPress,
  disabled = false,
  style,
}) => {
  const renderContent = () => (
    <>
      {leftContent && (
        <View style={styles.leftContent}>
          {leftContent}
        </View>
      )}
      <View style={styles.itemContent}>
        <Text
          style={[
            styles.itemTitle,
            disabled && styles.itemTextDisabled,
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            style={[
              styles.itemSubtitle,
              disabled && styles.itemTextDisabled,
            ]}
            numberOfLines={1}
          >
            {subtitle}
          </Text>
        )}
        {description && (
          <Text
            style={[
              styles.itemDescription,
              disabled && styles.itemTextDisabled,
            ]}
            numberOfLines={2}
          >
            {description}
          </Text>
        )}
      </View>
      {rightContent && (
        <View style={styles.rightContent}>
          {rightContent}
        </View>
      )}
      {onPress && (
        <Ionicons
          name="chevron-forward"
          size={20}
          color={disabled ? COLORS.grey[400] : COLORS.grey[600]}
          style={styles.chevron}
        />
      )}
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        style={[
          styles.item,
          disabled && styles.itemDisabled,
          style,
        ]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.7}
      >
        {renderContent()}
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={[
        styles.item,
        disabled && styles.itemDisabled,
        style,
      ]}
    >
      {renderContent()}
    </View>
  );
};

export function List<T>({
  data,
  renderItem,
  keyExtractor,
  ListEmptyComponent,
  ListHeaderComponent,
  ListFooterComponent,
  ItemSeparatorComponent,
  onRefresh,
  refreshing = false,
  onEndReached,
  onEndReachedThreshold = 0.5,
  style,
  contentContainerStyle,
  showDividers = true,
  loading = false,
}: ListProps<T>) {
  const defaultKeyExtractor = (item: any, index: number) => {
    return item.id?.toString() || index.toString();
  };

  const Separator = () => (
    showDividers ? <View style={styles.separator} /> : null
  );

  const defaultRenderItem = ({ item }: ListRenderItemInfo<any>) => (
    <ListItem
      title={item.title || item.name || item.label || ''}
      subtitle={item.subtitle}
      description={item.description}
      onPress={item.onPress}
      leftContent={item.leftContent}
      rightContent={item.rightContent}
      disabled={item.disabled}
    />
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem || defaultRenderItem}
      keyExtractor={keyExtractor || defaultKeyExtractor}
      ListEmptyComponent={ListEmptyComponent}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      ItemSeparatorComponent={ItemSeparatorComponent || Separator}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary.main}
            colors={[COLORS.primary.main]}
          />
        ) : undefined
      }
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      style={[styles.list, style]}
      contentContainerStyle={[
        styles.contentContainer,
        !data.length && styles.emptyContainer,
        contentContainerStyle,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: COLORS.background.light,
  },
  contentContainer: {
    flexGrow: 1,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.grey[200],
    marginLeft: SPACING.lg,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.background.light,
  },
  itemDisabled: {
    opacity: 0.6,
  },
  leftContent: {
    marginRight: SPACING.md,
  },
  itemContent: {
    flex: 1,
    marginRight: SPACING.md,
  },
  rightContent: {
    marginLeft: SPACING.md,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.grey[900],
    marginBottom: 2,
  },
  itemSubtitle: {
    fontSize: 14,
    color: COLORS.grey[600],
    marginBottom: 2,
  },
  itemDescription: {
    fontSize: 14,
    color: COLORS.grey[500],
  },
  itemTextDisabled: {
    color: COLORS.grey[400],
  },
  chevron: {
    marginLeft: SPACING.sm,
  },
}); 