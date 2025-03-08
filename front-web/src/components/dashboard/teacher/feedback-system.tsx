import { useState } from "react"
import { Save, Plus, Trash2, Edit2, Check } from "lucide-react"

interface RubricCriterion {
  id: string
  name: string
  description: string
  maxPoints: number
}

interface FeedbackTemplate {
  id: string
  title: string
  content: string
  category: string
}

interface FeedbackSystemProps {
  onSaveFeedback: (feedback: string) => void
  onSaveRubric: (criteria: RubricCriterion[]) => void
  initialFeedback?: string
  templates: FeedbackTemplate[]
  onAddTemplate: (template: Omit<FeedbackTemplate, "id">) => void
  onDeleteTemplate: (id: string) => void
}

export function FeedbackSystem({
  onSaveFeedback,
  onSaveRubric,
  initialFeedback = "",
  templates,
  onAddTemplate,
  onDeleteTemplate,
}: FeedbackSystemProps) {
  const [feedback, setFeedback] = useState(initialFeedback)
  const [rubricCriteria, setRubricCriteria] = useState<RubricCriterion[]>([])
  const [showTemplateForm, setShowTemplateForm] = useState(false)
  const [newTemplate, setNewTemplate] = useState({
    title: "",
    content: "",
    category: "general"
  })
  const [editingCriterion, setEditingCriterion] = useState<string | null>(null)

  const handleAddCriterion = () => {
    const newCriterion: RubricCriterion = {
      id: Math.random().toString(36).substr(2, 9),
      name: "",
      description: "",
      maxPoints: 10
    }
    setRubricCriteria([...rubricCriteria, newCriterion])
    setEditingCriterion(newCriterion.id)
  }

  const handleUpdateCriterion = (id: string, updates: Partial<RubricCriterion>) => {
    setRubricCriteria(criteria =>
      criteria.map(c => (c.id === id ? { ...c, ...updates } : c))
    )
  }

  const handleDeleteCriterion = (id: string) => {
    setRubricCriteria(criteria => criteria.filter(c => c.id !== id))
  }

  const handleSaveRubric = () => {
    onSaveRubric(rubricCriteria)
  }

  const handleInsertTemplate = (template: FeedbackTemplate) => {
    setFeedback(prev => prev + (prev ? "\n\n" : "") + template.content)
  }

  const handleSaveTemplate = () => {
    if (newTemplate.title && newTemplate.content) {
      onAddTemplate(newTemplate)
      setNewTemplate({ title: "", content: "", category: "general" })
      setShowTemplateForm(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Feedback Templates Section */}
      <div className="rounded-lg border bg-white p-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Feedback Templates</h3>
          <button
            onClick={() => setShowTemplateForm(!showTemplateForm)}
            className="flex items-center gap-2 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Add Template
          </button>
        </div>

        {showTemplateForm && (
          <div className="mb-4 rounded-lg border bg-gray-50 p-4">
            <input
              type="text"
              placeholder="Template Title"
              value={newTemplate.title}
              onChange={e => setNewTemplate(prev => ({ ...prev, title: e.target.value }))}
              className="mb-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <textarea
              placeholder="Template Content"
              value={newTemplate.content}
              onChange={e => setNewTemplate(prev => ({ ...prev, content: e.target.value }))}
              className="mb-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              rows={3}
            />
            <select
              value={newTemplate.category}
              onChange={e => setNewTemplate(prev => ({ ...prev, category: e.target.value }))}
              className="mb-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="general">General</option>
              <option value="positive">Positive Feedback</option>
              <option value="constructive">Constructive Feedback</option>
              <option value="improvement">Needs Improvement</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowTemplateForm(false)}
                className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTemplate}
                className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
              >
                Save Template
              </button>
            </div>
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map(template => (
            <div
              key={template.id}
              className="relative rounded-lg border bg-gray-50 p-3"
            >
              <div className="mb-2 flex items-center justify-between">
                <h4 className="font-medium text-gray-900">{template.title}</h4>
                <button
                  onClick={() => onDeleteTemplate(template.id)}
                  className="rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <p className="mb-2 text-sm text-gray-600 line-clamp-3">{template.content}</p>
              <button
                onClick={() => handleInsertTemplate(template)}
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Use Template
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Rubric Builder Section */}
      <div className="rounded-lg border bg-white p-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Rubric Builder</h3>
          <button
            onClick={handleAddCriterion}
            className="flex items-center gap-2 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Add Criterion
          </button>
        </div>

        <div className="space-y-3">
          {rubricCriteria.map(criterion => (
            <div
              key={criterion.id}
              className="rounded-lg border bg-gray-50 p-3"
            >
              {editingCriterion === criterion.id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={criterion.name}
                    onChange={e => handleUpdateCriterion(criterion.id, { name: e.target.value })}
                    placeholder="Criterion Name"
                    className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <textarea
                    value={criterion.description}
                    onChange={e => handleUpdateCriterion(criterion.id, { description: e.target.value })}
                    placeholder="Description"
                    className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    rows={2}
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={criterion.maxPoints}
                      onChange={e => handleUpdateCriterion(criterion.id, { maxPoints: parseInt(e.target.value) })}
                      className="w-24 rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-500">Max Points</span>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditingCriterion(null)}
                      className="rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">{criterion.name || "Untitled Criterion"}</h4>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setEditingCriterion(criterion.id)}
                        className="rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCriterion(criterion.id)}
                        className="rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="mb-2 text-sm text-gray-600">{criterion.description}</p>
                  <div className="text-sm text-gray-500">Max Points: {criterion.maxPoints}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {rubricCriteria.length > 0 && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSaveRubric}
              className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <Save className="h-4 w-4" />
              Save Rubric
            </button>
          </div>
        )}
      </div>

      {/* Feedback Editor Section */}
      <div className="rounded-lg border bg-white p-4">
        <h3 className="mb-4 text-lg font-medium text-gray-900">Feedback</h3>
        <textarea
          value={feedback}
          onChange={e => setFeedback(e.target.value)}
          className="mb-4 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          rows={6}
          placeholder="Enter your feedback..."
        />
        <div className="flex justify-end">
          <button
            onClick={() => onSaveFeedback(feedback)}
            className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Save className="h-4 w-4" />
            Save Feedback
          </button>
        </div>
      </div>
    </div>
  )
}
