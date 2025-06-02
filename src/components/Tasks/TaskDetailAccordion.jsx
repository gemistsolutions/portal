import React, { useState } from 'react'
import { ChevronDown, CheckCircle, FileText } from 'lucide-react'
import { formatDate } from '../../utils/formatDate'

function TaskDetailAccordion({ task }) {
  const [isOpen, setIsOpen] = useState(false)
  const priorityColor =
    task.priority === 'High'
      ? 'bg-accentRed text-white'
      : task.priority === 'Medium'
      ? 'bg-accentYellow text-white'
      : 'bg-accentGreen text-white'

  return (
    <div className="bg-white shadow-sm rounded-2xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex items-center justify-between"
      >
        <div className="flex items-center space-x-4">
          <ChevronDown
            className={`h-5 w-5 transform transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
          <div>
            <div className="font-medium text-gray-800">{task.title}</div>
            <div className="text-sm text-gray-500">
              Due: {formatDate(task.dueDate)}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className={`px-2 py-1 text-xs rounded-full ${priorityColor}`}>
            {task.priority}
          </span>
          <span className="text-sm text-gray-500">{task.status}</span>
        </div>
      </button>
      {isOpen && (
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
          <p className="text-sm text-gray-700 mb-2">Notes: {task.notes}</p>
          <div className="flex space-x-3">
            <button
              onClick={() => alert('Upload supporting file')}
              className="flex items-center space-x-1 text-sm text-blue-600 hover:underline"
            >
              <FileText size={16} />
              <span>Upload File</span>
            </button>
            <button
              onClick={() => alert(`Mark task ${task.id} complete`)}
              className="flex items-center space-x-1 text-sm text-green-600 hover:underline"
            >
              <CheckCircle size={16} />
              <span>Mark Complete</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskDetailAccordion
