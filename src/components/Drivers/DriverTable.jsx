import React, { useState, useEffect, EmptyState} from 'react'
import { Dialog } from '@headlessui/react'
import { formatDate } from '../../utils/formatDate'
import {  X } from 'lucide-react'

export function DriverTable({ onUpdated }) {
    const [rows, setRows]   = useState(null)   // null = loading; [] = empty
    const [drawer, setDrawer] = useState(null) // {driver} | null
  
    useEffect(()=>{
      async function load(){
        // TODO: fetch drivers from Firestore (collection "drivers") ordered by lastName
        // Sample placeholder after 600 ms
        setTimeout(()=>{
          setRows([
            {id:'d1', name:'Jane Smith', cdlExp:'2025-07-21', medExp:'2025-12-10', dqPct:100},
            {id:'d2', name:'Bob Brown',  cdlExp:null,            medExp:null,        dqPct:45},
          ])
        },600)
      }
      load()
    },[])
  
    if(rows===null) return <div>Loading drivers…</div>
    if(!rows.length) return <EmptyState label="No drivers added yet." actionText="Add Driver" onAction={onUpdated}/>
  
    return (
      <div className="overflow-x-auto bg-white shadow-sm rounded-2xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Name','CDL Expires','Med Cert','DQ File','Actions'].map(h=>(
                <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map(r=> (
              <tr key={r.id} className="hover:bg-gray-50 cursor-pointer" onClick={()=>setDrawer(r)}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{r.name}</td>
                <td className="px-6 py-4 text-sm">{formatDate(r.cdlExp) || '—'}</td>
                <td className="px-6 py-4 text-sm">{formatDate(r.medExp) || '—'}</td>
                <td className="px-6 py-4">
                  <DQBadge pct={r.dqPct}/>
                </td>
                <td className="px-6 py-4 text-sm text-primary">View</td>
              </tr>
            ))}
          </tbody>
        </table>
        {drawer && <DriverDetailDrawer driver={drawer} onClose={()=>setDrawer(null)} />}
      </div>
    )
  }

  function DQBadge({ pct }) {
    const color = pct===100 ? 'bg-accentGreen' : pct>=70 ? 'bg-accentYellow' : 'bg-accentRed'
    return <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${color} text-white`}>{pct}%</span>
  }
  
  function DriverDetailDrawer({ driver, onClose }) {
    const tabs = ['Profile', 'DQ Docs', 'HOS', 'Training', 'Notes']
    const [active, setActive] = useState(tabs[0])
    return (
      <Dialog open={true} onClose={onClose} className="relative z-50">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        {/* Modal container */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-5xl h-[90vh] rounded-2xl shadow-xl flex flex-col overflow-hidden">
            {/* Header bar with tabs */}
            <header className="border-b bg-white sticky top-0 z-10">
              <div className="flex items-center justify-between px-6 py-4">
                <h2 className="text-2xl font-semibold">{driver.name}</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700"><X className="w-6 h-6" /></button>
              </div>
              <nav className="pl-6 flex space-x-6 overflow-x-auto text-sm font-medium text-gray-600">
                {tabs.map(t => (
                  <button key={t} onClick={() => setActive(t)} className={active === t ? 'border-b-2 border-primary text-primary py-2' : 'py-2 hover:text-gray-800'}>{t}</button>
                ))}
              </nav>
            </header>
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {active === 'Profile' && <ProfileTab driver={driver} />}
              {active === 'DQ Docs' && <DQDocsTab driver={driver} />}
              {active === 'HOS' && <HOSTab driver={driver} />}
              {active === 'Training' && <TrainingTab driver={driver} />}
              {active === 'Notes' && <NotesTab driver={driver} />}
            </div>
          </div>
        </div>
      </Dialog>
    )
  }
  
  // ---- Tab content placeholder components ------------------------------------
  function ProfileTab({ driver }) {
    return (
      <section className="space-y-4 text-sm text-gray-700">
        <div><span className="font-semibold">CDL Expires:</span> {formatDate(driver.cdlExp)}</div>
        <div><span className="font-semibold">Medical Cert Expires:</span> {formatDate(driver.medExp)}</div>
        <div><span className="font-semibold">DQ Completion:</span> <DQBadge pct={driver.dqPct} /></div>
      </section>
    )
  }
  
  function DQDocsTab() {
    const docs = ['CDL.pdf', 'MedCard.pdf', 'RoadTest.pdf'] // TODO replace
    return (
      <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
        {docs.map(d => <li key={d}>{d}</li>)}
      </ul>
    )
  }
  function HOSTab() {
    return <p className="text-sm text-gray-700">No violations in last 7 days. {/* TODO real data */}</p>
  }
  function TrainingTab() {
    return <p className="text-sm text-gray-700">Hazmat Refresher – completed 05‑15‑2025</p>
  }
  function NotesTab() {
    return <p className="text-sm text-gray-700">No notes.</p>
  }