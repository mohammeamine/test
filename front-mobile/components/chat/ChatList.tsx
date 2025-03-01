import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS, BORDER_RADIUS } from '../../theme';
import { Avatar } from '../common/Avatar';
import { LoadingState } from '../common/LoadingState';
import { EmptyState } from '../common/EmptyState';
import { Ionicons } from '@expo/vector-icons';

interface ChatPreview {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: {
    text: string;
    timestamp: Date;
    isRead: boolean;
    senderId: string;
  };
  unreadCount: number;
  isOnline?: boolean;
  isTyping?: boolean;
}

interface ChatListProps {
  chats: ChatPreview[];
  currentUserId: string;
  isLoading?: boolean;
  onChatPress: (chatId: string) => void;
  onNewChat?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const ChatList: React.FC<ChatListProps> = ({
  chats,
  currentUserId,
  isLoading,
  onChatPress,
  onNewChat,
  style,
}) => {
  const renderChat = ({ item: chat }: { item: ChatPreview }) => {
    const isLastMessageOwn = chat.lastMessage.senderId === currentUserId;
    const formattedTime = new Date(chat.lastMessage.timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    return (
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() => onChatPress(chat.id)}
        activeOpacity={0.7}
      >
        <View style={styles.avatarContainer}>
          <Avatar
            source={chat.avatar ? { uri: chat.avatar } : undefined}
            name={chat.name}
            size="medium"
          />
          {chat.isOnline && <View style={styles.onlineIndicator} />}
        </View>
        <View style={styles.chatInfo}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatName} numberOfLines={1}>
              {chat.name}
            </Text>
            <Text style={styles.timestamp}>
              {formattedTime}
            </Text>
          </View>
          <View style={styles.lastMessageContainer}>
            {chat.isTyping ? (
              <View style={styles.typingContainer}>
                <LoadingState
                  variant="dots"
                  size="small"
                  color={COLORS.primary.main}
                  style={styles.typingIndicator}
                />
                <Text style={styles.typingText}>Typing...</Text>
              </View>
            ) : (
              <Text
                style={[
                  styles.lastMessage,
                  !chat.lastMessage.isRead && styles.unreadMessage
                ]}
                numberOfLines={1}
              >
                {isLastMessageOwn && 'You: '}
                {chat.lastMessage.text}
              </Text>
            )}
            {chat.unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadCount}>
                  {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return <LoadingState message="Loading chats..." />;
  }

  if (!chats.length) {
    return (
      <EmptyState
        title="No conversations yet"
        description="Start chatting with your contacts"
        icon="chatbubbles-outline"
        primaryAction={
          onNewChat
            ? {
                label: 'Start a chat',
                onPress: onNewChat,
              }
            : undefined
        }
      />
    );
  }

  return (
    <View style={[styles.container, style]}>
      <FlatList
        data={chats}
        renderItem={renderChat}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
      {onNewChat && (
        <TouchableOpacity
          style={styles.fab}
          onPress={onNewChat}
          activeOpacity={0.8}
        >
          <Ionicons
            name="chatbubble-outline"
            size={24}
            color={COLORS.background.light}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.light,
  },
  listContent: {
    padding: SPACING.md,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    backgroundColor: COLORS.background.light,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.sm,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: SPACING.md,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.success.main,
    borderWidth: 2,
    borderColor: COLORS.background.light,
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  chatName: {
    flex: 1,
    fontSize: TYPOGRAPHY.subtitle1.fontSize,
    fontWeight: '600',
    color: COLORS.grey[900],
    marginRight: SPACING.sm,
  },
  timestamp: {
    fontSize: TYPOGRAPHY.caption.fontSize,
    color: COLORS.grey[500],
  },
  lastMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lastMessage: {
    flex: 1,
    fontSize: TYPOGRAPHY.body2.fontSize,
    color: COLORS.grey[600],
    marginRight: SPACING.sm,
  },
  unreadMessage: {
    color: COLORS.grey[900],
    fontWeight: '500',
  },
  typingContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  typingIndicator: {
    marginRight: SPACING.xs,
  },
  typingText: {
    fontSize: TYPOGRAPHY.caption.fontSize,
    color: COLORS.primary.main,
    fontWeight: '500',
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  unreadCount: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.background.light,
  },
  fab: {
    position: 'absolute',
    right: SPACING.lg,
    bottom: SPACING.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.md,
  },
}); 