import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Text } from '../../../components/ui/Text';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Ionicons } from '@expo/vector-icons';
import { NAVIGATION_THEME } from '../../../navigation/constants';
import { scale } from '../../../utils/responsive';

export default function MessagesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');

  // Mock data - Replace with actual API calls
  const chats = [
    {
      id: '1',
      name: 'John Smith',
      role: 'Teacher',
      subject: 'Mathematics',
      lastMessage: 'Please submit your assignment by Friday',
      timestamp: '10:30 AM',
      unread: 2,
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      role: 'Teacher',
      subject: 'Physics',
      lastMessage: 'Great work on the lab report!',
      timestamp: 'Yesterday',
      unread: 0,
    },
    {
      id: '3',
      name: 'Academic Office',
      role: 'Admin',
      subject: 'General',
      lastMessage: 'Schedule update for next week',
      timestamp: '2 days ago',
      unread: 1,
    },
  ];

  const messages = [
    {
      id: '1',
      chatId: '1',
      sender: 'John Smith',
      content: 'Hello! Just a reminder about the upcoming assignment.',
      timestamp: '10:25 AM',
      isOwn: false,
    },
    {
      id: '2',
      chatId: '1',
      sender: 'You',
      content: 'Thanks for the reminder! When is it due?',
      timestamp: '10:28 AM',
      isOwn: true,
    },
    {
      id: '3',
      chatId: '1',
      sender: 'John Smith',
      content: 'Please submit your assignment by Friday',
      timestamp: '10:30 AM',
      isOwn: false,
    },
  ];

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentMessages = messages.filter(msg => msg.chatId === selectedChat);
  const selectedChatData = chats.find(chat => chat.id === selectedChat);

  const renderChatItem = (chat: typeof chats[0]) => (
    <TouchableOpacity
      key={chat.id}
      style={[
        styles.chatItem,
        selectedChat === chat.id && styles.chatItemActive
      ]}
      onPress={() => setSelectedChat(chat.id)}
    >
      <View style={styles.chatAvatar}>
        <Text style={styles.avatarText}>
          {chat.name.split(' ').map(n => n[0]).join('')}
        </Text>
      </View>
      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>{chat.name}</Text>
          <Text style={styles.timestamp}>{chat.timestamp}</Text>
        </View>
        <Text style={styles.chatRole}>{chat.role} - {chat.subject}</Text>
        <Text 
          style={styles.lastMessage}
          numberOfLines={1}
        >
          {chat.lastMessage}
        </Text>
      </View>
      {chat.unread > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadText}>{chat.unread}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderMessage = (message: typeof messages[0]) => (
    <View
      key={message.id}
      style={[
        styles.messageContainer,
        message.isOwn ? styles.ownMessage : styles.otherMessage
      ]}
    >
      <View style={[
        styles.messageBubble,
        message.isOwn ? styles.ownBubble : styles.otherBubble
      ]}>
        <Text style={[
          styles.messageText,
          message.isOwn ? styles.ownMessageText : styles.otherMessageText
        ]}>
          {message.content}
        </Text>
        <Text style={styles.messageTime}>{message.timestamp}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search messages..."
            style={styles.searchInput}
          />
        </View>
        <ScrollView style={styles.chatList}>
          {filteredChats.map(renderChatItem)}
        </ScrollView>
      </View>

      <View style={styles.chatContainer}>
        {selectedChat ? (
          <>
            <View style={styles.chatHeader}>
              <Text style={styles.headerName}>{selectedChatData?.name}</Text>
              <Text style={styles.headerInfo}>
                {selectedChatData?.role} - {selectedChatData?.subject}
              </Text>
            </View>
            <ScrollView 
              style={styles.messagesList}
              contentContainerStyle={styles.messagesContent}
            >
              {currentMessages.map(renderMessage)}
            </ScrollView>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.inputContainer}
            >
              <TextInput
                value={messageText}
                onChangeText={setMessageText}
                placeholder="Type a message..."
                style={styles.messageInput}
                multiline
              />
              <Button
                title="Send"
                onPress={() => {
                  /* Handle sending message */
                  setMessageText('');
                }}
                style={styles.sendButton}
              />
            </KeyboardAvoidingView>
          </>
        ) : (
          <View style={styles.noChat}>
            <Text style={styles.noChatText}>
              Select a conversation to start messaging
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: NAVIGATION_THEME.colors.background,
  },
  sidebar: {
    width: '35%',
    borderRightWidth: 1,
    borderRightColor: NAVIGATION_THEME.colors.border,
    backgroundColor: NAVIGATION_THEME.colors.surface,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: NAVIGATION_THEME.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: NAVIGATION_THEME.colors.border,
    backgroundColor: NAVIGATION_THEME.colors.surface,
  },
  searchIcon: {
    marginRight: NAVIGATION_THEME.spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: scale(14),
  },
  chatList: {
    flex: 1,
  },
  chatItem: {
    flexDirection: 'row',
    padding: NAVIGATION_THEME.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: NAVIGATION_THEME.colors.border,
    backgroundColor: NAVIGATION_THEME.colors.surface,
  },
  chatItemActive: {
    backgroundColor: `${NAVIGATION_THEME.colors.primary}10`,
  },
  chatAvatar: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: NAVIGATION_THEME.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: NAVIGATION_THEME.spacing.md,
  },
  avatarText: {
    color: NAVIGATION_THEME.colors.surface,
    fontSize: scale(16),
    fontWeight: '600',
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  chatName: {
    fontSize: scale(14),
    fontWeight: '600',
  },
  timestamp: {
    fontSize: scale(12),
    color: NAVIGATION_THEME.colors.onSurfaceVariant,
  },
  chatRole: {
    fontSize: scale(12),
    color: NAVIGATION_THEME.colors.onSurfaceVariant,
    marginBottom: 2,
  },
  lastMessage: {
    fontSize: scale(13),
    color: NAVIGATION_THEME.colors.onSurfaceVariant,
  },
  unreadBadge: {
    backgroundColor: NAVIGATION_THEME.colors.primary,
    borderRadius: scale(10),
    minWidth: scale(20),
    height: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: NAVIGATION_THEME.spacing.sm,
  },
  unreadText: {
    color: NAVIGATION_THEME.colors.surface,
    fontSize: scale(12),
    fontWeight: '600',
  },
  chatContainer: {
    flex: 1,
    backgroundColor: NAVIGATION_THEME.colors.background,
  },
  chatHeader: {
    padding: NAVIGATION_THEME.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: NAVIGATION_THEME.colors.border,
    backgroundColor: NAVIGATION_THEME.colors.surface,
  },
  headerName: {
    fontSize: scale(16),
    fontWeight: '600',
    marginBottom: 2,
  },
  headerInfo: {
    fontSize: scale(13),
    color: NAVIGATION_THEME.colors.onSurfaceVariant,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    padding: NAVIGATION_THEME.spacing.md,
  },
  messageContainer: {
    marginBottom: NAVIGATION_THEME.spacing.md,
    flexDirection: 'row',
  },
  ownMessage: {
    justifyContent: 'flex-end',
  },
  otherMessage: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '70%',
    padding: NAVIGATION_THEME.spacing.md,
    borderRadius: NAVIGATION_THEME.shape.medium,
  },
  ownBubble: {
    backgroundColor: NAVIGATION_THEME.colors.primary,
  },
  otherBubble: {
    backgroundColor: NAVIGATION_THEME.colors.surfaceVariant,
  },
  messageText: {
    fontSize: scale(14),
    marginBottom: NAVIGATION_THEME.spacing.xs,
  },
  ownMessageText: {
    color: NAVIGATION_THEME.colors.surface,
  },
  otherMessageText: {
    color: NAVIGATION_THEME.colors.onSurface,
  },
  messageTime: {
    fontSize: scale(11),
    color: NAVIGATION_THEME.colors.onSurfaceVariant,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: NAVIGATION_THEME.spacing.md,
    borderTopWidth: 1,
    borderTopColor: NAVIGATION_THEME.colors.border,
    backgroundColor: NAVIGATION_THEME.colors.surface,
  },
  messageInput: {
    flex: 1,
    marginRight: NAVIGATION_THEME.spacing.md,
    padding: NAVIGATION_THEME.spacing.sm,
    backgroundColor: NAVIGATION_THEME.colors.surfaceVariant,
    borderRadius: NAVIGATION_THEME.shape.small,
    maxHeight: scale(100),
  },
  sendButton: {
    alignSelf: 'flex-end',
  },
  noChat: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noChatText: {
    fontSize: scale(16),
    color: NAVIGATION_THEME.colors.onSurfaceVariant,
  },
}); 