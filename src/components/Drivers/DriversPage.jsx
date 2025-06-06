import React, { useState, useEffect } from 'react'
import { DriverTable } from './DriverTable'
import { AddDriverModal } from './AddDriverModal'

export function DriversPage() {
    const [showAdd, setShowAdd] = useState(false)
    const [refreshKey, setRefreshKey] = useState(0)
  
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Drivers</h1>
          <button
            onClick={() => setShowAdd(true)}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-[#082234]"
          >
            Add / Edit Driver
          </button>
        </div>
        <DriverTable key={refreshKey} onUpdated={() => setRefreshKey(k=>k+1)}/>
        {showAdd && <AddDriverModal onClose={()=>setShowAdd(false)} onSaved={()=>{
          setShowAdd(false); setRefreshKey(k=>k+1)
        }}/>}
      </div>
    )
  }