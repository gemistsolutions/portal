import React from 'react'
import useFetch from '../../hooks/useFetch'
import { formatDate } from '../../utils/formatDate'

function AtAGlanceCard() {
  const { data, loading } = useFetch('/dashboard/summary')

  if (loading) {
    return <div>Loading dashboard...</div>
  }

  const {
    complianceScore,
    nextAudit,
    pendingTasks,
    // drivers, vehicles, expirations, alerts
  } = data

  let scoreColor = ''
  if (complianceScore >= 80) scoreColor = 'text-accentGreen'
  else if (complianceScore >= 60) scoreColor = 'text-accentYellow'
  else scoreColor = 'text-accentRed'

  return (
    <div className="bg-white shadow-sm rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            Welcome, {data.companyName || 'Bob The Builder'}
          </h1>
          <p className="text-gray-600">
            Here’s a summary of how things stand:
          </p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold inline-block mr-2">
            <span className={scoreColor}>{complianceScore}</span>/100
          </div>
          <div className="text-sm">CSA Score</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="flex items-center">
          <div className="mr-3">
            <div className="text-sm text-gray-500">Next Audit:</div>
            <div className="text-lg font-medium">
              {formatDate(nextAudit)}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="mr-3">
            <div className="text-sm text-gray-500">Pending Tasks:</div>
            <div className="text-lg font-medium">
              {pendingTasks} Items Need Attention
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AtAGlanceCard
