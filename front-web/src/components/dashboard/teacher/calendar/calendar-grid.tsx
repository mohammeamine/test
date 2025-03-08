import { useDrop } from 'react-dnd'
import { CalendarEvent, DragItem } from '@/types/calendar'
import { CalendarEventItem } from './calendar-event-item'

interface CalendarGridProps {
  events: CalendarEvent[]
  onEventClick: (event: CalendarEvent) => void
  onEventDrop: (event: CalendarEvent, date: Date) => void
}

export const CalendarGrid = ({ events, onEventClick, onEventDrop }: CalendarGridProps) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  const hours = Array.from({ length: 12 }, (_, i) => i + 8) // 8 AM to 8 PM

  const [{ isOver }, dropRef] = useDrop<
    DragItem,
    void,
    { isOver: boolean }
  >(() => ({
    accept: 'calendar-event',
    drop: (item, monitor) => {
      if (item.type === 'calendar-event') {
        const dropOffset = monitor.getClientOffset()
        if (dropOffset) {
          const gridElement = document.querySelector('.calendar-grid')
          if (gridElement) {
            const rect = gridElement.getBoundingClientRect()
            const dayWidth = rect.width / days.length
            const hourHeight = rect.height / hours.length
            
            const dayIndex = Math.floor((dropOffset.x - rect.left) / dayWidth)
            const hourIndex = Math.floor((dropOffset.y - rect.top) / hourHeight)
            
            const dropDate = new Date()
            dropDate.setHours(hours[hourIndex])
            dropDate.setMinutes(0)
            dropDate.setSeconds(0)
            dropDate.setMilliseconds(0)
            
            // Adjust day of week (0 = Sunday, so we add 1 to match our days array)
            const currentDay = dropDate.getDay()
            const targetDay = dayIndex + 1 // Monday = 1, Friday = 5
            const dayDiff = targetDay - currentDay
            dropDate.setDate(dropDate.getDate() + dayDiff)
            
            onEventDrop(item.event, dropDate)
          }
        }
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }), [onEventDrop])

  return (
    <div 
      ref={dropRef} 
      className={`calendar-grid grid grid-cols-6 gap-px bg-gray-200 ${isOver ? 'bg-blue-100' : ''}`}
    >
      <div className="bg-white p-2 font-medium">Time</div>
      {days.map(day => (
        <div key={day} className="bg-white p-2 font-medium">
          {day}
        </div>
      ))}

      {hours.map(hour => (
        <>
          <div key={`time-${hour}`} className="bg-white p-2 text-sm">
            {hour}:00
          </div>
          {days.map(day => (
            <div key={`${day}-${hour}`} className="bg-white p-2 min-h-[60px] relative">
              {events
                .filter(event => {
                  const eventDate = new Date(event.start)
                  return (
                    eventDate.getDay() === days.indexOf(day) + 1 &&
                    eventDate.getHours() === hour
                  )
                })
                .map(event => (
                  <CalendarEventItem
                    key={event.id}
                    event={event}
                    onClick={() => onEventClick(event)}
                  />
                ))}
            </div>
          ))}
        </>
      ))}
    </div>
  )
}
