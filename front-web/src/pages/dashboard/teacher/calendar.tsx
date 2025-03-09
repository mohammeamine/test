import { useState, useEffect } from 'react'
import { DashboardLayout } from '../../../components/dashboard/layout/dashboard-layout'
import { User } from '../../../types/auth'
import { CalendarEvent, DragItem, OfficeHour } from '../../../types/calendar'
import { Plus, AlertCircle } from 'lucide-react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useSocket } from '../../../hooks/use-socket'
import {
  CalendarGrid,
  EventFormModal,
  OfficeHoursManager
} from '../../../components/dashboard/teacher/calendar'

interface TeacherCalendarProps {
  user: User
}

export default function TeacherCalendar({ user }: TeacherCalendarProps) {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | undefined>()
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)
  const [officeHours, setOfficeHours] = useState<OfficeHour[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  
  // Get socket and fallback methods
  const { 
    socket, 
    error: socketError, 
    isConnected, 
    useFallback,
    getEvents,
    getOfficeHours,
    updateEvent: updateEventSocket,
    createEvent: createEventSocket,
    deleteEvent: deleteEventSocket,
    updateOfficeHour: updateOfficeHourSocket
  } = useSocket()

  // Load data (either via socket or fallback)
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        // Try to get data via socket or fallback
        const fallbackEvents = getEvents(user.id);
        if (fallbackEvents) {
          console.log('Using fallback events data');
          setEvents(fallbackEvents);
          setIsLoading(false);
        }
        
        const fallbackOfficeHours = getOfficeHours(user.id);
        if (fallbackOfficeHours) {
          console.log('Using fallback office hours data');
          setOfficeHours(fallbackOfficeHours);
        }
        
        // If we're in fallback mode, display a non-blocking message
        if (useFallback) {
          setErrorMessage('Using offline mode. Some features may be limited.');
        } else {
          setErrorMessage(null);
        }
        
      } catch (err) {
        console.error('Error loading data:', err);
        setErrorMessage('Could not load calendar data. Please try again later.');
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [user.id, getEvents, getOfficeHours, useFallback]);

  // Setup socket listeners (only when connected)
  useEffect(() => {
    if (socket && isConnected) {
      // Socket event listeners
      socket.on('eventsLoaded', (loadedEvents: CalendarEvent[]) => {
        setEvents(loadedEvents)
        setIsLoading(false)
      })

      socket.on('officeHoursLoaded', (loadedHours: OfficeHour[]) => {
        setOfficeHours(loadedHours)
      })

      socket.on('eventUpdated', (updatedEvent: CalendarEvent) => {
        setEvents(prevEvents => 
          prevEvents.map(event => 
            event.id === updatedEvent.id ? updatedEvent : event
          )
        )
      })

      socket.on('eventCreated', (newEvent: CalendarEvent) => {
        setEvents(prevEvents => [...prevEvents, newEvent])
      })

      socket.on('eventDeleted', (eventId: string) => {
        setEvents(prevEvents => 
          prevEvents.filter(event => event.id !== eventId)
        )
      })

      socket.on('officeHourUpdated', (updatedHour: OfficeHour) => {
        setOfficeHours(prevHours =>
          prevHours.map(hour =>
            hour.id === updatedHour.id ? updatedHour : hour
          )
        )
      })

      // Handle socket errors
      socket.on('error', (error: any) => {
        console.error('Socket error:', error)
        setErrorMessage(`Error: ${error.message}`)
      })

      socket.on('connect_error', () => {
        console.error('Socket connection error')
        setErrorMessage('Unable to connect to the server. Please check your internet connection.')
      })

      socket.on('disconnect', (reason: string) => {
        console.log('Socket disconnected:', reason)
        if (reason === 'io server disconnect') {
          setErrorMessage('Disconnected from server. Please refresh the page.')
        } else {
          setErrorMessage('Connection lost. Attempting to reconnect...')
        }
      })

      return () => {
        socket.off('eventsLoaded')
        socket.off('officeHoursLoaded')
        socket.off('eventUpdated')
        socket.off('eventCreated')
        socket.off('eventDeleted')
        socket.off('officeHourUpdated')
        socket.off('error')
        socket.off('connect_error')
        socket.off('disconnect')
      }
    }
  }, [socket, isConnected])

  // Event handlers using either socket or fallback methods
  const handleUpdateEvent = (updatedEvent: CalendarEvent) => {
    updateEventSocket(updatedEvent);
    
    // If in fallback mode, update local state directly
    if (useFallback) {
      setEvents(prevEvents => 
        prevEvents.map(event => 
          event.id === updatedEvent.id ? updatedEvent : event
        )
      );
    }
  }

  const handleCreateEvent = (newEvent: CalendarEvent) => {
    createEventSocket(newEvent);
    
    // If in fallback mode, update local state directly
    if (useFallback) {
      setEvents(prevEvents => [...prevEvents, newEvent]);
    }
  }

  const handleDeleteEvent = (eventId: string) => {
    deleteEventSocket(eventId);
    
    // If in fallback mode, update local state directly
    if (useFallback) {
      setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
    }
  }

  const handleUpdateOfficeHour = (updatedHour: OfficeHour) => {
    updateOfficeHourSocket(updatedHour);
    
    // If in fallback mode, update local state directly
    if (useFallback) {
      setOfficeHours(prevHours =>
        prevHours.map(hour =>
          hour.id === updatedHour.id ? updatedHour : hour
        )
      );
    }
  }

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setIsEventModalOpen(true)
  }

  const handleSaveEvent = async (event: CalendarEvent) => {
    if (!socket) {
      setErrorMessage('Connection error. Please refresh the page and try again.');
      return;
    }

    try {
      setIsLoading(true);
      if (event.id && events.some(e => e.id === event.id)) {
        await new Promise(resolve => socket.emit('updateEvent', event, resolve));
      } else {
        await new Promise(resolve => socket.emit('createEvent', { ...event, teacherId: user.id }, resolve));
      }
      setIsEventModalOpen(false);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Failed to save event. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveOfficeHour = (hour: OfficeHour) => {
    if (socket) {
      const payload = {
        ...hour,
        teacherId: user.id
      }
      socket.emit('updateOfficeHour', payload)
    } else {
      setErrorMessage('Connection error. Please refresh the page and try again.')
    }
  }

  const handleDeleteOfficeHour = (hourId: string) => {
    if (socket) {
      socket.emit('deleteOfficeHour', hourId)
    } else {
      setErrorMessage('Connection error. Please refresh the page and try again.')
    }
  }

  const handleEventDrop = (item: DragItem, dropDate: Date) => {
    if (!socket) {
      setErrorMessage('Connection error. Please refresh the page and try again.')
      return
    }
    
    const event = item.event
    
    // Calculate duration of the original event
    const originalStart = new Date(event.start)
    const originalEnd = new Date(event.end)
    const durationMs = originalEnd.getTime() - originalStart.getTime()
    
    // Create new dates based on the drop target
    const newStart = new Date(dropDate)
    const newEnd = new Date(newStart.getTime() + durationMs)
    
    const updatedEvent: CalendarEvent = {
      ...event,
      start: newStart.toISOString(),
      end: newEnd.toISOString()
    }
    
    socket.emit('updateEvent', updatedEvent)
  }

  return (
    <DashboardLayout user={user}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Calendar & Schedule</h1>
          <button
            onClick={() => {
              setSelectedEvent(undefined)
              setIsEventModalOpen(true)
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <Plus className="h-5 w-5" />
            Create Event
          </button>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{errorMessage}</span>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <DndProvider backend={HTML5Backend}>
                <CalendarGrid
                  events={events}
                  onEventClick={handleEventClick}
                  onEventDrop={handleEventDrop}
                />
              </DndProvider>
            </div>
            <div>
              <OfficeHoursManager
                officeHours={officeHours}
                onSave={handleSaveOfficeHour}
                onDelete={handleDeleteOfficeHour}
              />
            </div>
          </div>
        )}

        <EventFormModal
          isOpen={isEventModalOpen}
          onClose={() => setIsEventModalOpen(false)}
          event={selectedEvent}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
        />
      </div>
    </DashboardLayout>
  )
}
