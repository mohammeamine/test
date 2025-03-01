import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS, BORDER_RADIUS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from '../common/Avatar';
import { LoadingState } from '../common/LoadingState';
import { EmptyState } from '../common/EmptyState';

interface Message {
  id: string;
  text: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: Date;
  status: 'sending' | 'sent' | 'delivered' | 'read';
  attachments?: {
    type: 'image' | 'file';
    url: string;
    thumbnail?: string;
  }[];
}

interface ChatScreenProps {
  messages: Message[];
  currentUserId: string;
  isLoading?: boolean;
  isTyping?: boolean;
  onSendMessage: (text: string) => void;
  onLoadMore?: () => void;
  onAttachFile?: () => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  messages,
  currentUserId,
  isLoading,
  isTyping,
  onSendMessage,
  onLoadMore,
  onAttachFile,
}) => {
  const [messageText, setMessageText] = useState('');
  const flatListRef = useRef<FlatList>(null);
  const inputRef = useRef<TextInput>(null);

  const renderMessageStatus = (status: Message['status']) => {
    switch (status) {
      case 'sending':
        return <ActivityIndicator size="small" color={COLORS.grey[400]} />;
      case 'sent':
        return <Ionicons name="checkmark" size={16} color={COLORS.grey[400]} />;
      case 'delivered':
        return <Ionicons name="checkmark-done" size={16} color={COLORS.grey[400]} />;
      case 'read':
        return <Ionicons name="checkmark-done" size={16} color={COLORS.primary.main} />;
      default:
        return null;
    }
  };

  const renderMessage = ({ item: message }: { item: Message }) => {
    const isOwnMessage = message.sender.id === currentUserId;

    return (
      <View style={[
        styles.messageContainer,
        isOwnMessage ? styles.ownMessageContainer : styles.otherMessageContainer
      ]}>
        {!isOwnMessage && (
          <Avatar
            source={message.sender.avatar ? { uri: message.sender.avatar } : undefined}
            name={message.sender.name}
            size="small"
            style={styles.messageAvatar}
          />
        )}
        <View style={[
          styles.messageBubble,
          isOwnMessage ? styles.ownMessageBubble : styles.otherMessageBubble
        ]}>
          {message.attachments?.map((attachment, index) => (
            <View key={index} style={styles.attachmentContainer}>
              {attachment.type === 'image' ? (
                <Image
                  source={{ uri: attachment.url }}
                  style={styles.attachmentImage}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.fileAttachment}>
                  <Ionicons name="document-outline" size={24} color={COLORS.grey[600]} />
                  <Text style={styles.fileAttachmentText}>Attachment</Text>
                </View>
              )}
            </View>
          ))}
          <Text style={[
            styles.messageText,
            isOwnMessage ? styles.ownMessageText : styles.otherMessageText
          ]}>
            {message.text}
          </Text>
          <View style={styles.messageFooter}>
            <Text style={styles.messageTime}>
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
            {isOwnMessage && renderMessageStatus(message.status)}
          </View>
        </View>
      </View>
    );
  };

  const renderTypingIndicator = () => {
    if (!isTyping) return null;

    return (
      <View style={styles.typingContainer}>
        <LoadingState
          variant="dots"
          size="small"
          color={COLORS.grey[500]}
          style={styles.typingIndicator}
        />
        <Text style={styles.typingText}>Typing...</Text>
      </View>
    );
  };

  const handleSend = () => {
    if (!messageText.trim()) return;
    onSendMessage(messageText.trim());
    setMessageText('');
  };

  if (isLoading) {
    return <LoadingState message="Loading messages..." />;
  }

  if (!messages.length) {
    return (
      <EmptyState
        title="No messages yet"
        description="Start the conversation by sending a message"
        icon="chatbubble-outline"
      />
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        inverted
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.5}
      />
      {renderTypingIndicator()}
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.attachButton}
          onPress={onAttachFile}
        >
          <Ionicons name="attach" size={24} color={COLORS.grey[600]} />
        </TouchableOpacity>
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={messageText}
          onChangeText={setMessageText}
          placeholder="Type a message..."
          placeholderTextColor={COLORS.grey[400]}
          multiline
          maxLength={1000}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            !messageText.trim() && styles.sendButtonDisabled
          ]}
          onPress={handleSend}
          disabled={!messageText.trim()}
        >
          <Ionicons
            name="send"
            size={24}
            color={messageText.trim() ? COLORS.primary.main : COLORS.grey[400]}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.light,
  },
  messagesList: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.lg,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
    maxWidth: '80%',
  },
  ownMessageContainer: {
    alignSelf: 'flex-end',
  },
  otherMessageContainer: {
    alignSelf: 'flex-start',
  },
  messageAvatar: {
    marginRight: SPACING.xs,
    alignSelf: 'flex-end',
  },
  messageBubble: {
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.sm,
  },
  ownMessageBubble: {
    backgroundColor: COLORS.primary.main,
  },
  otherMessageBubble: {
    backgroundColor: COLORS.background.default,
  },
  messageText: {
    fontSize: TYPOGRAPHY.body1.fontSize,
    lineHeight: TYPOGRAPHY.body1.lineHeight,
  },
  ownMessageText: {
    color: COLORS.background.light,
  },
  otherMessageText: {
    color: COLORS.grey[900],
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: SPACING.xs,
  },
  messageTime: {
    fontSize: TYPOGRAPHY.caption.fontSize,
    color: COLORS.grey[500],
    marginRight: SPACING.xs,
  },
  attachmentContainer: {
    marginBottom: SPACING.xs,
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
  },
  attachmentImage: {
    width: '100%',
    height: 200,
    backgroundColor: COLORS.grey[100],
  },
  fileAttachment: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.sm,
    backgroundColor: COLORS.grey[100],
    borderRadius: BORDER_RADIUS.md,
  },
  fileAttachmentText: {
    marginLeft: SPACING.xs,
    fontSize: TYPOGRAPHY.body2.fontSize,
    color: COLORS.grey[600],
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.sm,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
  },
  typingIndicator: {
    marginRight: SPACING.xs,
  },
  typingText: {
    fontSize: TYPOGRAPHY.caption.fontSize,
    color: COLORS.grey[600],
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.grey[200],
    backgroundColor: COLORS.background.light,
  },
  attachButton: {
    padding: SPACING.sm,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    marginHorizontal: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    backgroundColor: COLORS.grey[100],
    borderRadius: BORDER_RADIUS.round,
    fontSize: TYPOGRAPHY.body1.fontSize,
    color: COLORS.grey[900],
  },
  sendButton: {
    padding: SPACING.sm,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
}); 