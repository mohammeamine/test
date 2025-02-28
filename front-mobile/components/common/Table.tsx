import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
  ScrollView,
  TouchableOpacity,
  DimensionValue,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { LoadingState } from './LoadingState';
import { EmptyState } from './EmptyState';

type FontWeight = '400' | '500' | '600' | '700' | 'normal' | 'bold';

interface Column<T> {
  id: string;
  label: string;
  render?: (item: T) => React.ReactNode;
  width?: DimensionValue;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  onRowPress?: (item: T) => void;
  selectedIds?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  onSort?: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  loading?: boolean;
  loadingMessage?: string;
  emptyMessage?: string;
  style?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  rowStyle?: StyleProp<ViewStyle>;
  cellStyle?: StyleProp<ViewStyle>;
  headerTextStyle?: StyleProp<TextStyle>;
  cellTextStyle?: StyleProp<TextStyle>;
}

export function Table<T>({
  columns,
  data,
  keyExtractor,
  onRowPress,
  selectedIds = [],
  onSelectionChange,
  sortBy,
  sortOrder = 'asc',
  onSort,
  loading = false,
  loadingMessage = 'Loading data...',
  emptyMessage = 'No data available',
  style,
  headerStyle,
  rowStyle,
  cellStyle,
  headerTextStyle,
  cellTextStyle,
}: TableProps<T>) {
  const handleSort = (columnId: string) => {
    if (!onSort) return;

    const newSortOrder = columnId === sortBy && sortOrder === 'asc' ? 'desc' : 'asc';
    onSort(columnId, newSortOrder);
  };

  const handleRowPress = (item: T) => {
    if (onSelectionChange) {
      const id = keyExtractor(item);
      const newSelectedIds = selectedIds.includes(id)
        ? selectedIds.filter(selectedId => selectedId !== id)
        : [...selectedIds, id];
      onSelectionChange(newSelectedIds);
    } else if (onRowPress) {
      onRowPress(item);
    }
  };

  const renderHeader = () => (
    <View style={[styles.row, styles.headerRow, headerStyle]}>
      {columns.map(column => {
        const cellStyles: StyleProp<ViewStyle> = [
          styles.cell,
          styles.headerCell,
          column.width !== undefined && { width: column.width },
          column.align && { alignItems: getAlignment(column.align) },
          cellStyle,
        ].filter(Boolean);

        return (
          <TouchableOpacity
            key={column.id}
            style={cellStyles}
            onPress={() => column.sortable && handleSort(column.id)}
            disabled={!column.sortable}
          >
            <Text
              style={[
                styles.headerText,
                headerTextStyle,
              ]}
              numberOfLines={1}
            >
              {column.label}
            </Text>
            {column.sortable && sortBy === column.id && (
              <Ionicons
                name={sortOrder === 'asc' ? 'chevron-up' : 'chevron-down'}
                size={16}
                color={COLORS.grey[600]}
                style={styles.sortIcon}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const renderRow = (item: T) => {
    const id = keyExtractor(item);
    const isSelected = selectedIds.includes(id);

    return (
      <TouchableOpacity
        key={id}
        style={[
          styles.row,
          isSelected && styles.selectedRow,
          rowStyle,
        ]}
        onPress={() => handleRowPress(item)}
        disabled={!onRowPress && !onSelectionChange}
      >
        {columns.map(column => {
          const cellStyles: StyleProp<ViewStyle> = [
            styles.cell,
            column.width !== undefined && { width: column.width },
            column.align && { alignItems: getAlignment(column.align) },
            cellStyle,
          ].filter(Boolean);

          return (
            <View
              key={column.id}
              style={cellStyles}
            >
              {column.render ? (
                column.render(item)
              ) : (
                <Text
                  style={[
                    styles.cellText,
                    cellTextStyle,
                  ]}
                  numberOfLines={1}
                >
                  {(item as any)[column.id]?.toString() || ''}
                </Text>
              )}
            </View>
          );
        })}
      </TouchableOpacity>
    );
  };

  const getAlignment = (align: 'left' | 'center' | 'right'): 'flex-start' | 'center' | 'flex-end' => {
    switch (align) {
      case 'right':
        return 'flex-end';
      case 'center':
        return 'center';
      default:
        return 'flex-start';
    }
  };

  if (loading) {
    return (
      <LoadingState
        message={loadingMessage}
        variant="spinner"
        size="large"
      />
    );
  }

  if (!data.length) {
    return (
      <EmptyState
        title={emptyMessage}
        icon="document-text-outline"
      />
    );
  }

  return (
    <View style={[styles.container, style]}>
      {renderHeader()}
      <ScrollView>
        {data.map(renderRow)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.light,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey[200],
  },
  headerRow: {
    backgroundColor: COLORS.grey[50],
    borderTopWidth: 1,
    borderTopColor: COLORS.grey[200],
  },
  selectedRow: {
    backgroundColor: COLORS.primary.light + '20',
  },
  cell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    minWidth: 100,
  },
  headerCell: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
    fontSize: TYPOGRAPHY.subtitle2.fontSize,
    fontWeight: TYPOGRAPHY.subtitle2.fontWeight as FontWeight,
    lineHeight: TYPOGRAPHY.subtitle2.lineHeight,
    letterSpacing: TYPOGRAPHY.subtitle2.letterSpacing,
    color: COLORS.grey[700],
  },
  cellText: {
    flex: 1,
    fontSize: TYPOGRAPHY.body2.fontSize,
    fontWeight: TYPOGRAPHY.body2.fontWeight as FontWeight,
    lineHeight: TYPOGRAPHY.body2.lineHeight,
    letterSpacing: TYPOGRAPHY.body2.letterSpacing,
    color: COLORS.grey[900],
  },
  sortIcon: {
    marginLeft: SPACING.xs,
  },
}); 