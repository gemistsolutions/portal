import React from 'react'
import AtAGlanceCard from './AtAGlanceCard'
import OverviewTiles from './OverviewTiles'
import QuickActions from './QuickActions'

function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Hero / At-a-Glance */}
      <AtAGlanceCard />

      {/* Four‐Tile Overview */}
      <OverviewTiles />

      {/* Quick Actions Row */}
      <QuickActions />
    </div>
  )
}

export default Dashboard
