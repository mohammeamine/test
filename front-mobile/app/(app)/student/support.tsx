import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text } from '../../../components/ui/Text';
import { Card } from '../../../components/ui/Card';
import { Ionicons } from '@expo/vector-icons';
import { NAVIGATION_THEME } from '../../../navigation/constants';
import { scale, verticalScale } from '../../../utils/responsive';

export default function SupportScreen() {
  const [activeSection, setActiveSection] = useState<'FAQ' | 'Tickets' | 'Chat'>('FAQ');

  const faqs = [
    { question: 'How to reset my password?', answer: 'You can reset your password by going to the settings page and clicking on "Reset Password".' },
    { question: 'How to contact support?', answer: 'You can contact support by creating a ticket or using the live chat feature.' },
  ];

  const [tickets, setTickets] = useState([
    { id: '1', title: 'Login Issue', date: '2023-10-01', urgency: 'High', description: 'I am unable to log in to my account.', status: 'Open' },
    { id: '2', title: 'Unmarked Assignment', date: '2023-09-25', urgency: 'Medium', description: 'My assignment was not graded after the deadline.', status: 'Resolved' },
  ]);

  const [newTicket, setNewTicket] = useState({ title: '', description: '', urgency: 'Low' });

  const handleCreateTicket = () => {
    setTickets([...tickets, { id: (tickets.length + 1).toString(), title: newTicket.title, date: new Date().toISOString().split('T')[0], urgency: newTicket.urgency, description: newTicket.description, status: 'Open' }]);
    setNewTicket({ title: '', description: '', urgency: 'Low' });
  };

  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello, how can I help you?', sender: 'support' },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    setMessages([...messages, { id: (messages.length + 1).toString(), text: newMessage, sender: 'user' }]);
    setNewMessage('');
  };

  const renderFAQSection = () => (
    <ScrollView style={styles.content}>
      {faqs.map((faq, index) => (
        <Card key={index} style={styles.card}>
          <View style={styles.faqHeader}>
            <Ionicons name="help-circle-outline" size={scale(20)} color={NAVIGATION_THEME.colors.primary} />
            <Text style={styles.question}>{faq.question}</Text>
          </View>
          <View style={styles.faqAnswer}>
            <Ionicons name="arrow-forward" size={scale(16)} color="#666" />
            <Text style={styles.answer}>{faq.answer}</Text>
          </View>
        </Card>
      ))}
    </ScrollView>
  );

  const renderTicketsSection = () => (
    <ScrollView style={styles.content}>
      <Card style={styles.newTicketCard}>
        <Text style={styles.sectionTitle}>Create a New Ticket</Text>
        <TextInput
          placeholder="Ticket Title"
          value={newTicket.title}
          onChangeText={(text) => setNewTicket({ ...newTicket, title: text })}
          style={styles.input}
        />
        <TextInput
          placeholder="Describe your issue here..."
          value={newTicket.description}
          onChangeText={(text) => setNewTicket({ ...newTicket, description: text })}
          style={[styles.input, { height: verticalScale(100) }]}
          multiline
        />
        <View style={styles.urgencyContainer}>
          <Text style={styles.urgencyLabel}>Urgency Level:</Text>
          <TouchableOpacity
            style={[
              styles.urgencyButton,
              newTicket.urgency === 'Low' && styles.lowUrgency,
            ]}
            onPress={() => setNewTicket({ ...newTicket, urgency: 'Low' })}
          >
            <Text style={styles.urgencyText}>Low</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.urgencyButton,
              newTicket.urgency === 'Medium' && styles.mediumUrgency,
            ]}
            onPress={() => setNewTicket({ ...newTicket, urgency: 'Medium' })}
          >
            <Text style={styles.urgencyText}>Medium</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.urgencyButton,
              newTicket.urgency === 'High' && styles.highUrgency,
            ]}
            onPress={() => setNewTicket({ ...newTicket, urgency: 'High' })}
          >
            <Text style={styles.urgencyText}>High</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.createTicketButton} onPress={handleCreateTicket}>
          <Text style={styles.buttonText}>Create Ticket</Text>
        </TouchableOpacity>
      </Card>

      <Text style={styles.sectionTitle}>Tickets</Text>
      {tickets.map((ticket) => (
        <Card key={ticket.id} style={styles.card}>
          <View style={styles.ticketHeader}>
            <Ionicons name="document-text-outline" size={scale(20)} color={NAVIGATION_THEME.colors.primary} />
            <Text style={styles.ticketTitle}>{ticket.title}</Text>
          </View>
          <Text style={styles.ticketDate}>{ticket.date}</Text>
          <View style={styles.ticketDetails}>
            <Text
              style={[
                styles.urgencyText,
                {
                  color:
                    ticket.urgency === 'High'
                      ? 'red'
                      : ticket.urgency === 'Medium'
                      ? 'orange'
                      : 'green',
                },
              ]}
            >
              {ticket.urgency}
            </Text>
            <Text
              style={[
                styles.status,
                { color: ticket.status === 'Resolved' ? 'green' : 'orange' },
              ]}
            >
              {ticket.status}
            </Text>
          </View>
          <Text style={styles.description}>{ticket.description}</Text>
        </Card>
      ))}
    </ScrollView>
  );

  const renderChatSection = () => (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {messages.map((message) => (
          <Card key={message.id} style={message.sender === 'user' ? styles.userMessage : styles.supportMessage}>
            <Text style={styles.messageText}>{message.text}</Text>
          </Card>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type your message..."
          value={newMessage}
          onChangeText={setNewMessage}
          style={styles.chatInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Ionicons name="send" size={scale(20)} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="h1" style={styles.title}>Support</Text>
        <Text variant="body" style={styles.subtitle}>
          Get help and support
        </Text>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tab} onPress={() => setActiveSection('FAQ')}>
          <Ionicons name="help-circle-outline" size={scale(20)} color={activeSection === 'FAQ' ? NAVIGATION_THEME.colors.primary : NAVIGATION_THEME.colors.onSurfaceVariant} />
          <Text style={[styles.tabText, activeSection === 'FAQ' && styles.activeTabText]}>FAQ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => setActiveSection('Tickets')}>
          <Ionicons name="document-text-outline" size={scale(20)} color={activeSection === 'Tickets' ? NAVIGATION_THEME.colors.primary : NAVIGATION_THEME.colors.onSurfaceVariant} />
          <Text style={[styles.tabText, activeSection === 'Tickets' && styles.activeTabText]}>Tickets</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => setActiveSection('Chat')}>
          <Ionicons name="chatbubbles-outline" size={scale(20)} color={activeSection === 'Chat' ? NAVIGATION_THEME.colors.primary : NAVIGATION_THEME.colors.onSurfaceVariant} />
          <Text style={[styles.tabText, activeSection === 'Chat' && styles.activeTabText]}>Chat</Text>
        </TouchableOpacity>
      </View>
      {activeSection === 'FAQ' && renderFAQSection()}
      {activeSection === 'Tickets' && renderTicketsSection()}
      {activeSection === 'Chat' && renderChatSection()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NAVIGATION_THEME.colors.background,
  },
  header: {
    padding: scale(16),
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: scale(24),
    fontWeight: 'bold',
    marginBottom: verticalScale(4),
  },
  subtitle: {
    color: '#666',
    fontSize: scale(16),
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: NAVIGATION_THEME.colors.surface,
    paddingVertical: NAVIGATION_THEME.spacing.sm,
  },
  tab: {
    alignItems: 'center',
    paddingVertical: NAVIGATION_THEME.spacing.sm,
  },
  tabText: {
    fontSize: scale(14),
    color: NAVIGATION_THEME.colors.onSurfaceVariant,
    marginTop: verticalScale(4),
  },
  activeTabText: {
    color: NAVIGATION_THEME.colors.primary,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    padding: NAVIGATION_THEME.spacing.md,
  },
  card: {
    marginBottom: NAVIGATION_THEME.spacing.md,
    padding: NAVIGATION_THEME.spacing.md,
    borderRadius: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: NAVIGATION_THEME.spacing.sm,
  },
  question: {
    fontSize: scale(16),
    fontWeight: '600',
    marginLeft: NAVIGATION_THEME.spacing.sm,
  },
  faqAnswer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: NAVIGATION_THEME.spacing.sm,
  },
  answer: {
    fontSize: scale(14),
    marginLeft: NAVIGATION_THEME.spacing.sm,
  },
  ticketHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: NAVIGATION_THEME.spacing.sm,
  },
  ticketTitle: {
    fontSize: scale(16),
    fontWeight: '600',
    marginLeft: NAVIGATION_THEME.spacing.sm,
  },
  ticketDate: {
    fontSize: scale(12),
    color: '#666',
    marginBottom: NAVIGATION_THEME.spacing.sm,
  },
  ticketDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: NAVIGATION_THEME.spacing.sm,
  },
  urgencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: NAVIGATION_THEME.spacing.md,
  },
  urgencyLabel: {
    fontSize: scale(14),
    marginRight: NAVIGATION_THEME.spacing.sm,
  },
  urgencyButton: {
    paddingHorizontal: NAVIGATION_THEME.spacing.sm,
    paddingVertical: NAVIGATION_THEME.spacing.xs,
    borderRadius: NAVIGATION_THEME.shape.small,
    borderWidth: 1,
    borderColor: NAVIGATION_THEME.colors.border,
    marginRight: NAVIGATION_THEME.spacing.sm,
  },
  lowUrgency: {
    backgroundColor: 'green',
    borderColor: 'green',
  },
  mediumUrgency: {
    backgroundColor: 'orange',
    borderColor: 'orange',
  },
  highUrgency: {
    backgroundColor: 'red',
    borderColor: 'red',
  },
  urgencyText: {
    fontSize: scale(14),
    color: '#fff',
  },
  status: {
    fontSize: scale(14),
    fontWeight: '600',
  },
  description: {
    fontSize: scale(14),
    color: '#666',
  },
  newTicketCard: {
    padding: NAVIGATION_THEME.spacing.md,
  },
  input: {
    marginBottom: NAVIGATION_THEME.spacing.md,
    padding: NAVIGATION_THEME.spacing.sm,
    borderWidth: 1,
    borderColor: NAVIGATION_THEME.colors.border,
    borderRadius: NAVIGATION_THEME.shape.small,
  },
  createTicketButton: {
    backgroundColor: NAVIGATION_THEME.colors.primary,
    padding: NAVIGATION_THEME.spacing.sm,
    borderRadius: NAVIGATION_THEME.shape.small,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: scale(14),
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: scale(18),
    fontWeight: 'bold',
    marginBottom: NAVIGATION_THEME.spacing.md,
  },
  userMessage: {
    marginBottom: NAVIGATION_THEME.spacing.md,
    padding: NAVIGATION_THEME.spacing.md,
    alignSelf: 'flex-end',
    backgroundColor: NAVIGATION_THEME.colors.primary,
    borderRadius: NAVIGATION_THEME.shape.small,
  },
  supportMessage: {
    marginBottom: NAVIGATION_THEME.spacing.md,
    padding: NAVIGATION_THEME.spacing.md,
    alignSelf: 'flex-start',
    backgroundColor: NAVIGATION_THEME.colors.surface,
    borderRadius: NAVIGATION_THEME.shape.small,
  },
  messageText: {
    fontSize: scale(14),
    color: NAVIGATION_THEME.colors.onSurface,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: NAVIGATION_THEME.spacing.md,
    borderTopWidth: 1,
    borderTopColor: NAVIGATION_THEME.colors.border,
    alignItems: 'center',
  },
  chatInput: {
    flex: 1,
    padding: NAVIGATION_THEME.spacing.sm,
    borderWidth: 1,
    borderColor: NAVIGATION_THEME.colors.border,
    borderRadius: NAVIGATION_THEME.shape.small,
    marginRight: NAVIGATION_THEME.spacing.sm,
  },
  sendButton: {
    backgroundColor: NAVIGATION_THEME.colors.primary,
    padding: NAVIGATION_THEME.spacing.sm,
    borderRadius: NAVIGATION_THEME.shape.small,
    justifyContent: 'center',
    alignItems: 'center',
  },
});