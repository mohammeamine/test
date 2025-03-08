import { useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001'

interface ServerToClientEvents {
  eventsLoaded: (events: CalendarEvent[]) => void
  officeHoursLoaded: (hours: OfficeHour[]) => void
  eventUpdated: (event: CalendarEvent) => void
  eventCreated: (event: CalendarEvent) => void
  eventDeleted: (eventId: string) => void
  officeHourUpdated: (hour: OfficeHour) => void
  connect: () => void
  disconnect: (reason: string) => void
  connect_error: (error: Error) => void
}

interface ClientToServerEvents {
  getEvents: (userId: string) => void
  getOfficeHours: (userId: string) => void
  updateEvent: (event: CalendarEvent) => void
  createEvent: (event: CalendarEvent) => void
  deleteEvent: (eventId: string) => void
  updateOfficeHour: (hour: OfficeHour) => void
}

interface CalendarEvent {
  id: string
  title: string
  type: "class" | "office_hours" | "meeting" | "exam"
  start: string
  end: string
  location?: string
  description?: string
  attendees?: number
  status: "scheduled" | "in_progress" | "completed" | "cancelled"
}

interface OfficeHour {
  id: string
  dayOfWeek: string
  startTime: string
  endTime: string
  location: string
  isRecurring: boolean
  maxStudents: number
  currentBookings: number
}

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const socketInstance = io(SOCKET_URL, {
      transports: ['websocket'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    }) as Socket<ServerToClientEvents, ClientToServerEvents>

    socketInstance.on('connect', () => {
      console.log('Socket connected')
      setIsConnected(true)
      setError(null)
    })

    socketInstance.on('connect_error', (error) => {
      console.error('Socket connection error:', error)
      setError(error)
      setIsConnected(false)
    })

    socketInstance.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason)
      setIsConnected(false)
      if (reason === 'io server disconnect') {
        socketInstance.connect()
      }
    })

    setSocket(socketInstance)

    return () => {
      if (socketInstance) {
        socketInstance.disconnect()
      }
    }
  }, [])

  return { socket, error, isConnected }
}
