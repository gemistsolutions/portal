import { useState,useEffect } from "react"
import { Dialog } from '@headlessui/react'
import { formatDate } from "../../utils/formatDate"
export function VehicleTable(){
    const [rows,setRows]=useState(null)
    const [drawer,setDrawer]=useState(null)
    useEffect(()=>{
      setTimeout(()=>{
        setRows([
          {id:'t17', plate:'WI‑12345', insp:'2025-06-30', reg:'2026-02-01', odometer:412000, defects:0},
          {id:'t22', plate:'WI‑54321', insp:'2024-04-12', reg:'2025-07-15', odometer:289000, defects:2},
        ])
      },600)
    },[])
    if(rows===null) return <div>Loading vehicles…</div>
    return (<div className="overflow-x-auto bg-white shadow-sm rounded-2xl">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>{['#','Plate','DOT Insp.','Reg Exp.','Odometer','Defects'].map(h=>(<th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>))}</tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {rows.map(r=>(<tr key={r.id} onClick={()=>setDrawer(r)} className="hover:bg-gray-50 cursor-pointer">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{r.id}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{r.plate}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatDate(r.insp)}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatDate(r.reg)}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{(r.odometer/1000).toFixed(0)}k mi</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{r.defects}</td>
          </tr>))}
        </tbody>
      </table>
      {drawer && <VehicleDetailDrawer vehicle={drawer} onClose={()=>setDrawer(null)} />}
    </div>)
  }
  
  function VehicleDetailDrawer({vehicle,onClose}){
    return (
      <Dialog open={true} onClose={onClose} className="relative z-40">
        <div className="fixed inset-0 bg-black/25" aria-hidden="true"/>
        <div className="fixed inset-0 flex justify-end">
          <div className="w-full max-w-lg bg-white p-8 overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Truck {vehicle.id}</h2>
            <p className="text-gray-600 mb-2">Plate: {vehicle.plate}</p>
            <p className="text-gray-600 mb-2">DOT Inspection: {formatDate(vehicle.insp)}</p>
            <p className="text-gray-600 mb-2">Registration Exp.: {formatDate(vehicle.reg)}</p>
            <p className="text-gray-600 mb-6">Odometer: {vehicle.odometer.toLocaleString()} mi</p>
            {/* TODO: tabs for Maintenance Logs, DVIR Defects, Images */}
            <button onClick={onClose} className="bg-primary text-white px-4 py-2 rounded">Close</button>
          </div>
        </div>
      </Dialog>
    )
  }