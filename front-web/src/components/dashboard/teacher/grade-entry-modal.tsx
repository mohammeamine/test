import { useState } from "react"
import { X, Save, AlertCircle } from "lucide-react"

interface Student {
  id: string
  name: string
  currentGrade?: number
  submissionDate?: string
  status: "submitted" | "not_submitted" | "late"
}

interface GradeEntryModalProps {
  isOpen: boolean
  onClose: () => void
  assignmentTitle: string
  courseId: string
  students: Student[]
  onSaveGrades: (grades: { studentId: string; grade: number; feedback: string }[]) => void
}

export function GradeEntryModal({
  isOpen,
  onClose,
  assignmentTitle,
  courseId,
  students,
  onSaveGrades,
}: GradeEntryModalProps) {
  const [grades, setGrades] = useState<Record<string, number>>({})
  const [feedback, setFeedback] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateGrade = (grade: number) => {
    if (isNaN(grade) || grade < 0 || grade > 100) {
      return "Grade must be between 0 and 100"
    }
    return ""
  }

  const handleGradeChange = (studentId: string, value: string) => {
    const grade = parseFloat(value)
    setGrades(prev => ({ ...prev, [studentId]: grade }))
    
    const error = validateGrade(grade)
    if (error) {
      setErrors(prev => ({ ...prev, [studentId]: error }))
    } else {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[studentId]
        return newErrors
      })
    }
  }

  const handleSave = () => {
    const gradeData = students
      .filter(student => grades[student.id] !== undefined)
      .map(student => ({
        studentId: student.id,
        grade: grades[student.id],
        feedback: feedback[student.id] || ""
      }))
    onSaveGrades(gradeData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{assignmentTitle}</h2>
            <p className="mt-1 text-sm text-gray-500">Enter grades and feedback</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="mt-6 max-h-[60vh] overflow-y-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Student</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Submission Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Grade</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Feedback</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map(student => (
                <tr key={student.id}>
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-gray-900">{student.name}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      student.status === "submitted"
                        ? "bg-green-100 text-green-800"
                        : student.status === "late"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {student.status.replace("_", " ").charAt(0).toUpperCase() + 
                       student.status.slice(1).replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {student.submissionDate || "N/A"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={grades[student.id] || ""}
                        onChange={(e) => handleGradeChange(student.id, e.target.value)}
                        className={`w-20 rounded-md border px-2 py-1 text-sm ${
                          errors[student.id] 
                            ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        }`}
                      />
                      {errors[student.id] && (
                        <div className="absolute right-0 top-0 flex items-center pr-3">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        </div>
                      )}
                    </div>
                    {errors[student.id] && (
                      <p className="mt-1 text-xs text-red-600">{errors[student.id]}</p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <textarea
                      value={feedback[student.id] || ""}
                      onChange={(e) => setFeedback(prev => ({ 
                        ...prev, 
                        [student.id]: e.target.value 
                      }))}
                      className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-blue-500 focus:ring-blue-500"
                      rows={2}
                      placeholder="Enter feedback..."
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-end gap-3 border-t pt-4">
          <button
            onClick={onClose}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={Object.keys(errors).length > 0}
            className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-blue-300"
          >
            <Save className="h-4 w-4" />
            Save Grades
          </button>
        </div>
      </div>
    </div>
  )
}
