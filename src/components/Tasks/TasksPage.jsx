import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import TaskList from './TaskList'

function TasksPage() {
  const [searchParams] = useSearchParams()
  const filterParam = searchParams.get('filter') || 'all'

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Tasks</h1>
      </div>
      <div className="mb-4">
        <div className="inline-flex space-x-2">
          {['all', 'expirations', 'missing', 'audit', 'completed'].map((tab) => (
            <a
              key={tab}
              href={`/tasks?filter=${tab}`}
              className={`px-4 py-2 rounded ${
                filterParam === tab
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } capitalize`}
            >
              {tab === 'all' ? 'All Tasks' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </a>
          ))}
        </div>
      </div>
      <TaskList filter={filterParam} />
    </div>
  )
}

export default TasksPage
