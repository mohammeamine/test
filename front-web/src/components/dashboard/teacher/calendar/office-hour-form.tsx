import { useState } from 'react'
import { OfficeHour } from '@/types/calendar'

interface OfficeHourFormProps {
  hour: OfficeHour
  onSave: (hour: OfficeHour) => void
  onCancel: () => void
  errors: Record<string, string>
}

export const OfficeHourForm = ({ hour, onSave, onCancel, errors }: OfficeHourFormProps) => {
  const [formData, setFormData] = useState<OfficeHour>(hour)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {hour.id ? 'Edit Office Hours' : 'Add Office Hours'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Day of Week</label>
            <select
              value={formData.dayOfWeek}
              onChange={(e) => setFormData({ ...formData, dayOfWeek: e.target.value })}
              className={`w-full rounded-md border p-2 ${errors.dayOfWeek ? 'border-red-500' : 'border-gray-300'}`}
            >
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
            {errors.dayOfWeek && <p className="text-xs text-red-500">{errors.dayOfWeek}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Start Time</label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className={`w-full rounded-md border p-2 ${errors.startTime ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {errors.startTime && <p className="text-xs text-red-500">{errors.startTime}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Time</label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className={`w-full rounded-md border p-2 ${errors.endTime ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {errors.endTime && <p className="text-xs text-red-500">{errors.endTime}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className={`w-full rounded-md border p-2 ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
            {errors.location && <p className="text-xs text-red-500">{errors.location}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Maximum Students</label>
            <input
              type="number"
              value={formData.maxStudents}
              onChange={(e) => setFormData({ ...formData, maxStudents: parseInt(e.target.value) })}
              className={`w-full rounded-md border p-2 ${errors.maxStudents ? 'border-red-500' : 'border-gray-300'}`}
              min={1}
              required
            />
            {errors.maxStudents && <p className="text-xs text-red-500">{errors.maxStudents}</p>}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isRecurring}
              onChange={(e) => setFormData({ ...formData, isRecurring: e.target.checked })}
              className="rounded border-gray-300"
            />
            <label className="text-sm font-medium">Recurring weekly</label>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
