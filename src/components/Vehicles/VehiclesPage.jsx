import { useState } from "react"
import { VehicleTable } from "./VehicleTable"

export function VehiclesPage() {
    const [refreshKey,setRefreshKey]=useState(0)
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Vehicles</h1>
          <button onClick={()=>alert('TODO: open add vehicle modal')} className="bg-primary text-white px-4 py-2 rounded hover:bg-[#082234]">Add Vehicle</button>
        </div>
        <VehicleTable key={refreshKey}/>
      </div>
    )
  }
  