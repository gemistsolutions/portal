import React from 'react'
import useFetch from '../../hooks/useFetch'
import TaskDetailAccordion from './TaskDetailAccordion'

function TaskList({ filter }) {
  const { data, loading } = useFetch('/tasks')

  if (loading) {
    return <div>Loading tasks...</div>
  }

  // Simple filter by type/status
  let tasks = data
  if (filter === 'expirations') {
    tasks = data.filter((t) => t.type.toLowerCase().includes('expiration'))
  } else if (filter === 'missing') {
    tasks = data.filter((t) => t.type.toLowerCase().includes('missing'))
  } else if (filter === 'audit') {
    tasks = data.filter((t) => t.type.toLowerCase().includes('audit'))
  } else if (filter === 'completed') {
    tasks = data.filter((t) => t.status.toLowerCase() === 'closed')
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskDetailAccordion key={task.id} task={task} />
      ))}
      {tasks.length === 0 && <div>No tasks found.</div>}
    </div>
  )
}

export default TaskList
