import { useState } from 'react'
import { Clock, MapPin, Edit, Trash, Plus } from 'lucide-react'
import { OfficeHour } from '@/types/calendar'
import { OfficeHourForm } from './office-hour-form'

interface OfficeHoursManagerProps {
  officeHours: OfficeHour[]
  onSave: (hour: OfficeHour) => void
  onDelete: (hourId: string) => void
}

export const OfficeHoursManager = ({ officeHours, onSave, onDelete }: OfficeHoursManagerProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedHour, setSelectedHour] = useState<OfficeHour | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const handleOpenForm = (hour?: OfficeHour) => {
    if (hour) {
      setSelectedHour(hour)
    } else {
      // Initialize with empty office hour data
      setSelectedHour({
        id: '',
        dayOfWeek: 'Monday',
        startTime: '09:00',
        endTime: '10:00',
        location: '',
        isRecurring: true,
        maxStudents: 5,
        currentBookings: 0
      })
    }
    setIsFormOpen(true)
  }
  
  const handleSave = (hour: OfficeHour) => {
    // Validate form
    const newErrors: Record<string, string> = {}
    
    if (!hour.location.trim()) {
      newErrors.location = 'Location is required'
    }
    
    if (hour.maxStudents <= 0) {
      newErrors.maxStudents = 'Maximum students must be greater than 0'
    }
    
    const startTime = hour.startTime.split(':').map(Number)
    const endTime = hour.endTime.split(':').map(Number)
    
    const startMinutes = startTime[0] * 60 + startTime[1]
    const endMinutes = endTime[0] * 60 + endTime[1]
    
    if (endMinutes <= startMinutes) {
      newErrors.endTime = 'End time must be after start time'
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    // If validation passes
    onSave({
      ...hour,
      id: hour.id || Math.random().toString(36).substr(2, 9)
    })
    
    setIsFormOpen(false)
    setSelectedHour(null)
    setErrors({})
  }
  
  const handleCancel = () => {
    setIsFormOpen(false)
    setSelectedHour(null)
    setErrors({})
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Office Hours</h3>
        <button
          onClick={() => handleOpenForm()}
          className="flex items-center gap-1 text-blue-600 text-sm hover:text-blue-800"
        >
          <Plus className="h-4 w-4" />
          Add Office Hours
        </button>
      </div>
      
      {officeHours.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          <p>No office hours scheduled yet</p>
          <button
            onClick={() => handleOpenForm()}
            className="mt-2 text-blue-600 hover:text-blue-800"
          >
            Add your first office hours
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {officeHours
            .sort((a, b) => {
              const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
              const dayDiff = days.indexOf(a.dayOfWeek) - days.indexOf(b.dayOfWeek)
              if (dayDiff !== 0) return dayDiff
              
              const aTime = a.startTime.split(':').map(Number)
              const bTime = b.startTime.split(':').map(Number)
              return (aTime[0] * 60 + aTime[1]) - (bTime[0] * 60 + bTime[1])
            })
            .map((hour) => (
              <div key={hour.id} className="flex items-center justify-between border-b pb-3">
                <div>
                  <div className="font-medium">
                    {hour.dayOfWeek}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Clock className="h-3.5 w-3.5" />
                    {hour.startTime} - {hour.endTime}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin className="h-3.5 w-3.5" />
                    {hour.location}
                  </div>
                  <div className="text-xs text-gray-500">
                    {hour.currentBookings}/{hour.maxStudents} students booked
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenForm(hour)}
                    className="p-1 text-gray-600 hover:text-blue-600"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(hour.id)}
                    className="p-1 text-gray-600 hover:text-red-600"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
      
      {isFormOpen && selectedHour && (
        <OfficeHourForm
          hour={selectedHour}
          onSave={handleSave}
          onCancel={handleCancel}
          errors={errors}
        />
      )}
    </div>
  )
}
