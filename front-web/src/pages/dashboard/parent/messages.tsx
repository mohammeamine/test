import { useState, useEffect } from "react";
import { User } from "../../../types/auth"
import { DashboardLayout } from "../../../components/dashboard/layout/dashboard-layout"
import { Search, Plus, Calendar, User as UserIcon } from "lucide-react"
import { messageService } from "../../../services/message.service"
import { Message, MessageStats, Chat } from "../../../types/message"

interface ParentMessagesProps {
  user: User
}

export default function ParentMessages({ user }: ParentMessagesProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [stats, setStats] = useState<MessageStats>({ total: 0, unread: 0, teachers: 0, averageResponseTime: '0h' })
  const [chats, setChats] = useState<Chat[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [messagesData, statsData, chatsData] = await Promise.all([
          messageService.getMessages(searchTerm),
          messageService.getMessageStats(),
          messageService.getChats()
        ])
        setMessages(messagesData)
        setStats(statsData)
        setChats(chatsData)
        setError(null)
      } catch (err) {
        setError("Failed to load messages")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [searchTerm])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleMarkAsRead = async (messageId: string) => {
    try {
      await messageService.markAsRead(messageId)
      setMessages(messages.map(msg => 
        msg.id === messageId ? { ...msg, status: 'read' } : msg
      ))
      setStats(prev => ({ ...prev, unread: prev.unread - 1 }))
    } catch (error) {
      console.error('Failed to mark message as read:', error)
    }
  }

  const handleSendMessage = async (receiverId: string, subject: string, content: string) => {
    try {
      const newMessage = await messageService.sendMessage({ receiverId, subject, content })
      setMessages(prev => [newMessage, ...prev])
      setStats(prev => ({ ...prev, total: prev.total + 1 }))
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <DashboardLayout user={user}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
            <p className="mt-1 text-sm text-gray-500">
              Communicate with teachers and staff
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            New Message
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {/* Messages Stats */}
        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Messages</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{stats.total}</p>
            <p className="mt-1 text-sm text-gray-500">All messages</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Unread</h3>
            <p className="mt-2 text-3xl font-semibold text-blue-600">{stats.unread}</p>
            <p className="mt-1 text-sm text-gray-500">New messages</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Teachers</h3>
            <p className="mt-2 text-3xl font-semibold text-purple-600">{stats.teachers}</p>
            <p className="mt-1 text-sm text-gray-500">Active conversations</p>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="text-sm font-medium text-gray-500">Response Time</h3>
            <p className="mt-2 text-3xl font-semibold text-green-600">{stats.averageResponseTime}</p>
            <p className="mt-1 text-sm text-gray-500">Average</p>
          </div>
        </div>

        {/* Messages List */}
        <div className="rounded-lg border bg-white">
          <div className="divide-y">
            {messages.map(message => (
              <div key={message.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <UserIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{message.subject}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{message.senderName}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(message.sentAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {message.status === 'unread' && (
                      <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800">New</span>
                    )}
                    <button
                      className="rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100"
                      onClick={() => handleMarkAsRead(message.id)}
                    >
                      {message.status === 'unread' ? 'Mark as Read' : 'Reply'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 