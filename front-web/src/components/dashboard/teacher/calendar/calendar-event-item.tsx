import { useDrag } from 'react-dnd'
import type { Identifier } from 'dnd-core'
import { CalendarEvent } from '@/types/calendar'

interface DragItem {
  type: 'calendar-event'
  event: CalendarEvent
}

interface CalendarEventItemProps {
  event: CalendarEvent
  onClick: () => void
}

export const CalendarEventItem = ({ event, onClick }: CalendarEventItemProps) => {
  const [{ isDragging }, dragRef] = useDrag<
    DragItem,
    void,
    { isDragging: boolean }
  >(() => ({
    type: 'calendar-event' as const,
    item: { type: 'calendar-event', event },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [event])

  const getEventTypeStyles = () => {
    switch (event.type) {
      case 'class':
        return 'bg-blue-100 border-blue-400 text-blue-700'
      case 'office_hours':
        return 'bg-green-100 border-green-400 text-green-700'
      case 'meeting':
        return 'bg-purple-100 border-purple-400 text-purple-700'
      case 'exam':
        return 'bg-red-100 border-red-400 text-red-700'
      default:
        return 'bg-gray-100 border-gray-400 text-gray-700'
    }
  }

  return (
    <div
      ref={dragRef}
      onClick={onClick}
      className={`
        ${getEventTypeStyles()}
        ${isDragging ? 'opacity-50' : 'opacity-100'}
        p-2 mb-1 rounded border-l-4 cursor-pointer hover:shadow transition-shadow duration-200
      `}
    >
      <div className="text-sm font-medium truncate">{event.title}</div>
      <div className="text-xs">
        {new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
        {new Date(event.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
      {event.location && (
        <div className="text-xs truncate">{event.location}</div>
      )}
    </div>
  )
}
