import { useState, useEffect } from 'react'
import { CalendarEvent } from '@/types/calendar'
import { X, Trash2 } from 'lucide-react'

interface EventFormModalProps {
  isOpen: boolean
  onClose: () => void
  event?: CalendarEvent
  onSave: (event: CalendarEvent) => void
  onDelete?: (eventId: string) => void
}

/**
 * Safely converts a date or date string to ISO string
 * Falls back to current time if date is invalid
 */
function safeToISOString(value: string | Date): string {
  try {
    const date = typeof value === 'string' ? new Date(value) : value;
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      console.warn('Invalid date encountered:', value);
      return new Date().toISOString();
    }
    
    return date.toISOString();
  } catch (error) {
    console.error('Error parsing date:', error);
    return new Date().toISOString();
  }
}

export const EventFormModal = ({ isOpen, onClose, event, onSave, onDelete }: EventFormModalProps) => {
  const [formData, setFormData] = useState<Partial<CalendarEvent>>({
    title: '',
    type: 'class',
    start: new Date().toISOString(),
    end: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    location: '',
    description: '',
    status: 'scheduled'
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (event) {
      setFormData(event)
    }
  }, [event])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.title?.trim()) {
      newErrors.title = 'Title is required'
    }

    const startDate = new Date(formData.start || '')
    const endDate = new Date(formData.end || '')

    if (isNaN(startDate.getTime())) {
      newErrors.start = 'Valid start time is required'
    }

    if (isNaN(endDate.getTime())) {
      newErrors.end = 'Valid end time is required'
    } else if (endDate <= startDate) {
      newErrors.end = 'End time must be after start time'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSave({
        id: event?.id || Math.random().toString(36).substr(2, 9),
        ...formData as CalendarEvent
      })
    }
  }

  const formatDateTimeLocal = (isoString: string) => {
    const date = new Date(isoString)
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {event?.id ? 'Edit Event' : 'Create Event'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`w-full border rounded-md p-2 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Event title"
            />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              value={formData.type || 'class'}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as CalendarEvent['type'] })}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="class">Class</option>
              <option value="office_hours">Office Hours</option>
              <option value="meeting">Meeting</option>
              <option value="exam">Exam</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Start Time</label>
              <input
                type="datetime-local"
                value={formatDateTimeLocal(formData.start || new Date().toISOString())}
                onChange={(e) => setFormData({ ...formData, start: safeToISOString(e.target.value) })}
                className={`w-full border rounded-md p-2 ${errors.start ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.start && <p className="text-xs text-red-500 mt-1">{errors.start}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Time</label>
              <input
                type="datetime-local"
                value={formatDateTimeLocal(formData.end || safeToISOString(new Date(Date.now() + 60 * 60 * 1000)))}
                onChange={(e) => setFormData({ ...formData, end: safeToISOString(e.target.value) })}
                className={`w-full border rounded-md p-2 ${errors.end ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.end && <p className="text-xs text-red-500 mt-1">{errors.end}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              value={formData.location || ''}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Room number or location"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Additional details"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={formData.status || 'scheduled'}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as CalendarEvent['status'] })}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="scheduled">Scheduled</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="flex justify-between pt-4">
            {event?.id && onDelete && (
              <button
                type="button"
                onClick={() => onDelete(event.id)}
                className="flex items-center text-red-600 hover:text-red-800"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </button>
            )}
            <div className="flex gap-2 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
