import React from 'react'
import useFetch from '../../hooks/useFetch'
import { formatDate } from '../../utils/formatDate'
import { Link } from 'react-router-dom'

function OverviewTiles() {
  const { data, loading } = useFetch('/dashboard/summary')

  if (loading || !data) {
    return <div>Loading overview tiles...</div>
  }

  const { drivers, vehicles, expirations, alerts } = data

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Drivers Tile */}
      <div className="bg-white shadow-lg rounded-2xl p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold mb-2">Drivers</h2>
          <p className="text-2xl font-bold">{drivers.total}</p>
          <p className="text-sm text-gray-500">
            {drivers.complete}/{drivers.total} Complete
          </p>
        </div>
        <Link
          to="/drivers"
          className="text-sm text-primary mt-3 hover:underline"
        >
          View Drivers →
        </Link>
      </div>

      {/* Vehicles Tile */}
      <div className="bg-white shadow-lg rounded-2xl p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold mb-2">Vehicles</h2>
          <p className="text-2xl font-bold">{vehicles.total}</p>
          <p className="text-sm text-gray-500">
            {vehicles.updated}/{vehicles.total} Updated
          </p>
        </div>
        <Link
          to="/documents?filter=vehicle"
          className="text-sm text-primary mt-3 hover:underline"
        >
          View Vehicles →
        </Link>
      </div>

      {/* Upcoming Expirations Tile */}
      <div className="bg-white shadow-lg rounded-2xl p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold mb-2">Upcoming Expirations</h2>
          {expirations.slice(0, 2).map((exp, idx) => (
            <p key={idx} className="text-sm text-gray-700 mb-1">
              • {exp.text}
            </p>
          ))}
        </div>
        <Link
          to="/tasks?filter=expirations"
          className="text-sm text-primary mt-3 hover:underline"
        >
          See All →
        </Link>
      </div>

      {/* Recent Alerts Tile */}
      <div className="bg-white shadow-lg rounded-2xl p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold mb-2">Recent Alerts</h2>
          {alerts.slice(0, 2).map((alert, idx) => (
            <p key={idx} className="text-sm text-gray-700 mb-1">
              • {alert.text}
            </p>
          ))}
        </div>
        <Link
          to="/tasks"
          className="text-sm text-primary mt-3 hover:underline"
        >
          View All Alerts →
        </Link>
      </div>
    </div>
  )
}

export default OverviewTiles
